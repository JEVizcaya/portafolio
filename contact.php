<?php
/**
 * ============================================================================
 * CONTACT FORM PROCESSOR
 * Handles contact form submissions with validation and email sending
 * ============================================================================
 */

// Start session and set error reporting
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0); // Hide errors in production

// Set content type for JSON responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

/**
 * Configuration
 */
$config = [    // Email settings
    'to_email' => 'jevizcaya77@gmail.com',
    'from_email' => 'noreply@portafolio-jevizcaya.com',
    'from_name' => 'Portafolio Web',
    'subject_prefix' => '[Portafolio] ',
    
    // Validation settings
    'max_message_length' => 5000,
    'min_message_length' => 10,
    'required_fields' => ['name', 'email', 'subject', 'message'],
    
    // Rate limiting (basic)
    'rate_limit_minutes' => 5, // Minutes between submissions from same IP
    'max_submissions_per_hour' => 10,
    
    // Security
    'enable_honeypot' => true,
    'enable_csrf' => true,
    'blocked_words' => ['viagra', 'casino', 'poker', 'loan', 'debt'],
    
    // Logging
    'log_submissions' => true,
    'log_file' => 'contact_log.txt'
];

/**
 * Response helper
 */
function sendResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($data) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    exit;
}

/**
 * Logging function
 */
function logSubmission($data, $status) {
    global $config;
    
    if (!$config['log_submissions']) return;
    
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'status' => $status,
        'name' => $data['name'] ?? 'N/A',
        'email' => $data['email'] ?? 'N/A',
        'subject' => $data['subject'] ?? 'N/A'
    ];
    
    $logLine = implode(' | ', $logEntry) . "\n";
    file_put_contents($config['log_file'], $logLine, FILE_APPEND | LOCK_EX);
}

/**
 * Rate limiting check
 */
function checkRateLimit() {
    global $config;
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $currentTime = time();
    
    // Simple file-based rate limiting
    $rateLimitFile = 'rate_limit.json';
    $rateLimitData = [];
    
    if (file_exists($rateLimitFile)) {
        $rateLimitData = json_decode(file_get_contents($rateLimitFile), true) ?: [];
    }
    
    // Clean old entries
    foreach ($rateLimitData as $storedIp => $timestamps) {
        $rateLimitData[$storedIp] = array_filter($timestamps, function($timestamp) use ($currentTime) {
            return ($currentTime - $timestamp) < 3600; // Keep last hour
        });
        
        if (empty($rateLimitData[$storedIp])) {
            unset($rateLimitData[$storedIp]);
        }
    }
    
    // Check current IP
    if (isset($rateLimitData[$ip])) {
        $submissions = $rateLimitData[$ip];
        
        // Check if too many submissions in the last hour
        if (count($submissions) >= $config['max_submissions_per_hour']) {
            return false;
        }
        
        // Check if last submission was too recent
        $lastSubmission = max($submissions);
        if (($currentTime - $lastSubmission) < ($config['rate_limit_minutes'] * 60)) {
            return false;
        }
    }
    
    // Add current submission
    if (!isset($rateLimitData[$ip])) {
        $rateLimitData[$ip] = [];
    }
    $rateLimitData[$ip][] = $currentTime;
    
    // Save rate limit data
    file_put_contents($rateLimitFile, json_encode($rateLimitData), LOCK_EX);
    
    return true;
}

/**
 * Input validation and sanitization
 */
