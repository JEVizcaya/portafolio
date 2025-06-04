/*
 * ============================================================================
 * MODERN JUNIOR DEVELOPER PORTFOLIO - JAVASCRIPT
 * Handles all interactive functionality and GitHub API integration
 * ============================================================================
 */

// Global configuration
const CONFIG = {
    // GitHub API settings
    GITHUB_API_BASE: 'https://api.github.com',
    REPOS_TO_SHOW: 6,
    ANIMATION_DELAY: 100,
    TYPING_SPEED: 100,
    
    // Animation settings
    SCROLL_REVEAL_DELAY: 200,
    COUNTER_ANIMATION_DURATION: 2000,
    SKILL_BAR_DELAY: 500,
    
    // Contact form settings
    FORM_SUBMIT_DELAY: 1000,    // Manual repository selection (set specific repos to display)
    // If empty array, will fetch latest repos automatically
    SELECTED_REPOS: [
        // Examples - replace with your actual repository names:
        // Uncomment and modify these lines to manually select repositories:
         'Checkandfood-1',
         'planes-app', 
         'formacomtrello',
         'apptask',
         'tiendamvcj',
         'portafolio'
    ],
    
    // Set to true to use manual selection, false for automatic latest repos
    USE_MANUAL_SELECTION: true
};

// DOM elements cache
const elements = {
    // Navigation
    navbar: null,
    hamburger: null,
    navMenu: null,
    navLinks: null,
    
    // Hero section
    heroSubtitle: null,
    heroTitle: null,
    heroDescription: null,
    typingElement: null,
    
    // Skills
    skillBars: null,
    
    // GitHub
    githubStats: null,
    reposContainer: null,
    
    // Contact form
    contactForm: null,
    
    // General
    revealElements: null,
    counters: null
};

// Global state
const state = {
    isLoading: false,
    githubData: null,
    currentSection: 'hero',
    animationsEnabled: true,
    formSubmitted: false
};

/**
 * ============================================================================
 * INITIALIZATION
 * ============================================================================
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * Main initialization function
 */
function initializePortfolio() {
    console.log('🚀 Initializing Junior Developer Portfolio...');
    
    try {
        // Cache DOM elements
        cacheElements();
        
        // Initialize components
        initializeNavigation();
        initializeAnimations();
        initializeSkillBars();
        initializeCounters();
        initializeScrollReveal();
        initializeContactForm();
        initializeTypingEffect();
        
        // Load GitHub data
        loadGitHubData();
        
        // Initialize scroll effects
        initializeScrollEffects();
        
        console.log('✅ Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);
        // Graceful fallback
        fallbackMode();
    }
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements.navbar = document.querySelector('.navbar');
    elements.hamburger = document.querySelector('.hamburger');
    elements.mobileMenu = document.querySelector('.mobile-menu');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.navMenu = document.querySelector('.nav-menu');
    
    elements.heroSubtitle = document.querySelector('.hero-subtitle');
    elements.heroTitle = document.querySelector('.hero-title');
    elements.heroDescription = document.querySelector('.hero-description');
    elements.typingElement = document.querySelector('.typing-text');
    
    // Cachear skill bars con más detalle para debugging
    elements.skillBars = document.querySelectorAll('.skill-progress');
    console.log(`🎯 Cached ${elements.skillBars.length} skill bars`);
    
    elements.githubStats = document.querySelectorAll('.github-stat .stat-number');
    elements.reposContainer = document.querySelector('.repos-container');
    
    elements.contactForm = document.querySelector('.contact-form');
    
    elements.revealElements = document.querySelectorAll('.reveal');
    elements.counters = document.querySelectorAll('.counter');
}

/**
 * ============================================================================
 * NAVIGATION
 * ============================================================================
 */

function initializeNavigation() {
    // Cache DOM elements
    elements.navbar = document.querySelector('.navbar');
    elements.hamburger = document.querySelector('.hamburger');
    elements.mobileMenu = document.querySelector('.mobile-menu');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.navMenu = document.querySelector('.nav-menu');

    // Add index to nav items for staggered animation
    const mobileMenuItems = elements.mobileMenu?.querySelectorAll('.nav-menu li');
    mobileMenuItems?.forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });
    
    // Mobile menu toggle
    if (elements.hamburger && elements.mobileMenu) {
        elements.hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    elements.navLinks?.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.mobileMenu?.classList.contains('active') &&
            !elements.mobileMenu.querySelector('.nav-menu').contains(e.target) &&
            !elements.hamburger?.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initial active state
    updateActiveNavLink();
}

