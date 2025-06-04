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
    <title><?php echo $nombre; ?> - <?php echo $profesion; ?></title>
    <meta name="description" content="Portafolio de <?php echo $nombre; ?>, desarrollador web especializado en tecnologías modernas">
      <!-- Estilos -->
    <link rel="stylesheet" href="assets/css/portafolio.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>    <!-- Navegación -->      <nav class="navbar">
        <div class="nav-container">
            <span class="logo"><?php echo explode(' ', $nombre)[0]; ?></span>
            <!-- Menú de Navegación para Escritorio -->
            <ul class="nav-menu desktop-menu">
                <li><a href="#inicio" class="nav-link active">Inicio</a></li>
                <li><a href="#sobre-mi" class="nav-link">Sobre Mí</a></li>
                <li><a href="#habilidades" class="nav-link">Habilidades</a></li>
                <li><a href="#proyectos" class="nav-link">Proyectos</a></li>
                <li><a href="#github" class="nav-link">GitHub</a></li>
                <li><a href="#contacto" class="nav-link">Contacto</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    <!-- Menú de Navegación Móvil -->
    <div class="nav-overlay mobile-menu">
        <ul class="nav-menu">
            <li><a href="#inicio" class="nav-link active">Inicio</a></li>
            <li><a href="#sobre-mi" class="nav-link">Sobre Mí</a></li>
            <li><a href="#habilidades" class="nav-link">Habilidades</a></li>
            <li><a href="#proyectos" class="nav-link">Proyectos</a></li>
            <li><a href="#github" class="nav-link">GitHub</a></li>
            <li><a href="#contacto" class="nav-link">Contacto</a></li>
        </ul>
    </div>

    <!-- Hero Section -->
    <section id="inicio" class="hero">
        <div class="floating-icons">
            <i class="fab fa-html5 floating-icon"></i>
            <i class="fab fa-css3-alt floating-icon"></i>
            <i class="fab fa-js-square floating-icon"></i>
            <i class="fab fa-php floating-icon"></i>
            <i class="fab fa-react floating-icon"></i>
            <i class="fab fa-git-alt floating-icon"></i>
        </div>
        <div class="container">
            <div class="hero-content">
                <p class="hero-subtitle">👋 Bienvenido a mi portafolio</p>
                <h1 class="hero-title">
                    Soy <?php echo $nombre; ?><br>
                    <span class="typing-text">Desarrollador Web</span>
                </h1>
                <p class="hero-description">
                    Recién graduado en desarrollo web con ganas de aplicar mis conocimientos 
                    en proyectos reales. Me esfuerzo por mantenerme actualizado y busco siempre la mejor solución para cada reto.
                    Siempre dispuesto a aprender y crecer profesionalmente,
                 
                </p>
                <div class="hero-buttons">
                    <a href="#proyectos" class="btn btn-primary">
                        <i class="fas fa-rocket"></i>
                        Ver Proyectos
                    </a>
                    <a href="#contacto" class="btn btn-outline">
                        <i class="fas fa-envelope"></i>
                        Contáctame
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Sobre Mí -->
    <section id="sobre-mi" class="about">
        <div class="container">
            <div class="section-title">
                <h2>Sobre Mí</h2>
                <p>Conoce un poco más sobre mi trayectoria y objetivos</p>
            </div>
            <div class="about-content">
                <div class="about-text">
                    <h3>Mi Historia</h3>
                    <p>
                        Recientemente completé un curso intensivo de desarrollo de aplicaciones 
                        web donde aprendí las bases sólidas de las tecnologías modernas. 
                        Aunque soy nuevo en el campo profesional, tengo una gran pasión por 
                        la programación y un fuerte deseo de crecer como desarrollador.
                    </p>
                    <p>
                        Me caracterizo por ser una persona curiosa, proactiva y con muchas 
                        ganas de aprender. Busco mi primera oportunidad profesional donde 
                        pueda aplicar mis conocimientos y seguir creciendo junto a un equipo experimentado.
                    </p>
                    <div class="about-stats">
                        <!-- Estadísticas 
                        <div class="stat-item">
                            <span class="stat-number counter" data-count="15">0</span>
                            <span class="stat-label">Proyectos de Práctica</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number counter" data-count="8">0</span>
                            <span class="stat-label">Tecnologías Aprendidas</span>
                        </div>
                        -->                        <div class="stat-item">
                            <span class="stat-number counter" data-count="605">0</span>
                            <span class="stat-label">Horas de Estudio</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number counter" data-count="100">0</span>
                            <span class="stat-label">% Motivación</span>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <div class="about-image-placeholder">
                        <i class="fas fa-user-graduate"></i>
                        <p>¡Listo para mi primera oportunidad profesional!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Habilidades -->
    <section id="habilidades" class="skills">
        <div class="container">
            <div class="section-title">
                <h2>Mis Habilidades</h2>
                <p>Tecnologías que he aprendido y competencias que he desarrollado</p>
            </div>            
            <div class="skills-container">
                <!-- Contenedor superior: Habilidades Técnicas y Reconocimiento IA lado a lado -->
                <div class="skills-top-grid">
                    <!-- Habilidades Técnicas -->
                    <div class="technical-skills">
                        <h3><i class="fas fa-laptop-code"></i> Habilidades Técnicas</h3>
                        <div class="ai-support-header">
                                <i class="fas fa-robot"></i>
                                <h4>Desarrollado con la ayuda inestimable de la IA</h4>
                            </div>
                            <p class="ai-support-description">
                                Todas estas habilidades técnicas han sido adquiridas y perfeccionadas 
                                con el apoyo constante de herramientas de inteligencia artificial, 
                                que han sido fundamentales en mi proceso de aprendizaje y desarrollo profesional.
                            </p>                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">PHP</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="45"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">JavaScript</span>
                                <span class="skill-percentage">50%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="50"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Java</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="40"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Python</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="45"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Node</span>
                                <span class="skill-percentage">35%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="35"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">React</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="40"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">MySQL</span>
                                <span class="skill-percentage">40%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="40"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Git & GitHub</span>
                                <span class="skill-percentage">55%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="55"></div>
                            </div>
                        </div>
                        
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Bootstrap</span>
                                <span class="skill-percentage">60%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="60"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">WordPress</span>
                                <span class="skill-percentage">50%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="50"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">Prestashop</span>
                                <span class="skill-percentage">45%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-percentage="45"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Habilidades Sociales - Debajo de ambas -->
                <div class="soft-skills">
                    <h3><i class="fas fa-users"></i> Habilidades Sociales</h3>
                    <div class="soft-skills-grid">
                        <div class="soft-skill-item">
                            <i class="fas fa-lightbulb"></i>
                            <h4>Aprendizaje Rápido</h4>
                            <p>Capacidad para asimilar nuevas tecnologías y conceptos</p>
                        </div>
                        
                        <div class="soft-skill-item">
                            <i class="fas fa-users-cog"></i>
                            <h4>Trabajo en Equipo</h4>
                            <p>Colaboración efectiva con otros desarrolladores</p>
                        </div>
                        
                        <div class="soft-skill-item">
                            <i class="fas fa-search"></i>
                            <h4>Resolución de Problemas</h4>
                            <p>Análisis lógico y búsqueda de soluciones creativas</p>
                        </div>
                        
                        <div class="soft-skill-item">
                            <i class="fas fa-comments"></i>
                            <h4>Comunicación</h4>
                            <p>Habilidad para explicar conceptos técnicos claramente</p>
                        </div>
                        
                        <div class="soft-skill-item">
                            <i class="fas fa-clock"></i>
                            <h4>Gestión del Tiempo</h4>
                            <p>Organización eficiente de tareas y proyectos</p>
                        </div>
                        
                        <div class="soft-skill-item">
                            <i class="fas fa-heart"></i>
                            <h4>Pasión por el Código</h4>
                            <p>Motivación genuina por el desarrollo web</p>
                        </div>
                    </div>
                </div>
                    
                    
                </div>
                
                
            </div>
        </div>
    </section>

    <!-- Proyectos -->
    <section id="proyectos" class="projects">
        <div class="container">
            <div class="section-title">
                <h2>Mis Proyectos</h2>
                <p>Proyectos desarrollados durante mi formación y práctica personal</p>
            </div>
            <div class="projects-grid">                <!-- Proyecto 1 -->
                 <div class="project-card">
                    <div class="project-icon">
                        <i class="fas fa-futbol"></i>
                    </div>
                    <h3>CeltaFan</h3>
                    <p>
                        CeltaFan es un portal para aficcionados del Celta de Vigo,
                        donde se pueden consultar noticias, resultados, plantilla, proximos partidos y más.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">Django</span>
                        <span class="tech-tag">SQLite</span>
                    </div>
                    <div class="project-links">
                        <a href="https://jorgevizcaya.pythonanywhere.com/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        <a href="https://github.com/JEVizcaya/pythonanywhere" class="project-link">
                            <i class="fab fa-github"></i>
                            Código
                        </a>
                    </div>
                </div>
                    <!-- Proyecto 2 -->
                <div class="project-card">
                    <div class="project-icon">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <h3>Gestor de Proyectos</h3>
                    <p>
                        Aplicación web para gestionar proyectos y asignar tareas a colaboradores con 
                        funcionalidades CRUD y interfaz intuitiva.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">PHP</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Javascript</span>
                    </div>
                    <div class="project-links">
                        <a href="https://devflow-je.web.app/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        <a href="https://github.com/JEVizcaya/devflow" class="project-link">
                            <i class="fab fa-github"></i>
                            Código
                        </a>
                    </div>
                </div>                <!-- Proyecto 3 -->
                <div class="project-card">
                    <div class="project-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3>Plantilla MVC + IA</h3>
                    <p>
                        Aplicación web que utiliza un patrón MVC con IA integrada para generar respuestas a preguntas frecuentes.
                        Incluye un sistema de gestión de usuarios y una interfaz amigable.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">PHP</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">CSS</span>
                    </div>
                    <div class="project-links">
                        <a href="https://prestashop2025.lovestoblog.com/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        <a href="https://github.com/JEVizcaya/basemvcphp" class="project-link">
                            <i class="fab fa-github"></i>
                            Código
                        </a>
                    </div>
                </div>                <!-- Proyecto 4 -->
                <div class="project-card">
                    <div class="project-icon">
                        <i class="fab fa-wordpress"></i>
                    </div>
                    <h3>Proyecto Wordpress</h3>
                    <p>
                        Sitio web desarrollado con WordPress que muestra la pagina web de un taller mecánico
                        incluyendo servicios, contacto y ubicación.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">PHP</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">CSS3</span>
                        
                    </div>
                    <div class="project-links">
                        <a href="https://jorgevizcaya.wuaze.com/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        
                    </div>
                </div>

                <!-- Proyecto 5 -->
                <div class="project-card">
                    <div class="project-icon">
                        <i class="fas fa-blog"></i>
                    </div>
                    <h3>Blog</h3>
                    <p>
                        Blog personal desarrollado con React + Node + Postgres, donde se pueden crear, editar y eliminar publicaciones.
                        Incluye autenticación de usuarios y una interfaz amigable.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Vite</span>
                        <span class="tech-tag">JavaScript</span>
                        <span class="tech-tag">MySQL</span>
                        
                    </div>
                    <div class="project-links">
                        <a href="https://jevizcaya.github.io/frontblog/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        <a href="https://github.com/JEVizcaya/frontblog" class="project-link">
                            <i class="fab fa-github"></i>
                            Código
                        </a>
                    </div>
                </div>

                <!-- Proyecto 6 -->
                <div class="project-card">
                    <div class="project-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>E-Commerce Simple</h3>
                    <p>
                        Tienda online básica desarrollada con Prestashop y MySQL. 
                        Incluye carrito de compras, gestión de productos y panel administrativo.
                    </p>
                    <div class="project-tech">
                        <span class="tech-tag">Prestashop</span>
                        <span class="tech-tag">MySQL</span>
                        <span class="tech-tag">CSS3</span>
                    </div>
                    <div class="project-links">
                        <a href="http://tiendajevv.rf.gd/" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            Ver Demo
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- GitHub Repos -->
    <section id="github" class="github">
        <div class="container">
            <div class="section-title">
                <h2>Mis Repositorios GitHub</h2>
                <p>Explora mi código y proyectos en GitHub</p>
            </div>
            <div class="github-stats">
                <div class="github-stat">
                    <i class="fab fa-github"></i>
                    <span class="stat-number" data-stat="repos">-</span>
                    <span class="stat-label">Repositorios</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-star"></i>
                    <span class="stat-number" data-stat="followers">-</span>
                    <span class="stat-label">Seguidores</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-code-branch"></i>
                    <span class="stat-number" data-stat="following">-</span>
                    <span class="stat-label">Siguiendo</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-file-code"></i>
                    <span class="stat-number" data-stat="gists">-</span>
                    <span class="stat-label">Gists</span>
                </div>
            </div>
            <div class="repos-container">
                <!-- Los repositorios se cargarán dinámicamente -->
            </div>
            <div class="text-center mt-4">
                <a href="https://github.com/<?php echo $github_usuario; ?>" target="_blank" rel="noopener" class="btn btn-outline">
                    <i class="fab fa-github"></i>
                    Ver perfil completo en GitHub
                </a>
            </div>
        </div>
    </section>

    <!-- Contacto -->
    <section id="contacto" class="contact">
        <div class="container">
            <div class="section-title">
                <h2>¡Hablemos!</h2>
                <p>Estoy buscando oportunidades para comenzar mi carrera profesional</p>
            </div>
            <div class="contact-container">
                <div class="contact-info">
                    <h3>Información de Contacto</h3>
                    
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <div class="contact-item-content">
                            <h4>Email</h4>
                            <p><?php echo $email; ?></p>
                        </div>
                    </div>
                    <!--
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <div class="contact-item-content">
                            <h4>LinkedIn</h4>
                            <p>Conecta conmigo profesionalmente</p>
                        </div>
                    </div> 
                     <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <div class="contact-item-content">
                            <h4>GitHub</h4>
                            <p>Revisa mi código y proyectos</p>
                        </div>
                    </div>
                    -->
                    
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <div class="contact-item-content">
                            <h4>Teléfono</h4>
                            <p>+34 645 82 75 93</p>
                        </div>
                        </div>  
                   
                    
                    <div class="contact-item">
                        <i class="fas fa-briefcase"></i>
                        <div class="contact-item-content">
                            <h4>Disponibilidad</h4>
                            <p>Inmediata para nuevos proyectos</p>
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
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-social">
                    <a href="https://github.com/<?php echo $github_usuario; ?>" target="_blank" rel="noopener" class="social-link">
                        <i class="fab fa-github"></i>
                    </a>
                    <!--
                    <a href="<?php /*echo $linkedin;*/ ?>" target="_blank" rel="noopener" class="social-link">
                        <i class="fab fa-linkedin"></i>
                    </a>
                     -->
                
                
                    <a href="mailto:<?php echo $email; ?>" class="social-link">
                        <i class="fas fa-envelope"></i>
                    </a>
                 </div>   
                </div>
                <p class="footer-text">
                    &copy; 2025 <?php echo $nombre; ?>. Desarrollado con ❤️ y muchas ganas de aprender.
                </p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->    <script>
        // Configuración para JavaScript
        window.GITHUB_USERNAME = '<?php echo $github_usuario; ?>';
    </script>
    <script src="assets/js/portafolio.js?v=<?php echo time(); ?>"></script>
</body>
</html>
