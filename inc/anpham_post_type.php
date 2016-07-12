<?php

add_action('init', 'sixei_anpham_init');

function sixei_anpham_init() {
    $labels = array(
        'name' => _x('Ấn phẩm', 'post type general name'),
        'singular_name' => _x('Ấn phẩm', 'post type singular name'),
        'add_new' => _x('Thêm ấn phẩm', 'recipes'),
        'add_new_item' => __('Thêm ấn phẩm'),
        'edit_item' => __('Cập nhật ấn phẩm'),
        'new_item' => __('Thêm ấn phẩm'),
        'view_item' => __('Xem ấn phẩm'),
        'search_items' => __('Tìm kiếm ấn phẩm'),
        'not_found' => __('Không tìm thấy ấn phẩm'),
        'not_found_in_trash' => __('Không có ấn phẩm nào trong trash'),
        'parent_item_colon' => ''
    );

    $supports = array('title', 'editor', 'author', 'comments');
    register_post_type('sixei_anpham', array(
        "labels" => $labels,
        "public" => true,
        "publicly_queryable" => false,
        "rewrite" => false,
        "show_ui" => true,
        "capability_type" => "post",
        "hierarchical" => false,
        "supports" => array("title", "editor", "thumbnail"),
        'taxonomies' => array('category'),
            )
    );
}

if (class_exists('RW_Meta_Box')) {
    add_filter('rwmb_meta_boxes', 'sixei_anpham_meta_boxes');
}

function sixei_anpham_meta_boxes($meta_boxes) {
    /**
     * prefix of meta keys (optional)
     * Use underscore (_) at the beginning to make keys hidden
     * Alt.: You also can make prefix empty to disable it
     */
    // Better has an underscore as last sign
    $prefix = 'sixei_anpham_';
    // 1st meta box
    $meta_boxes[] = array(
        'title' => __('File', 'sixei'),
        'post_types' => array('sixei_anpham'),
        'fields' => array(
            array(
                'name' => __('Pdf Link', 'sixei'),
                'id' => "{$prefix}pdf_link",
                'type' => 'file_input',
                'max_file_uploads' => 1,
                'mime_type' => 'pdf',
            ),
            array(
                'name' => __('Pdf Link English', 'sixei'),
                'id' => "{$prefix}pdf_link_en",
                'type' => 'file_input',
                'max_file_uploads' => 1,
                'mime_type' => 'pdf',
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

function sixei_anpham_table_head($columns) {
    $columns['pdf_link'] = 'PDF Link';
    $columns['pdf_link_en'] = 'PDF Link English';
    return $columns;
}

add_filter('manage_sixei_anpham_posts_columns', 'sixei_anpham_table_head');

function sixei_anpham_table_content($column_name, $post_id) {
    $prefix = 'sixei_anpham_';
    if ($column_name == 'pdf_link') {
        echo get_post_meta($post_id, $prefix . 'pdf_link', true);
    }
    if ($column_name == 'pdf_link_en') {
        echo get_post_meta($post_id, $prefix . 'pdf_link_en', true);
    }
}

add_action('manage_sixei_anpham_posts_custom_column', 'sixei_anpham_table_content', 10, 2);