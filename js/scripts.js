(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var $target = $(heading);
        var scrollDistance = $target.offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - scrollDistance) / 1, function() {
            $target.focus();
        });

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
            $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function() {
            $('.skip-link').focus();
        });
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var $nextSection = $('#lead').next();
        var scrollDistance = $nextSection.offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $nextSection.focus();
        });
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        var $container = $(this);
        var $userContent = $container.children('div');

        // Performance: Build the entire timeline structure off-DOM to minimize reflows and layout thrashing
        $userContent.each(function() {
            var $content = $(this);
            var date = $content.data('date');
            var dateHtml = date ? '<span class="vtimeline-date">' + date + '</span>' : '';
            var contentHtml = $content.addClass('vtimeline-content')[0].outerHTML;

            // Construct the full block as a single HTML structure
            var blockHtml =
                '<div class="vtimeline-point">' +
                    '<div class="vtimeline-icon"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                    '<div class="vtimeline-block">' +
                        dateHtml +
                        contentHtml +
                    '</div>' +
                '</div>';

            $content.replaceWith(blockHtml);
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
        $(this).attr('aria-expanded', 'true');
        $('#mobile-menu-close').focus();
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
        $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
    });

    // Close mobile menu on Escape key
    $(document).keyup(function(e) {
        if (e.keyCode === 27 && $('header').hasClass('active')) {
            $('header, body').removeClass('active');
            $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
        }
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
