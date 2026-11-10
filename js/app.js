document.addEventListener('DOMContentLoaded', () => {

  // 1. Toggle de Tema Claro / Oscuro con detección inicial de SO
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Asignar estado inicial según el sistema
  if (prefersDark) {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  } else {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeToggle.textContent = '☀️';
    }
  });

  // 2. Control del Drawer (Panel de Configuración)
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  function openDrawer() {
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  }

  openDrawerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer); // El panel lateral sí se puede cerrar al dar clic afuera

  // 3. Control del Modal de Acción Crítica (Modal Estricto)
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const confirmActionBtn = document.getElementById('confirm-action-btn');
  const modalServerId = document.getElementById('modal-server-id');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serverId = e.target.getAttribute('data-server');
      modalServerId.textContent = serverId;
      modal.classList.add('active');
      modalOverlay.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Cierre explícito solo mediante los botones correspondientes
  closeModalBtn?.addEventListener('click', closeModal);
  cancelModalBtn?.addEventListener('click', closeModal);
  
  // Se omite deliberadamente `modalOverlay.addEventListener('click', closeModal)` 
  // para forzar al usuario a tomar una decisión explícita (Cancelar o Confirmar).

  // 4. Cierre con tecla Escape (IxD 5D)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeDrawer();
    }
  });

  // 5. Simulación de Estado de Carga (Loading State)
  confirmActionBtn?.addEventListener('click', () => {
    confirmActionBtn.classList.add('loading');
    confirmActionBtn.disabled = true;

    setTimeout(() => {
      confirmActionBtn.classList.remove('loading');
      confirmActionBtn.disabled = false;
      closeModal();
      alert('Acción ejecutada correctamente.');
    }, 2000);
  });

  // 6. Responsive Sidebar Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

});