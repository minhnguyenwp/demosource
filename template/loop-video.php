<?php

//$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
    'post_type' => 'sixei_video',
    'posts_per_page' => -1
    //'paged' => $paged
);
$posts = new WP_Query($args);
if ($posts->have_posts()) {
    $i = 0;
    ?>
    <?php

    while ($posts->have_posts()) {
        $posts->the_post();
        $i++;
        if($i%2 == 0){
            $color = "b-green";
        } else {
            $color = "b-blue";
        }
        $youtube_link = get_post_meta(get_the_ID(), 'sixei_video_youtube_link', TRUE);
        $youtube_id = sixei_get_id_from_youtube_link($youtube_link);
        ?>
        <section style="display: none;" class="col-md-4 col-sm-6 col-xs-12 box-item <?php echo $color; ?>">
            <figure class="box-img"><a title="<?php the_title() ?>" target="_blank" href="<?php the_permalink() ?>"><img src="http://img.youtube.com/vi/<?php echo $youtube_id; ?>/sddefault.jpg" alt=""><span class="sh-down"></span></a></figure>
            <section class="box-content">
                <h3> <a target="_blank" title="<?php the_title() ?>" href="<?php the_permalink() ?>"><?php echo sixei_truncate(get_the_title()); ?></a></h3><a target="_blank" href="<?php the_permalink(); ?>" class="watch-video"><i class="fa fa-long-arrow-right"></i><?php _e('watch the video', 'sixei'); ?></a>
            </section>
        </section>
        <?php

    }
    wp_reset_postdata();
    ?>
    <section class="col-xs-12 loading-mask"><a id="load-more" href="javascript:void(0);"><?php _e('load more', 'sixei') ?></a></section>
    <?php
}