(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');

        // Calculate header height - use 0 if header is not yet sticky and won't be (unlikely in this design)
        // or if it's already sticky.
        // Actually, if we are scrolling from top, it WILL become sticky.
        var header = $('header');
        var headerHeight = header.outerHeight();
        var scrollDistance = $(heading).offset().top - headerHeight;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs($(window).scrollTop() - scrollDistance) / 1.5, function() {
            var $target = $(heading);
            if ($target.length) {
                $target[0].focus({
                    preventScroll: true
                });
            }
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
        var headerHeight = $('header').outerHeight();
        var $target = $('#lead').next();
        var scrollDistance = $target.offset().top - headerHeight;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            if ($target.length) {
                $target[0].focus({
                    preventScroll: true
                });
            }
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

    // Scroll-spy and Sticky Header
    var ticking = false;
    $(window).on('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateNav() {
        var scrollPos = $(window).scrollTop();
        var header = $('header');
        var leadHeight = $('#lead').outerHeight();
        var headerHeight = header.outerHeight();

        // Sticky Header toggling
        if (scrollPos >= leadHeight) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }

        // Scroll-spy highlighting
        var menuLinks = $('#menu a');
        var fromTop = scrollPos + headerHeight + 15;

        var cur = menuLinks.map(function() {
            var section = $($(this).attr('href'));
            if (section.length && section.offset().top <= fromTop) {
                return section;
            }
        });

        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        // Force active the last link if at the very bottom
        if (Math.ceil(scrollPos + $(window).height()) >= $(document).height()) {
            id = menuLinks.last().attr('href').substring(1);
        }

        if (id) {
            menuLinks.removeClass('active');
            $('#menu a[href="#' + id + '"]').addClass('active');
        }
    }

    updateNav(); // Initial call

})(jQuery);
