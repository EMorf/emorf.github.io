(function($) {

    // Performance: Cache frequently used selectors and pre-map navigation targets
    var $window = $(window);
    var $document = $(document);
    var $html = $('html');
    var $body = $('body');
    var $header = $('header');
    var $menuLinks = $('#menu a');
    var $lead = $('#lead');
    var $mobileMenuOpen = $('#mobile-menu-open');
    var $mobileMenuClose = $('#mobile-menu-close');
    var navTargets = [];
    var scrollActive = false;

    // Remove no-js class
    $html.removeClass('no-js');

    // Pre-map navigation targets to their associated sections to avoid repetitive DOM lookups during scroll
    $menuLinks.each(function() {
        var $link = $(this);
        var $target = $($link.attr('href'));
        if ($target.length) {
            navTargets.push({
                link: $link,
                target: $target
            });
        }
    });

    // Animate to section when nav is clicked
    $header.find('a').click(function(e) {
        if ($(this).hasClass('no-scroll')) return;
        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top - ($header.hasClass('sticky') ? $header.outerHeight() : 0);

        $('html, body').stop().animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $(heading).focus({ preventScroll: true });
        });

        if ($header.hasClass('active')) {
            $header.add($body).removeClass('active');
            $mobileMenuOpen.attr('aria-expanded', 'false').focus();
        }
    });

    // Sticky Header and Scroll Spy with requestAnimationFrame throttling for 60fps performance
    $window.on('scroll', function() {
        if (!scrollActive) {
            scrollActive = true;
            window.requestAnimationFrame(function() {
                var scrollPos = $window.scrollTop();
                var headerHeight = $header.outerHeight();
                var leadHeight = $lead.height();
                var activeSet = false;

                $header.toggleClass('sticky', scrollPos > leadHeight);

                // Determine the current active section
                for (var i = navTargets.length - 1; i >= 0; i--) {
                    var section = navTargets[i];
                    var sectionTop = section.target.offset().top - headerHeight;

                    // Performance: Only update classes when necessary and handle page bottom edge case
                    if (sectionTop <= scrollPos + 5 || (i === navTargets.length - 1 && scrollPos + $window.height() >= $document.height() - 10)) {
                        if (!section.link.hasClass('active')) {
                            $menuLinks.removeClass('active');
                            section.link.addClass('active');
                        }
                        activeSet = true;
                        break;
                    }
                }

                if (!activeSet) {
                    $menuLinks.removeClass('active');
                }

                scrollActive = false;
            });
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
        var scrollDistance = $lead.next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $lead.next().focus();
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
        $header.add($body).addClass('active');
        $(this).attr('aria-expanded', 'true');
        $mobileMenuClose.focus();
    });

    // Close mobile menu
    $mobileMenuClose.click(function() {
        $header.add($body).removeClass('active');
        $mobileMenuOpen.attr('aria-expanded', 'false').focus();
    });

    // Close mobile menu on Escape key
    $document.keyup(function(e) {
        if (e.keyCode === 27 && $header.hasClass('active')) {
            $header.add($body).removeClass('active');
            $mobileMenuOpen.attr('aria-expanded', 'false').focus();
        }
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    // Project card interaction
    $('.project').on('click', '.project-image, h3', function() {
        $(this).closest('.project').find('a').first()[0].click();
    });

    // Actionable contact instructions
    $('.open-contact-form').click(function(e) {
        e.preventDefault();
        if (typeof formbutton === 'function') {
            formbutton("open");
        }
    });

})(jQuery);
