/* The chooser at the root. Deliberately plain: it frames the four directions
   without competing with them, and states what each one commits to so the
   choice is made on the design rather than on novelty. */

import { site, jsonLd } from './content.mjs'

/* Each card is drawn in its own lane's colours. The palette values are the
   same OKLCH values the lane stylesheets use. */
const CARDS = [
  {
    id: 'chlad',
    n: '01',
    name: 'Karpatský chlad',
    gloss: 'alpine cold',
    bg: 'oklch(97.6% 0.005 220)',
    ink: 'oklch(26% 0.048 168)',
    mute: 'oklch(48% 0.018 215)',
    rule: 'oklch(87% 0.014 218)',
    accent: 'oklch(64% 0.19 42)',
    swatches: ['oklch(97.6% 0.005 220)', 'oklch(93.8% 0.012 218)', 'oklch(26% 0.048 168)', 'oklch(64% 0.19 42)'],
    theme: 'Svetlá',
    strategy: 'Committed — sneh a smrek, jeden signálny oranžový',
    type: 'Familjen Grotesk',
    lead:
      'Vysokohorské svetlo a presnosť tlačeného turistického sprievodcu. Dvadsať značiek nie je mriežka kariet, ale register: riadok po riadku, s číslom, počtom produktov a vlastným webom.',
    diff: 'Najlepšie sa v ňom hľadá. Vhodné pre odberateľa, ktorý vie, čo chce nájsť.',
  },
  {
    id: 'sad',
    n: '02',
    name: 'Ovocný sad',
    gloss: 'the orchard',
    bg: 'oklch(96.2% 0.021 88)',
    ink: 'oklch(24% 0.042 42)',
    mute: 'oklch(52% 0.03 50)',
    rule: 'oklch(84% 0.035 82)',
    accent: 'oklch(41% 0.145 335)',
    swatches: ['oklch(96.2% 0.021 88)', 'oklch(41% 0.145 335)', 'oklch(40% 0.09 168)', 'oklch(74% 0.145 62)'],
    theme: 'Svetlá',
    strategy: 'Full palette — slivka, borievka, hruška, trnka',
    type: 'Bricolage Grotesque + Hanken Grotesk',
    lead:
      'Farba pochádza z toho, čo je vo flaši, nie z duba a zlata. Každá sekcia dostane vlastný odtieň, produkty stoja na farebných poliach a značky sú prepravky s farebným pásom.',
    diff: 'Najteplejší a najprístupnejší. Vhodné, ak má stránka hovoriť aj ku koncovému spotrebiteľovi.',
  },
  {
    id: 'noc',
    n: '03',
    name: 'Nočná destilácia',
    gloss: 'night still',
    bg: 'oklch(15.5% 0.032 165)',
    ink: 'oklch(95.5% 0.012 150)',
    mute: 'oklch(74% 0.022 158)',
    rule: 'oklch(31% 0.03 165)',
    accent: 'oklch(87% 0.21 128)',
    swatches: ['oklch(15.5% 0.032 165)', 'oklch(20% 0.036 165)', 'oklch(87% 0.21 128)', 'oklch(95.5% 0.01 100)'],
    theme: 'Tmavá',
    strategy: 'Drenched — plocha je farba, jeden limetkový signál',
    type: 'Darker Grotesque + Chivo',
    lead:
      'Jedna myšlienka na jednu obrazovku. Flaša stojí v svetle lampy, písmo je veľké a limetková linka nesie celú stránku. Značky sú etikety zachytené svetlom na tmavej polici.',
    diff: 'Najvýraznejší a najviac o produkte. Zároveň najďalej od súčasnej stránky.',
  },
  {
    id: 'stroj',
    n: '04',
    name: 'Distribučný stroj',
    gloss: 'the machine',
    bg: 'oklch(20.5% 0.006 255)',
    ink: 'oklch(93.5% 0.004 255)',
    mute: 'oklch(71% 0.006 255)',
    rule: 'oklch(35% 0.008 255)',
    accent: 'oklch(88% 0.185 100)',
    swatches: ['oklch(20.5% 0.006 255)', 'oklch(25% 0.007 255)', 'oklch(88% 0.185 100)', 'oklch(94% 0.004 255)'],
    theme: 'Tmavá',
    strategy: 'Committed — grafit a výstražná žltá, nič ďalšie',
    type: 'Anybody (šírková os) + Chivo',
    lead:
      'Vychádza z toho, čím Gurlex je: distribútor a logistika, nie výrobca. Viditeľná mriežka, vlasové linky, technický štítok s prevádzkovými údajmi a sortiment ako skutočná tabuľka.',
    diff: 'Najrýchlejší na čítanie údajov. Vhodné, ak je hlavná cieľová skupina B2B.',
  },
  {
    id: 'v1',
    n: '05',
    name: 'Modrá v1',
    gloss: 'prvý koncept',
    bg: 'oklch(19.5% 0.068 264)',
    ink: 'oklch(96% 0.007 250)',
    mute: 'oklch(72% 0.02 250)',
    rule: 'oklch(34% 0.06 264)',
    accent: 'oklch(67% 0.185 36)',
    swatches: ['oklch(19.5% 0.068 264)', 'oklch(96% 0.007 250)', 'oklch(67% 0.185 36)', 'oklch(14% 0.045 264)'],
    theme: 'Tmavá',
    strategy: 'Drenched — firemná modrá',
    type: 'Archivo',
    lead:
      'Predchádzajúci koncept, ponechaný na porovnanie. Firemná modrá z loga, vermilion akcent z červeného „Gr“ a značky ako jednotná mriežka svetlých kachličiek.',
    diff: 'Referencia. Zostáva dostupný, aby sa nové smery dali porovnať s tým, čo už poznáte.',
  },
]

