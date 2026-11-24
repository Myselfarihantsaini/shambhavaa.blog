# shambhavaa.blog

The Shambhavaa Vedic astrology journal. A static Next.js site, built from Markdown files and published on GitHub Pages at **https://shambhavaa.blog**. Consultations link to **https://shambhavaa.com**.

## Daily use

| I want to… | Read |
| --- | --- |
| Write or edit an article from the browser | [docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) |
| Know how an article should be structured | [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) |
| Finish Google / AdSense setup | [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md) |
| Get more visitors and backlinks | [docs/GROWTH-AND-BACKLINKS.md](docs/GROWTH-AND-BACKLINKS.md) and [docs/OUTREACH-KIT.md](docs/OUTREACH-KIT.md) |

## How it works

```
content/<section>/<slug>.md   →  https://shambhavaa.blog/<section>/<slug>/
public/images/...             →  https://shambhavaa.blog/images/...
public/admin/                 →  the editor at /admin/
src/config/site.js            →  booking link, social links, AdSense slots, menu
```

Every push to `main` runs `.github/workflows/deploy.yml`: it checks the content, builds the site and publishes it. Pull requests are built but not published.

## Run on your computer

```bash
npm ci
npm run dev        # http://localhost:3000 (editor: /admin/ → "Work with Local Repository")
npm run build      # full static build into out/
npm run check      # only check articles (titles, dates, summaries, images)
npm run images     # shrink oversized images in public/images
```

Node.js 22 is recommended.

## Where things are

- `src/app/` — page templates (home, section, article, tag, search, policies, sitemap, RSS, robots)
- `src/components/` — header, footer, cards, booking box, cookie banner, ad slots
- `src/lib/posts.js` — reads the Markdown files
- `src/lib/seo.js` — metadata and structured data (schema.org)
- `src/styles/globals.css` — the whole design
- `public/tools/` — the kundli generator and perfume oracle (standalone pages)
