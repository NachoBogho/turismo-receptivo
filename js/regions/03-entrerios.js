/* ==========================================================================
   PARTE 2 · ENTRE RÍOS: la temporada, la crecida, el multiplicador y la
   diversificación. Un largo recorrido por la costa del río.
   ========================================================================== */
(function () {
  const K = VJ.K, PIN = VJ.PIN;
  const SAND = 1700, HORIZON = 1320;

  function umbrella(x, y, c, r) {
    return `<g transform="translate(${x} ${y})"><path d="M0 0V-190" stroke="#6b5038" stroke-width="9"/><path d="M-120 -176Q0 -290 120 -176Q60 -200 0 -176Q-60 -200 -120 -176Z" fill="${c}"/><path d="M0 -258Q-34 -210 -44 -186M0 -258Q34 -210 44 -186" stroke="rgba(255,255,255,.45)" stroke-width="5" fill="none"/></g>`;
  }

  /* Viñetas de la diversificación: la misma tierra, otras experiencias. */
  const vig = {
    termas: (r) => `<ellipse cx="260" cy="240" rx="250" ry="80" fill="#8fd9d6"/><ellipse cx="260" cy="232" rx="222" ry="62" fill="#b5ecea"/><path d="M40 240C80 320 440 320 480 240V290C440 360 80 360 40 290Z" fill="#c9a77a"/>` + K.person(200, 250, 90, '#e0533f', r) + K.person(320, 252, 90, '#3d7a5f', r),
    bodega: (r) => { let s = `<path d="M0 320V120Q260 -20 520 120V320Z" fill="#a6562f"/><rect x="214" y="170" width="92" height="150" rx="46" fill="#4b2a18"/>`; for (let i = 0; i < 2; i++) s += `<g transform="translate(${i ? 410 : 26} 240)"><ellipse cx="42" cy="40" rx="44" ry="42" fill="#7a4a24"/><path d="M12 8Q-2 40 12 72M72 8Q86 40 72 72" stroke="#3a2412" stroke-width="6" fill="none"/></g>`; for (let i = 0; i < 9; i++) s += `<circle cx="${60 + i * 50}" cy="${100 - Math.abs(i - 4) * 12}" r="16" fill="#6d3a7d"/>`; return s; },
    carnaval: () => { let s = ''; ['#e0533f', '#f2b544', '#3c9b6b', '#5c97d3', '#b05ac2'].forEach((c, i) => { s += `<path d="M260 220C${150 + i * 55} ${40 - Math.abs(i - 2) * -24} ${170 + i * 55} -40 ${200 + i * 30} -70C${250 + i * 12} -10 ${265} 120 260 220Z" fill="${c}"/>`; }); s += `<path d="M120 200C170 150 350 150 400 200C400 290 330 320 260 280C190 320 120 290 120 200Z" fill="#fbe9c6"/><circle cx="196" cy="222" r="24" fill="#16263d"/><circle cx="324" cy="222" r="24" fill="#16263d"/><path d="M120 200C170 150 350 150 400 200" stroke="#e0533f" stroke-width="10" fill="none"/>`; return s; },
    cultura: () => `<rect x="60" y="130" width="400" height="190" fill="#e7cfa0"/><path d="M30 130L260 20L490 130Z" fill="#c2502f"/>${[0, 1, 2, 3].map((i) => `<rect x="${100 + i * 92}" y="150" width="30" height="170" fill="#fff4dc"/>`).join('')}<ellipse cx="260" cy="340" rx="230" ry="20" fill="#7b3c24" opacity=".4"/>`,
  };

  VJ.region({
    id: 'entre', x: PIN.entre[0] - 1500 * 0.125, y: PIN.entre[1] - 1250 * 0.125, s: 0.125, px: 1800, py: 1250,
    layers: [{ name: 'far', k: 0.11 }, { name: 'mid', k: 0.05 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #4aa4cf 1400px, #a9dcea 2200px, #fdeec6 2900px, #fdeec6 100%)', bgBox: [-5000, -1400, 22000, 6000],
    fgK: -0.1,
    build() {
      const r = K.rng(12);
      let clouds = '';
      for (let i = 0; i < 24; i++) clouds += K.cloud(K.rr(r, -1600, 11000), K.rr(r, 240, 1040), K.rr(r, 260, 560), '#fff', '#e7eff4', r);
      const shore = `<path d="${K.ridge(-2000, 12500, HORIZON, 14, 90, r, 1460)}" fill="#6fa78b"/>`;
      let trees = '';
      for (let x = -1900; x < 12400; x += K.rr(r, 90, 170)) trees += K.canopy(x, HORIZON - K.rr(r, 16, 50), K.rr(r, 50, 92), ['#3c7f5f', '#559a74', '#7fbf93'], r);

      const river = `<defs>${K.grad('erRiver', [[0, '#3f9fb2'], [0.6, '#5cc0c4'], [1, '#a9e0d6']])}${K.grad('erSand', [[0, '#f4d9a0'], [1, '#d9ae6c']])}</defs><rect x="-2200" y="${HORIZON + 40}" width="15000" height="500" fill="url(#erRiver)"/>` + [...Array(70)].map((_, i) => `<rect x="${-2000 + ((i * 487) % 14500)}" y="${HORIZON + 62 + ((i * 53) % 280)}" width="${100 + ((i * 41) % 230)}" height="6" rx="3" fill="#d7f3ee" opacity=".62"/>`).join('');
      const sand = `<path d="M-2200 2600V${SAND}Q0 ${SAND - 46} 2200 ${SAND - 12}T6400 ${SAND}T12800 ${SAND - 10}V2600Z" fill="url(#erSand)"/>`;
      let palms = '', umbrellas = '';
      [-900, -350, 300, 2500, 3050, 4300, 4700, 5300].forEach((x, i) => { palms += K.palm(x, SAND - 6, K.rr(r, 400, 520), '#2f8a5f', '#49a676', r); });
      [[500, '#e0533f'], [860, '#f2b544'], [1220, '#3c9b6b'], [1580, '#5c97d3'], [1940, '#e0533f']].forEach(([x, c], i) => { umbrellas += K.act(`umb${i}`, 0, 0, 10, 10, umbrella(x, SAND + 8, c)); });
      const people = (() => { const q = K.rng(5); let s = ''; for (let i = 0; i < 26; i++) s += K.person(K.rr(q, 200, 2300), SAND + K.rr(q, 20, 200), K.rr(q, 130, 170), ['#e0533f', '#f2b544', '#3c9b6b', '#5c97d3', '#fff4dc'][i % 5], q); return s; })();
      const hotel = `<g transform="translate(-1500 ${SAND})"><rect y="-320" width="560" height="320" fill="#e7b966"/><path d="M-30 -320L280 -420L590 -320Z" fill="#a6562f"/>${[0, 1, 2, 3].map((c) => [0, 1].map((w) => `<rect x="${40 + c * 128}" y="${-290 + w * 130}" width="90" height="94" rx="6" fill="#fff4dc"/>`).join('')).join('')}</g>`;

      let fg = '';
      for (let x = -1800; x < 12500; x += K.rr(r, 700, 1200)) fg += K.fern(x, 2200, K.rr(r, 300, 430), -100 + K.rr(r, -30, 30), '#7b5a32', r);

      const rings = [[1, 'directo', 'Directo', '#e0533f'], [2, 'indirecto', 'Indirecto', '#f2b544'], [3, 'inducido', 'Inducido', '#fff8e8']];
      const vX = (i) => 7000 + i * 720;
      const OP = [['termas', 'Termas', 'Complejos termales: una alternativa cuando el río no acompaña.'], ['bodega', 'Bodegas', 'Enoturismo: una propuesta que no depende del río.'], ['carnaval', 'Carnavales', 'Una oferta cultural propia de la temporada.'], ['cultura', 'Gastronomía y cultura', 'Patrimonio histórico, cocina regional y circuitos culturales.']];

      return {
        far: K.svg(0, 0, 10, 10, clouds + shore),
        mid: K.svg(0, 0, 10, 10, trees),
        fg: K.svg(0, 0, 10, 10, fg),
        main: K.svg(0, 0, 10, 10, river)
          + K.svg(0, 0, 10, 10, sand + hotel + palms + people) + umbrellas
          + K.act('e-flood', -2200, 2400, 15000, 1200, `<defs>${K.grad('erFl', [[0, '#7a9a8b', 0.92], [1, '#3f6a6a', 1]])}</defs><rect width="15000" height="1200" fill="url(#erFl)"/><path d="M0 8H15000" stroke="#d7e7dc" stroke-width="7" stroke-dasharray="80 40"/>`)

          /* Temporada */
          + K.say('e-llegada', -420, 200, 2700, `<p class="k center">Entre Ríos · temporada estival</p><p class="h0 center">Un verano junto al río</p>`, 'center', 0.95)
          + K.say('e-llegada', -560, 690, 900, `<p class="num md center">+<span id="n35">0</span> M</p><p class="p center">de turistas moviliza la temporada</p>`, 'center')
          + K.say('e-llegada', 340, 690, 1060, `<p class="num md center">$<span id="n305">0</span> mil M</p><p class="p center">de impacto económico estimado</p>`, 'center')
          + K.say('e-llegada', 1400, 690, 850, `<p class="num md center">$<span id="n102">0</span></p><p class="p center">de gasto diario promedio por persona</p>`, 'center')
          + K.say('e-crecida', 240, 280, 1880, `<p class="k center">Comienzan las lluvias intensas</p><p class="h1 center">Aunque no todos los establecimientos estén afectados, la incertidumbre puede provocar cancelaciones.</p>`, 'center light', 1.1)
          + K.hot('e-crecida', 1820, 1120, 'mesa', 'Mesa de Seguimiento y Adaptación', )
          + K.hot('e-crecida', 1820, 1220, 'litoral', 'El Litoral frente al agua')

          /* Multiplicador: una moneda y tres anillos */
          + K.act('coin', 4140, 1130, 90, 90, `<circle cx="45" cy="45" r="42" fill="#f2b544"/><circle cx="45" cy="45" r="31" fill="none" stroke="#b47a15" stroke-width="5"/><text x="45" y="62" text-anchor="middle" font-family="Fraunces" font-weight="700" font-size="46" fill="#7c500c">$</text>`)
          + rings.map(([n], i) => K.act(`ring${n}`, 4185 - 1200, 1490 - 400, 2400, 800, `<ellipse cx="1200" cy="400" rx="${260 + i * 260}" ry="${80 + i * 76}" fill="none" stroke="${rings[i][3]}" stroke-width="${16 - i * 2}"/>`)).join('')
          + K.say('e-multi', 3070, 300, 2200, `<p class="k center">Efecto multiplicador</p><p class="h1 center">Cuando una persona viaja, no solamente paga un hotel.</p><p class="p center" style="margin-inline:auto">Consume alimentos, usa transporte, compra productos y contrata excursiones. <em class="mark">Ese dinero circula dentro de la economía local.</em></p>`, 'center plate', 1.05)
          + K.hot('e-multi', 4960, 1470, 'multiplicador', 'Efecto multiplicador')
          + K.say('e-empleo', 3360, 340, 1660, `<p class="h1 center">Tres anillos de empleo</p>`, 'center')
          + K.hot('e-empleo', 3950, 1450, 'directo', 'Empleo directo', 'hot-c')
          + K.hot('e-empleo', 3950, 1590, 'indirecto', 'Empleo indirecto', 'hot-c')
          + K.hot('e-empleo', 3950, 1730, 'inducido', 'Empleo inducido', 'hot-c')
          + K.say('e-empleo', 3300, 560, 1800, `<p class="p center" style="margin-inline:auto">Si disminuye la actividad, las consecuencias alcanzan a personas que <em class="mark">ni siquiera trabajan directamente con turistas</em>.</p>`, 'center')

          /* Diversificación */
          + OP.map(([k], i) => K.act(`vig${i}`, vX(i), 1100, 520, 360, vig[k](K.rng(40 + i)))).join('')
          + K.say('e-pregunta', 6980, 300, 2900, `<p class="k center">¿Si el río crece, toda la temporada está perdida?</p><p class="h0 center">No necesariamente.</p>`, 'center', 1.0)
          + K.say('e-divers', 6880, 240, 3120, `<p class="k center">Diversificación de la oferta</p><p class="h1 center">Llueve en la costa. ¿Qué le proponés a Valeria?</p>`, 'center pointer', 0.92)
          + OP.map(([k, n, say], i) => `<div class="say pointer" data-b="e-divers" style="left:${vX(i) - 40}px;top:1480px;width:600px;text-align:center"><button class="pick" data-pick="er" data-val="${k}" data-say="${say}">${n}</button></div>`).join('')
          + `<div class="say center pointer" data-b="e-divers" style="left:7000px;top:1600px;width:2800px"><p class="hand" data-out="er" style="font-size:66px;color:#7b2f1f">&nbsp;</p></div>`
          + K.say('e-idea', 6900, 340, 3000, `<p class="h1 center">Un destino que depende de un único atractivo es más vulnerable que uno que ofrece diferentes experiencias.</p>`, 'center', 1.0)

          /* Hogar */
          + K.act('homes', 0, 0, 10, 10, homes(), 'static')
          + K.say('e-hogar', 10130, 330, 2100, `<p class="k center">Hasta ahora hablamos de turistas, empresas e ingresos</p><p class="h1 center">¿Y las personas que viven allí todo el año?</p><p class="h2 center"><em class="mark">Los destinos también son el hogar de miles de personas.</em></p>`, 'center', 0.98),
      };
    },
  });

  function homes() {
    const r = K.rng(90); let s = '';
    const cs = [['#e7b966', '#a6562f'], ['#6fa8a2', '#2f5d5a'], ['#d97c4a', '#7b2f1f'], ['#c9d6c0', '#58705f'], ['#f0d6a6', '#b06a3a']];
    for (let i = 0; i < 9; i++) { const x = 10200 + i * 230, h = K.rr(r, 180, 280), [a, b] = cs[i % 5]; s += `<rect x="${x}" y="${SAND - h}" width="200" height="${h}" fill="${a}"/><path d="M${x - 14} ${SAND - h}L${x + 100} ${SAND - h - 70}L${x + 214} ${SAND - h}Z" fill="${b}"/><rect x="${x + 76}" y="${SAND - 92}" width="50" height="92" fill="#4b2a18"/><rect x="${x + 22}" y="${SAND - h + 34}" width="44" height="46" fill="#fff4dc"/><rect x="${x + 134}" y="${SAND - h + 34}" width="44" height="46" fill="#fff4dc"/>`; }
    for (let i = 0; i < 16; i++) s += K.person(K.rr(r, 10220, 12200), SAND + K.rr(r, 10, 110), K.rr(r, 140, 180), ['#e0533f', '#3c9b6b', '#5c97d3', '#7a6aa8'][i % 4], r);
    return s;
  }

  const V = { s: 0.36 };
  VJ.beat({ id: 'e-llegada', part: 2, r: 'entre', cam: [900, 1120, 3000], travel: 1.5, hold: 1.6, val: { x: 200, x2: 900, y: SAND + 70, ...V, pose: 'stand', expr: 'joy', look: [0.5, -0.3], tele: true },
    anim(tl, t) {
      K.count(tl, '#n35', 0, 3.5, t + 0.05, 0.7, (v) => v.toFixed(1).replace('.', ','));
      K.count(tl, '#n305', 0, 305, t + 0.2, 0.7);
      K.count(tl, '#n102', 0, 102243, t + 0.35, 0.7);
    } });
  VJ.beat({ id: 'e-crecida', part: 2, r: 'entre', cam: [1180, 1160, 2700], travel: 1, hold: 1.7, tint: 0.5, rain: 0.9, val: { x: 940, y: SAND + 70, ...V, pose: 'strap', expr: 'worry', look: [-0.6, -0.8] },
    anim(tl, t, e, b) {
      tl.to('#e-flood', { y: -880, duration: 1.3, ease: 'sine.inOut' }, b.t0 + 0.4);
      [0, 1, 2, 3, 4].forEach((i) => { gsap.set(`#umb${i}`, { transformOrigin: `${[500, 860, 1220, 1580, 1940][i]}px ${SAND + 8}px` }); tl.to(`#umb${i}`, { rotation: i % 2 ? 22 : -24, y: -30, duration: 0.5 }, t + 0.1 + i * 0.1); });
    } });
  VJ.beat({ id: 'e-multi', part: 2, r: 'entre', cam: [4180, 1180, 2600], travel: 1.2, hold: 1.5, val: { x: 3720, y: SAND + 70, ...V, pose: 'point', expr: 'smile', look: [0.9, -0.4] },
    anim(tl, t, e, b) {
      tl.to('#e-flood', { y: 0, duration: 0.6 }, b.t0);
      [0, 1, 2, 3, 4].forEach((i) => tl.to(`#umb${i}`, { rotation: 0, y: 0, duration: 0.4 }, b.t0));
      gsap.set('#ring1,#ring2,#ring3', { scale: 0.05, transformOrigin: '50% 50%', autoAlpha: 0 });
      gsap.set('#coin', { autoAlpha: 0 });
      tl.to('#coin', { autoAlpha: 1, duration: 0.05 }, t + 0.05);
      tl.to('#coin', { y: 320, rotation: 720, duration: 0.42, ease: 'power2.in' }, t + 0.06);
      tl.to('#coin', { autoAlpha: 0, duration: 0.05 }, t + 0.47);
      [1, 2, 3].forEach((n, i) => { tl.to(`#ring${n}`, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, t + 0.47 + i * 0.26); });
    } });
  VJ.beat({ id: 'e-empleo', part: 2, r: 'entre', cam: [4180, 1240, 2300], travel: 0.7, hold: 1.7, val: { x: 3190, y: SAND + 70, ...V, pose: 'point', expr: 'smile', look: [0.9, 0.1] } });
  VJ.beat({ id: 'e-pregunta', part: 2, r: 'entre', cam: [8400, 1000, 3300], travel: 1.3, hold: 0.9, tint: 0.3, rain: 0.5, val: { x: 6600, y: SAND + 70, ...V, pose: 'think', expr: 'worry' } });
  VJ.beat({ id: 'e-divers', part: 2, r: 'entre', cam: [8400, 1040, 3300], travel: 0.6, hold: 1.8, val: { x: 6600, y: SAND + 70, ...V, pose: 'wave', gest: 'wave', expr: 'joy', look: [0.9, -0.4] },
    anim(tl, t, e, b) {
      [0, 1, 2, 3].forEach((i) => { gsap.set(`#vig${i}`, { y: 700, scale: 0.6, transformOrigin: '50% 100%' }); tl.to(`#vig${i}`, { y: 0, scale: 1.04, duration: 0.42, ease: 'back.out(1.5)' }, b.t0 + 0.1 + i * 0.12); });
    } });
  VJ.beat({ id: 'e-idea', part: 2, r: 'entre', cam: [8400, 1000, 3300], travel: 0.6, hold: 1.1, val: { x: 6600, y: SAND + 70, ...V, pose: 'strap', expr: 'smile', look: [0.9, -0.4] } });
  VJ.beat({ id: 'e-hogar', part: 2, r: 'entre', cam: [11200, 1100, 2600], travel: 1.6, hold: 1.4, val: { x: 9950, y: SAND + 80, ...V, pose: 'strap', expr: 'think', look: [0.9, -0.2] } });

  VJ.beat({ id: 'ruta-sur', part: 3, r: 'atlas', cam: [1320, 950, 2200], travel: 1.5, hold: 1.6, drift: 0.01, val: { x: PIN.entre[0] + 4, x2: PIN.chalten[0] + 4, y: PIN.entre[1] + 34, y2: PIN.chalten[1] + 34, s: 0.17, pose: 'stand', expr: 'smile', look: [0.5, 0], tele: true },
    anim(tl, t) { tl.fromTo('#route-live', { strokeDashoffset: 1000 }, { strokeDashoffset: 170, duration: 1.3, immediateRender: false }, t); } });
})();
