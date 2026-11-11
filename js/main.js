/* Punto de entrada: arma el mundo cuando están listas las fuentes. */
(function () {
  async function start() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    VJ.boot();
    VJ.ui.init();
    VJ.render(0);
    const loader = document.getElementById('loader');
    loader.classList.add('off');
    setTimeout(() => loader.remove(), 400);
    const m = location.hash.match(/^#(.+)/);
    if (m) {
      const b = VJ.beats.find((x) => x.id === m[1]);
      if (b) setTimeout(() => scrollTo(0, VJ.scrollFor(b.stop)), 60);
    } else scrollTo(0, 0);
  }
  const ready = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  ready.then(start);
})();
