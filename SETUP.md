# 🎯 Guía de Configuración Rápida

## ⚡ Configuración en 5 Minutos

### 1. Datos Personales (index.php)
```php
// Cambia estos valores con tu información
$nombre = 'Juan Pérez';                    // Tu nombre completo
$profesion = 'Desarrollador Web Junior';   // Tu título profesional
$github_usuario = 'juanperez';             // Tu usuario de GitHub
$email = 'juan@ejemplo.com';               // Tu email de contacto
$linkedin = 'https://linkedin.com/in/juan-perez'; // Tu perfil de LinkedIn
```

### 2. Email del Formulario (contact.php)
```php
// Línea 7 - Cambia el email de destino
$to = 'tu-email@ejemplo.com';

// Para usar SMTP (opcional), descomenta y configura:
// $smtp_host = 'smtp.gmail.com';
// $smtp_username = 'tu-email@gmail.com';
// $smtp_password = 'tu-app-password';
```

### 3. Tus Proyectos
Edita la sección de proyectos en `index.php` (línea ~280) para agregar tus propios proyectos.

### 4. Tu Foto (Opcional)
- Agrega tu foto como `assets/images/profile.jpg`
- Reemplaza el placeholder en la sección "Sobre Mí"

### 5. Verifica que Funcione
1. Abre `http://localhost/portafolio/`
2. Revisa que todos los enlaces funcionen
3. Prueba el formulario de contacto
4. Verifica la integración con GitHub

## 🎨 Personalización de Colores

Edita en `assets/css/style.css` (líneas 1-10):

```css
:root {
    --primary-color: #667eea;    /* Color principal */
    --secondary-color: #764ba2;  /* Color secundario */
    --accent-color: #f093fb;     /* Color de acento */
    /* Cambia estos valores por tus colores preferidos */
}
```

## 📱 Siguiente Paso: ¡Personalízalo!

1. Cambia los colores a tu gusto
2. Agrega tus proyectos reales
3. Incluye tu foto profesional
4. Ajusta las habilidades según tu nivel
5. Configura el email para recibir mensajes

¡Tu portafolio profesional está listo! 🚀
