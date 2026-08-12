/* ===========================================================================
   Lane 03 — Nočná destilácia / night still
   Scene: someone scrolls on a phone late at night in an unlit room, the screen
   the only light in it. Theatrical, product-forward, one idea per fold.
   Voice words: still, charged, close.
   Reference objects: a copper still in an unlit hall, a cellar shelf caught by
   a single lamp.
   Colour: drenched. The surface IS the colour — juniper so dark it reads black
   until something lime lands on it. Not the category reflex: no amber, no gold,
   no black-and-brass.
   Type: Darker Grotesque set enormous, Chivo for anything that must be read.
   =========================================================================== */

import {
  site, hero, facts, about, brands, brandsMeta, products, shelf, makers,
  downloads, contact,
} from '../content.mjs'
import {
  page, fontFace, fbIcon, arrowIcon, footerBlocks, disclaimerMarkup, navList,
  localeStrip, bottleSrc, brandSrc,
} from '../partials.mjs'

const ft = footerBlocks()

export default function noc() {
  const body = `
<header class="hdr" id="top">
  <div class="wrap hdr__in">
    <a class="hdr__mark" href="#top" aria-label="Gurlex, domovská stránka">
      <img src="../assets/brand/gurlex-wordmark-noc.webp" alt="Gurlex" width="238" height="29">
    </a>

    <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>

    <nav class="nav" id="nav" aria-label="Hlavná navigácia">
      <ul class="nav__list">
        ${navList()}
      </ul>
      <div class="hdr__aside">
        ${localeStrip()}
        <a class="social" href="${site.facebook}" rel="noopener" aria-label="Facebook">${fbIcon(17)}</a>
      </div>
    </nav>
  </div>
</header>

<main id="main">

  <!-- ── hero: one fold, one object ───────────────────────────────────── -->
  <section class="hero">
    <div class="hero__stage">
      <figure class="hero__object">
        <picture>
          <source srcset="../assets/bottle-hero.avif" type="image/avif">
          <img src="../assets/bottle-hero.webp" alt="${hero.bottleAlt}"
               width="480" height="751" fetchpriority="high" decoding="async">
        </picture>
      </figure>

      <div class="hero__copy">
        <p class="kicker" data-reveal><span class="kicker__bar" aria-hidden="true"></span>${hero.kicker} <span class="num">${hero.since}</span></p>
        <h1 class="hero__h">
          <span class="line" data-reveal>${hero.lines[0]}</span>
          <span class="line line--lit" data-reveal>${hero.lines[1]}</span>
          <span class="line" data-reveal>${hero.lines[2]}</span>
        </h1>
      </div>
    </div>

    <div class="wrap hero__under">
      <p class="hero__lede" data-reveal>${hero.lede}</p>
      <div class="hero__cta" data-reveal>
        <a class="btn btn--primary" href="#znacky">${hero.ctaPrimary}</a>
        <a class="btn btn--quiet" href="${site.catalogPdf}">${hero.ctaSecondary}<span class="btn__tag">PDF</span></a>
      </div>
    </div>

    <dl class="wrap facts">
      ${facts
        .map(
          (f) => `<div class="fact" data-reveal>
        <dd class="${f.num ? 'num' : ''}"${f.num ? ` data-count="${f.num}"` : ''}>${f.v}</dd>
        <dt>${f.k}</dt>
      </div>`
        )
        .join('\n      ')}
    </dl>
  </section>

  <!-- ── shelf: bottles caught by the light ───────────────────────────── -->
  <section class="shelf" aria-labelledby="shelf-h">
    <div class="wrap">
      <h2 class="sr" id="shelf-h">Vybrané z portfólia</h2>
      <ul class="shelf__row">
        ${shelf
          .map(
            (b) => `<li data-reveal>
          <img src="${bottleSrc(b.file)}" alt="${b.alt}" width="400" height="800" loading="lazy" decoding="async">
        </li>`
          )
          .join('\n        ')}
      </ul>
      <span class="shelf__line" aria-hidden="true"></span>
    </div>
  </section>

  <!-- ── about ────────────────────────────────────────────────────────── -->
  <section class="about" id="o-nas" aria-labelledby="about-h">
    <div class="wrap about__in">
      <p class="sec-n num" aria-hidden="true">01</p>
      <h2 id="about-h" data-reveal>${about.heading}</h2>
      <div class="about__body">
        <p class="lead" data-reveal>${about.paras[0]}</p>
        ${about.paras
          .slice(1)
          .map((p) => `<p data-reveal>${p}</p>`)
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ── brands: labels on a dark shelf ──────────────────────────────── -->
  <section class="brands" id="znacky" aria-labelledby="brands-h">
    <div class="wrap">
      <div class="brands__head">
        <div>
          <p class="sec-n num" aria-hidden="true">02</p>
          <h2 id="brands-h" data-reveal>${brandsMeta.heading}</h2>
        </div>
        <p class="brands__note" data-reveal>${brandsMeta.note}</p>
      </div>

      <ul class="labels">
        ${brands
          .map(
            (b, i) => `<li class="label" data-reveal>
          <a href="https://www.gurlex.sk/produkty/${b.slug}">
            <span class="label__n num">${String(i + 1).padStart(2, '0')}</span>
            <span class="label__plate">
              <img src="${brandSrc(b.slug)}" alt="${b.alt || b.name}" width="240" height="150" loading="lazy" decoding="async">
            </span>
            <span class="label__name">${b.name}</span>
            <span class="label__meta">
              <span class="label__c num">${products(b.n)}</span>
              ${b.ext ? `<span class="label__ext">${b.ext}</span>` : ''}
            </span>
          </a>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>

  <!-- ── makers ───────────────────────────────────────────────────────── -->
  <section class="mk" id="vyrobcovia" aria-labelledby="mk-h">
    <div class="wrap">
      <p class="sec-n num" aria-hidden="true">03</p>
      <h2 id="mk-h" data-reveal>${makers.heading}</h2>
      <div class="mk__row">
        ${makers.items
          .map(
            (m) => `<a class="mk__card" href="${m.url}" rel="noopener" data-reveal>
          <span class="mk__plate"><img src="../assets/brand/${m.logo}.webp" alt="${m.alt}" width="300" height="120" loading="lazy" decoding="async"></span>
          <span class="mk__txt">
            <strong class="mk__name">${m.name}</strong>
            <span class="mk__desc">${m.desc}</span>
            <span class="mk__go">${m.host} ${arrowIcon()}</span>
          </span>
        </a>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ── downloads ────────────────────────────────────────────────────── -->
  <section class="dl" id="na-stiahnutie" aria-labelledby="dl-h">
    <div class="wrap">
      <p class="sec-n num" aria-hidden="true">04</p>
      <h2 id="dl-h" data-reveal>${downloads.heading}</h2>
      <ul class="dl__list">
        ${downloads.items
          .map(
            (d) => `<li data-reveal>
          <a href="${d.url}">
            <span class="dl__name">${d.name}</span>
            <span class="dl__kind">${d.kind}</span>
            <span class="dl__go" aria-hidden="true">${arrowIcon()}</span>
          </a>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>

</main>

<!-- ── footer ─────────────────────────────────────────────────────────── -->
<footer class="ft" id="kontakt">
  <div class="wrap">
    <div class="ft__head">
      <p class="sec-n num" aria-hidden="true">05</p>
      <h2>${contact.heading}</h2>
    </div>

    <div class="ft__grid">
      <div class="ft__col">
        <h3>Adresa</h3>
        ${ft.address}
      </div>
      <div class="ft__col">
        <h3>Telefón</h3>
        ${ft.phone}
        <h3 class="sp">Fax</h3>
        ${ft.fax}
      </div>
      <div class="ft__col">
        <h3>E-mail</h3>
        ${ft.email}
        <h3 class="sp">Sociálne siete</h3>
        ${ft.social}
      </div>
      <div class="ft__col">
        <h3>Krajiny</h3>
        ${ft.locales}
      </div>
    </div>

    <p class="ft__resp">${ft.responsibility}</p>

    <div class="ft__base">
      ${ft.base}
      ${ft.credit}
    </div>

    ${disclaimerMarkup()}
  </div>
</footer>`

  return page({
    lane: 'noc',
    themeColor: '#0d1a14',
    preload: ['darker-grotesque-latin.woff2', 'chivo-latin.woff2'],
    fontCss: [
      fontFace('Darker', 'darker-grotesque', { weight: '300 900' }),
      fontFace('Chivo', 'chivo', { weight: '300 900' }),
    ].join('\n'),
    body,
  })
}