const swatchRow = (c) =>
  c.swatches
    .map((s) => `<span style="background:${s}"></span>`)
    .join('')

export default function picker() {
  return `<!doctype html>
<html lang="sk" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Gurlex.sk — štyri návrhy redizajnu</title>
<meta name="description" content="Štyri smery redizajnu domovskej stránky Gurlex s.r.o. plus prvý koncept. Neoficiálna ukážka k pracovnej ponuke.">
<meta name="robots" content="noindex">

<meta property="og:type" content="website">
<meta property="og:locale" content="sk_SK">
<meta property="og:title" content="Gurlex.sk — štyri návrhy redizajnu">
<meta property="og:description" content="Štyri smery redizajnu domovskej stránky Gurlex s.r.o. Vyberte si.">
<meta property="og:image" content="assets/og-image.png">

<meta name="theme-color" content="#17181a">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/chivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="picker.css">

<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
</head>
<body>

<a class="skip" href="#lanes">Preskočiť na návrhy</a>

<header class="top">
  <div class="wrap">
    <p class="eyebrow">Neoficiálny návrh redizajnu</p>
    <h1>Gurlex.sk<span class="dot">.</span><br>Štyri smery</h1>
    <p class="intro">
      Domovská stránka <a href="${site.canonical}">www.gurlex.sk</a> v štyroch návrhoch.
      Každý z nich nesie <strong>rovnaký obsah</strong> ako súčasná stránka — všetkých
      20 značiek, 196 produktov, obidvoch výrobcov, dokumenty aj kompletný kontakt —
      a líši sa len tým, ako ho podáva. Piaty je predchádzajúci koncept, ponechaný na
      porovnanie.
    </p>
    <dl class="brief">
      <div><dt>Obsah</dt><dd>Prevzatý 1 : 1 zo súčasnej stránky</dd></div>
      <div><dt>Technika</dt><dd>Statické HTML a CSS, bez build kroku</dd></div>
      <div><dt>Animácie</dt><dd>Motion (rovnaký engine ako Framer Motion)</dd></div>
      <div><dt>Jazyk</dt><dd>SK, pripravené pre CZ / PL / HU</dd></div>
    </dl>
  </div>
</header>

<main id="lanes">
  <div class="wrap">
    <ul class="cards">
${CARDS.map(
  (c) => `      <li class="card" style="--bg:${c.bg};--ink:${c.ink};--mute:${c.mute};--rule:${c.rule};--accent:${c.accent}">
        <a href="${c.id}/">
          <span class="card__mini" aria-hidden="true">
            <span class="card__bar"></span>
            <span class="card__hd"></span>
            <span class="card__hd card__hd--2"></span>
            <span class="card__grid">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </span>
          </span>
          <span class="card__body">
            <span class="card__head">
              <span class="card__n">${c.n}</span>
              <span class="card__name">${c.name}</span>
              <span class="card__gloss">${c.gloss}</span>
            </span>
            <span class="card__lead">${c.lead}</span>
            <span class="card__diff">${c.diff}</span>
            <span class="card__spec">
              <span><b>Téma</b>${c.theme}</span>
              <span><b>Farba</b>${c.strategy}</span>
              <span><b>Písmo</b>${c.type}</span>
            </span>
            <span class="card__sw">${swatchRow(c)}</span>
            <span class="card__go">Otvoriť návrh
              <svg viewBox="0 0 16 16" aria-hidden="true" width="15" height="15"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </span>
        </a>
      </li>`
).join('\n')}
    </ul>

    <section class="note" aria-labelledby="note-h">
      <h2 id="note-h">Na čo sa pri výbere pozerať</h2>
      <ol>
        <li><b>Kto je hlavný návštevník.</b> Odberateľ, ktorý hľadá číslo, potrebuje niečo iné než spotrebiteľ, ktorý si prezerá sortiment.</li>
        <li><b>Ako obstojí 20 cudzích logotypov.</b> Značky majú vlastné identity a farby; každý návrh ich zvláda inak.</li>
        <li><b>Či zostane funkčný pri 40 značkách.</b> Register a tabuľka rastú lepšie než mriežka kariet.</li>
        <li><b>Ako sa doň zmestí e-shop.</b> Cena, dostupnosť a košík sú ďalšia fáza; každý z návrhov na to má miesto.</li>
      </ol>
    </section>
  </div>
</main>

<footer class="foot">
  <div class="wrap">
    <p><strong>Nejde o oficiálnu stránku.</strong> Toto je neoficiálny návrh redizajnu vytvorený
      ako ukážka k pracovnej ponuke. Obsah, značky a logá patria spoločnosti Gurlex s.r.o.
      a jej dodávateľom. Živá stránka je na <a href="${site.canonical}">www.gurlex.sk</a>.</p>
    <p class="foot__meta">Alkohol môže byť škodlivý. Pite zodpovedne. Obsah je určený osobám starším ako 18 rokov.</p>
  </div>
</footer>

</body>
</html>
`
}
