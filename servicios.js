document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.service-btn');
  const panels = document.querySelectorAll('.service-panel');

  if (!buttons.length || !panels.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Remover clase active de todos los botones y paneles
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      // 2. Activar el botón clickeado
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // 3. Activar el panel correspondiente
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
});
