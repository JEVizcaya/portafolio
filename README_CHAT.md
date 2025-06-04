# Portafolio de Jorge Enrique Vizcaya Vega 🚀

Portafolio web personal con sistema de chat integrado con IA (Google Gemini).

## ✨ Características

- **Portafolio Responsive**: Diseño moderno y adaptable a todos los dispositivos
- **Chat con IA**: Asistente inteligente que puede responder sobre mi experiencia, proyectos y habilidades
- **Integración con GitHub**: Muestra repositorios automáticamente
- **Animaciones Fluidas**: Efectos visuales modernos y profesionales
- **Diseño Dark**: Tema oscuro con acentos dorados

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: PHP 7.4+
- **IA**: Google Gemini API
- **Control de Versiones**: Git
- **Servidor**: Apache (XAMPP)

## 🚀 Instalación y Configuración

### Prerrequisitos

- XAMPP (Apache + PHP)
- Cuenta de Google Cloud con acceso a Gemini API
- Git (opcional)

### Pasos de Instalación

1. **Clonar o descargar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd portafolio
   ```

2. **Configurar XAMPP**
   - Iniciar Apache en XAMPP
   - Colocar el proyecto en `c:\xampp\htdocs\portafolio\`

3. **Configurar la API de Gemini**
   - Obtener API key de Google Gemini: https://makersuite.google.com/app/apikey
   - La API key ya está configurada en `config.php`

4. **Verificar permisos**
   - Asegurar que la carpeta `logs/` sea escribible
   - Se creará automáticamente si no existe

5. **Acceder al portafolio**
   - Abrir navegador y visitar: `http://localhost/portafolio/`

## 🤖 Funcionalidades del Chat

El asistente IA puede ayudar con información sobre:

- **Experiencia profesional** y formación
- **Proyectos desarrollados** y tecnologías utilizadas
- **Habilidades técnicas** y competencias
- **Información de contacto** y disponibilidad
- **Objetivos profesionales** y motivaciones

### Ejemplos de preguntas:

- "¿Qué proyectos ha desarrollado Jorge?"
- "¿Cuáles son sus principales habilidades técnicas?"
- "¿Qué experiencia tiene con React?"
- "¿Cómo puedo contactar con él?"
- "¿Está disponible para trabajar?"

## 📁 Estructura del Proyecto

```
portafolio/
├── assets/
│   ├── css/
│   │   ├── portafolio.css    # Estilos principales
│   │   └── chat.css          # Estilos del chat
│   └── js/
│       ├── portafolio.js     # Funcionalidad principal
│       └── chat.js           # Sistema de chat
├── logs/                     # Logs del sistema (auto-generado)
├── config.php               # Configuración y API keys
├── chat.php                 # Backend del chat con IA
├── index.php                # Página principal
└── README.md               # Este archivo
```

## 🔧 Configuración Avanzada

### Variables de Configuración

En `config.php` puedes modificar:

```php
// Configuración del chat
define('CHAT_MAX_MESSAGES', 50);        // Máximo de mensajes en historial
define('CHAT_SESSION_TIMEOUT', 3600);   // Timeout de sesión (segundos)
define('DEBUG_MODE', true);              // Modo debug
define('LOG_ERRORS', true);              // Logging de errores
```

### Personalización del Contexto de IA

Para modificar el contexto que recibe la IA, edita la variable `$portfolioContext` en `chat.php`.

## 🐛 Solución de Problemas

### El chat no responde
1. Verificar que la API key de Gemini sea válida
2. Revisar los logs en `logs/chat.log`
3. Verificar conexión a internet
4. Comprobar que Apache esté ejecutándose

### Errores de JavaScript
1. Abrir DevTools del navegador (F12)
2. Revisar la consola de errores
3. Verificar que todos los archivos CSS/JS se cargen correctamente

### Problemas de permisos
1. Verificar permisos de escritura en la carpeta `logs/`
2. En Linux/Mac: `chmod 755 logs/`

## 📱 Características Responsive

El portafolio está optimizado para:
- **Desktop**: Experiencia completa con todas las funcionalidades
- **Tablet**: Diseño adaptado para pantallas medianas
- **Mobile**: Interfaz optimizada para dispositivos móviles

## 🔒 Seguridad

- API keys protegidas en archivos de configuración
- Validación de entrada en el backend
- Configuración de CORS apropiada
- Filtros de contenido de la IA

## 🤝 Contribución

Este es un portafolio personal, pero si encuentras algún bug o tienes sugerencias:

1. Abre un issue
2. Describe el problema o mejora
3. Proporciona pasos para reproducir (si es un bug)

## 📞 Contacto

**Jorge Enrique Vizcaya Vega**
- Email: jevizcaya77@gmail.com
- GitHub: [@JEVizcaya](https://github.com/JEVizcaya)
- LinkedIn: [Jorge Enrique Vizcaya Vega](https://linkedin.com/in/jorge-enrique-vizcaya-vega)

## 📄 Licencia

Este proyecto es de uso personal. El código está disponible para referencia educativa.

---

**¿Interesado en trabajar conmigo?** ¡Usa el chat del portafolio para conocer más sobre mi experiencia! 🚀
