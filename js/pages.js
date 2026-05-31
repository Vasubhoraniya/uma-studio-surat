// ============================================================
// Uma Photo Studio — Page Rendering Functions
// Each function returns a complete HTML string for its page.
// The router injects the returned HTML into #app.
// ============================================================

window.renderPage = {};

// ────────────────────────────────────────────────────────────
// Helper: find which parent category a subcategory belongs to
// ────────────────────────────────────────────────────────────
function findParentCategory(subcategoryId) {
  for (const key of Object.keys(window.CATEGORIES)) {
    const cat = window.CATEGORIES[key];
    if (cat.subcategories.some(s => s.id === subcategoryId)) {
      return cat;
    }
  }
  return null;
}

function findSubcategory(subcategoryId) {
  for (const key of Object.keys(window.CATEGORIES)) {
    const found = window.CATEGORIES[key].subcategories.find(s => s.id === subcategoryId);
    if (found) return found;
  }
  return null;
}

// ────────────────────────────────────────────────────────────
// 1. HOME PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.home = function () {
  const { studio, services, testimonials, stats } = window.APP_DATA;
  
  // Dynamically load mobile-only cover if on a mobile viewport
  const isMobile = window.innerWidth <= 768;
  const heroImg = (isMobile && window.HERO_IMAGES.homeMobile) 
    ? window.HERO_IMAGES.homeMobile 
    : window.HERO_IMAGES.home;

  // Pick 4 featured albums from various subcategories
  const featuredPicks = [
    { sub: 'wedding', idx: 0 },
    { sub: 'pre-wedding', idx: 0 },
    { sub: 'baby', idx: 0 },
    { sub: 'engagement', idx: 0 }
  ];

  const featuredAlbums = featuredPicks
    .map(p => {
      const albums = window.ALBUMS[p.sub];
      if (!albums || !albums[p.idx]) return null;
      return { ...albums[p.idx], subcategoryId: p.sub };
    })
    .filter(Boolean);

  // ── Services cards ──
  const servicesHTML = services.map((s, i) => `
    <div class="service-card glass-card reveal ${i < 3 ? `reveal-delay-${i + 1}` : `reveal-delay-${(i % 3) + 1}`}">
      <div class="service-card-header">
        
        <h3>${s.title}</h3>
      </div>
      <div class="service-card-img shimmer-container">
        <img src="${s.cover}" alt="${s.title}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
      </div>
      <p class="service-card-desc">${s.desc}</p>
    </div>
  `).join('');

  // ── Featured albums ──
  const featuredHTML = featuredAlbums.map((album, i) => {
    const parentCat = findParentCategory(album.subcategoryId);
    const catId = parentCat ? parentCat.id : 'outdoor';
    return `
      <div class="album-card reveal reveal-delay-${(i % 3) + 1}" onclick="window.navigateTo('#/${catId}/${album.subcategoryId}/${album.id}')">
        <div class="album-card-img shimmer-container" style="width: 100%; height: 100%;">
          <img src="${album.cover}" alt="${album.title}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
        </div>
        <div class="album-card-overlay">
          <h3 class="album-card-title">${album.title}</h3>
        </div>
      </div>
    `;
  }).join('');

  // ── Testimonials carousel ──
  const testimonialsCards = testimonials.map(t => `
    <div class="testimonial-card glass-card">
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-client">
        <strong>${t.client}</strong>
        <span>${t.event}</span>
      </div>
    </div>
  `).join('');

  const carouselDots = testimonials.map((_, i) => `
    <button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Testimonial ${i + 1}"></button>
  `).join('');

  // ── Stats ──
  const statsHTML = stats.map((s, i) => `
    <div class="stat-item reveal reveal-delay-${i + 1}">
      <span class="stat-number">${s.number}</span>
      <span class="stat-label">${s.label}</span>
    </div>
  `).join('');

  return `
    <!-- Hero -->
    <section class="hero" id="home-hero" style="position: relative; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      <!-- Full screen background cover image -->
      <div class="hero-bg" style="position: absolute; inset: 0; background-image: url('${heroImg}'); background-size: cover; background-position: center; background-repeat: no-repeat; transform: scale(1.02); transition: transform 8s ease;"></div>
      
      <!-- Subtle premium overlay to ensure white logo and scroll arrow are highly visible -->
      <div class="hero-overlay" style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 100%); z-index: 1;"></div>
      
      <!-- Logo centered beautifully on top of the cover photo -->
      <div class="hero-logo-container" style="position: relative; z-index: 2; max-width: 450px; width: 80%; padding: var(--space-lg); text-align: center; animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
      </div>
      
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Services -->
    <section class="section" id="services">
      <div class="container">
        <h2 class="section-title reveal">Our Services</h2>
        <div class="home-services-grid">
          ${servicesHTML}
        </div>
      </div>
    </section>

    <!-- Featured Albums -->
    <section class="section section-dark" id="featured">
      <div class="container">
        <h2 class="section-title reveal">Featured Work</h2>
        <p class="section-subtitle reveal">A glimpse into our finest photography collections</p>
        <div class="album-grid">
          ${featuredHTML}
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section section-dark" id="stats" style="padding-top: var(--space-lg); padding-bottom: var(--space-xl);">
      <div class="container">
        <h2 class="section-title reveal" style="margin-top: 0; margin-bottom: var(--space-lg);">Our Journey in Numbers</h2>
        <div class="stats-grid">
          ${statsHTML}
        </div>
      </div>
    </section>

    <!-- Spacer to separate stats and footer -->
    <div style="height: 20px; background-color: var(--bg-primary);"></div>
  `;
};

