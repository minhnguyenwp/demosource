<?php
/*
  sixei widget
 */

/* Bai viet widget */

class sixei_post_widget extends WP_Widget {

    function sixei_post_widget() {
        $widget_ops = array('classname' => 'sixei_post_widget', 'description' => 'Hiển thị bài viết theo tiêu xem nhiều hoặc nổi bật.');
        $this->WP_Widget('sixei_post_widget', 'Bài viết theo tiêu chí', $widget_ops);
    }

    function form($instance) {
        $instance = wp_parse_args((array) $instance, array('title' => '', 'numposts' => '3', 'type' => 'most_viewed'));
        $title = $instance['title'];
        $numposts = $instance['numposts'];
        $type = $instance['type'];
        ?>
        <p><label for="<?php echo $this->get_field_id('title'); ?>">Title: <input class="widefat sixei-post-by-type-title" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" /></label></p>
        <p><label for="<?php echo $this->get_field_id('numposts'); ?>">Number of posts: <input class="widefat sixei-post-by-type-numposts" id="<?php echo $this->get_field_id('numposts'); ?>" name="<?php echo $this->get_field_name('numposts'); ?>" type="text" value="<?php echo attribute_escape($numposts); ?>" /></label></p>
        <select name="<?php echo $this->get_field_name('type'); ?>" id="<?php echo $this->get_field_id('type'); ?>" class="widefat sixei-post-by-type-type" style="height: auto;">
            <option value="">--Tiêu chí--</option>
            <option value="most_viewed" <?php echo $type == "most_viewed" ? "selected" : "" ?>>Xem nhiều</option>
            <option value="featured" <?php echo $type == "featured" ? "selected" : "" ?>>Nổi bật</option>
        </select>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = $new_instance['title'];
        $instance['numposts'] = $new_instance['numposts'];
        $instance['type'] = $new_instance['type'];
        return $instance;
    }

    function widget($args, $instance) {
        extract($args, EXTR_SKIP);

        $title = empty($instance['title']) ? '' : $instance['title'];
        $numposts = !is_numeric($instance['numposts']) ? 4 : $instance['numposts'];
        $type = empty($instance['type']) ? 'new' : $instance['type'];
        // WIDGET CODE GOES HERE
        $post_args = array(
            'post_type' => array('post'),
            'post_status' => 'publish',
            'posts_per_page' => $numposts,
            'meta_key' => 'sixei_post_' . $type,
            'meta_value' => 1,
//            'orderby' => 'menu_order',
//            'order' => 'ASC'
        );
        $posts = get_posts($post_args);
        if (count($posts) > 0) {
            $i = 0;
            ?>
            <section class="mod-right mod-news">
                <h3><?php echo $title; ?></h3>
                <div class="mod-content">
                    <ul>
                        <?php
                        foreach ($posts as $post) {
                            $i++;
                            ?>
                            <li><span class="num"><?php echo $i; ?></span>
                                <h4> <a href="<?php echo get_permalink($post->ID) ?>"><?php echo sixei_translate($post->post_title); ?></a></h4>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </section>
            <?php
        }
    }

}

add_action('widgets_init', create_function('', 'return register_widget("sixei_post_widget");'));

class sixei_category_tree_widget extends WP_Widget {

    function sixei_category_tree_widget() {
        $widget_ops = array('classname' => 'sixei_category_tree_widget', 'description' => 'Hiển thị cây danh mục.');
        $this->WP_Widget('sixei_category_tree_widget', 'Cây danh mục', $widget_ops);
    }

    function form($instance) {
        $instance = wp_parse_args((array) $instance, array('title' => ''));
        $title = $instance['title'];
        ?>
        <p><label for="<?php echo $this->get_field_id('title'); ?>">Title: <input class="widefat sixei-category-tree-by-type-title" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" /></label></p>
        <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = $new_instance['title'];
        return $instance;
    }

