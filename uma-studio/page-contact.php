<?php
/**
 * Template Name: Contact Page Template
 *
 * @package Uma_Photo_Studio
 */

get_header();

// Fetch contact details from Customizer (with fallbacks)
$address = get_theme_mod( 'studio_address', '9,10 - Shree Hari Shopping Center, Opp. Swastik Plaza, Yogi Chowk, Surat - 395010' );
$phone_prakash = get_theme_mod( 'phone_prakash', '+91 9879510130' );
$phone_jignesh = get_theme_mod( 'phone_jignesh', '+91 9979423322' );
$email = get_theme_mod( 'studio_email', 'umastudiosuart@gmail.com' );
$contact_hero_bg = get_theme_mod( 'contact_hero_bg', 'https://res.cloudinary.com/dnpihrazm/image/upload/q_auto,f_auto,w_1600/umaphotostudio/COVERcopy.webp' );

if ( has_post_thumbnail() ) {
    $contact_hero_bg = get_the_post_thumbnail_url( get_the_ID(), 'full' );
}

$event_options = array(
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
);
?>

<!-- Page Header -->
<section class="page-header" style="background-image: url('<?php echo esc_url( $contact_hero_bg ); ?>')">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title"><?php the_title(); ?></h1>
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
        <div id="form-status"></div>
        <form id="contact-form" data-studio-email="<?php echo esc_attr( $email ); ?>">
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
                <?php foreach ( $event_options as $opt ) : ?>
                    <option value="<?php echo esc_attr( $opt ); ?>"><?php echo esc_html( $opt ); ?></option>
                <?php endforeach; ?>
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
            <?php echo esc_html( $address ); ?>
          </div>
        </div>

        <div class="contact-info-item">
          <span class="contact-info-icon">👤</span>
          <div>
            <strong>Prakash Bhoraniya</strong><br>
            <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_prakash ) ); ?>"><?php echo esc_html( $phone_prakash ); ?></a>
          </div>
        </div>

        <div class="contact-info-item">
          <span class="contact-info-icon">👤</span>
          <div>
            <strong>Jignesh Bhoraniya</strong><br>
            <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_jignesh ) ); ?>"><?php echo esc_html( $phone_jignesh ); ?></a>
          </div>
        </div>

        <div class="contact-info-item">
          <span class="contact-info-icon">📧</span>
          <div>
            <strong>Email</strong><br>
            <a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a>
          </div>
        </div>

        <div class="contact-info-item">
          <span class="contact-info-icon">📞</span>
          <div>
            <strong>General Inquiries</strong><br>
            <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_prakash ) ); ?>"><?php echo esc_html( $phone_prakash ); ?></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Map Section -->
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
      </table>
    </div>
  </div>
</section>

<?php
get_footer();
