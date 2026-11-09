/* ==========================================================================
   PARTE 3 · EL CHALTÉN: lo que un día de excursión le pide a un pueblo.
   ========================================================================== */
(function () {
  const K = VJ.K, PIN = VJ.PIN;
  const G = 1720;

  function massif() {
    // Macizo tipo Fitz Roy: agujas de granito, sombra a la derecha, nieve arriba.
    const needles = [[2480, 1000, 150], [2660, 860, 130], [2860, 620, 210], [3090, 760, 150], [3270, 900, 120], [3440, 1010, 140], [2240, 1120, 150], [3640, 1100, 170]];
    let s = `<defs>${K.grad('gran', [[0, '#d98f7f'], [0.6, '#a86a78'], [1, '#6d5a84']])}${K.grad('step', [[0, '#d7b56d'], [1, '#a9843f']])}</defs>`;
    s += `<path d="M1500 1560L2100 1180L2500 1260L3000 1040L3500 1240L3950 1160L4500 1560Z" fill="#8c7fa8"/>`;
    needles.forEach(([x, top, w]) => {
      s += `<path d="M${x - w} 1520L${x - w * 0.42} ${top + 170}L${x - w * 0.2} ${top + 40}L${x} ${top}L${x + w * 0.24} ${top + 70}L${x + w * 0.42} ${top + 210}L${x + w} 1520Z" fill="url(#gran)"/>`;
      s += `<path d="M${x} ${top}L${x + w * 0.24} ${top + 70}L${x + w * 0.42} ${top + 210}L${x + w} 1520L${x + w * 0.2} 1520L${x + w * 0.06} ${top + 300}Z" fill="#5f4d78" opacity=".55"/>`;
      s += `<path d="M${x} ${top}L${x + w * 0.2} ${top + 60}L${x + w * 0.05} ${top + 54}L${x - w * 0.06} ${top + 90}L${x - w * 0.18} ${top + 52}Z" fill="#fff"/>`;
    });
    s += `<path d="M1800 1480Q2600 1380 3000 1430T4200 1470V1600H1800Z" fill="#f4f6fa"/>`;
    return s;
  }

  function house(x, h, c, roof, r) {
    return `<rect x="${x}" y="${G - h}" width="170" height="${h}" fill="${c}"/><path d="M${x - 16} ${G - h}L${x + 85} ${G - h - 84}L${x + 186} ${G - h}Z" fill="${roof}"/><rect x="${x + 22}" y="${G - h + 30}" width="42" height="42" fill="#fff4dc"/><rect x="${x + 106}" y="${G - h + 30}" width="42" height="42" fill="#fff4dc"/>`;
  }

  function crowd(id, n, seed, x0, x1, y0, y1) {
    const r = K.rng(seed); let s = '';
    for (let i = 0; i < n; i++) s += K.person(K.rr(r, x0, x1), K.rr(r, y0, y1), K.rr(r, 110, 150), ['#e0533f', '#f2b544', '#3c9b6b', '#5c97d3', '#b05ac2', '#f28c28'][i % 6], r);
    return K.act(id, 0, 0, 10, 10, s, 'static');
  }

  const bus = (id, x, c) => K.act(id, x, G - 216, 500, 230, `<rect x="0" y="0" width="500" height="186" rx="26" fill="${c}"/><rect x="0" y="118" width="500" height="20" fill="#fff4dc"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${26 + i * 90}" y="24" width="74" height="70" rx="9" fill="#26324b"/>`).join('')}<rect x="456" y="24" width="30" height="88" rx="7" fill="#9fd6e5"/><circle cx="110" cy="190" r="36" fill="#1d2536"/><circle cx="110" cy="190" r="14" fill="#c9d6dd"/><circle cx="390" cy="190" r="36" fill="#1d2536"/><circle cx="390" cy="190" r="14" fill="#c9d6dd"/>`);

  const qr = () => {
    const r = K.rng(253); let s = '', n = 25, u = 16;
    const finder = (x, y) => `<rect x="${x * u}" y="${y * u}" width="${7 * u}" height="${7 * u}" fill="#16263d"/><rect x="${(x + 1) * u}" y="${(y + 1) * u}" width="${5 * u}" height="${5 * u}" fill="#fff"/><rect x="${(x + 2) * u}" y="${(y + 2) * u}" width="${3 * u}" height="${3 * u}" fill="#16263d"/>`;
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) { if ((x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)) continue; if (r() > 0.52) s += `<rect x="${x * u}" y="${y * u}" width="${u}" height="${u}" fill="#16263d"/>`; }
    return s + finder(0, 0) + finder(18, 0) + finder(0, 18);
  };

  const dial = (id, label, pop) => `
    <div class="dial">
      <span class="dial-art">${VJ.LAM[pop]()}</span>
      <div class="dial-g"><svg viewBox="0 0 200 120"><path d="M16 110A84 84 0 0 1 184 110" fill="none" stroke="#3c9b6b" stroke-width="20" pathLength="99" stroke-dasharray="33 66"/><path d="M16 110A84 84 0 0 1 184 110" fill="none" stroke="#f2b544" stroke-width="20" pathLength="99" stroke-dasharray="33 66" stroke-dashoffset="-33"/><path d="M16 110A84 84 0 0 1 184 110" fill="none" stroke="#c2502f" stroke-width="20" pathLength="99" stroke-dasharray="33 66" stroke-dashoffset="-66"/></svg>
      <i id="${id}" class="needle"></i></div>
      <button data-pop="${pop}">${label} <b>+</b></button>
    </div>`;

  const meter = (id, ic, name) => `<div class="meter"><span class="m-ic">${K.icon(ic)}</span><div class="m-bar"><i id="${id}"></i></div><span class="m-n">${name}</span></div>`;

  VJ.region({
    id: 'chalten', x: PIN.chalten[0] - 2800 * 0.125, y: PIN.chalten[1] - 1250 * 0.125, s: 0.125, px: 2800, py: 1250,
    layers: [{ name: 'far', k: 0.12 }, { name: 'mid', k: 0.05 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #4d6aa0 1400px, #9aa8cc 2100px, #f3c4b0 2700px, #fbe2c4 3050px)', bgBox: [-5000, -1400, 18000, 6000],
    fgK: -0.1,
    build() {
      const r = K.rng(62);
      let clouds = '';
      for (let i = 0; i < 12; i++) clouds += K.cloud(K.rr(r, -600, 7000), K.rr(r, 220, 760), K.rr(r, 420, 980), '#fbe8dc', '#e8bfb5', r);
      let forest = `<path d="${K.ridge(-1800, 8400, 1560, 20, 100, r, 1900)}" fill="#7c8f6a"/>`;
      for (let x = -1800; x < 8400; x += K.rr(r, 50, 110)) forest += K.conifer(x, 1650 + K.rr(r, -40, 30), K.rr(r, 150, 250), ['#3e6650', '#c47b3a', '#5a7f5f'][Math.floor(r() * 3)], ['#2f5240', '#a9602b', '#476a4e'][Math.floor(r() * 3)], r);

      const ground = `<path d="M-2000 2700V${G}H8600V2700Z" fill="url(#step)"/><path d="M-2000 ${G + 44}H8600V${G + 170}H-2000Z" fill="#3f4656"/><path d="M-2000 ${G + 106}H8600" stroke="#f2d27a" stroke-width="9" stroke-dasharray="110 90"/>`;
      let tufts = '';
      for (let i = 0; i < 100; i++) tufts += `<path d="M${K.f(K.rr(r, -1900, 8500))} ${K.f(K.rr(r, G + 200, 2500))}l-10 -24m10 24l0 -30m0 30l12 -22" stroke="#7b6028" stroke-width="5" fill="none"/>`;
      const cs = [['#d97c4a', '#5a3b2d'], ['#6fa8a2', '#3a4a58'], ['#e7b966', '#6d3a2a'], ['#c9665a', '#3a4a58'], ['#c9d6c0', '#5a3b2d']];
      let village = '';
      for (let i = 0; i < 12; i++) { const [c, f] = cs[i % 5]; village += house(2020 + i * 200, K.rr(r, 130, 240), c, f, r); }

      const road = `<g transform="translate(1620 ${G})"><rect x="0" y="-250" width="16" height="250" fill="#5d4633"/><rect x="-140" y="-300" width="300" height="74" rx="8" fill="#5d4633"/><text x="10" y="-250" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="50" letter-spacing="2" fill="#fff4dc">EL CHALTÉN</text></g>`;

      let fg = '';
      for (let x = -1800; x < 8600; x += K.rr(r, 600, 1100)) fg += K.fern(x, 2260, K.rr(r, 300, 440), -100 + K.rr(r, -30, 30), '#6d5624', r);

      const trail = (() => { let c = ''; const q = K.rng(8); for (let i = 0; i < 40; i++) c += `<g class="crowd-i" style="opacity:0;transition:opacity .25s">${`<svg x="0" y="0" style="overflow:visible;position:static">${K.person(4040 + K.rr(q, 0, 1300), G + K.rr(q, -16, 40), K.rr(q, 120, 150), ['#e0533f', '#f2b544', '#3c9b6b', '#5c97d3', '#b05ac2', '#f28c28'][i % 6], q)}</svg>`}</g>`; return K.svg(0, 0, 10, 10, c, 'static'); })();

      return {
        far: K.svg(0, 0, 10, 10, clouds + massif()),
        mid: K.svg(0, 0, 10, 10, forest),
        fg: K.svg(0, 0, 10, 10, fg),
        main: K.svg(0, 0, 10, 10, ground + tufts + village + road)
          + K.act('c-sun', 300, 480, 200, 200, `<circle cx="100" cy="100" r="96" fill="#ffe28a" opacity=".45"/><circle cx="100" cy="100" r="66" fill="#fff0b8"/>`)
          + bus('bus1', -1500, '#c2502f') + bus('bus2', -2200, '#2f7a59') + bus('bus3', -2900, '#5c97d3')
          + crowd('cr1', 22, 11, 2000, 3400, G + 12, G + 54)
          + crowd('cr2', 34, 12, 1700, 3700, G + 16, G + 240)
          + crowd('cr3', 46, 13, 1500, 3900, G + 170, G + 340)
          + trail

          + K.say('c-llegada', 1560, 250, 2500, `<p class="k center">Montañas, senderos y paisajes</p><p class="h0 center">El Chaltén</p><p class="p center" style="margin-inline:auto">Detrás de los paisajes también existen ciudades, trabajadores, servicios públicos y decisiones políticas.</p>`, 'center', 1.05)
          + K.hot('c-llegada', 2960, 860, 'fitz', 'Monte Fitz Roy y Laguna de los Tres')

          + K.say('c-fullday', 980, 340, 1650, `<p class="k center">Una excursión de día completo desde El Calafate</p><p class="h1 center">Unas pocas horas para el visitante</p>`, 'center')
          + K.say('c-fullday', 700, 820, 2300, `<p class="tl-line"><span>Llegan por la mañana</span><i></i><span>Recorren la localidad</span><i></i><span>Usan los sanitarios</span><i></i><span>Estacionan</span><i></i><span>Consumen</span><i></i><span>Regresan por la tarde</span></p>`)

          + K.say('c-presion', 1530, 320, 1900, `<p class="k center">Infraestructura que debe mantenerse todo el año</p><p class="h1 center">Y cuando esto se repite con miles de excursionistas…</p>`, 'center plate')
          + K.div('meters', 1500, 1075, meter('m1', 'wc', 'Sanitarios') + meter('m2', 'car', 'Estacionamiento') + meter('m3', 'trash', 'Residuos'))
          + K.say('c-financia', 1530, 460, 1900, `<p class="h0 center">¿Quién financia los servicios?</p>`, 'center plate', 1)

          /* QR */
          + K.act('qr-sign', 540, 860, 640, 860, `<rect x="306" y="540" width="28" height="320" fill="#5d4633"/><rect width="640" height="620" rx="30" fill="#fff8e8" stroke="#2f7a59" stroke-width="10"/><g transform="translate(120 96) scale(1)">${qr()}</g><text x="320" y="62" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="46" letter-spacing="2" fill="#2f7a59">VISITA DE DÍA COMPLETO</text><text x="320" y="568" text-anchor="middle" font-family="Figtree" font-weight="600" font-size="26" fill="#3d4c63">Ilustración del pago por código QR</text>`)
          + K.say('c-tuu', 1310, 830, 1040, `<p class="k">Ordenanza N.º 253</p><p class="h1">Tasa de Uso Urbano</p><p class="p">Para quienes visitan la localidad durante el día sin pernoctar. Contribuye a mantener <em class="mark">sanitarios, estacionamientos y recolección de residuos</em>.</p><p class="num md">≈ $3.000</p><p class="p sm">por persona: el valor de dos litros de nafta súper.</p>`, '', 0.95)
          + K.hot('c-tuu', 1320, 1920, 'tuu', 'Controversias y cobro digital')

          /* Capacidad de carga */
          + K.say('c-carga', 3760, 340, 1800, `<p class="h1 center">Capacidad de carga</p>`, 'center plate')
          + K.bub('c-carga', 3450, 1080, '¿Hasta qué punto puede recibir visitantes?', 'l', 290)
          + `<div class="say pointer" data-b="c-carga" style="left:3760px;top:650px;width:1800px">
               <div class="carga-panel"><div class="dials">${dial('g-eco', 'Ecológica', 'carga-eco')}${dial('g-fis', 'Física', 'carga-fis')}${dial('g-psi', 'Psicológica', 'carga-psi')}</div>
               <label class="range"><span>Sumá visitantes</span><input id="carga-range" type="range" min="0" max="100" value="18"></label>
               <p class="hand center" id="carga-lab" style="margin-top:14px;font-size:50px">&nbsp;</p>
             </div></div>`
          + K.say('c-cierre', 2400, 460, 2700, `<p class="h1 center">Recibir más turistas no siempre significa <em class="mark">desarrollar mejor el turismo.</em></p><p class="p center" style="margin-inline:auto">Aunque el paisaje siga siendo hermoso, probablemente la experiencia no sea la misma.</p>`, 'center', 1.35),
      };
    },
  });

  const V = { s: 0.36 };
  const footY = G + 50;
  VJ.beat({ id: 'c-llegada', part: 3, r: 'chalten', cam: [2800, 1090, 3100], travel: 1.4, hold: 1.3, val: { x: 1880, x2: 2500, y: footY, ...V, pose: 'stand', expr: 'joy', look: [0.5, -0.8], tele: true }, anim() { gsap.set('#cr1,#cr2,#cr3', { autoAlpha: 0 }); gsap.set('#meters', { autoAlpha: 0 }); } });
  VJ.beat({ id: 'c-fullday', part: 3, r: 'chalten', cam: [1800, 1180, 2400], travel: 1, hold: 1.8, val: { x: 2720, y: footY, f: -1, ...V, pose: 'strap', expr: 'smile', look: [0.8, -0.2] },
    anim(tl, t) {
      tl.to('#bus1', { x: 2500, duration: 0.8, ease: 'power2.out' }, t);
      tl.to('#c-sun', { x: 2200, y: -220, duration: 1.7, ease: 'sine.inOut' }, t);
      tl.to('#bus1', { x: 9400, duration: 0.3, ease: 'power1.in' }, t + 1.48);
    } });
  VJ.beat({ id: 'c-presion', part: 3, r: 'chalten', cam: [2500, 1160, 2500], travel: 0.8, hold: 1.9, val: { x: 1330, y: footY, ...V, pose: 'strap', expr: 'worry', look: [0.9, 0] },
    anim(tl, t, e, b) {
      tl.to('#meters', { autoAlpha: 1, duration: 0.2 }, t);
      tl.fromTo('#bus2', { x: 0 }, { x: 3200, duration: 0.7, immediateRender: false }, t);
      tl.fromTo('#bus3', { x: 0 }, { x: 3000, duration: 0.9, immediateRender: false }, t + 0.15);
      ['#cr1', '#cr2', '#cr3'].forEach((c, i) => tl.to(c, { autoAlpha: 1, duration: 0.3 }, t + 0.1 + i * 0.42));
      gsap.set('#m1,#m2,#m3', { scaleX: 0.14, transformOrigin: '0 50%' });
      ['#m1', '#m2', '#m3'].forEach((m, i) => tl.to(m, { scaleX: [0.97, 1, 0.92][i], duration: 1.2 }, t + 0.1));
    } });
  VJ.beat({ id: 'c-financia', part: 3, r: 'chalten', cam: [2500, 1160, 2500], travel: 0.4, hold: 0.9, val: { x: 1330, y: footY, ...V, pose: 'think', expr: 'think', look: [0.9, -0.8] }, anim(tl, t) { tl.to('#meters', { autoAlpha: 0, duration: 0.2 }, t + 0.72); } });
  VJ.beat({ id: 'c-tuu', part: 3, r: 'chalten', cam: [1370, 1360, 2000], travel: 1, hold: 1.5, val: { x: 420, y: footY, ...V, pose: 'point', expr: 'smile', look: [0.9, -0.5] },
    anim(tl, t, e, b) { gsap.set('#qr-sign', { y: 1000 }); tl.to('#qr-sign', { y: 0, duration: 0.5, ease: 'back.out(1.3)' }, b.t0 + 0.3); tl.to('#cr3', { autoAlpha: 0, duration: 0.2 }, b.t0); tl.to('#cr2', { autoAlpha: 0, duration: 0.2 }, b.t0); } });
  VJ.beat({ id: 'c-carga', part: 3, r: 'chalten', cam: [4660, 1240, 2500], travel: 1.2, hold: 1.8, val: { x: 3570, y: footY, ...V, pose: 'point', expr: 'think', look: [0.9, -0.3] } });
  VJ.beat({ id: 'c-cierre', part: 3, r: 'chalten', cam: [3760, 1000, 3600], travel: 0.9, hold: 1.2, val: { x: 3570, y: footY, ...V, pose: 'strap', expr: 'smile', look: [0.4, -0.7] } });

  VJ.beat({ id: 'ruta-usu', part: 3, r: 'atlas', cam: [1180, 1330, 1000], travel: 1.2, hold: 0.8, drift: 0.012, val: { x: PIN.chalten[0] + 4, x2: PIN.ushuaia[0] + 4, y: PIN.chalten[1] + 28, y2: PIN.ushuaia[1] + 28, s: 0.13, pose: 'stand', expr: 'smile', look: [0.5, 0], tele: true },
    anim(tl, t) { tl.fromTo('#route-live', { strokeDashoffset: 170 }, { strokeDashoffset: 0, duration: 0.72, immediateRender: false }, t); } });
})();
