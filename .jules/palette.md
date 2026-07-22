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
## 2026-07-13 - [Sticky Header & Scroll Spy]
**Learning:** Adding a sticky header and scroll spy to a single-page portfolio significantly improves navigation context, but requires careful offset calculations to prevent 'jumping' and ensure correct highlighting near section boundaries. Using `preventScroll: true` in `.focus()` is critical when managing accessibility after a custom scroll animation.
**Action:** Always account for fixed/sticky header height in scroll offset calculations and use a small buffer (e.g., 5px) for scroll-spy triggers to improve reliability.

## 2025-07-14 - [Increasing Click Targets & Actionable Text]
**Learning:** Making entire cards (including images and titles) clickable by delegating to a primary link ("big link" pattern) significantly improves mobile and mouse interactivity. Additionally, converting passive instructions like "use the form below" into actionable triggers for floating widgets reduces user friction and navigation effort.
**Action:** Implement delegated click handlers for complex card components and look for opportunities to transform descriptive text into direct action triggers for core site functionality.

## 2025-07-15 - [Card as a Link Pattern & Keyboard Feedback]
**Learning:**
1. Implementing the "Card as a Link" pattern significantly improves the hit target and intuitiveness of project displays, especially for mouse and mobile users.
2. Using `:focus-within` allows developers to provide the same delightful visual feedback (like a "lift" transform) to keyboard users that mouse users receive on hover, bridging the gap between mouse-driven and keyboard-driven UX.

**Action:**
1. Use `:focus-within` on card containers to trigger hover-like animations when internal links are focused.
2. Delegate container-level click events to the primary internal link while ensuring the handler ignores clicks originating directly from links to avoid event recursion.

## 2025-07-17 - [Interactive Context and Keyboard Visibility]
**Learning:**
1. Focus-visible styles are critical for keyboard users to navigate a site effectively; without them, users cannot visually determine which element (like social icons or navigation links) currently holds focus.
2. Converting plain text/trigger phrases like "form below" into semantically rich elements (using `aria-haspopup` and visual hover/focus indicators) significantly reduces user confusion and clarifies interaction expectations.

**Action:**
1. Always apply `:focus-visible` with a high-contrast outline on all interactive links (`a`, `button`, etc.) to provide continuous feedback for keyboard-driven sessions.
2. Elevate visual styling of interactive links using transitions (`@include transition(...)`) and clear hover-color adjustments to establish a professional visual hierarchy.

## 2025-07-19 - [Subpage Escape Traps and Accessible Back Navigation]
**Learning:**
1. Standalone sub-apps or easter-egg pages can easily trap keyboard-only or assistive tech users if they lack a clear, accessible, and easily discoverable path back to the main application.
2. Implementing a global keyboard shortcut (like `Escape`) alongside a prominent, high-contrast, fully responsive navigation link prevents dead-end journeys and completes the modern desktop-like application experience.

**Action:**
1. Always include a visible 'Back to Portfolio' button or link at the top of isolated subpages with proper touch targets and focus visibility styling.
2. Pair back navigation with a global `Escape` key event listener to offer a universal, intuitive escape mechanism for power users and keyboard-only sessions.

## 2025-07-20 - [Mobile Touch Gesture Accessibility & Screen Reader Announcements]
**Learning:**
1. Implementing touch swipe interactions on slideshows greatly enhances mobile user experience, but must use vertical deviation constraints to prevent interfering with vertical page scrolling.
2. Touch and swipe events are purely visual interactions that screen readers cannot perceive. To keep touch-driven interactions accessible, dynamic gestures must always be accompanied by descriptive `aria-live` announcements to keep non-visual users updated on state changes.

**Action:**
1. Implement horizontal swipe listeners using `touchstart` and `touchend`, allowing a maximum vertical threshold of ~50px to ensure vertical scrolling is unaffected.
2. Whenever a touch gesture successfully triggers a state change (such as advancing a slide), programmatically trigger an `aria-live` announcement (e.g. "Swiped left to next slide") via an announcer helper.

## 2025-07-22 - [Standardizing Touch Targets and Visual Hover States]
**Learning:** Icon-only buttons must meet WCAG's minimum touch target guidelines of at least 44x44px (standardized to 45px) to support comfortable tapping on mobile devices. Using inline-flex displays inside circular buttons guarantees perfect visual centering of glyph icons without using hacky line-height rules. Pairing these larger touch targets with smooth transition animations provides a delightful, polished visual feedback loop.
**Action:** Ensure all icon-only control buttons are styled with a minimum dimension of 44x44px, use inline-flex for centering, and apply custom transition mixins to smoothly cross-fade colors and backgrounds on hover.
