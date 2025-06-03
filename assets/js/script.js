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
    FORM_SUBMIT_DELAY: 1000
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
    elements.navMenu = document.querySelector('.nav-menu');
    elements.navLinks = document.querySelectorAll('.nav-link');
    
    elements.heroSubtitle = document.querySelector('.hero-subtitle');
    elements.heroTitle = document.querySelector('.hero-title');
    elements.heroDescription = document.querySelector('.hero-description');
    elements.typingElement = document.querySelector('.typing-text');
    
    elements.skillBars = document.querySelectorAll('.skill-progress');
    
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
    elements.navMenu = document.querySelector('.nav-menu');
    elements.navLinks = document.querySelectorAll('.nav-link');

    // Add index to nav items for staggered animation
    elements.navLinks?.forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });
    
    // Mobile menu toggle
    if (elements.hamburger && elements.navMenu) {
        elements.hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    elements.navLinks?.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.navMenu?.classList.contains('active') &&
            !elements.navMenu.contains(e.target) &&
            !elements.hamburger?.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function toggleMobileMenu() {
    elements.hamburger?.classList.toggle('active');
    elements.navMenu?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function handleNavClick(e) {
    const href = e.target.getAttribute('href');
    
    if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            elements.navMenu?.classList.remove('active');
            elements.hamburger?.classList.remove('active');
            document.body.style.overflow = '';
            
            // Smooth scroll to target
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active state
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
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all links
            elements.navLinks?.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            activeLink?.classList.add('active');
            
            state.currentSection = sectionId;
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
        "Desarrollador Web Junior",
        "Apasionado por el Código",
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
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateSkillBars();
                }, CONFIG.SKILL_BAR_DELAY);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

function animateSkillBars() {
    elements.skillBars?.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-percentage') || '0';
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
    
    card.innerHTML = `
        <div class="repo-header">
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-name">
                <i class="fab fa-github"></i> ${repo.name}
            </a>
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
