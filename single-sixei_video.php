<?php
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
                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                        <h2 class="main-ttl"><?php the_title(); ?></h2>
                        <section class="main-ct article-ct">
                            <div class="video-embed">
                                <?php 
                                    $youtube_link = get_post_meta(get_the_ID(), 'sixei_video_youtube_link', TRUE);
                                    $youtube_id = sixei_get_id_from_youtube_link($youtube_link);
                                ?>
                                <iframe width="600" src="https://www.youtube.com/embed/<?php echo $youtube_id ?>" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <?php the_content() ?>
                            <!-- END : ITEM-->
                        </section>
                    <?php endwhile;
                endif;
                ?>
            </section>
            <!-- END : MAIN LEFT-->
<?php get_sidebar(''); ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>