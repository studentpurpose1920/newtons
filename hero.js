// Hero section functionality

function initializeHero() {
    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Initialize counters when hero section is visible
    const heroSection = document.querySelector('.hero');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (heroSection && statNumbers.length > 0) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Hero buttons functionality
    
    const exploreBtn = document.querySelector('.hero-buttons .btn-primary');
    const videoBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const coursesSection = document.querySelector('#courses');
            if (coursesSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = coursesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // if (videoBtn) {
    //     videoBtn.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         showVideoModal();
    //     });
    // }
    
    // Video modal functionality
    function showVideoModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'video-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'video-modal-content';
        modalContent.style.cssText = `
            position: relative;
            width: 90%;
            max-width: 800px;
            background: white;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // Create video placeholder
        const videoPlaceholder = document.createElement('div');
        videoPlaceholder.style.cssText = `
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 1rem;
        `;
        
        videoPlaceholder.innerHTML = `
            <i class="fas fa-play" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h3>Campus Virtual Tour</h3>
            <p>Experience our world-class facilities</p>
        `;
        
        // Assemble modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(videoPlaceholder);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal function
        function closeModal() {
            modalOverlay.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                document.body.style.overflow = '';
            }, 300);
        }
        
        // Event listeners for closing
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    // Parallax effect for hero background (optional)
    function initializeParallax() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            window.addEventListener('scroll', throttle(() => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }, 10));
        }
    }
    
    // Initialize parallax if supported
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initializeParallax();
    }
}