// ============================================
// EVORA CHILD DEVELOPMENT CENTER - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // NAVIGATION
    // ============================================

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Dropdown menu functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function (e) {
                // If checking for a specific class or just generically checking window width
                if (window.innerWidth <= 968) { // Matching CSS breakpoint
                    e.preventDefault();
                    dropdown.classList.toggle('active');

                    // Toggle chevron rotation
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        }
    });

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================

    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });

        countersAnimated = true;
    }

    // Intersection Observer for counter animation
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    if (testimonialCards.length > 0) {
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function () {
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }

        if (testimonialNext) {
            testimonialNext.addEventListener('click', function () {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Auto rotate testimonials
        setInterval(function () {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 7000);
    }

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // ENQUIRY MODAL
    // ============================================

    const enquiryModal = document.getElementById('enquiryModal');
    const enquiryBtn = document.getElementById('enquiryBtn');
    const closeModal = document.querySelector('.close-modal');

    if (enquiryBtn) {
        enquiryBtn.addEventListener('click', function () {
            enquiryModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function () {
            enquiryModal.classList.remove('active');
        });
    }

    if (enquiryModal) {
        window.addEventListener('click', function (e) {
            if (e.target === enquiryModal) {
                enquiryModal.classList.remove('active');
            }
        });
    }

    // ============================================
    // FORM HANDLING
    // ============================================

    // Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(enquiryForm);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Enquiry Form Data:', data);

            // Show success message
            alert('Thank you for your enquiry! We will contact you soon.');

            // Reset form and close modal
            enquiryForm.reset();
            enquiryModal.classList.remove('active');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Contact Form Data:', data);

            // Show success message
            if (formMessage) {
                formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                formMessage.className = 'form-message success';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);
            }

            // Reset form
            contactForm.reset();
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================

    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // ANIMATION ON SCROLL
    // ============================================

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .program-card, .team-card, .wc-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    document.querySelectorAll('.service-card, .program-card, .team-card, .wc-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // ============================================
    // FORM VALIDATION
    // ============================================

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    };

    // Add real-time validation to email inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // Add real-time validation to phone inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // ============================================
    // LOADING ANIMATION
    // ============================================

    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================

    console.log('%c Evora Child Development Center ',
        'background: #FF6B6B; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Empowering children to reach their full potential ',
        'font-size: 14px; color: #4ECDC4;');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Set cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// ============================================
// MODERN ANIMATION ENHANCEMENTS
// ============================================

// Scroll-Triggered Animations with Intersection Observer
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // animateOnScrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .service-card, .program-card, .testimonial-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScrollObserver.observe(el);
    });

    // ============================================
    // RIPPLE EFFECT ON BUTTON CLICKS
    // ============================================

    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn, .float-btn, .btn-appointment');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================

    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }, 10));

    // ============================================
    // ENHANCED COUNTER ANIMATION WITH EASING
    // ============================================

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounterEnhanced(element, target, duration = 2000) {
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = Math.floor(startValue + (target - startValue) * easedProgress);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // Re-implement counter animation with easing
    const statNumbersEnhanced = document.querySelectorAll('.stat-number');
    let countersAnimatedEnhanced = false;

    function animateCountersEnhanced() {
        if (countersAnimatedEnhanced) return;

        statNumbersEnhanced.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounterEnhanced(stat, target, 2500);
        });

        countersAnimatedEnhanced = true;
    }

    // ============================================
    // PARALLAX SCROLLING EFFECT
    // ============================================

    const parallaxElements = document.querySelectorAll('.parallax, .hero-section');

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));

    // ============================================
    // MAGNETIC BUTTON EFFECT (CURSOR FOLLOW)
    // ============================================

    const magneticButtons = document.querySelectorAll('.btn-appointment, .btn-primary');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // STAGGERED ANIMATION FOR GRID ITEMS
    // ============================================

    function applyStaggeredAnimation(selector, baseDelay = 100) {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * baseDelay}ms`;
        });
    }

    applyStaggeredAnimation('.service-card', 100);
    applyStaggeredAnimation('.program-card', 150);
    applyStaggeredAnimation('.team-card', 100);

    // ============================================
    // SMOOTH NAVBAR COLOR TRANSITION ON SCROLL
    // ============================================

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#FFFFFF';
            navbar.style.backdropFilter = 'none';
        }

        // Navbar auto-hide disabled - navbar stays fixed at top
        // if (currentScroll > lastScroll && currentScroll > 500) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }

        lastScroll = currentScroll;
    }, 100));

    // ============================================
    // ENHANCED MODAL ANIMATIONS
    // ============================================

    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.classList.remove('active');
                    modal.style.animation = '';
                }, 300);
            }
        });
    });

    // ============================================
    // PREFERS REDUCED MOTION DETECTION
    // ============================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduce-motion');
        console.log('Reduced motion enabled for accessibility');
    }

    // ============================================
    // LAZY LOAD ANIMATIONS
    // ============================================

    // Add fade-in animation to images as they load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            });
        }
    });

    // ============================================
    // FLOATING ELEMENTS ANIMATION
    // ============================================

    function createFloatingParticles(container, count = 20) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }

        if (container) {
            container.style.position = 'relative';
            container.appendChild(particlesContainer);
        }
    }

    // Add particles to CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        createFloatingParticles(ctaSection, 15);
    }

    // ============================================
    // ENHANCED TESTIMONIAL CAROUSEL
    // ============================================

    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let startX = 0;
        let isDragging = false;

        testimonialSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        testimonialSlider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        testimonialSlider.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left - next testimonial
                    document.querySelector('.testimonial-next')?.click();
                } else {
                    // Swipe right - previous testimonial
                    document.querySelector('.testimonial-prev')?.click();
                }
            }

            isDragging = false;
        });
    }

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================

    // Log performance metrics
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page Load Time: ${pageLoadTime}ms`, 'color: #4ECDC4; font-weight: bold;');
        }
    });

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================

    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.testimonial-prev')?.click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.testimonial-next')?.click();
        }
    });

    // Focus management for modals
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }

            // Trap focus within modal
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll(focusableElements);
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    });

    // ============================================
    // CONSOLE BRANDING
    // ============================================

    console.log('%c✨ Modern Animations Loaded! ',
        'background: linear-gradient(90deg, #E93971, #F0623D); color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px;');
    console.log('%c🎨 Featuring: Scroll Animations, 3D Effects, Glassmorphism & More',
        'color: #3A80B1; font-size: 12px; font-weight: bold;');
});