// ────────────────────────────────────────────────────────────
// 2. STUDIO LANDING PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.studio = function () {
  const category = window.CATEGORIES.studio;
  const heroImg = window.HERO_IMAGES.studio;

  const cardsHTML = category.subcategories.map((sub, i) => `
    <div class="category-card reveal reveal-delay-${(i % 3) + 1}" onclick="window.navigateTo('#/studio/${sub.id}')">
      <div class="category-card-img shimmer-container">
        <img src="${sub.cover}" alt="${sub.name}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
      </div>
      <div class="category-card-content">
        <h3>${sub.name}</h3>
        <p>${sub.description}</p>
      </div>
    </div>
  `).join('');

  return `
    <!-- Page Header -->
    <section class="page-header" id="page-header-studio" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">${category.name}</h1>
        <p class="hero-subtitle">${category.description}</p>
      </div>
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="section">
      <div class="container">
        <h2 class="section-title reveal">Explore Our Studio Work</h2>
        <div class="category-grid">
          ${cardsHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 3. OUTDOOR LANDING PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.outdoor = function () {
  const category = window.CATEGORIES.outdoor;
  const heroImg = window.HERO_IMAGES.outdoor;

  const cardsHTML = category.subcategories.map((sub, i) => `
    <div class="category-card reveal reveal-delay-${(i % 3) + 1}" onclick="window.navigateTo('#/outdoor/${sub.id}')">
      <div class="category-card-img shimmer-container">
        <img src="${sub.cover}" alt="${sub.name}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
      </div>
      <div class="category-card-content">
        <h3>${sub.name}</h3>
        <p>${sub.description}</p>
      </div>
    </div>
  `).join('');

  return `
    <!-- Page Header -->
    <section class="page-header" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">${category.name}</h1>
        <p class="hero-subtitle">${category.description}</p>
      </div>
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="section">
      <div class="container">
        <h2 class="section-title reveal">Explore Our Outdoor Work</h2>
        <div class="category-grid">
          ${cardsHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 4. SUBCATEGORY PAGE (albums listing)
// ────────────────────────────────────────────────────────────
window.renderPage.subcategory = function (categoryId, subcategoryId) {
  const category = window.CATEGORIES[categoryId];
  if (!category) return window.renderPage.notFound();

  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  if (!subcategory) return window.renderPage.notFound();

  const albums = window.ALBUMS[subcategoryId] || [];
  const heroImg = window.HERO_IMAGES[subcategoryId] || category.banner;

  // For studio category, display the photos directly (no folders/albums)
  if (categoryId === 'studio' || subcategoryId === 'baby') {
    const allPhotos = [];
    albums.forEach(album => {
      if (album.photos) {
        allPhotos.push(...album.photos);
      }
    });

    const photosHTML = allPhotos.map((photo, idx) => `
      <div class="photo-grid-item reveal shimmer-container" onclick="window.openLightbox(${idx}, '${subcategoryId}')">
        <img src="${photo}" alt="${subcategory.name} - Photo ${idx + 1}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
      </div>
    `).join('');

    const emptyMessage = allPhotos.length === 0
      ? '<p class="empty-message">No photos yet. Check back soon!</p>'
      : '';

    return `
      <!-- Page Header -->
      <section class="page-header" style="background-image: url('${heroImg}')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">${subcategory.name}</h1>
          <p class="hero-subtitle">${subcategory.description}</p>
        </div>
        <!-- Scroll Indicator -->
        <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
          <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
          <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
        </div>
      </section>

      <!-- Photos -->
      <section class="section">
        <div class="container">
          ${emptyMessage}
          <div class="photo-grid" id="subcategory-${subcategoryId}">
            ${photosHTML}
          </div>
        </div>
      </section>
    `;
  }

  // Otherwise, for outdoor category, show folders/albums as normal
  const albumsHTML = albums.map((album, i) => `
    <div class="album-card reveal reveal-delay-${(i % 3) + 1}" onclick="window.navigateTo('#/${categoryId}/${subcategoryId}/${album.id}')">
      <div class="album-card-img shimmer-container" style="width: 100%; height: 100%;">
        <img src="${album.cover}" alt="${album.title}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
      </div>
      <div class="album-card-overlay">
        <h3 class="album-card-title">${album.title}</h3>
      </div>
    </div>
  `).join('');

  const emptyMessage = albums.length === 0
    ? '<p class="empty-message">No albums yet. Check back soon!</p>'
    : '';

  return `
    <!-- Page Header -->
    <section class="page-header" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">${subcategory.name}</h1>
        <p class="hero-subtitle">${subcategory.description}</p>
      </div>
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Albums -->
    <section class="section">
      <div class="container">
        ${emptyMessage}
        <div class="album-grid">
          ${albumsHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 5. ALBUM PAGE (single album with photo grid)
// ────────────────────────────────────────────────────────────
window.renderPage.album = function (subcategoryId, albumId) {
  const albums = window.ALBUMS[subcategoryId];
  if (!albums) return window.renderPage.notFound();

  const album = albums.find(a => a.id === albumId);
  if (!album) return window.renderPage.notFound();

  const parentCat = findParentCategory(subcategoryId);
  const catId = parentCat ? parentCat.id : 'outdoor';
  const subcategory = findSubcategory(subcategoryId);
  const subName = subcategory ? subcategory.name : subcategoryId;

  const photosHTML = album.photos.map((photo, idx) => `
    <div class="photo-grid-item reveal shimmer-container" onclick="window.openLightbox(${idx}, '${album.id}')">
      <img src="${photo}" alt="${album.title} - Photo ${idx + 1}" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
    </div>
  `).join('');

  return `
    <!-- Album Header -->
    <section class="album-header">
      <div class="container">
        <button class="album-back btn btn-outline" onclick="window.navigateTo('#/${catId}/${subcategoryId}')">
          ← Back to ${subName}
        </button>
        <h1 class="section-title">${album.title}</h1>
        <p class="section-subtitle">${album.description}</p>
      </div>
    </section>

    <!-- Photo Grid -->
    <section class="section">
      <div class="container">
        <div class="photo-grid" id="album-${album.id}">
          ${photosHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 6. ABOUT PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.about = function () {
  const { studio, team, stats } = window.APP_DATA;
  const heroImg = window.HERO_IMAGES.about;

  const teamHTML = team.map((member, i) => `
    <div class="team-card glass-card reveal reveal-delay-${i + 1}">
      <div class="team-photo">
        <img src="${member.photo}" alt="${member.name}" loading="lazy">
      </div>
      <h3 class="team-name">${member.name}</h3>
      <p class="team-bio">${member.bio}</p>
      <a href="tel:${member.phone}" class="team-phone">📞 ${member.phone}</a>
    </div>
  `).join('');

  const statsHTML = stats.map((s, i) => `
    <div class="stat-item reveal reveal-delay-${i + 1}">
      <span class="stat-number">${s.number}</span>
      <span class="stat-label">${s.label}</span>
    </div>
  `).join('');

  return `
    <!-- Page Header -->
    <section class="page-header" id="page-header-about" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">About Us</h1>
        <p class="hero-subtitle">The story behind ${studio.name}</p>
      </div>
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-text reveal">
            <h2 class="section-title">Our Story</h2>
            <p><center>
              Considered to be the epitome of Modern Photography and Filmmaking,<br>
              UMA PHOTO has transformed the Indian Wedding landscape on a regular basis.<br> 
              For almost a decade UMA PHOTOs has been creating photographs and films <br>
              which are timeless and have been etched in memories of thousands of people forever.
            </center></p>
          </div>
          <div class="about-image reveal reveal-delay-2">
            <img src="images/COVERcopy.jpg" alt="Our Studio" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section" style="padding-top: var(--space-lg); padding-bottom: var(--space-xl);">
      <div class="container">
        <h2 class="section-title reveal" style="margin-top: 0; margin-bottom: var(--space-lg);">Our Journey in Numbers</h2>
        <div class="stats-grid">
          ${statsHTML}
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title reveal">Meet Our Team</h2>
        <p class="section-subtitle reveal">The creative minds behind ${studio.name}</p>
        <div class="team-grid">
          ${teamHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 7. CONTACT PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.contact = function () {
  const { studio, team } = window.APP_DATA;
  const heroImg = window.HERO_IMAGES.contact;

  const eventOptions = [
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Engagement',
    'Child Photoshoot',
    'Couple Portraits',
    'Family Portraits',
    'Fashion / Editorial',
    'Product Photography',
    'Studio Portrait',
    'Wedding Film',
    'Other'
  ];

  const optionsHTML = eventOptions.map(opt =>
    `<option value="${opt}">${opt}</option>`
  ).join('');

  const teamContactHTML = team.map(member => `
    <div class="contact-info-item">
      <span class="contact-info-icon">👤</span>
      <div>
        <strong>${member.name}</strong><br>
        <a href="tel:${member.phone}">${member.phone}</a>
      </div>
    </div>
  `).join('');

  const socialLinksHTML = Object.entries(studio.social).map(([platform, url]) => {
    if (!url || url.trim() === '') return '';
    const icons = { instagram: '📷', facebook: '📘', youtube: '🎬', pinterest: '📌', whatsapp: '💬', twitter: '🐦' };
    const label = platform.charAt(0).toUpperCase() + platform.slice(1);
    return `<a href="${url}" class="social-link" target="_blank" rel="noopener">${icons[platform] || '🔗'} ${label}</a>`;
  }).filter(Boolean).join('');

  return `
    <!-- Page Header -->
    <section class="page-header" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Contact Us</h1>
        <p class="hero-subtitle">Let's create something beautiful together</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">

          <!-- Contact Form -->
          <div class="contact-form glass-card reveal">
            <h2 class="section-title">Send Us a Message</h2>
            <form id="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Your full name" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="Your phone number" required>
                </div>
                <div class="form-group">
                  <label for="event-type">Event Type</label>
                  <select id="event-type" name="event-type" required>
                    <option value="" disabled selected>Select event type</option>
                    ${optionsHTML}
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us about your event, preferred dates, and any special requests..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Send Message</button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-card glass-card reveal reveal-delay-2">
            <h2 class="section-title">Get in Touch</h2>

            <div class="contact-info-item">
              <span class="contact-info-icon">📍</span>
              <div>
                <strong>Our Studio</strong><br>
                ${studio.address}
              </div>
            </div>

            ${teamContactHTML}

            <div class="contact-info-item">
              <span class="contact-info-icon">📧</span>
              <div>
                <strong>Email</strong><br>
                <a href="mailto:${studio.email}">${studio.email}</a>
              </div>
            </div>

            <div class="contact-info-item">
              <span class="contact-info-icon">📞</span>
              <div>
                <strong>Phone</strong><br>
                <a href="tel:${studio.phone}">${studio.phone}</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title reveal">Find Us</h2>
        <div class="map-container reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14877.678052009043!2d72.8700068871582!3d21.21520690000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f716fd50d91%3A0x7cbda2a930fb3774!2sUma%20photo!5e0!3m2!1sen!2sin!4v1779728873343!5m2!1sen!2sin"
            width="100%"
            height="450"
            style="border:0; border-radius: 12px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Uma Photo Studio Location">
          </iframe>
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 8. FILMS PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.films = function () {
  const { films } = window.APP_DATA;
  const heroImg = window.HERO_IMAGES.films;

  const filmsHTML = films.map((film, i) => `
    <div class="film-card glass-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="film-video">
        <iframe
          src="https://www.youtube.com/embed/${film.youtubeId}"
          title="${film.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy">
        </iframe>
      </div>
      <div class="film-info">
        <span class="film-category">${film.category}</span>
        <h3 class="film-title">${film.title}</h3>
        <p class="film-description">${film.description}</p>
      </div>
    </div>
  `).join('');

  return `
    <!-- Page Header -->
    <section class="page-header" style="background-image: url('${heroImg}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Wedding Films</h1>
        <p class="hero-subtitle">Cinematic stories that capture the magic of your special day</p>
      </div>
      <!-- Scroll Indicator -->
      <div class="hero-scroll" onclick="window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer;">
        <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
        <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));"></div>
      </div>
    </section>

    <!-- Films Grid -->
    <section class="section">
      <div class="container">
        <h2 class="section-title reveal">Our Films</h2>
        <div class="films-grid">
          ${filmsHTML}
        </div>
      </div>
    </section>
  `;
};

// ────────────────────────────────────────────────────────────
// 9. NOT FOUND (404) PAGE
// ────────────────────────────────────────────────────────────
window.renderPage.notFound = function () {
  return `
    <section class="section not-found-section">
      <div class="container" style="text-align: center; padding: 120px 20px;">
        <h1 style="font-size: 6rem; margin-bottom: 0.5rem; opacity: 0.3;">404</h1>
        <h2 class="section-title">Page Not Found</h2>
        <p class="section-subtitle">The page you're looking for doesn't exist or has been moved.</p>
        <button class="btn btn-primary" onclick="window.navigateTo('#/')" style="margin-top: 2rem;">
          ← Back to Home
        </button>
      </div>
    </section>
  `;
};
