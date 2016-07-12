<!DOCTYPE html>
<!--[if IE 8]><html lang="en" class="no-js ie ie8"><![endif]-->
<!--[if IE 9]><html lang="en" class="no-js ie ie9"><![endif]-->
<!--[if gt IE 9]><!-->
<html lang="en" class="no-js">
    <!--<![endif]-->
    <head>
<meta name="google-site-verification" content="EFguCFmoz8BlYpQ8cueTGdHKCtRUwI37gantXwHpCKk" />
        <meta charset="<?php bloginfo('charset'); ?>">
        <title><?php wp_title('-', true, 'right'); ?></title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
        <link rel="shortcut icon" href="<?php echo SIXEI_ROOT_URI ?>/icons/favicon.ico" type="image/x-icon">
        <?php wp_head(); ?>
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,500,700,900" rel="stylesheet" type="text/css">
        <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-66933069-1', 'auto');
	  ga('send', 'pageview');
	
	</script>
    </head>
    <body class="body-css <?php if(is_home() || is_front_page()) echo 'home'; ?>"> 
        <header class="header-wrap">
            <section class="container">
                <section class="row">
                    <section class="col-xs-12">
                        <section class="header-right">
                            <section class="h-search">
                                <form id="frm-search" method="get" action="<?php echo site_url(); ?>">
                                    <input type="text" name="s" placeholder="<?php _e("Search...", "sixei") ?>" value="<?php echo get_search_query(); ?>" class="txt-search">
                                    <button type="submit" class="btn-submit"> <i class="fa fa-search"></i></button>
                                </form>
                            </section>
                            <!-- <section class="h-contact"><a href="<?php // site_url('lien-he') ?>">CONtact us</a></section> -->
                            <section class="h-lang">
                                <ul> 
                                    <?php    
                                        $current_url = WPGlobus_Utils::current_url();
                                        $en_url = WPGlobus_Utils::localize_url($current_url, "en");
                                        $vi_url = WPGlobus_Utils::localize_url($current_url, "vi");
                                        if(get_locale() == "en_US") {
                                            $active_en = "active";
                                            $active_vi = "";
                                        } else {
                                            $active_en = "";
                                            $active_vi = "active";
                                        }
                                     ?>
                                    <li class="en"><a href="<?php echo $en_url; ?>" title="English" class="lang-link <?php echo $active_en; ?>">EN</a></li>
                                    <li class="vn"><a href="<?php echo $vi_url ?>" title="Vietnam" class="lang-link <?php echo $active_vi; ?>">VIE</a></li>
                                </ul>
                            </section>
                        </section>
                        <!-- END : HEADER RIGHT-->
                    </section>
                </section>
            </section>
        </header>
        <!-- END : HEADER-->
        <section class="menu-logo">
            <div class="container">
                <section class="logo-wrap col-md-3 col-sm-3 col-xs-12">
                    <div class="logo">
                        <a href="<?php echo site_url() ?>">
                            <div class="lgo">
                                <img src="<?php echo SIXEI_ROOT_URI ?>/images/logo.png" alt="SIXEI">
                                <div class="lgo-slogan">
                                    <span class="logo-compn">SIXEI COMMUNITY</span>
                                    <span class="logo-slogan"><?php bloginfo('description') ?></span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
                <section class="mainmenu col-md-9 col-sm-9 col-xs-12">
                    <nav role="navigation" class="navbar navbar-default">
                        <div class="navbar-header">
                            <button type="button" data-toggle="collapse" data-target="#main-menu" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#" class="navbar-brand"></a>
                        </div>
                        <div id="main-menu" class="collapse navbar-collapse">
                            <?php
                            $primary_menu = wp_nav_menu(array('theme_location' => 'primary',
                                'container' => '',
                                'menu_class' => 'menu',
      				'echo' => false
                            ));
                            $primary_menu = str_replace('menu-item-has-children', 'dropdown', $primary_menu);
                            $primary_menu = str_replace('sub-menu', 'dropdown-menu', $primary_menu);
                            echo $primary_menu;
                            ?>  
                        </div>
                    </nav>
                </section><a href="javascript:;" class="shw-mb"><i class="fa fa-bars"></i></a>
                <section class="menu-mobile">
                    <div class="mn-inner"><a href="javascript:;" class="cls-mb"><i class="fa fa-times"></i></a>
                        <section class="mb-search">
                            <form id="frm-search" method="" action="">
                                <input type="text" placeholder="<?php _e("Search...", "sixei") ?>" class="txt-search">
                                <button type="submit" class="btn-submit"> <i class="fa fa-search"></i></button>
                            </form>
                        </section>
                        <section class="mb-menu">
                            <?php
                            wp_nav_menu(array('theme_location' => 'primary_mobile',
                                'container' => '',
                                'menu_class' => 'menu clearfix',
                                    //'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            ));
                            ?>  
                            <!--ul class="menu clearfix">
                              <li class="menu-item"><a href="#">home</a></li>
                              <li class="menu-item"><a href="#">FOR CUSTOMERS</a></li>
                              <li class="menu-item"><a href="#">FOR EVERYONE</a></li>
                              <li class="menu-item"><a href="#">ABOUT US</a></li>
                              <li class="menu-item"><a href="#">media</a></li>
                            </ul-->
                        </section>
                        <section class="mb-lang clearfix">
                            <ul> 
                                <li class="en"><a href="<?php echo $en_url; ?>" title="English" class="lang-link <?php echo $active_en; ?>">EN</a></li>
                                <li class="vn"><a href="<?php echo $vi_url; ?>" title="Vietnam" class="lang-link <?php echo $active_vi; ?>">VIE</a></li>
                            </ul>
                        </section>
                    </div>
                </section>
                <!-- END : MENU MOBILE-->
            </div>
        </section>
        <!-- END : MENU-->