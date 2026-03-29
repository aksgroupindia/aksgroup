// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Funnel Automation Tracking
// This logs which service the user clicked before going to the form
function leadCapture(serviceName) {
    console.log(`Lead initiated for: ${serviceName}`);
    // Future integration: Add Facebook Pixel or Google Analytics events here
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Button Ripple Effect
document.querySelectorAll('.btn-primary, .v-card').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = "scale(0.95)";
    });
    button.addEventListener('mouseup', function() {
        this.style.transform = "scale(1)";
    });
});
