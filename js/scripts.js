(function($) {

    // Performance: Cache frequently accessed jQuery selectors
    var $window = $(window);
    var $document = $(document);
    var $html = $('html');
    var $body = $('body');
    var $htmlBody = $html.add($body);
    var $header = $('header');
    var $menuLinks = $('#menu a');
    var $lead = $('#lead');

    // Remove no-js class
    $html.removeClass('no-js');

    // Pre-calculate navigation targets to avoid repeated selector lookups
    var navTargets = $menuLinks.map(function() {
        var $el = $($(this).attr('href'));
        if ($el.length) return { link: $(this), section: $el };
    }).get();

    // Animate to section when nav is clicked
    $header.find('a').click(function(e) {
        var $this = $(this);
        if ($this.hasClass('no-scroll')) return;
        e.preventDefault();
        var heading = $this.attr('href');
        var $target = $(heading);
        var scrollDistance = $target.offset().top - ($header.hasClass('sticky') ? $header.outerHeight() : 0);

        $htmlBody.stop().animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $target.focus({ preventScroll: true });
        });

        if ($header.hasClass('active')) {
            $header.add($body).removeClass('active');
            $('#mobile-menu-open').attr('aria-expanded', 'false').focus();
        }
    });

    // Sticky Header and Scroll Spy
    var scrollRequest;
    $window.on('scroll', function() {
        if (scrollRequest) return;
        scrollRequest = requestAnimationFrame(function() {
            var scrollPos = $window.scrollTop(), headerHeight = $header.outerHeight();
            $header.toggleClass('sticky', scrollPos > $lead.height());

            // Performance: Force highlight final link at bottom of page
            if (scrollPos + $window.height() >= $document.height() - 10) {
                if (!$menuLinks.last().hasClass('active')) {
                    $menuLinks.removeClass('active');
                    $menuLinks.last().addClass('active');
                }
            } else {
                // Performance: Use pre-calculated navTargets and minimize DOM writes
                navTargets.forEach(function(target) {
                    var $currLink = target.link, $refElement = target.section;
                    var offset = $refElement.offset().top - headerHeight;

                    if (offset <= scrollPos + 5 && (offset + $refElement.outerHeight()) > scrollPos) {
                        if (!$currLink.hasClass('active')) {
                            $menuLinks.removeClass('active');
                            $currLink.addClass('active');
                        }
                    }
                });
            }
            scrollRequest = null;
        });
    });

    // Scroll to top
    $('#to-top').click(function() {
        $htmlBody.animate({
            scrollTop: 0
        }, 500, function() {
            $('.skip-link').focus();
        });
    });

    // Scroll to first element
    $('#lead-down button').click(function() {
        var $next = $lead.next();
        var scrollDistance = $next.offset().top;
        $htmlBody.animate({
            scrollTop: scrollDistance + 'px'
        }, 500, function() {
            $next.focus();
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
