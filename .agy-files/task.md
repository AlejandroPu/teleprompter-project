# Teleprompter Checklist

- [x] Crear estructura base de `index.html` (editor de texto, modo teleprompter y controles).
- [x] Crear sistema de estilos en `style.css` (estilo premium oscuro, glassmorphism, modo espejo y animaciones).
- [x] Implementar la lógica base en `script.js`:
  - [x] Persistencia de texto y configuraciones en `localStorage`.
  - [x] Control de Play/Pause y bucle de desplazamiento ultra-suave con `requestAnimationFrame`.
  - [x] Controles deslizantes para velocidad, tamaño de fuente y márgenes.
  - [x] Atajos de teclado (Espacio, Flechas, Esc, F11).
  - [x] Giro espejo horizontal y vertical de la pantalla de lectura.
- [x] Desarrollar el motor de marcadores de velocidad `[speed:X]`:
  - [x] Parsear el texto para identificar y marcar las líneas que contienen cambios de velocidad.
  - [x] Detectar la intersección de cada línea marcada con la línea guía de lectura (Eye Guide).
  - [x] Cambiar la velocidad de scroll del teleprompter dinámicamente cuando el marcador pase por la guía.
- [x] Diseñar UI y UX pulida:
  - [x] Cuenta regresiva visual (3, 2, 1) antes de arrancar.
  - [x] Ocultamiento automático de paneles de control por inactividad de ratón al reproducir.
  - [x] Indicador de progreso de lectura y estimador de tiempo restante.
- [x] Verificar y testear.
