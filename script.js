// Advanced iOS-style JavaScript functionality
class JestyCore {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.loadingSequence();
    }

    init() {
        this.isLoaded = false;
        this.currentTheme = 'dark';
        this.activeSection = 'home';
        this.stats = {
            customers: 500,
            scripts: 50,
            support: 24
        };
    }

    // Loading sequence with Apple-style animation
    loadingSequence() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progress = document.querySelector('.loading-progress');
        
        // Simulate loading progress
        let progressValue = 0;
        const loadingInterval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.isLoaded = true;
                        this.startAnimations();
                    }, 500);
                }, 500);
            }
            progress.style.width = progressValue + '%';
        }, 100);
    }

    // Start all animations after loading
    startAnimations() {
        this.animateStats();
        this.setupParallax();
        this.setupGlassEffects();
        this.setupIntersectionObserver();
        this.createFloatingParticles();
    }

    // Event listeners setup
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Demo modal
        const watchDemo = document.getElementById('watchDemo');
        const demoModal = document.getElementById('demoModal');
        const modalClose = document.getElementById('modalClose');

        if (watchDemo && demoModal) {
            watchDemo.addEventListener('click', () => this.openModal(demoModal));
        }

        if (modalClose && demoModal) {
            modalClose.addEventListener('click', () => this.closeModal(demoModal));
            demoModal.addEventListener('click', (e) => {
                if (e.target === demoModal) this.closeModal(demoModal);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollTo(targetId);
                this.setActiveSection(targetId);
            });
        });

        // Advanced mouse tracking
        this.setupAdvancedMouseTracking();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    // Enhanced navigation with iOS-style effects
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });

        // Scroll-based navigation highlighting
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
            this.updateNavigationBackground();
        });
    }

    // Advanced mouse tracking with 3D effects
    setupAdvancedMouseTracking() {
        const cards = document.querySelectorAll('.feature-card, .team-card, .main-contact, .floating-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.apply3DEffect(card, e);
            });

            card.addEventListener('mouseleave', () => {
                this.reset3DEffect(card);
            });

            // Touch support for mobile
            card.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                this.apply3DEffect(card, touch);
            });

            card.addEventListener('touchend', () => {
                this.reset3DEffect(card);
            });
        });

        // Global cursor tracking for advanced effects
        document.addEventListener('mousemove', (e) => {
            this.updateCursorEffects(e);
        });
    }

    // Apply 3D transformation effects
    apply3DEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = event.clientX || event.pageX;
        const mouseY = event.clientY || event.pageY;
        
        const rotateX = (mouseY - centerY) / 10;
        const rotateY = (centerX - mouseX) / 10;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${Math.max(-15, Math.min(15, rotateX))}deg) 
            rotateY(${Math.max(-15, Math.min(15, rotateY))}deg) 
            translateZ(20px)
            scale(1.02)
        `;
        
        element.style.boxShadow = `
            ${rotateY * 2}px ${rotateX * 2}px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `;
    }

    // Reset 3D effects
    reset3DEffect(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        element.style.boxShadow = 'var(--shadow-medium)';
    }

    // Create ripple effect
    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event.clientX || event.pageX) - rect.left - size / 2;
        const y = (event.clientY || event.pageY) - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Animate statistics counters
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const animateValue = (element, target) => {
            let current = 0;
            const increment = target / 60; // 60 frames
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16); // ~60fps
        };

        // Use Intersection Observer to trigger when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    animateValue(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Advanced parallax effects
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            // Hero background parallax
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }

            // Floating cards parallax
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 0.1;
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Advanced glass morphism effects
    setupGlassEffects() {
        const glassElements = document.querySelectorAll('.feature-card, .team-card, .main-contact, .nav-container');
        
        glassElements.forEach(element => {
            // Add dynamic blur based on scroll
            window.addEventListener('scroll', () => {
                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const elementCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(viewportHeight / 2 - elementCenter);
                const maxDistance = viewportHeight / 2;
                const blurAmount = Math.min(40, (distanceFromCenter / maxDistance) * 20 + 20);
                
                element.style.backdropFilter = `blur(${blurAmount}px)`;
            });
        });
    }

    // Enhanced intersection observer
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const element = entry.target;
                
                if (ratio > 0) {
                    element.style.opacity = ratio;
                    element.style.transform = `translateY(${(1 - ratio) * 30}px)`;
                }
                
                if (ratio > 0.5) {
                    element.classList.add('in-view');
                } else {
                    element.classList.remove('in-view');
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        });
    }

    // Create floating particles
    createFloatingParticles() {
        const particleCount = 20;
        const container = document.body;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(container);
            }, i * 200);
        }

        // Continuously create particles
        setInterval(() => {
            this.createParticle(container);
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const opacity = Math.random() * 0.1 + 0.02;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            z-index: -1;
            animation: particleFloat ${duration}s linear ${delay}s forwards;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    this.closeModal(activeModal);
                }
            }

            // Ctrl/Cmd + K for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showQuickNavigation();
            }

            // Number keys for quick section navigation
            const sectionMap = {
                '1': 'home',
                '2': 'features',
                '3': 'team',
                '4': 'contact'
            };

            if (sectionMap[e.key] && !e.ctrlKey && !e.metaKey) {
                this.smoothScrollTo(sectionMap[e.key]);
                this.setActiveSection(sectionMap[e.key]);
            }
        });
    }

    // Quick navigation popup
    showQuickNavigation() {
        const quickNav = document.createElement('div');
        quickNav.className = 'quick-nav-overlay';
        quickNav.innerHTML = `
            <div class="quick-nav-content">
                <div class="quick-nav-header">
                    <h3>Quick Navigation</h3>
                    <span class="quick-nav-hint">Press number keys or click</span>
                </div>
                <div class="quick-nav-items">
                    <div class="quick-nav-item" data-section="home">
                        <span class="nav-key">1</span>
                        <span class="nav-label">หน้าแรก</span>
                    </div>
                    <div class="quick-nav-item" data-section="features">
                        <span class="nav-key">2</span>
                        <span class="nav-label">คุณสมบัติ</span>
                    </div>
                    <div class="quick-nav-item" data-section="team">
                        <span class="nav-key">3</span>
                        <span class="nav-label">ทีมงาน</span>
                    </div>
                    <div class="quick-nav-item" data-section="contact">
                        <span class="nav-key">4</span>
                        <span class="nav-label">ติดต่อ</span>
                    </div>
                </div>
            </div>
        `;

        // Add styles for quick navigation
        const quickNavStyles = `
            .quick-nav-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(20px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                animation: fadeIn 0.2s ease;
            }
            .quick-nav-content {
                background: var(--glass-bg);
                backdrop-filter: blur(40px);
                border: 1px solid var(--glass-border);
                border-radius: 20px;
                padding: 32px;
                min-width: 300px;
                animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .quick-nav-header {
                text-align: center;
                margin-bottom: 24px;
            }
            .quick-nav-header h3 {
                color: var(--text-primary);
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .quick-nav-hint {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            .quick-nav-items {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .quick-nav-item {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 12px 16px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid transparent;
            }
            .quick-nav-item:hover {
                background: var(--glass-hover);
                border-color: var(--glass-border);
            }
            .nav-key {
                width: 24px;
                height: 24px;
                background: var(--accent-blue);
                color: white;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.9rem;
            }
            .nav-label {
                color: var(--text-primary);
                font-weight: 500;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
        `;

        // Add styles to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = quickNavStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(quickNav);

        // Add event listeners
        quickNav.addEventListener('click', (e) => {
            if (e.target === quickNav) {
                this.closeQuickNavigation(quickNav, styleSheet);
            }
        });

        document.querySelectorAll('.quick-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.smoothScrollTo(section);
                this.setActiveSection(section);
                this.closeQuickNavigation(quickNav, styleSheet);
            });
        });

        // Auto close after 10 seconds
        setTimeout(() => {
            if (quickNav.parentNode) {
                this.closeQuickNavigation(quickNav, styleSheet);
            }
        }, 10000);
    }

    closeQuickNavigation(quickNav, styleSheet) {
        quickNav.style.animation = 'fadeOut 0.2s ease forwards';
        setTimeout(() => {
            if (quickNav.parentNode) quickNav.remove();
            if (styleSheet.parentNode) styleSheet.remove();
        }, 200);
    }

    // Smooth scrolling with easing
    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const targetPosition = target.offsetTop - 100; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    // Easing function for smooth animations
    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // Update active navigation
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section.id;
            }
        });

        if (currentSection !== this.activeSection) {
            this.setActiveSection(currentSection);
        }
    }

    // Set active section
    setActiveSection(sectionId) {
        this.activeSection = sectionId;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Update navigation background on scroll
    updateNavigationBackground() {
        const navbar = document.querySelector('.nav-container');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.borderColor = 'var(--glass-border)';
        }
    }

    // Update cursor effects
    updateCursorEffects(e) {
        // Create custom cursor trail
        if (window.innerWidth > 768) { // Only on desktop
            this.createCursorTrail(e.clientX, e.clientY);
        }
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(0, 122, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            left: ${x - 3}px;
            top: ${y - 3}px;
            z-index: 9999;
            animation: cursorTrail 0.8s ease-out forwards;
        `;

        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 800);
    }

    // Theme toggle functionality
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        if (this.currentTheme === 'light') {
            document.documentElement.style.setProperty('--primary-bg', '#f5f5f5');
            document.documentElement.style.setProperty('--secondary-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#000000');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
        } else {
            document.documentElement.style.setProperty('--primary-bg', '#0a0a0a');
            document.documentElement.style.setProperty('--secondary-bg', '#1a1a1a');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.02)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.08)');
        }
        
        // Animate theme transition
        document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    // Mobile menu toggle
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        navMenu.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
    }

    // Modal functions
    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Handle window resize
    handleResize() {
        // Recalculate positions and effects on resize
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            navMenu.classList.remove('mobile-active');
            menuToggle.classList.remove('active');
        }
    }

    // Advanced performance optimization
    throttle(func, wait) {
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

    debounce(func, wait) {
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
}

// Add CSS animations and additional styles
const additionalStyles = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes cursorTrail {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--glass-bg);
        backdrop-filter: blur(40px);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        margin-top: 8px;
        padding: 20px;
        box-shadow: var(--shadow-heavy);
    }

    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .in-view {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .theme-toggle .toggle-icon {
        width: 20px;
        height: 20px;
        background: var(--text-primary);
        border-radius: 50%;
        transition: all 0.3s ease;
        position: relative;
    }

    .theme-toggle .toggle-icon::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 2px solid var(--text-primary);
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .theme-toggle:hover .toggle-icon::before {
        opacity: 0.3;
    }

    /* Enhanced scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--primary-bg);
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
    }
`;

// Add additional styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.jestyCore = new JestyCore();
});

// Preload critical resources
const preloadResources = () => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://images.unsplash.com';
    document.head.appendChild(link);
};

preloadResources();