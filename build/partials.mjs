/* Markup shared by every lane: document head, age gate, variant switcher.
   Structure only. Each lane owns the surfaces, type and colour. */

import { site, locales, gate, nav, contact, disclaimer, lanes, jsonLd } from './content.mjs'

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* Fonts are self-hosted and split latin / latin-ext so Slovak diacritics
   (č š ž ť ď ľ ň ô ŕ) never fall back to a system face mid-word. */
export const fontFace = (family, slug, { weight = '100 900', stretch, display = 'swap' } = {}) => {
  const ranges = {
    latin:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    'latin-ext':
      'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  }
  return Object.entries(ranges)
    .map(
      ([subset, range]) => `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: ${weight};${stretch ? `\n  font-stretch: ${stretch};` : ''}
  font-display: ${display};
  src: url('../assets/fonts/${slug}-${subset}.woff2') format('woff2');
  unicode-range: ${range};
}`
    )
    .join('\n')
}

export function head({ lane, themeColor, preload = [], css = ['lane.css'] }) {
  const l = lanes.find((x) => x.id === lane)
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<link rel="canonical" href="${site.canonical}">

${locales
  .map((x) => `<link rel="alternate" hreflang="${x.hreflang}" href="${x.url}">`)
  .join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.canonical}">

<meta property="og:type" content="website">
<meta property="og:locale" content="sk_SK">
<meta property="og:site_name" content="Gurlex s.r.o.">
<meta property="og:title" content="${esc(site.title)}">
<meta property="og:description" content="${esc(site.ogDescription)}">
<meta property="og:image" content="../assets/og-image.png">
<meta property="og:image:alt" content="Gurlex, distribútor slovenských liehovín">
<meta name="twitter:card" content="summary_large_image">

<meta name="theme-color" content="${themeColor}">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<meta name="robots" content="noindex">

${preload
  .map(
    (f) =>
      `<link rel="preload" href="../assets/fonts/${f}" as="font" type="font/woff2" crossorigin>`
  )
  .join('\n')}
<link rel="stylesheet" href="../shared/base.css">
<link rel="stylesheet" href="../shared/switcher.css">
${css.map((f) => `<link rel="stylesheet" href="${f}">`).join('\n')}

<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
<!-- Design lane ${l.n}: ${l.name} (${l.gloss}) -->`
}

/* Asset paths.
   The studio shots ship on an opaque white background, which only composites
   cleanly with mix-blend-mode: multiply — and that silently stops working
   inside any ancestor that gets a transform, an opacity or a filter, which is
   every card that lifts on hover and every element that animates in. So the
   background is keyed out at build time instead and these paths point at the
   cut-out copies. assets/cut only holds the files that needed it; everything
   else already had an alpha channel. */
const CUT_BRANDS = new Set(['darceky', 'noblemen-collection', 'spis-original-1343'])
export const bottleSrc = (file) => `../assets/cut/bottles/${file}.webp`
export const brandSrc = (slug) =>
  CUT_BRANDS.has(slug) ? `../assets/cut/brands/${slug}.webp` : `../assets/brands/${slug}.webp`

export const fbIcon = (size = 18) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" width="${size}" height="${size}"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2V9.9H7.45V13h2.72v8h3.33z"/></svg>`

export const chevIcon = () =>
  `<svg class="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`

export const arrowIcon = () =>
  `<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`

/* Primary navigation. One disclosure ("Na stiahnutie"), everything else a
   plain link. Identical markup across lanes; the styling diverges. */
export const navList = () =>
  nav
    .map((item) =>
      item.sub
        ? `<li class="nav__has-sub">
          <button type="button" class="nav__toggle" id="dl-toggle" aria-expanded="false" aria-controls="dl-menu">${item.label} ${chevIcon()}</button>
          <ul class="nav__sub" id="dl-menu">
            ${item.sub
              .map((s) => `<li><a href="${s.href}">${s.label}</a></li>`)
              .join('\n            ')}
          </ul>
        </li>`
        : `<li><a href="${item.href}">${item.label}</a></li>`
    )
    .join('\n        ')

export const localeStrip = () =>
  `<ul class="locales" aria-label="Jazyk">
${locales
  .map(
    (x) =>
      `          <li><a href="${x.url}"${
        x.current ? ' aria-current="true"' : ''
      } hreflang="${x.hreflang}">${x.code}</a></li>`
  )
  .join('\n')}
        </ul>`

/* Age gate. Markup is identical across lanes; the dialog is labelled by a
   <p>, not an <h1>, so each page keeps exactly one first-level heading. */
export function gateMarkup({ bottle = true } = {}) {
  return `<div class="gate" id="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-desc" hidden>
  <div class="gate__panel">
    <div class="gate__body">
      <p class="gate__kicker">${gate.kicker}</p>
      <p class="gate__title" id="gate-title">${gate.title}</p>
      <p class="gate__desc" id="gate-desc">${gate.desc}</p>
      <div class="gate__actions">
        <button class="btn btn--primary" id="gate-yes" type="button">${gate.yes}</button>
        <button class="btn btn--quiet" id="gate-no" type="button">${gate.no}</button>
      </div>
      <p class="gate__note">${gate.note}</p>
      <p class="gate__deny" id="gate-deny" role="status" tabindex="-1" hidden>${gate.deny}</p>
    </div>${
      bottle
        ? `
    <div class="gate__object" aria-hidden="true">
      <picture>
        <source srcset="../assets/bottle-hero.avif" type="image/avif">
        <img src="../assets/bottle-hero.webp" alt="" width="480" height="751" decoding="async">
      </picture>
    </div>`
        : ''
    }
  </div>
</div>`
}

/* Presentation affordance, not part of the design under review: lets the
   reviewer hop between lanes without going back to the index. */
export function switcherMarkup(active) {
  const short = { chlad: 'Chlad', sad: 'Sad', noc: 'Noc', stroj: 'Stroj', v1: 'Modrá' }
  return `<nav class="sw" aria-label="Verzie návrhu">
  <a class="sw__idx" href="../">Všetky verzie</a>
  <ul class="sw__list">
${lanes
  .map(
    (l) => `    <li><a href="../${l.id}/"${
      l.id === active ? ' class="is-on" aria-current="page"' : ''
    }><span class="sw__n">${l.n}</span>${short[l.id]}</a></li>`
  )
  .join('\n')}
  </ul>
</nav>`
}

/* Footer content, unwrapped. Lanes decide the shell and the order. */
export const footerBlocks = () => ({
  address: `<address>
  <strong>${contact.company}</strong><br>
  ${contact.street}<br>
  ${contact.zip} ${contact.city}<br>
  ${contact.country}
</address>`,
  phone: `<p>${contact.phones
    .map((p) => `<a href="${p.href}">${p.display}</a>`)
    .join('<br>')}</p>`,
  fax: `<p>${contact.fax}</p>`,
  email: `<p>${contact.emails
    .map((e) => `<a href="mailto:${e}">${e}</a>`)
    .join('<br>')}</p>`,
  social: `<p><a href="${site.facebook}" rel="noopener">Facebook</a></p>`,
  locales: `<ul class="ft__locales">
${locales
  .map(
    (x) =>
      `  <li><a href="${x.url}" hreflang="${x.hreflang}">${x.name}</a></li>`
  )
  .join('\n')}
</ul>`,
  responsibility: contact.responsibility,
  base: `<p>${contact.copyright}
  <a href="${site.privacy}">${contact.privacyLabel}</a>
</p>`,
  credit: `<p class="ft__credit">${contact.credit}</p>`,
})

export function disclaimerMarkup() {
  return `<aside class="concept">
  <p><strong>${disclaimer.strong}</strong> ${disclaimer.text}
    <a href="${site.canonical}">${disclaimer.liveLabel}</a>.</p>
  <button type="button" id="regate" class="concept__btn">${disclaimer.regate}</button>
</aside>`
}

export function page({ lane, themeColor, preload, body, fontCss = '', script = 'lane.js' }) {
  return `<!doctype html>
<html lang="${site.lang}" class="no-js" data-lane="${lane}">
<head>
${head({ lane, themeColor, preload })}
${fontCss ? `<style>\n${fontCss}\n</style>` : ''}
</head>
<body>

<a class="skip" href="#main">Preskočiť na obsah</a>

${gateMarkup()}

${body}

${switcherMarkup(lane)}

<script src="../lib/motion.min.js" defer></script>
<script src="../shared/site.js" defer></script>
<script src="${script}" defer></script>
</body>
</html>
`
}
