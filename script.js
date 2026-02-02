// ==========================================
// GLOBAL VARIABLES
// ==========================================
let lastScrollTop = 0;

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// TYPED TEXT EFFECT
// ==========================================
const typedTextElement = document.querySelector('.typed-text');
const textArray = [
    'Shopify Developer',
    'MERN Stack Developer',
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textArrayIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex++;
        if (textArrayIndex === textArray.length) {
            textArrayIndex = 0;
        }
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(skillBar => {
    skillObserver.observe(skillBar);
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    fadeInObserver.observe(section);
});

// ==========================================
// PROJECT CARDS STAGGER ANIMATION
// ==========================================
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    projectObserver.observe(card);
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Form input animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent && heroVisual) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ==========================================
// GRADIENT ORBS MOUSE FOLLOW
// ==========================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// REVEAL ELEMENTS ON SCROLL
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-category, .contact-card, .about-highlights .highlight-item');

    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initialize reveal animation
document.querySelectorAll('.skill-category, .contact-card, .about-highlights .highlight-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'visible';

    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-label, .hero-title .line, .hero-subtitle, .hero-description, .hero-buttons, .hero-socials, .hero-visual');

    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ==========================================
// PRELOADER (Optional - Uncomment if needed)
// ==========================================
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// ==========================================
// PARTICLE EFFECT ON MOUSE MOVE (Optional)
// ==========================================
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

let particleInterval;
document.addEventListener('mousedown', (e) => {
    particleInterval = setInterval(() => {
        createParticle(e.clientX, e.clientY);
    }, 50);
});

document.addEventListener('mouseup', () => {
    clearInterval(particleInterval);
});

// Add particle styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-fade 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes particle-fade {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Hi there!', 'font-size: 24px; color: #6366f1; font-weight: bold;');
console.log('%cLooking at the code? I like your style!', 'font-size: 16px; color: #ec4899;');
console.log('%cLet\'s connect: contact@ghulamrasool.com', 'font-size: 14px; color: #14b8a6;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #6366f1;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedReveal = debounce(revealOnScroll, 50);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = navLinks.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navLinks.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// ==========================================
// EASTER EGG
// ==========================================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 3s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);

    alert('🎉 You found the easter egg! You\'re awesome!');
}

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ==========================================
// END OF SCRIPT
// ==========================================
console.log('%c✨ Portfolio loaded successfully!', 'font-size: 14px; color: #10b981; font-weight: bold;');