# Notes

Concepts explained during the Glitch → Netlify migration, in plain terms.

---

## Static site

A website made of plain files (HTML, CSS, JavaScript, images) that a server hands directly to the browser with no processing. Nothing runs on the server — the browser does all the work. Netlify is well-suited to this because it just serves files; there's no Node process, no database, nothing to go down.

## Build step

A command (like `npm run build`) that transforms your source files before deployment — bundling, compiling, minifying. This project has no build step. Netlify serves the files exactly as they are in the repo.

## CDN

A Content Delivery Network — a third-party service that hosts files (libraries, fonts, images) and serves them fast from servers close to the user. Examples: `cdnjs.cloudflare.com`, `fonts.googleapis.com`, `cdn.glitch.com`. The risk: if the CDN goes away or changes its URLs, your site breaks. Solution: vendor the files locally instead.

## Vendoring

Downloading a library or asset file and storing it in your own repo rather than linking to an external CDN. In this project, all JS libraries live in `lib/` and all fonts live in `lib/fonts/`. The files are committed to the repo just like your own code.

## Entry point

The file the browser loads first. For this project that's `index.html`. Everything else (CSS, JS, fonts, images) is loaded by references inside that file.

## `netlify.toml`

A config file at the repo root that tells Netlify how to deploy the site. `publish` is the folder to serve (`.` means the repo root). `command` is what to run before serving — empty means do nothing.

## CSS specificity and `!important`

When multiple CSS rules try to set the same property, the browser picks the most "specific" one. An inline style (written directly on the HTML element with `style="..."`) beats an external stylesheet rule. `!important` beats inline styles. We needed `display: none !important` on `.anchor-nav` in the mobile media query because jQuery's `fadeIn()` sets an inline `display: flex` that would otherwise override the stylesheet's `display: none`.

## jQuery's `fadeIn()`

`fadeIn()` works by setting an inline `display` style directly on the element (e.g., `style="display: flex;"`). This inline style has higher CSS specificity than rules in an external stylesheet, which is why a plain `display: none` in CSS isn't enough to hide an element that jQuery has faded in — you need `!important`.

## `position: fixed` and z-index

An element with `position: fixed` is pulled out of the normal page flow and pinned to the viewport (it stays in place as you scroll). z-index controls which element appears "on top" when elements overlap. A higher z-index wins. We added `z-index: 1000` to the scroll button to try to bring it above the ScrollMagic pin spacer — this didn't fully solve the problem because the pin spacer's interaction with ScrollMagic's fixed positioning was the real issue.

## ScrollMagic pin spacer

When ScrollMagic "pins" an element (`.setPin()`), it wraps that element in a `<div class="scrollmagic-pin-spacer">` and gives that div a large `padding-bottom` equal to the scroll duration of the scene. This holds the page layout in place while the pinned element is fixed. The side effect: the spacer div becomes a large invisible block that can cover other elements (like the scroll button). Removing `.setPin()` removes the spacer entirely.

## `box-sizing: border-box`

By default, CSS `width` doesn't include padding or border — so a `width: 100%` element with `padding: 20px` actually overflows its container. `box-sizing: border-box` changes this so that padding and border are included in the width calculation. We used this on the h1 on mobile to prevent it from overflowing the viewport.

## Flexbox: `justify-content` vs `align-items`

In a flex container with `flex-direction: column` (stacking children top to bottom):
- `align-items` controls horizontal alignment (left/center/right)
- `justify-content` controls vertical alignment (top/center/bottom)

We used `justify-content: center` on the hero section and the Questions section on mobile to vertically center their content without relying on padding.

## `@keyframes` width units

The typewriter animation uses `@keyframes typing { from { width: 0 } to { width: 100% } }`. The `100%` is relative to the element's own container width. The original code used a hardcoded `50vw` (50% of the viewport width), which broke on mobile when the box was widened to `85vw` — the animation would end before the full text was revealed. Switching to `100%` makes it always animate to exactly the element's own width, regardless of screen size.
