/* ============================================
   LIGHTBOX.JS — Fullscreen Image Viewer
   Uma Photo Studio
   ============================================ */

(function () {
  'use strict';

  let currentPhotos = [];
  let currentIndex = 0;
  let lightboxEl = null;
  let isOpen = false;
  let touchStartX = 0;
  let touchEndX = 0;

  /**
   * Create the lightbox DOM element
   */
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

    // Event listeners
    document.getElementById('lightbox-close').addEventListener('click', close);
    document.getElementById('lightbox-prev').addEventListener('click', prev);
    document.getElementById('lightbox-next').addEventListener('click', next);

    // Click backdrop to close
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl || e.target.classList.contains('lightbox-img-container')) {
        close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);

    // Touch/swipe support
    lightboxEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightboxEl.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  /**
   * Handle keyboard events
   */
  function handleKeydown(e) {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowRight':
        next();
        break;
    }
  }

  /**
   * Handle touch start
   */
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  /**
   * Handle touch end (detect swipe)
   */
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        next(); // Swipe left → next
      } else {
        prev(); // Swipe right → prev
      }
    }
  }

  /**
   * Open the lightbox with a specific photo
   * @param {number} index - Index of the photo to show
   * @param {string} albumId - Album ID to get photos from
   */
  function open(index, albumId) {
    createLightbox();

    // Find the album photos
    let photos = [];
    if (albumId && window.ALBUMS) {
      // Check if it's a subcategory ID directly (e.g. 'portrait', 'fashion', 'family')
      if (Array.isArray(window.ALBUMS[albumId])) {
        window.ALBUMS[albumId].forEach(album => {
          if (album.photos) {
            photos.push(...album.photos);
          }
        });
      }

      // If no photos found (not a subcategory ID), try searching for specific albumId
      if (photos.length === 0) {
        for (const category in window.ALBUMS) {
          const albums = window.ALBUMS[category];
          const album = albums.find(a => a.id === albumId);
          if (album) {
            photos = album.photos;
            break;
          }
        }
      }
    }

    if (photos.length === 0) return;

    currentPhotos = photos;
    currentIndex = index;
    isOpen = true;

    showPhoto(index);

    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Push history state to capture browser back/swipe gestures
    window.history.pushState({ lightbox: 'open' }, '');
  }

  /**
   * Show a specific photo
   */
  function showPhoto(index) {
    const img = document.getElementById('lightbox-img');
    const loader = document.getElementById('lightbox-loader');
    const counter = document.getElementById('lightbox-counter');

    // Show loader
    if (loader) loader.style.display = 'flex';
    img.style.opacity = '0';

    // Update counter
    if (counter) {
      counter.textContent = `${index + 1} / ${currentPhotos.length}`;
    }
    // Update prev/next visibility
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = index === currentPhotos.length - 1 ? 'none' : 'flex';

    // Load image
    const newImg = new Image();
    newImg.onload = function () {
      img.src = currentPhotos[index];
      img.style.opacity = '1';
      if (loader) loader.style.display = 'none';
    };
    newImg.onerror = function () {
      img.src = currentPhotos[index];
      img.style.opacity = '1';
      if (loader) loader.style.display = 'none';
    };
    newImg.src = currentPhotos[index];

    // Preload adjacent images
    if (index + 1 < currentPhotos.length) {
      const preloadNext = new Image();
      preloadNext.src = currentPhotos[index + 1];
    }
    if (index - 1 >= 0) {
      const preloadPrev = new Image();
      preloadPrev.src = currentPhotos[index - 1];
    }
  }

  /**
   * Go to next photo
   */
  function next() {
    if (currentIndex < currentPhotos.length - 1) {
      currentIndex++;
      showPhoto(currentIndex);
    }
  }

  /**
   * Go to previous photo
   */
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      showPhoto(currentIndex);
    }
  }

  /**
   * Close the lightbox
   * @param {boolean} fromPopState - True if closed via browser history popstate event
   */
  function close(fromPopState) {
    if (!lightboxEl) return;

    isOpen = false;
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';

    // Clear image after transition
    setTimeout(() => {
      const img = document.getElementById('lightbox-img');
      if (img) img.src = '';
    }, 300);

    // If closed manually, pop the pushed history state
    if (!fromPopState) {
      if (window.history.state && window.history.state.lightbox === 'open') {
        window.history.back();
      }
    }
  }

  // Close active lightbox if visitor clicks Android/mobile hardware back or swipes back
  window.addEventListener('popstate', function (e) {
    if (isOpen) {
      close(true);
    }
  });

  // Expose globally
  window.Lightbox = { open, close, next, prev };
  window.openLightbox = open;

})();
