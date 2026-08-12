/* Lane 02 — Ovocný sad: choreography.
   Springs, because everything here is soft and ripe. Crates settle in like
   fruit being set down, never sliding on a rail. */
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
  const M = GX.motion

  const rise = (y = 22, duration = 0.8) => [
    { opacity: [0, 1], y: [y, 0] },
    { duration, ease: GX.ease },
  ]

  GX.enter('.kicker', () => rise(10, 0.6), { stagger: 0 })
  GX.enter('.hero__h .line', () => rise(28, 0.9), { stagger: 0.09, base: 0.1 })
  GX.enter('.hero__lede', () => rise(16, 0.75), { base: 0.44 })
  GX.enter('.hero__cta', () => rise(14, 0.75), { base: 0.54 })

  /* The fruit swells, the bottle rises out of it. */
  GX.enter(
    '.hero__fruit',
    () => [
      { opacity: [0, 1], scale: [0.72, 1] },
      { type: 'spring', stiffness: 90, damping: 16 },
    ],
    { base: 0.08 }
  )
  GX.enter(
    '.hero__object picture',
    () => [
      { opacity: [0, 1], y: [40, 0] },
      { type: 'spring', stiffness: 110, damping: 18 },
    ],
    { base: 0.3 }
  )

  GX.onView(
    '.harvest__row li',
    () => [
      { opacity: [0, 1], y: [26, 0], scale: [0.94, 1] },
      { type: 'spring', stiffness: 120, damping: 17 },
    ],
    { stagger: 0.07, amount: 0.2 }
  )

  GX.onView('#about-h, .about__body .lead, .about__cols p', () => rise(18, 0.75), {
    stagger: 0.05,
    amount: 0.25,
  })
  GX.countUp('.about__since .num')

  GX.onView('#brands-h, .brands__note', () => rise(16, 0.7), { amount: 0.35 })

  /* Crates arrive with a little weight: a spring, plus a barely-there tilt so
     the grid never reads as a wall of identical cards snapping in unison. */
  GX.onView(
    '.crate',
    (el, i) => [
      { opacity: [0, 1], y: [30, 0], rotate: [i % 2 ? 0.8 : -0.8, 0] },
      { type: 'spring', stiffness: 130, damping: 18 },
    ],
    { stagger: 0.05, amount: 0.2 }
  )

  GX.onView('#mk-h, .mk__card, #dl-h, .dl__list li', () => rise(20, 0.75), {
    stagger: 0.06,
    amount: 0.25,
  })

  /* The big translucent year drifts as you pass it: slow, and only ever a few
     pixels, so it reads as depth rather than as a moving element. */
  const since = document.querySelector('.about__since')
  if (since && M.scroll) {
    M.scroll(
      (info) => {
        since.style.transform = `translateY(${(0.5 - info.y.progress) * 34}px)`
      },
      { target: document.querySelector('.about'), offset: ['start end', 'end start'] }
    )
  }
})()
