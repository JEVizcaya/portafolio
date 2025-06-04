# 🤖 Configuración del Chat con IA

## Guía Rápida de Configuración

### 1. Obtener API Key de Google Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Selecciona un proyecto existente o crea uno nuevo
5. Copia la API key generada

### 2. Configurar el Proyecto 

La API key ya está configurada en el archivo `config.php` con la clave:
```

```

### 3. Verificar Instalación

1. Asegúrate de que XAMPP esté ejecutándose
2. Visita: `http://localhost/portafolio/test_sistema.php`
3. Verifica que todos los tests pasen ✅

### 4. Probar el Chat

1. Ve a: `http://localhost/portafolio/index.php`
2. Haz clic en el botón de chat flotante (💬)
3. Escribe cualquier pregunta sobre Jorge Enrique Vizcaya Vega

## 🎯 Ejemplos de Preguntas para Probar

```
- ¿Qué proyectos ha desarrollado Jorge?
- ¿Cuáles son sus principales habilidades?
- ¿Qué experiencia tiene con React?
- ¿Está disponible para trabajar?
- Cuéntame sobre el proyecto CeltaFan
- ¿Qué tecnologías domina?
- ¿Cómo puedo contactarlo?
```

## 🛠️ Funcionalidades del Chat

### ✨ Características Principales

- **Contexto Completo**: La IA conoce toda la información del portafolio
- **Historial de Sesión**: Los mensajes se guardan durante la sesión
- **Responsive**: Funciona en desktop y móvil
- **Fallback de Modelos**: Usa múltiples modelos de Gemini para mayor confiabilidad
- **Manejo de Errores**: Gestión robusta de errores y timeouts

### 🔧 Configuración Avanzada

En `config.php` puedes modificar:

```php
define('CHAT_MAX_MESSAGES', 50);      // Mensajes máximos en historial
define('CHAT_SESSION_TIMEOUT', 3600); // Timeout en segundos
define('DEBUG_MODE', true);           // Mostrar logs detallados
```

### 📱 Responsive Design

- **Desktop**: Chat flotante en esquina inferior derecha
- **Tablet**: Chat se adapta al tamaño de pantalla
- **Mobile**: Chat ocupa toda la pantalla para mejor UX

## 🚨 Solución de Problemas

### El chat no responde

1. **Verificar API Key**: Asegúrate de que la API key sea válida
2. **Revisar logs**: Checa `logs/chat.log` para errores
3. **Test de conexión**: Ejecuta `test_sistema.php`
4. **Consola del navegador**: Abre DevTools (F12) y revisa errores JS

### Errores comunes

**Error 403 - Forbidden**
```
Solución: Verificar que la API key tenga los permisos correctos
```

**Error 429 - Rate Limit**
```
Solución: Esperar unos minutos, has excedido el límite de requests
```

**Error de CORS**
```
Solución: Verificar la configuración de ALLOWED_ORIGINS en config.php
```

### Comandos de Debug

En la consola del navegador puedes usar:

```javascript
// Mostrar historial del chat
chatDebug.showHistory()

// Limpiar historial
chatDebug.clearHistory()

// Exportar historial
chatDebug.exportHistory()

// Abrir/cerrar chat programáticamente
chatDebug.openChat()
chatDebug.closeChat()
```

## 📊 Monitoreo y Logs

### Archivos de Log

- `logs/chat.log`: Errores y eventos del chat
- Los logs se crean automáticamente

### Información Registrada

- Errores de API
- Timeouts de conexión
- Requests fallidos
- Cambios de modelo

## 🎨 Personalización

### Modificar el Contexto de la IA

Edita la variable `$portfolioContext` en `chat.php` para:
- Agregar nueva información
- Actualizar proyectos
- Cambiar el tono de respuesta

### Estilos del Chat

Modifica `assets/css/chat.css` para:
- Cambiar colores del tema
- Ajustar tamaños
- Personalizar animaciones

## 📈 Optimización

### Rendimiento

- Los mensajes se almacenan en `sessionStorage`
- Máximo 50 mensajes por sesión
- Auto-limpieza de historial antiguo

### SEO

- El chat no afecta el SEO
- Carga de forma asíncrona
- No bloquea el renderizado

---

## 🎉 ¡Listo!

Si todos los tests pasan, tu chat con IA está funcionando correctamente. Los visitantes de tu portafolio podrán chatear y conocer más sobre tu experiencia profesional.

**Próximos pasos:**
1. ✅ Configuración completada
2. ✅ Chat funcionando
3. 🚀 ¡Comparte tu portafolio!

---

*Para soporte adicional, revisa los logs o consulta la documentación de la API de Gemini.*
