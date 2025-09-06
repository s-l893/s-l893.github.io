// Modal functionality
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const carouselContainer = document.getElementById('carouselContainer');
const modalInfo = document.getElementById('modalInfo');
const carouselIndicators = document.getElementById('carouselIndicators');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

// Declare missing variables
let currentProject = null;
let currentSlide = 0;

// Ensure projectData exists
if (typeof projectData === 'undefined') {
    console.error('projectData is not defined. Please ensure it is loaded before this script.');
}

// Open modal
function openModal(projectKey) {
    if (!modal || !modalInfo || !carouselContainer || !carouselIndicators) return;
    
    // Check if projectData exists and has the requested project
    if (typeof projectData === 'undefined' || !projectData[projectKey]) {
        console.error(`Project '${projectKey}' not found in projectData`);
        return;
    }
    
    currentProject = projectData[projectKey];
    currentSlide = 0;

    // Populate modal content
    populateModal();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
}

// Populate modal with project data
function populateModal() {
    if (!carouselContainer || !carouselIndicators || !modalInfo || !currentProject) return;
    
    // Create carousel slides
    carouselContainer.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Check if images exist
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

    // Populate project info with safe property access
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

// Carousel navigation
function goToSlide(slideIndex) {
    if (!currentProject || !carouselContainer || !carouselIndicators) return;

    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const dots = carouselIndicators.querySelectorAll('.carousel-dot');

    if (slides.length === 0 || dots.length === 0) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = slideIndex;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
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

// Event listeners - Wrap in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Start alternating text animation
    setInterval(updateAlternatingText, 2000);
    
    // Initial scroll animation check
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add event listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            if (projectKey) {
                openModal(projectKey);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (nextSlide) {
        nextSlide.addEventListener('click', nextSlideFunc);
    }

    if (prevSlide) {
        prevSlide.addEventListener('click', prevSlideFunc);
    }
    
    // Add keyboard navigation
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
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
