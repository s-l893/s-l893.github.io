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
    dots[currentSlide].
