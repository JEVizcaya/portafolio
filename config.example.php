<?php
/**
 * Archivo de configuración de ejemplo
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo y renómbralo a 'config.php'
 * 2. Reemplaza 'TU_API_KEY_AQUI' con tu API key real de Google Gemini
 * 3. Obtén tu API key en: https://makersuite.google.com/app/apikey
 * 4. Guarda el archivo y ejecuta test_sistema.php para verificar
 */

// Configuración de la API de Gemini
define('GEMINI_API_KEY', 'TU_API_KEY_AQUI');

// Configuración de desarrollo/producción
define('DEBUG_MODE', true);              // Cambiar a false en producción
define('LOG_ERRORS', true);              // Mantener logs de errores

// Configuración de seguridad
define('ALLOWED_ORIGINS', ['http://localhost', 'http://127.0.0.1']);

// Configuración del chat
define('CHAT_MAX_MESSAGES', 50);         // Máximo de mensajes en historial
define('CHAT_SESSION_TIMEOUT', 3600);    // Timeout de sesión en segundos (1 hora)

// Configuración de archivos de log
define('LOG_DIR', __DIR__ . '/logs/');
define('CHAT_LOG_FILE', LOG_DIR . 'chat.log');

// Crear directorio de logs si no existe
if (!is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
}

/*
 * NOTAS IMPORTANTES:
 * 
 * - Mantén tu API key segura y nunca la subas a repositorios públicos
 * - El archivo config.php está incluido en .gitignore por seguridad
 * - En producción, considera usar variables de entorno
 * - Revisa regularmente los logs para detectar problemas
 */
?>
