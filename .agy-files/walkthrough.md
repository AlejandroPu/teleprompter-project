# Teleprompter project - Walkthrough and Changelog

This document contains a summary of all changes applied to the project since its creation.

---

## Initial Release (v1.0.0)

### 1. Base Web Engine (HTML/CSS/JS)
- **Achievement:** The teleprompter application was built from scratch using a single HTML file, a stylesheet, and a separate JS script.
- **Details:** Supports insertion of `[speed:X]` markers, reading statistics, variable styles, and color themes.

### 2. Scrollbars and Layout Fix
- **Problem:** In Google Chrome, the side scrollbars would sometimes collapse or disappear due to the Flexbox engine.
- **Solution:** The `min-height: 0` attribute was forced in Flex containers and the pseudo-element `::-webkit-scrollbar` was modified in `style.css` to make the bar thicker and opaque.

### 3. Precision in Speed Markers `[speed:X]`
- **Problem:** Markers placed on a single line were sometimes ignored (skipped) by the guide line when the screen scrolled fast or on high-refresh-rate monitors.
- **Solution:** `checkIntersectionAndMarkers` in `script.js` was rewritten. Now the application remembers the last crossed line and safely scans backwards to always apply the last active tag, and even correctly restores speeds when scrolling the text backwards.

### 4. Official Renaming
- The project was internally updated to use the name "Teleprompter project" and the repository was renamed on GitHub.

---

## Interface Update (v1.1.0)
*(Currently in separate Pull Requests)*

### PR #3: Manual Speed Control Removal
- **Change:** Interactive sliders (both in the editor and the prompter HUD) that controlled the base speed were removed, as well as the `Up` and `Down` keyboard shortcuts.
- **Reason:** Simplify usage by promoting only direct control via text tags `[speed:X]`. Instructions were added to the editor interface.

### PR #4: Reading Width Control Improvement
- **Change:** The "Reading Width" control was modified. It now allows a wider range (from 5% to 90%) and the percentage is displayed in a small numeric input box (`<input type="number">`).
- **Reason:** Allow users to input the exact width they want by typing the number without relying solely on dragging with the mouse.

### PR #5: Speed Indicator in Prompter
- **Change:** A small text was added to the left side of the reading center line (`eye-guide`) that constantly displays the current speed number.
- **Reason:** Provide the user with real-time feedback so they know exactly when the system applied one of their pacing tags.

### PR #6 & #7: Uniform Line Spacing
- **Change:** A `Line-Height` control for the text was added. The CSS of paragraphs (`margin-bottom: 0`) was modified so that the spacing is consistent inside and outside the same text block. Arrows of number inputs were hidden.
- **Reason:** Provide precise control of vertical spacing.

### PR #8: Agent Documentation
- **Change:** Creation of the `AGENTS.md` file.
- **Reason:** Provide technical and architectural context (render loop, parsing, spatial engine) for future AI Agents.

### PR #9, #10 & #11: End of Document and Auto-Resume
- **Change:** End of document markers (`>> End of Document <<` and `- | - | -`) were added and are rendered dynamically. Mouse scrolling now stops the reading but automatically resumes after 0.5 seconds of releasing the wheel. The numeric speed indicator was moved up to avoid visual collisions with the center guide.
- **Reason:** Improve feedback for the end of reading and enhance the usability of manual backward scrolling.
