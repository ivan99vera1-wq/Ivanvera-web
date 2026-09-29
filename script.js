/* ============================================================
   Ivan Vera — animaciones y comportamiento (vanilla JS)
   ============================================================ */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = window.matchMedia('(pointer: fine)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  if (fine) document.body.classList.add('pointer-fine');

  /* ----------------------------------------------------------
     1. Lluvia de código tras el hero
  ---------------------------------------------------------- */
  const rain = $('#rain');
  if (rain && !reduce) {
    const fragments = [
      'System.out.println', 'public static void main', 'SELECT * FROM',
      'int numero = 0;', '// TODO', 'String nombre = "Ivan";',
      'import java.util.Scanner', 'return true;', 'console.log()',
      'CREATE TABLE', 'new Scanner(System.in)', '<section>',
      'git commit -m', 'npm run build', 'double altura = 1.79;'
    ];
    const n = window.innerWidth < 700 ? 10 : 20;
    for (let i = 0; i < n; i++) {
      const b = document.createElement('b');
      b.textContent = fragments[i % fragments.length];
      b.style.left = (Math.random() * 96).toFixed(2) + '%';
      b.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + 's';
      b.style.animationDelay = (-Math.random() * 16).toFixed(1) + 's';
      b.style.fontSize = (0.62 + Math.random() * 0.35).toFixed(2) + 'rem';
      rain.appendChild(b);
    }
  }

  /* ----------------------------------------------------------
     2. Máquina de escribir en el nombre
  ---------------------------------------------------------- */
  const typed = $('#typed');
  const NAME = 'Ivan Vera';
  if (typed) {
    if (reduce) {
      typed.textContent = NAME;
    } else {
      let i = 0;
      const tick = () => {
        typed.textContent = NAME.slice(0, ++i);
        if (i < NAME.length) setTimeout(tick, 95 + Math.random() * 90);
      };
      setTimeout(tick, 450);
    }
  }

  /* ----------------------------------------------------------
     3. Glitch periódico en el nombre
  ---------------------------------------------------------- */
  const glitch = $('.glitch');
  if (glitch && !reduce) {
    const fire = () => {
      glitch.classList.add('on');
      setTimeout(() => glitch.classList.remove('on'), 340);
    };
    setInterval(() => { if (Math.random() > 0.35) fire(); }, 3800);
    setTimeout(fire, 1900);
  }

  /* ----------------------------------------------------------
     4. Reveal al entrar en pantalla (en cascada)
  ---------------------------------------------------------- */
  const revealables = $$('.reveal');
  if (reduce) {
    revealables.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const parent = e.target.parentElement;
        const sibs = parent ? $$('.reveal', parent) : [];
        const idx = Math.max(0, sibs.indexOf(e.target));
        e.target.style.transitionDelay = Math.min(idx * 70, 420) + 'ms';
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     5. Contadores de 0 al valor
  ---------------------------------------------------------- */
  const counters = $$('[data-count]');
  const runCount = el => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (reduce) { el.textContent = target; return; }
    const dur = 1500, t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ----------------------------------------------------------
     6. Barras de skills que se rellenan
  ---------------------------------------------------------- */
  const bars = $$('.bar i[data-level]');
  if (bars.length) {
    const bio = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.setProperty('--w', el.dataset.level + '%');
        el.classList.add('grow');
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    bars.forEach(el => bio.observe(el));
  }

  /* ----------------------------------------------------------
     7. Barra de progreso de scroll
  ---------------------------------------------------------- */
  const progress = $('#progress span');

  /* ----------------------------------------------------------
     8. Nav: píldora deslizante + scrollspy + hamburguesa
  ---------------------------------------------------------- */
  const menu   = $('#menu');
  const pill   = $('#pill');
  const burger = $('#burger');
  const links  = $$('.menu a');
  const topbar = $('#topbar');

  const movePill = link => {
    if (!pill || !link || window.innerWidth <= 760) return;
    pill.style.width = link.offsetWidth + 'px';
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
    pill.classList.add('on');
  };

  const setActive = link => {
    links.forEach(a => a.classList.toggle('active', a === link));
    movePill(link);
  };

  const sections = links
    .map(a => ({ link: a, el: $(a.getAttribute('href')) }))
    .filter(s => s.el);

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (topbar) topbar.classList.toggle('stuck', y > 24);

    /* parallax del aurora */
    const aurora = $('#aurora');
    if (aurora && !reduce) aurora.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;

    /* scrollspy */
    const probe = y + window.innerHeight * 0.35;
    let current = sections[0];
    for (const s of sections) if (s.el.offsetTop <= probe) current = s;
    if (current && !current.link.classList.contains('active')) setActive(current.link);

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const active = $('.menu a.active');
    if (active && window.innerWidth > 760) movePill(active);
  });

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ----------------------------------------------------------
     9. Spotlight que sigue al cursor
  ---------------------------------------------------------- */
  if (fine) {
    let sx = 50, sy = 30, tx = 50, ty = 30, raf = null;
    const loop = () => {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      document.documentElement.style.setProperty('--mx', sx + '%');
      document.documentElement.style.setProperty('--my', sy + '%');
      raf = Math.abs(tx - sx) + Math.abs(ty - sy) > 0.2 ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener('pointermove', e => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     10. Tarjetas 3D con el ratón
  ---------------------------------------------------------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((px - 0.5) * 11).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 11).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ----------------------------------------------------------
     11. Arranque
  ---------------------------------------------------------- */
  const boot = () => {
    onScroll();
    const first = $('.menu a.active');
    if (first) requestAnimationFrame(() => movePill(first));
  };

  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();
