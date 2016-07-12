<?php
$cat_id = get_query_var('cat');
$current_cat = get_category($cat_id);
$top_parent_id = sixei_get_top_parent_category($cat_id);
$top_cat = get_category($top_parent_id);
$last_child = sixei_get_bottom_last_child_category($cat_id);
if ($top_cat->slug == 'khach-hang' || $top_cat->slug == 'thu-vien-truyen-thong') {
    if ($cat_id != $last_child) {
        wp_redirect(get_category_link($last_child));
    }
} else {
    $last_child = sixei_get_bottom_last_child_category($cat_id);
    $first_post = sixei_get_first_post_in_category($last_child);
    wp_redirect(get_permalink($first_post->ID));
}
get_header();
?>
<section class="main"> 
    <div class="container">      
        <div class="row">
            <div class="breadcrumb">
                <?php
                if (function_exists('bread_crumb')) {
                    $home_label = get_locale()=='en_US'?'<i class="fa fa-home"></i> Home':'<i class="fa fa-home"></i> Trang chủ';
                    bread_crumb("type=list&home_label=$home_label&disp_current=true");
                }
                ?>
            </div>
            <section class="col-md-9 col-sm-8 col-xs-12 main-left">
                <h2 class="main-ttl"><?php single_term_title(); ?></h2>
                <section class="main-ct">
                    <div class="cat-desc"><?php echo category_description(); ?></div>
                    <div class="cat-content">
                        <?php
                        if ($top_cat->slug == 'khach-hang' || $current_cat->slug == 'hinh-anh') {
                            $args = array(
                                'post_type' => 'sixei_duan',
                                'posts_per_page' => -1,
                                'category' => $cat_id
                            );
                            $posts = get_posts($args);
                            if (count($posts) > 0) {
                                foreach ($posts as $post) {
                                    ?>
                                    <div class="duan-title" id="duan-title-<?php echo $post->ID ?>">
                                        <?php echo sixei_translate($post->post_title) ?>
                                        <i class="fa fa-angle-down"></i>
                                    </div>
                                    <div class="duan-content" id="duan-content-<?php echo $post->ID ?>"><?php echo apply_filters( 'the_content', sixei_translate($post->post_content)) ?></div>
                                    <?php
                                }
                                ?>
                                <script type="text/javascript">
                                    $(document).ready(function() {
                                        $(".duan-content").hide();
                                        $(".duan-title").on("click", function(e) {
											e.preventDefault();
                                            var id = $(this).attr('id').replace('duan-title-', ''),
                                                $icon   =   $(this).find('.fa');
                                            if ($('#duan-content-' + id).css("display") == 'none') {
                                                $(".duan-content").hide();
                                                $('#duan-content-' + id).slideDown('500');
                                                $icon.addClass('fa-angle-up');
                                                $icon.removeClass('fa-angle-down');
                                            } else {
                                                $('#duan-content-' + id).slideUp('500');;
                                                $icon.addClass('fa-angle-down');
                                                $icon.removeClass('fa-angle-up');
                                            }
                                        })
                                    });
                                </script>
                                <?php
                            }
                        }
                        if ($current_cat->slug == 'video') {
                            get_template_part('template/loop', 'video');
                        }
                        if ($current_cat->slug == 'an-pham') {
                            get_template_part('template/loop', 'anpham');
                        }
                        ?>
                        <!-- END : ITEM-->
                    </div>
                </section>
            </section>
            <!-- END : MAIN LEFT-->
            <?php get_sidebar('category'); ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>