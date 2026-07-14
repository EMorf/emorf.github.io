# BOLT'S JOURNAL - Emmanuel Morfiadakis Portfolio

## 2025-06-28 - [Font Loading & Resource Hints Optimization]
**Learning:**
1. The codebase uses `@import` for fonts in subpages, which delays font discovery until CSS is parsed.
2. Missing `display=swap` on Google Fonts leads to "Flash of Invisible Text" (FOIT), delaying First Contentful Paint.
3. Lack of resource hints (`preconnect`) for external origins (Google Fonts, Formspree, YouTube) adds unnecessary latency for DNS/TLS.
4. A JavaScript redeclaration error (`const` twice) in `cute_penguin/index.html` was found, which blocks all interactive scripts from running—a critical performance (interaction) failure.

**Action:**
1. Always use `<link rel="preconnect">` for critical external origins.
2. Use `<link rel="stylesheet">` instead of `@import` for fonts to enable parallel discovery.
3. Ensure `display=swap` is appended to Google Fonts URLs.
4. Audit for JS syntax errors that block main thread execution of features.

## 2025-06-29 - [Runtime & Resource Prioritization]
**Learning:**
1. In static sites without a bundler, moving scripts to the `<head>` with `defer` is more efficient than placing them at the end of the `<body>`, as it allows parallel downloading while HTML parsing continues.
2. Background animations (like "heart rain") can be significant CPU sinks; a `document.visibilityState` check is a low-effort, high-impact optimization for battery and performance.
3. Preloading the LCP hero image with `fetchpriority="high"` measurably reduces the Largest Contentful Paint.
4. Using `requestIdleCallback` for non-critical work like preloading a gallery prevents "Long Tasks" during the critical initialization phase.

**Action:**
1. Default to `defer` for scripts in `<head>`.
2. Wrap repetitive background logic in visibility checks.
3. Use `fetchpriority="high"` for the main hero image.
4. Defer non-critical resource preloading to idle time.

## 2025-06-30 - [Animation & Memory Optimization]
**Learning:**
1. Attaching individual `animationend` listeners to hundreds of transient DOM elements (like hearts or sparkles) creates unnecessary memory pressure and garbage collection overhead.
2. Event delegation on the parent container is a significantly more efficient way to handle cleanup for high-frequency animations.
3. Adding `will-change: transform, opacity` to animated elements promotes them to their own compositor layer, reducing layout shifts and main-thread work during the animation lifecycle.
4. `decoding="async"` on images ensures that the browser does not block the main thread while decoding high-resolution photos, improving overall responsiveness.

**Action:**
1. Use event delegation for cleanup of repeated transient elements.
2. Apply `will-change` to elements with heavy transform/opacity animations.
3. Use `decoding="async"` for slideshow and gallery images.

## 2025-07-03 - [DOM Iteration & Layout Thrashing Optimization]
**Learning:**
1. Redundant jQuery `.each()` loops and repeated `.find()` operations on the same DOM elements cause unnecessary layout recalculations and main-thread blocking during initialization.
2. The original timeline generation logic performed three separate passes over the same elements to add classes, icons, and dates.
3. Consolidating these into a single pass reduces DOM traversals and ensures a cleaner, more efficient execution flow.
4. Using `var` or `const` for local jQuery references prevents polluting the global window object, which was an existing anti-pattern in the codebase.

**Action:**
1. Always aim for "single-pass" DOM transformations.
2. Use local scoping for all jQuery objects.
3. Verify that optimized DOM manipulation produces identical end-state HTML to avoid breaking CSS selectors.

## 2025-07-07 - [Legacy Page Optimization & Resource Discovery]
**Learning:**
1. Legacy Mahara export pages often lack standard mobile meta tags (viewport), causing the browser to fall back to desktop rendering and slower layout calculations.
2. Distributed assets like iframes and content images in these legacy files can cause significant network congestion if loaded all at once.
3. Third-party scripts (like Formspree) placed at the end of the body delay resource discovery by the browser's lookahead scanner.

**Action:**
1. Always include a viewport meta tag in all HTML files to ensure efficient mobile rendering.
2. Apply `loading="lazy"` and `decoding="async"` to all off-screen assets in legacy pages to preserve main-thread and network bandwidth.
3. Move `defer` scripts to the `<head>` to enable parallel discovery and downloading.

## 2026-07-08 - [Multi-depth Resource Preloading]
**Learning:**
1. Mahara export pages are distributed across various directory depths (root, `views/`, `files/file/images/`), making absolute-relative paths (e.g., `../../`) brittle if applied uniformly.
2. These legacy pages load a large number of blocking stylesheets (13+), which significantly delays the discovery of the primary brand asset (ANU logo) by the browser's lookahead scanner.
3. Preloading the logo with `fetchpriority="high"` bypasses the CSS-blocked discovery phase, allowing the browser to parallelize the image fetch with the CSS downloads.

**Action:**
1. When applying performance hints to distributed legacy files, always audit directory depth to ensure correct relative pathing for assets.
2. Prioritize preloading the primary logo/hero in pages with heavy blocking CSS to optimize LCP.

## 2025-07-09 - [Scroll Navigation & DOM Access Optimization]
**Learning:**
1. Performing multiple DOM lookups and layout property reads (like `.offset()` or `.outerHeight()`) directly inside a scroll event listener causes significant layout thrashing and main-thread congestion.
2. Throttling the scroll event with `requestAnimationFrame` ensures that DOM updates occur at most once per frame, maintaining a smooth 60fps experience.
3. Pre-mapping navigation links to their target elements during initialization avoids expensive selector lookups and attribute parsing during the scroll lifecycle.
4. Caching jQuery objects for frequently accessed elements (window, body, header) prevents redundant object creation and DOM traversals.

**Action:**
1. Always throttle high-frequency events like 'scroll' or 'resize' using `requestAnimationFrame` or a debounce/throttle helper.
2. Cache jQuery selectors and pre-calculate layout-dependent values at initialization whenever possible.
3. Use `.hasClass()` checks to avoid redundant DOM writes (e.g., adding/removing the same class repeatedly).
