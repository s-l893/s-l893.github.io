// Project data for modal display - Updated to match HTML data-project attributes
const projectData = {
    taskmanager: {
        title: "Task Management App",
        longDescription: "A productivity-focused task management application built with React and TypeScript. Features include drag-and-drop task organization, project categorization, and real-time collaboration. The app uses Firebase for backend services, providing seamless synchronization across devices and team members.",
        technologies: ["React", "TypeScript", "Firebase", "Material-UI", "Redux"],
        features: [
            "Drag-and-drop task organization",
            "Project and category management",
            "Real-time collaboration with team members",
            "Due date reminders and notifications",
            "Progress tracking and analytics",
            "Cross-device synchronization",
            "Offline functionality with sync"
        ],
        images: [
            { content: "Dashboard Overview" },
            { content: "Task Board View" },
            { content: "Analytics Dashboard" },
            { content: "Mobile Interface" }
        ],
        links: [
            { text: "Try the App", url: "#" },
            { text: "Source Code", url: "#" }
        ]
    },
    ecommerce: {
        title: "E-commerce Platform",
        longDescription: "Full-stack e-commerce solution featuring secure payment processing, comprehensive inventory management, and an intuitive admin dashboard. Built with modern web technologies to provide a seamless shopping experience for customers and powerful management tools for administrators.",
        technologies: ["Node.js", "Express", "MongoDB", "React", "Stripe", "JWT"],
        features: [
            "Secure payment processing with Stripe",
            "Real-time inventory tracking",
            "Admin dashboard for order management",
            "Customer authentication and profiles",
            "Product catalog with search and filters",
            "Order tracking and notifications",
            "Responsive design for all devices"
        ],
        images: [
            { content: "Store Homepage" },
            { content: "Product Details" },
            { content: "Shopping Cart" },
            { content: "Admin Panel" }
        ],
        links: [
            { text: "Live Demo", url: "#" },
            { text: "GitHub Repository", url: "#" }
        ]
    },
    aimodel: {
        title: "AI Image Classifier",
        longDescription: "Advanced machine learning model for image classification with real-time predictions and comprehensive accuracy visualization. Developed using PyTorch and OpenCV, this application demonstrates the power of deep learning in computer vision tasks.",
        technologies: ["Python", "PyTorch", "OpenCV", "Flask", "NumPy", "Matplotlib"],
        features: [
            "Real-time image classification",
            "Multiple pre-trained model options",
            "Accuracy and confidence visualization",
            "Batch processing capabilities",
            "Model performance analytics",
            "Custom dataset training support",
            "REST API for integration"
        ],
        images: [
            { content: "Model Interface" },
            { content: "Prediction Results" },
            { content: "Training Metrics" },
            { content: "Performance Charts" }
        ],
        links: [
            { text: "Demo Application", url: "#" },
            { text: "Research Paper", url: "#" }
        ]
    }
};

// Multilingual greetings for the hero section - matching HTML expectation
const greetings = [
    'Hello',      // English
    'Hola',       // Spanish
    'Bonjour',    // French
    'Hallo',      // German
    'Ciao',       // Italian
    'Olá',        // Portuguese
    'こんにちは',    // Japanese
    '안녕하세요',     // Korean
    '你好',        // Chinese
    'Привет',     // Russian
    'مرحبا',       // Arabic
    'नमस्ते',       // Hindi
    'Γεια σας',   // Greek
    'שלום',       // Hebrew
    'Hej',        // Swedish
    'Hei',        // Norwegian
    'Merhaba',    // Turkish
    'Saluton',    // Esperanto
    'Sawubona',   // Zulu
    'Jambo'       // Swahili
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeNavigation();
    initializeProjectModals();
    initializeGreetingAnimation();
    initializeTechStackAnimations();
});

// Scroll animations
function initializeScrollAnimations() {
    handleScrollAnimations();
    
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
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    
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
    updateAlternatingText();
    setInterval(updateAlternatingText, 3000);
}

function updateAlternatingText() {
    const alternatingText = document.getElementById('alternatingText');
    if (!alternatingText) return;
    
    const currentText = alternatingText.textContent;
    const currentIndex = greetings.indexOf(currentText);
    const nextIndex = (currentIndex + 1) % greetings.length;
    
    alternatingText.textContent = greetings[nextIndex];
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

    let currentProject = null;
    let currentSlide = 0;

    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            if (projectKey && projectData[projectKey]) {
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
        
        if (!projectData[projectKey]) {
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
            placeholder.style.cssText = `
                width: 90%;
                height: 200px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                border: 2px dashed rgba(255, 255, 255, 0.3);
            `;
            
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

function initializeTechStackAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
}
