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

## The design problem

Gurlex distributes **20 brands whose packaging actively clashes**: folk-illustrated blue Goral, black-and-gold Tatra Balsam, kosher Spišská, hot-pink Fruxi, gilded Napoleon. A site that adds its own decoration ends up fighting all twenty at once. The current site buries them under Bootstrap chrome.

Two decisions follow from that:

1. **The interface never uses colour.** The page is drenched in Gurlex's own blue; the products are the only things allowed to carry colour. The one bright block on the page is the brand index.
2. **The layout is structural, not decorative.** A visible hairline column grid runs the full page like a drafting sheet, content is full-bleed rather than boxed in a centred container, and display type is cropped by the viewport edge. It should look engineered, not styled.

### The brand index is information design, not a card grid

The centrepiece is a mosaic where **cell size encodes catalogue depth**, using the real product counts scraped from the live site:

| Tier | Products | Cell |
|---|---|---|
| Darčekové balenia, Nestville Whisky | 49, 22 | 2 × 2 |
| Gur.men, Fruxi, Brands, Familia, Goral | 17 → 10 | 2 × 1 |
| the remaining 13 brands | 8 → 1 | 1 × 1 |

Cells share 1px seams with no gutters, no rounded corners and no shadows. The asymmetry carries meaning, which is what keeps it from being the uniform card grid it replaces.

## Design system

- **Colour.** Committed/drenched strategy in OKLCH, built around the brand's existing `#0033ab`. Nothing is `#000` or `#fff`; every neutral is tinted toward the brand hue. The warm vermilion accent comes from the red "Gr" already in the Gurlex wordmark, so the cold blue gets a counterpoint that is part of the identity rather than invented. A separate darkened token (`--accent-on-light` / `--accent-dk`) exists because the base accent only reaches 2.9:1 on the frost surfaces.
- **Type.** One family, [Archivo](https://fonts.google.com/specimen/Archivo) variable, using its **width axis** as voice: 125% expanded for display, 66% condensed for metadata, 100% for body. Weight runs 200 → 800. Industrial-signage precision rather than the heritage-serif reflex that spirits brands default to. Self-hosted WOFF2, latin + latin-ext subsets, no third-party font CDN.
- **Scale.** Roughly 8× between the display word and the metadata, with section headings at `clamp(2.6rem, …, 7rem)` so the page keeps commanding attention after the fold.
- **Slovak typography.** Headings never go below `line-height: 1.06`. Slovak stacks ´ ˇ ˆ ° above capitals, and tighter leading makes accents collide with the line above. This was a real bug, caught in review at `line-height: 0.9`.
- **Motion.** Entrance motion is **native CSS scroll-driven animation** (`animation-timeline: view()`): section headings calibrate from condensed to expanded as they enter, like an instrument settling. Zero JavaScript, and because it only animates `font-stretch`, a browser without support simply renders the final state. Plus a portfolio ticker and a drag-scrollable product rail. All of it sits behind `prefers-reduced-motion`.
- **Depth.** The hero bottle is a real transparent cut-out that bleeds past the sheet edge, with the display word crossing *in front* of it. The footer closes with the wordmark cropped by the bottom edge.

---

## Measured, same content

Every piece of content from the current homepage is carried over: age gate, full navigation, four country locales, the five company paragraphs, all 20 brands, both producers, all three downloads, and the complete contact block. Nothing was dropped to make the design easier.

| | Current gurlex.sk | This concept |
|---|---|---|
| Page weight (first load) | **9,818 KB** | **271 KB** |
| Requests | 49 | 8 |
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

Page weight was measured from `performance.getEntriesByType('resource')` on both sites. Of the 271 KB here, ~176 KB is the self-hosted variable font, a deliberate trade to remove all third-party CDN and Google Fonts dependencies.

## Accessibility

- **All 35 sampled text/background pairs pass WCAG AA contrast**, verified by converting the OKLCH values to relative luminance in code rather than eyeballing them.
- One `<h1>`, no skipped heading levels, landmarks throughout.
- Age gate is a real `role="dialog"` with `aria-modal`, a focus trap, a synchronous focus move, and a decline path (the current site offers only "I am over 18").
- Nav and disclosure menus use `aria-expanded` / `aria-controls`, work by keyboard, and close on Escape and outside click.
- The ticker's duplicated copy is `aria-hidden`, so screen readers and crawlers see the brand list once.
- Skip link, visible focus rings, 24px+ targets for standalone links. The two sub-24px links that remain are inline links inside sentences, which WCAG 2.2 SC 2.5.8 exempts.
- Single correct viewport meta, so pinch-zoom works. The current site ships two, the second disabling zoom.
- `prefers-reduced-motion` disables the ticker, the scroll-driven calibration and all transitions.
- Content never depends on JavaScript to become visible. Without JS the page renders in full; the nav degrades to a visible list.

### Bugs found and fixed during review

Worth listing, because they are the kind of thing that ships silently:

1. **`line-height: 0.9` broke Slovak diacritics** — É, Á, Ú collided with the line above.
2. **The age gate was not actually a modal.** A `body > *:not(…)` rule outranked `.gate`'s own `position: fixed` on specificity and silently turned the overlay into an in-flow block, leaving the header visible below it.
3. **Horizontal overflow on mobile** (417px in a 390px viewport) from the deliberately-bleeding display word. Fixed with `overflow-x: clip`, not `hidden`, so the sticky header keeps working.
4. **Silhouetting the brand logos destroyed them.** An earlier pass unified the clashing logos to monochrome silhouettes and revealed colour on hover; on complex artwork like Gur.men and Fruxi this produced unreadable grey blobs. Reverted: logos stay full-colour and the mosaic's asymmetry does the unifying instead.
5. **Optical misalignment in the index** where only some brands have an external-site line. Fixed with explicit grid rows that reserve the track.
6. **JPEG logos showed white boxes** on the light cells; `mix-blend-mode: multiply` dissolves the studio background into the surface.

---

## Stack

Deliberately dependency-free: hand-written HTML, CSS and ~160 lines of vanilla JS. No framework, no build step, no `npm install`. It deploys as static files and demonstrates the performance argument without any tooling to explain.

For production the recommendation is different: **Next.js + Payload CMS + Postgres**, so the content is editable, the four locales share one codebase, and the product model is structured for e-commerce later. This repo is the visual and technical proof, not the proposed architecture.

## Run locally

```bash
git clone git@github.com:Semjuel19/gurlex-redesign-concept.git
cd gurlex-redesign-concept
python3 -m http.server 4173
# open http://localhost:4173
```

Any static server works. There is nothing to build.

The age gate persists its answer in `localStorage`. Use the **"Zobraziť vekovú bránu znova"** button in the footer to reset it when demoing. In production this check belongs server-side so deep links cannot bypass it, which is how the current site does it and one of the few things it gets right.

## Files

```
index.html   markup, metadata, structured data
styles.css   design tokens, grid system, all styling
app.js       age gate, nav disclosures, ticker clone, drag rail
assets/
  fonts/     Archivo variable, latin + latin-ext WOFF2
  brands/    20 brand logos (WebP)
  bottles/   6 product shots for the drag rail (WebP)
  brand/     wordmark + two producer logos (WebP)
  bottle-hero.{avif,webp}
```
