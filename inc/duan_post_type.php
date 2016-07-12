<?php

add_action('init', 'sixei_duan_init');

function sixei_duan_init() {
    $labels = array(
        'name' => _x('Dự án', 'post type general name'),
        'singular_name' => _x('Dự án', 'post type singular name'),
        'add_new' => _x('Thêm dự án', 'recipes'),
        'add_new_item' => __('Thêm dự án'),
        'edit_item' => __('Cập nhật dự án'),
        'new_item' => __('Thêm dự án'),
        'view_item' => __('Xem dự án'),
        'search_items' => __('Tìm kiếm dự án'),
        'not_found' => __('Không tìm thấy dự án'),
        'not_found_in_trash' => __('Không có dự án nào trong trash'),
        'parent_item_colon' => ''
    );


    register_post_type('sixei_duan', array(
        "labels" => $labels,
        "public" => true,
        "publicly_queryable" => false,
        "rewrite" => false,
        "show_ui" => true,
        "capability_type" => "post",
        "hierarchical" => false,
        "supports" => array("title", "editor"),
        'taxonomies' => array('category'),
            )
    );
}