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

// Function to get a random greeting
function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}
