(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var headerHeight = $('header').outerHeight();
        var isSticky = $('header').hasClass('sticky');
        var scrollDistance = $(heading).offset().top;

        // If the header is already sticky, or if scrolling to the section will make it sticky,
        // we need to offset the scroll distance by the header height.
        if (isSticky || scrollDistance > $('#lead').outerHeight()) {
            scrollDistance -= headerHeight;
        }

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1, function() {
            $(heading).focus();
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
        var headerHeight = $('header').outerHeight();

        // Account for header height as scrolling from #lead to the next section
        // will likely trigger the sticky header.
        scrollDistance -= headerHeight;

        $('html, body').animate({
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

    // Sticky header and scroll-spy logic
    var $header = $('header');
    var $menuLinks = $('#menu a');
    var $sections = $('#about, #experience, #education, #projects, #skills');
    var leadHeight = $('#lead').outerHeight();

    $(window).on('scroll', function() {
        window.requestAnimationFrame(function() {
            var scrollPos = $(window).scrollTop();
            var headerHeight = $header.outerHeight();

            // Toggle sticky header
            if (scrollPos > leadHeight) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }

            // Scroll-spy logic
            var currentSectionId = '';

            // Check if at the bottom of the page
            if (scrollPos + $(window).height() >= $(document).height() - 10) {
                currentSectionId = $sections.last().attr('id');
            } else {
                $sections.each(function() {
                    var $this = $(this);
                    // If header is sticky, we must account for its height in the trigger point
                    var offset = $header.hasClass('sticky') ? headerHeight : 0;
                    var sectionTop = $this.offset().top - offset - 10;
                    if (scrollPos >= sectionTop) {
                        currentSectionId = $this.attr('id');
                    }
                });
            }

            if (currentSectionId) {
                $menuLinks.removeClass('active');
                $('#menu a[href="#' + currentSectionId + '"]').addClass('active');
            } else if (scrollPos < leadHeight) {
                $menuLinks.removeClass('active');
            }
        });
    });

})(jQuery);
