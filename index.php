<?php
// Configuración básica
$nombre = 'Jorge Enrique Vizcaya Vega';
$profesion = 'Developer';
$github_usuario = 'JEVizcaya'; // Cambia esto por tu usuario de GitHub
$email = 'jevizcaya77@gmail.com';
$linkedin = 'https://linkedin.com/in/jorge-enrique-vizcaya-vega';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $nombre; ?> - <?php echo $profesion; ?></title>    <meta name="description" content="Portafolio de <?php echo $nombre; ?>, desarrollador web especializado en tecnologías modernas">    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Estilos -->
    <link rel="stylesheet" href="assets/css/portafolio.css">
    <link rel="stylesheet" href="assets/css/charla.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>    <!-- Navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark bg-opacity-75 backdrop-blur">
        <div class="container">
            <a class="navbar-brand logo fw-bold" href="#inicio"><?php echo explode(' ', $nombre)[0]; ?></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item px-1"><a href="#inicio" class="nav-link active fw-medium">Inicio</a></li>
                    <li class="nav-item px-1"><a href="#sobre-mi" class="nav-link fw-medium">Sobre Mí</a></li>
                    <li class="nav-item px-1"><a href="#habilidades" class="nav-link fw-medium">Habilidades</a></li>                    <li class="nav-item px-1"><a href="#proyectos" class="nav-link fw-medium">Proyectos</a></li>
                    <li class="nav-item px-1"><a href="#contacto" class="nav-link fw-medium">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>    <!-- Hero Section -->
    <section id="inicio" class="hero min-vh-100 d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-10 text-center">
                    <div class="hero-content">
                        <p class="hero-subtitle">👋 Bienvenido a mi portafolio</p>
                        <h1 class="hero-title display-1 fw-bold mb-4">
                            <span class="hero-soy">Soy</span> <span class="hero-name"><?php echo $nombre; ?></span><br>
                            <span class="typing-text">Desarrollador Web</span>
                        </h1>
                        <p class="hero-description lead mb-5">
                            Recién graduado en desarrollo web con ganas de aplicar mis conocimientos 
                            en proyectos reales. Me esfuerzo por mantenerme actualizado y busco siempre la mejor solución para cada reto.
                            Siempre dispuesto a aprender y crecer profesionalmente,
                         
                        </p>                        <div class="hero-buttons">
                            <a href="#proyectos" class="btn btn-warning me-3 py-2 px-4 rounded-pill shadow-sm">
                                <i class="fas fa-rocket me-2"></i>
                                Ver Proyectos
                            </a>
                            <a href="#contacto" class="btn btn-outline-light py-2 px-4 rounded-pill">
                                <i class="fas fa-envelope me-2"></i>
                                Contáctame
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>    <!-- Sobre Mí -->
    <section id="sobre-mi" class="about py-5">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-12 col-lg-8 text-center">
                    <div class="section-title">
                        <h2 class="display-4 fw-bold mb-3">Sobre Mí</h2>
                        <p class="lead">Conoce un poco más sobre mi trayectoria y objetivos</p>
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-12 col-lg-8">
                    <div class="about-text">
                        <h3 class="h2 mb-4">Mi Historia</h3>
                        <p class="mb-4">
                            Recientemente completé un curso intensivo de desarrollo de aplicaciones 
                            web donde aprendí las bases sólidas de las tecnologías modernas. 
                            Aunque soy nuevo en el campo profesional, tengo una gran pasión por 
                            la programación y un fuerte deseo de crecer como desarrollador.
                        </p>
                        <p class="mb-5">
                            Me caracterizo por ser una persona curiosa, proactiva y con muchas 
                            ganas de aprender. Busco mi primera oportunidad profesional donde 
                            pueda aplicar mis conocimientos y seguir creciendo junto a un equipo experimentado.
                        </p>
                        <div class="row text-center">
                            <div class="col-6 col-md-3 mb-3">
                                <div class="about-stats">
                                    <span class="stat-number counter d-block h2 fw-bold text-warning" data-count="605">0</span>
                                    <span class="stat-label">Horas de Estudio</span>
                                </div>
                            </div>
                            <div class="col-6 col-md-3 mb-3">
                                <div class="about-stats">
                                    <span class="stat-number counter d-block h2 fw-bold text-warning" data-count="100">0</span>
                                    <span class="stat-label">% Motivación</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4 text-center">
                    <div class="about-image">
                        <div class="about-image-placeholder p-5 rounded-4 bg-light bg-opacity-10">
                            <i class="fas fa-user-graduate display-1 text-warning mb-3"></i>
                            <p class="mb-0">¡Listo para mi primera oportunidad profesional!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>    <!-- Habilidades -->
    <section id="habilidades" class="skills py-5">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-12 col-lg-8 text-center">
                    <div class="section-title">
                        <h2 class="display-4 fw-bold mb-3">Mis Habilidades</h2>
                        <p class="lead">Tecnologías que he aprendido y competencias que he desarrollado</p>
                    </div>
                </div>
            </div>            <div class="row g-4 align-items-start">
                <!-- Habilidades Técnicas -->
                <div class="col-12 col-lg-6 pe-lg-4 position-relative">
                    <h3 class="h4 mb-4 skills-header"><i class="fas fa-laptop-code me-2"></i> Habilidades Técnicas</h3>
                    <div class="ia-info-robot card border-0 bg-light bg-opacity-10 shadow-sm mb-4 p-3 d-flex flex-column flex-md-row align-items-center gap-3 text-center text-md-start" aria-hidden="false">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <div style="min-width:48px;">
                                <i class="fas fa-robot text-warning" style="font-size:2.2rem;"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h4 class="h6 mb-1 text-warning fw-bold">Desarrollado con la ayuda inestimable de la IA</h4>
                                <p class="mb-0 small text-light">
                                    Todas estas habilidades técnicas han sido adquiridas y perfeccionadas con el apoyo constante de herramientas de inteligencia artificial, que han sido fundamentales en mi proceso de aprendizaje y desarrollo profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="technical-skills p-4 rounded-3 bg-dark bg-opacity-10 h-100">
                        
                        
                        
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">PHP</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="45" style="width: 45%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">JavaScript</span>
                                <span class="skill-percentage">50%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="50" style="width: 50%"></div>
                            </div>
                        </div>                        <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">Java</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="40" style="width: 40%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">Python</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="45" style="width: 45%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">Node</span>
                                <span class="skill-percentage">35%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="35" style="width: 35%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">React</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="40" style="width: 40%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">MySQL</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="40" style="width: 40%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">Git & GitHub</span>
                                <span class="skill-percentage">55%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="55" style="width: 55%"></div>
                            </div>
                        </div>
                          <div class="skill-item mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="skill-name fw-medium">Bootstrap</span>
                                <span class="skill-percentage">60%</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar skill-progress" data-percentage="60" style="width: 60%"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="skill-name fw-medium">WordPress</span>
                                <span class="skill-percentage">50%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar skill-progress" data-percentage="50" style="width: 50%"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="skill-name fw-medium">Prestashop</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar skill-progress" data-percentage="45" style="width: 45%"></div>
                            </div>
                        </div> 
                     </div>               
                  </div>                <!-- Habilidades Sociales -->    
                <div class="col-12 col-lg-6 ps-lg-4">
                    <h3 class="h4 mb-4 skills-header"><i class="fas fa-users me-2"></i> Habilidades Sociales</h3>
                    <div class="soft-skills p-4 rounded-3 bg-dark bg-opacity-10 h-100">
                        <div class="row g-4">
                            <div class="col-12 col-md-6">
                                <div class="soft-skill-item text-center p-4 rounded-3 bg-light bg-opacity-10 h-100">
                                    <i class="fas fa-lightbulb fs-1 text-warning mb-3"></i>
                                    <h4 class="h6 fw-bold mb-2">Aprendizaje Rápido</h4>
                                    <p class="small mb-0">Capacidad para asimilar nuevas tecnologías y conceptos</p>
                                </div>
                            </div>
                              <div class="col-12 col-md-6">
                                <div class="soft-skill-item text-center p-4 rounded-3 bg-light bg-opacity-10 h-100">
                                    <i class="fas fa-users-cog fs-1 text-warning mb-3"></i>
                                    <h4 class="h6 fw-bold mb-2">Trabajo en Equipo</h4>
                                    <p class="small mb-0">Colaboración efectiva con otros desarrolladores</p>
                                </div>
                            </div>
                              <div class="col-12 col-md-6">
                                <div class="soft-skill-item text-center p-4 rounded-3 bg-light bg-opacity-10 h-100">
                                    <i class="fas fa-search fs-1 text-warning mb-3"></i>
                                    <h4 class="h6 fw-bold mb-2">Resolución de Problemas</h4>
                                    <p class="small mb-0">Análisis lógico y búsqueda de soluciones creativas</p>
                                </div>
                            </div>
                              <div class="col-12 col-md-6">
                                <div class="soft-skill-item text-center p-4 rounded-3 bg-light bg-opacity-10 h-100">
                                    <i class="fas fa-comments fs-1 text-warning mb-3"></i>
                                    <h4 class="h6 fw-bold mb-2">Comunicación</h4>
                                    <p class="small mb-0">Habilidad para explicar conceptos técnicos claramente</p>
                                </div>
                            </div>
                              <div class="col-12 col-md-6">
                                <div class="soft-skill-item text-center p-4 rounded-3 bg-light bg-opacity-10 h-100">
                                    <i class="fas fa-clock fs-1 text-warning mb-3"></i>
                                    <h4 class="h6 fw-bold mb-2">Gestión del Tiempo</h4>
                                    <p class="small mb-0">Organización eficiente de tareas y proyectos</p>
                                </div>
                            </div>
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>    <!-- Proyectos -->
    <section id="proyectos" class="projects py-5">
        <div class="container">            <div class="row justify-content-center mb-5">
                <div class="col-12 col-lg-8 text-center">
                    <div class="section-title">
                        <h2 class="display-4 fw-bold mb-3">Mis Proyectos</h2>
                        <p class="lead">Proyectos desarrollados durante mi formación y práctica personal</p>
                        <div class="d-flex justify-content-center mt-3 mb-1">
                           
                        </div>
                    </div>
                </div>
            </div><!-- Contenedor de proyectos en formato de 2 filas de 3 columnas -->
            <div class="project-grid">                
                <!-- Proyecto 1 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fas fa-futbol"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">CeltaFan</h3>
                        </div>
                        <p class="mb-4">
                            CeltaFan es un portal para aficcionados del Celta de Vigo,
                            donde se pueden consultar noticias, resultados, plantilla, proximos partidos y más.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">Python</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">Django</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">SQLite</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="https://jorgevizcaya.pythonanywhere.com/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                            <a href="https://github.com/JEVizcaya/pythonanywhere" class="btn btn-outline-light btn-sm flex-fill">
                                <i class="fab fa-github me-1"></i>
                                Código
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Proyecto 2 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">Gestor de Proyectos</h3>
                        </div>
                        <p class="mb-4">
                            Aplicación web para gestionar proyectos y asignar tareas a colaboradores con 
                            funcionalidades CRUD y interfaz intuitiva.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">PHP</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">React</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">Javascript</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="https://devflow-je.web.app/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                            <a href="https://github.com/JEVizcaya/devflow" class="btn btn-outline-light btn-sm flex-fill">
                                <i class="fab fa-github me-1"></i>
                                Código
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Proyecto 3 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">Plantilla MVC + IA</h3>
                        </div>
                        <p class="mb-4">
                            Aplicación web que utiliza un patrón MVC con IA integrada para generar respuestas a preguntas frecuentes.
                            Incluye un sistema de gestión de usuarios y una interfaz amigable.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">PHP</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">JavaScript</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">CSS</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="https://prestashop2025.lovestoblog.com/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                            <a href="https://github.com/JEVizcaya/basemvcphp" class="btn btn-outline-light btn-sm flex-fill">
                                <i class="fab fa-github me-1"></i>
                                Código
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Proyecto 4 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fab fa-wordpress"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">Proyecto Wordpress</h3>
                        </div>
                        <p class="mb-4">
                            Sitio web desarrollado con WordPress que muestra la pagina web de un taller mecánico
                            incluyendo servicios, contacto y ubicación.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">PHP</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">JavaScript</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">CSS3</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="https://jorgevizcaya.wuaze.com/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Proyecto 5 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fas fa-blog"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">Blog</h3>
                        </div>
                        <p class="mb-4">
                            Blog personal desarrollado con React + Node + Postgres, donde se pueden crear, editar y eliminar publicaciones.
                            Incluye autenticación de usuarios y una interfaz amigable.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">React</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">Vite</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">JavaScript</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">MySQL</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="https://jevizcaya.github.io/frontblog/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                            <a href="https://github.com/JEVizcaya/frontblog" class="btn btn-outline-light btn-sm flex-fill">
                                <i class="fab fa-github me-1"></i>
                                Código
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Proyecto 6 -->
                <div class="project-item">
                    <div class="project-card p-4 rounded-4 bg-light bg-opacity-10">
                        <div class="text-center mb-3">
                            <div class="project-icon fs-1 text-warning mb-3">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3">E-Commerce Simple</h3>
                        </div>
                        <p class="mb-4">
                            Tienda online básica desarrollada con Prestashop y MySQL. 
                            Incluye carrito de compras, gestión de productos y panel administrativo.
                        </p>
                        <div class="project-tech mb-4">
                            <span class="badge bg-warning text-dark me-2 mb-2">Prestashop</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">MySQL</span>
                            <span class="badge bg-warning text-dark me-2 mb-2">CSS3</span>
                        </div>
                        <div class="project-links d-flex gap-2 mt-auto">
                            <a href="http://tiendajevv.rf.gd/" class="btn btn-outline-warning btn-sm flex-fill">
                                <i class="fas fa-external-link-alt me-1"></i>
                                Ver Proyecto
                            </a>
                        </div>
                    </div>
                </div>            </div>
            <div class="text-center mt-5 mb-5">
                <a href="https://github.com/<?php echo $github_usuario; ?>" target="_blank" rel="noopener" class="btn btn-outline-warning">
                    <i class="fab fa-github me-2"></i>
                    Ver perfil completo en GitHub
                </a>
            </div>
        </div>
    </section><!-- Contacto -->
    <section id="contacto" class="contact py-5">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-12 col-lg-8 text-center">
                    <div class="section-title">
                        <h2 class="display-4 fw-bold mb-3">¡Hablemos!</h2>
                        <p class="lead">Estoy buscando oportunidades para comenzar mi carrera profesional</p>
                    </div>
                </div>
            </div>            <!-- Tarjetas de Información de Contacto -->
            <div class="row justify-content-center g-4">
                <div class="col-12 text-center mb-4">
                    <h3 class="h4 mb-0 text-warning">Información de Contacto</h3>
                </div>
                
                <!-- Tarjeta Email -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="contact-card card border-0 h-100 text-center p-4 bg-light bg-opacity-10 rounded-4 shadow-sm">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="contact-icon mb-3">
                                <i class="fas fa-envelope fs-1 text-warning"></i>
                            </div>
                            <h5 class="card-title text-white mb-2">Email</h5>
                            <p class="card-text text-light opacity-75 mb-0 small"><?php echo $email; ?></p>
                        </div>
                    </div>
                </div>
                
                <!-- Tarjeta Teléfono -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="contact-card card border-0 h-100 text-center p-4 bg-light bg-opacity-10 rounded-4 shadow-sm">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="contact-icon mb-3">
                                <i class="fas fa-phone fs-1 text-warning"></i>
                            </div>
                            <h5 class="card-title text-white mb-2">Teléfono</h5>
                            <p class="card-text text-light opacity-75 mb-0 small">+34 645 82 75 93</p>
                        </div>
                    </div>
                </div>
                
                <!-- Tarjeta Disponibilidad -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="contact-card card border-0 h-100 text-center p-4 bg-light bg-opacity-10 rounded-4 shadow-sm">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="contact-icon mb-3">
                                <i class="fas fa-briefcase fs-1 text-warning"></i>
                            </div>
                            <h5 class="card-title text-white mb-2">Disponibilidad</h5>
                            <p class="card-text text-light opacity-75 mb-0 small">Inmediata para nuevos proyectos</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
                <!-- formulario contacto
                <form class="contact-form" action="contact.php" method="POST">
                    <h3>Envíame un mensaje</h3>

                    <div class="form-group">
                        <label for="name">Nombre *</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="subject">Asunto *</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>

                    <div class="form-group">
                        <label for="message">Mensaje *</label>
                        <textarea id="message" name="message" required placeholder="Cuéntame sobre tu proyecto o oportunidad laboral..."></textarea>
                    </div>

                    <input type="text" name="website" style="display: none;">
                    
                    
                    <?php /*if (function_exists('getCSRFToken')): ?>
                        <input type="hidden" name="csrf_token" value="<?php echo getCSRFToken(); ?>">
                    <?php endif;*/ ?>

                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i>
                        Enviar Mensaje
                    </button>
                </form>
                   formulario contacto -->

                <!-- ...existing code continues... -->
            </div>
        </div>    </section>    <!-- Chat Flotante -->
    <div id="chat-overlay" class="chat-overlay bg-dark bg-opacity-75"></div>
    <div id="chat-toggle" class="chat-toggle d-flex justify-content-center align-items-center shadow-lg" title="Chatear con IA sobre Jorge">
        <img src="assets/img/caricatura.png" alt="Chat con Jorge" class="chat-toggle-img img-fluid">
    </div>

    <div id="chat-container" class="chat-container rounded shadow-lg">
        <div class="chat-header d-flex justify-content-between align-items-center p-3">
            <div class="chat-header-content d-flex align-items-center">
                <div class="chat-avatar me-3">
                    <img src="assets/img/caricatura.png" alt="Jorge Enrique Vizcaya" class="chat-avatar-img rounded-circle">
                </div>
                <div class="chat-info">
                    <h4 class="mb-0 fs-5 fw-bold">Asistente IA</h4>
                    <span class="chat-status text-success small">En línea</span>
                </div>
            </div>
            <button id="chat-close" class="chat-close btn btn-sm text-white border-0">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="chat-messages p-3" id="chat-messages">
            <!-- Los mensajes se cargarán dinámicamente por JavaScript -->
        </div>
        
        <div class="chat-input-container p-3 border-top">
            <div class="chat-input-wrapper d-flex align-items-center bg-light rounded p-2">
                <textarea 
                    id="chat-input" 
                    class="form-control border-0 bg-transparent"
                    placeholder="Escribe tu consulta aquí..." 
                    rows="1"
                    maxlength="1000"
                ></textarea>
                <button id="chat-send" class="chat-send-btn btn btn-sm text-primary bg-transparent border-0" title="Enviar mensaje">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="chat-typing mt-2 text-center" id="chat-typing" style="display: none;">
                <span class="bg-secondary rounded-circle d-inline-block me-1"></span>
                <span class="bg-secondary rounded-circle d-inline-block me-1"></span>
                <span class="bg-secondary rounded-circle d-inline-block"></span>
            </div>
        </div>
    </div>    <!-- Footer -->
    <footer class="footer bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 text-center">
                    <div class="footer-content mb-3">
                        <div class="footer-social mb-3">
                            <a href="https://github.com/<?php echo $github_usuario; ?>" target="_blank" rel="noopener" class="social-link btn btn-outline-light btn-sm rounded-circle me-2">
                                <i class="fab fa-github"></i>
                            </a>
                            <!--
                            <a href="<?php /*echo $linkedin;*/ ?>" target="_blank" rel="noopener" class="social-link btn btn-outline-light btn-sm rounded-circle me-2">
                                <i class="fab fa-linkedin"></i>
                            </a>
                             -->
                            <a href="mailto:<?php echo $email; ?>" class="social-link btn btn-outline-light btn-sm rounded-circle">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                        <p class="footer-text mb-0 small">
                            &copy; 2025 <?php echo $nombre; ?>. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer><!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Scripts -->    <script>
        // Configuración para JavaScript        window.GITHUB_USERNAME = '<?php echo $github_usuario; ?>';
    </script>    <script src="assets/js/portafolio.js?v=<?php echo time(); ?>"></script>
    <script src="assets/js/charla.js?v=<?php echo time(); ?>"></script>
</body>
</html>
