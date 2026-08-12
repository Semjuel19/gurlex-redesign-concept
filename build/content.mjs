/* Single source of truth for every word and asset on the page.
   Transcribed from www.gurlex.sk so every variant carries identical content
   and only the design differs. Nothing here is lane-specific. */

export const site = {
  lang: 'sk',
  title: 'Gurlex s.r.o. — výhradný distribútor slovenských liehovín v krajinách V4',
  description:
    'Gurlex s.r.o. je od roku 1994 oficiálny a výhradný distribútor liehovín spoločností GAS FAMILIA a BGV v krajinách V4. Portfólio 20 značiek a 196 produktov zo Starej Ľubovne.',
  ogDescription:
    'Od roku 1994 distribuujeme destiláty, liehoviny a pochutiny zo Spiša. 20 značiek, 196 produktov, štyri krajiny.',
  canonical: 'https://www.gurlex.sk/',
  catalogPdf:
    'https://www.gurlex.sk/uploads/article_44_24_02_20_produktovykatalog_mail.pdf',
  facebook: 'https://www.facebook.com/gurlex.sk/',
  privacy: 'https://www.gurlex.sk/ochrana-osobnych-udajov',
  career: 'https://www.gurlex.sk/kariera',
  videos: 'https://www.gurlex.sk/videa-a-reklamne-spoty',
  logistics: 'https://www.gasfamilia.com/logistika/',
}

export const locales = [
  { code: 'SK', hreflang: 'sk', name: 'Slovensky', url: 'https://www.gurlex.sk/', current: true },
  { code: 'CZ', hreflang: 'cs', name: 'Česky', url: 'https://www.gurlex.cz/' },
  { code: 'PL', hreflang: 'pl', name: 'Polski', url: 'https://www.gurlex.pl/' },
  { code: 'HU', hreflang: 'hu', name: 'Magyar', url: 'https://www.gurlex.hu/' },
]

export const gate = {
  kicker: 'Overenie veku',
  title: 'Naše produkty sú len pre dospelých',
  desc:
    'Obsah tejto webstránky je vhodný len osobám starším ako 18 rokov. Pre pokračovanie je potrebné potvrdiť váš vek.',
  yes: 'Mám viac ako 18 rokov',
  no: 'Nemám 18 rokov',
  note: 'Alkohol môže byť škodlivý. Pite zodpovedne.',
  deny: 'Ľutujeme, obsah tejto stránky nie je prístupný osobám mladším ako 18 rokov.',
}

export const hero = {
  kicker: 'Výhradný distribútor',
  since: 'od roku 1994',
  /* Three display lines. Lanes set their own line breaks and emphasis. */
  lines: ['Slovenské', 'destiláty', 'pre celú V4'],
  lede:
    'Gurlex, s.r.o. je oficiálny a výhradný distribútor spoločností GAS FAMILIA s.r.o. a BGV s.r.o. v krajinách V4.',
  ctaPrimary: 'Prezrieť 20 značiek',
  ctaSecondary: 'Produktový katalóg',
  bottleAlt: 'Goraľ Slivovica 45 %, karafa z portfólia Gurlex',
}

export const facts = [
  { k: 'Založené', v: '1994', num: 1994 },
  { k: 'Značiek', v: '20', num: 20 },
  { k: 'Produktov', v: '196', num: 196 },
  { k: 'Sídlo', v: 'Stará Ľubovňa' },
]

export const about = {
  heading: 'O spoločnosti',
  paras: [
    'Firma Gurlex bola založená ako spoločnosť s ručením obmedzeným za účelom výhradnej distribúcie liehovín. Na počiatku svojho vzniku v roku 1994 bola firma situovaná do malých priestorov v blízkosti historického centra Starej Ľubovne.',
    'Postupom času prešla naša firma dôslednou reštrukturalizáciou nielen v organizačnej ale aj kapitálovej štruktúre, čoho dôsledkom je manažment na vysokej úrovni, najmodernejšie technologické vybavenie a silná a stabilná pozícia na trhu. Firma sa kontinuálne adaptuje požiadavkám a potrebám trhu a spotrebiteľov a v súčasnej dobe ponúka to najkvalitnejšie z oblasti destilátov, liehovín a pochutín na domácom a zahraničnom trhu.',
    'Naša firma sa v rámci svojich aktivít riadi etickými pravidlami a zameriava sa na zodpovednú konzumáciu alkoholických nápojov v súlade s legislatívou daných štátov.',
    'Portfólio spoločnosti zahŕňa najkvalitnejšie produkty ponúkané v segmente alkoholických nápojov a liehovín.',
  ],
}

