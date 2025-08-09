// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for slider controls
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
if (slides.length > 0) {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Smooth scrolling for anchor links
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

// Contact Form Handling (FormSubmit.co integration)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const requiredFields = ['firstName', 'email', 'phone', 'subject', 'message'];
        let isValid = true;

        // Reset styles
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.style.borderColor = '#e5e5e5';
        });

        // Validate required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || field.value.trim() === '') {
                field.style.borderColor = '#dc2626';
                isValid = false;
            }
        });

        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#dc2626';
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Allow native FormSubmit.co behavior to continue
        this.submit();
    });
}


// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const messageDiv = document.getElementById('newsletterMessage');
        const email = emailInput.value.trim();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            messageDiv.textContent = 'Please enter your email address.';
            messageDiv.className = 'newsletter-message error';
            return;
        }
        
        if (!emailRegex.test(email)) {
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.className = 'newsletter-message error';
            return;
        }
        
        // Simulate successful subscription
        messageDiv.textContent = 'Thank you for subscribing to our newsletter!';
        messageDiv.className = 'newsletter-message success';
        emailInput.value = '';
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 3000);
    });
}

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-card, .project-card, .testimonial-card, .stat-card, .faq-item, .service-card, .animate-left, .animate-right, .animate-testimonial');
    
    animateElements.forEach(el => {
        if (!el.classList.contains('animate-left') && !el.classList.contains('animate-right') && !el.classList.contains('animate-testimonial')) {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
};

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Service cards hover effect with staggered animation
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Testimonial cards animation
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});



// Change every 4 seconds
(function() {
  let customHeroIndex = 0;
  const customHeroSlides = document.querySelectorAll(".custom-hero-slide");
  const totalCustomHeroSlides = customHeroSlides.length;

  function showCustomHeroSlide(index) {
    customHeroSlides.forEach((slide, i) => {
      slide.classList.toggle("custom-hero-active", i === index);
    });
  }

  function nextCustomHeroSlide() {
    customHeroIndex = (customHeroIndex + 1) % totalCustomHeroSlides;
    showCustomHeroSlide(customHeroIndex);
  }

  setInterval(nextCustomHeroSlide, 4000); // change every 4 seconds
})();
