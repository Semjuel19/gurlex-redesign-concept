/* Gurlex redesign concept — progressive enhancement only.
   Nothing here is required to read the page. Entrance motion is handled
   by native CSS scroll-driven animations, not by this file. */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* ---------------------------------------------------------
     1. Age gate
     Demo only: persisted client-side. In production this belongs
     server-side so deep links cannot bypass it.
     --------------------------------------------------------- */
  const KEY = 'gurlex:age-verified';
  const gate = document.getElementById('gate');
  const yes = document.getElementById('gate-yes');
  const no = document.getElementById('gate-no');
  const deny = document.getElementById('gate-deny');
  const regate = document.getElementById('regate');

  let lastFocus = null;

  const focusables = () =>
    [...gate.querySelectorAll('button, [href]')].filter(
      (el) => !el.disabled && !el.hidden && el.offsetParent !== null
    );

  function trap(e) {
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openGate() {
    lastFocus = document.activeElement;
    gate.hidden = false;
    document.body.classList.add('locked');
    deny.hidden = true;
    yes.hidden = false;
    no.hidden = false;
    document.addEventListener('keydown', trap);
    /* synchronous: rAF is suspended in background tabs, and moving focus
       into a modal is functional rather than decorative */
    yes.focus();
    if (document.activeElement !== yes) requestAnimationFrame(() => yes.focus());
  }

  function closeGate() {
    gate.hidden = true;
    document.body.classList.remove('locked');
    document.removeEventListener('keydown', trap);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  let verified = false;
  try {
    verified = localStorage.getItem(KEY) === '1';
  } catch (_) {
    /* private mode: fall through and show the gate */
  }
  if (!verified) openGate();

  yes.addEventListener('click', () => {
    try { localStorage.setItem(KEY, '1'); } catch (_) {}
    closeGate();
  });

  no.addEventListener('click', () => {
    yes.hidden = true;
    no.hidden = true;
    deny.hidden = false;
    deny.focus();
  });

  if (regate) {
    regate.addEventListener('click', () => {
      try { localStorage.removeItem(KEY); } catch (_) {}
      openGate();
    });
  }

  /* ---------------------------------------------------------
     2. Navigation
     --------------------------------------------------------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const dlToggle = document.getElementById('dl-toggle');
  const dlMenu = document.getElementById('dl-menu');

  dlMenu.hidden = true;

  const setSub = (open) => {
    dlMenu.hidden = !open;
    dlToggle.setAttribute('aria-expanded', String(open));
  };
  const setNav = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

  dlToggle.addEventListener('click', () => setSub(dlMenu.hidden));
  burger.addEventListener('click', () => {
    setNav(!nav.classList.contains('is-open'));
    setSub(false);
  });

  document.addEventListener('click', (e) => {
    if (!dlMenu.hidden && !e.target.closest('.nav__has-sub')) setSub(false);
    if (
      nav.classList.contains('is-open') &&
      !e.target.closest('.nav') &&
      !e.target.closest('.burger')
    ) setNav(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!dlMenu.hidden) { setSub(false); dlToggle.focus(); }
    else if (nav.classList.contains('is-open')) { setNav(false); burger.focus(); }
  });

  nav.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', () => setNav(false))
  );

  /* ---------------------------------------------------------
     3. Ticker
     The CSS loop translates by -50%, which is only seamless with
     exactly two copies of the set. Cloning here keeps the markup
     free of duplicated content for screen readers and crawlers.
     --------------------------------------------------------- */
  const run = document.getElementById('ticker-run');
  if (run && run.children.length === 1) {
    const clone = run.firstElementChild.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    run.appendChild(clone);
  }

  /* ---------------------------------------------------------
     4. Shelf rail: drag to scroll with a pointer, in addition to
        native wheel / touch / keyboard scrolling.
     --------------------------------------------------------- */
  const rail = document.querySelector('.shelf__rail');
  if (rail) {
    let down = false, startX = 0, startLeft = 0, moved = false;

    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;   /* let native touch scrolling win */
      down = true; moved = false;
      startX = e.clientX;
      startLeft = rail.scrollLeft;
    });
    rail.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      rail.scrollLeft = startLeft - dx;
    });
    const end = () => { down = false; };
    rail.addEventListener('pointerup', end);
    rail.addEventListener('pointercancel', end);
    rail.addEventListener('pointerleave', end);
    /* a drag should not also activate whatever was under the cursor */
    rail.addEventListener('click', (e) => { if (moved) e.preventDefault(); });
  }
})();
