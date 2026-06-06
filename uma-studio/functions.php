<?php
/**
 * Uma Photo Studio functions and definitions
 *
 * @package Uma_Photo_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Setup Theme Supports
 */
function uma_studio_setup() {
	// Enable dynamic document title tag
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails / Featured Images
	add_theme_support( 'post-thumbnails' );

	// Enable HTML5 support
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );

	// Register Navigation Menu
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Header Menu', 'uma-studio' ),
	) );
}
add_action( 'after_setup_theme', 'uma_studio_setup' );

/**
 * Enqueue styles and scripts
 */
function uma_studio_scripts() {
	$theme_version = wp_get_theme()->get( 'Version' );

	// Enqueue Google Fonts
	wp_enqueue_style( 'uma-google-fonts', 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap', array(), null );

	// Enqueue CSS files
	wp_enqueue_style( 'uma-variables', get_template_directory_uri() . '/css/variables.css', array(), $theme_version );
	wp_enqueue_style( 'uma-base', get_template_directory_uri() . '/css/base.css', array( 'uma-variables' ), $theme_version );
	wp_enqueue_style( 'uma-components', get_template_directory_uri() . '/css/components.css', array( 'uma-base' ), $theme_version );
	wp_enqueue_style( 'uma-pages', get_template_directory_uri() . '/css/pages.css', array( 'uma-components' ), $theme_version );
	wp_enqueue_style( 'uma-animations', get_template_directory_uri() . '/css/animations.css', array( 'uma-pages' ), $theme_version );
	wp_enqueue_style( 'uma-main-style', get_stylesheet_uri(), array( 'uma-animations' ), $theme_version );

	// Enqueue Javascript
	wp_enqueue_script( 'uma-theme-app', get_template_directory_uri() . '/js/theme-app.js', array(), $theme_version, true );
}
add_action( 'wp_enqueue_scripts', 'uma_studio_scripts' );

function uma_studio_register_cpts() {
	// 1. Portfolio Albums
	register_post_type( 'album', array(
		'labels' => array(
			'name'               => _x( 'Albums', 'post type general name', 'uma-studio' ),
			'singular_name'      => _x( 'Album', 'post type singular name', 'uma-studio' ),
			'menu_name'          => _x( 'Portfolio Albums', 'admin menu', 'uma-studio' ),
			'add_new'            => _x( 'Add New', 'album', 'uma-studio' ),
			'add_new_item'       => __( 'Add New Album', 'uma-studio' ),
			'new_item'           => __( 'New Album', 'uma-studio' ),
			'edit_item'          => __( 'Edit Album', 'uma-studio' ),
			'view_item'          => __( 'View Album', 'uma-studio' ),
			'all_items'          => __( 'All Albums', 'uma-studio' ),
			'search_items'       => __( 'Search Albums', 'uma-studio' ),
			'not_found'          => __( 'No albums found.', 'uma-studio' ),
			'not_found_in_trash' => __( 'No albums found in Trash.', 'uma-studio' )
		),
		'public'              => true,
		'has_archive'         => true,
		'rewrite'             => array( 'slug' => 'albums' ),
		'menu_icon'           => 'dashicons-format-gallery',
		'supports'            => array( 'title', 'thumbnail', 'excerpt' ),
		'show_in_rest'        => true,
	) );

	// 2. Team Members
	register_post_type( 'team_member', array(
		'labels' => array(
			'name'          => _x( 'Team Members', 'post type general name', 'uma-studio' ),
			'singular_name' => _x( 'Team Member', 'post type singular name', 'uma-studio' ),
			'menu_name'     => _x( 'Our Team', 'admin menu', 'uma-studio' ),
			'add_new_item'  => __( 'Add New Team Member', 'uma-studio' ),
			'edit_item'     => __( 'Edit Team Member', 'uma-studio' ),
			'all_items'     => __( 'All Team Members', 'uma-studio' ),
		),
		'public'              => true,
		'show_in_menu'        => true,
		'menu_icon'           => 'dashicons-businessman',
		'supports'            => array( 'title', 'thumbnail' ),
		'show_in_rest'        => true,
	) );

	// 3. Studio Services
	register_post_type( 'studio_service', array(
		'labels' => array(
			'name'          => _x( 'Services', 'post type general name', 'uma-studio' ),
			'singular_name' => _x( 'Service', 'post type singular name', 'uma-studio' ),
			'menu_name'     => _x( 'Services', 'admin menu', 'uma-studio' ),
			'add_new_item'  => __( 'Add New Service', 'uma-studio' ),
			'edit_item'     => __( 'Edit Service', 'uma-studio' ),
			'all_items'     => __( 'All Services', 'uma-studio' ),
		),
		'public'              => true,
		'menu_icon'           => 'dashicons-camera',
		'supports'            => array( 'title', 'thumbnail', 'excerpt' ),
		'show_in_rest'        => true,
	) );

	// 4. Wedding Films
	register_post_type( 'wedding_film', array(
		'labels' => array(
			'name'          => _x( 'Films', 'post type general name', 'uma-studio' ),
			'singular_name' => _x( 'Film', 'post type singular name', 'uma-studio' ),
			'menu_name'     => _x( 'Wedding Films', 'admin menu', 'uma-studio' ),
			'add_new_item'  => __( 'Add New Film', 'uma-studio' ),
			'edit_item'     => __( 'Edit Film', 'uma-studio' ),
			'all_items'     => __( 'All Films', 'uma-studio' ),
		),
		'public'              => true,
		'menu_icon'           => 'dashicons-video-alt3',
		'supports'            => array( 'title', 'excerpt' ),
		'show_in_rest'        => true,
	) );

	// Register Custom Taxonomy for Category Types: Studio, Outdoor
	register_taxonomy( 'album_category', 'album', array(
		'labels' => array(
			'name'              => _x( 'Album Categories', 'taxonomy general name', 'uma-studio' ),
			'singular_name'     => _x( 'Album Category', 'taxonomy singular name', 'uma-studio' ),
			'search_items'      => __( 'Search Album Categories', 'uma-studio' ),
			'all_items'         => __( 'All Album Categories', 'uma-studio' ),
			'parent_item'       => __( 'Parent Category', 'uma-studio' ),
			'parent_item_colon' => __( 'Parent Category:', 'uma-studio' ),
			'edit_item'         => __( 'Edit Category', 'uma-studio' ),
			'update_item'       => __( 'Update Category', 'uma-studio' ),
			'add_new_item'      => __( 'Add New Category', 'uma-studio' ),
			'new_item_name'     => __( 'New Category Name', 'uma-studio' ),
			'menu_name'         => __( 'Categories', 'uma-studio' ),
		),
		'hierarchical'      => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'portfolio' ),
		'show_in_rest'      => true,
	) );

	// Register Custom Taxonomy for Film Categories
	register_taxonomy( 'film_category', 'wedding_film', array(
		'labels' => array(
			'name'              => _x( 'Film Categories', 'taxonomy general name', 'uma-studio' ),
			'singular_name'     => _x( 'Film Category', 'taxonomy singular name', 'uma-studio' ),
			'search_items'      => __( 'Search Film Categories', 'uma-studio' ),
			'all_items'         => __( 'All Film Categories', 'uma-studio' ),
			'edit_item'         => __( 'Edit Category', 'uma-studio' ),
			'update_item'       => __( 'Update Category', 'uma-studio' ),
			'add_new_item'      => __( 'Add New Category', 'uma-studio' ),
			'new_item_name'     => __( 'New Category Name', 'uma-studio' ),
			'menu_name'         => __( 'Film Categories', 'uma-studio' ),
		),
		'hierarchical'      => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'film-categories' ),
		'show_in_rest'      => true,
	) );
}
add_action( 'init', 'uma_studio_register_cpts' );