function toggleMobileMenu(e) {
    // Prevenir cualquier comportamiento por defecto
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    elements.hamburger?.classList.toggle('active');
    elements.mobileMenu?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Cerrar menú móvil si está abierto
            if (elements.mobileMenu?.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Scroll suave al objetivo
            const offsetTop = targetElement.offsetTop - 80; // Ajuste para el navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Actualizar el estado activo
            updateActiveNavLink();
        }
    }
}

function handleNavbarScroll() {
    if (elements.navbar) {
        const scrolled = window.scrollY > 50;
        elements.navbar.classList.toggle('scrolled', scrolled);
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Ajuste para la detección

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Actualizar todos los enlaces que apuntan a esta sección
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * ============================================================================
 * ANIMATIONS
 * ============================================================================
 */

function initializeAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    state.animationsEnabled = !prefersReducedMotion;
    
    if (!state.animationsEnabled) {
        console.log('🎭 Animations disabled due to user preference');
        return;
    }
    
    // Add loading class to prevent flash of unstyled content
    document.body.classList.add('loading');
    
    // Remove loading class after a brief delay
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
}

function initializeScrollReveal() {
    if (!state.animationsEnabled) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, CONFIG.SCROLL_REVEAL_DELAY);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.revealElements?.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

function initializeTypingEffect() {
    const typingElement = elements.typingElement;
    if (!typingElement || !state.animationsEnabled) return;
    
    const texts = [
        "Desarrollador Web",
        
        "Siempre Aprendiendo",
        "Listo para Crear"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : CONFIG.TYPING_SPEED;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect after hero animation
    setTimeout(type, 2000);
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Debounce function to limit how often a function can be called
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    ) || (
        rect.top < windowHeight &&
        rect.bottom >= 0
    );
}

/**
 * ============================================================================
 * SKILL BARS
 * ============================================================================
 */

function initializeSkillBars() {
    if (!state.animationsEnabled) {
        // If animations are disabled, show full bars immediately
        elements.skillBars?.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            bar.style.width = percentage + '%';
        });
        return;
    }
    
    const skillsSection = document.querySelector('.skills');
    const technicalSkillsSection = document.querySelector('.technical-skills');
    
    if (!skillsSection && !technicalSkillsSection) {
        console.warn('⚠️ Skills section not found');
        return;
    }
    
    // Detectar si estamos en mobile para ajustar threshold
    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 0.1 : 0.3;
    
    console.log(`🎯 Initializing skill bars - Mobile: ${isMobile}, Threshold: ${threshold}`);
    
    // Crear observer para la sección de habilidades
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('📊 Skills section is visible, starting animation...');
                setTimeout(() => {
                    animateSkillBars();
                }, CONFIG.SKILL_BAR_DELAY);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger earlier on mobile
    });
    
    // Observar tanto la sección completa como la técnica específicamente
    if (skillsSection) observer.observe(skillsSection);
    if (technicalSkillsSection) observer.observe(technicalSkillsSection);
    
    // También agregar listener para cambios de orientación en móvil
    window.addEventListener('resize', debounce(() => {
        // Re-seleccionar elementos por si cambiaron
        elements.skillBars = document.querySelectorAll('.skill-progress');
        console.log(`📱 Screen resized, skill bars count: ${elements.skillBars.length}`);
        
        // Si las barras no se han animado y están visibles, animarlas
        const skillsVisible = isElementInViewport(skillsSection || technicalSkillsSection);
        if (skillsVisible && elements.skillBars.length > 0) {
            const firstBar = elements.skillBars[0];
            if (firstBar && firstBar.style.width === '0%') {
                console.log('🔄 Re-triggering animations after resize');
                setTimeout(() => animateSkillBars(), 500);
            }
        }
    }, 250));
}

