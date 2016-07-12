<ul>
    <?php
    $args = array(
        'post_status' => 'publish',
        'posts_per_page' => 3,
        'meta_key' => 'sixei_post_featured',
        'meta_value' => 1,
    );
    $featured_posts = get_posts($args);
    if ($featured_posts) {
        foreach ($featured_posts as $p) {
            ?> 
            <li><span><?php echo get_the_date('d.m.Y', $p); ?></span>
                <h3> <a href="<?php echo get_permalink($p->ID) ?>"><?php echo get_the_title($p); ?></a></h3>
            </li>
        <?php
        }
    }
    ?>
</ul>