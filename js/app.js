/* ============================================
   APP.JS — Main Application Bootstrap
   Uma Photo Studio
   ============================================ */

(function () {
  'use strict';

  /**
   * Initialize the application
   */
  function initApp() {
    // Render static components (navbar, footer, etc.)
    renderStaticComponents();

    // Register all routes
    registerRoutes();

    // Set up router hooks
    setupRouterHooks();

    // Initialize the router
    Router.init();

    // Initialize component behaviors (hamburger, scroll, etc.)
    Components.initBehaviors();
  }

  /**
   * Render components that persist across page changes
   */
  function renderStaticComponents() {
    const body = document.body;

    // Preloader (if not already statically in index.html)
    if (!document.getElementById('preloader')) {
      body.insertAdjacentHTML('afterbegin', Components.preloader());
    }

    // Navbar
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
      navContainer.innerHTML = Components.navbar();
    }

    // Social sidebar
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = Components.socialSidebar();
    }

    // Floating enquiry
    const floatingContainer = document.getElementById('floating-container');
    if (floatingContainer) {
      floatingContainer.innerHTML = Components.floatingEnquiry();
    }

    // Back to top
    const topContainer = document.getElementById('top-container');
    if (topContainer) {
      topContainer.innerHTML = Components.backToTop();
    }

    // Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = Components.footer();
    }
  }

  /**
   * Register all routes with the router
   */
  function registerRoutes() {
    // Home
    Router.register('/home', function () {
      return renderPage.home();
    });

    // Studio landing
    Router.register('/studio', function () {
      return renderPage.studio();
    });

    // Studio subcategories
    Router.register('/studio/:subcategoryId', function (params) {
      return renderPage.subcategory('studio', params.subcategoryId);
    });

    // Studio album view
    Router.register('/studio/:subcategoryId/:albumId', function (params) {
      return renderPage.album(params.subcategoryId, params.albumId);
    });

    // Outdoor landing
    Router.register('/outdoor', function () {
      return renderPage.outdoor();
    });

    // Outdoor subcategories
    Router.register('/outdoor/:subcategoryId', function (params) {
      return renderPage.subcategory('outdoor', params.subcategoryId);
    });

    // Outdoor album view
    Router.register('/outdoor/:subcategoryId/:albumId', function (params) {
      return renderPage.album(params.subcategoryId, params.albumId);
    });

    // About
    Router.register('/about', function () {
      return renderPage.about();
    });

    // Contact
    Router.register('/contact', function () {
      return renderPage.contact();
    });

    // Films
    Router.register('/films', function () {
      return renderPage.films();
    });
  }

  /**
   * Set up router lifecycle hooks
   */
  function setupRouterHooks() {
    Router.setBeforeNavigate(function (newRoute, oldRoute) {
      // Close mobile menu if open
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('nav-links');
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });

    Router.setAfterNavigate(function (route) {
      // Update active nav link
      Components.updateActiveNavLink();

      // Initialize page-specific components
      setTimeout(() => {
        Components.initScrollReveal();
        Components.initLazyLoading();
        Components.initTestimonialCarousel();
        Components.initContactForm();

        // Update page title
        updatePageTitle(route);
      }, 50);
    });
  }

  /**
   * Update the document title based on current route
   */
  function updatePageTitle(route) {
    const studioName = window.APP_DATA.studio.name;
    const segments = route.split('/').filter(Boolean);

    let title = studioName;

    if (segments.length === 1) {
      const page = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      title = `${page} | ${studioName}`;
    } else if (segments.length === 2) {
      // Find subcategory name
      const category = segments[0];
      const subId = segments[1];
      const cat = window.CATEGORIES[category];
      if (cat) {
        const sub = cat.subcategories.find(s => s.id === subId);
        if (sub) {
          title = `${sub.name} | ${studioName}`;
        }
      }
    } else if (segments.length === 3) {
      // Album view
      const albumId = segments[2];
      const subId = segments[1];
      const albums = window.ALBUMS[subId];
      if (albums) {
        const album = albums.find(a => a.id === albumId);
        if (album) {
          title = `${album.title} | ${studioName}`;
        }
      }
    }

    document.title = title;
  }

  // Start the app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
