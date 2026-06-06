<?php
/**
 * The main template file
 *
 * @package Uma_Photo_Studio
 */

get_header();
?>

<!-- Fallback Page Header -->
<section class="page-header" style="background-image: url('<?php echo esc_url( get_template_directory_uri() . '/images/about-cover.jpg' ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title"><?php single_post_title(); ?></h1>
  </div>
</section>

<!-- Fallback Content Section -->
<section class="section">
  <div class="container">
    <div class="about-text reveal" style="max-width: 800px; margin: 0 auto;">
      <?php
      if ( have_posts() ) :
          while ( have_posts() ) : the_post();
              the_content();
          endwhile;
      else :
          echo '<p>' . esc_html__( 'No content found.', 'uma-studio' ) . '</p>';
      endif;
      ?>
    </div>
  </div>
</section>

<?php
get_footer();
