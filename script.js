// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollAnimations();
    initializeNavigation();
    initializeProjectModals();
    initializeGreetingAnimation();
    initializeTechStackAnimations();
});

// Scroll animations
function initializeScrollAnimations() {
    // Initial check for elements already in view
    handleScrollAnimations();
    
    // Add scroll event listener with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100; // Trigger animation when element is 100px from viewport
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Greeting animation functionality
function initializeGreetingAnimation() {
    // Start the alternating text animation immediately
    updateAlternatingText();
    
    // Set interval to change greeting every 3 seconds
    setInterval(updateAlternatingText, 3000);
}

// Project modal functionality
function initializeProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const carouselContainer = document.getElementById('carouselContainer');
    const modalInfo = document.getElementById('modalInfo');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    // Modal state variables
    let currentProject = null;
    let currentSlide = 0;

    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            if (projectKey && typeof projectData !== 'undefined' && projectData[projectKey]) {
                openModal(projectKey);
            }
        });
    });

    // Close modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Carousel navigation
    if (nextSlide) {
        nextSlide.addEventListener('click', () => nextSlideFunc());
    }

    if (prevSlide) {
        prevSlide.addEventListener('click', () => prevSlideFunc());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                nextSlideFunc();
            } else if (e.key === 'ArrowLeft') {
                prevSlideFunc();
            }
        }
    });

    // Modal functions
    function openModal(projectKey) {
        if (!modal || !modalInfo || !carouselContainer || !carouselIndicators) return;
        
        if (typeof projectData === 'undefined' || !projectData[projectKey]) {
            console.error(`Project '${projectKey}' not found in projectData`);
            return;
        }
        
        currentProject = projectData[projectKey];
        currentSlide = 0;

        populateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProject = null;
        currentSlide = 0;
    }

    function populateModal() {
        if (!carouselContainer || !carouselIndicators || !modalInfo || !currentProject) return;
        
        // Create carousel slides
        carouselContainer.innerHTML = '';
        carouselIndicators.innerHTML = '';

        if (!currentProject.images || !Array.isArray(currentProject.images)) {
            console.error('Project images not found or not an array');
            return;
        }

        currentProject.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            
            const placeholder = document.createElement('div');
            placeholder.className = 'carousel-placeholder';
            placeholder.textContent = image.content || `Image ${index + 1}`;
            
            slide.appendChild(placeholder);
            carouselContainer.appendChild(slide);

            // Create indicator
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(dot);
        });

        // Populate project info
        modalInfo.innerHTML = `
            <h2 class="modal-project-title">${currentProject.title || 'Untitled Project'}</h2>
            <div class="modal-project-description">
                <p>${currentProject.longDescription || 'No description available.'}</p>
            </div>
            
            <div class="modal-tech-stack">
                <h3 class="modal-tech-title">Technologies Used</h3>
                <div class="modal-tech-tags">
                    ${(currentProject.technologies || []).map(tech => 
                        `<span class="modal-tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>

            <div class="modal-features">
                <h3 class="modal-features-title">Key Features</h3>
                <ul class="modal-features-list">
                    ${(currentProject.features || []).map(feature => 
                        `<li>${feature}</li>`
                    ).join('')}
                </ul>
            </div>

            <div class="modal-links">
                ${(currentProject.links || []).map(link => 
                    `<a href="${link.url || '#'}" class="modal-link" target="_blank" rel="noopener noreferrer">${link.text || 'Link'}</a>`
                ).join('')}
            </div>
        `;
    }

    function goToSlide(slideIndex) {
        if (!currentProject || !carouselContainer || !carouselIndicators) return;

        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const dots = carouselIndicators.querySelectorAll('.carousel-dot');

        if (slides.length === 0 || dots.length === 0) return;

        // Remove active class from current slide and dot
        if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = slideIndex;

        // Add active class to new slide and dot
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlideFunc() {
        if (!currentProject || !currentProject.images || currentProject.images.length === 0) return;
        const nextIndex = (currentSlide + 1) % currentProject.images.length;
        goToSlide(nextIndex);
    }

    function prevSlideFunc() {
        if (!currentProject || !currentProject.images || currentProject.images.length === 0) return;
        const prevIndex = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
        goToSlide(prevIndex);
    }
}

// Tech stack animations
function initializeTechStackAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    // Add staggered animation delay
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover sound effect simulation (visual feedback)
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Utility functions
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
    }
}

// Performance optimizations
const optimizedScrollHandler = throttle(handleScrollAnimations, 16); // ~60fps
window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadResources() {
    // Preload any critical images or resources
    const criticalResources = [
        // Add any critical image URLs here
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
preloadResources();

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations after page load
    setTimeout(() => {
        handleScrollAnimations();
    }, 100);
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'projectModal',
        'modalClose', 
        'carouselContainer',
        'modalInfo',
        'carouselIndicators',
        'prevSlide',
        'nextSlide',
        'alternatingText'
    ];
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Required element with id '${id}' not found`);
        }
    });
}

// Call error handling on DOM ready
document.addEventListener('DOMContentLoaded', handleMissingElements);
