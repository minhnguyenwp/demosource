<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* truncate long text limited to chosen characters */

function sixei_truncate($string, $length = 100, $append = "&hellip;") {
    $string = trim(wp_strip_all_tags($string));
    $string = str_replace(array("\r\n", "\r", "\n"), " ", $string);
    if (strlen($string) > $length) {
        $string = wordwrap($string, $length);
        $string = explode("\n", $string, 2);
        $string = $string[0] . $append;
    }

    return $string;
}

function sixei_related_post($postid, $post_type, $taxonomy, $num_posts) {
    // get the custom post type's taxonomy terms
    $html = '';
    $custom_taxterms = wp_get_object_terms($postid, $taxonomy, array('fields' => 'ids'));
// arguments
    $args = array(
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $num_posts, // you may edit this number
        'orderby' => 'rand',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'field' => 'id',
                'terms' => $custom_taxterms
            )
        ),
        'post__not_in' => array($postid),
    );

    $related_items = new WP_Query($args);

// loop over query
    if ($related_items->have_posts()) :
        $html .= '<ul>';
        while ($related_items->have_posts()) : $related_items->the_post();

            $html .= '<li><a href="' . get_the_permalink() . '" title="' . get_the_title() . '">' . get_the_title() . '</a></li>';

        endwhile;
        $html .= '</ul>';
    endif;
// Reset Post Data
    wp_reset_postdata();
    return $html;
}

function sixei_translate($text = '') {
    $lang = get_locale() == "en_US" ? "en" : get_locale();
    return WPGlobus_Core::text_filter(
                    $text, $lang, null, WPGlobus::Config()->default_language
    );
}

function sixei_get_id_from_youtube_link($youtube_link) {
    preg_match('#(?<=(?:v|i)=)[a-zA-Z0-9-]+(?=&)|(?<=(?:v|i)\/)[^&\n]+|(?<=embed\/)[^"&\n]+|(?<=(?:v|i)=)[^&\n]+|(?<=youtu.be\/)[^&\n]+#', $youtube_link, $match);
    return $match[0];
}

function sixei_get_top_parent_category($cat_ID) {
    $cat = get_category($cat_ID);
    $new_cat_id = $cat->category_parent;

    if ($new_cat_id != "0") {
        return (sixei_get_top_parent_category($new_cat_id));
    }
    return $cat_ID;
}

function sixei_get_bottom_last_child_category($cat_ID) {
    $children = get_categories(array('parent' => $cat_ID, 'hide_empty' => false, 'orderby' => 'id', 'order' => 'ASC'));
    if (empty($children)) {
        return $cat_ID;
    }
    return sixei_get_bottom_last_child_category($children[0]->term_id);
}

function sixei_get_first_post_in_category($cat_ID, $post_type = 'post') {
    $arg = array(
        'post_type' => $post_type,
        'posts_per_page' => 1,
        'category' => $cat_ID,
        'orderby'=>'id',
        'order' => 'ASC'
    );
    $posts = get_posts($arg);
    return $posts[0];   
}

?>
