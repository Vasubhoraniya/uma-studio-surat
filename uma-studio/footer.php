  <!-- Footer -->
  <?php
  $address = get_theme_mod( 'studio_address', '9,10 - Shree Hari Shopping Center, Opp. Swastik Plaza, Yogi Chowk, Surat - 395010' );
  $phone_prakash = get_theme_mod( 'phone_prakash', '+91 9879510130' );
  $phone_jignesh = get_theme_mod( 'phone_jignesh', '+91 9979423322' );
  $email = get_theme_mod( 'studio_email', 'umastudiosuart@gmail.com' );

  $insta_wedding = get_theme_mod( 'insta_wedding', 'https://www.instagram.com/umawedding/' );
  $insta_child = get_theme_mod( 'insta_child', 'https://www.instagram.com/uma_childphoto' );
  $facebook = get_theme_mod( 'facebook', 'https://www.facebook.com/bhoraniyaprakash' );
  $youtube = get_theme_mod( 'youtube', 'https://www.youtube.com/@umaphotostudio8052' );
  $whatsapp = get_theme_mod( 'whatsapp', 'https://wa.me/9979423322' );
  ?>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <?php if ( has_custom_logo() ) : ?>
              <?php the_custom_logo(); ?>
          <?php else : ?>
              <h3 class="footer-logo"><?php bloginfo( 'name' ); ?></h3>
          <?php endif; ?>
          <p class="footer-tagline"><?php bloginfo( 'description' ); ?></p>
          <p class="footer-desc">Capturing life's most beautiful moments with passion, creativity, and an eye for detail.</p>
        </div>

        <div class="footer-links-section">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
            <li><a href="<?php echo esc_url( home_url( '/studio/' ) ); ?>">Studio</a></li>
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Outdoor</a></li>
            <li><a href="<?php echo esc_url( home_url( '/films/' ) ); ?>">Films</a></li>
            <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About Us</a></li>
            <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-links-section">
          <h4>Our Services</h4>
          <ul class="footer-links">
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Wedding</a></li>
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Pre-Wedding</a></li>
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Engagement</a></li>
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Child Photoshoot</a></li>
            <li><a href="<?php echo esc_url( home_url( '/studio/' ) ); ?>">Born Baby Photography</a></li>
            <li><a href="<?php echo esc_url( home_url( '/studio/' ) ); ?>">Family Photography</a></li>
          </ul>
        </div>

        <div class="footer-contact-section">
          <h4>Get In Touch</h4>
          <div class="footer-contact">
            <p><i class="fa fa-map-marker"></i> <?php echo esc_html( $address ); ?></p>
            <p><i class="fa fa-phone"></i> Prakash Bhoraniya: <?php echo esc_html( $phone_prakash ); ?></p>
            <p><i class="fa fa-phone"></i> Jignesh Bhoraniya: <?php echo esc_html( $phone_jignesh ); ?></p>
            <p><i class="fa fa-envelope"></i> <?php echo esc_html( $email ); ?></p>
          </div>
          <div class="footer-social footer-social-links">
            <?php if ( $insta_wedding ) : ?><a href="<?php echo esc_url( $insta_wedding ); ?>" target="_blank" rel="noopener" aria-label="Instagram Wedding"><i class="fa fa-instagram"></i></a><?php endif; ?>
            <?php if ( $insta_child ) : ?><a href="<?php echo esc_url( $insta_child ); ?>" target="_blank" rel="noopener" aria-label="Instagram Kids"><i class="fa fa-instagram"></i></a><?php endif; ?>
            <?php if ( $facebook ) : ?><a href="<?php echo esc_url( $facebook ); ?>" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa fa-facebook"></i></a><?php endif; ?>
            <?php if ( $youtube ) : ?><a href="<?php echo esc_url( $youtube ); ?>" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa fa-youtube-play"></i></a><?php endif; ?>
            <?php if ( $whatsapp ) : ?><a href="<?php echo esc_url( $whatsapp ); ?>" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa fa-whatsapp"></i></a><?php endif; ?>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved. | Crafted with <span class="text-accent">&hearts;</span> for beautiful moments</p>
      </div>
    </div>
  </footer>

  <!-- Floating Enquiry Button -->
  <a class="floating-enquiry" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" id="floating-enquiry">
    <i class="fa fa-camera"></i>
    <span>Book Now</span>
  </a>

  <!-- Back to Top Button -->
  <button class="back-to-top" id="back-to-top" aria-label="Back to top">
    <i class="fa fa-chevron-up"></i>
  </button>

  <?php wp_footer(); ?>
</body>
</html>
