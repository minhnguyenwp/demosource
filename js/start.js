(function($) {
    /**
     * START - ONLOAD - JS
     * 1. SHOW MENU MOBILE
     */
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */
    var sixEI_fn = {};
    /** 
     * 1. SHOW MENU MOBILE
     */
    sixEI_fn.menuMobile = {
        showMenu: function() {
            if (!$('.shw-mb')) {
                return;
            }

            $('.shw-mb').on('click', function(e) {
                var $a_show = $(this),
                        $menu = $a_show.siblings('.menu-mobile');

                if ($a_show.hasClass('active')) {
                    $a_show.removeClass('active');
                    $menu.fadeOut('500');
                } else {
                    $a_show.addClass('active');
                    $menu.fadeIn('500');
                }
            });

            // click out
            $(document).on('click', function(e) {
                if ($(e.target).is('.menu-mobile *') || $(e.target).is('.shw-mb *') || $(e.target).is('.shw-mb')) {
                    return;
                }
                $('.shw-mb').removeClass('active');
                $('.menu-mobile').fadeOut('500');
            });
        },
        closeMenu: function() {
            $('.cls-mb').on('click', function(e) {
                var $a_close = $(this),
                        $a_parent = $a_close.closest('.menu-mobile'),
                        $a_show = $a_parent.siblings('.shw-mb');

                $a_show.removeClass('active');
                $a_parent.fadeOut('500');
            });
        }
    }

    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function($) {
        sixEI_fn.menuMobile.showMenu();
        sixEI_fn.menuMobile.closeMenu();
    });
    /* OnLoad Window */
    var init = function() {
        loadItemPerPage("box-item", "load-more", 0, 6);
        loadItemPerPage("proj-item", "load-more", 0, 6);
    };
    window.onload = init;
})(jQuery);

var loadItemPerPage = function(list_class, load_more_id, offset, per_page) {
    var items = $("." + list_class);
    if(items.length <= 0) return;
    var loadmore = $("#" + load_more_id);
    var newOffset = offset + per_page;
    for (var i = offset; i < newOffset; i++) {
        items.eq(i).show();
    }
    if (items.length <= newOffset) {
        loadmore.hide();
    } else {
        loadmore.attr("onclick", "loadItemPerPage('" + list_class + "','" + load_more_id + "'," + newOffset + "," + per_page + ")");
    }
}