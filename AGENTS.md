# Teleprompter Project - Architecture & Context for Agents

## Overview
This is a high-performance web-based teleprompter built entirely in Vanilla HTML, CSS, and JavaScript. It consists of an **Editor Mode** and a **Prompter Mode**. The application runs purely client-side without any backend dependencies, persisting user settings via `localStorage`.

## File Structure
- `index.html`: The single entry point. Contains the layout for both the configuration sidebar/editor and the full-screen teleprompter overlay (HUD).
- `style.css`: Handles all layout (via Flexbox), typography, and theming. Extensive use of CSS Custom Properties (`:root`) allows JavaScript to modify layout elements (like font size, line height, margins) in real-time.
- `script.js`: The core application logic. 
  - Manages state (speeds, fonts, UI variables).
  - Handles the `requestAnimationFrame` render loop for buttery smooth scrolling.
  - Implements a spatial collision engine to detect reading tags (e.g., `[speed:X]`) as they pass through the visual eye guide.

## Key Mechanisms
### 1. The Rendering Loop (`script.js: scrollLoop`)
The teleprompter does **not** rely on standard CSS transitions or generic browser scrolling algorithms. Instead, it uses `requestAnimationFrame` to compute a high-resolution time delta (`deltaTime`). It updates the absolute `state.scrollY` position and applies a hardware-accelerated `transform: translateY()` to the `.prompter-text` container. This ensures high frame rates and avoids the visual jitter associated with altering `top` or standard `scrollTop`.

### 2. State & UI Binding
All settings (font size, margin width, line height, theme, base speed) are stored in a centralized `state` object. `loadSettings()` fetches them from `localStorage` on load, and `saveSettings()` persists them. Each HTML input slider is bound to event listeners that immediately update `state`, save it, and call `updatePrompterStyles()` to reflect the change visually using CSS variables.

### 3. Spatial Tag Detection (`checkIntersectionAndMarkers`)
Users can add tags like `[speed:150]` inside the text. Instead of relying on time sequences or character counts, the engine uses `.getBoundingClientRect()` to calculate exactly when an HTML paragraph (`<p class="line">`) crosses the center "eye guide" line on the screen. 
- **Backward Scanning**: To prevent missed tags during fast scrolls or large leaps through the text, the engine finds the currently intersecting line and then scans *backward* up the DOM tree to locate the most recent valid `data-speed` marker. This guarantees the active speed is always accurate relative to the user's scroll position, even if the user manually jumps backward or forward.

### 4. Text Parsing
When launching the prompter, the raw text from the textarea is split by newlines. Each newline generates a `<p class="line">` element.
- **Empty Lines**: Rendered explicitly as `<p class="line blank-line" style="height: 1em">` to prevent layout collapse.
- **Markers**: The Regex `/[speed:\s*(\d+(?:\.\d+)?)\s*]/gi` strips the speed tags from the visual display but attaches their value to the `dataset.speed` attribute of the generated paragraph DOM element.
- **Paragraph Spacing**: The `.prompter-text p` elements have `margin-bottom: 0`. This is a critical design choice: it ensures that line spacing (`line-height`) applies identically both between wrapped lines of a single paragraph and between distinct physical paragraphs (hard returns).

## Development Workflow
- **Git Strategy**: All new features or bug fixes must be done on dedicated branches off `main`.
- **Pull Requests**: Changes must be submitted via GitHub PRs using `gh pr create`. The user (AlejandroPu) manually reviews, squashes, and merges PRs. 
- **Cleanup**: After PRs are merged, always pull `main` and clean up the old local branches.
- **Documentation Sync**: Keep the `.agy-files/walkthrough.md` and `implementation_plan.md` updated with the history of the work done.
