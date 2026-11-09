/* ==========================================================================
   Kit de ilustración: genera SVG con azar determinista (mismo dibujo siempre)
   ========================================================================== */
window.VJ = window.VJ || {};
(function () {
  const K = (VJ.K = {});

  K.rng = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const f = (n) => Math.round(n * 10) / 10;
  K.f = f;
  const rr = (r, a, b) => a + r() * (b - a);
  K.rr = rr;

  /* ---------- envolturas ---------- */
  K.svg = (x, y, w, h, inner, cls = 'static') => `<svg class="${cls}" style="left:${x}px;top:${y}px" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  K.act = (id, x, y, w, h, inner, cls = '') => `<svg id="${id}" class="a ${cls}" style="left:${x}px;top:${y}px" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  K.div = (id, x, y, html, cls = '', style = '') => `<div ${id ? `id="${id}"` : ''} class="a ${cls}" style="left:${x}px;top:${y}px;${style}">${html}</div>`;
  K.say = (beats, x, y, w, html, cls = '', z) => `<div class="say ${cls}" data-b="${beats}" style="left:${x}px;top:${y}px;width:${w}px${z ? `;--z:${z}` : ''}">${html}</div>`;
  K.bub = (beats, x, y, text, tail = 'l', w = 300) => `<div class="say bub bub-${tail}" data-b="${beats}" style="left:${x}px;top:${y}px;width:${w}px"><p>${text}</p></div>`;
  K.hot = (beats, x, y, pop, label, cls = '') => `<button class="hot ${cls}" data-b="${beats}" data-pop="${pop}" style="left:${x}px;top:${y}px" aria-label="${label}: ver más"><i></i><span>${label}</span></button>`;

  /* ---------- trazos básicos ---------- */
  K.blobPath = (cx, cy, rx, ry, n, jit, r) => {
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, k = 1 + rr(r, -jit, jit);
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = p[i], b = p[(i + 1) % n], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      d += (i === 0 ? `M${f((p[n - 1][0] + a[0]) / 2)} ${f((p[n - 1][1] + a[1]) / 2)}` : '') + `Q${f(a[0])} ${f(a[1])} ${f(m[0])} ${f(m[1])}`;
    }
    return d + 'Z';
  };
  K.blob = (cx, cy, rx, ry, fill, r, n = 9, jit = 0.16) => `<path d="${K.blobPath(cx, cy, rx, ry, n, jit, r)}" fill="${fill}"/>`;

  /* Línea de horizonte. smooth=true para lomas, false para montaña. */
  K.ridge = (x0, x1, base, amp, step, r, floor, smooth = true) => {
    const p = []; let y = base;
    for (let x = x0; x <= x1 + step; x += step) { y += rr(r, -amp, amp); y += (base - y) * 0.35; p.push([x, y]); }
    let d = `M${x0} ${floor}L${f(p[0][0])} ${f(p[0][1])}`;
    if (smooth) for (let i = 0; i < p.length - 1; i++) { const m = [(p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2]; d += `Q${f(p[i][0])} ${f(p[i][1])} ${f(m[0])} ${f(m[1])}`; }
    else p.forEach((q) => { d += `L${f(q[0])} ${f(q[1])}`; });
    return d + `L${x1 + step} ${floor}Z`;
  };

  K.grad = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  K.rad = (id, stops, cx = 0.5, cy = 0.5, r0 = 0.5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r0}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</radialGradient>`;

  /* ---------- vegetación ---------- */
  K.canopy = (cx, cy, size, tones, r) => {
    let s = '';
    const [dark, mid, light] = tones;
    s += K.blob(cx, cy + size * 0.1, size, size * 0.72, dark, r, 11, 0.2);
    for (let i = 0; i < 6; i++) s += K.blob(cx + rr(r, -size * 0.7, size * 0.7), cy + rr(r, -size * 0.35, size * 0.25), size * rr(r, 0.32, 0.5), size * rr(r, 0.24, 0.36), mid, r, 8, 0.2);
    for (let i = 0; i < 5; i++) s += K.blob(cx - size * 0.15 + rr(r, -size * 0.55, size * 0.5), cy - size * rr(r, 0.12, 0.42), size * rr(r, 0.14, 0.3), size * rr(r, 0.1, 0.2), light, r, 7, 0.2);
    return s;
  };
  K.tree = (x, y, h, tones, r, trunk = '#4d3324') => {
    const w = h * 0.055;
    const bend = rr(r, -h * 0.08, h * 0.08);
    return `<path d="M${f(x - w)} ${y}Q${f(x + bend)} ${f(y - h * 0.5)} ${f(x + bend - w * 0.5)} ${f(y - h * 0.82)}L${f(x + bend + w * 0.5)} ${f(y - h * 0.82)}Q${f(x + bend + w * 2)} ${f(y - h * 0.5)} ${f(x + w)} ${y}Z" fill="${trunk}"/>` + K.canopy(x + bend, y - h * 0.86, h * rr(r, 0.32, 0.42), tones, r);
  };
  K.palm = (x, y, h, c1, c2, r, trunk = '#6b5038') => {
    const lean = rr(r, -h * 0.12, h * 0.12), tx = x + lean, ty = y - h;
    let s = `<path d="M${x - 9} ${y}Q${f(x + lean * 0.2)} ${f(y - h * 0.5)} ${f(tx - 5)} ${f(ty)}L${f(tx + 5)} ${f(ty)}Q${f(x + lean * 0.3 + 12)} ${f(y - h * 0.5)} ${x + 11} ${y}Z" fill="${trunk}"/>`;
    const n = 11;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI * 0.98 + (i / (n - 1)) * Math.PI * 0.96 + rr(r, -0.06, 0.06), L = h * rr(r, 0.36, 0.5);
      const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * 0.6 + L * 0.4;
      const cx = tx + Math.cos(a) * L * 0.55, cy = ty + Math.sin(a) * L * 0.95 - 16;
      s += `<path d="M${f(tx)} ${f(ty)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}Q${f(cx + 8)} ${f(cy + 26)} ${f(tx)} ${f(ty)}Z" fill="${i % 2 ? c1 : c2}"/>`;
    }
    return s;
  };
  K.conifer = (x, y, h, c1, c2, r) => {
    let s = `<rect x="${f(x - h * 0.03)}" y="${f(y - h * 0.2)}" width="${f(h * 0.06)}" height="${f(h * 0.2)}" fill="#3e2a22"/>`;
    const tiers = 4;
    for (let i = 0; i < tiers; i++) {
      const t = i / tiers, yb = y - h * 0.12 - h * 0.74 * t, yt = yb - h * 0.42, w = h * 0.3 * (1 - t * 0.68) * rr(r, 0.92, 1.08);
      s += `<path d="M${f(x)} ${f(yt)}L${f(x + w)} ${f(yb)}Q${f(x)} ${f(yb + h * 0.05)} ${f(x - w)} ${f(yb)}Z" fill="${i % 2 ? c1 : c2}"/>`;
    }
    return s;
  };
  K.leaf = (x, y, L, ang, fill, rib = 'rgba(255,255,255,.14)') => {
    const w = L * 0.3;
    return `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0C${f(L * 0.2)} ${f(-w)} ${f(L * 0.72)} ${f(-w * 0.9)} ${L} 0C${f(L * 0.72)} ${f(w * 0.9)} ${f(L * 0.2)} ${f(w)} 0 0Z" fill="${fill}"/><path d="M0 0L${L} 0" stroke="${rib}" stroke-width="${f(L * 0.012)}"/></g>`;
  };
  K.fern = (x, y, L, ang, fill, r) => {
    let s = `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0Q${f(L * 0.5)} ${f(-L * 0.08)} ${L} 0" stroke="${fill}" stroke-width="${f(L * 0.018)}" fill="none"/>`;
    const n = 13;
    for (let i = 1; i < n; i++) {
      const t = i / n, px = L * t, py = -L * 0.08 * 4 * t * (1 - t) * 0.5, l = L * 0.3 * (1 - t) + L * 0.04;
      s += K.leaf(f(px), f(py), f(l), -68 + rr(r, -8, 8), fill, 'none') + K.leaf(f(px), f(py), f(l), 68 + rr(r, -8, 8), fill, 'none');
    }
    return s + '</g>';
  };

  /* ---------- cielo y figuras ---------- */
  K.cloud = (x, y, w, fill, shade, r) => {
    const h = w * 0.34;
    let top = '', bot = '';
    const n = 6;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, rad = (Math.sin(t * Math.PI) * 0.75 + 0.3) * h * rr(r, 0.75, 1.1), cx = x + w * t, cy = y - rad * 0.45;
      top += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rad)}"/>`;
      if (shade) bot += `<circle cx="${f(cx + rad * 0.12)}" cy="${f(cy + rad * 0.34)}" r="${f(rad * 0.72)}"/>`;
    }
    return `<g fill="${fill}">${top}<rect x="${f(x + w * 0.02)}" y="${f(y - h * 0.3)}" width="${f(w * 0.96)}" height="${f(h * 0.3 + 6)}" rx="${f(h * 0.15)}"/></g>${shade ? `<g fill="${shade}" opacity=".55">${bot}</g>` : ''}`;
  };
  K.bird = (x, y, s, c) => `<path d="M${x} ${y}q${f(s * 0.5)} ${f(-s * 0.55)} ${s} 0q${f(s * 0.5)} ${f(-s * 0.55)} ${s} 0" fill="none" stroke="${c}" stroke-width="${f(s * 0.16)}" stroke-linecap="round"/>`;
  K.person = (x, y, h, shirt, r, skin) => {
    const sk = skin || ['#e9b28f', '#c98d68', '#8d5a3f', '#f1c9a9'][Math.floor(r() * 4)];
    const pants = ['#2f3b52', '#4a4f5c', '#6a5a48', '#35506b'][Math.floor(r() * 4)];
    const packC = ['#b65434', '#3d7a5f', '#d39b35', '#2d5d86'][Math.floor(r() * 4)];
    const u = h / 100;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(u * 100) / 100})">` +
      `<rect x="-12" y="-46" width="10" height="46" rx="4" fill="${pants}"/><rect x="2" y="-46" width="10" height="46" rx="4" fill="${pants}"/>` +
      `<rect x="-22" y="-78" width="14" height="30" rx="6" fill="${packC}"/>` +
      `<rect x="-14" y="-82" width="28" height="42" rx="9" fill="${shirt}"/>` +
      `<circle cx="1" cy="-91" r="10.5" fill="${sk}"/><path d="M-10 -94a11 11 0 0 1 22 0z" fill="${packC}"/></g>`;
  };

  /* Patrón de agua para las cataratas (una sola vez, como data-URI). */
  K.flowPattern = (() => {
    let cached;
    return () => {
      if (cached) return cached;
      const r = K.rng(77); let s = '';
      for (let i = 0; i < 46; i++) {
        const x = f(r() * 240), y = f(r() * 420), l = f(rr(r, 60, 190)), w = f(rr(r, 1.5, 6.5));
        for (const dy of [0, 420, -420]) s += `<rect x="${x}" y="${f(+y + dy)}" width="${w}" height="${l}" rx="${f(w / 2)}" fill="white" opacity="${f(rr(r, 0.25, 0.85))}"/>`;
      }
      cached = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='420'>${s}</svg>`)}")`;
      return cached;
    };
  })();

  /* Contador ligado al scroll. */
  K.count = (tl, el, from, to, at, dur, fmt) => {
    const o = { v: from };
    const nf = fmt || ((v) => Math.round(v).toLocaleString('es-AR'));
    tl.to(o, { v: to, duration: dur, ease: 'power1.out', onUpdate() { const n = document.querySelector(el); if (n) n.textContent = nf(o.v); } }, at);
  };

  /* Iconos de línea para fichas, dominós y carteles (trazo = currentColor). */
  const ico = (b) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;
  K.icons = {
    falls: ico('<path d="M8 12c6-3 10 3 16 0s10-3 16 0"/><path d="M14 16v22M24 14v26M34 16v20"/><path d="M8 42c6-3 10 3 16 0s10-3 16 0"/>'),
    people: ico('<circle cx="17" cy="16" r="6"/><path d="M6 40c0-9 5-14 11-14s11 5 11 14"/><circle cx="34" cy="19" r="4.6"/><path d="M31 28c6-1 11 3 11 12"/>'),
    map: ico('<path d="M6 12l12-5 12 5 12-5v29l-12 5-12-5-12 5z"/><path d="M18 7v29M30 12v29"/>'),
    hotel: ico('<path d="M8 42V10h22v32"/><path d="M30 20h10v22"/><path d="M4 42h40M15 17h2M21 17h2M15 25h2M21 25h2M16 42v-9h6v9"/>'),
    road: ico('<path d="M16 6L6 42M32 6l10 36"/><path d="M24 8v6M24 20v6M24 32v8"/>'),
    gov: ico('<path d="M5 18L24 7l19 11z"/><path d="M10 18v18M19 18v18M29 18v18M38 18v18M6 40h36"/>'),
    drop: ico('<path d="M24 6c8 11 13 17 13 24a13 13 0 0 1-26 0c0-7 5-13 13-24z"/>'),
    wc: ico('<circle cx="15" cy="11" r="4"/><path d="M15 17v24M9 22h12l-2 10h-8z"/><circle cx="33" cy="11" r="4"/><path d="M28 19h10l-1 12h-2v10h-4V31h-2z"/>'),
    car: ico('<path d="M6 30l4-12a4 4 0 0 1 4-3h20a4 4 0 0 1 4 3l4 12v9H6z"/><path d="M6 30h36"/><circle cx="14" cy="34" r="2"/><circle cx="34" cy="34" r="2"/>'),
    trash: ico('<path d="M9 12h30M18 12V7h12v5M12 12l2 30h20l2-30"/><path d="M21 19v16M27 19v16"/>'),
    ship: ico('<path d="M6 30h36l-5 11H11z"/><path d="M12 30V20h24v10M20 20v-9h8v9"/><path d="M4 45c5-2 8 2 13 0s8-2 13 0 8 2 14 0"/>'),
    plate: ico('<circle cx="26" cy="24" r="13"/><circle cx="26" cy="24" r="7"/><path d="M6 8v12a3 3 0 0 0 3 3v17M12 8v15"/>'),
    shop: ico('<path d="M7 19l3-11h28l3 11"/><path d="M7 19a6 6 0 0 0 11 0 6 6 0 0 0 12 0 6 6 0 0 0 11 0"/><path d="M10 25v17h28V25M20 42V31h8v11"/>'),
    box: ico('<path d="M6 15l18-9 18 9v20l-18 9-18-9z"/><path d="M6 15l18 9 18-9M24 24v20"/>'),
    anchor: ico('<circle cx="24" cy="10" r="4"/><path d="M24 14v28M15 21h18"/><path d="M7 28c1 9 8 14 17 14s16-5 17-14"/>'),
    bus: ico('<rect x="7" y="8" width="34" height="28" rx="4"/><path d="M7 24h34M24 8v16"/><circle cx="15" cy="36" r="3"/><circle cx="33" cy="36" r="3"/>'),
    worker: ico('<path d="M13 22a11 11 0 0 1 22 0"/><path d="M10 22h28M24 11v5"/><path d="M15 26a9 9 0 0 0 18 0"/><path d="M8 44c1-7 7-10 16-10s15 3 16 10"/>'),
    leaf: ico('<path d="M9 39C7 19 20 9 41 8c1 21-9 34-29 31"/><path d="M9 39C15 28 23 21 31 18"/>'),
    alert: ico('<path d="M24 7L4 41h40z"/><path d="M24 19v11M24 36v.5"/>'),
    heart: ico('<path d="M24 41S7 31 7 18c0-11 13-13 17-4 4-9 17-7 17 4 0 13-17 23-17 23z"/>'),
    bed: ico('<path d="M5 38V12M5 30h38v8M43 30v-5a7 7 0 0 0-7-7H20v12"/><circle cx="13" cy="22" r="4"/>'),
    kite: ico('<path d="M24 5l14 15-14 15-14-15z"/><path d="M10 20h28M24 5v30"/><path d="M24 35c-3 3 3 4 0 7"/>'),
    book: ico('<path d="M24 12C19 8 12 8 6 9v30c6-1 13-1 18 3 5-4 12-4 18-3V9c-6-1-13-1-18 3z"/><path d="M24 12v30"/>'),
  };
  K.icon = (n) => K.icons[n] || '';
})();
