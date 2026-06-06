<?php
/**
 * Template Name: Films Page Template
 *
 * @package Uma_Photo_Studio
 */

get_header();

// Fetch Films Page Hero Banner (Customizer or fallback)
$films_hero_bg = get_theme_mod( 'films_hero_bg', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0_COVER/Film%20Page.jpg' );

if ( has_post_thumbnail() ) {
    $films_hero_bg = get_the_post_thumbnail_url( get_the_ID(), 'full' );
}
?>

<!-- Page Header -->
<section class="page-header" style="background-image: url('<?php echo esc_url( $films_hero_bg ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title"><?php the_title(); ?></h1>
    <p class="hero-subtitle">Cinematic stories that capture the magic of your special day</p>
  </div>
  <!-- Scroll Indicator -->
  <div class="hero-scroll" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer; text-align: center; width: 100%;">
    <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
    <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4)); margin: 8px auto 0 auto;"></div>
  </div>
</section>

<!-- Films Grid -->
<section class="section">
  <div class="container">
    <h2 class="section-title reveal">Our Films</h2>
    <div class="films-grid">
      <?php
      $films_query = new WP_Query( array(
          'post_type'      => 'wedding_film',
          'posts_per_page' => -1,
          'orderby'        => 'date',
          'order'          => 'DESC',
      ) );

      if ( $films_query->have_posts() ) :
          $i = 0;
          while ( $films_query->have_posts() ) : $films_query->the_post();
              $youtube_id = get_post_meta( get_the_ID(), 'film_youtube_id', true );
              if ( ! $youtube_id && function_exists( 'get_field' ) ) {
                  $youtube_id = get_field( 'film_youtube_id' );
              }
              $youtube_id = $youtube_id ? $youtube_id : 'dQw4w9WgXcQ'; // Fallback to Rick Astley default
              ?>
              <div class="film-card glass-card reveal reveal-delay-<?php echo esc_attr( ($i % 3) + 1 ); ?>">
                <div class="film-video">
                  <iframe
                    src="https://www.youtube.com/embed/<?php echo esc_attr( $youtube_id ); ?>"
                    title="<?php the_title_attribute(); ?>"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy">
                  </iframe>
                </div>
                <div class="film-info">
                  <span class="film-category"><?php the_terms( get_the_ID(), 'film_category', '', ', ', '' ); ?></span>
                  <h3 class="film-title"><?php the_title(); ?></h3>
                  <div class="film-description"><?php the_excerpt(); ?></div>
                </div>
              </div>
              <?php
              $i++;
          endwhile;
          wp_reset_postdata();
      else :
          // Fallback static films if no posts exist yet
          $fallback_films = array(
              array( 'title' => 'A Royal Wedding Film', 'category' => 'Wedding', 'desc' => 'A cinematic wedding story captured at a heritage palace.' ),
              array( 'title' => 'Love in the Mountains', 'category' => 'Pre-Wedding', 'desc' => 'A pre-wedding film shot in the misty mountains.' ),
          );
          foreach ( $fallback_films as $idx => $ff ) :
              ?>
              <div class="film-card glass-card reveal reveal-delay-<?php echo esc_attr( ($idx % 3) + 1 ); ?>">
                <div class="film-video">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="<?php echo esc_attr( $ff['title'] ); ?>"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy">
                  </iframe>
                </div>
                <div class="film-info">
                  <span class="film-category"><?php echo esc_html( $ff['category'] ); ?></span>
                  <h3 class="film-title"><?php echo esc_html( $ff['title'] ); ?></h3>
                  <p class="film-description"><?php echo esc_html( $ff['desc'] ); ?></p>
                </div>
              </div>
              <?php
          endforeach;
      endif;
      ?>
    </div>
  </div>
</section>

<?php
get_footer();