function animateSkillBars() {
    // Re-seleccionar elementos por si no se cachearon correctamente
    const skillBars = document.querySelectorAll('.skill-progress');
    
    console.log(`🎨 Animating ${skillBars.length} skill bars`);
    
    if (!skillBars.length) {
        console.warn('⚠️ No skill bars found for animation');
        return;
    }
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            console.log(`📊 Animating skill bar ${index + 1}: ${percentage}%`);
            
            bar.style.width = percentage + '%';
            
            // Add a subtle bounce effect
            setTimeout(() => {
                bar.style.transform = 'scaleY(1.1)';
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, 200);
            }, 500);
        }, index * 200);
    });
}

/**
 * Reset and re-animate skill bars (for testing/debugging)
 */
function resetAndAnimateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    console.log(`🔄 Resetting ${skillBars.length} skill bars`);
    
    // First reset all bars to 0%
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transform = 'scaleY(1)';
    });
    
    // Then animate them after a short delay
    setTimeout(() => {
        animateSkillBars();
    }, 100);
}

/**
 * ============================================================================
 * COUNTERS
 * ============================================================================
 */

function initializeCounters() {
    const counterElements = document.querySelectorAll('.counter, .stat-number');
    if (!counterElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent.replace(/\D/g, ''));
    const duration = CONFIG.COUNTER_ANIMATION_DURATION;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    if (state.animationsEnabled) {
        updateCounter();
    } else {
        element.textContent = target;
    }
}

/**
 * ============================================================================
 * REPOSITORY MANAGEMENT UTILITIES
 * ============================================================================
 */

/**
 * Switch between automatic and manual repository selection
 * @param {boolean} useManual - True for manual selection, false for automatic
 * @param {Array} selectedRepos - Array of repository names (only used if useManual is true)
 */
function switchRepositoryMode(useManual, selectedRepos = []) {
    CONFIG.USE_MANUAL_SELECTION = useManual;
    if (useManual && selectedRepos.length > 0) {
        CONFIG.SELECTED_REPOS = selectedRepos;
    }
    
    console.log(`🔄 Switched to ${useManual ? 'manual' : 'automatic'} repository mode`);
    
    // Reload GitHub data with new settings
    loadGitHubData();
}

/**
 * Add a repository to the manual selection list
 * @param {string} repoName - Name of the repository to add
 */
function addRepositoryToSelection(repoName) {
    if (!CONFIG.SELECTED_REPOS.includes(repoName)) {
        CONFIG.SELECTED_REPOS.push(repoName);
        console.log(`➕ Added repository: ${repoName}`);
        
        if (CONFIG.USE_MANUAL_SELECTION) {
            loadGitHubData();
        }
    } else {
        console.warn(`⚠️ Repository ${repoName} is already in selection`);
    }
}

/**
 * Remove a repository from the manual selection list
 * @param {string} repoName - Name of the repository to remove
 */
function removeRepositoryFromSelection(repoName) {
    const index = CONFIG.SELECTED_REPOS.indexOf(repoName);
    if (index > -1) {
        CONFIG.SELECTED_REPOS.splice(index, 1);
        console.log(`➖ Removed repository: ${repoName}`);
        
        if (CONFIG.USE_MANUAL_SELECTION) {
            loadGitHubData();
        }
    } else {
        console.warn(`⚠️ Repository ${repoName} not found in selection`);
    }
}

/**
 * ============================================================================
 * GITHUB INTEGRATION
 * ============================================================================
 */

