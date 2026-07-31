# Fluid Expressions

## About this project

A single-page, scroll-driven narrative site presenting a first-person story about imagining life as an artist-in-residence in low Earth orbit.

## Migration changes

This project was originally hosted on Glitch. The following changes were made to move it to Netlify as a pure static site:

- **Vendored 5 JavaScript libraries** from CDN into `lib/`: jQuery 2.1.3, GSAP TweenMax 1.17.0, ScrollMagic 2.0.5, ScrollMagic GSAP plugin 2.0.5, GSAP ScrollToPlugin 1.17.0
- **Vendored Google Fonts** (Darker Grotesque, Space Mono) into `lib/fonts/` — CSS and all `.woff2` files downloaded locally
- **Removed Font Awesome** — the `<link>` was present in the original but the library was never actually used; all Font Awesome icon elements were inside HTML comments
- **Repointed all images** from `cdn.glitch.com` URLs to local `glitch-assets/` files
- **Deleted `deprecated/`** — ~40MB of unused full-resolution PNG originals from the original Glitch export
- **Fixed broken pagefade click handler** — the original `script.js` had a `$("a").click()` block inside the `pagefade` function that called `this.fadeOut()` on a raw DOM element (not a jQuery object), throwing a TypeError on every link click and breaking scroll navigation
- **Removed `.setPin()` from the Questions section** — ScrollMagic was pinning the h3 in that section, which caused it to overlay and block the scroll button on mobile
- **Added responsive CSS** — mobile/tablet layout via a `@media (max-width: 768px)` block: left nav hidden, h1 and hero centered, box widths expanded, h3 font size reduced, typewriter animation width fixed

## Known issues

None.

## Future Updates

Adding connective tissue back to the speculative design artifact of the same name, as well as parabolic flight data and video elements.