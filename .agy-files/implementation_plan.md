# Teleprompter project - Implementation Plan

## Historial de Cambios (Ya realizados)
1. **Versión Inicial:** Creación del motor del teleprompter con HTML, CSS, JS. Implementación de scroll por `requestAnimationFrame` y marcadores dinámicos `[speed:X]`.
2. **Corrección de Scrollbars:** Se forzó el contenedor flex a tener `min-height: 0` y se ajustó la barra de desplazamiento en Chrome/Edge.
3. **Corrección de Detección de Velocidad:** Se mejoró el algoritmo de detección espacial de líneas para no saltarse etiquetas de velocidad en altas frecuencias de actualización.
4. **Renombramiento:** Cambio oficial de nombre a "Teleprompter project" (Release v1.0.0).

## Nuevos Objetivos (v1.1)

El usuario ha solicitado realizar tres mejoras principales, las cuales se implementarán en distintos Pull Requests.

### 1. Eliminar Controladores Manuales de Velocidad Base
**Objetivo:** Simplificar la UI enfocando el control de velocidad en las etiquetas de texto.
**Detalles:**
- **[MODIFICAR]** `index.html`: Eliminar el slider de "Velocidad Base" de la barra lateral del editor y del HUD del teleprompter.
- **[MODIFICAR]** `index.html`: En lugar del slider de la barra lateral, añadir un pequeño bloque de texto con instrucciones de cómo usar `[speed:X]`.
- **[MODIFICAR]** `script.js`: Eliminar referencias a los sliders de velocidad, botones de `+` y `-`, y atajos de teclado de flechas arriba/abajo. El sistema usará una base interna de `100` a menos que haya una etiqueta.

### 2. Mejorar Slider de Ancho de Lectura
**Objetivo:** Mayor rango y precisión manual para el ancho.
**Detalles:**
- **[MODIFICAR]** `index.html`: Cambiar el slider `input-margin` para que su rango sea de `5` a `90`. Cambiar la etiqueta `<span id="val-margin">` por un campo numérico `<input type="number" id="input-margin-number">`.
- **[MODIFICAR]** `script.js`: Sincronizar el slider visual con el input numérico para que al cambiar uno, cambie el otro en tiempo real y aplique el nuevo ancho al layout.

### 3. Indicador Visual de Velocidad Actual
**Objetivo:** Proveer retroalimentación visual de la velocidad en el teleprompter.
**Detalles:**
- **[MODIFICAR]** `index.html`: Añadir un elemento span en el extremo izquierdo de `#eye-guide` para mostrar la velocidad actual.
- **[MODIFICAR]** `style.css`: Dar estilo al indicador para que sea pequeño y discreto.
- **[MODIFICAR]** `script.js`: Actualizar el valor de texto de este indicador siempre que se ejecute un cambio de velocidad o se vuelva a la base.

## User Review Required
> [!IMPORTANT]
> Confirmar que al quitar los sliders de velocidad manuales también se quitan los atajos de teclado (flechas arriba/abajo) para evitar conflictos.

## Plan de Pull Requests
- **PR 1:** Eliminación de sliders de velocidad + Instrucciones de etiquetas.
- **PR 2:** Actualización del control de Ancho de lectura.
- **PR 3:** Indicador de velocidad en la línea guía.
