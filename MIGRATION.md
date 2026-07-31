# Migration Log: Fluid Expressions

Record of everything done to move this project from Glitch export to live Netlify site. Written to be repeatable for other Glitch exports.

---

## Starting state

- Glitch export unpacked into a git repo
- `index.html` at the repo root — the entry point
- `style.css` and `script.js` at the repo root
- `glitch-assets/` containing `.jpg` copies of all images and two `.gif` files
- `deprecated/` containing unused full-resolution `.png`/`.PNG` originals (~40MB)
- No `package.json`, no `node_modules/`, no build step — already structurally a static site
- All JS libraries loaded from `cdnjs.cloudflare.com`
- Fonts loaded from `fonts.googleapis.com`
- Images loaded from `cdn.glitch.com`

---

## Steps

### 1. Vendor JavaScript libraries

Created `lib/` at the repo root. Downloaded the following files from cdnjs and saved them into `lib/`:

| Filename | Source URL |
|---|---|
| `jquery-2.1.3.min.js` | `https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js` |
| `TweenMax-1.17.0.min.js` | `https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js` |
| `ScrollMagic-2.0.5.js` | `https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.js` |
| `animation.gsap-2.0.5.js` | `https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js` |
| `ScrollToPlugin-1.17.0.min.js` | `https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/plugins/ScrollToPlugin.min.js` |

Updated the five `<script>` tags at the bottom of `index.html` from CDN URLs to `lib/` paths:

```html
<script src="lib/jquery-2.1.3.min.js"></script>
<script src="lib/TweenMax-1.17.0.min.js"></script>
<script src="lib/ScrollMagic-2.0.5.js"></script>
<script src="lib/animation.gsap-2.0.5.js"></script>
<script src="lib/ScrollToPlugin-1.17.0.min.js"></script>
```

### 2. Vendor Google Fonts

Created `lib/fonts/`. Fetched the Google Fonts CSS for both families:

```
https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;500&family=Space+Mono:ital,wght@0,400;1,400&display=swap
```

Saved the resulting `@font-face` declarations as `lib/fonts/fonts.css`. Edited all `url(https://fonts.gstatic.com/...)` references in that file to point at local filenames (e.g., `url(darker-grotesque-latin.woff2)`). Downloaded each `.woff2` file from `fonts.gstatic.com` and saved it into `lib/fonts/`.

Font files saved:
- `darker-grotesque-latin.woff2`
- `darker-grotesque-latin-ext.woff2`
- `darker-grotesque-viet.woff2`
- `space-mono-italic-latin.woff2`
- `space-mono-italic-latin-ext.woff2`
- `space-mono-italic-viet.woff2`
- `space-mono-normal-latin.woff2`
- `space-mono-normal-latin-ext.woff2`
- `space-mono-normal-viet.woff2`

In `index.html`: removed the `<link rel="preconnect" href="https://fonts.gstatic.com">` tag and the Google Fonts `<link>` tag. Added:

```html
<link rel="stylesheet" href="lib/fonts/fonts.css" />
```

### 3. Remove Font Awesome

Removed the Font Awesome `<link>` from `index.html`. The library was loaded in the original but never used — every `<i class="fa fa-angle-...">` element was inside an HTML comment. The only element with the class `fa` was an `<img>` tag, and that class was used by a local CSS rule in `style.css` (not the Font Awesome library).

### 4. Repoint images to local files

All images were originally loaded from `cdn.glitch.com` URLs. The `glitch-assets/` folder already contained local `.jpg` copies of every image. Updated all `src` and `href` attributes in `index.html` and `background-image` URLs in `style.css` to point at `glitch-assets/FILENAME`.

Note: some files in `glitch-assets/` are `.jpg` even though the original Glitch filenames were `.png`. Check the actual filename and extension in `glitch-assets/` before writing the path.

### 5. Delete `deprecated/`

