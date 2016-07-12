<?php
if (class_exists('RW_Meta_Box')) {
    add_filter('rwmb_meta_boxes', 'sixei_post_meta_boxes');
}

function sixei_post_meta_boxes($meta_boxes) {
    /**
     * prefix of meta keys (optional)
     * Use underscore (_) at the beginning to make keys hidden
     * Alt.: You also can make prefix empty to disable it
     */
    // Better has an underscore as last sign
    $prefix = 'sixei_post_';
    // 1st meta box
    $meta_boxes[] = array(
        // Meta box id, UNIQUE per meta box. Optional since 4.1.5
        'id' => 'display',
        // Meta box title - Will appear at the drag and drop handle bar. Required.
        'title' => __('Hiển thị', 'sixei'),
        // Post types, accept custom post types as well - DEFAULT is 'post'. Can be array (multiple post types) or string (1 post type). Optional.
        'post_types' => array('post'),
        // Where the meta box appear: normal (default), advanced, side. Optional.
        'context' => 'side',
        // Order of meta box: high (default), low. Optional.
        'priority' => 'high',
        // Auto save: true, false (default). Optional.
        'autosave' => true,
        // List of meta fields
        'fields' => array(
            // CHECKBOX
            array(
                'name' => __('Nổi bật', 'novaland'),
                'id' => "{$prefix}featured",
                'type' => 'checkbox',
                // Value can be 0 or 1
                'std' => 0,
            ),
            array(
                'name' => __('Xem nhiều', 'novaland'),
                'id' => "{$prefix}most_viewed",
                'type' => 'checkbox',
                // Value can be 0 or 1
                'std' => 0,
            ),
        ),
    );
    return $meta_boxes;
}

function sixei_post_table_head($columns) {
    $columns['display_in'] = 'Hiển thị';
//    $columns['title_en'] = 'Title';
    return $columns;
}

add_filter('manage_post_posts_columns', 'sixei_post_table_head');

function sixei_post_table_content($column_name, $post_id) {
    $prefix = 'sixei_post_';
    if ($column_name == 'display_in') {

        $show = array();
        if (get_post_meta($post_id, $prefix . 'featured', true) == 1) {
            $show[] = 'Nổi bật';
        }
        if (get_post_meta($post_id, $prefix . 'most_viewed', true) == 1) {
            $show[] = 'Xem nhiều';
        }
        echo implode(', ', $show);
    }
//    if ($column_name == 'title_en') {
//        echo get_post_meta($post_id, $prefix . 'title_en', true);
//    }
}

add_action('manage_post_posts_custom_column', 'sixei_post_table_content', 10, 2);

function sixei_add_quick_edit_post($column_name, $post_type) {
    if ($column_name != 'display_in' || $post_type != 'post')
        return;
    ?>
    <fieldset class="inline-edit-col-left">
        <div class="inline-edit-col">
            <span class="title">Hiển thị</span></br>
            <input type="hidden" name="sixei_post_display_set_noncename" id="sixei_post_display_set_noncename" value="" />
            <input type="checkbox" name="sixei_post_featured" value="1" id="sixei_post_featured" /> Nổi bật </br>
            <input type="checkbox" name="sixei_post_most_viewed" value="1" id="sixei_post_most_viewed" /> Xem nhiều </br>
        </div>
    </fieldset>
    <!--fieldset class="inline-edit-col-left">
        <div class="inline-edit-col">
            <span class="title">Title</span>
            <span class="input-text-wrap">
                <input type="text" name="sixei_post_title_en" id="sixei_post_title_en" value="" />
            </span>
        </div>
    </fieldset-->
    <?php
}

add_action('quick_edit_custom_box', 'sixei_add_quick_edit_post', 10, 2);

function sixei_post_save_quick_edit_data($post_id) {
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
    if (isset($_POST['sixei_post_featured']) && ($post->post_type != 'revision')) {
        update_post_meta($post_id, 'sixei_post_featured', 1);
    } else {
        update_post_meta($post_id, 'sixei_post_featured', 0);
    }

    if (isset($_POST['sixei_post_most_viewed']) && ($post->post_type != 'revision')) {
        update_post_meta($post_id, 'sixei_post_most_viewed', 1);
    } else {
        update_post_meta($post_id, 'sixei_post_most_viewed', 0);
    }

//    if (isset($_POST['sixei_post_title_en']) && ($post->post_type != 'revision')) {
//        update_post_meta($post_id, 'sixei_post_title_en', $_POST['sixei_post_title_en']);
//    }
}

add_action('save_post', 'sixei_post_save_quick_edit_data');

function sixei_post_quick_edit_javascript() {
    global $current_screen;
    if (($current_screen->id != 'edit-post') || ($current_screen->post_type != 'post'))
        return;
    ?>
    <script type="text/javascript">
    <!--
        function set_inline_display_set(featured, most_view, nonce) {
            // revert Quick Edit menu so that it refreshes properly
            inlineEditPost.revert();
            var featuredInput = document.getElementById('sixei_post_featured');
            var mostViewInput = document.getElementById('sixei_post_most_viewed');
            var nonceInput = document.getElementById('sixei_post_display_set_noncename');
            nonceInput.value = nonce;
            // check option manually
            if (featured == 1)
                featuredInput.checked = true;
            else
                featuredInput.checked = false;
            if (most_view == 1)
                mostViewInput.checked = true;
            else
                mostViewInput.checked = false;
 
        }
    //-->
    </script>
    <?php
}

add_action('admin_footer', 'sixei_post_quick_edit_javascript');

function sixei_post_expand_quick_edit_link($actions, $post) {
    $current_screen = get_current_screen();

    if ($current_screen != null && (($current_screen->id != 'edit-post') || ($current_screen->post_type != 'post')))
        return $actions;
    $nonce = wp_create_nonce('sixei_post_display_set' . $post->ID);
    $featured = get_post_meta($post->ID, 'sixei_post_featured', TRUE) ? get_post_meta($post->ID, 'sixei_post_featured', TRUE) : 0;
    $most_view = get_post_meta($post->ID, 'sixei_post_most_viewed', TRUE) ? get_post_meta($post->ID, 'sixei_post_most_viewed', TRUE) : 0;
    $actions['inline hide-if-no-js'] = '<a href="#" class="editinline" title="';
    $actions['inline hide-if-no-js'] .= esc_attr(__('Chỉnh sửa nhanh')) . '" ';
    $actions['inline hide-if-no-js'] .= " onclick=\"set_inline_display_set({$featured}, {$most_view}, '{$nonce}')\">";
    $actions['inline hide-if-no-js'] .= __('Sửa&nbsp;nhanh');
    $actions['inline hide-if-no-js'] .= '</a>';
    return $actions;
}

add_filter('post_row_actions', 'sixei_post_expand_quick_edit_link', 10, 2);