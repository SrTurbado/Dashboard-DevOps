# CloudMonitor SPA - Panel de Control Responsivo

Práctica integral desarrollada para la materia de **Diseño de Interfaces**, construida con un enfoque estricto en los principios de UX, las 5 dimensiones del Diseño de Interacción (IxD), maquetación nativa con CSS Grid y Flexbox, y arquitectura modular.

---

## 🚀 Características Principales

- **Arquitectura de Interfaz en Tres Zonas:**
  - *Zona 1:* Header de navegación superior fijo y Sidebar deslizante responsivo (*Off-canvas* con animación fluida).
  - *Zona 2:* Contenido dinámico principal estructurado bajo el patrón **Bento Grid** y tablas con desplazamiento horizontal nativo.
  - *Zona 3:* Drawer lateral de configuración y Modal centralizado de confirmación para acciones críticas destructivas.
- **Restricción Técnica Nativa:** Desarrollado íntegramente con HTML5 semántico, CSS3 nativo y JavaScript Vanilla (sin uso de frameworks CSS prefabricados como Bootstrap o Tailwind).
- **Visualización de Datos:** Integración de gráficas interactivas mediante **Chart.js** sobre etiquetas nativas `<canvas>` (Líneas, Doughnut/Pastel y Barras).
- **Modo Oscuro Nativo:** Conmutable de forma automática según la preferencia del sistema operativo (`prefers-color-scheme`) y controlado manualmente con un botón interactivo.
- **Gestión Rigurosa de 5 Estados Visuales:** Aplicación explícita en botones e inputs para los estados *Default, Hover, Focus (accesible), Disabled y Loading* (con indicador de carga asíncrono).

---

## 📂 Estructura de Archivos del Proyecto

```text
dashboard-spa/
├── index.html          # Estructura semántica principal (HTML5)
├── css/
│   ├── variables.css   # Variables globales y paleta de colores dinámicamente conmutables
│   ├── layout.css      # Maquetación macro, Mobile-First, Grid y Flexbox
│   └── components.css  # Estilos específicos de tarjetas, modales, formularios y tablas
└── js/
    └── app.js          # Lógica de interacción (Modo oscuro, modales, drawer, atajo Escape y Chart.js)
```

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

Para probar el funcionamiento del dashboard en tu equipo, sigue estos sencillos pasos:

1. **Clonar o descargar** este repositorio en tu computadora.
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Asegurarte de tener instalada la extensión **Live Server** (o cualquier servidor local equivalente).
4. Hacer clic derecho sobre el archivo `index.html` y seleccionar **"Open with Live Server"** (o ejecutarlo mediante un servidor local como `http-server` o la extensión de VS Code).

---

## 📐 Cumplimiento de las 5 Dimensiones de IxD

1. **1D - Palabras:** Microcopia concisa y clara en avisos, formularios y rutas de navegación (*Breadcrumbs*).
2. **2D - Representaciones Visuales:** Iconografía funcional (símbolos universales, alertas, selector de temas) y jerarquía tipográfica limpia.
3. **3D - Objetos Físicos:** Zonas táctiles ergonómicas (mínimo 44x44px) adaptadas tanto para dispositivos móviles como para escritorio.
4. **4D - Tiempo:** Animaciones de transición fluidas (250ms), renderizado de gráficas y estados de carga asíncronos controlados.
5. **5D - Comportamiento:** Reglas operativas estrictas (cierre de modales mediante tecla `Escape`, bloqueo de clics externos en diálogos críticos y adaptación inteligente del menú lateral).