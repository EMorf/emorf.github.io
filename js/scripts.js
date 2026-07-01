(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Performance: Consolidate timeline creation into a single loop to reduce DOM manipulations
    $('#experience-timeline').each(function() {
        var $this = $(this);
        var $userContent = $this.children('div');

        $userContent.each(function() {
            var $content = $(this);
            var date = $content.data('date');

            // Add class and wrap in necessary containers
            $content.addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');

            // Get the newly created containers
            var $block = $content.parent();
            var $point = $block.parent();

            // Add icon to the point container
            $point.prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');

            // Add date to the block container if it exists
            if (date) {
                $block.prepend('<span class="vtimeline-date">' + date + '</span>');
            }
        });
    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