    function widget($args, $instance) {
        extract($args, EXTR_SKIP);

        $title = empty($instance['title']) ? '' : $instance['title'];
        // WIDGET CODE GOES HERE
        if (is_category()) {
            $cat_id = get_query_var('cat');
            $top_parent_id = sixei_get_top_parent_category($cat_id);
            $top_cat = get_category($top_parent_id);
            $parent = get_category_parents($cat_id);
            $parent_arr = explode('/', trim($parent));
            ?>
            <section class="mod-right mod-menu">
                <h3><?php echo $top_cat->name ?></h3>
                <?php
                $children = get_categories(array('parent' => $top_parent_id, 'hide_empty' => false, 'orderby' => 'id', 'order' => 'ASC'));
                if (count($children) > 0) {
                    ?>
                    <ul class="menu">
                        <?php
                        foreach ($children as $child) {
                            if (in_array($child->name, $parent_arr)) {
                                $active_class = "active";
                            } else {
                                $active_class = "";
                            }
                            $grandchildren = get_categories(array('parent' => $child->term_id, 'hide_empty' => false, 'orderby' => 'id', 'order' => 'ASC'));
                            if (count($grandchildren) > 0 && in_array($child->name, $parent_arr)) {
                                ?>
                                <li class="has-child <?php echo $active_class ?>"><a href="javascript:void(0)"><?php echo $child->name ?></a>
                                    <ul class="menu-child">
                                        <?php
                                        foreach ($grandchildren as $grandchild) {
                                            if (in_array($grandchild->name, $parent_arr)) {
                                                $active_class_child = "active";
                                            } else {
                                                $active_class_child = "";
                                            }
                                            ?>
                                            <li class="<?php echo $active_class_child; ?>"><a href="<?php echo get_category_link($grandchild->term_id); ?>"><?php echo $grandchild->name; ?></a></li>
                                        <?php } ?>
                                    </ul>
                                </li>
                            <?php } else {
                                ?>
                                <li class="<?php echo $active_class ?>"><a href="<?php echo get_category_link($child->term_id); ?>"><?php echo $child->name; ?></a></li>
                            <?php }
                            ?>
                        <?php } 
                        $this->show_posts_in_cat($top_parent_id);
                        ?>
                    </ul>
                <?php } ?>
            </section>
            <?php
        }
        if (is_single()) {
            $cats = get_the_category();
            $top_parent_id = sixei_get_top_parent_category($cats[0]->term_id);
            $top_cat = get_category($top_parent_id);
            ?>
            <section class="mod-right mod-menu">
                <h3><?php echo $top_cat->name ?></h3>
                <?php
                $children = get_categories(array('parent' => $top_cat->term_id, 'hide_empty' => false, 'orderby' => 'id', 'order' => 'ASC'));
                if (count($children) > 0) {
                    ?>
                    <ul class="menu">
                        <?php
                        foreach ($children as $child) {
                            if ($child->term_id == $cats[0]->term_id) {
                                $active_class = "active";
                            } else {
                                $active_class = "";
                            }
                            ?>
                            <?php if ($child->slug == "tin-tuc-cong-ty") { ?>
                                <li class="has-child <?php echo $active_class ?>"><a href="<?php echo get_category_link($child->term_id) ?>"><?php echo $child->name ?></a>
                                <?php } else { ?>
                                <li class="has-child <?php echo $active_class ?>"><a href="<?php echo get_category_link($child->term_id) ?>"><?php echo $child->name ?></a>
                                    <?php if ($active_class == "active") { ?>
                                        <ul class="menu-child">
                                            <?php $this->show_posts_in_cat($child->term_id) ?>
                                        </ul>
                                    <?php } ?>
                                </li>
                                <?php
                            }
                        }
                        $this->show_posts_in_cat($top_cat->term_id);
                        ?>
                    </ul>
                    <?php
                } else {
                    ?>
                    <ul class="menu">
                        <?php $this->show_posts_in_cat($cats[0]->term_id); ?>
                    </ul>
                    <?php
                }
            }
        }

        function show_posts_in_cat($cat_id) {
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => -1,
                //'category' => $cat_id, //include children cat
                'category__in' => $cat_id,
                'order_by' => 'id',
                'order' => 'ASC'
            );
            $cur_post_id = get_the_ID();
            $posts = get_posts($args);
            

            if (!empty($posts)) {
                foreach ($posts as $p) {
                    if ($p->ID == $cur_post_id) {
                        $active_class = "active";
                    } else {
                        $active_class = "";
                    }
                    ?>
                    <li class="<?php echo $active_class ?>"><a href="<?php echo get_permalink($p->ID); ?>"><?php echo sixei_translate($p->post_title); ?></a></li>
                <?php } ?>

                <?php
            }
        }

    }

    add_action('widgets_init', create_function('', 'return register_widget("sixei_category_tree_widget");'));

  /*  class sixei_contact_block_widget extends WP_Widget {

        function sixei_contact_block_widget() {
            $widget_ops = array('classname' => 'sixei_contact_block_widget', 'description' => 'Hiển thị contact block.');
            $this->WP_Widget('sixei_contact_block_widget', 'Contact block', $widget_ops);
        }

        function form($instance) {
            $instance = wp_parse_args((array) $instance, array('title' => ''));
            $title = $instance['title'];
            ?>
            <p><label for="<?php echo $this->get_field_id('title'); ?>">Title: <input class="widefat sixei-contact-block-title" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" /></label></p>
            <?php
        }

        function update($new_instance, $old_instance) {
            $instance = $old_instance;
            $instance['title'] = $new_instance['title'];
            return $instance;
        }

        function widget($args, $instance) {
            extract($args, EXTR_SKIP);

            $title = empty($instance['title']) ? '' : $instance['title'];
            ?>
            <section class="mod-right mod-contact">
                <h3><?php echo $title; ?></h3>
                <div class="mod-content">
                    <p><span>+84 </span>935 817 429</p>
                    <p><span>+84 </span>927 252 268</p><br>
                    <p><em>EMAIL</em><a href="#">watersixei@thesixei.com</a></p><br>
                    <p><em class="flw"><?php _e('FOLLOW US', 'sixei'); ?></em><a href="#" class="facebook blk-social"><i class="fa fa-facebook-square"></i></a><a href="#" class="google-plus blk-social"><i class="fa fa-google-plus-square"> </i></a><a href="#" class="linkedin blk-social"><i class="fa fa-linkedin-square"> </i></a></p>
                </div>
            </section>
            <?php
        }

    }

    add_action('widgets_init', create_function('', 'return register_widget("sixei_contact_block_widget");'));*/