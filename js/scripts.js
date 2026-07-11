(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Performance: Cache common jQuery selectors to avoid repeated DOM lookups
    var $root = $('html, body');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var $target = $(heading);
        if (!$target.length) return;

        var scrollDistance = $target.offset().top;

        $root.animate({
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
        $root.animate({
            scrollTop: 0
        }, 500, function() {
            $('.skip-link').focus();
        });
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var $leadNext = $('#lead').next();
        var scrollDistance = $leadNext.offset().top;
        $root.animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $leadNext.focus();
        });
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        var $container = $(this);
        var $userContent = $container.children('div');
        var timelineHtml = '';

        // Performance: Build the entire timeline HTML off-DOM and perform a single injection
        // to significantly reduce layout thrashing and reflows.
        $userContent.each(function() {
            var $content = $(this);
            var date = $content.data('date');
            var dateHtml = date ? '<span class="vtimeline-date">' + date + '</span>' : '';

            timelineHtml +=
                '<div class="vtimeline-point">' +
                    '<div class="vtimeline-icon"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                    '<div class="vtimeline-block">' +
                        dateHtml +
                        $content.addClass('vtimeline-content').prop('outerHTML') +
                    '</div>' +
                '</div>';
        });

        $container.html(timelineHtml);
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
