# Boomerang Media website

Plain HTML, CSS and JavaScript. No build step. Works on GitHub Pages, Netlify, Vercel or any web host.

## Structure
```
index.html              home page
work.html               all projects
privacy.html            (keep your existing one; it should use the same header/footer pattern)
projects/<slug>.html    one page per client
projects/_template.html copy this for each new client
js/data.js              SETTINGS + client list  <- the only file you edit to add a client
js/site.js, home.js     scripts (don't need editing)
css/                    styles (site.css shared, home.css, pages.css)
partials/header.html    the menu, written once for every page
partials/footer.html    the footer, written once for every page
assets/site/            website images/videos (showreel, about photo, og.jpg)
assets/projects/<slug>/ client images/videos
sitemap.xml, robots.txt
```

## Add a new client (about 10 minutes)
1. Pick a slug, e.g. `acme`.
2. Copy `projects/_template.html` to `projects/acme.html`. Search the file for `client-slug` and replace with `acme`, then fix the name, industry, services, and summary.
3. Create `assets/projects/acme/` and upload `cover.jpg` and gallery files. Uncomment the image/video lines in the page and delete the grey placeholder boxes.
4. Open `js/data.js` and add one line to `projects`:
   `{ slug: 'acme', name: 'Acme', cat: 'corporate', featured: false, cover: 'cover.jpg' },`
5. Commit. The card, filters, home grid and "next project" links update by themselves. Add the page to `sitemap.xml`.

## Add a new industry
Add a line to `categories` in `js/data.js`, then use its slug in `cat`.

## Settings (js/data.js)
WhatsApp number, form endpoint (Formspree/Web3Forms), Google Tag Manager ID, social links, testimonials. Leave a value empty to hide that feature.

## Publishing on GitHub Pages
1. Upload all files to a repo, then Settings > Pages > deploy from the `main` branch.
2. Add your custom domain `boomerangmedia.me` there. Links use root paths (`/css/...`), so the site must be served from the domain root. A `username.github.io/repo/` address will show broken styles.
3. Do not add a `.nojekyll` file: GitHub then ignores `projects/_template.html`, which is what you want.

## Testing locally
The header and footer load with JavaScript, so opening the files by double-click won't work. Use VS Code "Live Server" or run `npx serve` in this folder.

## Before going live
- Every project page still has grey placeholder boxes until you add real media.
- Set the WhatsApp number and form endpoint in `js/data.js`.
- Add `assets/site/og.jpg`.
