const LINK_DIST = 120;

function hexToRgbString(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
}

export function initBackground(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rootStyles = getComputedStyle(document.documentElement);
  const dotRgb = hexToRgbString(rootStyles.getPropertyValue('--fg').trim() || '#ece9e4');

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let dots = [];

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initDots() {
    const count = Math.min(160, Math.round((w * h) / 11000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.2 + 0.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 3.14159 * 2);
      ctx.fillStyle = `rgba(${dotRgb}, 0.6)`;
      ctx.fill();
    }

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${dotRgb}, ${(1 - dist / LINK_DIST) * 0.23})`; 
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function tick() {
    for (const d of dots) {
      d.x += d.dx;
      d.y += d.dy;
      if (d.x < 0 || d.x > w) d.dx *= -1;
      if (d.y < 0 || d.y > h) d.dy *= -1;
      d.x = Math.min(Math.max(d.x, 0), w);
      d.y = Math.min(Math.max(d.y, 0), h);
    }
    draw();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    resize();
    initDots();
    if (reduceMotion) draw();
  });

  resize();
  initDots();

  if (reduceMotion) {
    draw();
  } else {
    tick();
  }
}
