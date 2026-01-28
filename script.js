// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navContainer = document.getElementById('navContainer');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navContainer.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards and gallery items only (not link cards)
const animateElements = document.querySelectorAll('.service-card, .gallery-item');

// Initialize animations on page load
function initializeAnimations() {
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInView) {
            // Only hide elements that are not in view
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        } else {
            // Show elements that are already visible
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
        
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Always show link cards immediately without animation
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Run on DOMContentLoaded and load events
document.addEventListener('DOMContentLoaded', initializeAnimations);
window.addEventListener('load', initializeAnimations);

// Also run after a short delay to ensure DOM is ready
setTimeout(initializeAnimations, 100);

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
            alert('Please fill out the contact form below or call us to book your appointment!');
        } else {
            // If contact section doesn't exist on current page, navigate to contact page
            window.location.href = 'contact.html';
        }
    });
}

// Add active class to navigation based on scroll position
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Prevent menu toggle from affecting other interactions
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
    }
});

// Ensure menu is reset when page loads
window.addEventListener('load', () => {
    menuToggle.classList.remove('active');
    navContainer.classList.remove('active');
});

console.log('GlamStyle Salon Website - Script loaded successfully!');
