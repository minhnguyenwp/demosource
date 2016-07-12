<footer class="footer-wrap">
    <div class="container">
        <section class="bottom-menu">
            <?php
            wp_nav_menu(array('theme_location' => 'footer',
                'container' => '',
                'menu_class' => '',                    
            ));
            ?>             
        </section>
        <section class="copyright">
            <span>© 2015 Sixei Engineering. All rights reserved.</span>
            Follow us on
            <a href="https://www.facebook.com/pages/VietNam-Water-and-Wastewater-Engineering-Community/1614836025435417?ref=aymt_homepage_panel" class="facebook blk-social"><i class="fa fa-facebook-square"></i></a>
            <a href="#" class="google-plus blk-social"><i class="fa fa-google-plus-square"> </i></a>
            <a href="https://www.linkedin.com/company/sixei-environmental-engineering-ltd." class="linkedin blk-social"><i class="fa fa-linkedin-square"> </i></a>
            <a href="https://www.youtube.com/channel/UCziYYNzDYiEYweKuepr5PHQ" class="youtube blk-social"><i class="fa fa-youtube-square"> </i></a>
        </section>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>