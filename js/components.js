/* ============================================
   COMPONENTS.JS — Reusable UI Components
   Uma Photo Studio
   ============================================ */

(function () {
  'use strict';

  const Components = {};

  /**
   * Render the Navbar
   */
  Components.navbar = function () {
    const data = window.APP_DATA.studio;
    const categories = window.CATEGORIES;

    const isImageLogo = data.logo.includes('.') || data.logo.startsWith('http');
    const logoMarkup = isImageLogo 
      ? `<img src="${data.logo}" alt="${data.name}" class="navbar-logo-img">`
      : `<span class="navbar-logo-text">${data.logo}</span>`;

    return `
    <nav class="navbar" id="navbar">
      <div class="container navbar-inner">
        <a class="navbar-brand" href="#/home" onclick="window.navigateTo('#/home')">
          ${logoMarkup}
          <span class="navbar-tagline">${data.tagline}</span>
        </a>

        <ul class="nav-links" id="nav-links">
          <li><a href="#/home" data-route="/home">Home</a></li>
          <li><a href="#/studio" data-route="/studio">Studio <span class="nav-subtitle">(Born Baby, Toddler, Family)</span></a></li>
          <li><a href="#/outdoor" data-route="/outdoor">Outdoor <span class="nav-subtitle">(Wedding, Pre-Wedding, Engagement, Child Shoot)</span></a></li>
          <li><a href="#/films" data-route="/films">Films</a></li>
          <li><a href="#/about" data-route="/about">About Us</a></li>
          <li><a href="#/contact" data-route="/contact">Contact Us</a></li>
        </ul>

        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    `;
  };

  /**
   * Render the Footer
   */
  Components.footer = function () {
    const data = window.APP_DATA.studio;
    const team = window.APP_DATA.team;
    const year = new Date().getFullYear();

    const isImageLogo = data.logo.includes('.') || data.logo.startsWith('http');
    const logoMarkup = isImageLogo 
      ? `<img src="${data.logo}" alt="${data.name}" class="footer-logo-img">`
      : `<h3 class="footer-logo">${data.logo}</h3>`;

    const socialIcons = {
      instagram1: 'fa-instagram',
      instagram2: 'fa-instagram',
      facebook: 'fa-facebook',
      youtube: 'fa-youtube-play',
      pinterest: 'fa-pinterest',
      whatsapp: 'fa-whatsapp',
      twitter: 'fa-twitter'
    };

    const socialLinksHTML = Object.entries(data.social)
      .map(([platform, url]) => {
        if (!url || url.trim() === '') return '';
        const iconClass = socialIcons[platform] || 'fa-link';
        const label = platform.charAt(0).toUpperCase() + platform.slice(1);
        return `<a href="${url}" target="_blank" rel="noopener" aria-label="${label}"><i class="fa ${iconClass}"></i></a>`;
      })
      .join('');

    return `
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            ${logoMarkup}
            <p class="footer-tagline">${data.tagline}</p>
            <p class="footer-desc">Capturing life's most beautiful moments with passion, creativity, and an eye for detail.</p>
          </div>

          <div class="footer-links-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#/home">Home</a></li>
              <li><a href="#/studio">Studio</a></li>
              <li><a href="#/outdoor">Outdoor</a></li>
              <li><a href="#/films">Films</a></li>
              <li><a href="#/about">About Us</a></li>
              <li><a href="#/contact">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-links-section">
            <h4>Our Services</h4>
            <ul class="footer-links">
              <li><a href="#/outdoor/wedding">Wedding</a></li>
              <li><a href="#/outdoor/pre-wedding">Pre-Wedding</a></li>
              <li><a href="#/outdoor/engagement">Engagement</a></li>
              <li><a href="#/outdoor/baby">Child Photoshoot</a></li>
              <li><a href="#/studio/portrait">Born Baby Photography</a></li>
              <li><a href="#/studio/family">Family Photography</a></li>
            </ul>
          </div>

          <div class="footer-contact-section">
            <h4>Get In Touch</h4>
            <div class="footer-contact">
              <p><i class="fa fa-map-marker"></i> ${data.address}</p>
              <p><i class="fa fa-phone"></i> ${team[0].name}: ${team[0].phone}</p>
              <p><i class="fa fa-phone"></i> ${team[1].name}: ${team[1].phone}</p>
              <p><i class="fa fa-envelope"></i> ${data.email}</p>
            </div>
            <div class="footer-social footer-social-links">
              ${socialLinksHTML}
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${year} ${data.name}. All rights reserved. | Crafted with <span class="text-accent">&hearts;</span> for beautiful moments</p>
        </div>
      </div>
    </footer>
    `;
  };

  /**
   * Render the Social Sidebar
   */
  Components.socialSidebar = function () {
    const social = window.APP_DATA.studio.social;
    const icons = {
      instagram1: 'fa-instagram',
      instagram2: 'fa-instagram',
      facebook: 'fa-facebook',
      youtube: 'fa-youtube-play',
      pinterest: 'fa-pinterest',
      whatsapp: 'fa-whatsapp',
      twitter: 'fa-twitter'
    };

    const linksHTML = Object.entries(social)
      .map(([platform, url]) => {
        if (!url || url.trim() === '') return '';
        const iconClass = icons[platform] || 'fa-link';
        const label = platform.charAt(0).toUpperCase() + platform.slice(1);
        return `<a href="${url}" target="_blank" rel="noopener" aria-label="${label}"><i class="fa ${iconClass}"></i></a>`;
      })
      .join('');

    return `
    <div class="social-sidebar" id="social-sidebar">
      ${linksHTML}
    </div>
    `;
  };

  /**
   * Render the Floating Enquiry Button
   */
  Components.floatingEnquiry = function () {
    return `
    <a class="floating-enquiry" href="#/contact" id="floating-enquiry" onclick="window._scrollToForm = true;">
      <i class="fa fa-camera"></i>
      <span>Book Now</span>
    </a>
    `;
  };

  /**
   * Render the Back to Top Button
   */
  Components.backToTop = function () {
    return `
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <i class="fa fa-chevron-up"></i>
    </button>
    `;
  };

  /**
   * Render the Preloader
   */
  Components.preloader = function () {
    const data = window.APP_DATA.studio;
    const isImageLogo = data.logo.includes('.') || data.logo.startsWith('http');
    const logoMarkup = isImageLogo 
      ? `<img src="${data.logo}" alt="${data.name}" class="preloader-logo-img">`
      : `<div class="preloader-logo">${data.logo}</div>`;

    return `
    <div class="preloader" id="preloader">
      <div class="camera-flash" id="camera-flash"></div>
      <div class="shutter-button" id="shutter-button">
        <span class="shutter-inner"></span>
      </div>
      <div class="preloader-content">
        ${logoMarkup}
        <div class="preloader-tagline">${data.tagline}</div>
      </div>
    </div>
    `;
  };

  /**
   * Initialize interactive component behaviors
   * Called after DOM is ready
   */
  Components.initBehaviors = function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navbar) navbar.classList.toggle('active');
      });

      // Close menu when a link is clicked
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          if (navbar) navbar.classList.remove('active');
        });
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top button
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });

    // Back to top click
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
        }, 1000);
      }, 2700);
    }

    // Active nav link highlighting
    Components.updateActiveNavLink();
  };

  /**
   * Update active navigation link based on current route
   */
  Components.updateActiveNavLink = function () {
    const currentHash = window.location.hash || '#/home';
    const links = document.querySelectorAll('.nav-links a[data-route]');

    links.forEach(link => {
      link.classList.remove('active');
      const route = link.getAttribute('data-route');
      const currentPath = currentHash.substring(1); // Remove #

      if (route === currentPath) {
        link.classList.add('active');
      } else if (currentPath.startsWith(route) && route !== '/home') {
        link.classList.add('active');
      }
    });
  };

  /**
   * Initialize scroll reveal animations
   * Called after each page render
   */
  Components.initScrollReveal = function () {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  };

  /**
   * Initialize testimonial carousel
   */
  Components.initTestimonialCarousel = function () {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track || dots.length === 0) return;

    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoplayInterval = null;

    function goToSlide(index) {
      currentSlide = index;
      const offset = -(index * 100);
      track.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Dot click handlers
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
    });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % totalSlides;
        goToSlide(nextSlide);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Initialize
    goToSlide(0);
    startAutoplay();
  };

  /**
   * Initialize lazy loading for images
   */
  Components.initLazyLoading = function () {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '100px 0px'
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback: load all images immediately
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  /**
   * Contact form handling — powered by Formspree
   */
  Components.initContactForm = function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name    = form.querySelector('[name="name"]');
      const email   = form.querySelector('[name="email"]');
      const phone   = form.querySelector('[name="phone"]');
      const message = form.querySelector('[name="message"]');
      const statusEl = document.getElementById('form-status');

      let isValid = true;
      [name, email, phone, message].forEach(field => {
        if (field && !field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else if (field) {
          field.classList.remove('error');
        }
      });

      // Email format validation
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        if (statusEl) {
          statusEl.innerHTML = '<p class="form-error">Please fill in all required fields correctly.</p>';
        }
        return;
      }

      // Show sending state
      const submitBtn = form.querySelector('.btn-primary');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
      if (statusEl) statusEl.innerHTML = '';

      const eventTypeField = form.querySelector('[name="event-type"]');
      const eventType = eventTypeField ? eventTypeField.value : 'General Inquiry';

      // Send via Formspree
      fetch('https://formspree.io/f/mkodvrpz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          phone: phone.value,
          eventType: eventType,
          message: message.value,
          _replyto: email.value,
          _subject: `New Inquiry from ${name.value} - UMA Photo Studio`
        })
      })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.ok) {
          if (statusEl) {
            statusEl.innerHTML = '<p class="form-success">✅ Message sent successfully! We will get back to you soon.</p>';
          }
          form.reset();
        } else {
          const errMsg = (data.errors || []).map(function(e){ return e.message; }).join(', ');
          if (statusEl) {
            statusEl.innerHTML = '<p class="form-error">❌ ' + (errMsg || 'Something went wrong. Please try again.') + '</p>';
          }
        }
      })
      .catch(function () {
        if (statusEl) {
          statusEl.innerHTML = '<p class="form-error">❌ Network error. Please check your connection and try again.</p>';
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
      });
    });

    // Remove error class on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function () {
        this.classList.remove('error');
      });
    });

    // Phone field: allow numbers only, max 10 digits
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField) {
      // Block non-numeric keys
      phoneField.addEventListener('keypress', function (e) {
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      });
      // Block paste of non-numeric content
      phoneField.addEventListener('paste', function (e) {
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        if (!/^[0-9]{1,10}$/.test(pasted)) {
          e.preventDefault();
        }
      });
      // Strip non-numeric on input (handles autofill etc.)
      phoneField.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }
  };

  // Expose globally
  window.Components = Components;

})();
