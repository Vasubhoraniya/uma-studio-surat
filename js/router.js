/* ============================================
   ROUTER.JS — Hash-based SPA Router
   Uma Photo Studio
   ============================================ */

(function () {
  'use strict';

  const routes = {};
  let currentRoute = null;
  let previousRoute = null;
  let beforeNavigateHook = null;
  let afterNavigateHook = null;

  /**
   * Register a route with a handler function
   * @param {string} path - Route path (e.g., '/home', '/outdoor/wedding')
   * @param {Function} handler - Function that returns HTML string or handles rendering
   */
  function register(path, handler) {
    routes[path] = handler;
  }

  /**
   * Set a hook to run before navigation
   * @param {Function} hook - Receives (newRoute, oldRoute)
   */
  function setBeforeNavigate(hook) {
    beforeNavigateHook = hook;
  }

  /**
   * Set a hook to run after navigation
   * @param {Function} hook - Receives (newRoute)
   */
  function setAfterNavigate(hook) {
    afterNavigateHook = hook;
  }

  /**
   * Parse the current hash into route segments
   * @returns {{ path: string, segments: string[] }}
   */
  function parseHash() {
    let hash = window.location.hash || '#/home';
    // Clean up hash
    if (hash === '#' || hash === '#/' || hash === '') {
      hash = '#/home';
    }
    const path = hash.substring(1); // Remove '#'
    const segments = path.split('/').filter(Boolean);
    return { path, segments };
  }

  /**
   * Navigate to a specific route
   * @param {string} route - The route to navigate to (e.g., '#/outdoor/wedding')
   */
  function navigateTo(route) {
    // Ensure route starts with '#'
    if (!route.startsWith('#')) {
      route = '#' + route;
    }
    window.location.hash = route;
  }

  /**
   * Find the best matching route handler for a given path
   * @param {string} path - The path to match
   * @returns {{ handler: Function, params: object } | null}
   */
  function matchRoute(path) {
    // Exact match first
    if (routes[path]) {
      return { handler: routes[path], params: {} };
    }

    // Try pattern matching with :param segments
    for (const registeredPath in routes) {
      const registeredSegments = registeredPath.split('/').filter(Boolean);
      const pathSegments = path.split('/').filter(Boolean);

      if (registeredSegments.length !== pathSegments.length) continue;

      const params = {};
      let match = true;

      for (let i = 0; i < registeredSegments.length; i++) {
        if (registeredSegments[i].startsWith(':')) {
          params[registeredSegments[i].substring(1)] = pathSegments[i];
        } else if (registeredSegments[i] !== pathSegments[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        return { handler: routes[registeredPath], params };
      }
    }

    return null;
  }

  /**
   * Handle route changes
   */
  function handleRouteChange() {
    const { path, segments } = parseHash();
    previousRoute = currentRoute;
    currentRoute = path;

    // Run before-navigate hook
    if (beforeNavigateHook) {
      beforeNavigateHook(path, previousRoute);
    }

    // Find matching route
    const matched = matchRoute(path);

    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    if (matched) {
      // Apply exit animation
      appContainer.classList.remove('page-transition-enter');
      appContainer.classList.add('page-transition-exit');

      setTimeout(() => {
        // Render new page
        const html = matched.handler(matched.params, segments);
        if (html) {
          appContainer.innerHTML = html;
        }

        // Apply enter animation
        appContainer.classList.remove('page-transition-exit');
        appContainer.classList.add('page-transition-enter');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Run after-navigate hook
        if (afterNavigateHook) {
          afterNavigateHook(path);
        }
      }, 250);
    } else {
      // 404 - Not found
      appContainer.classList.remove('page-transition-enter');
      appContainer.classList.add('page-transition-exit');

      setTimeout(() => {
        if (window.renderPage && window.renderPage.notFound) {
          appContainer.innerHTML = window.renderPage.notFound();
        } else {
          appContainer.innerHTML = '<div style="text-align:center;padding:100px 20px;"><h1>404</h1><p>Page not found</p></div>';
        }
        appContainer.classList.remove('page-transition-exit');
        appContainer.classList.add('page-transition-enter');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 250);
    }
  }

  /**
   * Initialize the router
   */
  function init() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Handle initial route (after a small delay to ensure DOM is ready)
    setTimeout(handleRouteChange, 100);
  }

  // Expose router API globally
  window.Router = {
    register,
    navigateTo,
    init,
    parseHash,
    setBeforeNavigate,
    setAfterNavigate,
    getCurrentRoute: () => currentRoute,
    getPreviousRoute: () => previousRoute
  };

  // Global navigation helper
  window.navigateTo = navigateTo;

})();
