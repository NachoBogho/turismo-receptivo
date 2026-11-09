/* ==========================================================================
   PARTE 2 · EL EFECTO DOMINÓ: el sistema turístico de Boullón
   Seis piezas en fila; Valeria empuja la primera y el scroll hace caer el resto.
   ========================================================================== */
(function () {
  const K = VJ.K;
  const G = 1500, W = 330, H = 700, X0 = 760, GAP = 580;
  const P = [
    ['atr', 'falls', 'Atractivos', 'Lo que motiva a viajar', '#c2502f'],
    ['dem', 'people', 'Demanda', 'Los turistas', '#e0a437'],
    ['ofe', 'bed', 'Oferta', 'Lo que se ofrece', '#2f7a59'],
    ['pla', 'hotel', 'Planta turística', 'Hoteles, restaurantes, agencias, guías', '#5c97d3'],
    ['inf', 'road', 'Infraestructura', 'Permite acceder y usar los servicios', '#7a6aa8'],
    ['sup', 'gov', 'Superestructura', 'Organismos que regulan y coordinan', '#16263d'],
  ];
  const domX = (i) => X0 + i * GAP;

  VJ.region({
    id: 'sistema', x: 1880, y: 620, s: 0.125, px: 2200, py: 1200,
    layers: [{ name: 'far', k: 0.12 }, { name: 'mid', k: 0.06 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #e7925e 1500px, #f3b777 2100px, #f9d79a 2650px, #fbe9c6 2950px)', bgBox: [-5000, -1500, 16000, 6000],
    build() {
      const r = K.rng(7);
      const sun = `<circle cx="2300" cy="760" r="520" fill="#f7ae5c" opacity=".55"/><circle cx="2300" cy="760" r="380" fill="#f79a4c" opacity=".7"/>`;
      const hills = `<path d="${K.ridge(-1800, 7200, 1330, 34, 150, r, 2200)}" fill="#dc9a5e"/><path d="${K.ridge(-1800, 7200, 1420, 26, 120, r, 2200)}" fill="#c97f4a"/>`;
      let trees = '';
      for (let x = -1600; x < 7000; x += K.rr(r, 240, 560)) trees += K.tree(x, 1500, K.rr(r, 220, 360), ['#8a5a2c', '#a8743a', '#c79654'], r);
      const ground = `<path d="M-2000 2600V${G}H8000V2600Z" fill="#7b3c24"/><path d="M-2000 ${G}H8000V${G + 34}H-2000Z" fill="#a4552f"/>`;
      let dots = '';
      for (let i = 0; i < 70; i++) dots += `<ellipse cx="${K.f(K.rr(r, -1900, 7900))}" cy="${K.f(K.rr(r, G + 60, 2400))}" rx="${K.f(K.rr(r, 20, 70))}" ry="${K.f(K.rr(r, 4, 10))}" fill="#5f2d1b"/>`;

      const dominoes = P.map(([id, ic, name, sub, col], i) => `
        <button id="dom${i}" class="a domino" data-pop="sis-${id}" style="left:${domX(i)}px;top:${G - H}px;width:${W}px;height:${H}px;--c:${col}" aria-label="${name}: ver definición">
          <span class="dm-ic">${K.icon(ic)}</span><span class="dm-line"></span><span class="dm-n">${name}</span><span class="dm-s">${sub}</span><span class="dm-plus">+</span>
        </button>`).join('');

      const lbl = (b, x, html, z = 1) => K.say(b, x, 500, 1100, html, '', z);
      return {
        far: K.svg(0, 0, 10, 10, sun + hills),
        mid: K.svg(0, 0, 10, 10, trees),
        main: K.svg(0, 0, 10, 10, ground + dots) + dominoes
          + K.say('d-intro', 300, 225, 3300, `<p class="k center">Roberto Boullón</p><p class="h1 center">El turismo funciona como un sistema</p><p class="p center" style="margin-inline:auto;max-width:2900px">Componentes relacionados entre sí. Para ella, cancelar parece una decisión individual; para el destino, forma parte de algo mucho más grande.</p>`, 'center plate', 1.2)
          + K.bub('d-intro', 250, 1000, 'Simplemente elijo otro lugar… ¿no?', 'r', 380)
          + K.hot('d-intro', 2720, 1620, 'sistema', 'Sistema turístico')
          + lbl('d-atr', domX(0) + 390, `<p class="k">El atractivo</p><p class="h2">Lo que motiva a viajar: en nuestro caso, la Garganta del Diablo.</p>`)
          + lbl('d-dem', domX(1) + 390, `<p class="k">La demanda</p><p class="h2">Los turistas que desean conocer ese lugar.</p>`)
          + lbl('d-ofe', domX(2) + 980, `<p class="k">La oferta y la planta turística</p><p class="h2">Hoteles, restaurantes, agencias, guías y demás servicios que hacen posible la experiencia.</p>`)
          + lbl('d-inf', domX(4) + 980, `<p class="k">Infraestructura y superestructura</p><p class="h2">Lo que permite acceder a los servicios, y los organismos que regulan y coordinan.</p>`)
          + K.say('d-pregunta', 700, 300, 2500, `<p class="h1 center">Ahora imaginemos que uno de estos componentes deja de funcionar.</p>`, 'center', 1.3)
          + K.say('d-caida', 700, 240, 3400, `<p class="k center" style="color:#16263d">Una especie de efecto dominó</p>`, 'center', 1.6)
          + ['Si un atractivo cierra…', '…puede disminuir la demanda…', '…los hoteles reciben menos huéspedes…', '…y se afectan proveedores y trabajadores.'].map((t, i) => `<div class="say light center" data-b="d-caida" data-delay="${(0.12 + i * 0.34).toFixed(2)}" style="left:${980 + i * 760}px;top:1590px;width:730px"><p class="hand center">${t}</p></div>`).join('')
          + K.say('d-eco', 650, 300, 2500, `<p class="h1 center">El turismo no es solamente una actividad recreativa.</p><p class="h2 center"><em class="mark">También genera empleo e ingresos para las comunidades.</em></p>`, 'center', 1.2),
      };
    },
  });

  const pushV = { s: 0.34, look: [0.9, -0.4] };
  VJ.beat({ id: 'd-intro', part: 2, r: 'sistema', chips: '.domino', cam: [1950, 1030, 3700], travel: 1.5, hold: 1.4, wipe: true, val: { x: 480, y: G + 70, ...pushV, pose: 'strap', expr: 'think', tele: true } });
  VJ.beat({ id: 'd-atr', part: 2, r: 'sistema', cam: [1640, 1040, 2100], travel: 1, hold: 1, val: { x: 590, y: G + 70, ...pushV, pose: 'point', expr: 'smile' } });
  VJ.beat({ id: 'd-dem', part: 2, r: 'sistema', cam: [2220, 1040, 2100], travel: 0.8, hold: 1, val: { x: 1200, y: G + 70, ...pushV, pose: 'point', expr: 'smile' } });
  VJ.beat({ id: 'd-ofe', part: 2, r: 'sistema', cam: [3010, 1040, 2300], travel: 0.8, hold: 1.1, val: { x: 1780, y: G + 70, ...pushV, pose: 'point', expr: 'smile' } });
  VJ.beat({ id: 'd-inf', part: 2, r: 'sistema', cam: [4170, 1040, 2300], travel: 0.8, hold: 1.1, val: { x: 2940, y: G + 70, ...pushV, pose: 'point', expr: 'smile' } });
  VJ.beat({ id: 'd-pregunta', part: 2, r: 'sistema', cam: [1950, 1000, 3300], travel: 1, hold: 0.8, val: { x: 590, y: G + 70, ...pushV, pose: 'think', expr: 'think' } });
  VJ.beat({ id: 'd-caida', part: 2, r: 'sistema', cam: [2200, 1000, 4000], travel: 0.7, hold: 2, val: { x: 610, y: G + 70, ...pushV, pose: 'push', expr: 'oh' },
    anim(tl, t) {
      P.forEach((p, i) => {
        gsap.set(`#dom${i}`, { transformOrigin: '100% 100%' });
        const last = i === P.length - 1;
        tl.to(`#dom${i}`, { rotation: last ? 88 : 33, duration: last ? 0.28 : 0.36, ease: last ? 'power2.in' : 'power1.in' }, t + 0.12 + i * 0.27);
      });
    } });
  VJ.beat({ id: 'd-eco', part: 2, r: 'sistema', cam: [1950, 1000, 3400], travel: 0.8, hold: 1.2, val: { x: 500, y: G + 70, ...pushV, pose: 'strap', expr: 'sad', look: [0.8, 0] } });
})();