function validateAndSanitizeInput($data) {
    global $config;
    
    $errors = [];
    $sanitized = [];
    
    // Check required fields
    foreach ($config['required_fields'] as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[] = "El campo '$field' es requerido.";
            continue;
        }
        
        $sanitized[$field] = trim($data[$field]);
    }
    
    if (!empty($errors)) {
        return ['valid' => false, 'errors' => $errors];
    }
    
    // Validate email
    if (!filter_var($sanitized['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'El email no tiene un formato válido.';
    }
    
    // Validate name (basic)
    if (strlen($sanitized['name']) < 2 || strlen($sanitized['name']) > 100) {
        $errors[] = 'El nombre debe tener entre 2 y 100 caracteres.';
    }
    
    // Validate subject
    if (strlen($sanitized['subject']) < 3 || strlen($sanitized['subject']) > 200) {
        $errors[] = 'El asunto debe tener entre 3 y 200 caracteres.';
    }
    
    // Validate message
    if (strlen($sanitized['message']) < $config['min_message_length']) {
        $errors[] = "El mensaje debe tener al menos {$config['min_message_length']} caracteres.";
    }
    
    if (strlen($sanitized['message']) > $config['max_message_length']) {
        $errors[] = "El mensaje no puede exceder {$config['max_message_length']} caracteres.";
    }
    
    // Check for blocked words (basic spam filter)
    $messageWords = strtolower($sanitized['message']);
    foreach ($config['blocked_words'] as $blockedWord) {
        if (strpos($messageWords, strtolower($blockedWord)) !== false) {
            $errors[] = 'El mensaje contiene contenido no permitido.';
            break;
        }
    }
    
    // Additional security checks
    if (preg_match('/(http|ftp|mailto):/i', $sanitized['message'])) {
        // Allow but flag messages with links
        $sanitized['has_links'] = true;
    }
    
    // Check for suspicious patterns
    if (preg_match('/(.)\1{10,}/', $sanitized['message'])) {
        $errors[] = 'El mensaje contiene patrones sospechosos.';
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors,
        'data' => $sanitized
    ];
}

/**
 * Send email
 */
function sendEmail($data) {
    global $config;
    
    $to = $config['to_email'];
    $subject = $config['subject_prefix'] . $data['subject'];
    
    // Prepare email content
    $message = "Has recibido un nuevo mensaje desde tu portafolio web.\n\n";
    $message .= "Nombre: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    $message .= "Asunto: " . $data['subject'] . "\n";
    $message .= "Fecha: " . date('Y-m-d H:i:s') . "\n";
    $message .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Desconocida') . "\n\n";
    $message .= "Mensaje:\n" . str_repeat('-', 50) . "\n";
    $message .= $data['message'] . "\n";
    $message .= str_repeat('-', 50) . "\n\n";
    
    if (isset($data['has_links'])) {
        $message .= "⚠️ Este mensaje contiene enlaces.\n\n";
    }
    
    $message .= "Este mensaje fue enviado desde el formulario de contacto de tu portafolio.";
    
    // Email headers
    $headers = [
        'From' => $config['from_name'] . ' <' . $config['from_email'] . '>',
        'Reply-To' => $data['name'] . ' <' . $data['email'] . '>',
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8',
        'X-Priority' => '3',
        'X-MSMail-Priority' => 'Normal'
    ];
    
    $headerString = '';
    foreach ($headers as $key => $value) {
        $headerString .= $key . ': ' . $value . "\r\n";
    }
    
    // Send email
    $emailSent = mail($to, $subject, $message, $headerString);
    
    if (!$emailSent) {
        error_log("Failed to send contact form email to: $to");
        return false;
    }
    
    return true;
}

/**
 * Main processing
 */
try {
    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(false, 'Método no permitido.');
    }
    
    // Get input data
    $inputData = [];
    
    // Handle different content types
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    
    if (strpos($contentType, 'application/json') !== false) {
        // JSON data
        $jsonInput = file_get_contents('php://input');
        $inputData = json_decode($jsonInput, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            sendResponse(false, 'Datos JSON inválidos.');
        }
    } else {
        // Form data
        $inputData = $_POST;
    }
    
    // Honeypot check (if enabled)
    if ($config['enable_honeypot'] && !empty($inputData['website'])) {
        // This field should be empty (hidden from users, filled by bots)
        logSubmission($inputData, 'blocked_honeypot');
        sendResponse(false, 'Formulario inválido.');
    }
    
    // Basic CSRF check (if enabled)
    if ($config['enable_csrf']) {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        if (!isset($inputData['csrf_token']) || $inputData['csrf_token'] !== $_SESSION['csrf_token']) {
            sendResponse(false, 'Token de seguridad inválido.');
        }
    }
    
    // Rate limiting
    if (!checkRateLimit()) {
        logSubmission($inputData, 'rate_limited');
        sendResponse(false, 'Has enviado demasiados mensajes. Por favor, espera antes de enviar otro.');
    }
    
    // Validate and sanitize input
    $validation = validateAndSanitizeInput($inputData);
    
    if (!$validation['valid']) {
        logSubmission($inputData, 'validation_failed');
        sendResponse(false, 'Errores de validación: ' . implode(' ', $validation['errors']));
    }
    
    $sanitizedData = $validation['data'];
    
    // Send email
    if (!sendEmail($sanitizedData)) {
        logSubmission($sanitizedData, 'email_failed');
        sendResponse(false, 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.');
    }
    
    // Log successful submission
    logSubmission($sanitizedData, 'success');
    
    // Send success response
    sendResponse(true, '¡Mensaje enviado correctamente! Te contactaré pronto.', [
        'submitted_at' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    // Log the error
    error_log("Contact form error: " . $e->getMessage());
    
    // Send generic error response
    sendResponse(false, 'Error interno del servidor. Por favor, intenta nuevamente más tarde.');
}

/**
 * ============================================================================
 * CSRF TOKEN GENERATOR (for the form)
 * Call this function in your HTML to get a CSRF token
 * ============================================================================
 */
function getCSRFToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    
    return $_SESSION['csrf_token'];
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS FOR THE MAIN PAGE
 * ============================================================================
 */

/**
 * Get client IP address
 */
function getClientIP() {
    $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            $ip = $_SERVER[$key];
            if (strpos($ip, ',') !== false) {
                $ip = explode(',', $ip)[0];
            }
            
            if (filter_var(trim($ip), FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return trim($ip);
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * Security headers (call this in your main page)
 */
function setSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}

// If this file is accessed directly, show a simple message
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        header('Content-Type: text/html; charset=UTF-8');
        echo '<!DOCTYPE html>
<html>
<head>
    <title>Formulario de Contacto</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .info { background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; }
        .warning { background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; margin-top: 20px; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="info">
        <h2>🔧 Configuración del Formulario de Contacto</h2>
        <p>Este archivo procesa el formulario de contacto de tu portafolio.</p>
        <p><strong>Estado:</strong> Configuración requerida</p>
    </div>
    
    <div class="warning">
        <h3>⚠️ Configuración Requerida</h3>
        <p>Para que el formulario funcione correctamente, debes:</p>
        <ol>
            <li>Cambiar <code>$config[\'to_email\']</code> por tu dirección de email real</li>
            <li>Configurar el servidor web para enviar emails (función mail() de PHP)</li>
            <li>Verificar que el archivo tenga permisos de escritura para los logs</li>
        </ol>
        
        <h4>Configuración actual:</h4>
        <ul>
            <li>Email destino: <code>' . htmlspecialchars($config['to_email']) . '</code></li>
            <li>Límite de envíos: ' . $config['max_submissions_per_hour'] . ' por hora</li>
            <li>Rate limiting: ' . $config['rate_limit_minutes'] . ' minutos entre envíos</li>
            <li>Logging habilitado: ' . ($config['log_submissions'] ? 'Sí' : 'No') . '</li>
        </ul>
    </div>
</body>
</html>';
        exit;
    }
}
?>
