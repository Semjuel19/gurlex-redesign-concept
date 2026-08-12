/* ===========================================================================
   Gurlex concept — shared behaviour
   Age gate, navigation, and a thin wrapper over Motion (motion.dev, the same
   engine as Framer Motion) that lanes use to declare their choreography.
   Every part of this file is progressive enhancement: the page is complete
   and readable with scripting off.
   =========================================================================== */
(() => {
  'use strict'

  const root = document.documentElement
  root.classList.remove('no-js')
  root.classList.add('js')

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* -------------------------------------------------------------------------
     1. Age gate
     Demo only, persisted client-side. In production this belongs server-side
     so a deep link cannot bypass it.
     ------------------------------------------------------------------------- */
  const KEY = 'gurlex:age-verified'
  const gate = document.getElementById('gate')
  const yes = document.getElementById('gate-yes')
  const no = document.getElementById('gate-no')
  const deny = document.getElementById('gate-deny')
  const regate = document.getElementById('regate')

  if (gate && yes && no) {
    let lastFocus = null

    const focusables = () =>
      [...gate.querySelectorAll('button, [href]')].filter(
        (el) => !el.disabled && !el.hidden && el.offsetParent !== null
      )

    function trap(e) {
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    function openGate() {
      lastFocus = document.activeElement
      gate.hidden = false
      document.body.classList.add('locked')
      deny.hidden = true
      no.hidden = false
      yes.hidden = false
      document.addEventListener('keydown', trap)
      /* Synchronous: rAF is suspended in background tabs and moving focus
         into a modal is functional, not decorative. The extra frame is only
         a retry for engines that need the paint first. */
      yes.focus()
      if (document.activeElement !== yes) requestAnimationFrame(() => yes.focus())
    }

    function closeGate() {
      gate.hidden = true
      document.body.classList.remove('locked')
      document.removeEventListener('keydown', trap)
      if (lastFocus && lastFocus.focus) lastFocus.focus()
    }

    let verified = false
    try {
      verified = localStorage.getItem(KEY) === '1'
    } catch (_) {
      /* private mode: fall through and show the gate */
    }
    if (!verified) openGate()

    yes.addEventListener('click', () => {
      try {
        localStorage.setItem(KEY, '1')
      } catch (_) {}
      closeGate()
    })

    no.addEventListener('click', () => {
      yes.hidden = true
      no.hidden = true
      deny.hidden = false
      deny.focus()
    })

    if (regate) {
      regate.addEventListener('click', () => {
        try {
          localStorage.removeItem(KEY)
        } catch (_) {}
        openGate()
      })
    }
  }

  /* -------------------------------------------------------------------------
     2. Navigation
     ------------------------------------------------------------------------- */
  const burger = document.getElementById('burger')
  const nav = document.getElementById('nav')
  const dlToggle = document.getElementById('dl-toggle')
  const dlMenu = document.getElementById('dl-menu')

  const setSub = (open) => {
    if (!dlMenu || !dlToggle) return
    dlMenu.hidden = !open
    dlToggle.setAttribute('aria-expanded', String(open))
  }
  setSub(false)

  const setNav = (open) => {
    if (!nav || !burger) return
    nav.classList.toggle('is-open', open)
    burger.setAttribute('aria-expanded', String(open))
  }

  if (dlToggle) dlToggle.addEventListener('click', () => setSub(dlMenu.hidden))

  if (burger) {
    burger.addEventListener('click', () => {
      setNav(!nav.classList.contains('is-open'))
      setSub(false)
    })
  }

  document.addEventListener('click', (e) => {
    if (dlMenu && !dlMenu.hidden && !e.target.closest('.nav__has-sub')) setSub(false)
    if (
      nav &&
      nav.classList.contains('is-open') &&
      !e.target.closest('.nav') &&
      !e.target.closest('.burger')
    ) {
      setNav(false)
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    if (dlMenu && !dlMenu.hidden) {
      setSub(false)
      dlToggle.focus()
    } else if (nav && nav.classList.contains('is-open')) {
      setNav(false)
      burger.focus()
    }
  })

  if (nav) {
    nav.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener('click', () => setNav(false))
    )
  }

  /* -------------------------------------------------------------------------
     3. Motion helpers
     Lanes call GX.enter() and GX.onView(); this file owns the guarantees.
     ------------------------------------------------------------------------- */
  const M = window.Motion
  const live = !!M && !reduced

  /* If Motion never arrived, or the visitor asked for less movement, settle
     every declared reveal now so CSS that keys off .is-in (underline sweeps,
     drawn rules) still reaches its final state. */
  if (!live) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
  }

  /* Everything a lane hides must be recoverable. Two things conspire against
     that: a page loaded in a background tab never advances a frame, so an
     animation sits on its first keyframe indefinitely; and clearing the styles
     is not enough, because the animation still owns the property and writes
     the start value back on its next tick.
     So: hold all choreography until the page is actually visible, and if it
     somehow starts anyway, finish the animation rather than fight it. */
  const pending = new Map() /* element -> animation, or null if not started */

  /* Bring one element to its final state no matter what state it is in.
     Completing the animation matters: an abandoned animation still owns the
     property and will write its start value back on the next tick, so clearing
     the inline styles alone is not enough. */
  const reveal = (el) => {
    const anim = pending.get(el)
    if (anim) {
      try {
        anim.complete()
      } catch (_) {
        try {
          anim.stop()
        } catch (_) {}
      }
    }
    el.classList.add('is-in')
    el.style.opacity = ''
    el.style.transform = ''
    pending.delete(el)
  }

  /* Hold every registration until the document is actually visible. A page
     opened in a background tab never advances a frame, so an animation started
     there sits on its first keyframe indefinitely: with opacity 0 as the first
     keyframe, that is an invisible page. */
  const queue = []
  let visible = !document.hidden
  if (!visible) {
    document.addEventListener('visibilitychange', function onVis() {
      if (document.hidden) return
      document.removeEventListener('visibilitychange', onVis)
      visible = true
      while (queue.length) queue.shift()()
    })
  }
  const defer = (fn) => (visible ? fn() : queue.push(fn))

  const armed = { done: false }
  function arm() {
    if (armed.done) return
    armed.done = true
    root.classList.add('anim')

    /* Backstop for an observer that never reports. If the page has been visible
       for a few seconds and not one animation has started, the trigger is
       broken rather than merely waiting, so drop the whole hidden state. */
    setTimeout(() => {
      if (started === 0) {
        pending.forEach((_, el) => reveal(el))
        root.classList.remove('anim')
      }
    }, 3200)
  }

  let started = 0

  /* Settling is what actually makes an element visible for good: it drops the
     class the hidden state hangs off and clears whatever inline values the
     animation left on the element. Both halves matter — Motion writes an inline
     `opacity: 0` as its start value, and an inline declaration outranks the
     stylesheet, so removing the class alone can leave the element invisible. */
  const settle = (el) => {
    el.classList.add('is-in')
    el.style.opacity = ''
    el.style.transform = ''
    pending.delete(el)
  }

  /* Never trust an animation to report its own completion. `finished` can stay
     unresolved indefinitely — a suspended frame loop, a cancelled animation, a
     tab that stopped rendering — and an unsettled element stays at opacity 0
     forever. So every animation also gets a timer sized to its own length. */
  const track = (el, anim, opts) => {
    started++
    pending.set(el, anim)
    anim.finished.then(
      () => settle(el),
      () => settle(el)
    )
    const secs = (opts.delay || 0) + (opts.duration || 1.2)
    setTimeout(() => settle(el), secs * 1000 + 700)
  }

  /* ---------------------------------------------------------------------------
     Geometric fallback for scroll triggers.
     An IntersectionObserver that never reports leaves every element below the
     fold hidden, and the page looks like a set of empty sections. This watches
     the same elements with the same threshold and fires the same callback, so
     whichever mechanism gets there first wins and the other becomes a no-op.
     --------------------------------------------------------------------------- */
  const watch = []
  let ticker = null

  const inViewport = (el, amount) => {
    const r = el.getBoundingClientRect()
    /* Already scrolled past. A fast scroll or a jump to an anchor can carry an
       element through the viewport between two checks, and it must never be
       left hidden above the fold. */
    if (r.bottom < 0) return true
    if (r.top > innerHeight) return false
    if (r.height === 0) return true
    /* taller than the viewport: it can never satisfy a ratio, so treat it as in
       view once it spans the screen */
    if (r.height > innerHeight) return r.top <= 0 && r.bottom >= 0
    const shown = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)
    return shown / r.height >= Math.min(amount, 0.95)
  }

  const sweep = () => {
    for (let i = watch.length - 1; i >= 0; i--) {
      const it = watch[i]
      if (it.done()) {
        watch.splice(i, 1)
        continue
      }
      if (inViewport(it.el, it.amount)) {
        watch.splice(i, 1)
        it.run()
      }
    }
    if (!watch.length && ticker) {
      clearInterval(ticker)
      removeEventListener('scroll', onScrollSweep)
      ticker = null
    }
  }

  let queued = false
  function onScrollSweep() {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      sweep()
    })
  }

  const observeGeometrically = (el, amount, run, done) => {
    watch.push({ el, amount, run, done })
    if (!ticker) {
      /* an interval as well as the scroll listener: timers keep running in
         situations where neither scroll events nor observers do */
      ticker = setInterval(sweep, 800)
      addEventListener('scroll', onScrollSweep, { passive: true })
      window.addEventListener('pagehide', () => clearInterval(ticker), { once: true })
    }
  }

  const GX = {
    motion: M,
    live,
    reduced,

    /* Standard easing. Exponential ease-out, no bounce. */
    ease: [0.16, 1, 0.3, 1],
    easeSoft: [0.33, 1, 0.68, 1],

    /* Above-the-fold choreography: animate as soon as the page is on screen. */
    enter(selector, build, { stagger = 0.07, base = 0.05 } = {}) {
      const items = [...document.querySelectorAll(selector)]
      if (!items.length || !live) return
      arm()
      items.forEach((el) => pending.set(el, null))
      defer(() => {
        items.forEach((el, i) => {
          const [keyframes, opts] = build(el, i)
          const o = { delay: base + i * stagger, ...opts }
          track(el, M.animate(el, keyframes, o), o)
        })
      })
    },

    /* Scroll-triggered, once per element.
       Stagger is per burst, not per index: elements that cross the threshold
       together are offset from each other, but an element scrolled to a minute
       later starts immediately instead of inheriting a stale delay. */
    onView(selector, build, { amount = 0.15, stagger = 0 } = {}) {
      const items = [...document.querySelectorAll(selector)]
      if (!items.length || !live) return
      arm()
      items.forEach((el) => pending.set(el, null))
      defer(() => {
        let lastFire = 0
        let burst = 0
        items.forEach((el, i) => {
          let stop = null
          let fired = false
          const run = () => {
            if (fired) return
            fired = true
            if (stop) stop()
            const now = performance.now()
            burst = now - lastFire > 150 ? 0 : burst + 1
            lastFire = now
            const [keyframes, opts] = build(el, i)
            const o = { delay: burst * stagger, ...opts }
            track(el, M.animate(el, keyframes, o), o)
          }
          stop = M.inView(el, run, { amount })
          /* Same element, same threshold, same callback, measured directly.
             Whichever fires first wins; `fired` makes the other a no-op. */
          observeGeometrically(el, amount, run, () => fired)
        })
      })
    },

    /* Count a number up when it scrolls into view. Reads the target from the
       element so the real value is in the HTML for no-JS and for crawlers. */
    countUp(selector, { duration = 1.4 } = {}) {
      if (!live) return
      defer(() => GX._countUp(selector, duration))
    },

    _countUp(selector, duration) {
      document.querySelectorAll(selector).forEach((el) => {
        const to = Number(el.dataset.count || el.textContent.replace(/\s/g, ''))
        if (!Number.isFinite(to)) return
        const pad = el.textContent.trim().length
        let stop = null
        let fired = false
        const run = () => {
          if (fired) return
          fired = true
          if (stop) stop()
          M.animate(0, to, {
            duration,
            ease: GX.easeSoft,
            onUpdate: (v) => {
              el.textContent = String(Math.round(v)).padStart(
                to >= 1000 ? 0 : pad,
                '0'
              )
            },
            onComplete: () => {
              el.textContent = String(to)
            },
          })
          /* the real value is already in the HTML, but if the counter is
             interrupted mid-count the element would keep a partial number */
          setTimeout(() => {
            el.textContent = String(to)
          }, duration * 1000 + 700)
        }
        stop = M.inView(el, run, { amount: 0.6 })
        observeGeometrically(el, 0.6, run, () => fired)
      })
    },

    /* Scroll-linked value, e.g. a progress rail. Motion hands the callback the
       progress number for the chosen axis, not an info object. */
    progress(fn, target) {
      if (!live || !M.scroll) return
      M.scroll((p) => fn(p), target ? { target, axis: 'y' } : { axis: 'y' })
    },
  }

  window.GX = GX

  /* Orphan sweep.
     `data-reveal` in the markup only means "may be revealed"; it is the lane
     script that claims an element by registering it. An element that is marked
     but never claimed — because a selector changed, or because the lane animates
     its children instead — would be hidden by the stylesheet with nothing left
     to un-hide it. Anything unclaimed once the lane has finished registering is
     therefore made visible immediately. */
  setTimeout(() => {
    if (!live) return
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (!pending.has(el) && !el.classList.contains('is-in')) settle(el)
    })
  }, 0)

  /* Lanes load after this file but Motion is deferred too; if a lane script
     ran before Motion parsed, it would silently no-op. Signal readiness. */
  document.dispatchEvent(new CustomEvent('gx:ready', { detail: GX }))
})()
