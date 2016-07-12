<?php get_header(); ?>
<div class="main-content row">
    <div class="col-md-8">
        <!-- BLOCK: DU AN TIEU BIEU-->
        <div class="site-block">       
        				<div class="breadcrumb">
        				<?php 
        				if (function_exists('bread_crumb')) {
                				$home_label = '<i class="fa fa-home"></i> Trang chủ';
                    bread_crumb("type=list&home_label=$home_label&disp_current=true");
                }
                ?>
                </div>
            <h2 class="title"> <span>
                    <?php 
                        if(is_post_type_archive('du_an')){
                            echo "Dự án";
                        } else {
                            single_term_title();
                        }
                    ?>
                </span></h2>
            <div class="block-ct list-item">
                <?php
                if (have_posts()) {
                    while (have_posts()) {
                        the_post();
                        ?>
                <div class="proj-item"><a href="<?php echo the_permalink(); ?>">
                        <figure><?php the_post_thumbnail(); ?></figure>
                                <div class="proj-item-ct">
                                    <h3><?php the_title(); ?></h3>
                                    <div class="proj-desc">
                                        <?php
                                            if(get_post_type() == 'du_an'){
                                                echo get_post_meta(get_the_ID(), "novaland_duan_tom_tat", true); 
                                            } else {
                                                echo novaland_truncate(get_the_content(), 400);
                                            }
                                        ?>
                                    </div><span>Chi tiết</span>
                                </div></a></div>
                        <?php
                    }
                
                }
                
                ?>

            </div>
        </div>
        <div class="pagin-link">
            <?php if(function_exists('wp_pagenavi')) wp_pagenavi(); ?>
        </div>
    </div>
    <?php get_sidebar(''); ?>
</div>
<?php get_footer(); ?>