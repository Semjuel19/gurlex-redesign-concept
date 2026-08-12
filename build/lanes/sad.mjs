/* ===========================================================================
   Lane 02 — Ovocný sad / the orchard
   Scene: a hotel food-and-beverage buyer browses on a tablet at home in the
   evening, late summer, unhurried, in the mood you get leafing through a seed
   catalogue. Light, warm, generous.
   Voice words: ripe, hand-made, plain-spoken.
   Reference objects: fruit-crate labels, a nursery catalogue.
   Colour: full palette. Four hues, each taken from what the spirits are
   actually distilled from — plum for slivovica, juniper for borovička, pear
   for hruškovica, damson for the liqueurs — and each given a section to run.
   Nothing here is borrowed from oak, whisky or gold.
   Type: Bricolage Grotesque for display, Hanken Grotesk for reading.
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

/* Which fruit each brand tile borrows, cycled so no two neighbours match. */
const HUES = ['plum', 'juniper', 'pear', 'damson']

export default function sad() {
  const body = `
<header class="hdr" id="top">
  <div class="wrap hdr__in">
    <a class="hdr__mark" href="#top" aria-label="Gurlex, domovská stránka">
      <img src="../assets/brand/gurlex-wordmark-sad.webp" alt="Gurlex" width="238" height="29">
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

  <!-- ── hero ─────────────────────────────────────────────────────────── -->
  <section class="hero" style="--hue: var(--plum)">
    <div class="wrap hero__in">
      <div class="hero__copy">
        <p class="kicker" data-reveal>${hero.kicker} <span class="kicker__dot">·</span> <span class="num">${hero.since}</span></p>

        <h1 class="hero__h">
          <span class="line l1" data-reveal>${hero.lines[0]}</span>
          <span class="line l2" data-reveal>${hero.lines[1]}</span>
          <span class="line l3" data-reveal>${hero.lines[2]}</span>
        </h1>

        <p class="hero__lede" data-reveal>${hero.lede}</p>

        <div class="hero__cta" data-reveal>
          <a class="btn btn--primary" href="#znacky">${hero.ctaPrimary}</a>
          <a class="btn btn--quiet" href="${site.catalogPdf}">${hero.ctaSecondary}<span class="btn__tag">PDF</span></a>
        </div>
      </div>

      <figure class="hero__object">
        <span class="hero__fruit" aria-hidden="true"></span>
        <picture>
          <source srcset="../assets/bottle-hero.avif" type="image/avif">
          <img src="../assets/bottle-hero.webp" alt="${hero.bottleAlt}"
               width="480" height="751" fetchpriority="high" decoding="async">
        </picture>
      </figure>
    </div>
  </section>

  <!-- ── harvest: the six on their own colour fields ──────────────────── -->
  <section class="harvest" aria-labelledby="harvest-h">
    <h2 class="sr" id="harvest-h">Vybrané z portfólia</h2>
    <ul class="wrap harvest__row">
      ${shelf
        .map(
          (b, i) =>
            `<li data-reveal style="--hue: var(--${HUES[i % HUES.length]})">
        <img src="${bottleSrc(b.file)}" alt="${b.alt}" width="400" height="800" loading="lazy" decoding="async">
      </li>`
        )
        .join('\n      ')}
    </ul>
  </section>

  <!-- ── about ────────────────────────────────────────────────────────── -->
  <section class="about" id="o-nas" aria-labelledby="about-h" style="--hue: var(--juniper)">
    <div class="wrap about__in">
      <div class="about__head">
        <p class="sec-n"><span class="num">01</span></p>
        <h2 id="about-h" data-reveal>${about.heading}</h2>
        <p class="about__since" aria-hidden="true"><span class="num" data-count="1994">1994</span></p>
      </div>
      <div class="about__body">
        <p class="lead" data-reveal>${about.paras[0]}</p>
        <div class="about__cols">
          ${about.paras
            .slice(1)
            .map((p) => `<p data-reveal>${p}</p>`)
            .join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <!-- ── brands ───────────────────────────────────────────────────────── -->
  <section class="brands" id="znacky" aria-labelledby="brands-h" style="--hue: var(--pear)">
    <div class="wrap">
      <div class="brands__head">
        <div>
          <p class="sec-n"><span class="num">02</span></p>
          <h2 id="brands-h" data-reveal>${brandsMeta.heading}</h2>
        </div>
        <p class="brands__note" data-reveal>${brandsMeta.note}</p>
      </div>

      <ul class="crates">
        ${brands
          .map(
            (b, i) => `<li class="crate" data-reveal style="--hue: var(--${HUES[i % HUES.length]})">
          <a href="https://www.gurlex.sk/produkty/${b.slug}">
            <span class="crate__band">
              <span class="crate__n num">${String(i + 1).padStart(2, '0')}</span>
              <span class="crate__c num">${products(b.n)}</span>
            </span>
            <span class="crate__plate">
              <img src="${brandSrc(b.slug)}" alt="${b.alt || b.name}" width="240" height="150" loading="lazy" decoding="async">
            </span>
            <span class="crate__foot">
              <span class="crate__name">${b.name}</span>
              ${b.ext ? `<span class="crate__ext">${b.ext}</span>` : ''}
            </span>
          </a>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>

  <!-- ── makers ───────────────────────────────────────────────────────── -->
  <section class="mk" id="vyrobcovia" aria-labelledby="mk-h" style="--hue: var(--damson)">
    <div class="wrap">
      <div class="mk__head">
        <p class="sec-n"><span class="num">03</span></p>
        <h2 id="mk-h" data-reveal>${makers.heading}</h2>
      </div>
      <div class="mk__row">
        ${makers.items
          .map(
            (m, i) => `<a class="mk__card" href="${m.url}" rel="noopener" data-reveal style="--hue: var(--${i ? 'plum' : 'juniper'})">
          <span class="mk__logo"><img src="../assets/brand/${m.logo}.webp" alt="${m.alt}" width="300" height="120" loading="lazy" decoding="async"></span>
          <strong class="mk__name">${m.name}</strong>
          <span class="mk__desc">${m.desc}</span>
          <span class="mk__go">${m.host} ${arrowIcon()}</span>
        </a>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ── downloads ────────────────────────────────────────────────────── -->
  <section class="dl" id="na-stiahnutie" aria-labelledby="dl-h" style="--hue: var(--apricot)">
    <div class="wrap dl__in">
      <div class="dl__head">
        <p class="sec-n"><span class="num">04</span></p>
        <h2 id="dl-h" data-reveal>${downloads.heading}</h2>
      </div>
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
      <p class="sec-n"><span class="num">05</span></p>
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
    lane: 'sad',
    themeColor: '#faf3e6',
    preload: ['bricolage-latin.woff2', 'hanken-latin.woff2'],
    fontCss: [
      fontFace('Bricolage', 'bricolage', { weight: '400 800' }),
      fontFace('Hanken', 'hanken', { weight: '300 800' }),
    ].join('\n'),
    body,
  })
}
