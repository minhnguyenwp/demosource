<?php
add_action('init', 'video_init');

function video_init() {
    $labels = array(
        'name' => _x('Video', 'post type general name'),
        'singular_name' => _x('Video', 'post type singular name'),
        'add_new' => _x('Thêm video', 'recipes'),
        'add_new_item' => __('Thêm video'),
        'edit_item' => __('Cập nhật video'),
        'new_item' => __('Thêm video'),
        'view_item' => __('Xem video'),
        'search_items' => __('Tìm kiếm video'),
        'not_found' => __('Không tìm thấy video'),
        'not_found_in_trash' => __('Không có video nào trong trash'),
        'parent_item_colon' => ''
    );

    $supports = array('title', 'editor', 'author', 'comments');
    register_post_type('sixei_video', array(
        'labels' => $labels,
        'public' => true,
        'supports' => $supports,
        'has_archive' => true,
        'rewrite' => array('slug' => 'video'),
        'taxonomies' => array('category'),
        'menu_position' => 5,
            //'yarpp_support' => true
            )
    );

    // events taxonomy
//    register_taxonomy(
//            'vi_tri', array('du_an'), array(
//        'hierarchical' => true,
//        'label' => 'Quận',
//        'query_var' => true,
//        'rewrite' => array('slug' => 'vi-tri')
//            )
//    );
}

if (class_exists('RW_Meta_Box')) {
    add_filter('rwmb_meta_boxes', 'sixei_video_meta_boxes');
}

function sixei_video_meta_boxes($meta_boxes) {
    /**
     * prefix of meta keys (optional)
     * Use underscore (_) at the beginning to make keys hidden
     * Alt.: You also can make prefix empty to disable it
     */
    // Better has an underscore as last sign
    $prefix = 'sixei_video_';
    // 1st meta box
    $meta_boxes[] = array(
        'title' => __('Video link', 'sixei'),
        'post_types' => array('sixei_video'),
        'fields' => array(
            array(
                'name' => __('Link Youtube', 'sixei'),
                'id' => "{$prefix}youtube_link",
                'type' => 'text',
            ),
        )
    );
    return $meta_boxes;
}

//function show_vitri_taxonomy($taxonomies) {
//    $taxonomies[] = 'vi_tri';
//    return $taxonomies;
//}
//
//add_filter('manage_taxonomies_for_du_an_columns', 'show_vitri_taxonomy');

function sixei_video_table_head($columns) {
    $columns['youtube_link'] = 'Link Youtube';
    return $columns;
}

add_filter('manage_sixei_video_posts_columns', 'sixei_video_table_head');

function sixei_video_table_content($column_name, $post_id) {
    $prefix = 'sixei_video_';
    if ($column_name == 'youtube_link') {
        echo get_post_meta($post_id, $prefix . 'youtube_link', true);
    }
}

add_action('manage_sixei_video_posts_custom_column', 'sixei_video_table_content', 10, 2);

function sixei_add_quick_edit_video($column_name, $post_type) {
    if ($column_name != 'youtube_link' || $post_type != 'sixei_video')
        return;
    ?>
    <fieldset class="inline-edit-col-left">
        <div class="inline-edit-col">
            <input type="hidden" name="sixei_video_display_set_noncename" id="sixei_video_display_set_noncename" value="" />            
            <span class="title">Link Youtube: <input type="text" name="sixei_video_youtube_link" value="" id="sixei_video_youtube_link" /></span></br>    
        </div>
    </fieldset>
    <?php
}

add_action('quick_edit_custom_box', 'sixei_add_quick_edit_video', 10, 2);

function sixei_video_save_quick_edit_data($post_id) {
    // verify if this is an auto save routine. If it is our form has not been submitted, so we dont want
    // to do anything
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
        return $post_id;
    // Check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id))
            return $post_id;
    } else {
        if (!current_user_can('edit_post', $post_id))
            return $post_id;
    }
    $post = get_post($post_id);
    // OK, we're authenticated: we need to find and save the data

    if (isset($_POST['sixei_video_youtube_link']) && ($post->post_type != 'revision')) {
        update_post_meta($post_id, 'sixei_video_youtube_link', $_POST['sixei_video_youtube_link']);
    } 
}

add_action('save_post', 'sixei_video_save_quick_edit_data');


function sixei_video_quick_edit_javascript() {
    global $current_screen;
    if (($current_screen->id != 'edit-sixei_video') || ($current_screen->post_type != 'sixei_video')) return; 
     
    ?>
    <script type="text/javascript">
    <!--
    function set_inline_display_set(youtube_link, nonce) {
        // revert Quick Edit menu so that it refreshes properly
        inlineEditPost.revert();
        var youtubeLinkInput = document.getElementById('sixei_video_youtube_link');
        var nonceInput = document.getElementById('sixei_video_display_set_noncename');
        nonceInput.value = nonce;
        // check option manually
        youtubeLinkInput.value = youtube_link;
    }
    //-->
    </script>
    <?php
}
add_action('admin_footer', 'sixei_video_quick_edit_javascript');
 
function sixei_video_expand_quick_edit_link($actions, $post) {
    $current_screen = get_current_screen();
    
    if ($current_screen != null && (($current_screen->id != 'edit-sixei_video') || ($current_screen->post_type != 'sixei_video'))) return $actions; 
    $nonce = wp_create_nonce( 'sixei_video_display_set'.$post->ID);
    $youtube_link = get_post_meta( $post->ID, 'sixei_video_youtube_link', TRUE); 
    
    $actions['inline hide-if-no-js'] = '<a href="#" class="editinline" title="';
    $actions['inline hide-if-no-js'] .= esc_attr( __( 'Chỉnh sửa nhanh' ) ) . '" ';
    $actions['inline hide-if-no-js'] .= " onclick=\"set_inline_display_set('{$youtube_link}', '{$nonce}')\">"; 
    $actions['inline hide-if-no-js'] .= __( 'Sửa&nbsp;nhanh' );
    $actions['inline hide-if-no-js'] .= '</a>';
    return $actions; 

}
add_filter('post_row_actions', 'sixei_video_expand_quick_edit_link', 10, 2);