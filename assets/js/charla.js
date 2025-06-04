/**
 * Chat con IA - Sistema de chat integrado para el portafolio de Jorge Enrique Vizcaya Vega
 */

class PortfolioChat {
    constructor() {
        this.chatContainer = null;
        this.chatToggle = null;
        this.chatMessages = null;
        this.chatInput = null;
        this.chatSendBtn = null;
        this.chatTyping = null;
        this.isOpen = false;
        this.isProcessing = false;
        this.messageHistory = [];
        
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeElements());
        } else {
            this.initializeElements();
        }
    }    initializeElements() {
        console.log('Initializing chat elements...');
        
        // Obtener elementos del DOM
        this.chatContainer = document.getElementById('chat-container');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSendBtn = document.getElementById('chat-send');
        this.chatTyping = document.getElementById('chat-typing');
        
        console.log('Chat elements found:', {
            chatContainer: !!this.chatContainer,
            chatToggle: !!this.chatToggle,
            chatMessages: !!this.chatMessages,
            chatInput: !!this.chatInput,
            chatSendBtn: !!this.chatSendBtn,
            chatTyping: !!this.chatTyping
        });
        
        if (!this.chatContainer || !this.chatToggle) {
            console.warn('Chat elements not found in DOM, retrying...');
            // Intentar de nuevo después de un breve delay
            setTimeout(() => this.initializeElements(), 1000);
            return;
        }
        
        this.setupEventListeners();
        this.loadChatHistory();
        this.updateMessageTimes();
        this.initializeButtonVisibility();
        
        console.log('Portfolio Chat initialized successfully');
    }
      initializeButtonVisibility() {
        // Asegurar que el botón sea siempre visible
        if (this.chatToggle) {
            this.chatToggle.style.display = 'flex';
            this.chatToggle.style.visibility = 'visible';
            this.chatToggle.style.opacity = '1';
            this.chatToggle.classList.add('has-notification');
            
            console.log('Chat button visibility set');
            
            // Remover la notificación después de 5 segundos
            setTimeout(() => {
                this.chatToggle.classList.remove('has-notification');
            }, 5000);
        }
    }
      setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Toggle del chat
        if (this.chatToggle) {
            this.chatToggle.addEventListener('click', (e) => {
                console.log('Chat toggle clicked');
                e.preventDefault();
                this.toggleChat();
            });
            console.log('Chat toggle listener added');
        }
        
        // Botón de cerrar
        const closeBtn = document.getElementById('chat-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }
        
        // Botón de enviar
        if (this.chatSendBtn) {
            this.chatSendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        // Enter para enviar mensaje
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Auto-resize del textarea
            this.chatInput.addEventListener('input', () => this.autoResizeTextarea());
        }        // Crear y manejar overlay para móviles
        this.createChatOverlay();
        
        // Cerrar chat al hacer clic fuera (mejorado para móviles)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatContainer.contains(e.target) && !this.chatToggle.contains(e.target)) {
                this.closeChat();
            }
        });
        
        // Cerrar chat con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
        
        // Manejar cambios de orientación en móviles
        window.addEventListener('orientationchange', () => {
            if (this.isOpen) {
                setTimeout(() => {
                    this.scrollToBottom();
                }, 300);
            }
        });
        
        // Manejar resize de ventana
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                this.handleResponsiveResize();
            }
        });
        
        // Evitar scroll del body cuando el chat está abierto
        this.chatContainer.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });
        
        // Manejar touch events en móviles para mejor UX
        if ('ontouchstart' in window) {
            this.setupTouchEvents();
        }
    }
      toggleChat() {
        console.log('Toggle chat called, current state:', this.isOpen);
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
      openChat() {
        console.log('Opening chat...');
        if (this.chatContainer) {
            // Mostrar overlay en móviles
            if (this.isMobileDevice()) {
                this.showChatOverlay();
                document.body.classList.add('chat-open-mobile');
                document.body.style.overflow = 'hidden';
            }
            
            this.chatContainer.classList.add('active');
            this.isOpen = true;
            this.chatToggle.classList.remove('has-notification');
            
            console.log('Chat container classes:', this.chatContainer.className);
            
            // Enfocar el input (con delay para móviles)
            const focusDelay = this.isMobileDevice() ? 500 : 300;
            setTimeout(() => {
                if (this.chatInput && !this.isMobileDevice()) {
                    // No enfocar automáticamente en móviles para evitar que aparezca el teclado
                    this.chatInput.focus();
                }
                this.scrollToBottom();
            }, focusDelay);
            
        } else {
            console.error('Chat container not found when trying to open');
        }
    }
      // Función mejorada para cerrar chat
    closeChat() {
        console.log('Closing chat...');
        if (this.chatContainer) {
            // Ocultar overlay y restaurar scroll del body
            this.hideChatOverlay();
            document.body.classList.remove('chat-open-mobile');
            document.body.style.overflow = '';
            
            this.chatContainer.classList.remove('active');
            this.isOpen = false;
            
            // Desenfocar el input para ocultar teclado en móviles
            if (this.chatInput) {
                this.chatInput.blur();
            }
            
            console.log('Chat closed, classes:', this.chatContainer.className);
        }    }
    
    async sendMessage() {
        console.log('sendMessage called');
        const message = this.chatInput.value.trim();
        console.log('Message to send:', message);
        
        if (!message || this.isProcessing) {
            console.log('Message empty or processing, returning');
            return;
        }
        
        // Añadir mensaje del usuario
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.autoResizeTextarea();
        
        // Mostrar indicador de escritura
        this.showTyping();
        this.setProcessing(true);
        
        try {
            console.log('Calling chat API...');
            // Llamar a la API
            const response = await this.callChatAPI(message);
            console.log('API response:', response);
            
            if (response.success) {
                this.addMessage(response.message, 'bot');
                console.log('Message added successfully');
            } else {
                this.addMessage('Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.', 'bot');
                console.error('Chat API Error:', response.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.', 'bot');
        }
        
        this.hideTyping();
        this.setProcessing(false);
        this.scrollToBottom();
    }    async callChatAPI(message) {
        console.log('callChatAPI called with message:', message);
        try {
            // Crear FormData para envío como POST tradicional
            const formData = new FormData();
            formData.append('prompt', message);
              console.log('Making fetch request to charla.php');
            const response = await fetch('charla.php', {
                method: 'POST',
                body: formData
            });
            
            console.log('Fetch response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Raw API response:', data);
            
            // Mapear la respuesta del backend al formato esperado por el frontend
            if (data.success) {
                console.log('API call successful');
                return {
                    success: true,
                    message: data.response
                };
            } else {
                console.log('API call failed:', data.error);
                return {
                    success: false,
                    error: data.error
                };
            }
        } catch (error) {
            console.error('API call failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    addMessage(content, type) {
        const timestamp = new Date();
        const messageData = {
            content: content,
            type: type,
            timestamp: timestamp.toISOString()
        };
        
        this.messageHistory.push(messageData);
        this.addMessageToDOM(content, type, timestamp);
        this.saveChatHistory();
    }
    
    formatMessage(message) {
        // Formatear el mensaje para mostrar markdown básico
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }
    
    showTyping() {
        if (this.chatTyping) {
            this.chatTyping.style.display = 'flex';
            this.scrollToBottom();
        }
    }
    
    hideTyping() {
        if (this.chatTyping) {
            this.chatTyping.style.display = 'none';
        }
    }
    
    setProcessing(processing) {
        this.isProcessing = processing;
        if (this.chatSendBtn) {
            this.chatSendBtn.disabled = processing;
        }
        if (this.chatInput) {
            this.chatInput.disabled = processing;
        }
    }
    
    autoResizeTextarea() {
        if (this.chatInput) {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 80) + 'px';
        }
    }
    
    scrollToBottom() {
        if (this.chatMessages) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 100);
        }
    }
    
    saveChatHistory() {
        try {
            localStorage.setItem('portfolio_chat_history', JSON.stringify(this.messageHistory));
        } catch (error) {
            console.warn('Could not save chat history:', error);
        }
    }
    
    loadChatHistory() {
        try {
            const history = localStorage.getItem('portfolio_chat_history');
            if (history) {
                this.messageHistory = JSON.parse(history);
                this.renderChatHistory();
            } else {
                // Mensaje de bienvenida
                this.addMessage('¡Hola! 👋 Soy el asistente virtual de Jorge Enrique Vizcaya Vega. Puedo ayudarte con información sobre sus proyectos, experiencia, habilidades técnicas y más. ¿En qué puedo ayudarte hoy?', 'bot');
            }
        } catch (error) {
            console.warn('Could not load chat history:', error);
            // Mensaje de bienvenida por defecto si hay error
            this.addMessage('¡Hola! 👋 Soy el asistente virtual de Jorge Enrique Vizcaya Vega. Puedo ayudarte con información sobre sus proyectos, experiencia, habilidades técnicas y más. ¿En qué puedo ayudarte hoy?', 'bot');
        }
    }
    
    renderChatHistory() {
        if (this.chatMessages) {
            this.chatMessages.innerHTML = '';
            
            this.messageHistory.forEach(msg => {
                this.addMessageToDOM(msg.content, msg.type, new Date(msg.timestamp));
            });
            
            this.scrollToBottom();
        }
    }
    
    addMessageToDOM(content, type, timestamp) {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = this.formatMessage(content);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.formatTime(timestamp);
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        this.chatMessages.appendChild(messageDiv);
    }
    
    formatTime(timestamp) {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Ahora';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h`;
        } else {
            return messageTime.toLocaleDateString();
        }
    }
    
    updateMessageTimes() {
        // Actualizar tiempos cada minuto
        setInterval(() => {
            const timeElements = this.chatMessages?.querySelectorAll('.message-time');
            if (timeElements) {
                timeElements.forEach((timeElement, index) => {
                    if (this.messageHistory[index]) {
                        timeElement.textContent = this.formatTime(new Date(this.messageHistory[index].timestamp));
                    }
                });
            }
        }, 60000);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `chat-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    clearHistory() {
        this.messageHistory = [];
        if (this.chatMessages) {
            this.chatMessages.innerHTML = '';
        }
        this.saveChatHistory();
        this.addMessage('Historial borrado. ¡Hola de nuevo! ¿En qué puedo ayudarte?', 'bot');
    }
    
    exportHistory() {
        const history = this.messageHistory.map(msg => ({
            content: msg.content,
            type: msg.type,
            timestamp: new Date(msg.timestamp).toLocaleString()
        }));
        
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat_history.json';
        a.click();
        URL.revokeObjectURL(url);
    }
      setupTouchEvents() {
        if (!this.chatContainer) return;
        
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Manejar swipe gestures para cerrar en móviles
        this.chatContainer.addEventListener('touchstart', (e) => {
            const touch = e.changedTouches[0];
            touchStartY = touch.screenY;
            touchStartX = touch.screenX;
        }, { passive: true });
        
        this.chatContainer.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            touchEndY = touch.screenY;
            touchEndX = touch.screenX;
            
            const swipeDistanceY = touchStartY - touchEndY;
            const swipeDistanceX = touchStartX - touchEndX;
            
            // Swipe hacia abajo (más de 100px) para cerrar
            if (swipeDistanceY < -100 && Math.abs(swipeDistanceX) < 50 && this.isOpen) {
                this.closeChat();
            }
            
            // Swipe hacia la derecha (más de 150px) para cerrar
            if (swipeDistanceX < -150 && Math.abs(swipeDistanceY) < 100 && this.isOpen) {
                this.closeChat();
            }
        }, { passive: true });
        
        // Prevenir cierre accidental al hacer scroll en el chat
        this.chatMessages?.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
      handleResponsiveResize() {
        console.log('Handling responsive resize');
        const isMobile = this.isMobileDevice();
        
        if (this.isOpen) {
            if (isMobile) {
                // En móviles, mostrar overlay y prevenir scroll
                this.showChatOverlay();
                document.body.classList.add('chat-open-mobile');
                document.body.style.overflow = 'hidden';
            } else {
                // En desktop, ocultar overlay y restaurar scroll
                this.hideChatOverlay();
                document.body.classList.remove('chat-open-mobile');
                document.body.style.overflow = '';
            }
            
            // Ajustar scroll después del cambio
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        }
    }
      isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Funciones para manejar el overlay en móviles
    createChatOverlay() {
        this.chatOverlay = document.getElementById('chat-overlay') || document.createElement('div');
        
        if (!document.getElementById('chat-overlay')) {
            this.chatOverlay.id = 'chat-overlay';
            this.chatOverlay.className = 'chat-overlay';
            document.body.appendChild(this.chatOverlay);
        }
        
        // Evento para cerrar chat al tocar overlay
        this.chatOverlay.addEventListener('click', (e) => {
            if (e.target === this.chatOverlay && this.isOpen) {
                this.closeChat();
            }
        });
        
        // Evento touch para móviles
        this.chatOverlay.addEventListener('touchend', (e) => {
            if (e.target === this.chatOverlay && this.isOpen) {
                e.preventDefault();
                this.closeChat();
            }
        }, { passive: false });
    }
    
    showChatOverlay() {
        if (this.chatOverlay) {
            this.chatOverlay.classList.add('active');
        }
    }
    
    hideChatOverlay() {
        if (this.chatOverlay) {
            this.chatOverlay.classList.remove('active');
        }
    }
}

// Inicializar el chat cuando se carga la página
if (!window.portfolioChat) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, initializing chat...');
            window.portfolioChat = new PortfolioChat();
        });
    } else {
        console.log('DOM already loaded, initializing chat immediately...');
        window.portfolioChat = new PortfolioChat();
    }
}