Deleted the `deprecated/` folder. It contained unused full-resolution `.png`/`.PNG` originals from the original Glitch export (~40MB). The `.jpg` copies in `glitch-assets/` are the working assets.

### 6. Fix broken `pagefade` click handler

In `script.js`, the `pagefade` jQuery plugin contained a `$("a").click()` block that called `this.fadeOut()` where `this` was a raw DOM element (not a jQuery object). This threw a `TypeError: this.fadeOut is not a function` on every link click and broke scroll navigation. The block also called `window.location.disabled`, which is not a real browser API.

Removed the entire `$("a").click()` block and the associated `redirectPage` variable. Kept only the fade-in behavior in `pagefade`.

### 7. Fix scroll button on mobile (ScrollMagic `.setPin()`)

In `script.js`, `sceneA` (the Questions section) had a `.setPin("#animate1")` call that ScrollMagic used to freeze the h3 in place during the typewriter animation. This caused ScrollMagic to inject a `<div class="scrollmagic-pin-spacer">` with a large `padding-bottom` that covered the fixed-position scroll button on mobile, making it unclickable.

Removed the `.setPin("#animate1")` line from `sceneA`. The typewriter animation still fires via `.setClassToggle()`. All other scenes (sceneB–sceneK) had `.setPin()` commented out already.

### 8. Add responsive CSS

Added a `@media (max-width: 768px)` block to `style.css` with the following rules:

- `h1`: reduced font size, zeroed padding-top, set `width: 100%; box-sizing: border-box; text-align: center` to prevent overflow and enable centering
- `.hero`: added `justify-content: center` to vertically center content
- `.anchor-nav`: `display: none !important` — the `!important` is required because jQuery's `fadeIn()` sets an inline `display: flex` that would otherwise override a plain `display: none`
- `.box`: widened from `50vw` to `85vw`
- `.box .data`: widened from `50vw` to `85vw`
- `.title-text`: widened from `40vw` to `85vw`
- `h3`: reduced font size and letter-spacing
- `#section-1`: zeroed padding-top/bottom, set `min-height: 100vh; justify-content: center` to vertically center the h3 via flexbox instead of padding
- `#section-1 .box`: zeroed padding-bottom

Also fixed the `@keyframes typing` animation: changed `to { width: 50vw }` to `to { width: 100% }` so the animation always expands to the element's own width regardless of screen size.

### 9. Add `#section-1` desktop spacing

After removing `.setPin()`, the Questions section's h3 appeared too close to the hero section on desktop (the pin spacer had been providing visual space). Added:

```css
#section-1 {
  padding-top: 40vh;
  padding-bottom: 50vh;
}
```

This is a desktop-only rule; the mobile `@media` block overrides both values to `0`.

### 10. Create `netlify.toml`

```toml
[build]
  publish = "."
  command = ""
```

`publish = "."` tells Netlify to serve from the repo root. `command = ""` means no build step.

### 11. Create `.gitignore`

```
.DS_Store
node_modules/
.env
.env.*
```

---

## Verification

Tested locally with `python3 -m http.server 8000`:
- All images, fonts, and backgrounds load
- No requests to external CDNs (confirmed via DevTools Network tab)
- Typewriter animation fires on scroll for all 11 sections
- Left-nav highlights current section; clicking nav links smooth-scrolls
- Scroll button advances through all sections on desktop and mobile
- Mobile layout: nav hidden, content centered, text fits without cutoff

---

## Files changed

| File | Change |
|---|---|
| `index.html` | Removed CDN links, repointed scripts/fonts/images to local paths |
| `style.css` | Repointed background images, added responsive CSS, fixed keyframes |
| `script.js` | Removed broken pagefade click handler, removed `.setPin()` from sceneA |
| `lib/` | Created — 5 vendored JS libraries |
| `lib/fonts/` | Created — fonts.css + 9 .woff2 files |
| `netlify.toml` | Created |
| `.gitignore` | Created |
| `deprecated/` | Deleted |
