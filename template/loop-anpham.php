<div class="news-page">
<?php
//$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
    'post_type' => 'sixei_anpham',
    'posts_per_page' => -1,
);
$posts = new WP_Query($args);
if ($posts->have_posts()) {
    while ($posts->have_posts()) {
        $posts->the_post();
        if (get_locale() == "en_US") {
            $pdf_link = get_post_meta($post->ID, "sixei_anpham_pdf_link_en", true);
        } else {
            $pdf_link = get_post_meta($post->ID, "sixei_anpham_pdf_link", true);
        }
        ?>
        <div style="display: none;" class="proj-item"><a href="<?php echo $pdf_link; ?>">
                <figure><?php the_post_thumbnail(); ?></figure>
                <div class="proj-item-ct">
                    <h3><?php the_title(); ?></h3>
                    <div class="proj-desc">
                        <?php echo sixei_truncate(sixei_translate(get_the_content()), 300); ?>
                    </div><span><?php _e("View this file", "sixei") ?></span>
                </div></a></div>
        <?php
    }
    wp_reset_postdata();
    ?>
    <section class="col-xs-12 loading-mask"><a id="load-more" href="javascript:void(0);"><?php _e('load more', 'sixei') ?></a></section>
    <?php
} ?>
</div>