/**
 * Add custom header body classes
 */
function uma_studio_body_classes( $classes ) {
	$classes[] = 'glassmorphism-theme';
	return $classes;
}
add_filter( 'body_class', 'uma_studio_body_classes' );

/**
 * Add Customizer settings for Social Links and Contact Info
 */
function uma_studio_customizer_settings( $wp_customize ) {
	// Add Section for Social Links
	$wp_customize->add_section( 'uma_social_section', array(
		'title'    => __( 'Social Links', 'uma-studio' ),
		'priority' => 30,
	) );

	// Social link settings
	$social_links = array(
		'insta_wedding' => 'Instagram Wedding',
		'insta_child'   => 'Instagram Kids',
		'facebook'      => 'Facebook',
		'youtube'       => 'YouTube',
		'whatsapp'      => 'WhatsApp',
	);

	foreach ( $social_links as $setting_id => $label ) {
		$wp_customize->add_setting( $setting_id, array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		) );
		$wp_customize->add_control( $setting_id, array(
			'label'   => $label,
			'section' => 'uma_social_section',
			'type'    => 'url',
		) );
	}

	// Add Section for Contact Info
	$wp_customize->add_section( 'uma_contact_section', array(
		'title'    => __( 'Contact Info', 'uma-studio' ),
		'priority' => 31,
	) );

	// Contact info settings
	$wp_customize->add_setting( 'studio_address', array(
		'default'           => '9,10 - Shree Hari Shopping Center, Opp. Swastik Plaza, Yogi Chowk, Surat - 395010',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'studio_address', array(
		'label'   => 'Studio Address',
		'section' => 'uma_contact_section',
		'type'    => 'textarea',
	) );

	$wp_customize->add_setting( 'phone_prakash', array(
		'default'           => '+91 9879510130',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'phone_prakash', array(
		'label'   => 'Prakash Bhoraniya Phone',
		'section' => 'uma_contact_section',
		'type'    => 'text',
	) );

	$wp_customize->add_setting( 'phone_jignesh', array(
		'default'           => '+91 9979423322',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'phone_jignesh', array(
		'label'   => 'Jignesh Bhoraniya Phone',
		'section' => 'uma_contact_section',
		'type'    => 'text',
	) );

	$wp_customize->add_setting( 'studio_email', array(
		'default'           => 'umastudiosuart@gmail.com',
		'sanitize_callback' => 'sanitize_email',
	) );
	$wp_customize->add_control( 'studio_email', array(
		'label'   => 'Studio Email',
		'section' => 'uma_contact_section',
		'type'    => 'email',
	) );
}
add_action( 'customize_register', 'uma_studio_customizer_settings' );
