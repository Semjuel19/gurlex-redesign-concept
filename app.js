/* Gurlex redesign concept — progressive enhancement only.
   Nothing here is required to read the page. */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* ---------------------------------------------------------
     1. Age gate
     Demo only: persisted client-side. In production this
     belongs server-side so deep links cannot bypass it.
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
      (el) => !el.disabled && el.offsetParent !== null
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
    no.hidden = false;
    yes.hidden = false;
    document.addEventListener('keydown', trap);
    /* Focus moves synchronously: rAF is suspended in background tabs, and
       moving focus into the dialog is functional, not decorative. The extra
       frame is only a retry for engines that need the paint first. */
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
    try {
      localStorage.setItem(KEY, '1');
    } catch (_) {}
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
      try {
        localStorage.removeItem(KEY);
      } catch (_) {}
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

  dlToggle.addEventListener('click', () => {
    setSub(dlMenu.hidden);
  });

  const setNav = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

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
    ) {
      setNav(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!dlMenu.hidden) {
      setSub(false);
      dlToggle.focus();
    } else if (nav.classList.contains('is-open')) {
      setNav(false);
      burger.focus();
    }
  });

  /* close the mobile drawer after jumping to a section */
  nav.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', () => setNav(false))
  );

  /* ---------------------------------------------------------
     3. Entrance reveals
     --------------------------------------------------------- */
  const items = [...document.querySelectorAll('.reveal')];
  items.forEach((el) => {
    if (el.dataset.d) el.style.setProperty('--d', el.dataset.d);
  });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealAll = () => items.forEach((el) => el.classList.add('in'));

  if (!reduce && 'IntersectionObserver' in window && items.length) {
    /* opt in to the hidden starting state only now that we can undo it */
    root.classList.add('anim');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    items.forEach((el) => io.observe(el));

    /* Safety net: observer callbacks are throttled in background tabs and
       absent in some embedded webviews. Never leave content invisible. */
    const net = setTimeout(revealAll, 2000);
    document.addEventListener(
      'visibilitychange',
      () => {
        if (!document.hidden) setTimeout(revealAll, 1200);
      },
      { once: true }
    );
    window.addEventListener('pagehide', () => clearTimeout(net), { once: true });
  }
})();
