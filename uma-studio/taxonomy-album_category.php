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
} elseif ( $term_slug === 'studio' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0%20COVER/Born%20Baby%20Photography.jpg';
} elseif ( $term_slug === 'outdoor' ) {
    $banner_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0%20COVER/1WEDDINGCOVER.jpg';
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
    // CASE 1: Parent Category View (Studio / Outdoor landing pages)
    if ( $current_term->parent == 0 ) :
        $child_terms = get_terms( array(
            'taxonomy'   => 'album_category',
            'parent'     => $current_term->term_id,
            'hide_empty' => false,
        ) );

        if ( ! empty( $child_terms ) && ! is_wp_error( $child_terms ) ) :
            ?>
            <h2 class="section-title reveal">Explore Our <?php echo esc_html( $term_name ); ?> Work</h2>
            <div class="category-grid">
              <?php
              $i = 0;
              foreach ( $child_terms as $child ) :
                  $child_link = get_term_link( $child );
                  $child_desc = $child->description ? $child->description : 'Beautiful ' . $child->name . ' collections.';
                  
                  // Query latest album in this subcategory to get a dynamic cover photo
                  $cover_url = get_template_directory_uri() . '/images/about-cover.jpg';
                  $latest_post = get_posts( array(
                      'post_type'      => 'album',
                      'posts_per_page' => 1,
                      'tax_query'      => array(
                          array(
                              'taxonomy' => 'album_category',
                              'field'    => 'term_id',
                              'terms'    => $child->term_id,
                          ),
                      ),
                  ) );
                  
                  if ( ! empty( $latest_post ) && has_post_thumbnail( $latest_post[0]->ID ) ) {
                      $cover_url = get_the_post_thumbnail_url( $latest_post[0]->ID, 'large' );
                  } else {
                      // Static category fallbacks
                      if ( $child->slug === 'portrait' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/STUDIO/BORN%20BABY/06.jpg';
                      } elseif ( $child->slug === 'fashion' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Toddler%20Photography.jpg';
                      } elseif ( $child->slug === 'family' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/STUDIO/FAMILY/19.jpg';
                      } elseif ( $child->slug === 'wedding' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Wedding.jpg';
                      } elseif ( $child->slug === 'pre-wedding' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/pre-wedding.jpg';
                      } elseif ( $child->slug === 'engagement' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Engagement.jpg';
                      } elseif ( $child->slug === 'baby' ) {
                          $cover_url = 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/WED/BABYOUTDOOR/9.jpg';
                      }
                  }
                  ?>
                  <a href="<?php echo esc_url( $child_link ); ?>" class="category-card reveal reveal-delay-<?php echo esc_attr( ($i % 3) + 1 ); ?>" style="text-decoration: none; color: inherit;">
                    <div class="category-card-img shimmer-container">
                      <img src="<?php echo esc_url( $cover_url ); ?>" alt="<?php echo esc_attr( $child->name ); ?>" loading="lazy" class="fade-in-img" onload="this.classList.add('loaded'); this.parentElement.classList.add('image-loaded');">
                    </div>
                    <div class="category-card-content">
                      <h3><?php echo esc_html( $child->name ); ?></h3>
                      <p><?php echo esc_html( $child_desc ); ?></p>
                    </div>
                  </a>
                  <?php
                  $i++;
              endforeach;
              ?>
            </div>
            <?php
        else :
            echo '<p class="empty-message" style="text-align:center; color:var(--text-muted); padding: var(--space-xl) 0;">No subcategories created yet under this parent category.</p>';
        endif;

    else :
        // CASE 2: Child Category View (displays items directly or as folders)
        $direct_photo_slugs = array( 'portrait', 'fashion', 'family', 'baby' );

        if ( in_array( $term_slug, $direct_photo_slugs ) ) :
            // Direct photos view (masonry grid combining all photos)
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
            // Folder card view (Wedding, Pre-Wedding, etc.)
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
    endif;
    ?>
  </div>
</section>

<?php
get_footer();
