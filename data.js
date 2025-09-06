// Project data for modal display
const projectData = {
    project1: {
        title: "E-commerce Website",
        longDescription: "A modern, responsive e-commerce platform built with Node.js and featuring a clean, intuitive interface. The platform includes comprehensive cart functionality, secure payment processing, and an admin dashboard for inventory management. Users can browse products, add items to cart, and complete purchases seamlessly.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "MongoDB", "Stripe API"],
        features: [
            "Responsive design that works on all devices",
            "Shopping cart with persistent storage",
            "Secure payment processing with Stripe",
            "User authentication and profiles",
            "Admin dashboard for product management",
            "Search and filtering functionality",
            "Order tracking and history"
        ],
        images: [
            { content: "Homepage Preview" },
            { content: "Product Catalog" },
            { content: "Shopping Cart" },
            { content: "Admin Dashboard" }
        ],
        links: [
            { text: "View Live Demo", url: "https://demo-ecommerce.example.com" },
            { text: "GitHub Repository", url: "https://github.com/yourusername/ecommerce-project" }
        ]
    },
    project2: {
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
            { content: "Project Analytics" },
            { content: "Team Collaboration" }
        ],
        links: [
            { text: "Try the App", url: "https://taskmanager.example.com" },
            { text: "Source Code", url: "https://github.com/yourusername/task-manager" }
        ]
    },
    project3: {
        title: "Weather Dashboard",
        longDescription: "A comprehensive weather dashboard that provides current conditions, forecasts, and interactive maps. Built with Vue.js and integrated with multiple weather APIs to ensure accurate and up-to-date information. Features include location-based weather, severe weather alerts, and historical data visualization.",
        technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Mapbox", "Sass"],
        features: [
            "Real-time weather data from multiple sources",
            "7-day forecast with hourly breakdowns",
            "Interactive weather maps with radar",
            "Severe weather alerts and notifications",
            "Historical weather data and trends",
            "Location-based automatic updates",
            "Customizable dashboard widgets"
        ],
        images: [
            { content: "Current Weather View" },
            { content: "7-Day Forecast" },
            { content: "Weather Maps" },
            { content: "Historical Data Charts" }
        ],
        links: [
            { text: "View Dashboard", url: "https://weather-app.example.com" },
            { text: "GitHub", url: "https://github.com/yourusername/weather-dashboard" }
        ]
    }
};

// Multilingual greetings for the hero section
const greetings = [
    "World", // English
    "世界", // Chinese (Simplified)
    "Mundo", // Spanish
    "Monde", // French
    "世界", // Japanese
    "Welt", // German
    "दुनिया", // Hindi
    "Mundo", // Portuguese
    "Мир", // Russian
    "العالم", // Arabic
    "세계", // Korean
    "Mondo", // Italian
    "Wereld", // Dutch
    "Dünya", // Turkish
    "Świat", // Polish
    "Κόσμος", // Greek
    "עולם", // Hebrew
    "โลก", // Thai
    "Thế giới", // Vietnamese
    "Dunia" // Indonesian/Malay
];

// Function to get a random greeting
function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

// Variables for alternating text animation
let currentGreetingIndex = 0;
let greetingInterval;

// Function to update alternating text
function updateAlternatingText() {
    const alternatingElement = document.getElementById('alternatingText');
    if (alternatingElement) {
        // Fade out
        alternatingElement.style.opacity = '0';
        
        setTimeout(() => {
            // Change text
            alternatingElement.textContent = greetings[currentGreetingIndex];
            currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
            
            // Fade in
            alternatingElement.style.opacity = '1';
        }, 300);
    }
}

// Scroll animation functionality
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}
