/*
 * ============================================================================
 * MODERN JUNIOR DEVELOPER PORTFOLIO - JAVASCRIPT
 * Handles all interactive functionality
 * ============================================================================
 */

// Global configuration
const CONFIG = {
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
    
    // Contact form
    contactForm: null,
    
    // General
    revealElements: null,
    counters: null
};

// Global state
const state = {
    isLoading: false,
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
    // Reiniciar todas las barras de progreso a 0% antes de inicializar
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0%';
    });
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
        
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Add scroll listeners for navigation
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
    }, 16));
        
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
    elements.hamburger = document.querySelector('.navbar-toggler');
    elements.mobileMenu = document.querySelector('#navbarNav');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.navMenu = document.querySelector('.navbar-nav');
    
    // Debug logging
    console.log('🔍 Cached elements:', {
        navbar: !!elements.navbar,
        hamburger: !!elements.hamburger,
        mobileMenu: !!elements.mobileMenu,
        navLinksCount: elements.navLinks.length,
        navMenu: !!elements.navMenu
    });
    
    elements.heroSubtitle = document.querySelector('.hero-subtitle');
    elements.heroTitle = document.querySelector('.hero-title');
    elements.heroDescription = document.querySelector('.hero-description');
    elements.typingElement = document.querySelector('.typing-text');
    
    // Cachear skill bars con más detalle para debugging
    elements.skillBars = document.querySelectorAll('.skill-progress');
    console.log(`🎯 Cached ${elements.skillBars.length} skill bars`);
    
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
    if (!elements.navMenu) return;
    
    // Add index to nav items for staggered animation
    const mobileMenuItems = elements.mobileMenu?.querySelectorAll('.navbar-nav li');
    mobileMenuItems?.forEach((link, index) => {
        link.style.setProperty('--item-index', index);
    });
    
    // NO agregamos event listener al hamburger, Bootstrap lo maneja automáticamente
    
    // Smooth scrolling for navigation links
    elements.navLinks?.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.mobileMenu?.classList.contains('show') &&
            !elements.mobileMenu.contains(e.target) &&
            !elements.hamburger?.contains(e.target)) {
            // Usar Bootstrap para cerrar el menú
            const bsCollapse = bootstrap.Collapse.getInstance(elements.mobileMenu);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });    // Escuchar eventos de Bootstrap collapse
    if (elements.mobileMenu) {
        elements.mobileMenu.addEventListener('shown.bs.collapse', () => {
            document.body.classList.add('menu-open');
            hideChatToggle();
        });
        
        elements.mobileMenu.addEventListener('hidden.bs.collapse', () => {
            document.body.classList.remove('menu-open');
            showChatToggle();
        });
    }
    
    // Handle window resize to reset chat visibility
    window.addEventListener('resize', () => {
        const chatToggle = document.getElementById('chat-toggle') || document.querySelector('.chat-toggle');
        if (chatToggle && window.innerWidth > 768) {
            // En desktop, asegurar que el chat esté visible
            showChatToggle();
        }
    });
    
    // Initial active state
    updateActiveNavLink();
}

function toggleMobileMenu(e) {
    // Si el evento viene de Bootstrap, no hacer nada (ya se maneja automáticamente)
    if (e && e.target && e.target.hasAttribute('data-bs-toggle')) {
        return;
    }
    
    // Prevenir cualquier comportamiento por defecto para eventos manuales
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const body = document.body;
    
    // Usar Bootstrap collapse para manejar el menú
    if (elements.mobileMenu) {
        const bsCollapse = new bootstrap.Collapse(elements.mobileMenu, {
            toggle: true
        });
        
        // Actualizar estados del botón hamburguesa
        const isExpanded = elements.hamburger?.getAttribute('aria-expanded') === 'true';
        elements.hamburger?.classList.toggle('collapsed', isExpanded);
        elements.hamburger?.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        body.classList.toggle('menu-open', !isExpanded);
    }
    
    // Ocultar/mostrar el botón del chat cuando se abre/cierra el menú móvil
    const chatToggle = document.getElementById('chat-toggle') || document.querySelector('.chat-toggle');
    const isMenuOpen = body.classList.contains('menu-open');
    
    if (chatToggle) {
        if (isMenuOpen) {
            // Ocultar el chat
            chatToggle.style.opacity = '0';
            chatToggle.style.visibility = 'hidden';
            chatToggle.style.pointerEvents = 'none';
            chatToggle.style.transform = 'scale(0.1)';
            chatToggle.style.transition = 'all 0.3s ease';
        } else {
            // Mostrar el chat
            chatToggle.style.opacity = '1';
            chatToggle.style.visibility = 'visible';
            chatToggle.style.pointerEvents = 'auto';
            chatToggle.style.transform = 'scale(1)';
            chatToggle.style.transition = 'all 0.3s ease';
        }
    }
}

