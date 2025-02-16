const observerOptions = {
    root: null,
    threshold: 0.1, // Lower threshold for earlier trigger
    rootMargin: "0px 0px -50px 0px" // Negative bottom margin to trigger earlier
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, entry.target.dataset.delay || 0);
            });
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.fade-in');
    // Reduced delay between elements
    hiddenElements.forEach((el, index) => {
        el.dataset.delay = index * 50; // Reduced from 100ms to 50ms
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