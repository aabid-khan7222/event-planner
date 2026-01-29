/**
 * Event Planner - Static Website
 * Vanilla JavaScript: Nav, smooth scroll, hero slideshow, gallery & testimonials sliders, form validation.
 */

(function () {
    'use strict';

    // ---------- DOM Elements ----------
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const contactForm = document.getElementById('contact-form');
    const yearEl = document.getElementById('year');

    // ---------- Sticky Navbar on Scroll ----------
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    // ---------- Mobile Hamburger Menu ----------
    function toggleMenu() {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // ---------- Smooth Scroll & Close Menu on Nav Link Click ----------
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    const headerHeight = 64;
                    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
                if (navMenu.classList.contains('open')) {
                    toggleMenu();
                }
            }
        });
    });

    // ---------- Hero Slideshow ----------
    const heroSlides = document.querySelectorAll('.hero__slide');
    let heroIndex = 0;
    const heroInterval = 5000;

    function nextHeroSlide() {
        heroSlides[heroIndex].classList.remove('hero__slide--active');
        heroIndex = (heroIndex + 1) % heroSlides.length;
        heroSlides[heroIndex].classList.add('hero__slide--active');
    }

    if (heroSlides.length > 1) {
        setInterval(nextHeroSlide, heroInterval);
    }

    // ---------- Gallery Slider ----------
    const gallerySlider = document.getElementById('gallery-slider');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const gallerySlides = gallerySlider ? gallerySlider.querySelectorAll('.gallery__slide') : [];
    let galleryIndex = 0;
    const totalGallerySlides = gallerySlides.length;

    function updateGallerySlider() {
        if (!gallerySlider || totalGallerySlides === 0) return;
        gallerySlider.style.transform = 'translateX(-' + galleryIndex * 100 + '%)';
    }

    if (galleryPrev) {
        galleryPrev.addEventListener('click', function () {
            galleryIndex = galleryIndex === 0 ? totalGallerySlides - 1 : galleryIndex - 1;
            updateGallerySlider();
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', function () {
            galleryIndex = (galleryIndex + 1) % totalGallerySlides;
            updateGallerySlider();
        });
    }

    // ---------- Testimonials Slider ----------
    const testimonialsSlider = document.getElementById('testimonials-slider');
    const testimonialsDots = document.getElementById('testimonials-dots');
    const testimonialCards = testimonialsSlider ? testimonialsSlider.querySelectorAll('.testimonial-card') : [];
    let testimonialIndex = 0;
    const totalTestimonials = testimonialCards.length;

    function updateTestimonialsSlider() {
        if (!testimonialsSlider || totalTestimonials === 0) return;
        testimonialsSlider.style.transform = 'translateX(-' + testimonialIndex * 100 + '%)';
        const dots = testimonialsDots ? testimonialsDots.querySelectorAll('.testimonials__dot') : [];
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === testimonialIndex);
        });
    }

    // Build dots
    if (testimonialsDots && totalTestimonials > 0) {
        for (var i = 0; i < totalTestimonials; i++) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
            btn.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
            (function (idx) {
                btn.addEventListener('click', function () {
                    testimonialIndex = idx;
                    updateTestimonialsSlider();
                });
            })(i);
            testimonialsDots.appendChild(btn);
        }
    }

    // Auto-advance testimonials
    if (totalTestimonials > 1) {
        setInterval(function () {
            testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
            updateTestimonialsSlider();
        }, 6000);
    }

    // ---------- Contact Form Validation ----------
    const fields = {
        name: { el: document.getElementById('name'), error: document.getElementById('error-name') },
        phone: { el: document.getElementById('phone'), error: document.getElementById('error-phone') },
        email: { el: document.getElementById('email'), error: document.getElementById('error-email') },
        message: { el: document.getElementById('message'), error: document.getElementById('error-message') }
    };

    function showError(fieldKey, message) {
        var f = fields[fieldKey];
        if (!f || !f.el || !f.error) return;
        f.el.classList.add('error');
        f.error.textContent = message;
    }

    function clearError(fieldKey) {
        var f = fields[fieldKey];
        if (!f || !f.el || !f.error) return;
        f.el.classList.remove('error');
        f.error.textContent = '';
    }

    function validateName(value) {
        value = (value || '').trim();
        if (value.length < 2) return 'Please enter your name (at least 2 characters).';
        return '';
    }

    function validatePhone(value) {
        value = (value || '').trim();
        if (!value) return 'Please enter your phone number.';
        var digits = value.replace(/\D/g, '');
        if (digits.length < 10) return 'Please enter a valid phone number.';
        return '';
    }

    function validateEmail(value) {
        value = (value || '').trim();
        if (!value) return 'Please enter your email.';
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(value)) return 'Please enter a valid email address.';
        return '';
    }

    function validateMessage(value) {
        value = (value || '').trim();
        if (value.length < 10) return 'Please enter your message (at least 10 characters).';
        return '';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;

            Object.keys(fields).forEach(function (key) {
                clearError(key);
            });

            var nameErr = validateName(fields.name.el.value);
            if (nameErr) {
                showError('name', nameErr);
                isValid = false;
            }

            var phoneErr = validatePhone(fields.phone.el.value);
            if (phoneErr) {
                showError('phone', phoneErr);
                isValid = false;
            }

            var emailErr = validateEmail(fields.email.el.value);
            if (emailErr) {
                showError('email', emailErr);
                isValid = false;
            }

            var messageErr = validateMessage(fields.message.el.value);
            if (messageErr) {
                showError('message', messageErr);
                isValid = false;
            }

            if (isValid) {
                // Form is valid - in a real app you would send to server
                alert('Thank you! Your message has been received. We will get back to you soon.');
                contactForm.reset();
                Object.keys(fields).forEach(function (key) {
                    clearError(key);
                });
            }
        });

        // Clear errors on input
        Object.keys(fields).forEach(function (key) {
            if (fields[key].el) {
                fields[key].el.addEventListener('input', function () {
                    clearError(key);
                });
            }
        });
    }

    // ---------- Footer Year ----------
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
