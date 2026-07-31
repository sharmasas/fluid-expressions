# CLAUDE.md

## What this project is

This repository is one of eight creative coding experiments originally built on
Glitch. Glitch was deprecated, I exported the code, and I am now re-deploying
each project as a standalone site: one GitHub repo per project, one Netlify site
per project, public repos.

The code here was written by me years ago. It is old, it may be messy, and it
was written for Glitch's hosting model, not Netlify's.

**Project name:** Fluid Expressions
**Original Glitch name:** Fluid Expressions
**What it does:** Animated scrolling narrative storytelling site
**Triage bucket:** Static 
---

## The goal

Get this running again on Netlify in a form that is **unlikely to break on its
own** over the next several years. I do not want to maintain these. I want to
link to them from my portfolio and forget about them.

That priority outranks elegance, modernity, and performance. When there is a
tradeoff between "nicer code" and "fewer things that can fail later," choose
fewer things that can fail.

The secondary consideration for goals is to look reasonable and be functional on mobile.

### What that means concretely

- **Zero build step is the target.** If this can be plain HTML, CSS, and JS
  served as static files with no `npm install` at deploy time, make it that.
  Nothing that doesn't run can break.
- **Vendor all external libraries.** Any library loaded from a CDN
  (`cdn.jsdelivr.net`, `unpkg.com`, `cdnjs`, Google-hosted anything) must be
  downloaded into a local `lib/` directory and the `<script>` or `<link>` tag
  repointed at the local copy. CDN links are the most common way an old sketch
  dies. This is high priority, not optional cleanup.
- **Delete the server if the server does nothing.** Many of these were Express
  apps whose only real job was `express.static()`. If that's the case here, say
  so and remove it.
- **Preserve, don't modernize.** The goal is archival fidelity: get the original
  behaviour running. Do not upgrade dependencies, rewrite in a framework,
  convert to modules, add TypeScript, add a bundler, or "clean up" working code
  unless it is required to deploy. If you think a change is required, say why
  before making it.

---

## How I need you to work with me

I am rusty on Node and on client/server concepts generally. I understand the
creative coding side fine; I do not reliably remember what a build step is, what
middleware does, or why a server would need a port. Assume that gap is real and
don't route around it silently.

- **Explain before you act.** Say what you're about to change and why, in plain
  language, before changing it.
- **Refer to the actual files here**, not to generic examples. "This file does X"
  is useful; "in a typical Node app, Y" is not.
- **Define jargon the first time you use it**, briefly and inline. Terms like
  middleware, build step, environment variable, bundler, entry point, static
  asset.
- **Prefer plan mode for anything non-trivial.** Propose, let me approve, then
  implement.
- **Ask before restructuring.** Moving files, renaming directories, or changing
  the entry point needs my sign-off first.
- **One question at a time** if you need something from me. Don't send a list.
- **Tell me when something is genuinely unrevivable** — a dead third-party API,
  a vanished dependency. Say so early rather than debugging for an hour. That's
  a decision for me to make, not a problem for you to solve.

---

## Hard limits

These are not preferences. Do not do these things, and do not ask me to approve
an exception.

1. **Never commit secrets.** No API keys, tokens, `.env` files, or credentials
   in any commit. `.gitignore` is written before `git init`, not after. These
   repos are public.
2. **Never commit `node_modules/`** or any other installed dependency tree.
   (Vendored library files in `lib/` that I explicitly asked for are different —
   those are source.)
3. **Never modify the original export archive.** If a path outside this
   repository is ever in scope, it is read-only reference material.
4. **No new dependencies without asking.** Every package added is a future
   failure point. If you believe one is necessary, explain what breaks without
   it first.
5. **No frameworks, no bundlers, no build tooling** added to a project that
   didn't have them.
6. **No secret-scanning shortcuts.** Before the first commit, list every file
   being staged and let me look at it.
7. **Don't silently fix things.** If you find a bug, tell me it exists before
   deciding whether to fix it.

---

## Deployment target

- **Host:** Netlify, connected to this GitHub repo, auto-deploy on push to main.
- **Config:** a `netlify.toml` at the repo root, with the publish directory set
  explicitly and the build command empty for static projects.
- **If a build step is genuinely unavoidable:** pin the Node version in
  `netlify.toml`, commit `package-lock.json`, and tell me plainly that this
  project now has a moving part that can break.
- **Runtime persistence is not available.** There is no writable disk and no
  always-on process. If this project writes files, uses a `.data/` directory, or
  holds state between requests, stop and flag it — the likely answer is
  `localStorage` in the browser, not a database.

---

## Files to maintain in this repo

- **`README.md`** — original Glitch name, what the project does, what I changed
  during migration, and any known dead dependencies.
- **`NOTES.md`** — a running log of concepts you explained to me, in my terms.
  Add to this whenever you define something. It's my reference, not yours.
- **`MIGRATION.md`** — a step-by-step record of exactly what was done to move
  this project from Glitch export to live Netlify site. Write this at the end.
  Future repos will be migrated by reading this file, so it needs to be specific
  enough to follow without me re-explaining anything.

---

## Definition of done

1. Runs correctly when served locally as static files.
2. No external runtime dependencies except ones I've explicitly accepted.
3. Repo is public, contains no secrets, no `node_modules`.
4. Live on Netlify at a readable site name.
5. Verified in a browser on the live URL — interactions work, console is clean.
6. `README.md`, `NOTES.md`, and `MIGRATION.md` written.
