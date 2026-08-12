/* Lane 01 — Karpatský chlad: choreography.
   Restrained on purpose. One orchestrated entrance, list rows written in from
   the left like a route being logged, nothing decorative afterwards. */
(() => {
  'use strict'
  const GX = window.GX
  if (!GX) return

  /* Hairline under the header only once the page has left the top. */
  const hdr = document.querySelector('.hdr')
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('is-stuck', window.scrollY > 8)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  if (!GX.live) return

  /* Motion's transform shorthands, not a transform string: the keyword `none`
     as a keyframe value gets parsed per component and lands on scale(0). */
  const rise = (y = 20, duration = 0.75) => [
    { opacity: [0, 1], y: [y, 0] },
    { duration, ease: GX.ease },
  ]

  /* Hero: one line at a time, then the supporting copy. */
  GX.enter('.kicker', () => rise(10, 0.6), { stagger: 0 })
  GX.enter('.hero__h .line', () => rise(26, 0.85), { stagger: 0.085, base: 0.12 })
  GX.enter('.hero__lede', () => rise(16, 0.7), { base: 0.42 })
  GX.enter('.hero__cta', () => rise(14, 0.7), { base: 0.52 })

  /* The bottle settles rather than slides. */
  GX.enter(
    '.hero__object',
    () => [
      { opacity: [0, 1], y: [24, 0], scale: [0.965, 1] },
      { duration: 1.1, ease: GX.ease },
    ],
    { base: 0.2 }
  )

  GX.onView('.fact', () => rise(14, 0.6), { stagger: 0.06, amount: 0.4 })
  GX.countUp('.fact dd[data-count]')

  GX.onView('.shelf__row li', () => rise(22, 0.7), { stagger: 0.055, amount: 0.2 })

  GX.onView('.about__side h2, .about__body p', () => rise(16, 0.7), {
    stagger: 0.04,
    amount: 0.3,
  })

  GX.onView('#idx-h, .idx__note', () => rise(14, 0.65), { amount: 0.4 })

  /* Rows arrive from the left: the index is being written, not faded in. */
  GX.onView(
    '.row',
    () => [
      { opacity: [0, 1], x: [-14, 0] },
      { duration: 0.5, ease: GX.easeSoft },
    ],
    { stagger: 0.028, amount: 0.9 }
  )

  GX.onView('.idx__sum, #mk-h, .mk__card, #dl-h, .dl__list li', () => rise(16, 0.65), {
    stagger: 0.05,
    amount: 0.3,
  })
})()
