# PALETTE'S JOURNAL - Emmanuel Morfiadakis Portfolio

## 2024-10-31 - [Semantic Buttons and Focus States]
**Learning:**
1. Using non-semantic elements (`div`, `span`) for interactive controls is a significant accessibility barrier as they are not natively focusable or recognized as buttons by assistive technology.
2. Removing focus outlines (`outline: none`) without providing a `:focus-visible` alternative breaks keyboard navigation.

**Action:**
1. Always use semantic `<button>` elements for interactive controls and provide descriptive `aria-label` attributes for icon-only buttons.
2. Use `:focus-visible` in SCSS to provide a clear focus indicator (using `$base-color`) that only appears for keyboard users, maintaining both accessibility and visual polish.

## 2025-05-20 - [Dynamic ARIA Labels and Keyboard Interactivity]
**Learning:**
1. Interactive controls with toggling states (like a mute button) must have their `aria-label` updated dynamically in JavaScript to ensure screen reader users receive accurate state information.
2. Supplementing mouse-driven slideshows with keyboard navigation (Arrow keys) significantly improves accessibility for power users and those with motor impairments.

**Action:**
1. Use `setAttribute('aria-label', ...)` within event handlers for stateful UI elements.
2. Implement global `keydown` listeners for common navigation patterns, ensuring they also synchronize with other logic like autoplay timers.

## 2025-05-23 - [Accessible Feedback for Dynamic Interactions]
**Learning:**
1. Actions that trigger visual-only feedback (e.g., spawning stickers, heart rain) are invisible to screen reader users unless accompanied by an `aria-live` announcement.
2. Screen readers may ignore identical consecutive updates to an `aria-live` region.

**Action:**
1. Implement a visually-hidden "announcer" element with `aria-live="polite"` and a helper function to communicate visual-only events to assistive technology.
2. Force re-announcement by toggling a non-breaking space (`\u00A0`) at the end of the message if it's identical to the previous one.

## 2025-05-24 - [Mobile Menu Accessibility and Focus Management]
**Learning:**
1. Mobile menus that overlay the screen should behave like modal dialogs, requiring the "Escape" key to close and preventing focus from getting lost.
2. Returning focus to the trigger element after closing a menu is essential for a continuous keyboard navigation experience.

**Action:**
1. Implement a global `keyup` listener for `Escape` that specifically checks if the mobile menu is active.
2. Explicitly `.focus()` the open button when the menu is closed via any method (button, link, or key).

## 2025-05-25 - [Skip Links and Contextual Link Labels]
**Learning:**
1. Skip links are essential for single-page portfolios with long navigation headers to allow keyboard users to bypass repetitive content.
2. Link text like "View Project" is ambiguous for screen reader users when multiple such links exist; they require contextual labels to be distinguishable in a list of links.
3. Testing off-screen elements with automated tools (like Playwright) requires checking positional attributes rather than standard visibility, as "visible" usually implies "visible in the viewport".

**Action:**
1. Always include a "Skip to content" link as the first focusable element on landing pages.
2. Use `aria-label` to provide unique context to generic action links (e.g., "View [Project Name] website").
3. Verify accessibility features by checking their CSS state (e.g., `top` coordinate) during focus events in automated tests.

## 2025-06-10 - [Sticker Management and Shortcut Discoverability]
**Learning:**
1. Dynamically placed UI elements (like stickers) need an intuitive "undo" or removal mechanism to prevent the interface from becoming cluttered and unusable.
2. Keyboard shortcuts significantly improve UX for power users, but they are "hidden" unless explicitly communicated through tooltips (`title` attributes) or help menus.
3. Automated verification of interactive state (like spawning and removing elements) is more reliable than manual checks when using `file://` protocols for static site testing.

**Action:**
1. Implement a `dblclick` listener for removable dynamic elements and announce their removal via `aria-live`.
2. Include shortcut keys in `title` attributes (e.g., "Action (key)") to improve discoverability.
3. Use Playwright for verification of DOM state changes (addition/removal) even for simple static pages.

