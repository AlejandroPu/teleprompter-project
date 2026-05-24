# Teleprompter Pro - Walkthrough de Entrega

¡El teleprompter web de alto rendimiento ya está construido! A continuación, se detallan las características desarrolladas, el funcionamiento de la lógica de marcadores de velocidad y cómo iniciar la aplicación en tu navegador.

---

## Archivos del Proyecto

Todos los archivos han sido creados en la carpeta de tu proyecto:
* [index.html](file:///F:/HD%20Transcend/HD%20Mis%20Documentos/proyectos/programacion/AI/20260524%20Agy%20-%20teleprompter/index.html) - Estructura HTML de doble modo (Editor y Prompter).
* [style.css](file:///F:/HD%20Transcend/HD%20Mis%20Documentos/proyectos/programacion/AI/20260524%20Agy%20-%20teleprompter/style.css) - Sistema visual premium de estilo oscuro con desenfoque de fondo (glassmorphism), temas, y efectos espejo.
* [script.js](file:///F:/HD%20Transcend/HD%20Mis%20Documentos/proyectos/programacion/AI/20260524%20Agy%20-%20teleprompter/script.js) - Bucle de renderizado ultra-suave, detección de marcadores de velocidad y soporte para gestos e interactividad.

---

## ¿Cómo Ejecutar y Probar el Proyecto?

Dado que este proyecto consta puramente de archivos HTML, CSS y JS estándar, puedes ejecutarlo de varias maneras simples:

1. **Doble Clic (Directo)**: 
   Puedes ir al explorador de archivos en Windows y abrir el archivo [index.html](file:///F:/HD%20Transcend/HD%20Mis%20Documentos/proyectos/programacion/AI/20260524%20Agy%20-%20teleprompter/index.html) en tu navegador preferido (Google Chrome o Microsoft Edge recomendados).
2. **Servidor Local con VS Code o NPM**:
   Si tienes extensiones como *Live Server* en VS Code, puedes darle "Go Live" para iniciarlo bajo un servidor de desarrollo HTTP.

---

## Características de Lógica Clave

### 1. Motor de Desplazamiento Fluido e Independiente
El bucle de desplazamiento utiliza `requestAnimationFrame` y calcula un `deltaTime` dinámico en cada frame. Esto garantiza que la velocidad de scroll sea exactamente la misma sin importar la tasa de refresco de tu pantalla (60Hz, 120Hz o 144Hz), previniendo micro-tirones o aceleraciones indeseadas.

### 2. Marcadores Dinámicos de Velocidad: `[speed:X]`
* **Lectura**: Al pulsar "Iniciar Teleprompter", la aplicación escanea tu texto línea por línea en busca de la sintaxis `[speed:X]`.
* **Procesamiento**: Remueve el texto del marcador de la vista principal del prompter, pero añade un atributo `data-speed="X"` al contenedor del párrafo correspondiente. También agrega un sutil indicador visual `[v:X]` que te permite anticipar el cambio.
* **Ejecución**: Durante la reproducción, el sistema realiza una medición geométrica rápida. En cuanto el borde de la línea activa cruza el centro de la guía visual (Eye Guide), el teleprompter actualiza dinámicamente el ritmo de desplazamiento en tiempo real al valor indicado.

### 3. Control HUD Inteligente y Distracción Cero
* **Autocultamiento**: Cuando inicias el teleprompter, el panel HUD flotante de control de vidrio se desliza fuera de la pantalla tras 3 segundos de inactividad del mouse. Solo con mover el ratón o pausar la lectura, el HUD vuelve a aparecer mágicamente.
* **Barra de Progreso**: Incluye un cronómetro de tiempo transcurrido, tiempo restante y una barra de progreso que se sincroniza perfectamente con el avance del texto.
* **Gestos manuales**: Puedes usar la rueda del mouse en cualquier momento durante la reproducción para avanzar o retroceder manualmente por el guion. El movimiento se detendrá temporalmente para darte el control y reanudará el scroll automático cuando dejes de usar la rueda.

---

## Atajos de Teclado del Prompter

| Tecla | Acción |
| --- | --- |
| **Espacio** | Reproducir / Pausar el desplazamiento automático |
| **Esc** | Alternar entre el Editor y el modo Teleprompter |
| **R** o **r** | Reiniciar el teleprompter al principio |
| **Flecha Arriba (↑)** | Aumentar velocidad base (+10 px/s) |
| **Flecha Abajo (↓)** | Disminuir velocidad base (-10 px/s) |
| **Flecha Derecha (→)** | Aumentar tamaño de letra (+4px) |
| **Flecha Izquierda (←)** | Disminuir tamaño de letra (-4px) |
| **H** o **h** | Activar / Desactivar Giro Espejo Horizontal |
| **V** o **v** | Activar / Desactivar Giro Espejo Vertical |
| **F** o **f** | Alternar Pantalla Completa |
