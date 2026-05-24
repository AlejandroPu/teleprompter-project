# Teleprompter project - Walkthrough y Registro de Cambios

Este documento contiene el resumen de todos los cambios aplicados en el proyecto desde su creación.

---

## Lanzamiento Inicial (v1.0.0)

### 1. Motor Web Base (HTML/CSS/JS)
- **Logro:** Se creó la aplicación de teleprompter desde cero en un único archivo HTML, su hoja de estilos y script JS separados.
- **Detalles:** Soporta inserción de marcadores `[speed:X]`, estadísticas de lectura, estilos variables y temas de color.

### 2. Corrección de Scrollbars y Diseño
- **Problema:** En Google Chrome, las barras de desplazamiento laterales a veces colapsaban o desaparecían debido al motor Flexbox.
- **Solución:** Se forzó el atributo `min-height: 0` en los contenedores Flex y se modificaron los estilos del pseudo-elemento `::-webkit-scrollbar` en `style.css` para hacer la barra más gruesa y opaca.

### 3. Precisión en los Marcadores de Velocidad `[speed:X]`
- **Problema:** Los marcadores colocados en líneas solas a veces eran ignorados (saltados) por la línea guía cuando la pantalla se desplazaba rápido o en monitores de alta frecuencia.
- **Solución:** Se reescribió `checkIntersectionAndMarkers` en `script.js`. Ahora la aplicación memoriza la última línea cruzada y escanea hacia atrás de forma segura para aplicar siempre la última etiqueta activa, e incluso restaura las velocidades correctamente al desplazar el texto hacia atrás.

### 4. Renombramiento Oficial
- Se actualizó internamente el proyecto para usar el nombre "Teleprompter project" y se renombró el repositorio en GitHub.

---

## Actualización de Interfaz (v1.1.0)
*(Actualmente en Pull Requests separados)*

### PR #3: Eliminación de Control de Velocidad Manual
- **Cambio:** Se eliminaron los sliders interactivos (tanto en el editor como en el HUD del prompter) que controlaban la velocidad base, así como los atajos de teclado `Up` y `Down`. 
- **Razón:** Simplificar el uso promoviendo únicamente el control directo mediante las etiquetas de texto `[speed:X]`. Se agregaron instrucciones al respecto en la interfaz del editor.

### PR #4: Mejora en el Control de Ancho de Lectura
- **Cambio:** Se cambió el control "Ancho de Lectura". Ahora permite un rango mayor (desde 5% hasta 90%) y el porcentaje se muestra en una pequeña caja de entrada numérica (`<input type="number">`).
- **Razón:** Permitir a los usuarios ingresar el ancho exacto que deseen tecleando el número sin depender únicamente del arrastre del ratón.

### PR #5: Indicador de Velocidad en el Prompter
- **Cambio:** Se añadió un pequeño texto al lado izquierdo de la línea central de lectura (`eye-guide`) que muestra en todo momento el número de la velocidad actual.
- **Razón:** Ofrecer al usuario una retroalimentación en tiempo real para que sepa exactamente cuándo el sistema aplicó una de sus etiquetas de cambio de ritmo.
