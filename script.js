/* ============================================================
   Ivan Vera — comportamiento (vanilla JS, sin dependencias)
   Todo el contenido es visible sin JS; esto solo añade movimiento
   e interacción.
   ============================================================ */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  if (fine) document.body.classList.add('pointer-fine');

  /* ----------------------------------------------------------
     1. Resaltado de sintaxis + números de línea
  ---------------------------------------------------------- */
  const GRAMMARS = {
    java: [
      ['c', /\/\/[^\n]*/y],
      ['s', /"(?:[^"\\\n]|\\.)*"/y],
      ['k', /\b(?:public|private|static|void|class|new|import|return|int|double|boolean|char|long|float|if|else|for|while)\b/y],
      ['t', /\b(?:String|Scanner|System|Main)\b/y],
      ['n', /\b\d+(?:\.\d+)?\b/y],
    ],
    json: [
      ['t', /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y],
      ['s', /"(?:[^"\\\n]|\\.)*"/y],
      ['n', /\b\d+(?:\.\d+)?\b/y],
      ['k', /\b(?:true|false|null)\b/y],
    ],
  };
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const highlight = (src, rules) => {
    let out = '', plain = '', i = 0;
    const flush = () => { out += esc(plain); plain = ''; };
    while (i < src.length) {
      let hit = null;
      for (const [cls, re] of rules) {
        re.lastIndex = i;
        const m = re.exec(src);
        if (m) { hit = [cls, m[0]]; break; }
      }
      if (hit) {
        flush();
        out += `<span class="tk-${hit[0]}">${esc(hit[1])}</span>`;
        i += hit[1].length;
      } else {
        plain += src[i++];
      }
    }
    flush();
    return out;
  };

  $$('code[data-lang]').forEach(code => {
    const rules = GRAMMARS[code.dataset.lang];
    if (!rules) return;
    const src = code.textContent;
    code.dataset.raw = src;
    code.innerHTML = highlight(src, rules)
      .split('\n')
      .map(l => `<span class="line">${l}</span>`)
      .join('\n');
  });

  /* ----------------------------------------------------------
     2. Ejecutor de programas: escribe el comando y muestra la
        salida real. El de Scanner pide el nombre de verdad.
  ---------------------------------------------------------- */
  const makeRunner = scope => {
    const out = $('.console-out', scope);
    const btn = $('.run', scope);
    if (!out || !btn) return null;

    const cmd = $('.c-cmd', out);
    const prompt = $('.c-prompt', cmd);
    const cmdText = cmd.textContent.replace(prompt.textContent, '').trim();
    const typed = document.createElement('span');
    typed.className = 'c-typed';
    cmd.replaceChildren(prompt, ' ', typed);
    const lines = $$('.c-line', out);
    const interactive = out.dataset.interactive === 'true';
    let runId = 0;

    const addLine = (text, cls = '') => {
      const span = document.createElement('span');
      span.className = `c-line c-dyn ${cls}`.trim();
      span.textContent = text;
      out.append(Object.assign(document.createElement('span'), { className: 'c-dyn', textContent: '\n' }), span);
      requestAnimationFrame(() => span.classList.add('on'));
      return span;
    };

    /* Scanner.nextLine(): una línea de entrada editable */
    const askName = focus => {
      out.append(Object.assign(document.createElement('span'), { className: 'c-dyn', textContent: '\n' }));
      const wrap = document.createElement('span');
      wrap.className = 'c-input c-dyn';
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 30;
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.placeholder = 'escribe tu nombre';
      input.setAttribute('aria-label', 'Escribe tu nombre y pulsa Enter');
      wrap.append(input, Object.assign(document.createElement('span'), { className: 'c-hint', textContent: '  Enter' }));
      out.append(wrap);
      input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const name = input.value;
        wrap.replaceWith(Object.assign(document.createElement('span'), { className: 'c-line c-echo c-dyn on', textContent: name }));
        addLine('Hola ' + name);
      });
      if (focus) input.focus({ preventScroll: true });
    };

    const run = async ({ focus = false } = {}) => {
      const id = ++runId;
      const stale = () => id !== runId;
      btn.disabled = true;
      $$('.c-dyn', out).forEach(n => n.remove());
      lines.forEach(l => l.classList.remove('on'));

      if (reduce) {
        typed.textContent = cmdText;
        lines.forEach(l => l.classList.add('on'));
      } else {
        typed.textContent = '';
        out.classList.add('is-typing');
        for (const ch of cmdText) {
          typed.textContent += ch;
          await wait(34 + Math.random() * 38);
          if (stale()) return;
        }
        await wait(240);
        if (stale()) return;
        out.classList.remove('is-typing');
        for (const l of lines) {
          l.classList.add('on');
          await wait(110);
          if (stale()) return;
        }
      }
      if (interactive) askName(focus);
      btn.disabled = false;
    };

    btn.addEventListener('click', () => run({ focus: true }));

    /* estado inicial: vacío hasta la primera ejecución (sin movimiento: completo) */
    if (reduce) {
      typed.textContent = cmdText;
      lines.forEach(l => l.classList.add('on'));
      if (interactive) askName(false);
    } else {
      typed.textContent = '';
      lines.forEach(l => l.classList.remove('on'));
    }
    return { run, scope };
  };

  const heroRunner = makeRunner($('.panel--hero'));
  const exRunners = new Map($$('.ex-panel').map(p => [p.id, makeRunner(p)]));

  /* ----------------------------------------------------------
     3. Hero: máquina de escribir en el nombre → entrada del resto
        → el programa se ejecuta
  ---------------------------------------------------------- */
  const hero = $('.hero');
  const nameEl = $('.hero-name');
  const typedName = $('#typed');
  $$('[data-enter]').forEach((el, i) => el.style.setProperty('--i', i));

  const startHeroRun = () => {
    if (!heroRunner || reduce) return;
    const rio = new IntersectionObserver((entries, obs) => {
      if (!entries.some(e => e.isIntersecting)) return;
      obs.disconnect();
      setTimeout(() => heroRunner.run(), 500);
    }, { threshold: 0.4 });
    rio.observe($('.console-out', heroRunner.scope));
  };

  if (reduce || !typedName) {
    hero && hero.classList.add('is-loaded');
  } else {
    const NAME = typedName.textContent;
    typedName.textContent = '';
    nameEl.classList.add('is-typing');
    let i = 0;
    const tick = () => {
      typedName.textContent = NAME.slice(0, ++i);
      if (i < NAME.length) return setTimeout(tick, 70 + Math.random() * 70);
      nameEl.classList.remove('is-typing');
      nameEl.classList.add('is-typed');
      hero.classList.add('is-loaded');
      startHeroRun();
    };
    setTimeout(tick, 350);
  }

  /* ----------------------------------------------------------
     4. Títulos de sección: letra a letra con desenfoque
  ---------------------------------------------------------- */
  if (!reduce) {
    $$('.sec-title').forEach(h => {
      h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
      let c = 0;
      const splitNode = node => {
        Array.from(node.childNodes).forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach(part => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.append(' '); return; }
              const word = document.createElement('span');
              word.className = 'word';
              word.setAttribute('aria-hidden', 'true');
              for (const ch of part) {
                const s = document.createElement('span');
                s.className = 'ch';
                s.style.setProperty('--c', c++);
                s.textContent = ch;
                word.append(s);
              }
              frag.append(word);
            });
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
            splitNode(child);
          }
        });
      };
      splitNode(h);
      h.classList.add('split-title');
    });
  }

  /* ----------------------------------------------------------
     5. Reveal al entrar en pantalla (cascada corta por grupo)
  ---------------------------------------------------------- */
  const revealables = $$('.reveal');
  if (reduce) {
    revealables.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const sibs = e.target.parentElement ? $$(':scope > .reveal', e.target.parentElement) : [];
        const idx = Math.max(0, sibs.indexOf(e.target));
        e.target.style.transitionDelay = Math.min(idx * 70, 280) + 'ms';
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     6. Barras de nivel + contador del número (se observa la
        lista: una barra a escala 0 no tiene área visible)
  ---------------------------------------------------------- */
  const skills = $('.skills');
  if (skills) {
    const grow = () => $$('.skill', skills).forEach((row, i) => {
      const bar = $('.meter i', row);
      const num = $('em', row);
      bar.style.transitionDelay = i * 90 + 'ms';
      bar.classList.add('grow');
      if (reduce || !num) return;
      const target = parseInt(num.textContent, 10);
      const t0 = performance.now() + i * 90;
      num.textContent = '0';
      const step = now => {
        const p = Math.min(Math.max((now - t0) / 1100, 0), 1);
        num.textContent = Math.round(target * easeOut(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (reduce) grow();
    else new IntersectionObserver((entries, obs) => {
      if (!entries.some(e => e.isIntersecting)) return;
      obs.disconnect();
      grow();
    }, { threshold: 0.35 }).observe(skills);
  }

  /* ----------------------------------------------------------
     7. Pestañas de ejercicios (patrón ARIA tabs, con flechas).
        Al elegir un ejercicio, su programa se ejecuta.
  ---------------------------------------------------------- */
  const tabs = $$('.ex-tab');
  if (tabs.length) {
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const select = (tab, focus) => {
      tabs.forEach((t, i) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        if (on && !reduce) {
          panels[i].classList.remove('is-entering');
          void panels[i].offsetWidth;
          panels[i].classList.add('is-entering');
        }
      });
      if (focus) tab.focus();
      const r = exRunners.get(tab.getAttribute('aria-controls'));
      if (r && !reduce) r.run();
    };
    tabs.forEach((t, i) => {
      panels[i].hidden = t.getAttribute('aria-selected') !== 'true';
      t.addEventListener('click', () => select(t, false));
      t.addEventListener('keydown', e => {
        const n = tabs.length;
        let j = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + n) % n;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = n - 1;
        if (j === null) return;
        e.preventDefault();
        select(tabs[j], true);
      });
    });

    /* primera ejecución del ejercicio visible al llegar a la sección */
    const tabsPanel = $('.panel--tabs');
    if (tabsPanel && !reduce) {
      new IntersectionObserver((entries, obs) => {
        if (!entries.some(e => e.isIntersecting)) return;
        obs.disconnect();
        const current = tabs.find(t => t.getAttribute('aria-selected') === 'true');
        const r = current && exRunners.get(current.getAttribute('aria-controls'));
        if (r) setTimeout(() => r.run(), 400);
      }, { threshold: 0.35 }).observe(tabsPanel);
    }
  }

  /* ----------------------------------------------------------
     8. Botones de copiar
  ---------------------------------------------------------- */
  const live = document.createElement('span');
  live.setAttribute('role', 'status');
  Object.assign(live.style, { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' });
  document.body.append(live);

  const copyText = async text => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.append(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  };

  $$('.copy').forEach(btn => {
    const label = btn.textContent;
    let timer;
    btn.addEventListener('click', async () => {
      const target = btn.dataset.copyTarget && document.getElementById(btn.dataset.copyTarget);
      const text = btn.dataset.copy || (target && (target.dataset.raw || target.textContent)) || '';
      if (!(await copyText(text))) return;
      clearTimeout(timer);
      btn.textContent = 'Copiado';
      btn.classList.add('is-done');
      live.textContent = 'Copiado al portapapeles';
      timer = setTimeout(() => {
        btn.textContent = label;
        btn.classList.remove('is-done');
        live.textContent = '';
      }, 1600);
    });
  });

  /* ----------------------------------------------------------
     9. Nav: subrayado deslizante + scrollspy + progreso + menú
  ---------------------------------------------------------- */
  const menu     = $('#menu');
  const line     = $('#menuLine');
  const burger   = $('#burger');
  const links    = $$('.menu a');
  const topbar   = $('#topbar');
  const progress = $('#progress');
  const mobile = () => window.innerWidth <= 760;

  const moveLine = link => {
    if (!line || !link || mobile()) return;
    line.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth / 100})`;
    line.classList.add('on');
  };

  const setActive = link => {
    links.forEach(a => {
      const on = a === link;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    moveLine(link);
  };

  const sections = links
    .map(a => ({ link: a, el: $(a.getAttribute('href')) }))
    .filter(s => s.el);

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (topbar) topbar.classList.toggle('stuck', y > 16);
    const probe = y + window.innerHeight * 0.35;
    let current = sections[0];
    for (const s of sections) if (s.el.offsetTop <= probe) current = s;
    /* al llegar al final, la última sección siempre queda activa */
    if (y >= max - 4) current = sections[sections.length - 1];
    if (current && !current.link.classList.contains('active')) setActive(current.link);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  window.addEventListener('resize', () => moveLine($('.menu a.active')));

  if (burger && menu) {
    const setMenu = open => {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    links.forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
    });
    document.addEventListener('click', e => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });
  }

  /* ----------------------------------------------------------
     10. Fondo: código real cayendo en tres profundidades
  ---------------------------------------------------------- */
  const canvas = $('#bgCode');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const FRAGMENTS = [
      'System.out.println("Hola , Me llamo Ivan");', 'String nombre = "Ivan";',
      'String ciudad = "Madrid";', 'int edad = 27;', 'double altura = 1.79;',
      'int resultado = numero1 + numero2;', 'int division = numero1 / numero2;',
      'Scanner scanner = new Scanner(System.in);', 'String nombre = scanner.nextLine();',
      'import java.util.Scanner;', 'public static void main(String[] args) {',
      'scanner.close();', 'SELECT * FROM', 'git commit -m', 'next build → out/',
      'deploy → vercel.app', '// Variables', '// Mostrar en pantalla',
    ];
    const COLORS = ['164,172,182', '164,172,182', '164,172,182', '76,195,138', '232,192,125', '140,192,240'];
    const LAYERS = [
      { size: 11, alpha: 0.08, speed: [7, 11] },
      { size: 13, alpha: 0.12, speed: [11, 17] },
      { size: 15, alpha: 0.17, speed: [17, 26] },
    ];
    const coarse = !fine;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    let W = 0, H = 0, drops = [];
    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    const spawn = (d, anywhere) => {
      const L = LAYERS[d.layer];
      d.text = pick(FRAGMENTS);
      d.color = pick(COLORS);
      d.speed = rand(L.speed[0], L.speed[1]);
      d.x = rand(-40, W - 60);
      d.y = anywhere ? rand(-40, H) : rand(-120, -20);
      return d;
    };

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = W < 700 ? 12 : W < 1200 ? 20 : 26;
      drops = Array.from({ length: n }, (_, i) => spawn({ layer: i % 3 }, true))
        .sort((a, b) => a.layer - b.layer);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let layer = -1;
      for (const d of drops) {
        if (d.layer !== layer) {
          layer = d.layer;
          ctx.font = `${LAYERS[layer].size}px "JetBrains Mono", ui-monospace, monospace`;
        }
        /* aparece arriba y se desvanece en el último 25 % de la pantalla */
        const fadeIn = Math.min(1, (d.y + 20) / 120);
        const fadeOut = Math.min(1, (H - d.y) / (H * 0.25));
        const a = LAYERS[layer].alpha * Math.max(0, Math.min(fadeIn, fadeOut));
        if (a <= 0) continue;
        ctx.fillStyle = `rgba(${d.color},${a.toFixed(3)})`;
        ctx.fillText(d.text, d.x, d.y);
      }
    };

    let last = 0, raf = null, acc = 0;
    const FRAME = coarse ? 1000 / 30 : 0;   /* táctil: 30 fps para no calentar el móvil */
    const loop = now => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(now - (last || now), 100);
      last = now;
      acc += dt;
      if (acc < FRAME) return;
      const step = acc / 1000;
      acc = 0;
      for (const d of drops) {
        d.y += d.speed * step;
        if (d.y > H + 20) spawn(d, false);
      }
      draw();
    };

    const start = () => { if (!raf && !reduce) { last = 0; raf = requestAnimationFrame(loop); } };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };

    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      resize();
      draw();
      start();
    });
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); draw(); }, 150); });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  /* luz verde sobre la rejilla, siguiendo al cursor (con inercia) */
  const glow = $('#bgGlow');
  if (fine && glow) {
    let sx = innerWidth / 2, sy = innerHeight * 0.4, tx = sx, ty = sy, graf = null;
    const follow = () => {
      sx += (tx - sx) * 0.14;
      sy += (ty - sy) * 0.14;
      glow.style.setProperty('--mx', sx.toFixed(1) + 'px');
      glow.style.setProperty('--my', sy.toFixed(1) + 'px');
      graf = Math.abs(tx - sx) + Math.abs(ty - sy) > 0.5 ? requestAnimationFrame(follow) : null;
    };
    window.addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      if (!graf) graf = requestAnimationFrame(follow);
    }, { passive: true });
  }

  /* la aurora del hero se pausa cuando no está en pantalla */
  const heroLight = $('.hero-light');
  if (heroLight) {
    new IntersectionObserver(entries => {
      entries.forEach(e => heroLight.classList.toggle('paused', !e.isIntersecting));
    }).observe(hero);
  }

  /* ----------------------------------------------------------
     11. Capturas de proyectos: inclinación 3D + reflejo
  ---------------------------------------------------------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.classList.add('is-tilting');
        card.style.setProperty('--ry', ((px - 0.5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* botones magnéticos: se acercan un poco al cursor (máx. 6px).
     El transform lo anima la transición CSS, así que es interrumpible. */
  if (fine && !reduce) {
    $$('.btn').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.setProperty('--bx', (dx * 6).toFixed(2) + 'px');
        btn.style.setProperty('--by', (dy * 4).toFixed(2) + 'px');
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--bx', '0px');
        btn.style.setProperty('--by', '0px');
      });
    });
  }

  /* ----------------------------------------------------------
     12. Instagram: embed.js solo cuando la sección se acerca
  ---------------------------------------------------------- */
  const igSection = $('#instagram');
  if (igSection) {
    const igio = new IntersectionObserver((entries, obs) => {
      if (!entries.some(e => e.isIntersecting)) return;
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
      obs.disconnect();
    }, { rootMargin: '600px 0px' });
    igio.observe(igSection);
  }

  /* ----------------------------------------------------------
     13. Arranque: la línea del menú se coloca cuando ya hay fuentes
  ---------------------------------------------------------- */
  onScroll();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => moveLine($('.menu a.active')));
})();
