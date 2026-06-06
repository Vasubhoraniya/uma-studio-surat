<?php
/**
 * The template for displaying album category archives
 *
 * @package Uma_Photo_Studio
 */

get_header();

$current_term = get_queried_object();
$term_slug    = $current_term->slug;
$term_name    = $current_term->name;
$term_desc    = $current_term->description ? $current_term->description : 'Elegant collection of ' . $term_name;

// Pick category banner (Customizer or fallbacks)
$banner_url = get_template_directory_uri() . '/images/about-cover.jpg';
if ( $term_slug === 'portrait' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/STUDIO/BORN%20BABY/06.jpg';
} elseif ( $term_slug === 'fashion' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Toddler%20Photography.jpg';
} elseif ( $term_slug === 'family' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/STUDIO/FAMILY/19.jpg';
} elseif ( $term_slug === 'wedding' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Wedding.jpg';
} elseif ( $term_slug === 'pre-wedding' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/pre-wedding.jpg';
} elseif ( $term_slug === 'engagement' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Engagement.jpg';
} elseif ( $term_slug === 'baby' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/WED/BABYOUTDOOR/9.jpg';
}
?>

<!-- Page Header -->
<section class="page-header" style="background-image: url('<?php echo esc_url( $banner_url ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title"><?php echo esc_html( $term_name ); ?></h1>
    <p class="hero-subtitle"><?php echo esc_html( $term_desc ); ?></p>
  </div>
  <!-- Scroll Indicator -->
  <div class="hero-scroll" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer; text-align: center; width: 100%;">
    <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
    <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4)); margin: 8px auto 0 auto;"></div>
  </div>
</section>

<!-- Main Listing Section -->
<section class="section">
  <div class="container">
    <?php
    // Direct photos view for Studio categories & Child Outdoor (no folders/album cards)
    $direct_photo_slugs = array( 'portrait', 'fashion', 'family', 'baby' );

    if ( in_array( $term_slug, $direct_photo_slugs ) ) :
        // 1. DIRECT PHOTO GALLERY VIEW
        $all_photos = array();

        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();
                if ( function_exists( 'get_field' ) ) {
                    $album_photos = get_field( 'album_photos' );
                    if ( ! empty( $album_photos ) ) {
                        foreach ( $album_photos as $p ) {
                            $url = is_array( $p ) ? $p['url'] : wp_get_attachment_url( $p );
                            $alt = is_array( $p ) ? $p['alt'] : get_post_meta( $p, '_wp_attachment_image_alt', true );
                            $all_photos[] = array( 'url' => $url, 'alt' => $alt );
                        }
                    }
                }
            }
        }

        if ( ! empty( $all_photos ) ) :
            ?>
            <div class="photo-grid" id="category-gallery-grid">
              <?php
              $idx = 0;
              foreach ( $all_photos as $photo ) :
                  $alt_text = $photo['alt'] ? $photo['alt'] : $term_name . ' photo ' . ($idx + 1);
                  ?>
                  <div class="photo-card reveal reveal-delay-<?php echo esc_attr( ($idx % 3) + 1 ); ?>">
                    <div class="photo-card-img shimmer-container">
                      <img src="<?php echo esc_url( $photo['url'] ); ?>" 
                           data-index="<?php echo esc_attr( $idx ); ?>" 
                           class="gallery-image fade-in-img" 
                           alt="<?php echo esc_attr( $alt_text ); ?>"
                           loading="lazy"
                           onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
                    </div>
                  </div>
                  <?php
                  $idx++;
              endforeach;
              ?>
            </div>
            <?php
        else :
            echo '<p class="empty-message" style="text-align:center; color:var(--text-muted); padding: var(--space-xl) 0;">No photos in this category yet. Create an Album post and attach photos!</p>';
        endif;

    else :
        // 2. ALBUM FOLDER CARD VIEW (Wedding, Pre-Wedding, etc.)
        if ( have_posts() ) :
            ?>
            <div class="album-grid">
              <?php
              $i = 0;
              while ( have_posts() ) : the_post();
                  $cover_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'large' ) : get_template_directory_uri() . '/images/about-cover.jpg';
                  ?>
                  <a href="<?php the_permalink(); ?>" class="album-card reveal reveal-delay-<?php echo esc_attr( ($i % 3) + 1 ); ?>" style="text-decoration: none;">
                    <div class="album-card-img shimmer-container" style="width: 100%; height: 100%;">
                      <img src="<?php echo esc_url( $cover_url ); ?>" alt="<?php the_title(); ?>" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
                    </div>
                    <div class="album-card-overlay">
                      <h3 class="album-card-title"><?php the_title(); ?></h3>
                    </div>
                  </a>
                  <?php
                  $i++;
              endwhile;
              ?>
            </div>
            <?php
        else :
            echo '<p class="empty-message" style="text-align:center; color:var(--text-muted); padding: var(--space-xl) 0;">No albums found in this category. Add some in your dashboard!</p>';
        endif;

    endif;
    ?>
  </div>
</section>

<?php
get_footer();
