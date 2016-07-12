<?php get_header(); ?>
<section class="main"> 
    <div class="container">      
        <div class="row">
            <div class="breadcrumb">
                <?php
                if (function_exists('bread_crumb')) {
                    $home_label = '<i class="fa fa-home"></i> Trang chủ';
                    bread_crumb("type=list&home_label=$home_label&disp_current=true");
                }
                ?>
            </div>
            <section class="col-md-9 col-sm-8 col-xs-12 main-left">
                <div class="page-404">
                    <h2>Trang này không tồn tại !</h2>
                    <p>Vui lòng quay lại <a href="<?php echo site_url() ?>">trang chủ</a></p>
                </div>
            </section>
            <!-- END : MAIN LEFT-->
            <?php get_sidebar(); ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>