function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Cerrar menú móvil si está abierto (Bootstrap collapse)
            if (elements.mobileMenu?.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(elements.mobileMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            
            // Actualizar el estado activo inmediatamente en el enlace actual
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Scroll suave al objetivo
            const offsetTop = targetElement.offsetTop - 80; // Ajuste para el navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function hideChatToggle() {
    const chatToggle = document.getElementById('chat-toggle') || document.querySelector('.chat-toggle');
    if (chatToggle) {
        chatToggle.style.opacity = '0';
        chatToggle.style.visibility = 'hidden';
        chatToggle.style.pointerEvents = 'none';
        chatToggle.style.transform = 'scale(0.1)';
        chatToggle.style.transition = 'all 0.3s ease';
    }
}

function showChatToggle() {
    const chatToggle = document.getElementById('chat-toggle') || document.querySelector('.chat-toggle');
    if (chatToggle) {
        chatToggle.style.opacity = '1';
        chatToggle.style.visibility = 'visible';
        chatToggle.style.pointerEvents = 'auto';
        chatToggle.style.transform = 'scale(1)';
        chatToggle.style.transition = 'all 0.3s ease';
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
    
    // Primero eliminamos la clase 'active' de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Luego identificamos qué sección está visible y activamos su enlace
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Si encontramos una sección actual, activamos su enlace
    if (currentSection) {
        const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
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
        console.log('⚠️ Animations disabled due to user preference');
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
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.revealElements?.forEach(el => {
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
    let marqueeTimeout = null;

    function isMobile() {
        return window.innerWidth <= 767;
    }
    function needsMarquee() {
        if (!isMobile()) return false;
        // Medir si el texto es más largo que el contenedor visible
        if (!typingElement.parentElement) return false;
        // Forzar render para obtener ancho real
        typingElement.style.maxWidth = '90vw';
        typingElement.style.whiteSpace = 'nowrap';
        return typingElement.scrollWidth > typingElement.offsetWidth + 2;
    }
    function setMarquee(active) {
        if (active) {
            typingElement.classList.add('marquee');
        } else {
            typingElement.classList.remove('marquee');
        }
    }
    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setMarquee(false);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        let typingSpeed = CONFIG.TYPING_SPEED;
        if (isDeleting) {
            typingSpeed /= 2;
        }
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1500;
            // Solo activar marquee si es móvil y el texto desborda
            if (needsMarquee()) {
                // Esperar un poco antes de activar marquee para que el usuario vea el texto completo
                marqueeTimeout = setTimeout(() => setMarquee(true), 500);
            }
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
            setMarquee(false);
            if (marqueeTimeout) {
                clearTimeout(marqueeTimeout);
                marqueeTimeout = null;
            }
        }
        setTimeout(type, typingSpeed);
    }
    setTimeout(type, 2000);
}

/**
 * ============================================================================
 * SKILL BARS
 * ============================================================================
 */

function initializeSkillBars() {
    if (!state.animationsEnabled) {
        console.log('⚠️ Skill bar animations disabled');
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
    const counterElements = document.querySelectorAll('.counter');
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
    // Eliminar la sobrescritura de transform en los iconos flotantes para permitir la animación CSS continua
    // const floatingIcons = document.querySelectorAll('.floating-icon');
    // floatingIcons.forEach((icon, index) => {
    //     const rate = scrolled * (0.1 + index * 0.05);
    //     icon.style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
    // });
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Volver al inicio');
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        const shouldShow = window.pageYOffset > 200; // Aparece más temprano
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
}

/**
 * ============================================================================
 * PUBLIC API
 * ============================================================================
 */

// Expose functions for external use
window.Portfolio = {
    updateActiveNavLink,
    toggleMobileMenu,
    showFormMessage,
    animateSkillBars,
    resetAndAnimateSkillBars,
    state,
    CONFIG
};

// Global error handler
window.addEventListener('error', (e) => {
    console.error('💥 Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('💥 Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the default handling
});

console.log('📋 Junior Developer Portfolio JavaScript loaded successfully!');
