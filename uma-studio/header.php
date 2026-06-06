<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- Local Business Schema for Local SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "<?php bloginfo( 'name' ); ?>",
    "image": "<?php echo esc_url( get_template_directory_uri() . '/images/about-cover.jpg' ); ?>",
    "url": "<?php echo esc_url( home_url( '/' ) ); ?>",
    "telephone": "+91 9879510130",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9,10 - Shree Hari Shopping Center, Opp. Swastik Plaza, Yogi Chowk",
      "addressLocality": "Surat",
      "postalCode": "395010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.2152,
      "longitude": 72.8700
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Surat"
      }
    ]
  }
  </script>

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <!-- Premium Preloader -->
  <div class="preloader" id="preloader">
    <div class="camera-flash" id="camera-flash"></div>
    <div class="shutter-button" id="shutter-button">
      <span class="shutter-inner"></span>
    </div>
    <div class="preloader-content">
      <div class="preloader-logo"><?php bloginfo( 'name' ); ?></div>
      <div class="preloader-tagline"><?php bloginfo( 'description' ); ?></div>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="navbar" id="navbar">
    <div class="container navbar-inner">
      <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
        <?php
        if ( has_custom_logo() ) {
            the_custom_logo();
        } else {
            echo '<span class="navbar-logo-text">' . esc_html( get_bloginfo( 'name' ) ) . '</span>';
        }
        ?>
        <span class="navbar-tagline"><?php bloginfo( 'description' ); ?></span>
      </a>

      <?php
      if ( has_nav_menu( 'primary' ) ) {
          wp_nav_menu( array(
              'theme_location' => 'primary',
              'container'      => false,
              'menu_class'     => 'nav-links',
              'menu_id'        => 'nav-links',
              'depth'          => 2,
          ) );
      } else {
          // Fallback static menu if WordPress menu is not configured yet
          ?>
          <ul class="nav-links" id="nav-links">
            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
            <li><a href="<?php echo esc_url( home_url( '/studio/' ) ); ?>">Studio</a></li>
            <li><a href="<?php echo esc_url( home_url( '/outdoor/' ) ); ?>">Outdoor</a></li>
            <li><a href="<?php echo esc_url( home_url( '/films/' ) ); ?>">Films</a></li>
            <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About Us</a></li>
            <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a></li>
          </ul>
          <?php
      }
      ?>

      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Social Sidebar -->
  <?php
  // Fetch social links configured in the Customizer (or defaults)
  $insta_wedding = get_theme_mod( 'insta_wedding', 'https://www.instagram.com/umawedding/' );
  $insta_child = get_theme_mod( 'insta_child', 'https://www.instagram.com/uma_childphoto' );
  $facebook = get_theme_mod( 'facebook', 'https://www.facebook.com/bhoraniyaprakash' );
  $youtube = get_theme_mod( 'youtube', 'https://www.youtube.com/@umaphotostudio8052' );
  $whatsapp = get_theme_mod( 'whatsapp', 'https://wa.me/9979423322' );
  ?>
  <div class="social-sidebar" id="social-sidebar">
    <?php if ( $insta_wedding ) : ?><a href="<?php echo esc_url( $insta_wedding ); ?>" target="_blank" rel="noopener" aria-label="Instagram Wedding"><i class="fa fa-instagram"></i></a><?php endif; ?>
    <?php if ( $insta_child ) : ?><a href="<?php echo esc_url( $insta_child ); ?>" target="_blank" rel="noopener" aria-label="Instagram Kids"><i class="fa fa-instagram"></i></a><?php endif; ?>
    <?php if ( $facebook ) : ?><a href="<?php echo esc_url( $facebook ); ?>" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa fa-facebook"></i></a><?php endif; ?>
    <?php if ( $youtube ) : ?><a href="<?php echo esc_url( $youtube ); ?>" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa fa-youtube-play"></i></a><?php endif; ?>
    <?php if ( $whatsapp ) : ?><a href="<?php echo esc_url( $whatsapp ); ?>" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa fa-whatsapp"></i></a><?php endif; ?>
  </div>
