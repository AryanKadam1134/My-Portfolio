const observerOptions = {
    root: null,
    threshold: 0.15, // Slightly increased for earlier trigger
    rootMargin: "50px" // Positive margin to trigger earlier
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Removed setTimeout for immediate response
            requestAnimationFrame(() => {
                entry.target.classList.add('show');
            });
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.fade-in');
    // Removed delay for mobile
    const isMobile = window.innerWidth <= 768;
    
    hiddenElements.forEach((el, index) => {
        // Add minimal delay only on desktop
        if (!isMobile) {
            el.dataset.delay = index * 30; // Reduced delay
        }
        scrollObserver.observe(el);
    });
    
    // Add scroll progress functionality
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});