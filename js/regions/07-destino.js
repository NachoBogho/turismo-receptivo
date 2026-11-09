/* ==========================================================================
   PARTE 5 · EL DESTINO QUE ELEGIMOS CONSTRUIR
   La historia vuelve a Valeria: mensaje, mochila de propuestas y regreso al mapa.
   ========================================================================== */
(function () {
  const K = VJ.K, PIN = VJ.PIN;
  const G = 1620;

  const PUB = [['alert', 'Alerta hidrológica temprana', 'pub-1'], ['leaf', 'Humedales y planes climáticos', 'pub-2'], ['map', 'Comunicación de crisis', 'pub-3'], ['anchor', 'Convenio por el puerto', 'pub-4']];
  const PRI = [['bus', 'Reprogramación flexible', 'pri-1'], ['shop', 'Promoción conjunta', 'pri-2'], ['people', 'Capacitación del personal', 'pri-3']];
  const PACK_X = 4560, PACK_Y = 1300;

  const pack = `
    <path d="M60 620C20 620 0 590 0 550V240C0 90 120 10 280 10C440 10 560 90 560 240V550C560 590 540 620 500 620Z" fill="#8c5129"/>
    <path d="M0 360C120 330 440 330 560 360V550C560 590 540 620 500 620H60C20 620 0 590 0 550Z" fill="#a4aee0"/>
    <path d="M0 360C120 330 440 330 560 360" stroke="#7f89bd" stroke-width="12" fill="none"/>
    <rect x="120" y="230" width="62" height="170" rx="16" fill="#5b3219"/><rect x="378" y="230" width="62" height="170" rx="16" fill="#5b3219"/>
    <rect x="130" y="350" width="42" height="36" rx="6" fill="#e7c37a"/><rect x="388" y="350" width="42" height="36" rx="6" fill="#e7c37a"/>
    <ellipse cx="280" cy="90" rx="215" ry="58" fill="#3b2012"/>`;

  const tool = (id, ic, name, pop, x, y, c) => `<button id="${id}" class="a tool" data-pop="${pop}" style="left:${x}px;top:${y}px;--c:${c}" aria-label="${name}: ver propuesta"><span>${K.icon(ic)}</span><b>${name}</b></button>`;

  const card = (id, x, rot, c, ic, name, txt) => `<div class="pcard" id="${id}" style="left:${x}px;transform:rotate(${rot}deg);--c:${c}"><span>${K.icon(ic)}</span><b>${name}</b><small>${txt}</small></div>`;

  VJ.region({
    id: 'destino', x: 1960, y: 760, s: 0.125, px: 3000, py: 1100,
    layers: [{ name: 'far', k: 0.11 }, { name: 'mid', k: 0.05 }, { name: 'main', k: 0 }],
    bg: 'linear-gradient(180deg, #5fb3da 1400px, #bfe7ee 2300px, #fff1cf 2900px)', bgBox: [-5000, -1400, 22000, 6000],
    fgK: -0.1,
    build() {
      const r = K.rng(808);
      let clouds = '', trees = '';
      for (let i = 0; i < 26; i++) clouds += K.cloud(K.rr(r, -1200, 13000), K.rr(r, 180, 940), K.rr(r, 300, 680), '#fff', '#e7eff4', r);
      clouds += `<path d="${K.ridge(-2000, 14000, 1380, 28, 140, r, 1700)}" fill="#a8d6b4"/>`;
      trees = `<path d="${K.ridge(-2000, 14000, 1500, 20, 100, r, 1800)}" fill="#6fb784"/>`;
      for (let x = -1800; x < 14000; x += K.rr(r, 160, 360)) trees += K.tree(x, G, K.rr(r, 260, 430), ['#2f7a59', '#3f9a6f', '#74c08f'], r);
      const ground = `<path d="M-2200 2700V${G}H15000V2700Z" fill="#5ea56d"/><path d="M-2200 ${G}H15000V${G + 40}H-2200Z" fill="#74bf80"/>` + [...Array(120)].map((_, i) => `<path d="M${-2000 + ((i * 269) % 16800)} ${G + 80 + ((i * 41) % 480)}l-9 -22m9 22l1 -28m-1 28l11 -20" stroke="#3f8a55" stroke-width="5" fill="none"/>`).join('');

      let fg = '';
      for (let x = -1800; x < 14000; x += K.rr(r, 620, 1100)) fg += K.fern(x, 2220, K.rr(r, 300, 430), -100 + K.rr(r, -30, 30), '#2f7a59', r);

      const toolPos = [[3280, 770], [3780, 520], [5040, 520], [5560, 770], [3280, 1130], [5560, 1130], [4410, 400]];

      return {
        far: K.svg(0, 0, 10, 10, clouds),
        mid: K.svg(0, 0, 10, 10, trees),
        fg: K.svg(0, 0, 10, 10, fg),
        main: K.svg(0, 0, 10, 10, ground)

          /* Teléfono grande con el mensaje de la agencia */
          + K.div('big-phone', 1120, 430, `
              <div class="bp-screen">
                <p class="bp-from">Tu agencia de viajes</p>
                <div class="bp-msg" id="bm1">El circuito Garganta del Diablo está cerrado preventivamente.</div>
                <div class="bp-msg" id="bm2">Pero el parque continúa abierto y hay otros recorridos disponibles.</div>
                <div class="bp-msg bp-ok" id="bm3">¿Adaptamos tu itinerario para que puedas disfrutar del destino?</div>
              </div>`, 'bphone')
          + K.say('m-msg', 2070, 340, 1250, `<p class="k">Volvamos al comienzo</p><p class="h1">¿Y si, en lugar de información confusa, recibe esto?</p><p class="p">Quizás no viva exactamente lo que había imaginado, pero <em class="mark">todavía puede disfrutar de sus vacaciones</em>.</p>`, '', 0.96)
          + K.bub('m-msg', 2140, 1130, '¡Entonces viajo igual!', 'burst', 440)

          /* Dos mensajes */
          + `<div class="say pointer msgs" data-b="m-dos" style="left:1000px;top:280px;width:2500px">
              <p class="h2 center">Una misma situación, percepciones completamente diferentes</p>
              <div class="msg-row">
                <div class="msg" id="msg-bad"><small>Mensaje 1</small>“Las Cataratas están cerradas”.</div>
                <button id="msg-toggle" aria-pressed="false" aria-label="Cambiar de mensaje"><i></i></button>
                <div class="msg dim" id="msg-good"><small>Mensaje 2</small>“El circuito Garganta del Diablo permanece cerrado preventivamente, pero los demás recorridos continúan habilitados”.</div>
              </div>
              <p class="hand center" id="msg-out" style="font-size:66px;margin-top:30px;color:#7b2f1f">“¿Todas las Cataratas? Mejor cancelo…”</p>
              <p class="p" style="margin-inline:auto;text-align:center">La información precisa es fundamental para mantener la confianza del visitante.</p>
            </div>`

          /* Mochila */
          + K.act('bigpack', PACK_X - 280, PACK_Y - 200, 560, 620, pack)
          + PUB.map(([ic, n, pop], i) => tool(`tp${i}`, ic, n, pop, toolPos[i][0], toolPos[i][1], '#2d6cb0')).join('')
          + PRI.map(([ic, n, pop], i) => tool(`tr${i}`, ic, n, pop, toolPos[i + 4][0], toolPos[i + 4][1], '#c2502f')).join('')
          + K.say('m-publico', 3350, 60, 2500, `<p class="k center">Propuestas de intervención · sector público</p><p class="h2 center">Regulación, planificación, control y fomento</p>`, 'center', 1.1)
          + K.hot('m-publico', 5090, 1430, 'plac', 'PLAC: planes locales de acción climática')
          + K.say('m-privado', 3350, 60, 2500, `<p class="k center">Propuestas de intervención · sector privado</p><p class="h2 center">Prestación de servicios y comercialización</p>`, 'center', 1.1)
          + K.say('m-articula', 3250, 60, 2700, `<p class="h2 center">Ambos ámbitos requieren una articulación permanente: la sostenibilidad <em class="mark">no se garantiza con intervenciones aisladas</em>.</p>`, 'center', 1.05)

          /* Tendedero de postales: el sentido del viaje */
          + K.act('line', 6900, 560, 2600, 200, `<path d="M0 20Q1300 170 2600 20" stroke="#6b4a33" stroke-width="8" fill="none"/>`)
          + `<div class="a pcards" style="left:7000px;top:640px">${card('pc0', 0, -5, '#5c97d3', 'bed', 'Descanso', 'Recuperarse de la fatiga física y mental.')}${card('pc1', 830, 3, '#e0a437', 'kite', 'Diversión', 'Romper la rutina, entretenerse, recrearse.')}${card('pc2', 1660, -3, '#2f7a59', 'book', 'Desarrollo personal', 'Crecer intelectual, cultural y socialmente.')}</div>`
          + K.say('m-ocio', 7050, 60, 2500, `<p class="k center">El turista viaja para vivir experiencias · Dumazedier</p><p class="h1 center">Viaja para descansar, divertirse y conocer</p>`, 'center', 1.0)
          + K.say('m-ocio', 7050, 1260, 2500, `<p class="h3 center">Al modificar un itinerario, estamos intentando <em class="mark">preservar el sentido de ese viaje</em> para la persona que lo eligió.</p>`, 'center scrap', 1.05)
          + K.hot('m-ocio', 7040, 1500, 'ocio', 'Ocio autotélico (Cuenca)')
          + K.hot('m-ocio', 9120, 1500, 'dudh', 'Artículo 24, Derechos Humanos')

          /* Cuatro pilares */
          + K.act('arch', 10300, 520, 2400, 1100, `
              ${[0, 1, 2, 3].map((i) => `<g id="pil${i}"><rect x="${130 + i * 600}" y="260" width="340" height="840" rx="16" fill="${['#c2502f', '#2f7a59', '#5c97d3', '#e0a437'][i]}"/><rect x="${100 + i * 600}" y="250" width="400" height="44" rx="10" fill="#fff4dc"/><rect x="${100 + i * 600}" y="1060" width="400" height="40" rx="10" fill="#fff4dc"/></g>`).join('')}
              <g id="pil-top"><path d="M0 250L1200 10L2400 250Z" fill="#fff4dc"/><path d="M0 250H2400" stroke="#c9a66b" stroke-width="12"/></g>`)
          + [['Infraestructura adecuada', 0], ['Instituciones coordinadas', 1], ['Empresas responsables', 2], ['Comunidades que se benefician', 3]].map(([n, i]) => K.say('m-pilares', 10450 + i * 600, 1120, 320, `<p class="h3 center" style="color:#fff8e8;font-size:48px">${n}</p>`, 'center')).join('')
          + K.say('m-pilares', 10300, 140, 2400, `<p class="k center">La sostenibilidad turística no depende exclusivamente de proteger un paisaje</p><p class="h1 center">También depende de esto</p>`, 'center', 1.02),
      };
    },
  });

  const V = { s: 0.38 };
  const foot = G + 60;
  VJ.beat({ id: 'm-msg', part: 5, r: 'destino', cam: [2120, 1000, 2500], travel: 1.5, hold: 1.9, val: { x: 2720, y: foot, f: -1, ...V, pose: 'phone', expr: 'joy', look: [0.9, -0.2], tele: true },
    anim(tl, t, e, b) {
      gsap.set('#bm1,#bm2,#bm3', { autoAlpha: 0, y: 34 });
      ['#bm1', '#bm2', '#bm3'].forEach((m, i) => tl.to(m, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'back.out(2)' }, t + 0.1 + i * 0.32));
    } });
  VJ.beat({ id: 'm-dos', part: 5, r: 'destino', cam: [2250, 880, 2850], travel: 1, hold: 2, val: { x: 1010, y: foot, ...V, pose: 'think', expr: 'think', look: [0.9, -0.5] },
    anim(tl, t, e, b) { tl.to('#big-phone', { autoAlpha: 0, duration: 0.3 }, b.t0 + 0.1); } });
  VJ.beat({ id: 'm-publico', part: 5, r: 'destino', chips: '#tp0,#tp1,#tp2,#tp3', cam: [4580, 800, 3000], travel: 1.3, hold: 2, val: { x: 4030, y: foot, ...V, pose: 'point', expr: 'joy', look: [0.9, -0.7] },
    anim(tl, t, e, b) {
      const all = ['#tp0', '#tp1', '#tp2', '#tp3', '#tr0', '#tr1', '#tr2'];
      gsap.set(all, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' });
      gsap.set('#tp0', { x: 980, y: 700 }); gsap.set('#tp1', { x: 520, y: 900 }); gsap.set('#tp2', { x: -740, y: 900 }); gsap.set('#tp3', { x: -1260, y: 700 });
      gsap.set('#tr0', { x: 980, y: 300 }); gsap.set('#tr1', { x: -1260, y: 300 }); gsap.set('#tr2', { x: -130, y: 1100 });
      ['#tp0', '#tp1', '#tp2', '#tp3'].forEach((s, i) => tl.to(s, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.42, ease: 'back.out(1.2)' }, t + 0.15 + i * 0.2));
    } });
  VJ.beat({ id: 'm-privado', part: 5, r: 'destino', chips: '#tr0,#tr1,#tr2', cam: [4580, 800, 3000], travel: 0.6, hold: 1.8, val: { x: 4030, y: foot, ...V, pose: 'pointUp', expr: 'joy', look: [0.9, -0.7] },
    anim(tl, t) { ['#tr0', '#tr1', '#tr2'].forEach((s, i) => tl.to(s, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.42, ease: 'back.out(1.2)' }, t + 0.1 + i * 0.2)); } });
  VJ.beat({ id: 'm-articula', part: 5, r: 'destino', cam: [4580, 800, 3100], travel: 0.5, hold: 1, val: { x: 4030, y: foot, ...V, pose: 'strap', expr: 'smile', look: [0.9, -0.7] } });
  VJ.beat({ id: 'm-ocio', part: 5, r: 'destino', cam: [8300, 800, 3000], travel: 1.4, hold: 2, val: { x: 6850, y: foot, ...V, pose: 'pointUp', expr: 'smile', look: [0.9, -0.8] },
    anim(tl, t) { ['#pc0', '#pc1', '#pc2'].forEach((p, i) => { gsap.set(p, { y: -900 }); tl.to(p, { y: 0, duration: 0.42, ease: 'back.out(1.2)' }, t + i * 0.2); }); } });
  VJ.beat({ id: 'm-pilares', part: 5, r: 'destino', cam: [11500, 880, 3000], travel: 1.4, hold: 1.8, val: { x: 10130, y: foot, ...V, pose: 'point', expr: 'joy', look: [0.9, -0.5] },
    anim(tl, t, e, b) { ['#pil0', '#pil1', '#pil2', '#pil3'].forEach((p, i) => { gsap.set(p, { y: 1200 }); tl.to(p, { y: 0, duration: 0.4, ease: 'power3.out' }, b.t0 + 0.5 + i * 0.11); }); gsap.set('#pil-top', { y: -800, opacity: 0 }); tl.to('#pil-top', { y: 0, opacity: 1, duration: 0.3, ease: 'bounce.out' }, t + 0.25); } });

  VJ.beat({ id: 'final-q', part: 5, r: 'atlas', cam: [1300, 800, 2640], travel: 1.6, hold: 1.8, drift: 0.012, val: { x: 640, y: 1420, s: 0.42, pose: 'strap', expr: 'think', look: [0.8, -0.5], tele: true } });
  VJ.beat({ id: 'final', part: 5, r: 'atlas', cam: [1300, 800, 2640], travel: 0.7, hold: 1.8, drift: 0.008, val: { x: 640, y: 1420, s: 0.42, pose: 'wave', gest: 'wave', expr: 'joy', look: [0.8, -0.2] } });
})();
