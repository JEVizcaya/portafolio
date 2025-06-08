<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que la API key esté configurada
if (!defined('GEMINI_API_KEY') || empty(GEMINI_API_KEY)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'API key de Gemini no configurada'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Debug: Log de datos recibidos
error_log("Chat Debug - POST data: " . print_r($_POST, true));
error_log("Chat Debug - Raw input: " . file_get_contents('php://input'));

$prompt = $_POST['prompt'] ?? '';

if (empty($prompt)) {
    error_log("Chat Debug - Prompt vacío. POST: " . print_r($_POST, true));
    echo json_encode(['success' => false, 'error' => 'Prompt vacío']);
    exit;
}

error_log("Chat Debug - Prompt recibido: " . $prompt);

// Contexto completo del portafolio de Jorge Enrique Vizcaya Vega
$portfolioContext = "

responde  con repuestas mas cortas y concisas, pero manteniendo la y profesional.
CONTEXTO DEL PORTAFOLIO - JORGE ENRIQUE VIZCAYA VEGA

=== INFORMACIÓN PERSONAL ===
- Nombre: Jorge Enrique Vizcaya Vega
- Profesión: Desarrollador Web
- Estado: Recién graduado buscando primera oportunidad profesional
- Email: jevizcaya77@gmail.com
- GitHub: JEVizcaya
- Telefono:+34 645 82 75 93
- Edad: 47 años
- fecha de nacimiento: 16-07-1977
- Numero de proyectos publicados en github:41
- Numero de seguidores en github:5

=== PERFIL PROFESIONAL ===
- Recién graduado en desarrollo web con ganas de aplicar conocimientos en proyectos reales
- Se esfuerza por mantenerse actualizado y busca siempre la mejor solución para cada reto
- Siempre dispuesto a aprender y crecer profesionalmente
- Completó un curso intensivo de desarrollo de aplicaciones web
- Aunque es nuevo en el campo profesional, tiene gran pasión por la programación
- Busca su primera oportunidad profesional para aplicar conocimientos y crecer junto a un equipo experimentado

=== HABILIDADES TÉCNICAS ===
Todas desarrolladas con ayuda de herramientas de IA:
- PHP: 45%
- JavaScript: 50%
- Java: 40%
- Python: 45%
- Node.js: 35%
- React: 40%
- MySQL: 40%
- Git & GitHub: 55%
- Bootstrap: 60%
- WordPress: 50%
- PrestaShop: 45%

=== HABILIDADES SOCIALES ===
- Aprendizaje Rápido: Capacidad para asimilar nuevas tecnologías y conceptos
- Trabajo en Equipo: Colaboración efectiva con otros desarrolladores
- Resolución de Problemas: Análisis lógico y búsqueda de soluciones creativas
- Comunicación: Habilidad para explicar conceptos técnicos claramente
- Gestión del Tiempo: Organización eficiente de tareas y proyectos
- Pasión por el Código: Motivación genuina por el desarrollo web

=== ESTADÍSTICAS ===
- 605 horas de estudio
- 100% motivación

=== PROYECTOS DESTACADOS ===

1. **CeltaFan** (Portal para aficionados del Celta de Vigo)
   - Tecnologías: Python, Django, SQLite
   - Funcionalidades: Noticias, resultados, plantilla, próximos partidos
   - Proyecto: https://jorgevizcaya.pythonanywhere.com/
   - Código: https://github.com/JEVizcaya/pythonanywhere

2. **Gestor de Proyectos** (Aplicación web para gestión de proyectos)
   - Tecnologías: PHP, React, JavaScript
   - Funcionalidades: CRUD, asignación de tareas, interfaz intuitiva
   - Proyecto: https://devflow-je.web.app/
   - Código: https://github.com/JEVizcaya/devflow

3. **Plantilla MVC + IA** (Aplicación web con patrón MVC e IA)
   - Tecnologías: PHP, JavaScript, CSS
   - Funcionalidades: IA integrada, gestión de usuarios, interfaz amigable
   - Proyecto: https://prestashop2025.lovestoblog.com/
   - Código: https://github.com/JEVizcaya/basemvcphp

4. **Proyecto WordPress** (Sitio web de taller mecánico)
   - Tecnologías: PHP, JavaScript, CSS3
   - Funcionalidades: Servicios, contacto, ubicación
   - Proyecto: https://jorgevizcaya.wuaze.com/

5. **Blog Personal** (Blog con React + Node + Postgres)
   - Tecnologías: React, Vite, JavaScript, MySQL
   - Funcionalidades: CRUD de publicaciones, autenticación
   - Demo: https://jevizcaya.github.io/frontblog/
   - Código: https://github.com/JEVizcaya/frontblog

6. **E-Commerce Simple** (Tienda online básica)
   - Tecnologías: PrestaShop, MySQL, CSS3
   - Funcionalidades: Carrito de compras, gestión de productos, panel admin
   - Proyecto: http://tiendajevv.rf.gd/

=== OBJETIVO PROFESIONAL ===
Jorge está buscando una oportunidad profesional como desarrollador web. Quiere aplicar sus conocimientos en proyectos reales y seguir creciendo profesionalmente junto a un equipo experimentado.

=== INSTRUCCIONES PARA LA IA ===
Eres el agente personal de Jorge Enrique Vizcaya Vega. Debes:
1. Responder de manera breve y concisa. Ve al grano
2. Inicia la respuesta teniendo en cuenta la pregunta. Ejemplo. cual es su numero de telefono? su nemero de telefono es...

";

// Función para registrar errores
function logError($message) {
    $logMessage = "[" . date('Y-m-d H:i:s') . "] ERROR: $message" . PHP_EOL;
    
    // Log a archivo si está configurado
    if (defined('LOG_ERRORS') && LOG_ERRORS && defined('CHAT_LOG_FILE')) {
        file_put_contents(CHAT_LOG_FILE, $logMessage, FILE_APPEND | LOCK_EX);
    }
    
    // También log a error_log de PHP para debugging
    error_log("Chat Error: " . $message);
}

// Función para hacer petición a Gemini API
function callGeminiAPI($prompt, $context) {
    $apiKey = GEMINI_API_KEY;
    
    // Diferentes modelos de Gemini para probar
    $models = [
        'gemini-1.5-flash',
        'gemini-1.0-pro',
        'gemini-pro'
    ];
    
    $fullPrompt = $context . "\n\nUSUARIO: " . $prompt . "\n\nRESPUESTA:";
    
    foreach ($models as $model) {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
        
        $data = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $fullPrompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 1024
            ],
            'safetySettings' => [
                [
                    'category' => 'HARM_CATEGORY_HARASSMENT',
                    'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                ],
                [
                    'category' => 'HARM_CATEGORY_HATE_SPEECH',
                    'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                ],
                [
                    'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                ],
                [
                    'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                ]
            ]
        ];
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => false
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            logError("cURL Error con modelo $model: $error");
            continue;
        }
        
        if ($httpCode !== 200) {
            logError("HTTP Error $httpCode con modelo $model: $response");
            continue;
        }
        
        $result = json_decode($response, true);
        
        if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
            return [
                'success' => true, 
                'response' => $result['candidates'][0]['content']['parts'][0]['text'],
                'model' => $model
            ];
        }
        
        logError("Respuesta inválida de modelo $model: " . json_encode($result));
    }
    
    return ['success' => false, 'error' => 'No se pudo obtener respuesta de ningún modelo'];
}

try {
    error_log("Chat Debug - Iniciando llamada a Gemini API con prompt: " . substr($prompt, 0, 50) . "...");
    $result = callGeminiAPI($prompt, $portfolioContext);
    
    if ($result['success']) {
        error_log("Chat Debug - Respuesta exitosa de modelo: " . $result['model']);
        echo json_encode([
            'success' => true,
            'response' => $result['response'],
            'model' => $result['model'] ?? 'gemini'
        ]);
    } else {
        error_log("Chat Debug - Error en API: " . $result['error']);
        echo json_encode([
            'success' => false,
            'error' => $result['error']
        ]);
    }
    
} catch (Exception $e) {
    error_log("Chat Debug - Excepción capturada: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor'
    ]);
}
?>
