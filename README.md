# Gurlex.sk — redesign concept

A single-page redesign concept for the homepage of **[gurlex.sk](https://www.gurlex.sk/)**, a Slovak spirits distributor. Built as a demonstration piece for a redesign proposal.

**→ Live demo: https://semjuel19.github.io/gurlex-redesign-concept/**

---

## ⚠️ Not an official site

This is an **unofficial design concept**, produced independently as a work sample. It is not affiliated with, endorsed by, or commissioned by Gurlex s.r.o.

- All brand names, logos and product photography belong to **Gurlex s.r.o.** and its suppliers (GAS FAMILIA s.r.o., BGV s.r.o., Nestville Distillery). They are reproduced here only to illustrate a proposed redesign of that company's own site.
- Existing brand graphics are credited on the live site to **Roman Janovský**; that credit is preserved in the footer.
- The live, official site is **[www.gurlex.sk](https://www.gurlex.sk/)**.

If a rights holder wants this taken down, open an issue and it will be removed.

---

## What this demonstrates

Every piece of content from the current homepage is carried over: the age gate, full navigation, four country locales, the five company paragraphs, all 20 brands, both producers, all three downloads, and the complete contact block. Nothing was dropped to make the design easier.

The point is that the same content can be presented far better, and measurably lighter.

### Measured, same content

| | Current gurlex.sk | This concept |
|---|---|---|
| Page weight (first load) | **9,818 KB** | **237 KB** |
| Requests | 49 | 6 |
| Largest single image | 2,943 KB | 57 KB |
| Modern image formats | none | AVIF + WebP |
| Lazy loading | none | 28 of 31 images |
| `<h1>` on the page | **none** | 1 |
| Meta description | empty | written |
| Open Graph tags | 0 | 7 |
| JSON-LD structured data | none | `Organization` |
| `hreflang` for 4 domains | none | 5 entries |
| Canonical URL | none | yes |
| Images missing `alt` | 23 | 0 |
| Pinch-zoom | **blocked** | enabled |
| Third-party CDNs | 5 | 0 |
| jQuery / Bootstrap | 2018 versions | none |

Page weight was measured from `performance.getEntriesByType('resource')` on both sites. Of the 237 KB here, ~176 KB is the self-hosted variable font, a deliberate trade to remove all third-party CDN and Google Fonts dependencies.

### Accessibility

- All 25 sampled text/background pairs pass WCAG AA contrast, verified by computing relative luminance directly from the OKLCH values rather than eyeballing it. The warm accent needed a separate darkened token (`--accent-on-light`) for use on the light tiles, where the base accent only reached 2.9:1.
- One `<h1>`, no skipped heading levels.
- Age gate is a real `role="dialog"` with `aria-modal`, a focus trap, synchronous focus move, and a decline path (the current site offers only "I am over 18").
- Nav and disclosure menus use `aria-expanded` / `aria-controls`, work by keyboard, and close on Escape and outside click.
- Skip link, visible focus rings, 24px+ targets for standalone links. The two sub-24px links that remain are inline links inside sentences, which WCAG 2.2 SC 2.5.8 exempts.
- Single correct viewport meta, so pinch-zoom works. The current site ships two, the second disabling zoom.
- `prefers-reduced-motion` honoured.
- Content never depends on JavaScript to become visible: reveal animations are opt-in (`html.anim`), added by JS only once it can also undo them, with a timeout and `visibilitychange` safety net. Without JS the page renders fully.

---

## Design notes

**The problem.** Gurlex distributes 20 brands whose packaging designs actively clash: folk-illustrated blue Goral, black-and-gold Tatra Balsam, kosher Spišská, hot-pink Fruxi. A site that adds its own decoration fights all twenty at once. The current site buries them under Bootstrap chrome.

**The idea.** Drench the page in Gurlex's own blue and make the **brand tiles the only light surfaces on the entire page**, so the products are literally the only things that light up. Colour comes from the bottles, never from the interface.

- **Colour.** Committed/drenched strategy in OKLCH, built around the brand's existing `#0033ab`. Nothing is `#000` or `#fff`; every neutral is tinted toward the brand hue. The warm vermilion accent is taken from the red "Gr" in the existing Gurlex wordmark, giving the cold blue a counterpoint that is already part of the identity.
- **Type.** One family, [Archivo](https://fonts.google.com/specimen/Archivo) variable, using its **width axis** as voice: expanded 118% for display, 88% semi-condensed for labels, 100% for body. Industrial-signage precision rather than the heritage-serif reflex that spirits brands default to. Self-hosted WOFF2, latin + latin-ext subsets.
- **Slovak typography.** Headings never go below `line-height: 1.06`. Slovak stacks ´ ˇ ˆ ° above capitals, and tighter leading makes accents collide with the line above. This was a real bug caught in review at `line-height: 0.9`.
- **Layout.** Asymmetric, not centred stacks. Section heads sit in a narrow sticky rail with a numbered catalogue index (01–05), because a distributor's site *is* a catalogue. Brand tiles use explicit grid rows so the number, logo, name, count and external-site line stay aligned across a row whether or not a brand has an external site.
- **Imagery.** The hero bottle is a real transparent cut-out from the client's own assets. The bright shelf band uses six real product shots with `mix-blend-mode: multiply`, which dissolves their white studio backgrounds into the frost surface.
- **Motion.** One orchestrated entrance with staggered reveals, exponential ease-out, transform and opacity only, fully disabled under reduced-motion.

Product counts on each tile (2, 12, 49...) are real, scraped from the live site: 196 products across 20 brands.

---

## Stack

Deliberately dependency-free: hand-written HTML, CSS and ~150 lines of vanilla JS. No framework, no build step, no npm install. It deploys as static files and demonstrates the performance argument without any tooling to explain.

For production the recommendation is different: **Next.js + Payload CMS + Postgres**, so the content is editable, the four locales share one codebase, and the product model is structured for e-commerce later. This repo is the visual and technical proof, not the proposed architecture.

## Run locally

```bash
git clone git@github.com:Semjuel19/gurlex-redesign-concept.git
cd gurlex-redesign-concept
python3 -m http.server 4173
# open http://localhost:4173
```

Any static server works. There is nothing to build.

The age gate persists its answer in `localStorage`. Use the **"Zobraziť vekovú bránu znova"** button in the footer to reset it when demoing. In production this check belongs server-side, so that deep links cannot bypass it, which is how the current site does it and one of the few things it gets right.

## Files

```
index.html   markup, metadata, structured data
styles.css   design tokens + all styling
app.js       age gate, nav disclosures, reveal observer
assets/
  fonts/     Archivo variable, latin + latin-ext WOFF2
  brands/    20 brand logos (WebP)
  bottles/   6 product shots for the shelf band (WebP)
  brand/     wordmark + two producer logos (WebP)
  bottle-hero.{avif,webp}
```