async function loadGitHubData() {
    // Get GitHub username from PHP (it should be available in a script tag)
    const githubUsername = window.GITHUB_USERNAME || 'tu-usuario-github';
    
    if (!githubUsername || githubUsername === 'tu-usuario-github') {
        console.warn('⚠️ GitHub username not configured');
        showGitHubFallback();
        return;
    }
    
    try {
        console.log(`📊 Loading GitHub data for: ${githubUsername}`);
        
        // Repository Selection System:
        // 1. Set CONFIG.USE_MANUAL_SELECTION = true to enable manual selection
        // 2. Add repository names to CONFIG.SELECTED_REPOS array
        // 3. Repositories will appear in the order specified (or sorted by update date)
        // 4. Set CONFIG.USE_MANUAL_SELECTION = false for automatic latest repos
        
        if (CONFIG.USE_MANUAL_SELECTION) {
            console.log('🎯 Using manual repository selection mode');
        } else {
            console.log('🔄 Using automatic latest repositories mode');
        }
        
        state.isLoading = true;
        
        // Show loading state
        showLoadingState();
        
        // Fetch user data and repositories in parallel
        const [userData, reposData] = await Promise.all([
            fetchGitHubUser(githubUsername),
            fetchGitHubRepos(githubUsername)
        ]);
        
        state.githubData = { user: userData, repos: reposData };
        
        // Update UI with fetched data
        updateGitHubStats(userData);
        displayRepositories(reposData);
        
        console.log('✅ GitHub data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading GitHub data:', error);
        showGitHubError();
    } finally {
        state.isLoading = false;
        hideLoadingState();
    }
}

