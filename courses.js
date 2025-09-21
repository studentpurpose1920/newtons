// Courses section functionality

function initializeCourses() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Animate course cards
                const courseCards = targetContent.querySelectorAll('.course-card');
                courseCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    // Course card interactions
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.btn-outline');
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showCourseDetails(card);
            });
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Course details modal
    function showCourseDetails(courseCard) {
        const courseTitle = courseCard.querySelector('h3').textContent;
        const courseDuration = courseCard.querySelector('p').textContent;
        const courseIcon = courseCard.querySelector('.course-image i').className;
        
        // Create modal
        const modal = createModal();
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <button class="modal-close">&times;</button>
            <div class="course-detail-header">
                <div class="course-detail-icon">
                    <i class="${courseIcon}"></i>
                </div>
                <div class="course-detail-info">
                    <h2>${courseTitle}</h2>
                    <p>${courseDuration}</p>
                </div>
            </div>
            <div class="course-detail-content">
                <div class="course-detail-section">
                    <h3>Program Overview</h3>
                    <p>This comprehensive program is designed to provide students with in-depth knowledge and practical skills in ${courseTitle.toLowerCase()}. Our curriculum combines theoretical foundations with hands-on experience to prepare graduates for successful careers in their chosen field.</p>
                </div>
                
                <div class="course-detail-section">
                    <h3>Key Features</h3>
                    <ul>
                        <li><i class="fas fa-check"></i> Industry-relevant curriculum</li>
                        <li><i class="fas fa-check"></i> Experienced faculty</li>
                        <li><i class="fas fa-check"></i> State-of-the-art laboratories</li>
                        <li><i class="fas fa-check"></i> Industry partnerships</li>
                        <li><i class="fas fa-check"></i> Placement assistance</li>
                    </ul>
                </div>
                
                <div class="course-detail-section">
                    <h3>Career Opportunities</h3>
                    <p>Graduates can pursue careers in various sectors including technology companies, research institutions, government organizations, and entrepreneurial ventures.</p>
                </div>
                
                <div class="course-detail-actions">
                    <button class="btn btn-primary">Apply Now</button>
                    <button class="btn btn-outline">Download Brochure</button>
                </div>
            </div>
        `;
        
        // Add styles for course detail modal
        const style = document.createElement('style');
        style.textContent = `
            .course-detail-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
                background: #c3c5c1ff;
            }
            
            .course-detail-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
            }
            
            .course-detail-info h2 {
                margin-bottom: 0.5rem;
                color: black;
            }
            
            .course-detail-info p {
                color: #f5f5f5ff;
                margin-bottom: 0;
            }
            
            .course-detail-section {
                margin-bottom: 2rem;
                color: red;
            }
            .course-detail-section p {
                color: #630303ff;
                
            }
            
            .course-detail-section h3 {
                color: red;
                margin-bottom: 1rem;
            }
            
            .course-detail-section ul {
                list-style: none;
                padding: 0;
            }
            
            .course-detail-section li {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                color: red;
            }
            
            .course-detail-section li i {
                color: red;
                font-size: 0.875rem;
            }
            
            .course-detail-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .course-detail-header {
                    flex-direction: column;
                    text-align: center;
                }
                
                .course-detail-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Show modal
        showModal(modal);
        
        // Handle action buttons
        const applyBtn = modal.querySelector('.btn-primary');
        const brochureBtn = modal.querySelector('.btn-outline');
        
        applyBtn.addEventListener('click', function() {
            hideModal(modal);
            // Scroll to admissions section
            const admissionsSection = document.querySelector('#admissions');
            if (admissionsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = admissionsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        brochureBtn.addEventListener('click', function() {
            // Simulate brochure download
            showNotification('Brochure download started!', 'success');
        });
    }
    
    // Utility function to create modal
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 1rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        modal.appendChild(modalContent);
        return modal;
    }
    
    // Show modal function
    function showModal(modal) {
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
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
            
            closeBtn.addEventListener('click', () => hideModal(modal));
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                hideModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    // Hide modal function
    function hideModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}