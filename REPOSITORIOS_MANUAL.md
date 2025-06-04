# Sistema de Selección Manual de Repositorios

## Descripción

El portafolio incluye un sistema flexible para mostrar repositorios de GitHub que permite tanto la selección automática como la manual de los repositorios que aparecen en la sección "Mis Repositorios".

## Configuración

### Modo Automático (Por defecto)
```javascript
CONFIG.USE_MANUAL_SELECTION = false;
```
- Muestra los 6 repositorios más recientes (excluyendo forks)
- Se actualizan automáticamente cuando creas nuevos repositorios
- Ordenados por fecha de última actualización

### Modo Manual
```javascript
CONFIG.USE_MANUAL_SELECTION = true;
CONFIG.SELECTED_REPOS = [
    'nombre-repositorio-1',
    'nombre-repositorio-2',
    'nombre-repositorio-3',
    'nombre-repositorio-4',
    'nombre-repositorio-5',
    'nombre-repositorio-6'
];
```

## Cómo Activar la Selección Manual

1. **Abrir el archivo JavaScript**
   ```
   c:\xampp\htdocs\portafolio\assets\js\script.js
   ```

2. **Encontrar la configuración** (alrededor de la línea 8-30):
   ```javascript
   const CONFIG = {
       // ... otras configuraciones ...
       
       // Manual repository selection
       SELECTED_REPOS: [
           // Examples - replace with your actual repository names:
           // 'celtafan',
           // 'gestor-proyectos', 
           // 'plantilla-mvc-ia',
           // 'proyecto-wordpress',
           // 'portfolio-website',
           // 'javascript-calculator'
       ],
       
       // Set to true to use manual selection, false for automatic latest repos
       USE_MANUAL_SELECTION: false
   };
   ```

3. **Cambiar la configuración**:
   ```javascript
   // Cambiar a true para activar selección manual
   USE_MANUAL_SELECTION: true,
   
   // Descomentar y modificar los nombres de repositorios
   SELECTED_REPOS: [
       'mi-proyecto-principal',
       'aplicacion-web',
       'calculadora-js',
       'gestor-tareas',
       'portfolio-personal',
       'api-rest-php'
   ],
   ```

## Ejemplos de Uso

### Ejemplo 1: Mostrar proyectos específicos
```javascript
CONFIG.USE_MANUAL_SELECTION = true;
CONFIG.SELECTED_REPOS = [
    'celtafan',              // Proyecto de fútbol
    'gestor-proyectos',      // Gestor de proyectos
    'plantilla-mvc-ia',      // Template con IA
    'proyecto-wordpress',    // Sitio WordPress
    'calculadora-js',        // Calculadora JavaScript
    'portfolio-website'      // Este portafolio
];
```

### Ejemplo 2: Enfocarse en tecnologías específicas
```javascript
CONFIG.USE_MANUAL_SELECTION = true;
CONFIG.SELECTED_REPOS = [
    'react-ecommerce',       // Proyecto React
    'vue-dashboard',         // Dashboard Vue.js
    'angular-blog',          // Blog Angular
    'node-api-rest',         // API Node.js
    'php-mvc-framework',     // Framework PHP
    'python-data-analysis'   // Análisis de datos Python
];
```

## Características del Sistema

### Ventajas del Modo Manual
- ✅ Control total sobre qué repositorios mostrar
- ✅ Orden personalizable
- ✅ Ideal para mostrar tus mejores trabajos
- ✅ Perfecto para entrevistas o presentaciones

### Ventajas del Modo Automático
- ✅ Siempre actualizado con tus últimos proyectos
- ✅ No requiere mantenimiento
- ✅ Muestra tu actividad reciente en GitHub

### Funcionalidades Adicionales
- 🔄 **Fallback inteligente**: Si un repositorio no existe o es privado, se omite sin romper la página
- 📊 **Logs detallados**: La consola muestra qué modo está activo y qué repositorios se cargan
- 🎨 **Diseño responsivo**: Mantiene el diseño de 2 filas × 3 columnas en desktop, 2 columnas en tablet, 1 columna en móvil
- 🏷️ **Metadatos completos**: Muestra lenguajes, estrellas, forks, fecha de actualización y temas

## Solución de Problemas

### Error: "Repository not found"
- Verifica que el nombre del repositorio sea exacto (sensible a mayúsculas/minúsculas)
- Asegúrate de que el repositorio sea público
- Confirma que el usuario de GitHub sea correcto

### No aparecen repositorios
- Verifica la consola del navegador (F12) para ver mensajes de error
- Confirma que `USE_MANUAL_SELECTION` esté en `true`
- Asegúrate de que `SELECTED_REPOS` tenga nombres válidos

### Orden incorrecto
- Los repositorios aparecen en el orden especificado en `SELECTED_REPOS`
- Para ordenar por fecha, modifica la función `fetchSelectedRepositories`

## Mejores Prácticas

1. **Selecciona tus mejores proyectos**: Usa el modo manual para destacar tu mejor trabajo
2. **Mantén diversidad**: Incluye proyectos de diferentes tecnologías
3. **Actualiza regularmente**: Revisa y actualiza la selección cuando tengas nuevos proyectos destacados
4. **Usa descripciones claras**: Asegúrate de que tus repositorios tengan buenas descripciones
5. **Agrega topics**: Los temas (tags) de GitHub se muestran automáticamente

## Código de Ejemplo Completo

```javascript
const CONFIG = {
    // ... otras configuraciones ...
    
    SELECTED_REPOS: [
        'portfolio-website',     // Tu portafolio principal
        'ecommerce-react',      // E-commerce en React
        'task-manager-vue',     // Gestor de tareas Vue.js
        'blog-php-mvc',         // Blog con PHP MVC
        'weather-app-js',       // App del clima JavaScript
        'data-viz-python'       // Visualización de datos Python
    ],
    
    USE_MANUAL_SELECTION: true
};
```

## Funciones Utilitarias (Avanzado)

Para usuarios avanzados, el sistema incluye funciones JavaScript que permiten cambiar la configuración dinámicamente desde la consola del navegador:

### Cambiar entre modos
```javascript
// Cambiar a modo automático
Portfolio.switchRepositoryMode(false);

// Cambiar a modo manual con repositorios específicos
Portfolio.switchRepositoryMode(true, [
    'mi-proyecto-1',
    'mi-proyecto-2',
    'mi-proyecto-3'
]);
```

### Agregar/quitar repositorios dinámicamente
```javascript
// Agregar un repositorio
Portfolio.addRepositoryToSelection('nuevo-repositorio');

// Quitar un repositorio
Portfolio.removeRepositoryFromSelection('repositorio-viejo');

// Ver configuración actual
console.log(Portfolio.CONFIG.SELECTED_REPOS);
```

### Recargar datos de GitHub
```javascript
// Recargar manualmente los datos
Portfolio.loadGitHubData();
```

Con esta configuración, tu portafolio mostrará exactamente estos 6 repositorios en el orden especificado, manteniendo el diseño de 2 filas con 3 columnas en desktop.
