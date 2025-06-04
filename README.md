# 🌟 Elegant Professional Portfolio

## Jorge Enrique Vizcaya Vega - Developer Portfolio

An elegant and sophisticated portfolio website showcasing professional development skills with a premium midnight blue and gold design theme.

### ✨ Features

- **🎨 Elegant Design**: Premium midnight blue and gold color palette with glass morphism effects
- **📱 Fully Responsive**: Optimized for all device sizes (desktop, tablet, mobile) - NO horizontal scroll
- **🚀 Modern Animations**: Smooth CSS transitions and JavaScript interactions
- **💼 Professional Sections**: Hero, About, Skills, Projects, GitHub integration, Contact
- **📧 Contact Form**: Functional PHP contact form with validation and email sending
- **🔗 GitHub API**: Live integration showing repositories and statistics with manual/automatic selection
- **📋 Repository Management**: Choose between automatic latest repos or manually curated selection
- **⚡ Performance Optimized**: Fast loading with optimized assets
- **Fácil Personalización**: Variables PHP para cambios rápidos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Iconos**: Font Awesome 6
- **Fuentes**: Google Fonts (Poppins)
- **APIs**: GitHub API para repositorios

## 📋 Requisitos

- Servidor web con PHP (XAMPP, WAMP, LAMP, etc.)
- PHP 7.4 o superior
- Conexión a internet (para cargar fuentes e iconos externos)

## 🚀 Instalación

1. **Clona o descarga** este proyecto en tu directorio web
2. **Configura XAMPP** (o tu servidor web preferido)
3. **Coloca los archivos** en `htdocs/portafolio/`
4. **Edita la configuración** en `index.php`
5. **Accede** a `http://localhost/portafolio/`

## ⚙️ Configuración

### Datos Personales

Edita las siguientes variables en `index.php`:

```php
$nombre = 'Tu Nombre Completo';
$profesion = 'Junior Developer';
$github_usuario = 'tu-usuario-github';
$email = 'tu-email@ejemplo.com';
$linkedin = 'https://linkedin.com/in/tu-perfil';
```

### Configuración del Formulario de Contacto

En `contact.php`, configura:

```php
// Configuración de email
$to = 'tu-email@ejemplo.com';
$smtp_host = 'tu-servidor-smtp';
$smtp_username = 'tu-usuario-smtp';
$smtp_password = 'tu-password-smtp';
```

### Personalización de Proyectos

Edita la sección de proyectos en `index.php` para agregar tus propios proyectos:

```html
<div class="project-card">
    <div class="project-icon">
        <i class="fas fa-tu-icono"></i>
    </div>
    <h3>Nombre del Proyecto</h3>
    <p>Descripción de tu proyecto...</p>
    <div class="project-tech">
        <span class="tech-tag">Tecnología 1</span>
        <span class="tech-tag">Tecnología 2</span>
    </div>
    <div class="project-links">
        <a href="url-demo" class="project-link">Ver Demo</a>
        <a href="url-github" class="project-link">Código</a>
    </div>
</div>
```

### 📋 Sistema de Repositorios Manuales

El portafolio incluye un sistema flexible para mostrar repositorios de GitHub:

**Modo Automático (por defecto)**: Muestra los 6 repositorios más recientes
**Modo Manual**: Selecciona repositorios específicos a mostrar

Para configurar repositorios manuales, consulta el archivo `REPOSITORIOS_MANUAL.md` incluido.

## 📁 Estructura de Archivos

```
portafolio/
├── index.php              # Página principal
├── contact.php            # Procesador del formulario
├── README.md              # Este archivo
├── REPOSITORIOS_MANUAL.md # Guía del sistema de repositorios manuales
└── assets/
    ├── css/
    │   └── style.css      # Estilos principales
    ├── js/
    │   └── script.js      # JavaScript principal
    └── images/            # Directorio para imágenes
```

## 🎨 Personalización de Estilos

### Colores Principales

Puedes cambiar los colores principales editando las variables CSS en `style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-color: #333;
    --light-bg: #f8f9fa;
}
```

### Fuentes

Para cambiar la fuente, modifica el import en el `<head>` de `index.php`:

```html
<link href="https://fonts.googleapis.com/css2?family=TuFuente:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 🔧 Funcionalidades

### Navegación Suave
- Scroll automático entre secciones
- Menú hamburguesa responsive
- Indicador de sección activa

### Animaciones
- Contadores animados en estadísticas
- Barras de progreso para habilidades
- Iconos flotantes en el hero
- Efectos de hover en tarjetas

### GitHub Integration
- Carga automática de repositorios
- Estadísticas del perfil
- Enlaces directos a proyectos

### Formulario de Contacto
- Validación frontend y backend
- Protección anti-spam (honeypot)
- Rate limiting
- Sanitización de datos

## 📱 Responsive Design

El portafolio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 Seguridad

- Validación y sanitización de formularios
- Protección CSRF (opcional)
- Rate limiting en envío de emails
- Honeypot para detectar bots

## 🌟 Características para Junior Developers

Este portafolio está especialmente diseñado para desarrolladores junior:

- **Enfoque en Aprendizaje**: Destaca tu pasión por aprender
- **Proyectos de Práctica**: Muestra tus proyectos educativos
- **Soft Skills**: Resalta habilidades blandas importantes
- **Disponibilidad**: Enfatiza tu disponibilidad inmediata
- **Crecimiento**: Muestra tu potencial de crecimiento

## 📈 SEO y Performance

- Meta tags optimizados
- Imágenes optimizadas (cuando se agreguen)
- CSS y JS minificados en producción
- Carga rápida y eficiente

## 🤝 Contribuciones

¡Las mejoras son bienvenidas! Si tienes ideas para mejorar este portafolio:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu portafolio personal.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- Revisa la documentación
- Abre un issue en GitHub
- Contacta al desarrollador

---

**¡Hecho con ❤️ para desarrolladores que empiezan su carrera!**

### 🎯 Próximos Pasos Recomendados

1. **Personaliza los datos** en `index.php`
2. **Agrega tus proyectos** reales
3. **Sube fotos** al directorio `assets/images/`
4. **Configura el email** en `contact.php`
5. **Prueba el formulario** de contacto
6. **Optimiza el SEO** con tus keywords
7. **Despliega en tu hosting** preferido

¡Tu carrera como desarrollador web empieza aquí! 🚀
