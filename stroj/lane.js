/* Lane 04 — Distribučný stroj: choreography.
   Mechanical on purpose: no springs anywhere. Sharp cubic easing, short
   durations, tight stagger. Rows index in like a printer advancing paper. */
(() => {
  'use strict'
  const GX = window.GX
  if (!GX) return

  const hdr = document.querySelector('.hdr')
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('is-stuck', window.scrollY > 8)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  if (!GX.live) return

  /* Machined, not organic: a hard decelerate with no overshoot. */
  const SNAP = [0.2, 0, 0, 1]
  const step = (y = 12, duration = 0.42) => [
    { opacity: [0, 1], y: [y, 0] },
    { duration, ease: SNAP },
  ]

  GX.enter('.kicker', () => step(8, 0.35), { stagger: 0 })
  GX.enter('.hero__h', () => step(16, 0.55), { base: 0.08 })
  GX.enter('.hero__lede', () => step(12, 0.45), { base: 0.2 })
  GX.enter('.hero__cta', () => step(12, 0.45), { base: 0.28 })
  GX.enter(
    '.plate',
    () => [
      { opacity: [0, 1], y: [18, 0] },
      { duration: 0.6, ease: SNAP },
    ],
    { base: 0.16 }
  )
  GX.countUp('.plate__row dd[data-count]', { duration: 1.1 })

  /* Units slide in from the left across the manifest strip. */
  GX.onView(
    '.mf__row li',
    () => [
      { opacity: [0, 1], x: [-10, 0] },
      { duration: 0.4, ease: SNAP },
    ],
    { stagger: 0.04, amount: 0.2 }
  )

  GX.onView('#about-h, .about__body p', () => step(12, 0.45), {
    stagger: 0.035,
    amount: 0.25,
  })
  GX.onView('#tbl-h, .tbl__note', () => step(12, 0.45), { amount: 0.3 })

  /* Table rows advance one line at a time. */
  GX.onView(
    '.mtx tbody tr',
    () => [
      { opacity: [0, 1], x: [-8, 0] },
      { duration: 0.3, ease: SNAP },
    ],
    { stagger: 0.022, amount: 0.6 }
  )

  GX.onView('#mk-h, .mk__card, #dl-h, .dl__grid li', () => step(12, 0.45), {
    stagger: 0.04,
    amount: 0.25,
  })
})()
