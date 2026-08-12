# Gurlex.sk — redesign concepts

Four independent design directions for the [www.gurlex.sk](https://www.gurlex.sk/)
homepage, plus the earlier concept kept for comparison. Built as a presentation
piece for a work proposal.

**Live:** https://semjuel19.github.io/gurlex-redesign-concept/

> **Not an official site.** This is an unofficial redesign concept. All content,
> brands and logos belong to Gurlex s.r.o. and its suppliers. Every page is
> marked as a concept and carries `<meta name="robots" content="noindex">`.

---

## The five versions

| | Direction | Theme | Colour strategy | Type |
|---|---|---|---|---|
| 01 | [Karpatský chlad](chlad/) — alpine cold | light | committed: snow + spruce, one rescue-orange signal | Familjen Grotesk |
| 02 | [Ovocný sad](sad/) — the orchard | light | full palette: plum, juniper, pear, damson | Bricolage Grotesque + Hanken Grotesk |
| 03 | [Nočná destilácia](noc/) — night still | dark | drenched: juniper-black + electric lime | Darker Grotesque + Chivo |
| 04 | [Distribučný stroj](stroj/) — the machine | dark | committed: graphite + safety yellow | Anybody (width axis) + Chivo |
| 05 | [Modrá v1](v1/) — first concept | dark | drenched: corporate blue | Archivo |

All five carry **identical content**: the age gate, full navigation, the four
locale links, the five company paragraphs, all 20 brands with their real product
counts and own domains, both producers, the three downloads, and the complete
contact block. Only the presentation differs.

The clearest difference between them is how each one handles the 20 brands, which
is the real design problem on this page — twenty logos with twenty different
identities, colours and aspect ratios:

- **01** an index of routes: hairline rows, number, name, own site, count
- **02** crates: light plates with a fruit-coloured band, four tiles breaking the grid
- **03** labels on a dark shelf: the only light surfaces on the page
- **04** an actual data table with a header, alternating rows and a total

Each lane also picks its own scene, and the scene decided the theme rather than
taste. Lane 01 is a Tatras hotel buyer at 9am with snow-glare off the window;
lane 03 is someone on a phone at night with the screen as the only light source.

## Repository layout

```
index.html          the chooser (generated)
picker.css
chlad/  sad/  noc/  stroj/     index.html (generated) + lane.css + lane.js
v1/                 the earlier concept, unchanged apart from asset paths
shared/base.css     reset, a11y utilities, age-gate mechanics
shared/switcher.css the version switcher (separate so v1 can use it alone)
shared/site.js      age gate, navigation, and the Motion wrapper
lib/motion.min.js   Motion, tree-shaken to the APIs used (73 KB, 27 KB gzipped)
assets/             fonts, brand marks, product shots, cut-outs
build/              content.mjs, partials.mjs, lanes/*.mjs, build.mjs
```

## Building

The published site has **no build step** — it is static HTML, CSS and one JS
file. The build script exists only so the shared content is written once instead
of four times:

```bash
node build/build.mjs
```

It writes `index.html` and each `<lane>/index.html`, then fails loudly if any
page references a local file that is not on disk. `build/content.mjs` is the
single source of every word and number; `build/lanes/*.mjs` decide the markup.

Editing a lane's `lane.css` or `lane.js` needs no rebuild. Editing copy or
structure does.

## Notes on the implementation

**Motion.** Animation uses [Motion](https://motion.dev) (motion.dev), the engine
behind Framer Motion, via its vanilla API — so there is no React and no build
step, but real spring physics, stagger and scroll-linked motion. It is bundled
down to only the imported functions and self-hosted.

Everything is progressive enhancement. The pages are complete and readable with
scripting off, and `shared/site.js` holds three guarantees that matter more than
they look:

- Choreography is **held until the document is actually visible**. A page opened
  in a background tab never advances a frame, so an animation started there sits
  on its first keyframe indefinitely — and with `opacity: 0` as that keyframe,
  that is an invisible page.
- If nothing has started a few seconds in, the hidden state is dropped entirely:
  a dead or unsupported observer must never cost the visitor the content.
- Recovering an element **completes its animation** rather than just clearing the
  inline styles, because an abandoned animation still owns the property and
  writes its start value back on the next tick.

**Product shots.** The supplied shots are opaque, on white. That only composites
cleanly with `mix-blend-mode: multiply`, which silently stops working inside any
ancestor that has a transform, an opacity or a filter — i.e. every card that
lifts on hover and every element that animates in. So the background is keyed out
at build time instead (flood fill from the frame edge, since these are clear
glass and the labels are white), and `assets/cut/` holds the results. They then
work unchanged on light and dark surfaces.

**Type.** Self-hosted, split `latin` / `latin-ext` so Slovak diacritics never
fall back mid-word, and subsetted to the character sets of all four locales
(sk, cs, pl, hu) rather than to this demo's copy. Unused variable axes are
pinned: 631 KB → 294 KB across seven faces.

Slovak stacks ´ ˇ ˆ ° above capitals, so no heading anywhere goes tighter than
`line-height: 1.05`. Below that the accents collide with the line above — a bug
you only see in this language.

**Accessibility.** Verified on every lane at 1440px and 390px: one `<h1>` per
page, no heading-level jumps, no text under WCAG AA contrast (measured by
resolving the computed `oklch()` colours through a canvas, since parsing them as
RGB gives nonsense ratios), tap targets at least 24×24 except inline sentence
links, no horizontal overflow, and nothing left invisible by the reveal system.
`prefers-reduced-motion: reduce` disables all choreography and settles every
element in its final state.

**Weight.** Code and fonts delivered per lane, against the current site's
9,818 KB / 49 requests:

| lane | code + fonts | of which fonts |
|---|---|---|
| chlad | 63 KB | 17 KB |
| noc | 96 KB | 50 KB |
| stroj | 127 KB | 82 KB |
| sad | 142 KB | 97 KB |

Plus one 31 KB AVIF hero. Every other image is lazy-loaded.

## What this is not

A production build. The age gate is client-side only (in production it belongs
server-side so deep links cannot bypass it), there is no CMS, the four locales
are linked but not translated, and no e-commerce is implemented — though each
direction leaves room for price, availability and a cart, which is the next phase.
