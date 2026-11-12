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

 // 6. Responsive Sidebar Toggle (Móvil y Escritorio)
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  menuToggle?.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
      // En escritorio: Alternamos la clase que lo oculta
      sidebar.classList.toggle('hide-desktop');
    } else {
      // En móvil: Alternamos la clase que lo muestra
      sidebar.classList.toggle('show');
    }
  });

  // Limpiar clases si el usuario cambia el tamaño de la ventana de móvil a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('show');
    } else {
      sidebar.classList.remove('hide-desktop');
    }
  });
// ==========================================
  // CONFIGURACIÓN DE GRÁFICAS (CHART.JS)
  // ==========================================

  // Opciones comunes para modo oscuro/claro
  Chart.defaults.color = '#64748b';
  Chart.defaults.font.family = "system-ui, -apple-system, sans-serif";

  // 1. Gráfica de CPU (Línea de Área)
  const ctxCpu = document.getElementById('cpuChart').getContext('2d');
  new Chart(ctxCpu, {
    type: 'line',
    data: {
      labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
      datasets: [{
        label: 'Carga CPU (%)',
        data: [35, 42, 55, 60, 48, 50, 42],
        borderColor: '#2563eb', // primary-color
        backgroundColor: 'rgba(37, 99, 235, 0.15)', // primary-color transparente
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Curva suave
        pointBackgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });

  // 2. Gráfica de RAM (Doughnut / Pastel hueco)
  const ctxRam = document.getElementById('ramChart').getContext('2d');
  new Chart(ctxRam, {
    type: 'doughnut',
    data: {
      labels: ['RAM Usada', 'RAM Libre'],
      datasets: [{
        data: [12.4, 3.6],
        backgroundColor: ['#d97706', '#e2e8f0'], // warning-color y border-color
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%', // Tamaño del hueco central
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // 3. Gráfica de Red (Barras Multi-Serie)
  const ctxNetwork = document.getElementById('networkChart').getContext('2d');
  new Chart(ctxNetwork, {
    type: 'bar',
    data: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      datasets: [
        {
          label: 'Descarga (Rx)',
          data: [350, 420, 310, 500, 620],
          backgroundColor: '#16a34a', // success-color
          borderRadius: 4
        },
        {
          label: 'Subida (Tx)',
          data: [200, 250, 180, 290, 310],
          backgroundColor: '#dc2626', // danger-color
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});