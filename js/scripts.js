(function($) {

    // Performance: Cache frequently used selectors to reduce DOM traversals
    var $window = $(window);
    var $htmlBody = $('html, body');
    var $header = $('header');

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $header.find('a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var $target = $(heading);
        var scrollDistance = $target.offset().top;

        // Performance: Use .stop() to prevent animation queue buildup during rapid clicks.
        // Also cap duration to 800ms for better perceived performance.
        $htmlBody.stop().animate({
            scrollTop: scrollDistance + 'px'
        }, Math.min(Math.abs($window.scrollTop() - scrollDistance), 800), function() {
            $target.focus();
        });

        // Hide the menu once clicked if mobile
        if ($header.hasClass('active')) {
            $header.removeClass('active');
            $('body').removeClass('active');
            $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $htmlBody.stop().animate({
            scrollTop: 0
        }, 500, function() {
            $('.skip-link').focus();
        });
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var $nextSection = $('#lead').next();
        var scrollDistance = $nextSection.offset().top;
        $htmlBody.stop().animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $nextSection.focus();
        });
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        var $this = $(this); // Store reference to this
        var $userContent = $this.children('div'); // user content

        // Performance: Create each timeline block in a single pass to reduce DOM traversals and layout thrashing
        $userContent.each(function() {
            var $content = $(this).addClass('vtimeline-content');
            var date = $content.data('date');
            var dateHtml = date ? '<span class="vtimeline-date">' + date + '</span>' : '';

            // Wrap the content and add the icon and date in one pass
            $content.wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
            $content.before(dateHtml);
            $content.parent().before('<div class="vtimeline-icon"><i class="fa fa-map-marker" aria-hidden="true"></i></div>');
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
