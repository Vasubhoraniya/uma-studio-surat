<?php
/**
 * Template Name: About Page Template
 *
 * @package Uma_Photo_Studio
 */

get_header();

// Fetch About Hero background (with Customizer override or fallback)
$about_hero_bg = get_theme_mod( 'about_hero_bg', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/0202.jpg' );

if ( has_post_thumbnail() ) {
    $about_hero_bg = get_the_post_thumbnail_url( get_the_ID(), 'full' );
}

$about_story_img = get_theme_mod( 'about_story_img', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/COVERcopy.webp' );
?>

<!-- Page Header -->
<section class="page-header" id="page-header-about" style="background-image: url('<?php echo esc_url( $about_hero_bg ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title"><?php the_title(); ?></h1>
    <p class="hero-subtitle">The story behind <?php bloginfo( 'name' ); ?></p>
  </div>
  <!-- Scroll Indicator -->
  <div class="hero-scroll" id="about-scroll-btn" style="position: absolute; z-index: 2; bottom: 3rem; cursor: pointer; text-align: center; width: 100%;">
    <span style="color: var(--white); opacity: 0.9; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.4);">Scroll Down</span>
    <div class="scroll-arrow" style="border-color: var(--white); opacity: 0.9; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4)); margin: 8px auto 0 auto;"></div>
  </div>
</section>

<!-- Our Story Section -->
<section class="section">
  <div class="container">
    <div class="about-content">
      <div class="about-text reveal">
        <h2 class="section-title">Our Story</h2>
        <?php
        if ( have_posts() ) :
            while ( have_posts() ) : the_post();
                the_content();
            endwhile;
        else :
            ?>
            <p><center>
              Considered to be the epitome of Modern Photography and Filmmaking,<br>
              UMA PHOTO has transformed the Indian Wedding landscape on a regular basis.<br> 
              For almost a decade UMA PHOTOs has been creating photographs and films <br>
              which are timeless and have been etched in memories of thousands of people forever.
            </center></p>
            <?php
        endif;
        ?>
      </div>
      <div class="about-image reveal reveal-delay-2">
        <img src="<?php echo esc_url( $about_story_img ); ?>" alt="Our Studio" loading="lazy">
      </div>
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

<!-- Team Section -->
<section class="section section-dark">
  <div class="container">
    <h2 class="section-title reveal">Meet Our Team</h2>
    <p class="section-subtitle reveal">The creative minds behind <?php bloginfo( 'name' ); ?></p>
    <div class="team-grid">
      <?php
      $team_query = new WP_Query( array(
          'post_type'      => 'team_member',
          'posts_per_page' => -1,
          'orderby'        => 'menu_order',
          'order'          => 'ASC',
      ) );

      if ( $team_query->have_posts() ) :
          $i = 0;
          while ( $team_query->have_posts() ) : $team_query->the_post();
              // Fetch team member phone number custom field (ACF or native field)
              $phone = get_post_meta( get_the_ID(), 'team_member_phone', true );
              if ( ! $phone && function_exists( 'get_field' ) ) {
                  $phone = get_field( 'team_member_phone' );
              }
              $phone = $phone ? $phone : '+91 9879510130';
              ?>
              <div class="team-card glass-card reveal reveal-delay-<?php echo esc_attr( $i + 1 ); ?>">
                <div class="team-photo">
                  <?php if ( has_post_thumbnail() ) : ?>
                      <?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?>
                  <?php else : ?>
                      <img src="<?php echo esc_url( get_template_directory_uri() . '/images/uma.jpg' ); ?>" alt="<?php the_title(); ?>" loading="lazy">
                  <?php endif; ?>
                </div>
                <h3 class="team-name"><?php the_title(); ?></h3>
                <div class="team-bio"><?php the_content(); ?></div>
                <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone ) ); ?>" class="team-phone">📞 <?php echo esc_html( $phone ); ?></a>
              </div>
              <?php
              $i++;
          endwhile;
          wp_reset_postdata();
      else :
          // Fallback static team if no posts exist yet
          $fallback_team = array(
              array(
                  'name' => 'Prakash Bhoraniya',
                  'phone' => '+91 9879510130',
                  'photo' => 'pbhoraniya.jpg',
                  'bio' => 'With over 10 years of experience capturing life\'s most precious moments, Prakash brings artistic vision and technical mastery to every shoot.'
              ),
              array(
                  'name' => 'Jignesh Bhoraniya',
                  'phone' => '+91 9979423322',
                  'photo' => 'uma.jpg',
                  'bio' => 'With over 10 years of experience capturing life\'s most precious moments, Jignesh brings artistic vision and technical mastery to every shoot.'
              )
          );
          foreach ( $fallback_team as $idx => $member ) :
              ?>
              <div class="team-card glass-card reveal reveal-delay-<?php echo esc_attr( $idx + 1 ); ?>">
                <div class="team-photo">
                  <img src="<?php echo esc_url( get_template_directory_uri() . '/images/' . $member['photo'] ); ?>" alt="<?php echo esc_html( $member['name'] ); ?>" loading="lazy">
                </div>
                <h3 class="team-name"><?php echo esc_html( $member['name'] ); ?></h3>
                <p class="team-bio"><?php echo esc_html( $member['bio'] ); ?></p>
                <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $member['phone'] ) ); ?>" class="team-phone">📞 <?php echo esc_html( $member['phone'] ); ?></a>
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
