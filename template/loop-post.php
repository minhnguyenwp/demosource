<?php

//$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

if (have_posts()) {
    while (have_posts()) {
        the_post();

        ?>
        <div style="display: none;" class="proj-item"><a href="<?php the_permalink() ?>">
                                    <figure><?php the_post_thumbnail(); ?></figure>
                                    <div class="proj-item-ct">
                                        <h3><?php the_title(); ?></h3>
                                        <div class="proj-desc">
                                            <?php  echo sixei_truncate(sixei_translate(get_the_content()), 300); ?>
                                        </div><span><?php _e("View detail", "sixei") ?></span>
                                    </div></a></div>
        <?php

    }
    //wp_reset_postdata();
    ?>
    <section class="col-xs-12 loading-mask"><a id="load-more" href="javascript:void(0);"><?php _e('load more', 'sixei') ?></a></section>
    <?php
}