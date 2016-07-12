<?php get_header(); ?>
<section class="main-slider">
    <div class="container">
        <div class="row">
            <section class="col-md-3 col-sm-3 col-xs-12 slider-left">
                <?php get_template_part("template/featured"); ?>
            </section>
            <section class="col-md-9 col-sm-9 col-xs-12 slider-right">
                <?php echo do_shortcode("[sixei_homeslides]") ?>
            </section>
        </div>
    </div>
</section>
<!-- END : SLIDER-->
<section class="mb-news">
    <div class="container">
        <?php get_template_part("template/featured"); ?>
        <?php 
            $news_cat = get_category_by_slug('tin-tuc-cong-ty');
        ?>
        <a href="<?php echo get_category_link($news_cat) ?>" class="btn-more"> <i class="fa fa-long-arrow-right"></i><?php _e('read all news','sixei') ?></a>
    </div>
</section>
<!-- END : NEWS-->
<section class="main"> 
    <div class="container">      
        <div class="row">
            <section class="col-md-9 col-sm-8 col-xs-12 main-left">
                <h2 class="main-ttl"><?php _e('TECHNOLOGY IN A NUTSHELL','sixei') ?></h2>
                <section class="main-ct">
                    <div class="row">
                        <?php get_template_part('template/loop', 'video') ?> 
                        <!-- END : ITEM-->
                        
                    </div>
                </section>
            </section>
            <!-- END : MAIN LEFT-->
            <?php get_sidebar(); ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>