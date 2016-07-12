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
                <h2 class="main-ttl"><?php single_term_title(); ?></h2>
                <section class="main-ct news-page">
                    <div class="cat-desc"><?php echo category_description(); ?></div>
                    <div class="row">
                        <?php
                            get_template_part('template/loop', 'post');
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