/* Slovak count agreement: 1 → produkt, 2–4 → produkty, 5+ → produktov. */
export const products = (n) =>
  `${n} ${n === 1 ? 'produkt' : n >= 2 && n <= 4 ? 'produkty' : 'produktov'}`

/* slug doubles as the /produkty/<slug> path and the logo filename,
   except `venuta`, whose display name is shorter than its logo's. */
export const brands = [
  { slug: 'alternative-vodka', name: 'Alternative Vodka', n: 2 },
  { slug: 'brands', name: 'Brands', n: 12 },
  { slug: 'double-cross', name: 'Double Cross', n: 1 },
  { slug: 'familia', name: 'Familia', n: 12 },
  { slug: 'familia-premium', name: 'Familia Premium', n: 4, ext: 'familiapremium.sk' },
  { slug: 'fruxi', name: 'Fruxi Fresh', n: 13, ext: 'fruxi.com' },
  { slug: 'gas', name: 'Gas', n: 2, ext: 'gasfamilia.com' },
  { slug: 'goral', name: 'Goral Traditional', n: 10, ext: 'goraltradicna.sk' },
  { slug: 'goral-master', name: 'Goral Vodka Master', n: 6, ext: 'goralvodka.sk' },
  { slug: 'gurmen', name: 'Gur.men', n: 17 },
  { slug: 'napoleon', name: 'Napoleon', n: 4 },
  { slug: 'nestville-whisky', name: 'Nestville Whisky', n: 22, ext: 'nestvillewhisky.sk' },
  { slug: 'original-spisska-kosher', name: 'Original Spišská Kosher', n: 8 },
  { slug: 'spis-original-1343', name: 'Spiš Original 1343', n: 4 },
  { slug: 'spisska', name: 'Spišská Rada', n: 5 },
  { slug: 'tatrabalsam', name: 'Tatra Balsam', n: 6, ext: 'tatrabalsam.sk' },
  { slug: 'venuta', name: 'Víno', alt: 'Víno Venuta', n: 7 },
  { slug: 'noblemen-collection', name: 'Noblemen Collection', n: 6 },
  { slug: 'darceky', name: 'Darčekové balenia', n: 49 },
  { slug: 'spis-original', name: 'Spiš Originál', n: 6, ext: 'spisoriginal.com' },
]

export const brandsMeta = {
  heading: 'Naše značky',
  note: 'Dvadsať značiek, <strong>196 produktov</strong>. Vyberte značku a prezrite si jej sortiment.',
  total: 196,
}

export const shelf = [
  { file: 'goral', alt: 'Goral Borovička Tradičná 40 %, 0,7 l' },
  { file: 'tatrabalsam', alt: 'Tatra Balsam Special 52 %, keramika, 0,7 l' },
  { file: 'spisska', alt: 'Starospišská Domáca 50 %, 0,5 l' },
  { file: 'nestville-whisky', alt: 'Nestville Pear Liqueur 35 %, 0,7 l' },
  { file: 'noblemen-collection', alt: 'Ján II. Gin Pink for Maria 37,5 %, 0,7 l' },
  { file: 'gurmen', alt: 'GUR.MEN ocot vínny 6 %, 0,5 l Premium' },
]

