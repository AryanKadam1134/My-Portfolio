// Update observer options for faster mobile transitions
const observerOptions = {
    root: null,
    threshold: window.innerWidth <= 768 ? 0.05 : 0.1, // Lower threshold for mobile
    rootMargin: window.innerWidth <= 768 ? "20px" : "50px" // Reduced margin for mobile
};

// Single scroll observer for all fade-in elements
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('show');
            });
        }
    });
}, observerOptions);

// Unified color configuration
const starColors = {
    red: '#ff3366',
    blue: '#4169e1',
    yellow: '#ffd700',
    white: '#ffffff'
};

// Combined initialization function
function initializeUI() {
    const isMobile = window.innerWidth <= 768;
    const hiddenElements = document.querySelectorAll('.fade-in, section');
    
    hiddenElements.forEach((el, index) => {
        if (!isMobile) {
            el.dataset.delay = index * 30;
        }
        scrollObserver.observe(el);
    });

    createTwinklingStars();
    // Remove these undefined function calls
    // setupNavigation();
    // setupScrollProgress();
}

// Update scroll timing
function handleScroll() {
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        const scrollProgress = document.querySelector('.scroll-progress');

        // Faster scroll progress update
        if (scrollProgress) {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / height) * 100;
            scrollProgress.style.transform = `scaleX(${progress / 100})`;
        }
    });
}

// Update mobile menu functionality
function handleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Remove existing event listeners
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    const newOverlay = overlay.cloneNode(true);
    overlay.parentNode.replaceChild(newOverlay, overlay);

    // Add click events
    newHamburger.addEventListener('click', toggleMenu);
    newOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeUI);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
    createTwinklingStars();
    handleMobileMenu();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = window.innerWidth <= 768 ? 60 : 80; // Reduced offset for mobile
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: window.innerWidth <= 768 ? 'auto' : 'smooth' // Faster scrolling on mobile
        });
    });
});

// Add mouse parallax effect for stars
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const stars = document.querySelectorAll('#stars, #stars2, #stars3');
    stars.forEach((starLayer, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed);
        const y = (mouseY * speed);
        starLayer.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Update the createTwinklingStars function for darker theme
function createTwinklingStars() {
    const starsContainer = document.getElementById('stars-container');
    const numberOfStars = window.innerWidth <= 768 ? 50 : 100;
    
    // Clear existing stars
    const existingStars = starsContainer.querySelectorAll('.twinkling-star');
    existingStars.forEach(star => star.remove());
    
    const colors = [
        '#ff3366', // red
        '#4169e1', // blue
        '#ffd700', // yellow
        '#ffffff'  // white
    ];
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.boxShadow = `0 0 10px ${star.style.backgroundColor}`;
        starsContainer.appendChild(star);
    }
}

// Add window resize handler for responsive stars
window.addEventListener('resize', () => {
    createTwinklingStars();
});

// Update multiple_box_shadow function for darker theme
function multiple_box_shadow(n) {
    let value = '';
    const colors = [
        '#ff3366', // red
        '#4169e1', // blue
        '#ffd700', // yellow
        '#ffffff'  // white
    ];
    
    for(let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 2;
        value += `${x}px ${y}px ${size}px ${color}`;
        if(i < n - 1) value += ', ';
    }
    return value;
}

// Update star shadows on load
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    const stars1 = document.querySelector('#stars');
    const stars2 = document.querySelector('#stars2');
    const stars3 = document.querySelector('#stars3');

    if (stars1) stars1.style.boxShadow = multiple_box_shadow(isMobile ? 300 : 700);
    if (stars2) stars2.style.boxShadow = multiple_box_shadow(isMobile ? 100 : 200);
    if (stars3) stars3.style.boxShadow = multiple_box_shadow(isMobile ? 50 : 100);

    createTwinklingStars();
});

// Add smooth parallax scrolling
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('#stars, #stars2, #stars3');
    stars.forEach((starLayer, index) => {
        const speed = (index + 1) * 0.5;
        starLayer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* Update star colors */
function multiple_box_shadow(n) {
    let value = '';
    for(let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        const color = Math.random() > 0.7 ? '#4f46e5' : '#94a3b8';
        const size = Math.random() * 2;
        value += `${x}px ${y}px ${size}px ${color}`;
        if(i < n - 1) value += ', ';
    }
    return value;
}

// Add navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add active state to navbar links
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Update the existing scroll effect for mobile
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.style.background = scrolled ? 
        'rgba(10, 10, 15, 0.98)' : 
        'rgba(10, 10, 15, 0.95)';
    navbar.style.boxShadow = scrolled ?
        '0 4px 20px rgba(0, 0, 0, 0.1)' :
        'none';
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Update the scroll effect for navbar transparency
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.style.background = scrolled ? 
        'rgba(10, 10, 15, 0.85)' : 
        'rgba(10, 10, 15, 0.65)';
    navbar.style.backdropFilter = scrolled ?
        'blur(12px)' :
        'blur(8px)';
    navbar.style.borderBottom = scrolled ?
        '1px solid rgba(255, 255, 255, 0.15)' :
        '1px solid rgba(255, 255, 255, 0.1)';
});

// Make sure to initialize the mobile menu
document.addEventListener('DOMContentLoaded', () => {
    handleMobileMenu();
});

// Add this to animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Wait for all images to load
    Promise.all(Array.from(document.images).map(img => {
        if (img.complete)
            return Promise.resolve();
        return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve); // Handle error cases too
        });
    }))
    .then(() => {
        // Initialize everything after images are loaded
        setTimeout(() => {
            document.body.classList.add('loaded');
            initializeUI();
            handleMobileMenu();
        }, 500); // Add small delay for smoother transition
    });
});

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', handleMobileMenu);

// Update transition duration in CSS
const updateTransitionDuration = () => {
    const isMobile = window.innerWidth <= 768;
    document.documentElement.style.setProperty(
        '--transition-duration', 
        isMobile ? '0.3s' : '0.5s'
    );
};

// Call on load and resize
window.addEventListener('DOMContentLoaded', updateTransitionDuration);
window.addEventListener('resize', updateTransitionDuration);