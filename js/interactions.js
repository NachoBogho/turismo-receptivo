/* ==========================================================================
   Interacciones estilo Genially: fichas, tooltips, encuestas, navegación.
   Complementan el recorrido: nunca lo reemplazan.
   ========================================================================== */
(function () {
  const $ = (s, n = document) => n.querySelector(s);
  const $$ = (s, n = document) => [...n.querySelectorAll(s)];
  const ui = (VJ.ui = {});

  /* ---------- ficha modal ---------- */
  const modal = $('#modal'), body = $('#modal-body');
  let lastFocus = null;
  function openHTML(html) {
    body.innerHTML = html;
    modal.hidden = false;
    document.documentElement.classList.add('locked');
    lastFocus = document.activeElement;
    $('#modal-x').focus();
    $('#modal-card').scrollTop = 0;
  }
  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove('locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  ui.openFicha = function (key) {
    const f = VJ.FICHAS[key];
    if (!f) return console.warn('Ficha inexistente:', key);
    const lam = f.img && VJ.LAM[key] ? `<figure class="lam-fig">${VJ.LAM[key]()}</figure>` : '';
    const datos = f.d ? `<div class="facts">${f.d.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>` : '';
    openHTML(`${lam}${f.k ? `<p class="mk">${f.k}</p>` : ''}<h2 id="modal-title">${f.t}</h2>${f.b}${datos}${f.s ? `<p class="src">Fuente: ${f.s}</p>` : ''}`);
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return close();
    const pop = e.target.closest('[data-pop]');
    if (pop) return ui.openFicha(pop.dataset.pop);
    const panel = e.target.closest('[data-panel]');
    if (panel) return ui.openFicha(panel.dataset.panel);
    const jump = e.target.closest('[data-jump]');
    if (jump) return go(VJ.beats.findIndex((b) => b.id === jump.dataset.jump));
    const poll = e.target.closest('[data-poll]');
    if (poll) return onPoll(poll);
    const pick = e.target.closest('[data-pick]');
    if (pick) return onPick(pick);
    const tab = e.target.closest('[data-tab]');
    if (tab) return onTab(tab);
    const flip = e.target.closest('[data-flip]');
    if (flip) return onFlip(flip);
  });

  /* ---------- tooltips sobre los términos ---------- */
  const tip = $('#tooltip');
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-tip]');
    if (!t) return;
    tip.textContent = t.dataset.tip;
    const r = t.getBoundingClientRect();
    tip.style.left = Math.min(innerWidth - 320, Math.max(10, r.left)) + 'px';
    tip.style.top = Math.max(10, r.top - 70) + 'px';
    tip.classList.add('on');
  });
  document.addEventListener('pointerout', (e) => { if (e.target.closest('[data-tip]')) tip.classList.remove('on'); });

  /* ---------- mini-interacciones ---------- */
  function onPoll(btn) {
    const msg = ['Si cancela, el hotel, la agencia, el guía y el restaurante pierden algo. Sigamos.', 'Otro destino… ¿y si ahí también pasa algo? Sigamos.', '¡Eso! Averigüemos qué está pasando.'];
    $$('[data-poll]').forEach((b) => b.classList.toggle('on', b === btn));
    $('#poll-out').textContent = msg[+btn.dataset.poll];
  }

  const picks = new Set();
  function onPick(btn) {
    const g = btn.dataset.pick;
    picks.add(btn.dataset.val);
    btn.classList.add('on');
    const out = $(`[data-out="${g}"]`);
    if (out) out.innerHTML = btn.dataset.say;
    if (btn.dataset.pop2) ui.openFicha(btn.dataset.pop2);
  }

  function onTab(btn) {
    const box = btn.closest('[data-tabs]');
    $$('[data-tab]', box).forEach((b) => b.classList.toggle('on', b === btn));
    box.dataset.axis = btn.dataset.tab;
    renderCompare(box);
  }
  function onFlip(btn) {
    const box = btn.closest('[data-tabs]');
    box.dataset.mode = box.dataset.mode === 'good' ? 'bad' : 'good';
    renderCompare(box);
  }
  function renderCompare(box) {
    const data = VJ.COMPARA[box.dataset.axis], m = box.dataset.mode;
    box.classList.toggle('is-good', m === 'good');
    $('[data-out="cmp-t"]', box).textContent = m === 'good' ? 'Escenario favorable' : 'Escenario poco favorable';
    $('[data-out="cmp-b"]', box).textContent = data[m];
    $('[data-flip]', box).setAttribute('aria-pressed', m === 'good');
  }
  ui.renderCompare = renderCompare;

  /* Control de carga: el visitante mueve un deslizador y el destino responde. */
  ui.bindCarga = function () {
    const inp = $('#carga-range');
    if (!inp) return;
    const needle = (id, v) => { $('#' + id).style.transform = `rotate(${-90 + v * 180}deg)`; };
    const crowd = $$('.crowd-i');
    const upd = () => {
      const v = inp.value / 100;
      const eco = Math.min(1, v * 0.85 + v * v * 0.25), fis = Math.min(1, v * 1.15), psi = Math.min(1, v * v * 1.25);
      needle('g-eco', eco); needle('g-fis', fis); needle('g-psi', psi);
      crowd.forEach((c, i) => { c.style.opacity = i / crowd.length < v ? 1 : 0; });
      const lab = $('#carga-lab');
      lab.textContent = v < 0.34 ? 'Sendero tranquilo: el destino recibe sin deteriorarse.' : v < 0.72 ? 'Más gente, esperas y servicios exigidos.' : 'Sendero lleno, largas esperas, servicios insuficientes.';
      VJ.cargaExpr = v;
    };
    inp.addEventListener('input', upd);
    upd();
  };

  /* Mensaje confuso / mensaje preciso */
  ui.bindMensaje = function () {
    const box = $('#msg-toggle');
    if (!box) return;
    box.addEventListener('click', () => {
      const good = box.classList.toggle('good');
      $('#msg-bad').classList.toggle('dim', good);
      $('#msg-good').classList.toggle('dim', !good);
      box.setAttribute('aria-pressed', good);
      $('#msg-out').textContent = good ? '“¡Ah! Entonces el parque sigue abierto.”' : '“¿Todas las Cataratas? Mejor cancelo…”';
    });
  };

  /* ---------- navegación por teclado y por paradas ---------- */
  let navT = null;
  function targetT(b) { return b.t1 + b.hold * 0.42; }
  function go(i) {
    const beats = VJ.beats;
    i = Math.max(0, Math.min(beats.length - 1, i));
    const y = VJ.scrollFor(i === 0 ? 0 : targetT(beats[i]));
    const o = { y: scrollY };
    if (navT) navT.kill();
    const dist = Math.abs(y - scrollY);
    navT = gsap.to(o, { y, duration: VJ.RM ? 0.01 : Math.min(2.4, 0.9 + dist / 3800), ease: 'power1.inOut', onUpdate: () => scrollTo(0, o.y) });
    current = i;
  }
  ui.go = go;
  let current = 0;
  addEventListener('keydown', (e) => {
    if (!modal.hidden) { if (e.key === 'Escape') close(); return; }
    if (e.target.matches && e.target.matches('input,textarea')) return;
    const next = ['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key);
    const prev = ['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key);
    if (next || prev) {
      if (e.key === ' ' && e.target.closest && e.target.closest('button')) return;
      e.preventDefault();
      go(nearestStop() + (next ? 1 : -1));
    } else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(VJ.beats.length - 1); }
  });
  function nearestStop() {
    if (navT && navT.isActive()) return current;
    const t = VJ.tl.time(), bs = VJ.beats;
    for (let i = bs.length - 1; i >= 0; i--) if (t >= bs[i].t0 + bs[i].travel * 0.5) return i;
    return 0;
  }

  /* ---------- HUD ---------- */
  const PARTS = [
    { n: 'Prólogo', t: 'Imaginen esta situación', b: 'cover' },
    { n: 'Parte 1', t: 'El viaje que estuvo a punto de cancelarse', b: 'mapa-iguazu' },
    { n: 'Parte 2', t: 'El efecto dominó', b: 'd-intro' },
    { n: 'Parte 3', t: 'Lo que el turista no ve', b: 'ruta-sur' },
    { n: 'Parte 4', t: 'Dos futuros posibles', b: 'f-fork' },
    { n: 'Parte 5', t: 'El destino que elegimos construir', b: 'm-msg' },
  ];

  ui.init = function () {
    const rail = $('#rail');
    rail.innerHTML = '<div id="rail-fill"></div>';
    PARTS.forEach((p) => {
      const b = VJ.beats.find((x) => x.id === p.b);
      if (!b) return;
      p.at = b.t1 / VJ.total;
      const el = document.createElement('button');
      el.style.top = p.at * 100 + '%';
      el.dataset.jump = p.b;
      el.setAttribute('aria-label', `${p.n}: ${p.t}`);
      el.innerHTML = `<span>${p.n} · ${p.t}</span>`;
      rail.appendChild(el);
      p.el = el;
    });
    ui.fill = $('#rail-fill');
    ui.bindCarga();
    ui.bindMensaje();
    $$('[data-tabs]').forEach(renderCompare);

    // Versión en texto para lectores de pantalla.
    const seen = new Set();
    $('#sr-outline').innerHTML = VJ.beats.map((b) => {
      const html = (b.items || []).filter((n) => n.classList.contains('say') && !seen.has(n) && seen.add(n)).map((n) => n.textContent.trim()).filter(Boolean).map((t) => `<p>${t}</p>`).join('');
      return html;
    }).join('');
  };

  ui.onProgress = function (p) {
    if (ui.fill) ui.fill.style.transform = `scaleY(${p})`;
    $('#hint').classList.toggle('off', p > 0.006);
    PARTS.forEach((x) => x.el && x.el.classList.toggle('done', p >= x.at - 0.001));
  };

  const narrator = $('#narrator');
  const moved = [];
  ui.onBeat = function (b) {
    if (!(navT && navT.isActive())) current = b.i;
    const part = PARTS[b.part != null ? b.part : 0];
    const hp = $('#hud-part');
    if (part) { $('#hud-part-n').textContent = part.n; $('#hud-part-t').textContent = part.t; }
    hp.classList.toggle('on', b.id !== 'cover');
    PARTS.forEach((x, i) => x.el && x.el.classList.toggle('now', i === b.part));

    if (!document.documentElement.classList.contains('is-portrait')) return;
    const active = (VJ.liveItems = $$('.say,.hot').filter((n) => n._first && n._first.t1 <= b.t1 && n._last && n._last.t2 >= b.t2));
    const says = active.filter((n) => n.classList.contains('say'));
    const hots = active.filter((n) => n.classList.contains('hot'));
    // Los controles interactivos se mudan al narrador (conservan sus eventos); el resto se copia.
    moved.forEach(([kid, home]) => home.appendChild(kid));
    moved.length = 0;
    narrator.innerHTML = '';
    says.forEach((n) => {
      const box = document.createElement('div');
      box.className = n.className.replace('say', '').trim();
      if (n.classList.contains('pointer')) [...n.children].forEach((kid) => { moved.push([kid, n]); box.appendChild(kid); });
      else { box.innerHTML = n.innerHTML; box.querySelectorAll('[style]').forEach((x) => x.removeAttribute('style')); }
      narrator.appendChild(box);
    });
    const extra = b.chips ? $$(b.chips).map((n) => [n.dataset.pop, n.querySelector('b,.dm-n').textContent]) : [];
    const chips = hots.map((h) => [h.dataset.pop, h.textContent.trim()]).concat(extra);
    if (chips.length) {
      const c = document.createElement('div');
      c.className = 'nchips';
      c.innerHTML = chips.map(([p, t]) => `<button data-pop="${p}">+ ${t}</button>`).join('');
      narrator.appendChild(c);
    }
    narrator.scrollTop = 0;
  };
})();
