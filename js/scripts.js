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

    // Performance: Cache layout dimensions and offsets to prevent layout thrashing on scroll
    var cachedDimensions = {
        windowHeight: 0,
        documentHeight: 0,
        headerHeight: 0,
        leadHeight: 0
    };

    function updateCachedDimensions() {
        cachedDimensions.windowHeight = $window.height();
        cachedDimensions.documentHeight = $document.height();
        cachedDimensions.headerHeight = $header.length ? $header.outerHeight() : 0;
        cachedDimensions.leadHeight = $lead.length ? $lead.height() : 0;

        for (var i = 0; i < navTargets.length; i++) {
            var target = navTargets[i];
            target.offsetTop = target.section.length ? target.section.offset().top : 0;
            target.outerHeight = target.section.length ? target.section.outerHeight() : 0;
        }
    }

    // Recompute on resize or complete resource load to keep dimensions accurate
    $window.on('resize load', updateCachedDimensions);

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

    // Sticky Header and Scroll Spy
    var scrollTicking = false;
    $window.on('scroll', function() {
        if (!scrollTicking) {
            // Performance: Throttle navigation update logic using requestAnimationFrame to prevent layout thrashing
            window.requestAnimationFrame(function() {
                var scrollPos = $window.scrollTop();

                $header.toggleClass('sticky', scrollPos > cachedDimensions.leadHeight);

                // Performance: Handle highlighting of the final navigation link at the bottom of the page
                if (scrollPos + cachedDimensions.windowHeight >= cachedDimensions.documentHeight - 10) {
                    $menuLinks.removeClass('active');
                    $menuLinks.last().addClass('active');
                } else {
                    // Performance: Use the pre-mapped navTargets with cached dimensions to avoid layout thrashing during scroll-spy calculations
                    for (var i = 0; i < navTargets.length; i++) {
                        var target = navTargets[i];
                        // Use a small pixel buffer (+ 5) to ensure links highlight reliably at section boundaries
                        var sectionTop = target.offsetTop - cachedDimensions.headerHeight;
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
                // Performance: Recompute dimensions after DOM has expanded to prevent stale scroll-spy offsets
                updateCachedDimensions();
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

    // Initialize dimensions after all synchronous DOM modifications (like timeline wrapping) have finished
    updateCachedDimensions();

})(jQuery);
