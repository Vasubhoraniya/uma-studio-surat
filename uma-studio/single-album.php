<?php
/**
 * The template for displaying a single album
 *
 * @package Uma_Photo_Studio
 */

get_header();

// Fetch album details
$about_hero_bg = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'full' ) : get_template_directory_uri() . '/images/about-cover.jpg';
$album_date = get_post_meta( get_the_ID(), 'album_date', true );
$album_desc = get_the_excerpt();

// Try ACF custom fields if available
if ( function_exists( 'get_field' ) ) {
    $custom_date = get_field( 'album_date' );
    if ( $custom_date ) {
        $album_date = $custom_date;
    }
}
$album_date = $album_date ? $album_date : date( 'Y' );
?>

<!-- Page Header -->
<section class="page-header" style="background-image: url('<?php echo esc_url( $about_hero_bg ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <span class="hero-category"><?php the_terms( get_the_ID(), 'album_category', '', ', ', '' ); ?> &bull; <?php echo esc_html( $album_date ); ?></span>
    <h1 class="hero-title"><?php the_title(); ?></h1>
    <p class="hero-subtitle"><?php echo esc_html( $album_desc ); ?></p>
  </div>
  <!-- Back Button inside Header -->
  <div style="position: absolute; top: 8rem; left: 5%; z-index: 10;">
    <?php
    $terms = get_the_terms( get_the_ID(), 'album_category' );
    $back_url = home_url( '/' ); // Default fallback to home
    $back_label = 'Back to Home';
    if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
        $term = array_shift( $terms );
        $back_url = get_term_link( $term );
        $back_label = 'Back to ' . $term->name;
    }
    ?>
    <a href="<?php echo esc_url( $back_url ); ?>" class="btn-back" style="color: var(--white); text-decoration: none; font-size: 0.9rem; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase;">
      <i class="fa fa-arrow-left"></i> <?php echo esc_html( $back_label ); ?>
    </a>
  </div>
</section>

<!-- Photo Grid Section -->
<section class="section">
  <div class="container">
    <div class="photo-grid" id="album-gallery-grid">
      <?php
      // Fetch photos from ACF Gallery field 'album_photos'
      $photos = array();
      if ( function_exists( 'get_field' ) ) {
          $photos = get_field( 'album_photos' );
      }

      if ( ! empty( $photos ) ) :
          $idx = 0;
          foreach ( $photos as $photo ) :
              // Support array or id format from ACF
              $url = is_array( $photo ) ? $photo['url'] : wp_get_attachment_url( $photo );
              $alt = is_array( $photo ) ? $photo['alt'] : get_post_meta( $photo, '_wp_attachment_image_alt', true );
              $alt = $alt ? $alt : get_the_title() . ' Gallery Image ' . ($idx + 1);
              ?>
              <div class="photo-card reveal reveal-delay-<?php echo esc_attr( ($idx % 3) + 1 ); ?>">
                <div class="photo-card-img shimmer-container">
                  <img src="<?php echo esc_url( $url ); ?>" 
                       data-index="<?php echo esc_attr( $idx ); ?>" 
                       class="gallery-image fade-in-img" 
                       alt="<?php echo esc_attr( $alt ); ?>"
                       loading="lazy"
                       onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
                </div>
              </div>
              <?php
              $idx++;
          endforeach;
      else :
          // Fallback text if no photos are uploaded yet
          ?>
          <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl) 0;">
            <p style="color: var(--text-muted); font-size: 1.1rem;">No photos uploaded yet for this album. Open the WordPress admin dashboard and upload some photos to the "Album Photos" gallery field!</p>
          </div>
          <?php
      endif;
      ?>
    </div>
  </div>
</section>

<?php
get_footer();
