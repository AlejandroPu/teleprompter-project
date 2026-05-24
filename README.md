# Teleprompter project 🎙️

Un teleprompter web interactivo, moderno y de alto rendimiento, diseñado para oradores, creadores de contenido y presentaciones en vivo. Este proyecto fue creado con **Antigravity CLI**.

🔗 **[Prueba la aplicación en vivo aquí](https://alejandropu.github.io/teleprompter-project/)**

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Tecnologías](https://img.shields.io/badge/tecnologías-HTML%20%7C%20CSS%20%7C%20JS-brightgreen.svg)

---

## ✨ Características Principales

*   **Desplazamiento Ultra-Suave**: Bucle basado en `requestAnimationFrame` independiente de la tasa de refresco del monitor (60Hz, 120Hz, 144Hz).
*   **Marcadores de Velocidad Dinámicos `[speed:X]`**: Escribe marcas en tu guion (ej. `[speed:120]`) para adaptar automáticamente la velocidad cuando el texto llegue a la guía de lectura.
*   **Panel de Control Flotante (Glassmorphism)**: Interfaz translúcida y moderna con controles deslizantes rápidos.
*   **Modo de Lectura Limpio**: El panel de control se oculta automáticamente tras 3 segundos de inactividad durante la reproducción para no generar distracciones.
*   **Efecto Espejo Profesional**: Inversión horizontal y vertical del texto para compatibilidad con hardware de teleprompter físico.
*   **Guía Visual de Enfoque**: Diferentes estilos de líneas guía (con flechas laterales o bandas de color) para no perder el hilo de la lectura.
*   **Guardado Automático**: Guarda tu guion y preferencias directamente en el `localStorage` del navegador.

---

## ⌨️ Atajos de Teclado (Modo Lectura)

| Tecla | Acción |
| :--- | :--- |
| **Espacio** | Reproducir / Pausar desplazamiento |
| **Esc** | Alternar entre el Editor y el Teleprompter |
| **R** / **r** | Reiniciar lectura al principio |
| **↑** / **↓** | Aumentar / Disminuir velocidad base (+10 / -10 px/s) |
| **→** / **←** | Aumentar / Disminuir tamaño de fuente (+4 / -4 px) |
| **H** / **h** | Alternar giro Espejo Horizontal |
| **V** / **v** | Alternar giro Espejo Vertical |
| **F** / **f** | Alternar pantalla completa |

---

## 🚀 ¿Cómo Empezar?

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/AlejandroPu/teleprompter-project.git
    ```
2.  Abre el archivo `index.html` directamente en tu navegador (Google Chrome o Microsoft Edge recomendados).
3.  Escribe o pega tu texto en el editor, añade marcadores de velocidad si lo deseas y presiona **Iniciar Teleprompter**.
