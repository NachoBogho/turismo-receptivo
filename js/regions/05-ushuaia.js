/* ==========================================================================
   PARTE 3 · USHUAIA: cuando el problema empieza entre instituciones.
   ========================================================================== */
(function () {
  const K = VJ.K, PIN = VJ.PIN;
  const PIER = 1640, SEA = 1560;

  const martial = (r) => {
    let s = `<defs>${K.grad('usM', [[0, '#c7d7ea'], [0.55, '#6f8aa8'], [1, '#2f4a68']])}${K.grad('usS', [[0, '#1d5877'], [1, '#0d2c44']])}</defs>`;
    let d = 'M-2000 1620L-2000 1200';
    for (let x = -2000; x < 9000; x += 220) d += `L${x} ${K.f(1160 + Math.sin(x / 640) * 220 + K.rr(r, -130, 120))}`;
    s += `<path d="${d}L9000 1620Z" fill="url(#usM)"/>`;
    for (let x = -1900; x < 8900; x += K.rr(r, 300, 520)) { const y = 960 + Math.sin(x / 640) * 220 + K.rr(r, 60, 190), w = K.rr(r, 90, 190); s += `<path d="M${K.f(x - w)} ${K.f(y + w * 0.55)}L${K.f(x)} ${K.f(y - w * 0.2)}L${K.f(x + w)} ${K.f(y + w * 0.55)}L${K.f(x + w * 0.45)} ${K.f(y + w * 0.3)}L${K.f(x)} ${K.f(y + w * 0.55)}L${K.f(x - w * 0.45)} ${K.f(y + w * 0.3)}Z" fill="#f4f8fc"/>`; }
    s += `<path d="${K.ridge(-2000, 9000, 1500, 16, 120, r, 1640)}" fill="#284a4f"/>`;
    return s;
  };

  const ship = `
    <path d="M30 330H1180L1110 470Q1090 500 1050 500H130Q90 500 76 470Z" fill="#fbfdff"/><path d="M30 330H1180L1168 356H42Z" fill="#c2502f"/><path d="M76 470Q90 500 130 500H1050Q1090 500 1110 470Z" fill="#1d2536"/>
    <rect x="130" y="210" width="940" height="120" fill="#f4f7fb"/><rect x="210" y="110" width="760" height="100" fill="#fbfdff"/><rect x="340" y="30" width="460" height="80" fill="#f4f7fb"/>
    ${[...Array(20)].map((_, i) => `<rect x="${150 + i * 45}" y="240" width="30" height="26" rx="4" fill="#26324b"/><rect x="${150 + i * 45}" y="284" width="30" height="26" rx="4" fill="#26324b"/>`).join('')}
    ${[...Array(14)].map((_, i) => `<rect x="${234 + i * 52}" y="146" width="34" height="30" rx="4" fill="#5b8bb5"/>`).join('')}
    <path d="M600 30V-50h60l14 80z" fill="#c2502f"/><rect x="600" y="-30" width="66" height="14" fill="#f2b544"/>`;

  const gear = (id, x, y, R, teeth, c, label, pop) => {
    let d = '';
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2, s = Math.PI / teeth / 1.8, R2 = R + R * 0.17;
      const p = (rad, ang) => `${K.f(R2 + Math.cos(ang) * rad)} ${K.f(R2 + Math.sin(ang) * rad)}`;
      d += `${i ? 'L' : 'M'}${p(R, a - s * 1.4)}L${p(R2, a - s * 0.7)}L${p(R2, a + s * 0.7)}L${p(R, a + s * 1.4)}`;
    }
    const size = (R + R * 0.17) * 2;
    return K.act(id, x, y, size, size, `<path d="${d}Z" fill="${c}"/><circle cx="${size / 2}" cy="${size / 2}" r="${R * 0.72}" fill="#fff8e8" opacity=".14"/><circle cx="${size / 2}" cy="${size / 2}" r="${R * 0.14}" fill="#0d2c44"/>`)
      + K.hot('u-gobernanza', x + size / 2 - 130, y + size / 2 - 20, pop, label);
  };

  const chain = [['ship', 'Agencias receptivas'], ['bus', 'Transportistas'], ['plate', 'Restaurantes'], ['shop', 'Comercios'], ['box', 'Proveedores'], ['worker', 'Trabajadores portuarios']];

  VJ.region({
    id: 'ushuaia', x: PIN.ushuaia[0] - 2600 * 0.125, y: PIN.ushuaia[1] - 1250 * 0.125, s: 0.125, px: 2600, py: 1250,
    layers: [{ name: 'far', k: 0.11 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #16233f 1400px, #2d4872 2300px, #6283ad 2680px, #e7b9a6 2920px, #f5d5b8 3060px)', bgBox: [-5000, -1400, 18000, 6000],
    build() {
      const r = K.rng(33);
      let clouds = '';
      for (let i = 0; i < 10; i++) clouds += K.cloud(K.rr(r, -600, 7000), K.rr(r, 200, 700), K.rr(r, 400, 900), '#8ba2c2', '#5f7ba0', r);
      const water = `<rect x="-2600" y="${SEA}" width="15000" height="1400" fill="url(#usS)"/>` + [...Array(70)].map((_, i) => `<rect x="${-2400 + ((i * 487) % 14400)}" y="${SEA + 24 + ((i * 61) % 640)}" width="${110 + ((i * 43) % 280)}" height="6" rx="3" fill="#7fb0c8" opacity=".5"/>`).join('');
      const pier = `<rect x="600" y="${PIER}" width="4800" height="40" fill="#8a7a66"/><rect x="600" y="${PIER + 40}" width="4800" height="20" fill="#5f5243"/>` + [...Array(25)].map((_, i) => `<rect x="${640 + i * 196}" y="${PIER + 60}" width="26" height="520" fill="#4b4136"/>`).join('');
      const city = (() => { let s = ''; for (let i = 0; i < 26; i++) { const x = -1700 + i * 94, h = K.rr(r, 60, 160); s += `<rect x="${x}" y="${SEA - 20 - h}" width="84" height="${h + 30}" fill="${['#c9665a', '#e7b966', '#6fa8a2', '#d97c4a'][i % 4]}"/><path d="M${x - 6} ${SEA - 20 - h}L${x + 42} ${SEA - 60 - h}L${x + 90} ${SEA - 20 - h}Z" fill="#3a4a58"/>`; } return s; })();
      const drums = [...Array(7)].map((_, i) => `<g transform="translate(${1580 + i * 74} ${PIER - 110})"><rect width="64" height="110" rx="6" fill="${i % 2 ? '#e0a437' : '#c2502f'}"/><rect y="30" width="64" height="9" fill="#16263d"/><rect y="70" width="64" height="9" fill="#16263d"/></g>`).join('');
      const rope = K.act('rope', 1400, PIER - 240, 1400, 110, `<path d="M0 54C350 74 1050 34 1400 54" stroke="#d7b56d" stroke-width="16" fill="none" stroke-linecap="round"/><rect x="664" y="10" width="72" height="88" rx="10" fill="#c2502f"/>`);
      const pul = (x, flip, c) => { const q = K.rng(x); let s = ''; for (let i = 0; i < 4; i++) s += K.person(x + (flip ? 1 : -1) * i * 92, PIER, 230, c, q); return s; };
      const tug = K.act('tugL', 0, 0, 10, 10, pul(1400, false, '#5c97d3'), 'static') + K.act('tugR', 0, 0, 10, 10, pul(2800, true, '#3c9b6b'), 'static');
      const workers = (() => { const q = K.rng(70); let s = ''; for (let i = 0; i < 26; i++) s += K.person(K.rr(q, 700, 1350), PIER, K.rr(q, 120, 145), '#f28c28', q); return K.act('u-work', 0, 0, 10, 10, s, 'static'); })();

      const chainHtml = chain.map(([ic, n], i) => `<div class="link" id="lk${i}"><span>${K.icon(ic)}</span><b>${n}</b></div>${i < chain.length - 1 ? `<em id="lke${i}"></em>` : ''}`).join('');
      const pillars = [['leaf', 'Ambiente'], ['worker', 'Empleo'], ['gov', 'Servicios públicos'], ['heart', 'Calidad de vida']].map(([ic, n], i) => `<div class="pillar" id="pl${i}"><span>${K.icon(ic)}</span><b>${n}</b></div>`).join('');

      return {
        far: K.svg(0, 0, 10, 10, clouds + martial(r)),
        main: K.svg(0, 0, 10, 10, water + city + pier + drums)
          + K.act('cruise', 2800, PIER - 490, 1200, 520, ship)
          + rope + tug + workers
          + K.say('u-llegada', 1060, 240, 3000, `<p class="k center">Canal Beagle, cruceros y la posibilidad de conocer la Antártida</p><p class="h0 center">Ushuaia</p>`, 'center light', 1.1)
          + K.say('u-llegada', 900, 800, 1000, `<p class="num center">+<span id="n590">0</span></p><p class="p center">recaladas de cruceros confirmadas</p>`, 'center light', 0.95)
          + K.say('u-llegada', 1960, 800, 1000, `<p class="num center">+<span id="n2000">0</span></p><p class="p center">puestos de trabajo vinculados con la temporada</p>`, 'center light', 0.95)
          + K.hot('u-llegada', 3020, 880, 'beagle', 'Canal Beagle y paisajes antárticos')

          + K.say('u-conflicto', 1300, 240, 1800, `<p class="k center">Durante 2026 · Administración y fiscalización ambiental</p><p class="h1 center">Un conflicto entre autoridades nacionales y provinciales</p>`, 'center light')
          + K.say('u-conflicto', 1080, 1010, 620, `<p class="hand center" style="color:#fff">Autoridad Nacional de Puertos y Navegación</p>`, 'center light')
          + K.say('u-conflicto', 2500, 1010, 620, `<p class="hand center" style="color:#fff">Provincia de Tierra del Fuego</p>`, 'center light')
          + K.say('u-conflicto', 620, 1760, 1040, `<p class="num md">89 a 140</p><p class="p">trabajadores desplazados</p>`, 'light')
          + K.hot('u-conflicto', 1800, 1500, 'puerto', 'Resolución 4/2026 y residuos peligrosos')

          + K.say('u-cadena', 2200, 300, 2200, `<p class="k center">Una puerta de entrada fundamental para el turismo antártico</p><p class="h1 center">Un conflicto institucional puede afectar a toda la cadena turística</p>`, 'center light')
          + `<div class="say chain" data-b="u-cadena" style="left:2300px;top:980px;width:2020px">${chainHtml}</div>`

          + K.say('u-gobernanza', 3780, 300, 1200, `<p class="k">Otro concepto del trabajo</p><p class="h1">Gobernanza</p><p class="p">La capacidad de diferentes actores para coordinar decisiones y gestionar un destino. No alcanza con que existan organismos: <em class="mark">necesitan trabajar de manera articulada</em>.</p><p class="h3" style="margin-top:30px">A veces, una dificultad turística comienza con un conflicto entre instituciones.</p>`, 'light')
          + gear('g1', 5000, 480, 240, 14, '#e0a437', 'Nacional y regional', 'esc-nac')
          + gear('g2', 5540, 760, 200, 12, '#3c9b6b', 'Municipal y local', 'esc-mun')
          + gear('g3', 4910, 1090, 180, 11, '#5c97d3', 'Interjurisdiccional', 'esc-int')

          + K.say('u-sost', 6480, 280, 2100, `<p class="k center">Turismo sostenible también implica</p><p class="h1 center">Cuidar el empleo, los servicios públicos y la calidad de vida</p>`, 'center light')
          + `<div class="say pillars" data-b="u-sost" style="left:6560px;top:790px;width:1940px">${pillars}</div>`
          + K.say('u-sost', 6480, 1220, 2100, `<p class="h2 center">Un destino no es verdaderamente sostenible si ofrece experiencias extraordinarias a los visitantes, pero genera problemas permanentes para sus residentes.</p>`, 'center light', 0.9),
      };
    },
  });

  const V = { s: 0.36 };
  const foot = PIER + 4;
  VJ.beat({ id: 'u-llegada', part: 3, r: 'ushuaia', cam: [2500, 1060, 3200], travel: 1.2, hold: 1.5, val: { x: 860, x2: 1200, y: foot, ...V, pose: 'stand', expr: 'joy', look: [0.7, -0.4], tele: true },
    anim(tl, t, e, b) {
      gsap.set('#cruise', { x: 3400 });
      tl.to('#cruise', { x: 0, duration: 1.2, ease: 'power2.out' }, b.t0 + 0.3);
      gsap.set('#rope,#tugL,#tugR,#u-work', { autoAlpha: 0 });
      K.count(tl, '#n590', 0, 590, t + 0.05, 0.7);
      K.count(tl, '#n2000', 0, 2000, t + 0.2, 0.7, (v) => Math.round(v).toLocaleString('es-AR'));
    } });
  VJ.beat({ id: 'u-conflicto', part: 3, r: 'ushuaia', cam: [2100, 1120, 2800], travel: 0.9, hold: 2.3, tint: 0.28, val: { x: 500, y: foot, ...V, pose: 'think', expr: 'worry', look: [0.9, -0.2] },
    anim(tl, t, e, b) {
      tl.to('#cruise', { x: 1200, duration: 0.8, ease: 'sine.inOut' }, b.t0);
      tl.to('#rope,#tugL,#tugR', { autoAlpha: 1, duration: 0.2 }, t);
      tl.to('#u-work', { autoAlpha: 1, duration: 0.2 }, t);
      for (let i = 0; i < 6; i++) tl.to('#rope,#tugL,#tugR', { x: i % 2 ? 58 : -58, duration: 0.3, ease: 'sine.inOut' }, t + 0.1 + i * 0.3);
      tl.to('#u-work', { x: -520, opacity: 0.25, duration: 1.4, ease: 'power1.in' }, t + 0.4);
    } });
  VJ.beat({ id: 'u-cadena', part: 3, r: 'ushuaia', cam: [3300, 1080, 2700], travel: 0.9, hold: 1.8, tint: 0.2, val: { x: 2060, y: foot, ...V, pose: 'point', expr: 'worry', look: [0.9, -0.7] },
    anim(tl, t, e, b) {
      tl.to('#rope,#tugL,#tugR', { autoAlpha: 0, duration: 0.2 }, b.t0);
      tl.to('#cruise', { x: 4200, duration: 0.8, ease: 'sine.inOut' }, b.t0);
      [0, 1, 2, 3, 4].forEach((i) => { tl.to(`#lke${i}`, { scaleX: 0, duration: 0.14 }, t + 0.55 + i * 0.13); tl.to(`#lk${i + 1}`, { y: 60, rotation: i % 2 ? 7 : -8, opacity: 0.55, duration: 0.25, ease: 'power2.in' }, t + 0.6 + i * 0.13); });
    } });
  VJ.beat({ id: 'u-gobernanza', part: 3, r: 'ushuaia', cam: [4950, 900, 2750], travel: 1.3, hold: 2.4, tint: 0.5, val: false,
    anim(tl, t) {
      gsap.set('#g1,#g2,#g3', { transformOrigin: '50% 50%' });
      tl.fromTo('#g2', { x: 210, y: -90 }, { x: 0, y: 0, duration: 0.5, ease: 'power2.inOut', immediateRender: false }, t + 0.1);
      tl.fromTo('#g3', { x: -180, y: 120 }, { x: 0, y: 0, duration: 0.5, ease: 'power2.inOut', immediateRender: false }, t + 0.1);
      tl.to('#g1', { rotation: 200, duration: 1.4 }, t + 0.6);
      tl.to('#g2', { rotation: -233, duration: 1.4 }, t + 0.6);
      tl.to('#g3', { rotation: -255, duration: 1.4 }, t + 0.6);
    } });
  VJ.beat({ id: 'u-sost', part: 3, r: 'ushuaia', cam: [7530, 1000, 2600], travel: 1.2, hold: 1.8, tint: 0.55, val: false,
    anim(tl, t) { [0, 1, 2, 3].forEach((i) => { gsap.set(`#pl${i}`, { scale: 0.5, opacity: 0 }); tl.to(`#pl${i}`, { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(2)' }, t + 0.2 + i * 0.15); }); } });

  VJ.beat({ id: 'dimensiones', part: 3, r: 'atlas', cam: [1300, 800, 2640], travel: 1.5, hold: 1.7, drift: 0.012, val: { x: PIN.ushuaia[0] + 4, y: PIN.ushuaia[1] + 28, s: 0.13, pose: 'think', expr: 'think', look: [0, -0.6], tele: true } });
})();