## 2025-06-15 - [Smooth Scroll Focus Management]
**Learning:**
1. Smooth scrolling to internal anchors creates an accessibility gap where the visual viewport moves but keyboard and screen reader focus remains on the trigger element.
2. Programmatically moving focus to the target section after scrolling ensures a continuous and accessible navigation experience.

**Action:**
1. Apply `tabindex="-1"` to target sections and call `.focus()` on the target element within the scroll animation's completion callback.
2. Use CSS to suppress the focus outline on these large containers (when focused via script) to maintain visual polish while preserving functional accessibility.

## 2025-06-25 - [External Link Context and Interactive Feedback]
**Learning:**
1. Providing explicit visual and textual context for external links (icons, titles, and ARIA labels) reduces user confusion and improves accessibility for screen reader users by managing navigation expectations.
2. Adding subtle, high-quality hover interactions (lift, color change, shadow) to static lists (like skills) significantly enhances the perceived polish and interactivity of a portfolio.

**Action:**
1. Always append external link icons and "opens in a new tab" notices to links leading away from the primary site.
2. Use CSS transitions and transformations to provide tactile-like feedback on interactive elements that don't have standard "button" appearances.

## 2024-07-10 - [Conditional Scroll Offsets for Hybrid Sticky Headers]
**Learning:**
1. When implementing a sticky header that only becomes fixed after a scroll threshold (hybrid state), smooth-scroll calculations must dynamically check for the header's current state.
2. Fixed-offset subtractions applied when the header is not yet sticky result in a visual "gap" regression at the top of the viewport.

**Action:**
1. In smooth-scroll handlers, use a conditional check (e.g., `.hasClass('sticky')`) to decide whether to subtract the header height from the target scroll position.
2. Always verify navigation transitions starting from the very top of the page to catch hybrid state bugs.

## 2024-07-10 - [Performance-First Scroll-Spy and Terminal State Handling]
**Learning:**
1. Binding expensive DOM operations (like class toggling on multiple links) to the scroll event can cause layout thrashing and input lag.
2. Standard scroll-spy logic often fails to highlight the final section if it's shorter than the viewport, as the trigger point may never be reached.

**Action:**
1. Wrap scroll-driven UI updates in `window.requestAnimationFrame` to throttle execution to the browser's refresh rate.
2. Implement an explicit "bottom-of-page" check in scroll-spy logic (`scrollTop + windowHeight >= documentHeight`) to force-highlight the final navigation link, ensuring a complete and intuitive UX.

## 2024-07-10 - [Conditional Scroll Offsets for Hybrid Sticky Headers]
**Learning:**
1. When implementing a sticky header that only becomes fixed after a scroll threshold (hybrid state), smooth-scroll calculations must dynamically check for the header's current state.
2. Fixed-offset subtractions applied when the header is not yet sticky result in a visual "gap" regression at the top of the viewport.

**Action:**
1. In smooth-scroll handlers, use a conditional check (e.g., `$('header').hasClass('sticky')`) to decide whether to subtract the header height from the target scroll position.
2. Always verify navigation transitions starting from the very top of the page to catch hybrid state bugs.

## 2024-07-10 - [Performance-First Scroll-Spy and Terminal State Handling]
**Learning:**
1. Binding expensive DOM operations (like class toggling on multiple links) to the scroll event can cause layout thrashing and input lag.
2. Standard scroll-spy logic often fails to highlight the final section if it's shorter than the viewport, as the trigger point may never be reached.

**Action:**
1. Wrap scroll-driven UI updates in `window.requestAnimationFrame` to throttle execution to the browser's refresh rate.
2. Implement an explicit "bottom-of-page" check in scroll-spy logic (`scrollTop + windowHeight >= documentHeight`) to force-highlight the final navigation link, ensuring a complete and intuitive UX.
