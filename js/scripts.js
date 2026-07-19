(function($) {
    // Performance: Cache frequently used jQuery selectors to reduce DOM traversal overhead
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $body = $('body'),
        $header = $('header'),
        $menuLinks = $('#menu a'),
        $lead = $('#lead'),
        $mobileMenuOpen = $('#mobile-menu-open'),
        $mobileMenuClose = $('#mobile-menu-close');

    // Remove no-js class
    $html.removeClass('no-js');

    // Performance: Pre-map navigation targets to avoid redundant attribute lookups and jQuery selections during scroll events
    var navTargets = $menuLinks.map(function() {
        var targetId = this.getAttribute('href');
        if (targetId && targetId.charAt(0) === '#') {
            var $el = $(targetId);
            if ($el.length) {
                return {
                    link: $(this),
                    section: $el
                };
            }
        }
    }).get();

    // Animate to section when nav is clicked
    $('header a').click(function(e) {
        var $this = $(this);
        if ($this.hasClass('no-scroll')) return;
        e.preventDefault();
        var headingId = $this.attr('href');
        var $heading = $(headingId);
        var headerHeight = $header.outerHeight();
        var isSticky = $header.hasClass('sticky');

        // Performance: Use cached selector and calculate scroll distance accounting for sticky header
        var scrollDistance = $heading.offset().top - (isSticky ? headerHeight : 0);

        // Performance: stop() prevents animation queue buildup; duration capped at 800ms for better UX
        var duration = Math.min(800, Math.max(300, Math.abs($window.scrollTop() - scrollDistance) / 2));
        $('html, body').stop().animate({
            scrollTop: scrollDistance + 'px'
        }, duration, function() {
            // Accessibility: Focus target element without causing native scroll jump
            $heading.focus({ preventScroll: true });
        });

        if ($header.hasClass('active')) {
            $header.removeClass('active');
            $body.removeClass('active');
            $mobileMenuOpen.attr('aria-expanded', 'false').focus();
        }
    });

    // Performance: Cache DOM geometry measurements to eliminate scroll-time layout thrashing (from 14+ queries to 0)
    var headerHeight, leadHeight, windowHeight, documentHeight;

    function updateLayoutDimensions() {
        headerHeight = $header.outerHeight();
        leadHeight = $lead.height();
        windowHeight = $window.height();
        documentHeight = $document.height();

        // Cache positions of all nav target elements
        for (var i = 0; i < navTargets.length; i++) {
            var target = navTargets[i];
            target.offsetTop = target.section.offset().top;
            target.outerHeight = target.section.outerHeight();
        }
    }

    // Initialize dimensions and update on window load and debounced resize
    updateLayoutDimensions();

    $window.on('load', function() {
        updateLayoutDimensions();
    });

    var resizeTimeout;
    $window.on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateLayoutDimensions();
        }, 150);
    });

    // Sticky Header and Scroll Spy
    var scrollTicking = false;
    $window.on('scroll', function() {
        if (!scrollTicking) {
            // Performance: Throttle navigation update logic using requestAnimationFrame to prevent layout thrashing
            window.requestAnimationFrame(function() {
                var scrollPos = $window.scrollTop();

                $header.toggleClass('sticky', scrollPos > leadHeight);

                // Performance: Handle highlighting of the final navigation link at the bottom of the page
                if (scrollPos + windowHeight >= documentHeight - 10) {
                    $menuLinks.removeClass('active');
                    $menuLinks.last().addClass('active');
                } else {
                    // Performance: Use the cached navTargets dimensions for efficient scroll-spy calculations
                    for (var i = 0; i < navTargets.length; i++) {
                        var target = navTargets[i];
                        // Use a small pixel buffer (+ 5) to ensure links highlight reliably at section boundaries
                        var sectionTop = target.offsetTop - headerHeight;
                        var sectionBottom = sectionTop + target.outerHeight;

                        if (scrollPos + 5 >= sectionTop && scrollPos < sectionBottom) {
                            $menuLinks.removeClass('active');
                            target.link.addClass('active');
                            break;
                        }
                    }
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 500, function() {
            $('.skip-link').focus();
        });
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var $nextSection = $lead.next();
        var scrollDistance = $nextSection.offset().top;
        $('html, body').stop().animate({
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
    $mobileMenuOpen.click(function() {
        $header.addClass('active');
        $body.addClass('active');
        $mobileMenuOpen.attr('aria-expanded', 'true');
        $mobileMenuClose.focus();
    });

    // Close mobile menu
    $mobileMenuClose.click(function() {
        $header.removeClass('active');
        $body.removeClass('active');
        $mobileMenuOpen.attr('aria-expanded', 'false').focus();
    });

    // Close mobile menu on Escape key
    $document.keyup(function(e) {
        if (e.keyCode === 27 && $header.hasClass('active')) {
            $header.removeClass('active');
            $body.removeClass('active');
            $mobileMenuOpen.attr('aria-expanded', 'false').focus();
        }
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300, function() {
                // Performance: Recalculate layout dimensions since new elements have been revealed
                updateLayoutDimensions();
            });
        });
    });

    // Project card interaction
    $('.project').click(function(e) {
        if ($(e.target).closest('a').length) return;
        $(this).find('a').first()[0].click();
    });

    // Actionable contact instructions
    $('.open-contact-form').click(function(e) {
        e.preventDefault();
        if (typeof formbutton === 'function') {
            formbutton("open");
        }
    });

})(jQuery);
