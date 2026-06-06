/* ============================================
   THEME-APP.JS — Custom UI Logic & Lightbox
   Uma Photo Studio
   ============================================ */

(function () {
  'use strict';

  // State
  let currentPhotos = [];
  let currentIndex = 0;
  let lightboxEl = null;
  let isOpen = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize
  function init() {
    initPreloader();
    initHamburgerMenu();
    initScrollHeader();
    initScrollReveal();
    initScrollDownBtns();
    initGalleryLightbox();
  }

  /**
   * Fade out preloader on window load
   */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', function () {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 500); // Small delay for visual effect
    });
  }

  /**
   * Mobile Hamburger Toggle Menu
   */
  function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navbar) navbar.classList.toggle('active');
    });

    // Close menu when links are clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (navbar) navbar.classList.remove('active');
      });
    });
  }

  /**
   * Change navbar background on scroll
   */
  function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    if (!navbar) return;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Navbar scroll background
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top visibility
      if (backToTop) {
        if (scrollY > 500) {
          backToTop.classList.add('active');
        } else {
          backToTop.classList.remove('active');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init on page load

    // Back to top smooth scroll
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /**
   * Scroll Reveal animation handler using IntersectionObserver
   */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /**
   * Scroll down buttons click actions
   */
  function initScrollDownBtns() {
    const homeScroll = document.getElementById('hero-scroll-btn');
    const aboutScroll = document.getElementById('about-scroll-btn');

    const handleScrollClick = () => {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: 'smooth'
      });
    };

    if (homeScroll) homeScroll.addEventListener('click', handleScrollClick);
    if (aboutScroll) aboutScroll.addEventListener('click', handleScrollClick);
  }

  /* ==========================================================
     LIGHTBOX VIEW ENGINE
     ========================================================== */

  function createLightbox() {
    if (document.getElementById('lightbox')) return;

    const div = document.createElement('div');
    div.id = 'lightbox';
    div.className = 'lightbox';
    div.innerHTML = `
      <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-prev" id="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <button class="lightbox-next" id="lightbox-next" aria-label="Next image">&#10095;</button>
      <div class="lightbox-img-container">
        <img class="lightbox-img" id="lightbox-img" src="" alt="Gallery photo" />
        <div class="lightbox-loader" id="lightbox-loader">
          <div class="lightbox-spinner"></div>
        </div>
      </div>
      <div class="lightbox-counter" id="lightbox-counter"></div>
    `;
    document.body.appendChild(div);
    lightboxEl = div;

    // Listeners
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', prevPhoto);
    document.getElementById('lightbox-next').addEventListener('click', nextPhoto);

    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl || e.target.classList.contains('lightbox-img-container')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', handleKeydown);

    lightboxEl.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    lightboxEl.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) nextPhoto(); else prevPhoto();
      }
    }, { passive: true });
  }

  function handleKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') prevPhoto();
    else if (e.key === 'ArrowRight') nextPhoto();
  }

  function openLightbox(index, photosArray) {
    createLightbox();
    currentPhotos = photosArray;
    currentIndex = index;
    isOpen = true;

    showPhoto(index);

    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Push history state to capture back button
    window.history.pushState({ lightbox: 'open' }, '');
  }

  function showPhoto(index) {
    const img = document.getElementById('lightbox-img');
    const loader = document.getElementById('lightbox-loader');
    const counter = document.getElementById('lightbox-counter');

    if (loader) loader.style.display = 'flex';
    img.style.opacity = '0';

    if (counter) {
      counter.textContent = `${index + 1} / ${currentPhotos.length}`;
    }

    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = index === currentPhotos.length - 1 ? 'none' : 'flex';

    // Load High-Res
    const newImg = new Image();
    newImg.onload = function () {
      img.src = currentPhotos[index];
      img.style.opacity = '1';
      if (loader) loader.style.display = 'none';
    };
    newImg.src = currentPhotos[index];
  }

  function closeLightbox() {
    if (!isOpen) return;
    isOpen = false;
    if (lightboxEl) lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    if (currentIndex < currentPhotos.length - 1) {
      currentIndex++;
      showPhoto(currentIndex);
    }
  }

  function prevPhoto() {
    if (currentIndex > 0) {
      currentIndex--;
      showPhoto(currentIndex);
    }
  }

  // Handle browser back button to close lightbox
  window.addEventListener('popstate', function (e) {
    if (isOpen) {
      closeLightbox();
    }
  });

  /**
   * Bind events to all gallery image clicks
   */
  function initGalleryLightbox() {
    const galleryGrid = document.querySelector('.photo-grid');
    if (!galleryGrid) return;

    const galleryImages = galleryGrid.querySelectorAll('.gallery-image');
    if (galleryImages.length === 0) return;

    const photos = Array.from(galleryImages).map(img => img.src);

    galleryImages.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'), 10);
        openLightbox(index, photos);
      });
    });
  }

  // Contact Form Dispatcher
  window.addEventListener('DOMContentLoaded', () => {
    init();

    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const studioEmail = this.getAttribute('data-studio-email') || 'umastudiosuart@gmail.com';
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const phone = form.querySelector('[name="phone"]').value;
        const eventType = form.querySelector('[name="event-type"]').value;
        const message = form.querySelector('[name="message"]').value;
        const statusEl = document.getElementById('form-status');

        const submitBtn = form.querySelector('.btn-primary');
        if (submitBtn) {
          submitBtn.textContent = 'Opening Mail...';
          submitBtn.disabled = true;
        }

        const subject = `New Inquiry from ${name} - UMA Photo Studio`;
        const body = `Hello UMA Photo Studio,

You have a new inquiry from your website contact form:

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
📸 Event Type: ${eventType}

💬 Message:
${message}

Best regards,
${name}`;

        const mailtoUrl = `mailto:${studioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
          if (statusEl) {
            statusEl.innerHTML = '<p class="form-success">Opening your email app to send details...</p>';
          }
          form.reset();
          if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }
        }, 800);
      });
    }
  });

})();
