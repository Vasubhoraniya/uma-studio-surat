<?php
/**
 * The template for displaying the home page
 *
 * @package Uma_Photo_Studio
 */

get_header();

// Fetch Hero Images (dynamic Customizer overrides or fallback)
$hero_bg_desktop = get_theme_mod( 'home_hero_desktop', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/01Covera.jpg' );
$hero_bg_mobile  = get_theme_mod( 'home_hero_mobile', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/01Covera_mobile.webp' );

// If page has featured image, override the desktop hero background
if ( has_post_thumbnail() ) {
    $hero_bg_desktop = get_the_post_thumbnail_url( get_the_ID(), 'full' );
}
?>

<!-- Hero Section -->
<section class="hero" id="home-hero" style="position: relative; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center;">
  <!-- Responsive Background Cover -->
  <div class="hero-bg" 
       data-desktop-bg="<?php echo esc_url( $hero_bg_desktop ); ?>" 
       data-mobile-bg="<?php echo esc_url( $hero_bg_mobile ); ?>" 
       style="position: absolute; inset: 0; background-image: url('<?php echo esc_url( $hero_bg_desktop ); ?>'); background-size: cover; background-position: center; background-repeat: no-repeat; transform: scale(1.02); transition: transform 8s ease;">
  </div>
  
  <div class="hero-overlay" style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 100%); z-index: 1;"></div>
  
  <!-- Logo container -->
  <div class="hero-logo-container" style="position: relative; z-index: 2; max-width: 450px; width: 80%; padding: var(--space-lg); text-align: center; animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
    <h1 style="color: var(--white); font-family: var(--font-display); font-size: 2.5rem; letter-spacing: 4px; text-shadow: 0 4px 15px rgba(0,0,0,0.4); margin-bottom: 0.5rem;"><?php bloginfo( 'name' ); ?></h1>
    <p style="color: var(--white); font-family: var(--font-body); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 8px rgba(0,0,0,0.3); opacity: 0.85;"><?php bloginfo( 'description' ); ?></p>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="hero-scroll" id="hero-scroll-btn" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer; text-align: center;">
    <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
    <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4)); margin: 8px auto 0 auto;"></div>
  </div>
</section>

<!-- Services Section -->
<section class="section" id="services">
  <div class="container">
    <h2 class="section-title reveal">Our Services</h2>
    <div class="home-services-grid">
      <?php
      $services_query = new WP_Query( array(
          'post_type'      => 'studio_service',
          'posts_per_page' => 6,
          'orderby'        => 'menu_order',
          'order'          => 'ASC',
      ) );

      if ( $services_query->have_posts() ) :
          $i = 0;
          while ( $services_query->have_posts() ) : $services_query->the_post();
              $delay_class = ( $i < 3 ) ? 'reveal-delay-' . ($i + 1) : 'reveal-delay-' . (($i % 3) + 1);
              ?>
              <div class="service-card glass-card reveal <?php echo esc_attr( $delay_class ); ?>">
                <div class="service-card-header">
                  <h3><?php the_title(); ?></h3>
                </div>
                <div class="service-card-img shimmer-container">
                  <?php if ( has_post_thumbnail() ) : ?>
                      <?php the_post_thumbnail( 'large', array( 'class' => 'fade-in-img', 'loading' => 'lazy' ) ); ?>
                  <?php else : ?>
                      <img src="<?php echo esc_url( get_template_directory_uri() . '/images/about-cover.jpg' ); ?>" class="fade-in-img" loading="lazy">
                  <?php endif; ?>
                </div>
                <div class="service-card-desc"><?php the_excerpt(); ?></div>
              </div>
              <?php
              $i++;
          endwhile;
          wp_reset_postdata();
      else :
          // Fallback static services if no posts exist yet
          $fallback_services = array(
              array( 'title' => 'Born Baby Photography', 'desc' => 'Professional studio photography for newborn babies.' ),
              array( 'title' => 'Wedding Photography', 'desc' => 'Capturing every precious moment of your special day.' ),
              array( 'title' => 'Pre-Wedding', 'desc' => 'Creative pre-wedding shoots at stunning locations.' ),
          );
          foreach ( $fallback_services as $idx => $fs ) :
              ?>
              <div class="service-card glass-card reveal reveal-delay-<?php echo esc_attr( $idx + 1 ); ?>">
                <div class="service-card-header">
                  <h3><?php echo esc_html( $fs['title'] ); ?></h3>
                </div>
                <div class="service-card-img shimmer-container">
                  <img src="<?php echo esc_url( get_template_directory_uri() . '/images/about-cover.jpg' ); ?>" class="fade-in-img" loading="lazy">
                </div>
                <p class="service-card-desc"><?php echo esc_html( $fs['desc'] ); ?></p>
              </div>
              <?php
          endforeach;
      endif;
      ?>
    </div>
  </div>
</section>

<!-- Featured Albums Section -->
<section class="section section-dark" id="featured">
  <div class="container">
    <h2 class="section-title reveal">Featured Work</h2>
    <p class="section-subtitle reveal">A glimpse into our finest photography collections</p>
    <div class="album-grid">
      <?php
      $albums_query = new WP_Query( array(
          'post_type'      => 'album',
          'posts_per_page' => 4,
          'orderby'        => 'date',
          'order'          => 'DESC',
      ) );

      if ( $albums_query->have_posts() ) :
          $i = 0;
          while ( $albums_query->have_posts() ) : $albums_query->the_post();
              ?>
              <a href="<?php the_permalink(); ?>" class="album-card reveal reveal-delay-<?php echo esc_attr( ($i % 3) + 1 ); ?>" style="text-decoration: none;">
                <div class="album-card-img shimmer-container" style="width: 100%; height: 100%;">
                  <?php if ( has_post_thumbnail() ) : ?>
                      <?php the_post_thumbnail( 'large', array( 'class' => 'fade-in-img', 'loading' => 'lazy' ) ); ?>
                  <?php else : ?>
                      <img src="<?php echo esc_url( get_template_directory_uri() . '/images/about-cover.jpg' ); ?>" class="fade-in-img" loading="lazy">
                  <?php endif; ?>
                </div>
                <div class="album-card-overlay">
                  <h3 class="album-card-title"><?php the_title(); ?></h3>
                </div>
              </a>
              <?php
              $i++;
          endwhile;
          wp_reset_postdata();
      else :
          echo '<p class="reveal" style="text-align:center; color:var(--text-muted); width:100%;">No albums found. Add some in your dashboard!</p>';
      endif;
      ?>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="section" style="padding-top: var(--space-lg); padding-bottom: var(--space-xl);">
  <div class="container">
    <h2 class="section-title reveal" style="margin-top: 0; margin-bottom: var(--space-lg);">Our Journey in Numbers</h2>
    <div class="stats-grid">
      <div class="stat-item reveal reveal-delay-1">
        <span class="stat-number">500+</span>
        <span class="stat-label">Happy Clients</span>
      </div>
      <div class="stat-item reveal reveal-delay-2">
        <span class="stat-number">500+</span>
        <span class="stat-label">Successful Events</span>
      </div>
      <div class="stat-item reveal reveal-delay-3">
        <span class="stat-number">20+</span>
        <span class="stat-label">Years Experience</span>
      </div>
      <div class="stat-item reveal reveal-delay-4">
        <span class="stat-number">1000+</span>
        <span class="stat-label">Photo Albums</span>
      </div>
    </div>
  </div>
</section>

<?php
get_footer();
