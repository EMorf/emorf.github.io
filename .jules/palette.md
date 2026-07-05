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

## 2025-06-10 - [User-Generated Content Lifecycle and State Persistence]
**Learning:**
1. Dynamic UI elements (like stickers) need a clear removal path to prevent interface clutter and maintain user control.
2. Synchronizing initial state from `localStorage` before external library initialization (e.g., YouTube API) ensures a consistent user experience without jarring transitions or incorrect initial settings.

**Action:**
1. Implement "Double-click to remove" patterns for user-placed objects, paired with `title` hints and `aria-live` announcements.
2. Group state restoration logic early in the execution flow to ensure DOM and configuration are ready before the app becomes interactive.
