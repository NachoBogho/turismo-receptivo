/* ==========================================================================
   Valeria: personaje SVG por capas, con esqueleto y expresiones.
   Basada en la imagen de referencia (assets/img/valeria-ref.jpg).
   Mira hacia la derecha por defecto; f = -1 la espeja.
   ========================================================================== */
window.VJ = window.VJ || {};
(function () {
  const J = {
    hipN: [335, 612], hipF: [258, 612], kneeLen: 182,
    shN: [374, 382], shF: [212, 382], upper: 128, fore: 122,
    head: [296, 320], leashEnd: [96, 880],
  };

  const skin = 'url(#vSkin)';
  const leg = (id) => `
    <g id="${id}">
      <rect x="-37" y="-10" width="74" height="196" rx="33" fill="${skin}"/>
      <path d="M-46 -30H46L49 128H-49Z" fill="url(#vShorts)"/>
      <path d="M-20 62l14 5-9 6zM18 88l16 3-10 8z" fill="#eef0f2"/>
      <path d="M-46 -30V128" stroke="#7d8896" stroke-width="3" opacity=".5"/>
      <rect x="-54" y="118" width="108" height="30" rx="9" fill="#a9b2bd"/>
      <rect x="-54" y="118" width="108" height="9" rx="4" fill="#c7ced6"/>
      <g id="${id}-sh" transform="translate(0 182)">
        <path d="M-32 -22H32L25 168H-25Z" fill="${skin}"/>
        <path d="M6 -22H32L25 168H13Z" fill="#d98f6a" opacity=".3"/>
        <g id="${id}-f" transform="translate(0 168)">
          <path d="M-34 -14H30C40 -14 46 -6 62 0C86 8 92 22 92 34H-40C-44 12 -42 -8 -34 -14Z" fill="#cf3a35"/>
          <path d="M-34 -14H12L14 12H-42C-43 2 -40 -10 -34 -14Z" fill="#f4e7da"/>
          <path d="M20 -8l18 6M30 -14l14 9M16 2l18 6" stroke="#f6b6bf" stroke-width="5" stroke-linecap="round"/>
          <path d="M-44 30H96V38C96 44 92 48 84 48H-36C-42 48 -46 44 -46 38Z" fill="#f7f1e6"/>
          <path d="M-44 38H96" stroke="#d7c4ab" stroke-width="3"/>
        </g>
      </g>
    </g>`;

  const arm = (id, handExtra = '') => `
    <g id="${id}">
      <g id="${id}-fo" transform="translate(0 128)">
        <path d="M-25 -12H25L19 118H-19Z" fill="${skin}"/>
        <g id="${id}-h" transform="translate(0 122)">
          <g class="fist"><ellipse cx="0" cy="12" rx="28" ry="31" fill="${skin}"/><path d="M-20 22q8 10 20 10M-8 34l1 7M6 34l1 7" stroke="#cf8f6b" stroke-width="3.4" fill="none" stroke-linecap="round"/><ellipse cx="22" cy="2" rx="9" ry="16" fill="#f0bb96" transform="rotate(24 22 2)"/></g>
          <g class="pointer" style="display:none"><ellipse cx="0" cy="10" rx="26" ry="26" fill="${skin}"/><rect x="-8" y="16" width="17" height="74" rx="8.5" fill="#f3c19d"/><ellipse cx="20" cy="4" rx="9" ry="15" fill="#f0bb96" transform="rotate(30 20 4)"/></g>
          ${handExtra}
        </g>
      </g>
      <path d="M-44 -28C-22 -46 26 -44 44 -22L36 122H-34Z" fill="url(#vDenim)"/>
      <path d="M26 -30L36 118" stroke="#3f74ad" stroke-width="3" opacity=".6"/>
      <rect x="-46" y="104" width="94" height="33" rx="11" fill="#a7b4e3"/>
      <rect x="-46" y="104" width="94" height="11" rx="5" fill="#c6cff0"/>
    </g>`;

  const phone = `<g class="prop-phone" style="display:none"><rect x="-26" y="-44" width="58" height="104" rx="10" fill="#1d2536"/><rect x="-21" y="-37" width="48" height="88" rx="5" fill="#8fd0e2"/></g>`;

  const SVG = `
  <svg viewBox="0 0 520 1060" xmlns="http://www.w3.org/2000/svg" aria-label="Valeria, la viajera">
    <defs>
      <linearGradient id="vSkin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f9cfae"/><stop offset="1" stop-color="#eeb18a"/></linearGradient>
      <linearGradient id="vDenim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cb2e6"/><stop offset="1" stop-color="#4c86c4"/></linearGradient>
      <linearGradient id="vShorts" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b4bcc7"/><stop offset="1" stop-color="#8f9aa8"/></linearGradient>
      <linearGradient id="vCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e6bd"/><stop offset="1" stop-color="#dcc28c"/></linearGradient>
      <linearGradient id="vBag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9c5a2f"/><stop offset="1" stop-color="#6d3c1e"/></linearGradient>
      <linearGradient id="vCase" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d59a58"/><stop offset="1" stop-color="#a86f36"/></linearGradient>
      <radialGradient id="vHair" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#5a3a26"/><stop offset="1" stop-color="#2f1c12"/></radialGradient>
      <clipPath id="vLensL"><circle cx="258" cy="218" r="47"/></clipPath>
      <clipPath id="vLensR"><circle cx="356" cy="218" r="45"/></clipPath>
    </defs>

    <ellipse id="v-shadow" cx="290" cy="1034" rx="205" ry="20" fill="#0d1b2a" opacity=".2"/>

    <g id="v-case">
      <path d="M72 898V866a8 8 0 0 1 8-8H118a8 8 0 0 1 8 8V898" fill="none" stroke="#7a4a22" stroke-width="9"/>
      <rect x="28" y="890" width="142" height="124" rx="19" fill="url(#vCase)"/>
      <path d="M28 930C60 918 136 918 170 930" stroke="#8d5a2b" stroke-width="5" fill="none"/>
      <rect x="86" y="934" width="26" height="14" rx="4" fill="#efe0be"/>
      <circle class="wh" cx="58" cy="1020" r="14" fill="#3a2a22"/><circle class="wh" cx="140" cy="1020" r="14" fill="#3a2a22"/>
      <circle cx="58" cy="1020" r="5" fill="#d2c2a8"/><circle cx="140" cy="1020" r="5" fill="#d2c2a8"/>
    </g>
    <path id="v-leash" d="" fill="none" stroke="#8a5529" stroke-width="9" stroke-linecap="round"/>

    <g id="v-body">
      <g id="v-far">${arm('v-af')}</g>

      <g id="v-pack">
        <path d="M100 462C100 402 138 372 190 372H250V668H134C112 668 100 652 100 628Z" fill="url(#vBag)"/>
        <path d="M102 540C128 526 214 526 250 538V668H134C112 668 102 652 102 628Z" fill="#a4aee0"/>
        <path d="M102 540C128 526 214 526 250 538" stroke="#7f89bd" stroke-width="6" fill="none"/>
        <rect x="134" y="474" width="26" height="74" rx="8" fill="#5b3219"/><rect x="138" y="524" width="18" height="16" rx="3" fill="#e7c37a"/>
        <rect x="186" y="474" width="26" height="74" rx="8" fill="#5b3219"/><rect x="190" y="524" width="18" height="16" rx="3" fill="#e7c37a"/>
        <path d="M84 594h72v80a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16z" fill="#8c5129"/><path d="M84 594h72v30H84z" fill="#6f3f20"/>
      </g>

      <g id="v-lF">${leg('v-lf')}</g>
      <g id="v-lN">${leg('v-ln')}</g>

      <g id="v-torso">
        <path d="M210 588H372L382 650C336 668 252 668 202 650Z" fill="url(#vShorts)"/>
        <path d="M284 590v68" stroke="#7d8896" stroke-width="3"/>
        <path d="M198 372C228 340 354 340 386 372L374 604C330 628 252 628 210 604Z" fill="#f8efd9"/>
        <rect x="270" y="360" width="46" height="250" fill="#f4d76f" opacity=".75"/>
        <path d="M198 372C214 352 244 344 262 342L268 618C252 618 228 612 208 604Z" fill="url(#vDenim)"/>
        <path d="M386 372C370 352 342 344 324 342L320 618C338 618 360 612 376 604Z" fill="url(#vDenim)"/>
        <path d="M262 342L292 398L250 412L234 352Z" fill="#8fc0ee"/><path d="M324 342L296 398L338 412L352 352Z" fill="#6ca3da"/>
        <g fill="#e6bd62"><circle cx="258" cy="436" r="9"/><circle cx="260" cy="492" r="9"/><circle cx="262" cy="548" r="9"/><circle cx="330" cy="436" r="9"/><circle cx="328" cy="492" r="9"/><circle cx="326" cy="548" r="9"/></g>
        <path d="M212 436h38v42h-38zM338 436h34v42h-34z" fill="none" stroke="#3f74ad" stroke-width="3.4" stroke-dasharray="6 5"/>
        <path d="M228 346C214 390 206 470 212 560L238 566C232 480 240 400 256 350Z" fill="#7b4624"/>
        <path d="M360 346C374 390 380 470 376 556L350 566C356 480 348 400 332 350Z" fill="#7b4624"/>
        <rect x="222" y="474" width="26" height="20" rx="4" fill="#e7c37a" opacity=".92"/><rect x="346" y="474" width="26" height="20" rx="4" fill="#e7c37a" opacity=".92"/>
      </g>

      <g id="v-head">
        <path d="M268 296h58v62c-14 16-44 16-58 0z" fill="#e6a780"/>
        <!-- pelo trasero con rulos -->
        <g fill="url(#vHair)">
          <path d="M176 196C170 96 420 92 430 196C446 232 452 280 412 316C380 342 214 344 186 314C150 280 160 232 176 196Z"/>
          <circle cx="178" cy="282" r="36"/><circle cx="210" cy="316" r="32"/><circle cx="160" cy="246" r="26"/>
          <circle cx="424" cy="282" r="34"/><circle cx="394" cy="316" r="30"/><circle cx="446" cy="246" r="24"/>
        </g>
        <path d="M138 232c16-8 24 2 26 16M462 226c-16-6-26 4-26 16" stroke="#2f1c12" stroke-width="13" fill="none" stroke-linecap="round"/>
        <!-- cara -->
        <g id="v-face">
          <ellipse cx="202" cy="236" rx="19" ry="26" fill="#eeb18a"/>
          <path d="M204 150C256 110 354 112 396 152C414 190 412 272 372 306C340 330 266 330 232 306C194 272 188 192 204 150Z" fill="${skin}"/>
          <ellipse cx="238" cy="276" rx="30" ry="18" fill="#f09a86" opacity=".42"/><ellipse cx="366" cy="276" rx="28" ry="17" fill="#f09a86" opacity=".42"/>
          <path d="M310 240c8 12 8 22-4 26" stroke="#d48d68" stroke-width="5.5" fill="none" stroke-linecap="round"/>
          <g id="v-eyes">
            <circle cx="258" cy="218" r="39" fill="#fff"/><circle cx="356" cy="218" r="37" fill="#fff"/>
            <g id="v-pupils">
              <circle cx="262" cy="220" r="26" fill="#6b3f22"/><circle cx="262" cy="220" r="16" fill="#1d120c"/><circle cx="271" cy="209" r="8.5" fill="#fff"/><circle cx="253" cy="230" r="4" fill="#fff" opacity=".8"/>
              <circle cx="360" cy="220" r="25" fill="#6b3f22"/><circle cx="360" cy="220" r="15" fill="#1d120c"/><circle cx="369" cy="209" r="8.5" fill="#fff"/><circle cx="351" cy="230" r="4" fill="#fff" opacity=".8"/>
            </g>
            <g id="v-lids">
              <g clip-path="url(#vLensL)"><rect id="v-lid-l" x="205" y="120" width="106" height="60" fill="#f4c3a0"/></g>
              <g clip-path="url(#vLensR)"><rect id="v-lid-r" x="305" y="120" width="102" height="60" fill="#f4c3a0"/></g>
            </g>
          </g>
          <g id="v-glasses" fill="rgba(255,255,255,.1)" stroke="#2a2230" stroke-width="8">
            <circle cx="258" cy="218" r="48"/><circle cx="356" cy="218" r="46"/><path d="M306 214q4-5 4-1" fill="none"/><path d="M306 212c0-5 4-5 4-1" fill="none"/><path d="M210 212l-20-4M402 212l14-4" fill="none"/>
          </g>
          <path id="v-browL" d="M226 158Q256 134 288 152" stroke="#2f1c12" stroke-width="11" fill="none" stroke-linecap="round"/>
          <path id="v-browR" d="M328 150Q358 134 386 156" stroke="#2f1c12" stroke-width="11" fill="none" stroke-linecap="round"/>
          <g id="v-mouths" fill="none" stroke-linecap="round">
            <path data-m="smile" d="M274 286Q308 310 342 282" stroke="#a34a3c" stroke-width="7"/>
            <g data-m="joy" style="display:none"><path d="M268 278Q308 288 348 276Q344 322 308 322Q274 322 268 278Z" fill="#8d2c2c"/><path d="M272 280Q308 290 345 278L342 290Q308 298 276 292Z" fill="#fff"/></g>
            <ellipse data-m="oh" cx="308" cy="296" rx="15" ry="20" fill="#8d2c2c" style="display:none"/>
            <path data-m="worry" d="M278 298Q294 284 310 296T344 290" stroke="#a34a3c" stroke-width="7" style="display:none"/>
            <path data-m="sad" d="M280 304Q310 278 340 302" stroke="#a34a3c" stroke-width="7" style="display:none"/>
            <path data-m="think" d="M286 298Q314 304 340 288" stroke="#a34a3c" stroke-width="7" style="display:none"/>
          </g>
        </g>
        <!-- flequillo y gorra -->
        <path d="M198 186C214 132 318 112 396 160C408 176 410 192 408 206C380 166 340 154 322 152C300 180 250 192 222 172C212 180 204 190 202 212C196 206 194 196 198 186Z" fill="url(#vHair)"/>
        <g id="v-cap">
          <path d="M176 178C170 60 250 22 322 26C402 30 440 96 432 176C380 136 230 136 176 178Z" fill="url(#vCap)"/>
          <path d="M176 178C230 136 380 136 432 176C436 188 434 198 430 204C372 166 234 166 178 208C174 198 174 188 176 178Z" fill="#cdb078"/>
          <path d="M404 170C446 172 482 190 492 212C454 200 420 196 396 198Z" fill="#d9bd85"/>
          <path d="M322 26C306 60 300 110 306 146" stroke="#d2b67e" stroke-width="4" fill="none"/>
          <path d="M292 58a26 16 0 0 1 58 0l-8 12h-42z" fill="#e0a437"/><circle cx="321" cy="58" r="7" fill="#fff4d3"/>
        </g>
      </g>

      <g id="v-near">${arm('v-an', phone)}</g>
    </g>
  </svg>`;

  /* Poses: n/f = [hombro, codo] del brazo cercano y lejano. */
  const P = {
    stand:   { n: [6, -14],  f: [30, 8],  lean: 0,  head: 0 },
    strap:   { n: [34, -148], f: [30, 8], lean: 0,  head: 0 },
    point:   { n: [-84, -4], f: [30, 8],  lean: 3,  head: 2, hand: 'pointer' },
    pointUp: { n: [-142, -8], f: [30, 8], lean: -2, head: -7, hand: 'pointer' },
    wave:    { n: [-128, -40], f: [30, 8], lean: 0, head: 3 },
    phone:   { n: [-30, -128], f: [30, 8], lean: 2, head: 6, hand: 'phone' },
    think:   { n: [-6, -150], f: [30, 8],  lean: 1, head: -5 },
    shrug:   { n: [-40, -72], f: [46, -30], lean: 0, head: -4 },
    push:    { n: [-78, -28], f: [30, 8], lean: 12, head: 4 },
    cheer:   { n: [-135, -20], f: [30, -30], lean: -2, head: -5 },
  };

  const EX = {
    smile:   { m: 'smile', lid: 0,   bl: 0,  br: 0,  by: 0 },
    joy:     { m: 'joy',   lid: 0,   bl: -4, br: 4,  by: -8 },
    oh:      { m: 'oh',    lid: 0,   bl: -6, br: 6,  by: -18 },
    worry:   { m: 'worry', lid: 8,   bl: 12, br: -12, by: -6 },
    sad:     { m: 'sad',   lid: 22,  bl: 18, br: -18, by: 2 },
    think:   { m: 'think', lid: 12,  bl: -8, br: 6,  by: -4 },
  };

  const V = (VJ.Valeria = {});
  let q = {};

  V.mount = function (parent) {
    const el = document.createElement('div');
    el.id = 'valeria';
    el.innerHTML = SVG;
    parent.appendChild(el);
    V.el = el;
    ['v-lN', 'v-lF', 'v-ln-sh', 'v-lf-sh', 'v-ln-f', 'v-lf-f', 'v-body', 'v-near', 'v-far', 'v-an-fo', 'v-af-fo', 'v-head', 'v-pupils', 'v-face', 'v-case', 'v-leash', 'v-browL', 'v-browR', 'v-lid-l', 'v-lid-r', 'v-torso', 'v-shadow'].forEach((id) => (q[id] = el.querySelector('#' + id)));
    q.mouths = [...el.querySelectorAll('[data-m]')];
    q.fists = el.querySelector('#v-an-h .fist');
    q.pointer = el.querySelector('#v-an-h .pointer');
    q.phone = el.querySelector('#v-an-h .prop-phone');
    q.wheels = [...el.querySelectorAll('.wh')];
    V.expr('smile'); V.pose(P.stand, 0, 0, 0);
    if (!VJ.RM) blinkLoop();
  };

  const set = (n, t) => n.setAttribute('transform', t);
  const rad = (a) => (a * Math.PI) / 180;

  V.pose = function (pose, phase, amp, lookX, lookY = 0, extra = 0) {
    const c = Math.cos(phase), s = Math.sin(phase);
    const legA = 25 * amp, kneeA = 46 * amp;
    const nF = legA * c, fF = -legA * c;
    const nK = kneeA * Math.max(0, -s) + 4 * amp, fK = kneeA * Math.max(0, s) + 4 * amp;
    const bob = 15 * amp * c * c;
    const hipN = [J.hipN[0] - 34 * amp, J.hipN[1]], hipF = [J.hipF[0] + 40 * amp, J.hipF[1]];

    set(q['v-lN'], `translate(${hipN[0]} ${hipN[1]}) rotate(${-nF})`);
    set(q['v-lF'], `translate(${hipF[0]} ${hipF[1]}) rotate(${-fF})`);
    set(q['v-ln-sh'], `translate(0 182) rotate(${nK})`);
    set(q['v-lf-sh'], `translate(0 182) rotate(${fK})`);
    set(q['v-ln-f'], `translate(0 168) rotate(${-nK * 0.3 + (c > 0 ? -12 * amp * c : 10 * amp * -c)})`);
    set(q['v-lf-f'], `translate(0 168) rotate(${-fK * 0.3 + (c < 0 ? 12 * amp * c : 10 * amp * c)})`);

    const swing = 22 * amp * c;
    const nA = pose.n[0] - swing * (pose.n[0] > -20 ? 1 : 0.15) + (extra || 0);
    set(q['v-near'], `translate(${J.shN[0]} ${J.shN[1]}) rotate(${nA})`);
    set(q['v-an-fo'], `translate(0 128) rotate(${pose.n[1]})`);
    const fA = pose.f[0] + 5 * amp * c;
    set(q['v-far'], `translate(${J.shF[0]} ${J.shF[1]}) rotate(${fA})`);
    set(q['v-af-fo'], `translate(0 128) rotate(${pose.f[1]})`);

    set(q['v-body'], `translate(0 ${bob}) rotate(${(pose.lean || 0) + 3 * amp} 296 1000)`);
    set(q['v-head'], `rotate(${(pose.head || 0) + 2 * amp * s} ${J.head[0]} ${J.head[1]})`);
    set(q['v-face'], `translate(${lookX * 8} ${lookY * 3})`);
    set(q['v-pupils'], `translate(${lookX * 9} ${lookY * 8})`);

    // Valija detrás, con ruedas y traqueteo; la correa se recalcula desde la mano.
    const caseTilt = -7 * amp;
    set(q['v-case'], `rotate(${caseTilt + 1.4 * amp * s} 96 1020) translate(0 ${-2.5 * amp * Math.abs(s)})`);
    q.wheels.forEach((w, i) => set(w, `rotate(${(phase * 180) / Math.PI} ${i ? 140 : 58} 1020)`));
    const a0 = rad(fA), a1 = rad(fA + pose.f[1]);
    const hx = J.shF[0] - Math.sin(a0) * J.upper - Math.sin(a1) * (J.fore + 8);
    const hy = J.shF[1] + Math.cos(a0) * J.upper + Math.cos(a1) * (J.fore + 8) + bob;
    const [ex, ey] = J.leashEnd;
    q['v-leash'].setAttribute('d', `M${hx} ${hy}Q${(hx + ex) / 2 - 8} ${Math.max(hy, ey) + 26} ${ex} ${ey - 10}`);

    q.fists.style.display = pose.hand === 'pointer' ? 'none' : '';
    q.pointer.style.display = pose.hand === 'pointer' ? '' : 'none';
    q.phone.style.display = pose.hand === 'phone' ? '' : 'none';
  };

  let cur = '';
  let lid = 0;
  const applyLid = (v) => { const y = 120 + v; q['v-lid-l'].setAttribute('y', y); q['v-lid-r'].setAttribute('y', y); };
  V.expr = function (name) {
    if (name === cur || !EX[name]) return;
    cur = name; const e = EX[name];
    q.mouths.forEach((m) => (m.style.display = m.dataset.m === e.m ? '' : 'none'));
    set(q['v-browL'], `translate(0 ${e.by}) rotate(${e.bl} 258 150)`);
    set(q['v-browR'], `translate(0 ${e.by}) rotate(${e.br} 358 150)`);
    lid = e.lid;
    applyLid(lid);
  };

  function blinkLoop() {
    setTimeout(() => {
      applyLid(100);
      setTimeout(() => { applyLid(lid); blinkLoop(); }, 120);
    }, 1800 + Math.random() * 3200);
  }

  V.poses = P;
  V.mix = function (a, b, t) {
    const l = (x, y) => x + (y - x) * t;
    return {
      n: [l(a.n[0], b.n[0]), l(a.n[1], b.n[1])],
      f: [l(a.f[0], b.f[0]), l(a.f[1], b.f[1])],
      lean: l(a.lean || 0, b.lean || 0),
      head: l(a.head || 0, b.head || 0),
      hand: t < 0.5 ? a.hand : b.hand,
    };
  };
})();