async function fetchGitHubUser(username) {
    const response = await fetch(`${CONFIG.GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
}

async function fetchGitHubRepos(username) {
    // If manual selection is enabled and repositories are configured, fetch only those
    if (CONFIG.USE_MANUAL_SELECTION && CONFIG.SELECTED_REPOS && CONFIG.SELECTED_REPOS.length > 0) {
        return await fetchSelectedRepositories(username, CONFIG.SELECTED_REPOS);
    }
    
    // Otherwise, fetch latest repositories automatically
    const response = await fetch(
        `${CONFIG.GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${CONFIG.REPOS_TO_SHOW * 2}`
    );
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    const repos = await response.json();
    
    // Filter and sort repositories
    return repos
        .filter(repo => !repo.fork) // Exclude forks
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, CONFIG.REPOS_TO_SHOW);
}

async function fetchSelectedRepositories(username, repoNames) {
    const repositories = [];
    
    console.log(`🎯 Fetching ${repoNames.length} manually selected repositories...`);
    
    // Fetch each selected repository individually
    for (const repoName of repoNames) {
        try {
            const response = await fetch(`${CONFIG.GITHUB_API_BASE}/repos/${username}/${repoName}`);
            if (response.ok) {
                const repo = await response.json();
                repositories.push(repo);
                console.log(`✅ Successfully loaded repository: ${repoName}`);
            } else {
                console.warn(`⚠️ Repository ${repoName} not found or not accessible (Status: ${response.status})`);
            }
        } catch (error) {
            console.error(`❌ Error fetching repository ${repoName}:`, error);
        }
    }
    
    console.log(`📦 Loaded ${repositories.length} repositories successfully`);
    
    // Sort by update date and limit to configured amount
    // Note: When using manual selection, repositories will appear in the order specified in SELECTED_REPOS
    // unless you want them sorted by update date (uncomment the next line)
    // return repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, CONFIG.REPOS_TO_SHOW);
    
    // Return repositories in the order they were specified
    return repositories.slice(0, CONFIG.REPOS_TO_SHOW);
}

function updateGitHubStats(userData) {
    const stats = {
        repos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
        gists: userData.public_gists || 0
    };
    
    // Update stat numbers with animation
    Object.entries(stats).forEach(([key, value]) => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            element.setAttribute('data-count', value);
            if (state.animationsEnabled) {
                animateCounter(element);
            } else {
                element.textContent = value;
            }
        }
    });
}

function displayRepositories(repos) {
    if (!elements.reposContainer) return;
    
    elements.reposContainer.innerHTML = '';
    
    repos.forEach((repo, index) => {
        const repoCard = createRepositoryCard(repo);
        elements.reposContainer.appendChild(repoCard);
        
        // Animate cards in sequence
        if (state.animationsEnabled) {
            setTimeout(() => {
                repoCard.classList.add('fade-in');
            }, index * CONFIG.ANIMATION_DELAY);
        }
    });
}

function createRepositoryCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    
    // Format dates
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Get primary language color
    const languageColor = getLanguageColor(repo.language);
    
    card.innerHTML = `        <div class="repo-header">
            <span class="repo-name">
                <i class="fab fa-github"></i> ${repo.name}
            </span>
            ${repo.private ? '<span class="repo-private">Privado</span>' : ''}
        </div>
        
        ${repo.description ? `<p class="repo-description">${repo.description}</p>` : ''}
        
        <div class="repo-stats">
            ${repo.language ? `
                <span class="repo-stat">
                    <span class="language-dot" style="background-color: ${languageColor}"></span>
                    ${repo.language}
                </span>
            ` : ''}
            
            <span class="repo-stat">
                <i class="fas fa-star"></i>
                ${repo.stargazers_count}
            </span>
            
            <span class="repo-stat">
                <i class="fas fa-code-branch"></i>
                ${repo.forks_count}
            </span>
            
            <span class="repo-stat">
                <i class="fas fa-clock"></i>
                ${updatedDate}
            </span>
        </div>
        
        ${repo.topics && repo.topics.length > 0 ? `
            <div class="repo-topics">
                ${repo.topics.slice(0, 3).map(topic => 
                    `<span class="topic-tag">${topic}</span>`
                ).join('')}
            </div>
        ` : ''}
        
        <div class="repo-links">
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-link">
                <i class="fas fa-external-link-alt"></i>
                Ver Código
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" rel="noopener" class="repo-link">
                    <i class="fas fa-globe"></i>
                    Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C#': '#239120',
        'PHP': '#4F5D95',
        'C++': '#f34b7d',
        'C': '#555555',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Ruby': '#701516',
        'HTML': '#e34c26',
        'CSS': '#1572B6',
        'Vue': '#2c3e50',
        'React': '#61dafb',
        'Angular': '#dd0031'
    };
    
    return colors[language] || '#6c757d';
}

function showLoadingState() {
    if (elements.reposContainer) {
        elements.reposContainer.innerHTML = `
            <div class="loading-placeholder">
                <div class="loading-spinner"></div>
                <p>Cargando repositorios de GitHub...</p>
            </div>
        `;
    }
}

function hideLoadingState() {
    const loadingElement = document.querySelector('.loading-placeholder');
    if (loadingElement) {
        loadingElement.remove();
    }
}

function showGitHubError() {
    if (elements.reposContainer) {
        elements.reposContainer.innerHTML = `
            <div class="github-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error al cargar repositorios</h3>
                <p>No se pudieron cargar los repositorios de GitHub. Por favor, verifica la configuración.</p>
                <button onclick="loadGitHubData()" class="btn btn-primary">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
    }
}

function showGitHubFallback() {
    if (elements.reposContainer) {
        elements.reposContainer.innerHTML = `
            <div class="github-placeholder">
                <i class="fab fa-github"></i>
                <h3>Conecta tu GitHub</h3>
                <p>Configura tu nombre de usuario de GitHub para mostrar tus repositorios automáticamente.</p>
            </div>
        `;
    }
}

/**
 * ============================================================================
 * CONTACT FORM
 * ============================================================================
 */

function initializeContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Add real-time validation
    const inputs = elements.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    if (state.formSubmitted) return;
    
    const formData = new FormData(e.target);
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateForm(e.target)) {
        showFormMessage('Por favor, completa todos los campos correctamente.', 'error');
        return;
    }
    
    try {
        // Show loading state
        state.formSubmitted = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        await submitContactForm(formData);
        
        // Show success message
        showFormMessage('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        e.target.reset();
        
    } catch (error) {
        console.error('❌ Error submitting form:', error);
        showFormMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Reset button state
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            submitButton.disabled = false;
            state.formSubmitted = false;
        }, CONFIG.FORM_SUBMIT_DELAY);
    }
}

async function submitContactForm(formData) {
    // This would typically submit to contact.php
    const response = await fetch('contact.php', {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Form submission failed');
    }
    
    return await response.json();
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es requerido.';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, ingresa un email válido.';
            isValid = false;
        }
    }
    
    // Name validation
    if (field.name === 'name' && value && value.length < 2) {
        errorMessage = 'El nombre debe tener al menos 2 caracteres.';
        isValid = false;
    }
    
    // Message validation
    if (field.name === 'message' && value && value.length < 10) {
        errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
        isValid = false;
    }
    
    // Show/hide error
    showFieldError(field, isValid ? '' : errorMessage);
    
    return isValid;
}

function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.classList.toggle('error', !!message);
    
    // Add error message
    if (message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = elements.contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message at the top of the form
    elements.contactForm.insertBefore(messageElement, elements.contactForm.firstChild);
    
    // Auto-remove success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

/**
 * ============================================================================
 * SCROLL EFFECTS
 * ============================================================================
 */

function initializeScrollEffects() {
    // Parallax effect for hero section
    if (state.animationsEnabled) {
        window.addEventListener('scroll', throttle(handleParallaxScroll, 16));
    }
    
    // Scroll to top button
    createScrollToTopButton();
}

function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Floating icons parallax
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const rate = scrolled * (0.1 + index * 0.05);
        icon.style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
    });
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Volver al inicio');
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        const shouldShow = window.pageYOffset > 300;
        button.classList.toggle('visible', shouldShow);
    }, 100));
    
    // Handle click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function fallbackMode() {
    console.log('🔧 Running in fallback mode');
    
    // Disable animations
    state.animationsEnabled = false;
    
    // Show all content immediately
    elements.revealElements?.forEach(el => {
        el.classList.add('active');
    });
    
    // Show skill bars at full width
    elements.skillBars?.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || '0';
        bar.style.width = percentage + '%';
    });
    
    // Show GitHub fallback
    showGitHubFallback();
}

/**
 * ============================================================================
 * PUBLIC API
 * ============================================================================
 */

// Expose functions for external use
window.Portfolio = {
    loadGitHubData,
    updateActiveNavLink,
    toggleMobileMenu,
    showFormMessage,
    animateSkillBars, // Expose skill bar animation for manual triggering
    resetAndAnimateSkillBars, // Expose reset function for testing
    // Repository management functions
    switchRepositoryMode,
    addRepositoryToSelection,
    removeRepositoryFromSelection,
    state,
    CONFIG
};

// For debugging in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.PortfolioDebug = {
        elements,
        state,
        CONFIG,
        // Debug functions
        triggerAnimation: (element) => element?.classList.add('active'),
        reloadGitHub: loadGitHubData,
        testFormValidation: validateForm
    };
    
    console.log('🐛 Debug mode enabled. Use window.PortfolioDebug for debugging.');
}

/**
 * ============================================================================
 * ERROR HANDLING
 * ============================================================================
 */

// Global error handler
window.addEventListener('error', (e) => {
    console.error('💥 Global error:', e.error);
    
    // Don't break the site for small errors
    if (e.error && e.error.message && !e.error.message.includes('GitHub')) {
        // Log to analytics service in production
        // Analytics.track('portfolio_error', { message: e.error.message });
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('💥 Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the default handling
});

/**
 * ============================================================================
 * PERFORMANCE OPTIMIZATIONS
 * ============================================================================
 */

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call preload when appropriate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadResources);
} else {
    preloadResources();
}

console.log('📋 Junior Developer Portfolio JavaScript loaded successfully!');
