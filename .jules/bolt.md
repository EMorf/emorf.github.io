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
