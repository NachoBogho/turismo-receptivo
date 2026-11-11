/* ==========================================================================
   PARTE 1 · IGUAZÚ, EL NIÑO Y LA DUDA
   Un solo paisaje continuo: pueblo → estación → pasarela → Garganta, y arriba
   el cielo donde se explica El Niño.
   ========================================================================== */
(function () {
  const K = VJ.K, PIN = VJ.PIN, G = VJ.GEO;
  const GROUND = 1745, N_SEG = 11, SEG_W = 240, SEG_X0 = 2960;
  const J1 = ['#1b5a45', '#2c7f5c', '#55ad78'], J2 = ['#14493a', '#1f6b4f', '#3c9b6b'], J3 = ['#0f3a30', '#17574a', '#2b8263'];
  const rimY = (x) => (x < 5900 ? 1230 + (x - 4200) * 0.075 : 1357 - (x - 5900) * 0.11);

  function far() {
    const r = K.rng(3);
    let s = `<path d="${K.ridge(-1400, 9000, 1400, 34, 130, r, 2300)}" fill="#a2cdbb"/><path d="${K.ridge(-1400, 9000, 1500, 30, 110, r, 2300)}" fill="#7eb7a1"/>`;
    for (let i = 0; i < 26; i++) s += K.cloud(K.rr(r, -1200, 8600), K.rr(r, 560, 1160), K.rr(r, 300, 620), '#fbf8ee', '#dfe9ee', r);
    return K.svg(0, 0, 10, 10, s);
  }

  function mid() {
    const r = K.rng(8);
    let s = `<path d="${K.ridge(-1400, 9000, 1520, 22, 70, r, 2300)}" fill="#3a8a68"/>`;
    for (let x = -1300; x < 4320; x += K.rr(r, 110, 190)) s += K.tree(x, 1790, K.rr(r, 340, 560), r() > 0.5 ? J1 : J2, r);
    return K.svg(0, 0, 10, 10, s);
  }

  function falls() {
    const r = K.rng(14);
    let s = `<defs>${K.grad('rock', [[0, '#5a675e'], [0.5, '#3a4741'], [1, '#232e2c']])}${K.grad('water', [[0, '#ffffff'], [0.55, '#eff9f8'], [1, '#bfe3e7']])}${K.grad('earth', [[0, '#b54a2c'], [1, '#7b2f1f']])}${K.grad('riverG', [[0, '#3b8f95'], [1, '#1b5261']])}${K.grad('deck', [[0, '#8d97a0'], [1, '#5d6871']])}</defs>`;
    // Selva continua detrás del borde: hace que el agua blanca resalte.
    s += `<path d="${K.ridge(4100, 7900, 1120, 20, 80, r, 1500)}" fill="#17574a"/>`;
    for (let x = 4150; x < 7800; x += K.rr(r, 70, 130)) s += K.canopy(x, rimY(x) - K.rr(r, 70, 130), K.rr(r, 70, 120), J2, r);
    let rim = 'M4180 2100L4180 1230';
    for (let x = 4200; x <= 7700; x += 100) rim += `L${x} ${K.f(rimY(x))}`;
    s += `<path d="${rim}L7700 2100Z" fill="url(#rock)"/>`;
    let face = `M4280 1920L4280 ${K.f(rimY(4280))}`;
    for (let x = 4380; x <= 7560; x += 100) face += `L${x} ${K.f(rimY(x) + K.rr(r, -6, 8))}`;
    s += `<path d="${face}L7560 1920Z" fill="url(#water)"/>`;
    // Sombras verticales: dan volumen a la cortina de agua.
    for (let i = 0; i < 44; i++) { const x = K.rr(r, 4300, 7500), w = K.rr(r, 8, 46), t = rimY(x) + K.rr(r, 10, 60); s += `<rect x="${K.f(x)}" y="${K.f(t)}" width="${K.f(w)}" height="${K.f(1900 - t)}" rx="${K.f(w / 2)}" fill="#a9d6dd" opacity="${K.f(K.rr(r, 0.18, 0.5))}"/>`; }
    // Salientes de basalto con selva encima: cortan la caída en saltos.
    const crags = [4560, 4980, 5440, 5900, 6330, 6790, 7240];
    crags.forEach((cx) => {
      const y = rimY(cx) - 8, w = K.rr(r, 42, 86), h = K.rr(r, 150, 300);
      s += `<path d="M${K.f(cx - w)} ${K.f(y)}L${K.f(cx + w)} ${K.f(y)}L${K.f(cx + w * 0.55)} ${K.f(y + h * 0.55)}L${K.f(cx + w * 0.2)} ${K.f(y + h)}L${K.f(cx - w * 0.3)} ${K.f(y + h * 0.7)}Z" fill="#2c3834"/>` + K.canopy(cx, y - 16, w * 1.25, J3, r);
    });
    const ledges = [[4470, 1630, 170], [5180, 1590, 210], [5720, 1660, 150], [6210, 1610, 220], [6950, 1640, 190]];
    ledges.forEach(([cx, y, w]) => {
      s += `<path d="M${cx - w} ${y + 44}Q${cx - w * 0.3} ${y - 34} ${cx + w} ${y + 30}L${cx + w * 1.15} ${y + 300}L${cx - w * 1.15} ${y + 300}Z" fill="#2a3633"/>` + K.canopy(cx, y - 2, w * 0.66, J3, r);
    });
    for (let x2 = 4100; x2 < 4400; x2 += 60) s += K.tree(x2, 1860, K.rr(r, 560, 760), J1, r);
    for (let i = 0; i < 40; i++) s += `<circle cx="${K.f(K.rr(r, 4300, 7560))}" cy="${K.f(K.rr(r, 1872, 1936))}" r="${K.f(K.rr(r, 22, 60))}" fill="#ffffff"/>`;

    const flows = [[4300, 640], [4960, 640], [5620, 620], [6260, 640], [6920, 620]].map(([x, w], i) => {
      const t = 1290;
      return `<div class="flow" style="left:${x}px;top:${t}px;width:${w}px;height:${1900 - t}px;opacity:.75"><i style="background-image:${K.flowPattern().replace(/"/g, "'")};animation-duration:${1.25 + i * 0.13}s"></i></div>`;
    });
    let rainbow = '';
    ['#f06a5a', '#f6b24e', '#f7e36b', '#7ccf8f', '#62a7e0', '#9b7ad1'].forEach((c, i) => { rainbow += `<path d="M4700 1880A${1000 - i * 22} ${1000 - i * 22} 0 0 1 6700 1880" fill="none" stroke="${c}" stroke-width="23" opacity=".26"/>`; });
    return K.svg(0, 0, 10, 10, s) + flows.join('') + K.svg(0, 0, 10, 10, rainbow);
  }

  function ground() {
    const r = K.rng(31);
    let s = `<path d="M-1800 2600L-1800 1752Q800 1772 2300 1760T3040 1780L3090 1950L3050 2600Z" fill="url(#earth)"/><path d="M-1800 1752Q800 1772 2300 1760T3040 1780L3044 1802Q2300 1790 800 1804T-1800 1782Z" fill="#3c9b6b"/>`;
    for (let i = 0; i < 70; i++) s += `<ellipse cx="${K.f(K.rr(r, -1700, 3000))}" cy="${K.f(K.rr(r, 1830, 2400))}" rx="${K.f(K.rr(r, 18, 70))}" ry="${K.f(K.rr(r, 5, 12))}" fill="#8f3a24" opacity=".6"/>`;
    return s;
  }

  function station() {
    const x = 1880;
    return K.svg(0, 0, 10, 10, `
      <g transform="translate(${x} 1745)">
        <rect x="0" y="-14" width="880" height="24" fill="#c9a77a"/><rect x="0" y="10" width="880" height="16" fill="#8d6b4a"/>
        <rect x="40" y="-210" width="16" height="200" fill="#6b4a33"/><rect x="430" y="-210" width="16" height="200" fill="#6b4a33"/><rect x="820" y="-210" width="16" height="200" fill="#6b4a33"/>
        <path d="M-30 -210L440 -296L910 -210Z" fill="#b54a2c"/><path d="M-30 -210H910V-192H-30Z" fill="#7b2f1f"/>
      </g>`)
      + K.act('train', x + 30, 1610, 720, 136, `
        <g><rect x="240" y="14" width="210" height="96" rx="12" fill="#2f7a59"/><rect x="480" y="14" width="210" height="96" rx="12" fill="#2f7a59"/>
        <g fill="#f2e7c4"><rect x="254" y="30" width="46" height="40" rx="5"/><rect x="322" y="30" width="46" height="40" rx="5"/><rect x="390" y="30" width="46" height="40" rx="5"/><rect x="494" y="30" width="46" height="40" rx="5"/><rect x="562" y="30" width="46" height="40" rx="5"/><rect x="630" y="30" width="46" height="40" rx="5"/></g>
        <rect x="20" y="30" width="196" height="80" rx="14" fill="#e0a437"/><rect x="40" y="0" width="86" height="46" rx="8" fill="#c2502f"/><rect x="154" y="-6" width="26" height="42" fill="#3a2a22"/>
        <g fill="#2a2230"><circle cx="66" cy="118" r="17"/><circle cx="170" cy="118" r="17"/><circle cx="290" cy="118" r="17"/><circle cx="400" cy="118" r="17"/><circle cx="530" cy="118" r="17"/><circle cx="640" cy="118" r="17"/></g></g>`);
  }

  function segment(i) {
    return K.act(`seg${i}`, SEG_X0 + i * SEG_W, GROUND - 76, SEG_W + 2, 330, `
      <g class="cables" style="opacity:0"><path d="M30 0V-1400M212 0V-1400" stroke="#f2b544" stroke-width="3.5"/></g>
      <rect x="0" y="76" width="${SEG_W + 2}" height="16" fill="url(#deck)"/><rect x="0" y="92" width="${SEG_W + 2}" height="9" fill="#46515a"/>
      <path d="M0 8H${SEG_W + 2}M0 40H${SEG_W + 2}" stroke="#a4afb8" stroke-width="7"/>
      <path d="M6 8V76M122 8V76M234 8V76" stroke="#6f7b85" stroke-width="7"/>
      <path d="M26 100V330M214 100V330M26 240L214 110M214 240L26 110" stroke="#59646d" stroke-width="10" fill="none"/>`);
  }

  function town() {
    const lamp = (x) => `<rect x="${x}" y="1520" width="9" height="226" fill="#2a2230"/><circle cx="${x + 4}" cy="1516" r="20" fill="#ffe08a"/>`;
    const b = [
      { x: -80, w: 430, h: 470, c: '#d97c4a', rf: '#7b2f1f', n: 'Hotel', win: [3, 4] },
      { x: 400, w: 330, h: 330, c: '#e7b966', rf: '#a6562f', n: 'Agencia', win: [2, 2] },
      { x: 780, w: 300, h: 390, c: '#6fa8a2', rf: '#2f5d5a', n: 'Guías', win: [2, 3] },
      { x: 1130, w: 400, h: 340, c: '#c9665a', rf: '#6e2d2d', n: 'Restaurante', win: [3, 2] },
    ];
    let html = '', st = '';
    b.forEach((a, k) => {
      const top = GROUND - a.h;
      st += `<rect x="${a.x}" y="${top}" width="${a.w}" height="${a.h}" fill="${a.c}"/><path d="M${a.x - 22} ${top}L${a.x + a.w / 2} ${top - 74}L${a.x + a.w + 22} ${top}Z" fill="${a.rf}"/>`;
      st += `<rect x="${a.x + 26}" y="${top + 16}" width="${a.w - 52}" height="56" rx="7" fill="#fff4dc"/><text x="${a.x + a.w / 2}" y="${top + 58}" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="42" letter-spacing="2" fill="#16263d">${a.n.toUpperCase()}</text>`;
      let lit = '', dark = '';
      const [cols, rows] = a.win, gw = (a.w - 60) / cols;
      for (let c = 0; c < cols; c++) for (let w = 0; w < rows; w++) {
        const wx = a.x + 30 + c * gw + gw * 0.16, wy = top + 96 + w * 88, ww = gw * 0.68;
        dark += `<rect x="${K.f(wx)}" y="${wy}" width="${K.f(ww)}" height="62" rx="5" fill="#26324b"/>`;
        lit += `<rect x="${K.f(wx)}" y="${wy}" width="${K.f(ww)}" height="62" rx="5" fill="#ffe08a"/>`;
      }
      st += dark;
      html += K.act(`lit${k}`, 0, 0, 10, 10, lit);
    });
    st += lamp(372) + lamp(760) + lamp(1100);
    return K.svg(0, 0, 10, 10, st) + html;
  }

  const crates = () => {
    let s = '';
    for (let i = 0; i < N_SEG; i++) s += K.act(`stack${i}`, 2590 + (i % 4) * 8 + (i >= 8 ? 40 : 0), 1716 - (i % 8) * 17 - (i >= 8 ? 0 : 0), 300, 18, `<rect width="300" height="15" rx="3" fill="url(#deck)"/><rect y="11" width="300" height="4" fill="#46515a"/>`);
    return s;
  };

  function workers() {
    const r = K.rng(61);
    let s = '';
    [2720, 2960, 3160, 3280].forEach((x) => { s += K.person(x, GROUND, 160, '#f28c28', r); s += `<path d="M${x - 15} ${GROUND - 148}a16 15 0 0 1 32 0z" fill="#f7d13d"/>`; });
    return s;
  }

  function sky() {
    const r = K.rng(99);
    let c = '';
    for (let i = 0; i < 16; i++) c += K.cloud(K.rr(r, 3700, 5700), K.rr(r, -640, 240), K.rr(r, 420, 900), '#7a8bad', '#4b5c82', r);
    for (let i = 0; i < 9; i++) c += K.cloud(K.rr(r, 3900, 5400), K.rr(r, -760, -340), K.rr(r, 380, 700), '#a7b4cf', '#7a8bad', r);
    return K.act('storm', 0, 0, 10, 10, c, 'static');
  }

  VJ.region({
    id: 'iguazu', x: PIN.iguazu[0] - 3300 * 0.125, y: PIN.iguazu[1] - 1500 * 0.125, s: 0.125, px: 3300, py: 1500,
    layers: [{ name: 'far', k: 0.14 }, { name: 'mid', k: 0.07 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #16203c 0, #2d4670 1400px, #6aa6c8 2600px, #bfe2e6 3300px, #f6e8c4 4000px, #f6e8c4 100%)',
    bgBox: [-5000, -2600, 18000, 8000],
    fgK: -0.13,
    build() {
      const r = K.rng(44);
      let fg = '';
      for (let x = -1400; x < 8400; x += K.rr(r, 420, 720)) {
        const y = 2180 + K.rr(r, -30, 40);
        fg += K.fern(x, y, K.rr(r, 340, 500), -112 + K.rr(r, -18, 16), '#0f3a30', r) + K.fern(x + 80, y, K.rr(r, 300, 460), -60 + K.rr(r, -18, 16), '#17574a', r);
      }
      let segs = '';
      for (let i = 0; i < N_SEG; i++) segs += segment(i);
      const mists = [[4700, 1760, 720], [5300, 1790, 860], [5950, 1770, 960], [6600, 1780, 800], [7200, 1760, 700], [5600, 1610, 620]].map(([x, y, s2], i) => `<div class="mist" style="left:${x - s2 / 2}px;top:${y - s2 / 2}px;width:${s2}px;height:${s2}px;animation-delay:${-i * 1.1}s"></div>`).join('');

      return {
        far: far(),
        mid: mid() + sky(),
        fg: K.svg(0, 0, 10, 10, fg),
        main:
          falls() + mists
          + K.svg(0, 0, 10, 10, ground())
          + town() + station()
          + K.act('i-river', -2000, 1860, 11000, 1100, `<rect width="11000" height="1100" fill="url(#riverG)"/><g fill="#7fc4c6" opacity=".55">${[...Array(46)].map((_, i) => `<rect x="${(i * 311) % 10800}" y="${24 + (i * 47) % 300}" width="${120 + (i * 37) % 200}" height="6" rx="3"/>`).join('')}</g>`)
          + crates()
          + K.act('i-work', 0, 0, 10, 10, workers(), 'static')
          + K.act('i-flood', -2000, 2900, 11000, 1200, `<defs>${K.grad('flood', [[0, '#a07a4f', 0.96], [1, '#5f4a33', 1]])}</defs><path d="M0 34Q300 -8 600 34T1200 34T1800 34T2400 34T3000 34T3600 34T4200 34T4800 34T5400 34T6000 34T6600 34T7200 34T7800 34T8400 34T9000 34T9600 34T10200 34T10800 34V1200H0Z" fill="url(#flood)"/>`)
          + segs
          + K.act('i-barrier', 3700, GROUND - 390, 460, 400, `
              <rect x="30" y="20" width="22" height="370" fill="#5d4633"/><rect x="408" y="20" width="22" height="370" fill="#5d4633"/>
              <rect x="0" y="0" width="460" height="238" rx="12" fill="#fff6e2" stroke="#c2502f" stroke-width="9"/>
              <rect y="262" width="460" height="42" fill="#f7c544"/><g fill="#16263d">${[...Array(7)].map((_, i) => `<path d="M${i * 70} 262h34l-30 42h-34z"/>`).join('')}</g>
              <text x="230" y="62" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="50" fill="#c2502f" letter-spacing="1.5">CIRCUITO CERRADO</text>
              <text x="230" y="112" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="35" fill="#16263d">GARGANTA DEL DIABLO</text>
              <text x="230" y="176" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="52" fill="#16263d">40 días</text>
              <text x="230" y="216" text-anchor="middle" font-family="Figtree" font-weight="600" font-size="23" fill="#3d4c63">mínimo · desde el 3 de agosto</text>`)
          + K.act('i-flags', 0, 0, 10, 10, flags(), 'static')
          + K.act('i-rings', 2500, 180, 1600, 800, `
              <circle cx="380" cy="400" r="270" fill="#2f7a59" opacity=".88"/><circle cx="800" cy="400" r="270" fill="#c2502f" opacity=".85"/><circle cx="1220" cy="400" r="270" fill="#e0a437" opacity=".9"/>`)

          /* Textos */
          + K.say('i-llegada', 2340, 830, 1100, `<p class="k">Parque Nacional Iguazú</p><p class="h1">El momento más esperado del viaje</p>`)
          + K.hot('i-llegada', 4520, 1130, 'jerarquia', 'Jerarquía 5')
          + K.bub('i-cierre', 3190, 1240, '¿Cerrado? ¡Pero si vine por esto!', 'r', 340)
          + K.say('i-cierre', 4190, 1120, 410, `<p class="k">Agosto de 2026</p><p class="h3">Un cierre preventivo y temporal</p>`, 'scrap')
          + K.hot('i-cierre', 4240, 1400, 'cierre', 'Qué se decidió')
          + K.say('i-porque', 3440, 770, 2520, `<p class="h1">¿Por qué cerrar uno de los atractivos más importantes del país <em class="mark">antes</em> de que ocurra una inundación?</p>`, 'center plate')
          + K.say('i-2023', 3420, 770, 1100, `<p class="k">Tenemos que retroceder</p><p class="h0">Octubre de 2023</p>`, 'light')
          + K.say('i-2023', 4630, 770, 900, `<p class="num"><span id="n79">0</span> tramos</p><p class="p">de pasarelas arrastrados por una crecida. El circuito permaneció cerrado durante <em class="mark">casi nueve meses</em>.</p>`, 'light')
          + K.say('i-2026', 2900, 720, 1250, `<p class="k">Por eso, en 2026, una decisión diferente</p><p class="h0">Anticiparse</p>`)
          + K.say('i-2026', 4130, 720, 720, `<p class="p">En lugar de esperar a que el agua provocara daños, se decidió <em class="mark">desmontar y resguardar</em> parte de la infraestructura.</p><p class="num md"><span id="n1100">0</span> m</p><p class="p sm">de pasarelas metálicas: pisos y barandas.</p>`)
          + K.say('i-abierto', 1700, 640, 1800, `<p class="k">Lo que la noticia no decía</p><p class="h1">El resto del parque sigue funcionando</p>`, 'z125')
          + K.hot('i-abierto', 5060, 1090, 'c-superior', 'Circuito Superior')
          + K.hot('i-abierto', 4380, 1470, 'c-inferior', 'Circuito Inferior')
          + K.hot('i-abierto', 3020, 1400, 'c-verde', 'Sendero Verde')
          + K.hot('i-abierto', 1500, 1400, 'c-macuco', 'Sendero Macuco')
          + K.hot('i-abierto', 2250, 1390, 'c-tren', 'Tren Ecológico de la Selva')

          + K.say('tema', 2300, 880, 2000, `<p class="k center">El tema central de la investigación</p><p class="h2 center">La relación entre el turismo receptivo, el cambio climático y la capacidad de adaptación de los destinos</p>`, 'center')
          + `<div class="say ring-l light" data-b="tema" style="left:2650px;top:500px;width:460px"><button class="term-big" data-pop="receptivo">Turismo receptivo</button></div>`
          + `<div class="say ring-l light" data-b="tema" style="left:3070px;top:500px;width:460px"><span class="term-big">Cambio climático</span></div>`
          + `<div class="say ring-l light" data-b="tema" style="left:3490px;top:500px;width:460px"><span class="term-big">Capacidad de adaptación</span></div>`

          /* El Niño */
          + K.say('n-sky', 2240, -780, 1320, `<p class="k">Durante 2026, las proyecciones advertían</p><p class="h0">El Niño</p><p class="p">Es un fenómeno climático natural que modifica los patrones de temperatura y precipitaciones. Puede intensificar las lluvias en determinadas regiones y afectar actividades que dependen de las condiciones ambientales.</p><p class="h2">Y el turismo es una de ellas.</p>`, 'light')
          + K.hot('n-sky', 2260, 60, 'enos', 'ENOS: El Niño-Oscilación del Sur')
          + K.act('gauge', 2300, -1820, 720, 460, `
              <path d="M60 400A300 300 0 0 1 660 400" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="58" stroke-linecap="round"/>
              <path id="gauge-arc" d="M60 400A300 300 0 0 1 660 400" pathLength="100" fill="none" stroke="#f2b544" stroke-width="58" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"/>`)
          + K.say('n-dato', 2380, -1570, 560, `<p class="num center"><span id="n81">0</span> %</p>`, 'light center z125')
          + K.say('n-dato', 2240, -1280, 880, `<p class="p center">Probabilidad, según la NOAA, de que alcance una intensidad <em class="mark">muy fuerte</em> entre octubre y diciembre de 2026.</p>`, 'light center')
          + K.act('neaMap', 3070, -1860, 760, 840, `<g transform="scale(1.32) translate(-1040 -40)"><path d="${G.ar}" fill="#f4e7ca" opacity=".95"/></g><g id="nea" transform="scale(1.32) translate(-1040 -40)"><ellipse cx="1500" cy="360" rx="165" ry="255" fill="#3f83c8" opacity=".55"/><ellipse cx="1500" cy="360" rx="110" ry="190" fill="#1f5fa6" opacity=".55"/></g>`)
          + K.say('n-dato', 3990, -1790, 780, `<p class="k">Mayor intensidad</p><p class="h3">De fines de 2026 a comienzos de 2027</p><p class="p sm">Sus efectos podrían extenderse hasta el otoño de 2027.</p><p class="k" style="margin-top:34px">Más riesgo en</p><p class="p sm">El noreste argentino y sectores del sur de Brasil: lluvias intensas, crecidas e inundaciones, con posibles consecuencias sobre la infraestructura vial, energética y turística.</p>`, 'light')
          + K.hot('n-dato', 3160, -1040, 'nino-regiones', 'Más humedad, más vigilancia')

          /* La duda */
          + K.bub('duda', -760, 1010, 'Sólo veo que está cerrado… ¿cancelo?', 'l', 400)
          + K.say('duda', 40, 700, 1090, `<p class="k">Pensemos en nuestra turista</p><p class="h1">Esa duda puede transformarse en una cancelación</p><p class="p">Ella no sabe que el resto de los circuitos continúa funcionando. Solamente ve una noticia.</p>`, 'light')
          + K.say('cadena', 40, 800, 1500, `<p class="k center">Si cancela</p>`, 'light center')
          + K.say('cadena', -60, 900, 460, `<p class="hand center">el hotel pierde<br>una reserva</p>`, 'light center')
          + K.say('cadena', 370, 980, 400, `<p class="hand center">la agencia pierde<br>una venta</p>`, 'light center')
          + K.say('cadena', 730, 900, 400, `<p class="hand center">el guía pierde<br>una excursión</p>`, 'light center')
          + K.say('cadena', 1130, 980, 400, `<p class="hand center">el restaurante pierde<br>un cliente</p>`, 'light center')
          + K.say('lluvia', -200, 500, 2000, `<p class="k center">La prevención es necesaria, pero debe estar acompañada por una buena gestión turística</p><p class="h1 center">El verdadero desafío no es evitar que llueva.</p><p class="h1 center"><em class="mark">Es decidir cómo actuar frente a esa lluvia.</em></p>`, 'light center z125'),
      };
    },
  });

  function flags() {
    let s = '';
    [[5060, 1190], [4380, 1570], [3050, 1500], [1500, 1500], [2300, 1490]].forEach(([x, y]) => {
      s += `<g class="open-flag" transform="translate(${x + 16} ${y})"><path d="M0 0V-92" stroke="#16263d" stroke-width="6"/><path d="M0 -92L88 -70L0 -46Z" fill="#3c9b6b"/></g>`;
    });
    return s;
  }

  /* ---------- paradas ---------- */
  const segs = [...Array(N_SEG).keys()];
  VJ.beat({ id: 'i-llegada', part: 1, r: 'iguazu', cam: [3300, 1430, 2200], travel: 1.5, hold: 1.5, val: { x: 2420, x2: 3280, y: GROUND, s: 0.42, pose: 'stand', expr: 'joy', look: [0.7, -0.2], tele: true },
    anim(tl, t) { gsap.set(['#i-barrier'], { y: -1800 }); gsap.set('#i-rings', { autoAlpha: 0 }); gsap.set('#i-work', { autoAlpha: 0 }); gsap.set(segs.map((i) => `#stack${i}`), { autoAlpha: 0 }); gsap.set('#i-flags', { autoAlpha: 0 }); tl.to('#train', { x: -260, duration: 1.2, ease: 'sine.inOut' }, t); } });

  VJ.beat({ id: 'i-cierre', part: 1, r: 'iguazu', cam: [3890, 1490, 1500], travel: 0.9, hold: 1.25, val: { x: 3540, y: GROUND, s: 0.42, pose: 'point', expr: 'oh', look: [0.9, -0.4] },
    anim(tl, t) { tl.to('#i-barrier', { y: 0, duration: 0.42, ease: 'bounce.out' }, t - 0.5); } });

  VJ.beat({ id: 'i-porque', part: 1, r: 'iguazu', cam: [4700, 1400, 2900], travel: 1, hold: 1, val: { x: 3540, y: GROUND, s: 0.42, pose: 'think', expr: 'think', look: [0.8, -0.7] } });

  VJ.beat({ id: 'i-2023', part: 1, r: 'iguazu', cam: [4560, 1400, 2500], travel: 1, hold: 1.7, tint: 0.55, rain: 0.9, val: false,
    anim(tl, t, e, b) {
      tl.to('#i-flood', { y: -1272, duration: 0.8, ease: 'sine.inOut' }, b.t0 + 0.5);
      tl.to('#i-barrier', { autoAlpha: 0, duration: 0.2 }, b.t0 + 0.3);
      segs.forEach((i) => tl.to(`#seg${i}`, { x: 1500 + i * 90, y: 40 + (i % 3) * 46, rotation: (i % 2 ? 1 : -1) * (10 + i * 2.5), duration: 1, ease: 'power1.in' }, t + 0.05 + i * 0.03));
      K.count(tl, '#n79', 0, 79, t + 0.1, 0.8);
    } });

  VJ.beat({ id: 'i-2026', part: 1, r: 'iguazu', cam: [3720, 1300, 2500], travel: 1.2, hold: 1.8, val: { x: 2500, y: GROUND, s: 0.42, pose: 'point', expr: 'smile', look: [0.9, -0.5], tele: true },
    anim(tl, t, e, b) {
      tl.to('#i-flood', { y: 0, duration: 0.6, ease: 'sine.inOut' }, b.t0);
      segs.forEach((i) => tl.to(`#seg${i}`, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.3 }, b.t0 + 0.4));
      tl.to('#i-work', { autoAlpha: 1, duration: 0.2 }, t);
      tl.set('.cables', { opacity: 1 }, t + 0.1);
      [...segs].reverse().forEach((i, k) => {
        const at = t + 0.22 + k * 0.08;
        tl.to(`#seg${i}`, { y: -2600, duration: 0.3, ease: 'power1.in' }, at);
        tl.set(`#seg${i}`, { autoAlpha: 0 }, at + 0.31);
        tl.to(`#stack${i}`, { autoAlpha: 1, duration: 0.05 }, at + 0.22);
      });
      K.count(tl, '#n1100', 0, 1100, t + 0.25, 1);
      tl.to('#i-barrier', { autoAlpha: 1, duration: 0.15 }, t);
    } });

  VJ.beat({ id: 'i-abierto', part: 1, r: 'iguazu', cam: [3400, 1320, 3900], travel: 1, hold: 1.5, val: { x: 2800, y: GROUND, s: 0.42, pose: 'wave', gest: 'wave', expr: 'joy', look: [0.5, -0.5] },
    anim(tl, t) { tl.to('#i-flags', { autoAlpha: 1, duration: 0.25 }, t); tl.to('#i-work', { autoAlpha: 0, duration: 0.2 }, t); tl.to('#i-rings', { autoAlpha: 0 }, t); } });

  VJ.beat({ id: 'tema', part: 1, r: 'iguazu', cam: [3300, 780, 2600], travel: 1, hold: 1.2, drift: 0.03, val: { x: 2800, y: GROUND, s: 0.42, pose: 'pointUp', expr: 'smile', look: [0.3, -1] },
    anim(tl, t) { gsap.set('#i-rings', { scale: 0.4, transformOrigin: '50% 50%' }); tl.to('#i-rings', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, t); tl.to('#i-rings', { autoAlpha: 0, duration: 0.2 }, t + 1.02); } });

  VJ.beat({ id: 'n-sky', part: 1, r: 'iguazu', cam: [3400, -320, 2600], travel: 1.1, hold: 1.5, tint: 0.1, rain: 0.25, val: false,
    anim(tl, t) { gsap.set('#storm', { transformOrigin: '4500px 0px' }); tl.fromTo('#storm', { scale: 0.72 }, { scale: 1.1, duration: 1.5, immediateRender: false }, t); } });

  VJ.beat({ id: 'n-dato', part: 1, r: 'iguazu', cam: [3500, -1270, 2750], travel: 1, hold: 1.6, tint: 0.08, rain: 0.5, val: false,
    anim(tl, t, e, b) {
      gsap.set('#gauge,#neaMap', { autoAlpha: 0 });
      tl.to('#gauge,#neaMap', { autoAlpha: 1, duration: 0.3 }, b.t0 + 0.5);
      tl.to('#gauge,#neaMap', { autoAlpha: 0, duration: 0.2 }, e - 0.1);
      tl.to('#gauge-arc', { strokeDashoffset: 19, duration: 0.65, ease: 'power1.out' }, t + 0.1);
      K.count(tl, '#n81', 0, 81, t + 0.1, 0.65);
      gsap.set('#nea', { transformOrigin: '1500px 360px', opacity: 0 });
      tl.to('#nea', { opacity: 1, duration: 0.4 }, t + 0.6);
    } });

  VJ.beat({ id: 'duda', part: 1, r: 'iguazu', cam: [120, 1230, 2200], travel: 1.3, hold: 1.3, tint: 0.3, rain: 0.35, val: { x: -580, y: GROUND, s: 0.42, pose: 'phone', expr: 'worry', look: [0.6, 0.5], tele: true } });

  VJ.beat({ id: 'cadena', part: 1, r: 'iguazu', cam: [760, 1230, 2300], travel: 0.8, hold: 1.5, tint: 0.34, rain: 0.45, val: { x: -360, y: GROUND, s: 0.42, pose: 'strap', expr: 'sad', look: [0.9, -0.2] },
    anim(tl, t) { [0, 1, 2, 3].forEach((k) => tl.to(`#lit${k}`, { autoAlpha: 0, duration: 0.12 }, t + 0.25 + k * 0.24)); } });

  VJ.beat({ id: 'lluvia', part: 1, r: 'iguazu', cam: [780, 1020, 2800], travel: 0.9, hold: 1.4, tint: 0.48, rain: 0.95, val: { x: -360, y: GROUND, s: 0.42, pose: 'think', expr: 'think', look: [0.8, -0.9] } });

  VJ.beat({ id: 'conexion', part: 1, r: 'atlas', cam: [1300, 800, 2640], travel: 1.4, hold: 1.6, drift: 0.012, val: { x: PIN.iguazu[0] + 6, y: PIN.iguazu[1] + 36, s: 0.13, pose: 'stand', expr: 'smile', look: [0, 0], tele: true },
    anim(tl, t, e) { tl.to('#links', { autoAlpha: 1, duration: 0.3 }, t + 0.1); tl.to('#links', { autoAlpha: 0, duration: 0.2 }, e - 0.1); } });
})();
