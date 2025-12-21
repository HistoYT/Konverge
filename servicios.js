document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.service-card'));

  if (!cards.length) return;

  // If IntersectionObserver not supported, reveal all immediately with stagger
  if (!('IntersectionObserver' in window)) {
    cards.forEach((c, i) => {
      c.style.setProperty('--delay', `${i * 0.09}s`);
      c.classList.add('in-view');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const idx = cards.indexOf(el);
      el.style.setProperty('--delay', `${idx * 0.08}s`);

      if (entry.isIntersecting) {
        el.classList.add('in-view');
        el.classList.remove('exiting');
      } else {
        el.classList.remove('in-view');
        el.classList.add('exiting');
      }
    });
  }, { threshold: 0.18 });

  cards.forEach(c => observer.observe(c));

  // Add subtle tilt / parallax on pointer move for fine pointers (desktop)
  if (window.matchMedia('(pointer: fine)').matches) {
    cards.forEach(card => {
      const inner = card.querySelector('.service-card-inner');
      if (!inner) return;

      let raf = null;

      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width; // 0..1
        const py = (e.clientY - rect.top) / rect.height; // 0..1
        const rx = (py - 0.5) * -7; // rotateX
        const ry = (px - 0.5) * 10; // rotateY

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(18px)`;
        });
      }

      function onLeave() {
        if (raf) cancelAnimationFrame(raf);
        inner.style.transform = '';
      }

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      card.addEventListener('pointercancel', onLeave);
      card.addEventListener('focus', () => { inner.style.transform = 'translateZ(8px)'; });
      card.addEventListener('blur', () => { inner.style.transform = ''; });
    });
  }
});
