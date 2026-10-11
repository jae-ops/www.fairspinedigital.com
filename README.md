# Fairspine Digital — Website

A multi-page static site for Fairspine Digital, built with plain HTML/CSS/JS plus GSAP for motion. Ready to deploy as-is to Cloudflare Pages.

## Pages

- `index.html` — Home (hero, stats, channel preview, CTA)
- `services.html` — Channels (all 8 services, each with its own anchor id for deep-linking)
- `about.html` — Approach (process + industries we work with)
- `pricing.html` — Packages (starter tiers, each linking to its own detail page)
  - `signal.html`, `frequency.html`, `broadcast.html` — package detail pages
- `insights.html` — Insights (blog-style notes, each linking to its own article)
  - `google-business-profile.html`, `social-tune-up.html`, `website-brief.html` — full articles
- `contact.html` — Contact (form + details)
- `404.html` — Custom not-found page (Cloudflare Pages serves this automatically for unmatched routes)

## Shared files

- `styles.css` — all styling, referenced by every page
- `script.js` — nav toggle, tuning-dial readout, stat counters, GSAP animations
- `robots.txt`, `sitemap.xml` — basic SEO setup

## Deploying to Cloudflare Pages

1. Push this folder to a Git repo (GitHub/GitLab) and connect it in the Cloudflare Pages dashboard, **or** drag-and-drop the folder directly into Pages' "Direct Upload" option.
2. Build settings: none needed — this is a static site. Leave the build command empty and set the output directory to `/` (the project root).
3. Once deployed, Cloudflare gives you a `*.pages.dev` URL. You can attach a custom domain afterwards under the project's "Custom domains" tab.

## Before you go live — things to update

- **Domain**: `robots.txt` and `sitemap.xml` currently use `https://www.fairspinedigital.com/` as a placeholder. Update both files once you know your real domain.
- **Social links**: the footer's Facebook/Instagram/LinkedIn/X icons currently link to `#`. Swap in your real profile URLs.
- **Contact form**: the form on `contact.html` is wired up in `script.js` but has no backend — it currently just shows an alert. Point the form at a service like Formspree, or a Cloudflare Pages Function/Worker, to actually receive messages.
- **Insights links**: the "Read more →" links on `insights.html` now point to full articles (`google-business-profile.html`, `social-tune-up.html`, `website-brief.html`). Add new articles the same way and link them from `insights.html`.
- **GSAP**: loaded from a CDN (cdnjs), so no install step needed — it'll just work once the site is live.
