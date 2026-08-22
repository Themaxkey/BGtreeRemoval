# Bowling Green Tree Removal — Astro site

A static local-services site. Astro builds it to plain HTML, Cloudflare serves it,
GitHub stores it. There is no database, no PHP, no admin login and nothing to patch.

This repository is also the **template**. To launch a new market, copy it, edit
`site.config.ts`, replace the content in `src/content/`, and deploy.

---

## The one file that matters

`site.config.ts` holds everything that differs between one site and the next:
business name, phone, city, county, brand colors, the service list, the towns
served. Change it and the header, footer, internal links, schema, service grid
and town grid all follow.

## Where the words live

`src/content/` — plain markdown, one file per page.

| Folder | Pages | URL pattern |
|---|---|---|
| `pages/` | home, services, service-area, about, contact, faq, privacy-policy, sms-terms | `/`, `/about/` … |
| `services/` | 6 service pages | `/tree-removal/`, `/stump-grinding/` … |
| `towns/` | 12 town pages | `/tree-removal-oakland-ky/` … |
| `faqs/` | 6 FAQ pages | `/faq/how-long-does-tree-removal-take/` … |

Each file starts with a small block of front matter — `title` is the visible H1,
`seoTitle` is the browser/search-result title, `description` is the meta
description. The rest of the file is the page copy in markdown.

**To edit a page:** open its `.md` file, change the text, commit. That is the
whole workflow. You can do it in the GitHub web editor without installing
anything.

**To add a town:** add its slug and name to the `towns` array in
`site.config.ts`, then add a matching markdown file in `src/content/towns/`.
The page, the links to it, and its schema all appear automatically.

## What is generated rather than written

- Every internal link between services, towns and the hub pages
- `LocalBusiness` / `Service` / `FAQPage` / `WebSite` structured data
- The XML sitemap and `robots.txt`
- Canonical tags, Open Graph tags, robots meta
- The click-to-call button and every phone number on the site

## URL parity

All 32 URLs match the previous WordPress site exactly, trailing slashes included.
`astro.config.mjs` sets `trailingSlash: 'always'` — do not change this. The old
Rank Math sitemap address is redirected in `public/_redirects`.

## Running it locally (optional)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

You do not need to do this. Cloudflare runs the build itself on every push.

## Deploying

Cloudflare **Workers** (not Pages — Pages is in maintenance mode and Cloudflare
recommends Workers for new projects). Connected to this repository via Workers
Builds:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

`wrangler.jsonc` tells Cloudflare that `./dist` holds the static files. Requests
to static assets are free and unlimited on every plan tier.

Every push to `main` publishes. Every push to any other branch gets a preview
URL, which is the safe way to look at a change before it goes live.

## The contact form

`src/server/worker.ts` is the only server-side code here. Nearly every request
is a static file and passes straight through; the worker exists to catch
`POST /api/contact` and to redirect the old WordPress sitemap URL.

Set three variables in the Cloudflare dashboard (Settings, then Variables and
Secrets). `RESEND_KEY` should be added as a **secret**, the other two as plain
variables:

| Variable | Value |
|---|---|
| `LEAD_TO` | where leads should arrive |
| `LEAD_FROM` | a verified sender on your domain |
| `RESEND_KEY` | API key from resend.com (free tier covers 3,000/month) |

Until those are set the form returns a clear message telling the visitor to
call instead, and logs the submission so nothing is silently lost. The phone
number works regardless, and is the primary path anyway.

## Known things to fix

- `public/images/logo.png` has a solid light background rather than transparency.
  Replace it with a transparent PNG or an SVG.
- There is no `favicon.ico` yet; `BaseLayout.astro` references one.
- Three photographs are reused across six service cards. New images would help.
