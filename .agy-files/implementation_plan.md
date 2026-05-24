# Plan para Construir un Teleprompter Web Premium

Este plan detalla el diseño y la implementación de un teleprompter web interactivo, responsivo y de alto rendimiento. Contará con funciones profesionales como control de velocidad preciso, modo espejo (mirroring), marcadores de lectura visuales y **cambios de velocidad dinámicos incrustados en el texto**.

---

## Puntos Clave del Diseño

### 1. Control de Velocidad Dinámico mediante Marcadores en el Texto
* El editor permitirá incrustar marcadores de velocidad entre corchetes, por ejemplo `[50]`, `[120]` (representando la velocidad).
* El motor de renderizado analizará estos bloques y, cuando esa línea específica del texto alcance la guía de lectura (o una zona designada), la velocidad general de desplazamiento se ajustará automáticamente a ese nuevo valor.
* Los marcadores se mostrarán de forma sutil en el modo de lectura (o podrán ocultarse completamente, según prefieras) para no interrumpir el flujo.

### 2. Panel de Control Flotante (Glassmorphism UI)
* Un diseño oscuro de alta gama que flota sobre la pantalla y se oculta al iniciar la lectura para evitar distracciones.
* Controles para:
  * **Velocidad de desplazamiento base** (y anulación manual).
  * **Tamaño de letra** y **Márgenes** (ancho del texto).
  * **Modo Espejo** (Giro horizontal y opcionalmente vertical).
  * **Selector de Temas y Fuente** (Inter, Roboto Mono, etc.).

### 3. Vista de Lectura y Guía Visual
* **Marcador de Enfoque (Eye Guide)**: Una línea o área destacada en el centro de la pantalla que ayuda al lector a mantener la mirada fija.
* **Barra de Progreso**.

### 4. Editor de Scripts
* Zona para escribir, pegar texto y ajustar marcadores de velocidad.
* Acceso rápido para alternar entre edición y modo teleprompter (doble clic en pantalla o tecla `Esc`).
* **Persistencia Local**: El script y la configuración se guardarán automáticamente en `localStorage`.

---

## Preguntas para el Usuario

1. **Estructura del Proyecto**: ¿Prefieres que lo construyamos usando **Vite + Vanilla JS** (recomendado para un proyecto estructurado y modular) o un modelo simple de **archivos estáticos puros** (`index.html`, `style.css` y `script.js` sin proceso de compilación ni dependencias)?
2. **Sintaxis de Velocidad**: Para los marcadores, ¿te parece bien usar un formato simple como `[100]` o prefieres algo más explícito como `[v:100]`?

---

## Plan de Verificación
1. **Validación de Velocidad Dinámica**: Insertar varios marcadores de velocidad en un texto largo y verificar que el cambio ocurre de forma fluida exactamente cuando el texto pasa por el punto de lectura.
2. **Modo Espejo y Visuales**: Asegurar que los cálculos de intersección y posición de los marcadores sigan funcionando sin importar el tamaño de la fuente, el escalado, o si la pantalla está volteada.
3. **Persistencia**: Verificar que tras recargar la página todo el progreso, el script y la velocidad se mantengan.
