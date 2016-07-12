<?php

add_action('init', 'home_slider_init');

function home_slider_init() {
    $labels = array(
        'name' => _x('Slideshow trang chủ', 'post type general name'),
        'singular_name' => _x('Slide', 'post type singular name'),
        'add_new' => _x('Thêm slide', 'recipes'),
        'add_new_item' => __('Thêm slide'),
        'edit_item' => __('Cập nhật slide'),
        'new_item' => __('Thêm slide'),
        'view_item' => __('Xem slide'),
        'search_items' => __('Tìm kiếm slide'),
        'not_found' => __('Không tìm thấy slide'),
        'not_found_in_trash' => __('Không có slide nào trong trash'),
        'parent_item_colon' => ''
    );


    register_post_type('sixei_slides', array(
        "labels" => $labels,
        "public" => false,
        "publicly_queryable" => false,
        "rewrite" => false,
        "show_ui" => true,
        "capability_type" => "post",
        "hierarchical" => false,
        "supports" => array("title", "editor")
            )
    );
}

if (class_exists('RW_Meta_Box')) {
    add_filter('rwmb_meta_boxes', 'sixei_slides_meta_boxes');
}

function sixei_slides_meta_boxes($meta_boxes) {
    /**
     * prefix of meta keys (optional)
     * Use underscore (_) at the beginning to make keys hidden
     * Alt.: You also can make prefix empty to disable it
     */
    // Better has an underscore as last sign
    $prefix = 'sixei_homeslide_';
    //meta box
    $meta_boxes[] = array(
        'title' => __('Slide', 'sixei'),
        'post_types' => array('sixei_slides'),
        'fields' => array(
            array(
                'name' => __('Link', 'sixei'),
                'id' => "{$prefix}link",
                'type' => 'text',
            ),
            array(
                'name' => __('English Link', 'sixei'),
                'id' => "{$prefix}link_en",
                'type' => 'text',
            ),
            // PLUPLOAD IMAGE UPLOAD (WP 3.3+)
            array(
                'name' => __('Hình ảnh', 'sixei'),
                'id' => "{$prefix}image",
                'type' => 'plupload_image',
                'max_file_uploads' => 1,
            ),
        )
    );
    return $meta_boxes;
}

function sixei_homeslides_shortcode($atts, $content = null) {
    extract(shortcode_atts(array("number_of_slides" => -1), $atts));

    $html = '<section class="main-slider">';

    $args = array(
        'orderby' => 'ID',
        'order' => 'ASC',
        'posts_per_page' => $number_of_slides,
        'post_status' => 'publish',
        'post_type' => 'sixei_slides'
    );
    $slides = get_posts($args);

    foreach ($slides as $slide) {
        //var_dump($branch);
        if(get_locale() == "en_US")
            $link = get_post_meta($slide->ID, 'sixei_homeslide_link_en', true);
        else 
            $link = get_post_meta($slide->ID, 'sixei_homeslide_link', true);
        $images = rwmb_meta('sixei_homeslide_image', array('type' => 'plupload_image', 'size' => array(1170, 450)), $slide->ID);
        $image = '';
        foreach ($images as $img) {
            $image = $img['full_url'];
            break;
        }
        $html .= '<section class="slider-inner"><a href="' . $link . '">
                        <figure class="slider-img"><img src="' . $image . '" alt="' . get_the_title($slide) . '"></figure>
                        <section class="slider-caption">
                            <h4>' . get_the_title($slide) . '</h4>
                            <p>« ' . sixei_translate($slide->post_content) . '</p>
                        </section></a></section>';
    }
    $html .= '</section>';
    $html .= '<script type="text/javascript">
                $(".slider-right").flexslider({
                selector: ".main-slider > .slider-inner",
                animation: "slide",
                animationLoop: true,
              });
            </script>';
    return $html;
}

add_shortcode('sixei_homeslides', 'sixei_homeslides_shortcode');