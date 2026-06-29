# PALETTE'S JOURNAL - Emmanuel Morfiadakis Portfolio

## 2024-10-31 - [Semantic Buttons and Focus States]
**Learning:**
1. Using non-semantic elements (`div`, `span`) for interactive controls is a significant accessibility barrier as they are not natively focusable or recognized as buttons by assistive technology.
2. Removing focus outlines (`outline: none`) without providing a `:focus-visible` alternative breaks keyboard navigation.

**Action:**
1. Always use semantic `<button>` elements for interactive controls and provide descriptive `aria-label` attributes for icon-only buttons.
2. Use `:focus-visible` in SCSS to provide a clear focus indicator (using `$base-color`) that only appears for keyboard users, maintaining both accessibility and visual polish.
