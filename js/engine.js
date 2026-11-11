/* ==========================================================================
   Motor: cámara virtual, regiones, paradas y línea de tiempo ligada al scroll.

   - Una "región" es un tramo del mundo con capas de parallax.
   - Un "beat" (parada) tiene un traslado (travel) y una permanencia (hold).
   - Una única línea de tiempo de GSAP, scrubeada por ScrollTrigger, controla
     cámara, escenarios, animaciones y a Valeria. El scroll ES la línea de tiempo.
   ========================================================================== */
window.VJ = window.VJ || {};
(function () {
  const RM = (VJ.RM = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]calma/.test(location.search));
  document.documentElement.classList.toggle('rm', RM);
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const beats = (VJ.beats = []);
  const regions = (VJ.R = {});
  const regionList = [];
  const UNIT_VH = 72;           // cuánto scroll (vh) dura una unidad de tiempo
  /* Presupuesto gráfico: pensado para que una PC común no se quede sin memoria de video.
     ART_Q son píxeles de ilustración por unidad de región; los planos lejanos van más
     suaves porque se ven desenfocados detrás del principal. */
  const ART_Q = +new URLSearchParams(location.search).get('q') || 1.2;
  const TEXT_Q = 1.5;
  const LAYER_K = { far: 0.7, mid: 0.85, fg: 0.85 };
  const BG_K = 8;               // los fondos en degradé se dibujan a 1/8 y se agrandan

  /* Un destino fuera de escena se oculta del todo: así el navegador libera su memoria. */
  function setLive(R, on) {
    R.hits.forEach((n) => { n.style.pointerEvents = on ? '' : 'none'; });
    R.ambient.forEach((n) => { n.style.animationPlayState = on ? 'running' : 'paused'; });
    [R.el, R.fgEl, R.textEl].forEach((n) => n && (n.style.visibility = on ? 'visible' : 'hidden'));
  }

  /* ---------- utilidades ---------- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const ease = (t) => t * t * t * (t * (6 * t - 15) + 10);
  VJ.clamp = clamp; VJ.lerp = lerp;

  /* Proyección geográfica del atlas (la misma con la que se generaron los países). */
  VJ.P = (lon, lat) => [1300 + (lon + 63.6) * 32, 800 - (lat + 38.45) * 40.5];

  VJ.region = (def) => { regions[def.id] = def; regionList.push(def); };
  VJ.beat = (b) => beats.push(Object.assign({ travel: 1, hold: 1, drift: 0.022, rain: 0, tint: 0 }, b));

  /* ---------- construcción del DOM ---------- */
  function buildRegions(world) {
    regionList.forEach((R) => {
      const art = R.build ? R.build() : {};
      // Densidad de las ilustraciones: fija en píxeles de región, sin importar la pantalla.
      // Es lo que más pesa al entrar a un destino; el texto conserva su nitidez en TEXT_Q.
      const Q = R.q ? Math.max(1, R.q / DPR) : ART_Q / DPR;
      R.Q = Q;
      const el = document.createElement('section');
      el.className = 'region'; el.id = 'r-' + R.id;
      el.style.transform = `translate3d(${R.x}px,${R.y}px,0) scale(${R.s})`;
      let html = '';
      if (R.bg) {
        const bg = R.bg.replace(/(-?\d+(?:\.\d+)?)px/g, (m, n) => +n / BG_K + 'px');
        html += `<div class="region-bg" style="left:${R.bgBox[0]}px;top:${R.bgBox[1]}px;width:${R.bgBox[2] / BG_K}px;height:${R.bgBox[3] / BG_K}px;transform:scale(${BG_K});background:${bg}"></div>`;
      }
      (R.layers || []).forEach((L, i) => { if (art[L.name]) html += `<div class="layer" data-k="${L.k}" data-q="${Q * (LAYER_K[L.name] || 1)}" style="zoom:${Q * (LAYER_K[L.name] || 1)}">${art[L.name]}</div>`; });
      el.innerHTML = html;
      world.appendChild(el);
      R.el = el;
      R.layersEls = [...el.querySelectorAll('.layer')].map((n) => ({ n, k: +n.dataset.k, q: +n.dataset.q, tx: 0 }));
      R.alpha = 0;
      if (art.fg) {
        const fg = document.createElement('section');
        fg.className = 'region-fg';
        fg.style.transform = el.style.transform;
        const fq = Q * (LAYER_K.fg || 1);
        fg.innerHTML = `<div class="layer" data-k="${R.fgK || -0.1}" style="zoom:${fq}">${art.fg}</div>`;
        R.fgEl = fg;
        R.fgLayer = { n: fg.firstChild, k: R.fgK || -0.1, q: fq };
      }
      // Los textos y hotspots viven en un plano propio, por encima del tinte de escena.
      const items = [...el.querySelectorAll('.say,.hot')];
      if (items.length) {
        const tx = document.createElement('section');
        tx.className = 'region-text';
        tx.style.transform = el.style.transform;
        const TQ = Math.max(1, TEXT_Q / DPR);
        tx.innerHTML = `<div class="layer" style="zoom:${TQ};transform:scale(${1 / TQ})"></div>`;
        items.forEach((n) => tx.firstChild.appendChild(n));
        R.textEl = tx;
      }
      // Lo que se apaga cuando la región no está en escena, sin tocar el resto del árbol.
      R.hits = [...el.querySelectorAll('button,input,a,[data-pop],[data-jump]')];
      R.ambient = [...el.querySelectorAll('.flow i,.mist,.steam')];
      setLive(R, false);
    });
    VJ.Valeria.mount(world);
    regionList.forEach((R) => R.fgEl && world.appendChild(R.fgEl));
    const tint = document.createElement('div');
    tint.id = 'tint';
    world.appendChild(tint);
    regionList.forEach((R) => R.textEl && world.appendChild(R.textEl));
  }

  /* Convierte coordenadas de región a mundo. */
  const toWorld = (r, x, y, w) => { const R = regions[r]; return { x: R.x + x * R.s, y: R.y + y * R.s, w: w * R.s }; };

  function layout() {
    let t = 0;
    beats.forEach((b, i) => {
      b.i = i;
      if (i === 0) b.travel = 0;
      b.t0 = t; b.t1 = t + b.travel; b.t2 = b.t1 + b.hold; t = b.t2;
      const c = toWorld(b.r, b.cam[0], b.cam[1], b.cam[2]);
      const rot = b.cam[3] || 0;
      const d = RM ? 0 : b.drift;
      b.A = { x: c.x, y: c.y, w: c.w * (1 + d), r: rot };
      b.Z = { x: c.x, y: c.y, w: c.w * (1 - d), r: rot };
    });
    VJ.total = t;

    // Valeria: resuelve posiciones de mundo y fase acumulada de la caminata.
    let last = null, cum = 0;
    beats.forEach((b) => {
      if (b.val) {
        const v = b.val, R = regions[b.r];
        const scale = (v.s || 0.62) * R.s;
        b.V = { x: R.x + v.x * R.s, y: R.y + v.y * R.s, s: scale, f: v.f || 1, pose: VJ.Valeria.poses[v.pose || 'stand'], expr: v.expr || 'smile', look: v.look || [0.4, 0], gest: v.gest };
        if (v.x2 != null) { b.V.x2 = R.x + v.x2 * R.s; b.V.y2 = R.y + (v.y2 != null ? v.y2 : v.y) * R.s; }
        b.prevV = last;
        b.tele = !!v.tele;
        if (last) {
          const fromX = last.x2 != null ? last.x2 : last.x, fromY = last.y2 != null ? last.y2 : last.y;
          b.vDist = Math.hypot(b.V.x - fromX, b.V.y - fromY);
          b.vFrom = [fromX, fromY];
        } else { b.vDist = 0; b.vFrom = [b.V.x, b.V.y]; }
        b.cumStart = cum;
        const avg = last ? (last.s + b.V.s) / 2 : b.V.s;
        const strideW = 420 * avg;
        b.strideW = strideW;
        if (!b.tele) cum += b.vDist / strideW;
        b.cumHold = cum;
        if (b.V.x2 != null) cum += Math.hypot(b.V.x2 - b.V.x, b.V.y2 - b.V.y) / (420 * b.V.s);
        last = b.V;
      } else { b.V = null; b.prevV = last; b.cumStart = b.cumHold = cum; }
    });
  }

  /* ---------- línea de tiempo ---------- */
  /* Margen de seguridad: ningún texto queda bajo el HUD o fuera del cuadro 16:9.
     Los textos de una misma parada bajan juntos para conservar su composición. */
  function fitSafeArea(byBeat) {
    if (document.documentElement.classList.contains('is-portrait')) return;
    const groups = new Map();
    document.querySelectorAll('.say,.hot').forEach((n) => {
      const b = byBeat[n.dataset.b.split(/\s+/)[0]];
      if (!b) return;
      if (n.classList.contains('hot')) n.style.setProperty('--z', Math.max(0.8, b.cam[2] / 1920).toFixed(2));
      else if (!regions[b.r].base) {
        const cur = parseFloat(getComputedStyle(n).getPropertyValue('--z')) || 1;
        n.style.setProperty('--z', Math.max(cur, (b.cam[2] / 1920) * 0.9).toFixed(2));
      }
      if (!groups.has(b)) groups.set(b, []);
      groups.get(b).push(n);
    });
    groups.forEach((items, b) => {
      const [cx, cy, w] = b.cam, h = w * 0.5625;
      const L = cx - w * 0.49, R = cx + w * 0.452, T = cy - h * 0.5 + h * 0.115, B = cy + h * 0.5 - h * 0.015;
      const box = (n) => {
        const cs = getComputedStyle(n);
        return { x: parseFloat(n.style.left), y: parseFloat(n.style.top), w: parseFloat(cs.width), h: parseFloat(cs.height) };
      };
      let delta = 0;
      items.forEach((n) => { if (n.classList.contains('say') && !n.classList.contains('bub')) delta = Math.max(delta, T - box(n).y); });
      items.forEach((n) => {
        const isBlock = n.classList.contains('say') && !n.classList.contains('bub');
        const r = box(n);
        let y = r.y + (isBlock ? delta : 0), x = r.x;
        if (x + r.w > R) x = R - r.w;
        if (x < L) x = L;
        if (!isBlock && y < T) y = T;
        if (y + r.h > B) y = Math.max(T, B - r.h);
        n.style.left = Math.round(x) + 'px'; n.style.top = Math.round(y) + 'px';
      });
    });
  }

  function buildTimeline() {
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    VJ.tl = tl;
    const byBeat = {}; beats.forEach((b) => (byBeat[b.id] = b));

    fitSafeArea(byBeat);

    // Cada texto o hotspot aparece en la primera parada que lo nombra y se va en la última.
    document.querySelectorAll('.say,.hot').forEach((n) => {
      const ids = n.dataset.b.split(/\s+/).filter(Boolean);
      const first = byBeat[ids[0]], last = byBeat[ids[ids.length - 1]];
      if (!first || !last) { console.warn('Parada inexistente en', n.dataset.b); return; }
      n._first = first; n._last = last;
      first.items = first.items || []; first.items.push(n);
      const kids = n.classList.contains('say') && n.children.length > 1 ? [...n.children] : [n];
      const lead = Math.min(0.32, first.hold * 0.32);
      const exitAt = last.t2 - Math.min(0.2, last.hold * 0.18);
      const dly = n.dataset.delay ? +n.dataset.delay : 0;
      if (first.t1 > 0) {
        gsap.set(n, { autoAlpha: 0 });
        if (kids[0] !== n) { gsap.set(kids, { y: 34, opacity: 0 }); tl.set(n, { autoAlpha: 1 }, first.t1 - 0.01 + dly); }
        const cfg = { duration: lead, ease: 'power2.out' };
        if (kids[0] !== n) tl.to(kids, { ...cfg, y: 0, opacity: 1, stagger: lead * 0.3 }, first.t1 + dly);
        else tl.fromTo(n, { autoAlpha: 0, y: 26 }, { ...cfg, autoAlpha: 1, y: 0, immediateRender: false }, first.t1 + dly);
      }
      if (n.dataset.stay == null) tl.to(n, { autoAlpha: 0, y: '-=24', duration: 0.16, ease: 'power1.in' }, exitAt);
    });

    beats.forEach((b) => b.anim && b.anim(tl, b.t1, b.t2, b));
    tl.set({}, {}, VJ.total);
    // Capa propia sólo para lo que se mueve; lo que apenas aparece o desaparece no la necesita.
    const MOVE = ['x', 'y', 'rotation', 'scale', 'scaleX', 'scaleY'];
    tl.getChildren(true, true, false).forEach((tw) => {
      if (MOVE.some((k) => k in tw.vars)) tw.targets().forEach((n) => n.classList && n.classList.contains('a') && n.classList.add('moves'));
    });
    tl.eventCallback('onUpdate', () => VJ.render(tl.time()));
    return tl;
  }

  /* ---------- render por fotograma ---------- */
  const view = { vw: innerWidth, vh: innerHeight };
  const world = () => document.getElementById('world');
  let worldEl, tintEl, cloudEls, fadeEl;
  let idx = 0;
  const cam = (VJ.cam = { x: 0, y: 0, w: 1, r: 0 });

  function findBeat(t) {
    while (idx < beats.length - 1 && t >= beats[idx].t2) idx++;
    while (idx > 0 && t < beats[idx].t0) idx--;
    return beats[idx];
  }

  function interpCam(A, B, p) {
    const e = ease(p);
    const ratio = Math.log(B.w / A.w);
    const base = A.w * Math.exp(ratio * e);
    let u = e;
    if (Math.abs(ratio) > 0.05) u = (base - A.w) / (B.w - A.w);
    const dist = Math.hypot(B.x - A.x, B.y - A.y);
    const arc = clamp((dist / (A.w + B.w)) * 0.5, 0, 0.55);
    const w = base * (1 + arc * Math.sin(Math.PI * e));
    cam.x = lerp(A.x, B.x, u); cam.y = lerp(A.y, B.y, u); cam.w = w; cam.r = lerp(A.r, B.r, e);
  }

  function applyCamera(vPos) {
    const { vw, vh } = view;
    const portrait = vw / vh < 0.85;
    let s, offY = 0, cx = cam.x, cy = cam.y;
    if (portrait) {
      s = (vh * 0.56) / (cam.w * 0.5625);
      offY = -vh * 0.17;
      if (vPos) { const k = 0.55; cx = lerp(cam.x, vPos[0], k); }
      const half = (vw / s) / 2;
      if (cx - half < cam.x - cam.w / 2) cx = cam.x - cam.w / 2 + half;
      if (cx + half > cam.x + cam.w / 2) cx = cam.x + cam.w / 2 - half;
    } else {
      s = Math.min(vw / cam.w, vh / (cam.w * 0.5625));
    }
    cam.s = s;
    worldEl.style.transform = `translate3d(${vw / 2}px,${vh / 2 + offY}px,0) rotate(${cam.r}deg) scale(${s}) translate3d(${-cx}px,${-cy}px,0)`;
  }

  function setAlpha(R, a) {
    if (R.alpha === a) return;
    const wasVis = R.alpha > 0;
    R.alpha = a;
    R.el.style.opacity = a;
    if (R.fgEl) R.fgEl.style.opacity = a;
    if (R.textEl) R.textEl.style.opacity = a;
    if (wasVis !== a > 0) setLive(R, a > 0);
  }

  function regionAlphas(b, p) {
    const prev = beats[b.i - 1];
    const cur = regions[b.r], from = prev ? regions[prev.r] : cur;
    const al = {};
    if (cur === from || p >= 1) al[cur.id] = 1;
    // El destino aparece recién con la cámara cerca: visto de lejos habría que dibujarlo entero.
    else if (from.base) { al[from.id] = 1; al[cur.id] = RM ? (p > 0.5 ? 1 : 0) : sstep(0.74, 0.96, p); }
    else if (cur.base) { al[cur.id] = 1; al[from.id] = RM ? (p > 0.5 ? 0 : 1) : 1 - sstep(0.04, 0.26, p); }
    else { al[from.id] = p < 0.5 ? 1 : 0; al[cur.id] = p >= 0.5 ? 1 : 0; }
    if (!al.atlas) {
      const covered = Object.keys(al).some((k) => al[k] === 1 && !regions[k].base && regions[k].bg);
      if (!covered) al.atlas = 1;
    }
    regionList.forEach((R) => setAlpha(R, al[R.id] || 0));
  }

  function parallax() {
    regionList.forEach((R) => {
      if (R.alpha <= 0) return;
      const lx = (cam.x - R.x) / R.s, ly = (cam.y - R.y) / R.s;
      const ox = lx - (R.px || 0), oy = ly - (R.py || 0);
      // Cada capa tiene su propia densidad (q): el desplazamiento se divide por ella.
      R.layersEls.forEach((L) => {
        const tx = RM ? 0 : ox * L.k, ty = RM ? 0 : oy * L.k * 0.6;
        L.n.style.transform = `translate3d(${tx / L.q}px,${ty / L.q}px,0) scale(${1 / L.q})`;
      });
      if (R.fgLayer) {
        const F = R.fgLayer, tx = RM ? 0 : ox * F.k, ty = RM ? 0 : oy * F.k * 0.6;
        F.n.style.transform = `translate3d(${tx / F.q}px,${ty / F.q}px,0) scale(${1 / F.q})`;
      }
    });
  }

  function renderValeria(b, inTravel, p, holdP) {
    const V = VJ.Valeria, el = V.el;
    if (!b.V && !b.prevV) { el.style.opacity = 0; return null; }
    let wx, wy, ws, fx, pose, amp = 0, phase = 0, alpha = 1, expr, look;

    if (!b.V) {
      // Sale de escena: se desvanece en el lugar donde estaba.
      const pv = b.prevV; const px = pv.x2 != null ? pv.x2 : pv.x, py = pv.y2 != null ? pv.y2 : pv.y;
      wx = px; wy = py; ws = pv.s; fx = pv.f; pose = pv.pose; expr = pv.expr; look = pv.look;
      alpha = inTravel ? 1 - sstep(0.1, 0.5, p) : 0;
      phase = b.cumStart * Math.PI * 2;
    } else if (inTravel && b.prevV && beats[b.i - 1]) {
      const pv = b.prevV, e = RM ? (p > 0.5 ? 1 : 0) : ease(p);
      if (b.tele || !beats[b.i - 1].V) {
        // Aparece en la parada nueva sin atravesar el mundo.
        const showing = p >= 0.5;
        const src = showing ? b.V : pv;
        wx = showing ? b.V.x : b.vFrom[0]; wy = showing ? b.V.y : b.vFrom[1]; ws = src.s; fx = src.f;
        pose = src.pose; expr = src.expr; look = src.look;
        const [in0, in1] = regions[b.r].base ? [0.6, 0.92] : [0.78, 0.97];
        alpha = showing ? sstep(in0, in1, p) : (beats[b.i - 1].V ? 1 - sstep(0.08, 0.42, p) : 0);
        phase = b.cumHold * Math.PI * 2;
      } else {
        wx = lerp(b.vFrom[0], b.V.x, e); wy = lerp(b.vFrom[1], b.V.y, e); ws = lerp(pv.s, b.V.s, e);
        const dirX = b.V.x - b.vFrom[0];
        const moving = b.vDist > b.strideW * 0.6;
        const dirF = !moving ? b.V.f : dirX >= 0 ? 1 : -1;
        fx = p < 0.14 ? lerp(pv.f, dirF, p / 0.14) : p > 0.86 ? lerp(dirF, b.V.f, (p - 0.86) / 0.14) : dirF;
        pose = V.mix(pv.pose, b.V.pose, sstep(0.55, 1, p));
        if (moving && !RM) { amp = sstep(0, 0.14, p) * (1 - sstep(0.86, 1, p)); pose = V.mix(V.poses.stand, b.V.pose, sstep(0.82, 1, p)); }
        phase = (b.cumStart + (b.vDist / b.strideW) * e) * Math.PI * 2;
        expr = p < 0.5 ? pv.expr : b.V.expr; look = b.V.look;
        if (moving) look = [0.5, 0];
      }
    } else {
      const v = b.V;
      wx = v.x; wy = v.y;
      if (v.x2 != null) {
        wx = lerp(v.x, v.x2, holdP); wy = lerp(v.y, v.y2, holdP);
        const d = Math.hypot(v.x2 - v.x, v.y2 - v.y) / (420 * v.s);
        phase = (b.cumHold + d * holdP) * Math.PI * 2;
        amp = RM ? 0 : sstep(0, 0.06, holdP) * (1 - sstep(0.94, 1, holdP));
      } else phase = b.cumHold * Math.PI * 2;
      ws = v.s; fx = v.f; pose = v.pose; expr = v.expr; look = v.look;
      if (fx !== 1 && fx !== -1) fx = fx > 0 ? 1 : -1;
    }

    let extra = 0;
    if (b.V && b.V.gest === 'wave' && !inTravel && !RM) extra = Math.sin(holdP * Math.PI * 10) * 14;
    V.pose(pose, phase, amp, look[0], look[1], extra);
    V.expr(expr);
    if (Math.abs(fx) < 0.04) fx = 0.04 * Math.sign(fx || 1);
    el.style.transform = `translate3d(${wx - 290}px,${wy - 1030}px,0) scale(${ws * fx},${ws})`;
    el.style.opacity = alpha;
    return [wx, wy];
  }

  function renderClouds(v) {
    if (!cloudEls) return;
    const on = v > 0.002;
    cloudEls.root.style.visibility = on ? 'visible' : 'hidden';
    if (!on) return;
    const o = 1 - v;
    cloudEls.L.style.transform = `translate3d(${-105 * o - 5}%,0,0)`;
    cloudEls.R.style.transform = `translate3d(${105 * o + 5}%,0,0)`;
    cloudEls.veil.style.opacity = sstep(0.62, 1, v);
  }

  let lastUI = -1;
  VJ.render = function (t) {
    t = clamp(t, 0, VJ.total);
    const b = findBeat(t);
    const inTravel = t < b.t1 && b.travel > 0;
    const p = inTravel ? (t - b.t0) / b.travel : 1;
    const holdP = inTravel ? 0 : clamp((t - b.t1) / b.hold);
    const prev = beats[b.i - 1];

    if (inTravel) {
      if (RM) { const s = p < 0.5 ? prev.Z : b.A; cam.x = s.x; cam.y = s.y; cam.w = s.w; cam.r = s.r; }
      else interpCam(prev.Z, b.A, p);
    } else { cam.x = b.A.x; cam.y = b.A.y; cam.w = lerp(b.A.w, b.Z.w, holdP); cam.r = b.A.r; }

    regionAlphas(b, p);
    const vPos = renderValeria(b, inTravel, p, holdP);
    applyCamera(vPos);
    parallax();

    const rainT = inTravel ? lerp(prev.rain, b.rain, p) : b.rain;
    const tintT = inTravel ? lerp(prev.tint, b.tint, p) : b.tint;
    VJ.rainLevel = rainT;
    const tintVal = Math.round(tintT * 100) / 100;
    if (tintEl._v !== tintVal) { tintEl._v = tintVal; tintEl.style.opacity = tintVal; }

    let wipe = 0;
    if (inTravel && prev && (b.wipe || (regions[b.r] !== regions[prev.r] && !regions[b.r].base && !regions[prev.r].base))) wipe = Math.sin(Math.PI * p);
    if (RM) { wipe = 0; fadeEl.style.opacity = inTravel ? Math.sin(Math.PI * p) : 0; }
    renderClouds(wipe);

    if (b.i !== lastUI) { lastUI = b.i; VJ.ui && VJ.ui.onBeat(b); }
    VJ.ui && VJ.ui.onProgress(t / VJ.total);
  };

  /* ---------- medidas ---------- */
  VJ.resize = function () {
    view.vw = innerWidth; view.vh = innerHeight;
    const rain = document.getElementById('rain');
    rain.width = Math.ceil(view.vw / 1.5); rain.height = Math.ceil(view.vh / 1.5);
    document.documentElement.classList.toggle('is-portrait', view.vw / view.vh < 0.85 || view.vw < 760);
    if (VJ.tl) VJ.render(VJ.tl.time());
  };

  /* Scroll correspondiente a un instante de la historia. */
  VJ.scrollFor = (t) => (t / VJ.total) * (document.getElementById('track').offsetHeight - innerHeight);

  /* ---------- nubes de transición y grano ---------- */
  function buildOverlays() {
    const K = VJ.K, r = K.rng(5);
    const bank = (flip) => {
      let s = '';
      const W = 1000, H = 1000;
      for (let i = 0; i < 16; i++) s += `<circle cx="${K.f(flip ? K.rr(r, 380, 1000) : K.rr(r, 0, 620))}" cy="${K.f(K.rr(r, 0, H))}" r="${K.f(K.rr(r, 150, 310))}" fill="${i % 3 ? '#fbf6ea' : '#e9e6e6'}"/>`;
      return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${s}<rect x="${flip ? 640 : 0}" width="360" height="1000" fill="#fbf6ea"/></svg>`;
    };
    const root = document.getElementById('clouds');
    root.innerHTML = `<div class="L" style="left:-2%">${bank(false)}</div><div class="R" style="right:-2%">${bank(true)}</div><div class="veil"></div>`;
    cloudEls = { root, L: root.querySelector('.L'), R: root.querySelector('.R'), veil: root.querySelector('.veil') };

    const c = document.createElement('canvas'); c.width = c.height = 140;
    const g = c.getContext('2d'), im = g.createImageData(140, 140);
    for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0);
    document.getElementById('grain').style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  }

  /* ---------- lluvia ambiental: la intensidad la decide el scroll ---------- */
  function rainLoop() {
    const c = document.getElementById('rain'), g = c.getContext('2d');
    const N = 420, drops = [];
    for (let i = 0; i < N; i++) drops.push({ x: Math.random(), y: Math.random(), l: 0.02 + Math.random() * 0.045, v: 0.012 + Math.random() * 0.014, a: 0.2 + Math.random() * 0.55 });
    let was = false;
    (function frame() {
      requestAnimationFrame(frame);
      const lvl = VJ.rainLevel || 0;
      if (lvl <= 0.01) { if (was) { g.clearRect(0, 0, c.width, c.height); was = false; } return; }
      was = true;
      const W = c.width, H = c.height;
      g.clearRect(0, 0, W, H);
      g.lineWidth = 1.1; g.strokeStyle = '#dbeaf7'; g.lineCap = 'round';
      const n = Math.floor(N * lvl);
      for (let i = 0; i < n; i++) {
        const d = drops[i];
        if (!RM) { d.y += d.v; d.x -= d.v * 0.2; if (d.y > 1.05) { d.y = -0.06; d.x = Math.random() * 1.2; } if (d.x < -0.05) d.x += 1.1; }
        g.globalAlpha = d.a * Math.min(1, lvl * 1.6);
        g.beginPath(); g.moveTo(d.x * W, d.y * H); g.lineTo((d.x - d.l * 0.2) * W, (d.y + d.l) * H); g.stroke();
      }
      g.globalAlpha = 1;
    })();
  }

  /* ---------- arranque ---------- */
  VJ.boot = function () {
    worldEl = world();
    fadeEl = document.getElementById('fade');
    buildRegions(worldEl);
    tintEl = document.getElementById('tint');
    layout();
    buildOverlays();
    const track = document.getElementById('track');
    track.style.height = `calc(${VJ.total * UNIT_VH}vh + 100vh)`;
    VJ.resize();
    const tl = buildTimeline();
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.create({ animation: tl, trigger: track, start: 'top top', end: 'bottom bottom', scrub: RM ? true : 0.5 });
    addEventListener('resize', VJ.resize);
    VJ.render(0);
    rainLoop();
  };
})();
