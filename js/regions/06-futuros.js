/* ==========================================================================
   PARTE 4 · DOS FUTUROS POSIBLES: un cruce de caminos en 2030.
   A la izquierda, la inacción; a la derecha, la planificación.
   ========================================================================== */
(function () {
  const K = VJ.K;
  const G = 1600, CX = 3000;

  /* Cuatro dioramas: la misma escena en sus dos futuros. */
  function diorama(kind, good, seed) {
    const r = K.rng(seed);
    const W = 640, H = 500;
    const hill = good ? '#7cbf74' : '#6a6b64', hi = good ? '#a4d98b' : '#84847a';
    let s = `<ellipse cx="${W / 2}" cy="${H - 6}" rx="${W / 2}" ry="62" fill="${good ? '#5a9f5e' : '#4c4d48'}"/><path d="M6 ${H - 10}Q${W / 2} ${H - 112} ${W - 6} ${H - 10}Z" fill="${hill}"/><path d="M60 ${H - 22}Q${W / 2} ${H - 96} ${W - 60} ${H - 22}" stroke="${hi}" stroke-width="5" fill="none"/>`;
    const treeT = good ? ['#2f7a59', '#3f9a6f', '#74c08f'] : ['#3b4a44', '#505e55', '#68756a'];
    if (kind === 'iguazu') {
      s += `<rect x="150" y="150" width="340" height="220" rx="16" fill="${good ? '#eaf8f8' : '#b7c2bf'}"/>` + [...Array(9)].map((_, i) => `<rect x="${166 + i * 36}" y="166" width="12" height="194" rx="6" fill="${good ? '#bde3e8' : '#8d9a97'}"/>`).join('') + K.canopy(150, 142, 62, treeT, r) + K.canopy(490, 142, 62, treeT, r);
      if (good) s += `<g fill="#fbf4e3" stroke="#5d6871" stroke-width="5"><rect x="214" y="334" width="212" height="22" rx="3"/></g><rect x="60" y="356" width="120" height="44" rx="6" fill="#8d97a0"/><rect x="66" y="344" width="108" height="12" rx="3" fill="#a4afb8"/>` + `<path d="M320 90v-52l58 14-58 16" fill="#3c9b6b" stroke="#16263d" stroke-width="5"/>`;
      else s += `<g transform="rotate(16 200 380)"><rect x="110" y="360" width="170" height="20" fill="#5d6871"/></g><g transform="rotate(-24 420 370)"><rect x="350" y="350" width="170" height="20" fill="#5d6871"/></g><path d="M250 366l14 40M390 372l-14 40" stroke="#5d6871" stroke-width="10"/>`;
    } else if (kind === 'entre') {
      const wy = good ? 372 : 300;
      s += K.palm(120, 400, 240, good ? '#2f8a5f' : '#4d5a52', good ? '#49a676' : '#65716a', r) + `<path d="M210 410h280v-146h-280z" fill="${good ? '#e7b966' : '#94886e'}"/><path d="M190 264l160-70 160 70z" fill="${good ? '#a6562f' : '#5f564a'}"/>`;
      s += `<path d="M20 ${wy}C200 ${wy - 22} 440 ${wy + 22} 620 ${wy}V${H - 40}Q320 ${H - 2} 20 ${H - 40}Z" fill="${good ? '#79cfd2' : '#6f6650'}" opacity=".9"/>`;
      if (good) s += `<ellipse cx="500" cy="210" rx="72" ry="18" fill="#b5ecea"/><circle cx="470" cy="172" r="20" fill="#fff" opacity=".65"/><circle cx="520" cy="150" r="16" fill="#fff" opacity=".55"/>`;
    } else if (kind === 'chalten') {
      s += `<path d="M120 400L250 110L320 200L400 80L540 400Z" fill="${good ? '#d98f7f' : '#7b7680'}"/><path d="M400 80L440 170H400L370 130Z" fill="#fff"/>`;
      const n = good ? 5 : 28;
      for (let i = 0; i < n; i++) s += K.person(good ? 200 + i * 60 : K.rr(r, 70, 570), good ? 410 : K.rr(r, 384, 450), good ? 74 : 62, ['#e0533f', '#f2b544', '#3c9b6b', '#5c97d3'][i % 4], r);
      if (!good) s += `<g transform="translate(508 276)"><rect width="70" height="94" rx="8" fill="#c2502f"/><path d="M12 14h46l-5 66H17z" fill="#46362c"/></g>`;
    } else {
      s += `<path d="M20 330h600v50H20z" fill="#5f5243"/><path d="M90 330V190h390l30 140z" fill="${good ? '#fbfdff' : '#a9b0b5'}"/><rect x="170" y="130" width="230" height="60" fill="${good ? '#f4f7fb' : '#8e959a'}"/><path d="M270 130V80h44l10 50z" fill="#c2502f"/>`;
      if (good) s += `<circle cx="72" cy="290" r="26" fill="#3c9b6b"/><path d="M60 290l9 11 17-18" stroke="#fff" stroke-width="6" fill="none"/>` + K.person(540, 330, 80, '#5c97d3', r) + K.person(584, 330, 80, '#3c9b6b', r);
      else s += `<g transform="translate(46 262)"><rect width="46" height="68" rx="5" fill="#c2502f"/></g><g transform="translate(100 272)"><rect width="46" height="58" rx="5" fill="#e0a437"/></g><path d="M520 280L600 330M600 280L520 330" stroke="#c2502f" stroke-width="13" stroke-linecap="round"/>`;
    }
    return s;
  }

  const KINDS = [['iguazu', 'Iguazú'], ['entre', 'Entre Ríos'], ['chalten', 'El Chaltén'], ['ushuaia', 'Ushuaia']];
  const BAD = ['Las crecidas continúan dañando la infraestructura y provocando interrupciones prolongadas.', 'Las inundaciones afectan las actividades y las empresas siguen dependiendo de propuestas vulnerables.', 'Aumenta la cantidad de visitantes, pero los servicios urbanos no crecen al mismo ritmo.', 'Los conflictos institucionales continúan generando incertidumbre sobre la actividad portuaria.'];
  const GOOD = ['Los sistemas de alerta permiten anticipar las crecidas y proteger la infraestructura.', 'Las empresas cuentan con propuestas alternativas cuando el río no es favorable.', 'Una planificación contempla la cantidad de visitantes y el mantenimiento de los servicios.', 'Los organismos trabajan coordinados: controles ambientales y previsibilidad operativa.'];
  const xBad = (i) => 180 + i * 660, xGood = (i) => 3640 + i * 640;

  const tabs = [['infra', 'Infraestructura'], ['demanda', 'Demanda'], ['economia', 'Economía'], ['empleo', 'Empleo'], ['gobernanza', 'Gobernanza']];

  VJ.region({
    id: 'futuros', x: 1960, y: 1240, s: 0.125, px: 3000, py: 1200,
    layers: [{ name: 'far', k: 0.1 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(90deg, #39415a 0, #39415a 1900px, #e8c78e 5200px, #bfe7ee 7000px, #d7f0ee 100%)', bgBox: [-2500, -1400, 22000, 6000],
    build() {
      const r = K.rng(301);
      let storm = '', sun = '';
      for (let i = 0; i < 26; i++) storm += K.cloud(K.rr(r, -1500, 2700), K.rr(r, 200, 900), K.rr(r, 380, 800), '#5f6783', '#3f4663', r);
      sun += `<circle cx="5000" cy="520" r="360" fill="#ffe28a" opacity=".5"/><circle cx="5000" cy="520" r="240" fill="#fff0b8"/>`;
      for (let i = 0; i < 24; i++) sun += K.cloud(K.rr(r, 3400, 14000), K.rr(r, 200, 900), K.rr(r, 300, 620), '#fff', '#e7eff4', r);
      const ground = `<path d="M-2200 2700V${G}H${CX - 80}V2700Z" fill="#3f4240"/><path d="M${CX - 80} 2700V${G}H16500V2700Z" fill="#7cbf74"/><path d="M${CX - 100} ${G + 1}L${CX - 800} 2700H${CX + 800}L${CX + 100} ${G + 1}Z" fill="#c9a77a"/><path d="M${CX} ${G + 40}V2700" stroke="#fff4dc" stroke-width="12" stroke-dasharray="70 70"/>`;
      const post = `<g transform="translate(${CX} ${G})"><rect x="-14" y="-690" width="28" height="700" fill="#5d4633"/><path d="M-30 -640H-520L-600 -570L-520 -500H-30Z" fill="#c2502f"/><path d="M30 -480H300L360 -410L300 -340H30Z" fill="#3c9b6b"/><text x="-300" y="-552" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="58" letter-spacing="1" fill="#fff8e8">Poco favorable</text><text x="172" y="-392" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="58" letter-spacing="1" fill="#fff8e8">Favorable</text></g>`;

      const treeWind = K.act('r-tree', 8300, 760, 800, 900, `
        <g id="r-tree-g"><path d="M390 880C392 620 378 450 400 300L430 300C440 450 430 620 440 880Z" fill="#5b3a26"/>${K.canopy(415, 250, 250, ['#2f7a59', '#3f9a6f', '#74c08f'], K.rng(5))}</g>`);
      const windLines = K.act('wind', 7700, 780, 700, 600, `<g stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".85"><path d="M0 120C200 80 380 150 620 110"/><path d="M60 280C260 240 420 320 680 270"/><path d="M0 440C220 400 400 470 620 430"/></g>`);

      const stages = [['Adaptarse', 'r0'], ['Responder', 'r1'], ['Recuperarse', 'r2']].map(([n, id]) => `<div class="stage" id="${id}">${n}</div>`).join('');

      const quien = [['gov', 'Sector público', 'Establecer políticas, regular, controlar y planificar.', 'publico', '#5c97d3'], ['shop', 'Sector privado', 'Adaptar servicios, capacitar y comunicar correctamente.', 'privado', '#c2502f'], ['heart', 'Turistas', 'Contribuir con comportamientos responsables.', 'turistas', '#2f7a59']].map(([ic, n, t, pop, c], i) => `<button class="role" id="role${i}" data-pop="${pop}" style="--c:${c}"><span>${K.icon(ic)}</span><b>${n}</b><small>${t}</small></button>`).join('');

      return {
        far: K.svg(0, 0, 10, 10, storm + sun),
        main: K.svg(0, 0, 10, 10, ground + post)
          + KINDS.map(([k], i) => K.svg(xBad(i), G - 470, 640, 500, diorama(k, false, 10 + i))).join('')
          + KINDS.map(([k], i) => K.svg(xGood(i), G - 470, 640, 500, diorama(k, true, 10 + i))).join('')
          + treeWind + windLines

          + K.say('f-fork', 1720, 260, 2560, `<p class="k center">Imaginen que estamos en el año</p><p class="h0 center" style="font-size:300px">2030</p>`, 'center light')
          + K.say('f-fork', 1130, 950, 1120, `<p class="h3">¿Cómo se gestionaron los problemas?</p><p class="p sm">Argentina sigue recibiendo turistas de todo el mundo. Pero hay algo que todavía no sabemos.</p>`, 'light', 0.95)
          + K.hot('f-fork', 3660, 1000, 'prospectiva', 'Prospectiva: no predecir, sino imaginar')

          + K.say('f-mal', 250, 260, 2500, `<p class="k center">Escenario 1 · poco favorable</p><p class="h1 center">Los destinos no implementan medidas preventivas suficientes</p>`, 'light center')
          + KINDS.map(([, n], i) => K.say('f-mal', xBad(i) + 16, 720, 610, `<p class="hand">${n}</p><p class="p sm">${BAD[i]}</p>`, 'light', 0.86)).join('')
          + K.say('f-mal2', 240, 240, 2400, `<p class="k center">¿Qué tienen en común?</p><p class="h1 center">La falta de planificación y coordinación</p>`, 'center light', 1.05)
          + K.say('f-mal2', 240, 790, 2400, `<p class="tl-line light-line"><span>Cancelaciones</span><i></i><span>Pérdida de ingresos</span><i></i><span>Deterioro ambiental</span><i></i><span>Puestos de trabajo en riesgo</span><i></i><span>Destinos percibidos como inseguros</span></p><p class="h3 center" style="margin-top:44px">Recuperar la confianza de un visitante puede ser mucho más difícil que perderla.</p>`, 'light center')

          + K.say('f-bien', 3670, 260, 2500, `<p class="k center" style="color:#2f7a59">Escenario 2 · favorable</p><p class="h1 center">Volvemos a 2030, con decisiones diferentes</p>`, 'center')
          + KINDS.map(([, n], i) => K.say('f-bien', xGood(i) + 16, 720, 610, `<p class="hand">${n}</p><p class="p sm">${GOOD[i]}</p>`, '', 0.86)).join('')
          + K.say('f-cambia', 3670, 320, 2500, `<p class="k center" style="color:#2f7a59">Los problemas no desaparecen</p><p class="h0 center">Cambia la capacidad de respuesta</p>`, 'center', 0.95)

          + `<div class="say pointer compare" data-b="f-compare" style="left:1860px;top:330px;width:2300px">
              <p class="k center" style="color:#f2b544">Los mismos problemas, dos resultados</p>
              <div class="cmp" data-tabs data-axis="infra" data-mode="bad">
                <div class="cmp-tabs" role="group" aria-label="Eje de análisis">${tabs.map(([k, n], i) => `<button data-tab="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div>
                <button class="cmp-flip" data-flip aria-pressed="false"><span>Sin planificación</span><i></i><span>Con planificación</span></button>
                <p class="cmp-t" data-out="cmp-t"></p>
                <p class="cmp-b" data-out="cmp-b"></p>
              </div>
            </div>`
          + K.hot('f-compare', 3830, 1530, 'justicia', 'Justicia ambiental')

          + K.say('f-resil', 6880, 280, 1480, `<p class="k" style="color:#2f7a59">Una idea de la gestión turística</p><p class="h0">Resiliencia</p><p class="p">Un destino resiliente no es aquel que nunca enfrenta dificultades. Es aquel que tiene la capacidad de <em class="mark">adaptarse, responder y recuperarse</em>.</p>`, '', 0.95)
          + `<div class="say stages" data-b="f-resil" style="left:6880px;top:1160px;width:1300px">${stages}</div>`
          + K.say('f-concl', 6840, 340, 2800, `<p class="h1 center">Las consecuencias de una contingencia no dependen solamente de la intensidad del problema, sino también de <em class="mark">cómo nos preparamos</em> para enfrentarlo.</p><p class="h2 center" style="margin-top:36px">La planificación ya no puede limitarse a resolver problemas cuando aparecen.</p>`, 'center', 1.05)

          + K.say('f-quien', 10460, 300, 2500, `<p class="k center" style="color:#2f7a59">¿Quiénes son responsables?</p><p class="h1 center">Todos cumplen un papel, con responsabilidades diferentes</p>`, 'center')
          + `<div class="say pointer roles" data-b="f-quien" style="left:10560px;top:760px;width:2300px">${quien}</div>`
          + K.say('f-quien', 10460, 1270, 2500, `<p class="h2 center">El futuro no depende de una única decisión, sino de <em class="mark">muchas decisiones conectadas</em>.</p>`, 'center', 0.92),
      };
    },
  });

  const V = { s: 0.36 };
  const foot = G + 60;
  VJ.beat({ id: 'f-fork', part: 4, r: 'futuros', cam: [3000, 1120, 3200], travel: 1.5, hold: 1.7, val: { x: 2850, y: foot + 40, ...V, pose: 'think', expr: 'think', look: [0.2, -0.9], tele: true } });
  VJ.beat({ id: 'f-mal', part: 4, r: 'futuros', cam: [1500, 1120, 3000], travel: 1.1, hold: 2.1, tint: 0.14, rain: 0.8, val: { x: 2780, y: foot, f: -1, ...V, pose: 'point', expr: 'sad', look: [0.9, -0.3] } });
  VJ.beat({ id: 'f-mal2', part: 4, r: 'futuros', cam: [1440, 1040, 2800], travel: 0.7, hold: 1.8, tint: 0.45, rain: 0.8, val: { x: 2600, y: foot, f: -1, ...V, pose: 'strap', expr: 'sad', look: [0.9, -0.3] } });
  VJ.beat({ id: 'f-bien', part: 4, r: 'futuros', cam: [4920, 1120, 3000], travel: 1.5, hold: 2.1, val: { x: 3560, y: foot, ...V, pose: 'point', expr: 'joy', look: [0.9, -0.3] } });
  VJ.beat({ id: 'f-cambia', part: 4, r: 'futuros', cam: [4920, 1000, 3000], travel: 0.6, hold: 1.1, val: { x: 3560, y: foot, ...V, pose: 'strap', expr: 'smile', look: [0.9, -0.6] } });
  VJ.beat({ id: 'f-compare', part: 4, r: 'futuros', cam: [3010, 960, 2700], travel: 1, hold: 2, tint: 0.62, val: false });
  VJ.beat({ id: 'f-resil', part: 4, r: 'futuros', cam: [7940, 1050, 2500], travel: 1.4, hold: 2.2, val: { x: 8420, y: foot, f: -1, ...V, pose: 'point', expr: 'smile', look: [0.9, -0.6], tele: true },
    anim(tl, t) {
      gsap.set('#r-tree-g', { svgOrigin: '415 880' });
      gsap.set('#wind', { autoAlpha: 0, x: -300 });
      gsap.set('.stage', { opacity: 0.32 });
      tl.to('#wind', { autoAlpha: 1, x: 280, duration: 0.6 }, t);
      tl.to('#r-tree-g', { rotation: 22, duration: 0.55, ease: 'sine.inOut' }, t);
      tl.to('#r0', { opacity: 1, duration: 0.1 }, t + 0.1);
      tl.to('#r-tree-g', { rotation: 15, duration: 0.2 }, t + 0.7);
      tl.to('#r1', { opacity: 1, duration: 0.1 }, t + 0.7);
      tl.to('#wind', { autoAlpha: 0, x: 600, duration: 0.3 }, t + 1);
      tl.to('#r-tree-g', { rotation: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 1.2);
      tl.to('#r2', { opacity: 1, duration: 0.1 }, t + 1.3);
    } });
  VJ.beat({ id: 'f-concl', part: 4, r: 'futuros', cam: [8240, 1000, 3200], travel: 0.8, hold: 1.5, val: { x: 8420, y: foot, f: -1, ...V, pose: 'strap', expr: 'smile', look: [0.9, -0.4] },
    anim(tl, t, e, b) { tl.to('#r-tree', { autoAlpha: 0, duration: 0.35 }, b.t0 + 0.1); } });
  VJ.beat({ id: 'f-quien', part: 4, r: 'futuros', cam: [11700, 1000, 2900], travel: 1.3, hold: 1.8, val: { x: 10470, y: foot, ...V, pose: 'wave', gest: 'wave', expr: 'joy', look: [0.9, -0.4] },
    anim(tl, t) { [0, 1, 2].forEach((i) => { gsap.set(`#role${i}`, { y: 70, opacity: 0 }); tl.to(`#role${i}`, { y: 0, opacity: 1, duration: 0.26, ease: 'back.out(1.5)' }, t + 0.2 + i * 0.16); }); } });
})();