export const makers = {
  heading: 'O výrobky ktorého výrobcu máte záujem?',
  items: [
    {
      logo: 'gasfamilia',
      alt: 'GAS Familia',
      name: 'GAS FAMILIA s.r.o.',
      desc: 'Výrobca destilátov a liehovín zo Starej Ľubovne. Sme jeho výhradný distribútor v krajinách V4.',
      url: 'http://www.gasfamilia.com/',
      host: 'gasfamilia.com',
    },
    {
      logo: 'nestville',
      alt: 'Nestville Distillery',
      name: 'Nestville Distillery',
      desc: 'Prvá slovenská whisky z Hniezdneho, vrátane vlastného návštevníckeho parku.',
      url: 'https://www.nestville.sk/',
      host: 'nestville.sk',
    },
  ],
}

export const downloads = {
  heading: 'Na stiahnutie',
  items: [
    { name: 'Produktový katalóg', kind: 'PDF', url: site.catalogPdf },
    { name: 'Videá a reklamné spoty', kind: 'Galéria', url: site.videos },
    { name: 'Logistika', kind: 'gasfamilia.com', url: site.logistics },
  ],
}

export const nav = [
  { label: 'Naše značky', href: '#znacky' },
  { label: 'Výrobcovia', href: '#vyrobcovia' },
  {
    label: 'Na stiahnutie',
    sub: [
      { label: 'Produktový katalóg (PDF)', href: site.catalogPdf },
      { label: 'Videá a reklamné spoty', href: site.videos },
      { label: 'Logistika', href: site.logistics },
    ],
  },
  { label: 'Kariéra', href: site.career },
  { label: 'Kontakt', href: '#kontakt' },
]

export const contact = {
  heading: 'Kontakt',
  company: 'Gurlex s.r.o.',
  street: 'Prešovská 8',
  zip: '064 01',
  city: 'Stará Ľubovňa',
  country: 'Slovensko',
  phones: [
    { display: '+421 52 71 47 125', href: 'tel:+421527147125' },
    { display: '+421 915 923 805', href: 'tel:+421915923805' },
  ],
  fax: '+421 52 71 47 216',
  emails: ['gurlex@gurlex.sk', 'forint@gurlex.sk'],
  responsibility:
    'Alkohol môže byť škodlivý. Pite zodpovedne. Naše produkty sú určené len osobám starším ako 18 rokov.',
  copyright: '© 2026 Gurlex s.r.o. Všetky práva vyhradené.',
  privacyLabel: 'Ochrana osobných údajov',
  credit: 'Grafické návrhy značiek: Roman Janovský',
}

export const disclaimer = {
  strong: 'Nejde o oficiálnu stránku.',
  text:
    'Toto je neoficiálny návrh redizajnu (koncept) vytvorený ako ukážka k pracovnej ponuke. Obsah, značky a logá patria spoločnosti Gurlex s.r.o. a jej dodávateľom. Živá stránka je na',
  liveLabel: 'www.gurlex.sk',
  regate: 'Zobraziť vekovú bránu znova',
}

/* The five design directions, in switcher order. The blue one was built on
   the existing site and counts as a variant like any other. */
export const lanes = [
  { id: 'chlad', n: '01', name: 'Karpatský chlad', gloss: 'alpine cold' },
  { id: 'sad', n: '02', name: 'Ovocný sad', gloss: 'the orchard' },
  { id: 'noc', n: '03', name: 'Nočná destilácia', gloss: 'night still' },
  { id: 'stroj', n: '04', name: 'Distribučný stroj', gloss: 'the machine' },
  { id: 'v1', n: '05', name: 'Firemná modrá', gloss: 'closest to the current site' },
]

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gurlex s.r.o.',
  url: 'https://www.gurlex.sk/',
  foundingDate: '1994',
  description:
    'Oficiálny a výhradný distribútor liehovín spoločností GAS FAMILIA s.r.o. a BGV s.r.o. v krajinách V4.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Prešovská 8',
    postalCode: '064 01',
    addressLocality: 'Stará Ľubovňa',
    addressCountry: 'SK',
  },
  telephone: '+421527147125',
  faxNumber: '+421527147216',
  email: 'gurlex@gurlex.sk',
  sameAs: ['https://www.facebook.com/gurlex.sk/'],
}
