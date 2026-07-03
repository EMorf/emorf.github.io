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
            $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
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
            $content.parent().before('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
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
