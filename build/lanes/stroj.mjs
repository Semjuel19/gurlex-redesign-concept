/* ===========================================================================
   Lane 04 — Distribučný stroj / the machine
   Scene: a regional sales rep checks the range on a laptop in a warehouse
   office, mid-shift, under fluorescent light, needing a number in five seconds.
   Voice words: measured, mechanical, plain.
   Reference objects: transit wayfinding, a printed stock manifest, a spec plate
   riveted to a machine.
   Colour: committed, two-colour. Graphite and safety yellow, nothing else.
   Type: Anybody, one family worked across its width axis — expanded for the
   display line, condensed for dense labels. Chivo carries running text.
   Premise: Gurlex is a distributor and a logistics operation, not a brand
   owner, and this lane says so instead of dressing it up.
   =========================================================================== */

import {
  site, hero, facts, about, brands, brandsMeta, products, shelf, makers,
  downloads, contact, locales,
} from '../content.mjs'
import {
  page, fontFace, fbIcon, arrowIcon, footerBlocks, disclaimerMarkup, navList,
  localeStrip, bottleSrc, brandSrc,
} from '../partials.mjs'

const ft = footerBlocks()

export default function stroj() {
  const body = `
<header class="hdr" id="top">
  <div class="wrap hdr__in">
    <a class="hdr__mark" href="#top" aria-label="Gurlex, domovská stránka">
      <img src="../assets/brand/gurlex-wordmark-stroj.webp" alt="Gurlex" width="238" height="29">
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
        <a class="social" href="${site.facebook}" rel="noopener" aria-label="Facebook">${fbIcon(16)}</a>
      </div>
    </nav>
  </div>
</header>

<main id="main">

  <!-- ── hero: a spec plate ───────────────────────────────────────────── -->
  <section class="hero">
    <div class="wrap hero__in">
      <div class="hero__copy">
        <p class="kicker" data-reveal>
          <span class="kicker__k">${hero.kicker}</span>
          <span class="kicker__v num">${hero.since}</span>
        </p>
        <h1 class="hero__h" data-reveal>${hero.lines[0]} <em>${hero.lines[1]}</em> ${hero.lines[2]}</h1>
        <p class="hero__lede" data-reveal>${hero.lede}</p>
        <div class="hero__cta" data-reveal>
          <a class="btn btn--primary" href="#znacky">${hero.ctaPrimary}</a>
          <a class="btn btn--quiet" href="${site.catalogPdf}">${hero.ctaSecondary}<span class="btn__tag">PDF</span></a>
        </div>
      </div>

      <div class="plate" data-reveal>
        <p class="plate__cap">Prevádzkové údaje</p>
        <dl class="plate__data">
          ${facts
            .map(
              (f) => `<div class="plate__row">
            <dt>${f.k}</dt>
            <dd class="${f.num ? 'num' : ''}"${f.num ? ` data-count="${f.num}"` : ''}>${f.v}</dd>
          </div>`
            )
            .join('\n          ')}
          <div class="plate__row">
            <dt>Trhy</dt>
            <dd class="plate__mk">${locales.map((l) => `<span>${l.code}</span>`).join('')}</dd>
          </div>
        </dl>
        <figure class="plate__unit">
          <picture>
            <source srcset="../assets/bottle-hero.avif" type="image/avif">
            <img src="../assets/bottle-hero.webp" alt="${hero.bottleAlt}"
                 width="480" height="751" fetchpriority="high" decoding="async">
          </picture>
          <figcaption>Goraľ Slivovica 45 % <span class="num">0,7 l</span></figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- ── manifest: six units ──────────────────────────────────────────── -->
  <section class="mf" aria-labelledby="mf-h">
    <div class="wrap">
      <h2 class="sr" id="mf-h">Vybrané z portfólia</h2>
      <ul class="mf__row">
        ${shelf
          .map(
            (b, i) => `<li data-reveal>
          <span class="mf__code num">${String(i + 1).padStart(3, '0')}</span>
          <img src="${bottleSrc(b.file)}" alt="${b.alt}" width="400" height="800" loading="lazy" decoding="async">
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>

  <!-- ── about ────────────────────────────────────────────────────────── -->
  <section class="about" id="o-nas" aria-labelledby="about-h">
    <div class="wrap about__in">
      <div class="about__head">
        <p class="sec-n"><span class="num">01</span> <span class="sec-n__l">O spoločnosti</span></p>
        <h2 id="about-h" data-reveal>${about.heading}</h2>
      </div>
      <div class="about__body">
        <p class="lead" data-reveal>${about.paras[0]}</p>
        ${about.paras
          .slice(1)
          .map((p) => `<p data-reveal>${p}</p>`)
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ── brands: the manifest table ──────────────────────────────────── -->
  <section class="tbl" id="znacky" aria-labelledby="tbl-h">
    <div class="wrap">
      <div class="tbl__head">
        <div>
          <p class="sec-n"><span class="num">02</span> <span class="sec-n__l">Sortiment</span></p>
          <h2 id="tbl-h" data-reveal>${brandsMeta.heading}</h2>
        </div>
        <p class="tbl__note" data-reveal>${brandsMeta.note}</p>
      </div>

      <table class="mtx">
        <caption class="sr">Zoznam značiek s počtom produktov a vlastnou webovou stránkou</caption>
        <thead>
          <tr>
            <th scope="col" class="num">№</th>
            <th scope="col">Značka</th>
            <th scope="col">Značka (mark)</th>
            <th scope="col">Vlastný web</th>
            <th scope="col" class="ta-r">Sortiment</th>
          </tr>
        </thead>
        <tbody>
          ${brands
            .map(
              (b, i) => `<tr data-reveal>
            <td class="mtx__n num">${String(i + 1).padStart(2, '0')}</td>
            <th scope="row" class="mtx__name">
              <a href="https://www.gurlex.sk/produkty/${b.slug}">${b.name}<span class="mtx__go" aria-hidden="true">${arrowIcon()}</span></a>
            </th>
            <td class="mtx__mark">
              <img src="${brandSrc(b.slug)}" alt="" width="240" height="150" loading="lazy" decoding="async">
            </td>
            <td class="mtx__ext">${b.ext ? b.ext : '<span class="mtx__none" aria-hidden="true">—</span>'}</td>
            <td class="mtx__c num">${products(b.n)}</td>
          </tr>`
            )
            .join('\n          ')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">Spolu</td>
            <td class="mtx__c num">${brandsMeta.total} produktov</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>

  <!-- ── makers ───────────────────────────────────────────────────────── -->
  <section class="mk" id="vyrobcovia" aria-labelledby="mk-h">
    <div class="wrap">
      <div class="mk__head">
        <p class="sec-n"><span class="num">03</span> <span class="sec-n__l">Zdroj</span></p>
        <h2 id="mk-h" data-reveal>${makers.heading}</h2>
      </div>
      <div class="mk__row">
        ${makers.items
          .map(
            (m) => `<a class="mk__card" href="${m.url}" rel="noopener" data-reveal>
          <span class="mk__plate"><img src="../assets/brand/${m.logo}.webp" alt="${m.alt}" width="300" height="120" loading="lazy" decoding="async"></span>
          <span class="mk__body">
            <strong class="mk__name">${m.name}</strong>
            <span class="mk__desc">${m.desc}</span>
          </span>
          <span class="mk__go">${m.host} ${arrowIcon()}</span>
        </a>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ── downloads ────────────────────────────────────────────────────── -->
  <section class="dl" id="na-stiahnutie" aria-labelledby="dl-h">
    <div class="wrap">
      <div class="dl__head">
        <p class="sec-n"><span class="num">04</span> <span class="sec-n__l">Dokumenty</span></p>
        <h2 id="dl-h" data-reveal>${downloads.heading}</h2>
      </div>
      <ul class="dl__grid">
        ${downloads.items
          .map(
            (d, i) => `<li data-reveal>
          <a href="${d.url}">
            <span class="dl__n num">${String(i + 1).padStart(2, '0')}</span>
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
      <p class="sec-n"><span class="num">05</span> <span class="sec-n__l">Kontakt</span></p>
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
    lane: 'stroj',
    themeColor: '#2b2d30',
    preload: ['anybody-latin.woff2', 'chivo-latin.woff2'],
    fontCss: [
      /* the width axis is the voice of this lane, so the face is declared
         across its full range or the browser will clamp font-stretch */
      fontFace('Anybody', 'anybody', { weight: '100 900', stretch: '50% 150%' }),
      fontFace('Chivo', 'chivo', { weight: '300 900' }),
    ].join('\n'),
    body,
  })
}
