# Teleprompter project 🎙️

An interactive, modern, and high-performance web teleprompter designed for speakers, content creators, and live presentations. This project was created with **Antigravity CLI**.

🔗 **[Try the live application here](https://alejandropu.github.io/teleprompter-project/)**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Technologies](https://img.shields.io/badge/technologies-HTML%20%7C%20CSS%20%7C%20JS-brightgreen.svg)

---

## ✨ Key Features

*   **Ultra-Smooth Scrolling**: Loop based on `requestAnimationFrame` independent of the monitor's refresh rate (60Hz, 120Hz, 144Hz).
*   **Dynamic Speed Markers `[speed:X]`**: Write tags in your script (e.g. `[speed:120]`) to automatically adapt the speed when the text reaches the reading guide.
*   **Floating Control Panel (Glassmorphism)**: Translucent and modern interface with quick slider controls.
*   **Clean Reading Mode**: The control panel automatically hides after 3 seconds of inactivity during playback to avoid distractions.
*   **Professional Mirror Effect**: Horizontal and vertical text inversion for compatibility with physical teleprompter hardware.
*   **Visual Focus Guide**: Different styles of guide lines (with side arrows or color bands) so you don't lose track of your reading.
*   **Auto-Save**: Saves your script and preferences directly in the browser's `localStorage`.

---

## ⌨️ Keyboard Shortcuts (Reading Mode)

| Key | Action |
| :--- | :--- |
| **Space** | Play / Pause scrolling |
| **Esc** | Toggle between Editor and Teleprompter |
| **R** / **r** | Restart reading to the beginning |
| **↑** / **↓** | Increase / Decrease base speed (+10 / -10 px/s) |
| **→** / **←** | Increase / Decrease font size (+4 / -4 px) |
| **H** / **h** | Toggle Horizontal Mirror |
| **V** / **v** | Toggle Vertical Mirror |
| **F** / **f** | Toggle Fullscreen |

---

## 🚀 Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/AlejandroPu/teleprompter-project.git
    ```
2.  Open the `index.html` file directly in your browser (Google Chrome or Microsoft Edge recommended).
3.  Type or paste your text in the editor, add speed markers if you want, and press **Start Teleprompter**.
