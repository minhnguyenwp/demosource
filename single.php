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
                            <?php the_content() ?>
                            <!-- END : ITEM-->
                        </section>
                    <?php endwhile;
                endif;
                ?>
            </section>
            <!-- END : MAIN LEFT-->
<?php get_sidebar('category'); ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>