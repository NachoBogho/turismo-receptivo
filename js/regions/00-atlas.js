/* ==========================================================================
   ATLAS: el mapa general del mundo. Punto de partida y de regreso.
   Las coordenadas de esta región son las del mundo (s = 1).
   ========================================================================== */
(function () {
  const K = VJ.K, P = VJ.P, G = VJ.GEO;
  const PIN = VJ.PIN = {
    iguazu: P(-54.44, -25.69), entre: P(-58.14, -32.22), chalten: P(-72.89, -49.33),
    ushuaia: P(-68.3, -54.8), tucuman: P(-65.2, -26.83), calafate: P(-72.27, -50.34),
  };
  const line = (pts) => pts.map((p, i) => { const [x, y] = P(p[0], p[1]); return `${i ? 'L' : 'M'}${K.f(x)} ${K.f(y)}`; }).join('');

  function map() {
    const r = K.rng(21);
    let grid = '';
    for (let lon = -100; lon <= -25; lon += 5) { const [x] = P(lon, -40); grid += `<path d="M${K.f(x)} -400V2000"/>`; }
    for (let lat = -5; lat >= -70; lat -= 5) { const [, y] = P(-60, lat); grid += `<path d="M-600 ${K.f(y)}H3400"/>`; }

    /* Relieve dibujado sobre el mapa */
    let relief = '';
    for (let lat = -24; lat > -52; lat -= 1.05) {
      const lon = lat > -33 ? -69.4 + Math.sin(lat) * 0.5 : lat > -42 ? -70.8 : -72.1;
      const [x, y] = P(lon + K.rr(r, -0.5, 0.5), lat), h = K.rr(r, 16, 30);
      relief += `<path d="M${K.f(x - h * 0.8)} ${K.f(y)}L${K.f(x)} ${K.f(y - h)}L${K.f(x + h * 0.8)} ${K.f(y)}Z" fill="#b9a587"/><path d="M${K.f(x)} ${K.f(y - h)}L${K.f(x + h * 0.8)} ${K.f(y)}L${K.f(x + h * 0.12)} ${K.f(y)}Z" fill="#94805f"/><path d="M${K.f(x - h * 0.27)} ${K.f(y - h * 0.66)}L${K.f(x)} ${K.f(y - h)}L${K.f(x + h * 0.27)} ${K.f(y - h * 0.66)}L${K.f(x)} ${K.f(y - h * 0.55)}Z" fill="#fff8ea"/>`;
    }
    const jungle = ['#2f7a59', '#3f9a6f', '#74c08f'];
    [[-54.6, -26.3], [-54.1, -26.6], [-55, -27], [-54.5, -27.2], [-53.9, -26], [-55.4, -27.2]].forEach(([a, b]) => { const [x, y] = P(a, b); relief += K.canopy(x, y, 16, jungle, r); });
    for (let i = 0; i < 60; i++) {
      const lat = K.rr(r, -41, -31), lon = K.rr(r, -64, -58.5), [x, y] = P(lon, lat);
      relief += `<path d="M${K.f(x)} ${K.f(y)}h${K.f(K.rr(r, 8, 18))}" stroke="#d6c08d" stroke-width="2" stroke-linecap="round"/>`;
    }
    for (let i = 0; i < 50; i++) {
      const lat = K.rr(r, -50, -41.5), lon = K.rr(r, -70, -66), [x, y] = P(lon, lat);
      relief += `<circle cx="${K.f(x)}" cy="${K.f(y)}" r="${K.f(K.rr(r, 1.4, 3.2))}" fill="#c9b184"/>`;
    }

    const parana = [[-54.6, -25.6], [-54.9, -26.8], [-55.9, -27.4], [-57.2, -27.3], [-58.8, -27.5], [-59.5, -29.5], [-60.7, -31.6], [-60.6, -32.9], [-59.3, -33.7], [-58.5, -34.1]];
    const uru = [[-53.8, -27.2], [-55.4, -28.2], [-56.5, -29], [-57.1, -29.8], [-57.9, -30.6], [-58.05, -31.4], [-58.15, -32.3], [-58.3, -33.1], [-58.4, -34.1]];
    const parag = [[-57.6, -24.2], [-57.7, -25.3], [-58.6, -27.3]];
    const river = (pts, w = 5) => `<path d="${line(pts)}" fill="none" stroke="#5aa7bd" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;

    /* Ballena, barco y rosa de los vientos: oficio de mapa antiguo */
    const whale = `<g transform="translate(1880 1180) scale(1.15)" opacity=".75"><path d="M0 0C20 -46 110 -52 160 -12C176 -24 196 -36 206 -32C204 -18 196 -6 184 0C192 8 198 20 196 30C184 30 168 18 156 8C120 44 30 50 0 0Z" fill="#7fb4bf"/><circle cx="34" cy="-12" r="4" fill="#123a4a"/><path d="M10 4C40 28 90 26 126 10" stroke="#123a4a" stroke-width="3" fill="none"/><path d="M60 -48c-8-18-22-20-26-30M60 -48c8-18 22-20 28-28" stroke="#cbe5ea" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
    const rose = (() => {
      let p = '';
      for (let i = 0; i < 8; i++) { const L = i % 2 ? 62 : 118; p += `<path d="M0 ${-L}L${i % 2 ? 11 : 17} 0L0 0Z" fill="#f6ecd6" transform="rotate(${i * 45})"/><path d="M0 ${-L}L${i % 2 ? -11 : -17} 0L0 0Z" fill="#e0a437" transform="rotate(${i * 45})"/>`; }
      return `<g transform="translate(2320 1370)"><circle r="136" fill="none" stroke="#f6ecd6" stroke-width="2.5" opacity=".65"/><circle r="124" fill="none" stroke="#f6ecd6" stroke-width="1.2" stroke-dasharray="3 9" opacity=".65"/>${p}<text y="-146" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="42" fill="#f6ecd6">N</text></g>`;
    })();

    return K.svg(-600, -400, 3800, 2400, `
      <g transform="translate(600 400)">
        <g stroke="#f6ecd6" stroke-width="1.3" opacity=".13" fill="none">${grid}</g>
        <path d="${[G.cl, G.br, G.bo, G.py, G.uy, G.pe].join('')}" fill="#25666f"/>
        <path d="${[G.cl, G.br, G.bo, G.py, G.uy, G.pe].join('')}" fill="none" stroke="#3c8086" stroke-width="2"/>
        <path d="${G.ar}" fill="#0b2a36" transform="translate(9 12)" opacity=".5"/>
        <path d="${G.ar}" fill="#f4e7ca" stroke="#c9a66b" stroke-width="3.5" stroke-linejoin="round"/>
        ${relief}${river(parana, 6)}${river(uru, 5)}${river(parag, 4)}
        ${whale}${rose}
      </g>`);
  }

  const pin = (id, beat, xy, ico, name, side = 'r') => `
    <button class="pin pin-${side}" data-jump="${beat}" id="pin-${id}" style="left:${K.f(xy[0])}px;top:${K.f(xy[1])}px" aria-label="Ir a ${name}">
      <em></em><b>${K.icon(ico)}</b><span>${name}</span>
    </button>`;

  VJ.region({
    id: 'atlas', x: 0, y: 0, s: 1, q: 2, base: true,
    layers: [{ name: 'main', k: 0 }],
    bg: 'radial-gradient(1500px 1200px at 50% 45%, #1b5362 0%, #123a4a 62%, #0d2c3a 100%)', bgBox: [-6000, -5000, 14600, 11600],
    build() {
      const ig = PIN.iguazu, en = PIN.entre, ch = PIN.chalten, us = PIN.ushuaia;
      const route = `M${ig[0]} ${ig[1]}L${en[0]} ${en[1]}L${ch[0]} ${ch[1]}L${us[0]} ${us[1]}`;
      return {
        main: map()
          + K.act('route-art', 0, 0, 2600, 1600, `<path d="${route}" fill="none" stroke="#c2502f" stroke-width="5" stroke-dasharray="3 15" stroke-linecap="round"/><path id="route-live" d="${route}" pathLength="1000" fill="none" stroke="#c2502f" stroke-width="7" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/>`, 'static')
          + pin('iguazu', 'i-llegada', ig, 'falls', 'Iguazú')
          + pin('entre', 'e-llegada', en, 'drop', 'Entre Ríos')
          + pin('chalten', 'c-llegada', ch, 'map', 'El Chaltén', 'l')
          + pin('ushuaia', 'u-llegada', us, 'ship', 'Ushuaia')

          /* Portada */
          + K.say('cover', 90, 300, 860, `
              <p class="k">Seminario I · Turismo receptivo y cambio climático</p>
              <h1 class="h0">Cuando el viaje cambia de rumbo</h1>
              <p class="p sm">Licenciatura en Turismo · Universidad Abierta Interamericana · 2026<br>Cornejo, Gottero, Costa, Contreras y Gonzalez</p>`, 'light z90')

          /* Objetos del viaje, apoyados sobre el océano */
          + K.div('passport', 1700, 375, `
              <div class="pp-page">
                <img src="assets/img/valeria-ref.jpg" alt="Retrato de Valeria" loading="eager">
                <p class="pp-l">Pasaporte de viaje</p><p class="pp-name">Valeria</p>
                <p class="pp-l">Motivo</p><p class="pp-v">Vacaciones, después de trabajar todo el año</p>
              </div>
              <div class="pp-page pp-right">
                <div class="stamp s1" id="st1"><b>Destino</b>Argentina</div>
                <div class="stamp s2" id="st2"><b>Reservado</b>Hotel</div>
                <div class="stamp s3" id="st3"><b>Comprados</b>Pasajes</div>
              </div>`)
          + K.div('ticket', 1755, 850, `
              <div class="tk-main"><p class="pp-l">Lo que más espera del viaje</p><p class="tk-big">Garganta del Diablo</p><p class="pp-v">Cataratas del Iguazú</p></div>
              <div class="tk-stub"><p class="pp-l">Viajera</p><p class="tk-mid">Valeria</p></div>
              <div class="tk-cancel" id="tk-cancel">¿Cancelar?</div>`)
          + K.div('phone', 2030, 620, `
              <div class="ph-screen">
                <p class="ph-time">unos días antes de viajar…</p>
                <div class="ph-note" id="ph-note"><b>Noticia de último momento</b>El circuito Garganta del Diablo va a permanecer cerrado durante 40 días.</div>
              </div>`, 'phone')

          + K.say('pasaporte', 1436, 372, 240, `<p class="k">Imaginen esta situación</p><p class="h2">Una persona organiza, por fin, sus vacaciones.</p>`, 'plate z60')
          + K.say('noticia', 1490, 760, 480, `<p class="k">Unos días antes de viajar</p><p class="h2">Recibe una noticia.</p>`, 'scrap z60')
          + K.say('pregunta', 1400, 640, 600, `
              <p class="k">Tu turno</p><p class="h1">¿Qué harían ustedes?</p>
              <div class="poll" role="group" aria-label="Elegí una opción">
                <button data-poll="0">¿Cancelarían el viaje?</button>
                <button data-poll="1">¿Buscarían otro destino?</button>
                <button data-poll="2">¿Intentarían averiguar qué está pasando?</button>
              </div>
              <p class="poll-out hand" id="poll-out">&nbsp;</p>`, 'scrap tilt z50 pointer')
          + K.say('caso-real', 1400, 700, 600, `<p class="k">Una turista ficticia, un caso real</p><p class="h2">En agosto de 2026 se decidió cerrar preventivamente la Garganta del Diablo.</p><p class="p">Administración de Parques Nacionales y concesionaria Iguazú Argentina, ante el riesgo de crecidas extraordinarias del río Iguazú.</p>`, 'scrap z50')

          + K.say('mapa-iguazu', 1800, 190, 580, `<p class="k">Parte 1</p><p class="h1">El viaje que estuvo a punto de cancelarse</p>`, 'light z60')

          /* Conexión entre destinos */
          + K.act('links', 0, 0, 2600, 1600, `<g fill="none" stroke="#e0a437" stroke-width="4" stroke-dasharray="1 12" stroke-linecap="round"><path d="M${ig[0]} ${ig[1]}Q1900 700 ${en[0]} ${en[1]}"/><path d="M${en[0]} ${en[1]}Q1500 1150 ${us[0]} ${us[1]}"/><path d="M${us[0]} ${us[1]}Q900 1400 ${ch[0]} ${ch[1]}"/><path d="M${ch[0]} ${ch[1]}Q1100 700 ${ig[0]} ${ig[1]}"/></g>`, 'static')
          + K.say('conexion', 90, 320, 800, `<p class="k">¿Qué pasa en otros destinos?</p><p class="h1">Problemáticas diferentes, pero conectadas</p><p class="p">Todos dependen de un sistema turístico que necesita funcionar de manera coordinada.</p>`, 'light z90')
          + K.say('conexion', 1770, 500, 520, `<p class="hand">Entre Ríos</p><p class="p sm">Las posibles crecidas amenazan las actividades vinculadas con los ríos.</p>`, 'light', 1.15)
          + K.say('conexion', 170, 1120, 560, `<p class="hand">El Chaltén</p><p class="p sm">La llegada de excursionistas genera presión sobre los servicios urbanos.</p>`, 'light', 1.15)
          + K.say('conexion', 1580, 1290, 560, `<p class="hand">Ushuaia</p><p class="p sm">Los conflictos institucionales del puerto pueden afectar la actividad de cruceros.</p>`, 'light', 1.15)
          + K.hot('conexion', PIN.tucuman[0] - 30, PIN.tucuman[1] - 16, 'ramcc', 'Tucumán: VIII Asamblea RAMCC', 'z75 hot-sm')
          + K.hot('conexion', 2000, 210, 'jerarquia', 'Jerarquía de atractivos', 'z75 hot-sm')

          /* Preguntas sobre el mapa */
          + K.say('ruta-sur', 1660, 720, 780, `<p class="k">Parte 3</p><p class="h1">Lo que el turista no ve</p><p class="p">Los destinos también son el hogar de miles de personas.</p>`, 'light z75')
          + K.say('dimensiones', 90, 300, 830, `<p class="k">Después de recorrer los cuatro destinos</p><p class="h1">¿Estamos preparados?</p><p class="p">¿Qué podría suceder si seguimos gestionando el turismo de la misma manera?</p>`, 'light z90')
          + K.hot('dimensiones', 1740, 380, 'dim-eco', 'Dimensión económica y financiera')
          + K.hot('dimensiones', 1740, 500, 'dim-soc', 'Dimensión social, cultural y psicológica')
          + K.hot('dimensiones', 1740, 620, 'dim-nor', 'Dimensión normativa e institucional')
          + K.hot('dimensiones', 1740, 740, 'dim-gob', 'Dimensión política y de gobernanza')
          + K.say('final-q', 80, 300, 880, `<p class="k">Entonces, la verdadera pregunta es</p><p class="h1">¿Qué tipo de turismo queremos construir para que, cuando aparezcan los desafíos, nuestros destinos estén preparados?</p><p class="p">No podemos controlar el clima, pero sí podemos decidir cómo planificamos, cómo gestionamos y cómo cuidamos nuestros destinos.</p>`, 'light z75')
          + K.say('final', 80, 300, 910, `<p class="h1">El futuro del turismo no depende de que nunca aparezcan problemas, sino de nuestra capacidad para anticiparlos y responder de manera responsable.</p><p class="h0" style="margin-top:40px">Muchas gracias.</p><p class="p sm">Cornejo, Gottero, Costa, Contreras y Gonzalez · Seminario I · UAI · 2026</p>`, 'light z75', )
      };
    },
  });

  /* ---------- paradas del prólogo ---------- */
  VJ.beat({ id: 'cover', part: 0, r: 'atlas', cam: [1300, 800, 2640], hold: 1.3, drift: 0.015, val: { x: 640, y: 1420, s: 0.42, pose: 'wave', gest: 'wave', expr: 'joy', look: [0.6, -0.2] }, anim() { gsap.set('#links', { autoAlpha: 0 }); } });
  VJ.beat({ id: 'pasaporte', part: 0, r: 'atlas', cam: [2130, 670, 1440], travel: 1.3, hold: 1.2, val: { x: 1620, y: 1060, s: 0.34, pose: 'point', expr: 'joy', look: [0.9, -0.5] },
    anim(tl, t) {
      gsap.set(['#st1', '#st2', '#st3'], { scale: 2.1, autoAlpha: 0 });
      gsap.set('#ticket', { x: 70, rotation: 5 });
      ['#st1', '#st2', '#st3'].forEach((s, i) => tl.to(s, { scale: 1, autoAlpha: 1, duration: 0.14, ease: 'power3.in' }, t + 0.14 + i * 0.22));
      tl.to('#ticket', { x: 0, rotation: -2.5, duration: 0.3, ease: 'power2.out' }, t + 0.6);
    } });
  VJ.beat({ id: 'noticia', part: 0, r: 'atlas', cam: [2040, 960, 1400, -2], travel: 1, hold: 1, val: { x: 2520, y: 1320, s: 0.3, f: -1, pose: 'phone', expr: 'oh', look: [0.8, -0.4] },
    anim(tl, t, e, b) {
      gsap.set('#ph-note', { y: -60, autoAlpha: 0 });
      gsap.set('#phone', { y: 1000 });
      tl.to('#phone', { y: 0, duration: 0.6, ease: 'power2.out' }, b.t0 + 0.3);
      tl.to('#ph-note', { y: 0, autoAlpha: 1, duration: 0.25, ease: 'back.out(2)' }, t + 0.1);
      tl.to('#phone', { rotation: 3, duration: 0.05, repeat: 7, yoyo: true }, t + 0.1);
    } });
  VJ.beat({ id: 'pregunta', part: 0, r: 'atlas', cam: [2040, 960, 1400], travel: 0.6, hold: 1.25, val: { x: 2520, y: 1320, s: 0.3, f: -1, pose: 'think', expr: 'worry', look: [0.8, -0.2] },
    anim(tl, t) {
      tl.to('#tk-cancel', { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'back.out(2)' }, t + 0.3);
    } });
  VJ.beat({ id: 'caso-real', part: 0, r: 'atlas', cam: [2040, 960, 1400], travel: 0.6, hold: 1, val: { x: 2520, y: 1320, s: 0.3, f: -1, pose: 'strap', expr: 'worry', look: [0.8, -0.2] } });
  VJ.beat({ id: 'mapa-iguazu', part: 1, r: 'atlas', cam: [1800, 400, 1300], travel: 1.4, hold: 0.8, val: { x: PIN.iguazu[0] + 6, y: PIN.iguazu[1] + 36, s: 0.13, pose: 'pointUp', expr: 'smile', look: [0.5, -0.5] },
    anim(tl, t, e, b) { tl.to('#passport,#ticket,#phone', { autoAlpha: 0, y: '+=120', duration: 0.5, ease: 'power1.in' }, b.t0 + 0.2); } });
})();
