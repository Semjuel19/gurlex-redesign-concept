/* Lane 03 — Nočná destilácia: choreography.
   The heaviest of the four. The lamp comes up, the object rises into it, the
   headline lands over the top, and the disc drifts against the scroll so the
   light feels like it belongs to the room rather than to the page. */
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

  const rise = (y = 24, duration = 0.85) => [
    { opacity: [0, 1], y: [y, 0] },
    { duration, ease: GX.ease },
  ]

  /* The lamp comes up, then the bottle rises into it.
     Through GX, not Motion directly: GX is what holds the animation until the
     page is actually visible and guarantees it cannot strand the object at
     opacity 0 in a tab that never paints a frame. */
  GX.enter(
    '.hero__object',
    () => [{ opacity: [0, 1], y: [56, 0] }, { duration: 1.4, ease: GX.ease }],
    { base: 0.15 }
  )

  GX.enter('.kicker', () => rise(10, 0.7), { stagger: 0 })
  GX.enter('.hero__h .line', () => rise(34, 1), { stagger: 0.1, base: 0.34 })
  GX.enter('.hero__lede', () => rise(18, 0.8), { base: 0.7 })
  GX.enter('.hero__cta', () => rise(16, 0.8), { base: 0.8 })

  GX.onView('.fact', () => rise(20, 0.7), { stagger: 0.08, amount: 0.35 })
  GX.countUp('.fact dd[data-count]', { duration: 1.8 })

  /* Bottles come up off the shelf one after another. */
  GX.onView(
    '.shelf__row li',
    () => [
      { opacity: [0, 1], y: [40, 0] },
      { duration: 0.95, ease: GX.ease },
    ],
    { stagger: 0.08, amount: 0.15 }
  )
  GX.onView(
    '.shelf__line',
    () => [{ opacity: [0, 1], scaleX: [0, 1] }, { duration: 1.1, ease: GX.ease }],
    { amount: 0.5 }
  )

  GX.onView('#about-h, .about__body p', () => rise(20, 0.8), { stagger: 0.06, amount: 0.25 })
  GX.onView('#brands-h, .brands__note', () => rise(18, 0.75), { amount: 0.3 })

  GX.onView(
    '.label',
    () => [
      { opacity: [0, 1], y: [26, 0] },
      { duration: 0.7, ease: GX.ease },
    ],
    { stagger: 0.045, amount: 0.2 }
  )

  GX.onView('#mk-h, .mk__card, #dl-h, .dl__list li', () => rise(22, 0.8), {
    stagger: 0.07,
    amount: 0.25,
  })

  /* Scroll-linked: the lamp drifts a little slower than the page. */
  const obj = document.querySelector('.hero__object')
  const stage = document.querySelector('.hero__stage')
  if (obj && stage && M.scroll) {
    /* The callback takes the progress number, not an info object. Motion picks
       its API from the callback's arity and from whether a target was given:
       with a target it always calls onScroll(info[axis].progress, info). A
       one-argument callback reading `.y.progress` therefore throws on every
       scroll frame — inside Motion's shared frame loop, which starves every
       other animation on the page and leaves the reveals stuck at opacity 0. */
    M.scroll(
      (progress) => {
        /* The lamp is driven through custom properties the pseudo-element
           reads, and the object through `translate` rather than `transform`,
           so none of this fights the entrance animation for the same property. */
        obj.style.setProperty('--disc-y', `${progress * 80}px`)
        obj.style.setProperty('--disc-s', String(1 + progress * 0.14))
        obj.style.translate = `0 ${progress * 30}px`
      },
      { target: stage, axis: 'y', offset: ['start start', 'end start'] }
    )
  }
})()
