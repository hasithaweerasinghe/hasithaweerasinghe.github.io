const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkQuery = matchMedia('(prefers-color-scheme: dark)');

/* ---------- Theme ---------- */

const themeListeners: (() => void)[] = [];

function currentTheme(): 'light' | 'dark' {
  const set = root.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return darkQuery.matches ? 'dark' : 'light';
}

function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    themeListeners.forEach((fn) => fn());
  };
  if (!reduceMotion && document.startViewTransition) document.startViewTransition(apply);
  else apply();
}

darkQuery.addEventListener('change', () => themeListeners.forEach((fn) => fn()));
document.querySelectorAll('[data-theme-toggle]').forEach((btn) => btn.addEventListener('click', toggleTheme));

/* ---------- Platform-aware shortcut labels ---------- */

const isApple = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const hasFinePointer = matchMedia('(pointer: fine)').matches;
document.querySelectorAll<HTMLElement>('[data-mod-key]').forEach((el) => {
  if (!hasFinePointer && el.closest('button')) el.textContent = 'Menu';
  else el.textContent = isApple ? '⌘K' : 'Ctrl K';
});

/* ---------- Nav: scrolled state + active section ---------- */

const nav = document.querySelector<HTMLElement>('[data-nav]');
const onScroll = () => nav?.classList.toggle('scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = `#${entry.target.id}`;
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === id)));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

/* ---------- Typing effect ---------- */

const typed = document.querySelector<HTMLElement>('[data-typed]');
if (typed && !reduceMotion) {
  const phrases: string[] = JSON.parse(typed.dataset.phrases || '[]');
  let phrase = 0;
  let chars = phrases[0]?.length ?? 0;
  let deleting = true;
  const tick = () => {
    const text = phrases[phrase];
    chars += deleting ? -1 : 1;
    typed.textContent = text.slice(0, chars);
    let delay = deleting ? 28 : 55 + Math.random() * 50;
    if (!deleting && chars === text.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && chars === 0) {
      deleting = false;
      phrase = (phrase + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  };
  if (phrases.length > 1) setTimeout(tick, 3000);
}

/* ---------- Card spotlight ---------- */

document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* ---------- Interactive dot field ---------- */

const hero = document.querySelector<HTMLElement>('[data-hero]');
const canvas = document.querySelector<HTMLCanvasElement>('[data-field]');
const ctx = canvas?.getContext('2d');

if (hero && canvas && ctx) {
  const GAP = 26;
  const RADIUS = 170;
  let w = 0;
  let h = 0;
  let dots: { x: number; y: number }[] = [];
  let dotColor = '';
  let hotColor = '';
  let frame = 0;
  let running = false;
  let visible = true;
  const target = { x: -9999, y: -9999 };
  const mouse = { x: -9999, y: -9999 };

  const readColors = () => {
    const cs = getComputedStyle(canvas);
    dotColor = cs.color;
    hotColor = cs.outlineColor;
  };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    const offX = (w % GAP) / 2;
    const offY = (h % GAP) / 2;
    for (let y = offY; y <= h; y += GAP) for (let x = offX; x <= w; x += GAP) dots.push({ x, y });
    draw(performance.now());
  };

  const draw = (now: number) => {
    const t = now / 1000;
    mouse.x += (target.x - mouse.x) * 0.12;
    mouse.y += (target.y - mouse.y) * 0.12;
    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      let x = d.x;
      let y = d.y;
      let size = 1.1;
      let alpha = 0.35;

      if (!reduceMotion) alpha += 0.12 * (Math.sin(d.x * 0.011 + t * 0.8) + Math.cos(d.y * 0.014 - t * 0.6));

      let heat = 0;
      if (dist < RADIUS) {
        heat = 1 - dist / RADIUS;
        const push = heat * heat * 22;
        x += (dx / (dist || 1)) * push;
        y += (dy / (dist || 1)) * push;
        size += heat * 1.8;
        alpha += heat * 0.7;
      }

      ctx.globalAlpha = Math.min(1, Math.max(0.06, alpha));
      ctx.fillStyle = heat > 0.2 ? hotColor : dotColor;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now: number) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    target.x = e.clientX - r.left;
    target.y = e.clientY - r.top;
    if (reduceMotion) {
      mouse.x = target.x;
      mouse.y = target.y;
      draw(0);
    }
  });
  hero.addEventListener('pointerleave', () => {
    target.x = target.y = -9999;
    if (reduceMotion) {
      mouse.x = mouse.y = -9999;
      draw(0);
    }
  });

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  themeListeners.push(() => {
    readColors();
    draw(performance.now());
  });

  readColors();
  resize();
  start();
}

/* ---------- Command palette ---------- */

const palette = document.querySelector<HTMLDialogElement>('[data-palette]');
const input = document.querySelector<HTMLInputElement>('[data-palette-input]');
const list = document.querySelector<HTMLUListElement>('[data-palette-list]');
const empty = document.querySelector<HTMLElement>('[data-palette-empty]');
const toast = document.querySelector<HTMLElement>('[data-palette-toast]');

if (palette && input && list && empty && toast) {
  const items = [...list.querySelectorAll<HTMLLIElement>('[role="option"]')];
  let active = 0;

  const visibleItems = () => items.filter((i) => !i.hidden);

  const setActive = (index: number) => {
    const vis = visibleItems();
    if (!vis.length) return input.removeAttribute('aria-activedescendant');
    active = (index + vis.length) % vis.length;
    vis.forEach((el, i) => el.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', vis[active].id);
    vis[active].scrollIntoView({ block: 'nearest' });
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach((el) => {
      el.hidden = !!q && !el.textContent!.toLowerCase().includes(q);
      el.setAttribute('aria-selected', 'false');
    });
    empty.hidden = visibleItems().length > 0;
    setActive(0);
  };

  const open = () => {
    if (palette.open) return;
    input.value = '';
    toast.textContent = '';
    filter();
    palette.showModal();
    input.focus();
  };

  const run = async (el: HTMLLIElement) => {
    const { href, action } = el.dataset;
    if (action === 'theme') {
      palette.close();
      toggleTheme();
    } else if (action === 'copy') {
      try {
        await navigator.clipboard.writeText(location.origin);
        toast.textContent = 'Link copied to clipboard.';
      } catch {
        toast.textContent = location.origin;
      }
    } else if (href) {
      palette.close();
      if (el.hasAttribute('data-external')) window.open(href, '_blank', 'noopener');
      else document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));

  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.open ? palette.close() : open();
    }
  });

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active + (e.key === 'ArrowDown' ? 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const el = visibleItems()[active];
      if (el) run(el);
    }
  });

  items.forEach((el) => {
    el.addEventListener('click', () => run(el));
    el.addEventListener('pointermove', () => setActive(visibleItems().indexOf(el)));
  });

  // Close when clicking the backdrop.
  palette.addEventListener('click', (e) => {
    if (e.target === palette) palette.close();
  });
}
