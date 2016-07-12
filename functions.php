<?php
/**
 * sixei functions and definitions
 *
 * @package sixei
 * @since sixei 1.0
 * 
 */

// Load the theme specific files
//include get_template_directory() . '/inc/multilang.php';
include get_template_directory() . '/inc/video_post_type.php';
include get_template_directory() . '/inc/duan_post_type.php';
include get_template_directory() . '/inc/anpham_post_type.php';
include get_template_directory() . '/inc/home_slider.php';
include get_template_directory() . '/inc/helper.php';
include get_template_directory() . '/inc/widget.php';
include get_template_directory() . '/inc/post_custom_field.php';
include get_template_directory() . '/inc/shortcode.php';

define('SIXEI_ROOT_URI', get_template_directory_uri());

if ( ! function_exists( 'sixei_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * @since novaland 1.0
 */
function sixei_setup() {
        $path = get_template_directory() . '/languages';
        $result = load_theme_textdomain('sixei', $path);
        //var_dump($result);
        if(!$result){
        $locale = apply_filters( 'theme_locale', get_locale(), 'sixei' );
   die( "Could not find $path/$locale.mo." );
        }
	// Enable support for Post Thumbnails
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Top Menu', 'sixei' ),
	) );
        register_nav_menus( array(
		'primary_mobile' => __( 'Top Menu for Mobile', 'sixei' ),
	) );
         register_nav_menus( array(
		'footer' => __( 'Footer Menu', 'sixei' ),
	) );

	set_post_thumbnail_size(400, 300, true);
}
endif; // vantage_setup
add_action( 'after_setup_theme', 'sixei_setup' );

function sixei_scripts(){
    //load css
    wp_enqueue_style('bootstrap.min', get_template_directory_uri() . '/css/bootstrap.min.css');
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_style('flexslider', get_template_directory_uri() . '/css/flexslider.css');
    
    
    //load js
    wp_enqueue_script('libs', get_template_directory_uri() . '/js/libs.js');
    wp_enqueue_script('plugins', get_template_directory_uri() . '/js/plugins.js');
    wp_enqueue_script('bootstrap.min', get_template_directory_uri() . '/js/bootstrap.min.js');
    wp_enqueue_script('jquery.flexslider-min', get_template_directory_uri() . '/js/jquery.flexslider-min.js');
    wp_enqueue_script('start', get_template_directory_uri() . '/js/start.js');
}
add_action('wp_enqueue_scripts', 'sixei_scripts');

function sixei_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar Category', 'sixei'),
        'id' => 'category-sidebar',
        'description' => __('Sidebar cho trang danh mục', 'sixei'),
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
    ));
    register_sidebar(array(
        'name' => __('Sidebar', 'sixei'),
        'id' => 'sidebar',
        'description' => __('Sidebar cho trang chủ', 'sixei'),
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
    ));
}
add_action('widgets_init', 'sixei_widgets_init');

function sixei_wp_title($title, $sep) {
    global $paged, $page;

    if (is_feed()) {
        return $title . $sep . get_bloginfo('name');
    }

    // Add the site name.
    $title .= get_bloginfo('name');

    // Add the site description for the home/front page.
    if (( is_home() || is_front_page() )) {
        $title = "Home Page $sep $title";
    }

    // Add a page number if necessary.
    if ($paged >= 2 || $page >= 2) {
        $title = "$title $sep " . sprintf(__('Trang %s', 'novaland'), max($paged, $page));
    }

    return $title;
}

add_filter('wp_title', 'sixei_wp_title', 10, 2);

//echo get_locale();