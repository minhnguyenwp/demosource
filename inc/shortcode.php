<?php

function sixei_post_list_shortcode($atts, $content = null) {
    extract(shortcode_atts(array("ids" => ""), $atts));

    $html = '<section class="main-slider">';

    $args = array(
        'orderby' => 'ID',
        'order' => 'ASC',
        'post_per_page' => $number_of_slides,
        'post_status' => 'publish',
        'post_type' => 'novaland_slides'
    );

    $slides = get_posts($args);
    foreach ($slides as $slide) {
        //var_dump($branch);
        $link = get_post_meta($slide->ID, 'sixei_homeslide_link', true);
        $images = rwmb_meta('sixei_homeslide_image', array('type' => 'plupload_image', 'size' => array(1170, 450)), $slide->ID);
        $image = '';
        foreach($images as $img){
            $image = $img['full_url'];
            break;
        }
        $html .= '<div style="background-image: url(' . $image . ')" class="slide-itm">
                    <div class="slide-ct"><a href="' . $link . '">
                        <h3>' . $slide->post_title . '</h3>
                        <span> <i class="fa fa-long-arrow-right"></i></span>
                    </a></div>
                </div>';
    }
    $html .= '</section>';
    $html .= '<script type="text/javascript">
                $(".top-content").flexslider({
                selector: ".main-slider > .slide-itm",
                animation: "slide",
                animationLoop: true,
              });
            </script>';
    return $html;
}
add_shortcode('sixei_post_list', 'sixei_post_list_shortcode');