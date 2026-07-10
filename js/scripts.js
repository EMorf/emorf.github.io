(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var isSticky = $('header').hasClass('sticky');
        var headerHeight = isSticky ? $('header').outerHeight() : 0;
        var scrollDistance = $(heading).offset().top - headerHeight;

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
        var isSticky = $('header').hasClass('sticky');
        var headerHeight = isSticky ? $('header').outerHeight() : 0;
        var scrollDistance = $('#lead').next().offset().top - headerHeight;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $('#lead').next().focus();
        });
    });

    // Sticky header and scroll-spy with requestAnimationFrame for performance
    var isScrolling = false;
    $(window).on('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    function updateNavigation() {
        var scrollPos = $(window).scrollTop();
        var headerHeight = $('header').outerHeight();
        var leadHeight = $('#lead').outerHeight();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();

        // Sticky header - activates after scrolling past the lead section
        if (scrollPos >= leadHeight) {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }

        // Scroll-spy logic
        var activeSet = false;

        // Check if we are at the bottom of the page
        if (scrollPos + windowHeight >= docHeight - 10) {
            $('#menu a').removeClass('active');
            $('#menu a').last().addClass('active');
            return;
        }

        $('#menu a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.length) {
                var elementTop = refElement.offset().top - headerHeight - 1;
                var elementBottom = elementTop + refElement.outerHeight();

                if (scrollPos >= elementTop && scrollPos < elementBottom) {
                    $('#menu a').removeClass('active');
                    currLink.addClass('active');
                    activeSet = true;
                } else {
                    currLink.removeClass('active');
                }
            }
        });
    }

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
