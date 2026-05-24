# Teleprompter project - Implementation Plan

## Change History (Already completed)
1. **Initial Release:** Creation of the teleprompter engine with HTML, CSS, JS. Implementation of `requestAnimationFrame` scrolling and dynamic `[speed:X]` markers.
2. **Scrollbar Fix:** The flex container was forced to have `min-height: 0` and the scrollbar was adjusted in Chrome/Edge.
3. **Speed Detection Fix:** The spatial line detection algorithm was improved to not skip speed tags at high refresh rates.
4. **Renaming:** Official name change to "Teleprompter project" (Release v1.0.0).

## New Objectives (v1.1)

The user has requested three main improvements, which will be implemented in separate Pull Requests.

### 1. Remove Manual Base Speed Controllers
**Objective:** Simplify the UI by focusing speed control on text tags.
**Details:**
- **[MODIFY]** `index.html`: Remove the "Base Speed" slider from the editor sidebar and the teleprompter HUD.
- **[MODIFY]** `index.html`: Instead of the sidebar slider, add a small text block with instructions on how to use `[speed:X]`.
- **[MODIFY]** `script.js`: Remove references to speed sliders, `+` and `-` buttons, and up/down arrow keyboard shortcuts. The system will use an internal base of `100` unless there is a tag.

### 2. Improve Reading Width Slider
**Objective:** Greater range and manual precision for the width.
**Details:**
- **[MODIFY]** `index.html`: Change the `input-margin` slider so its range is from `5` to `90`. Change the `<span id="val-margin">` label to a numeric field `<input type="number" id="input-margin-number">`.
- **[MODIFY]** `script.js`: Synchronize the visual slider with the numeric input so that when one changes, the other changes in real time and applies the new width to the layout.

### 3. Visual Indicator of Current Speed
**Objective:** Provide visual feedback of the speed in the teleprompter.
**Details:**
- **[MODIFY]** `index.html`: Add a span element on the far left of `#eye-guide` to show the current speed.
- **[MODIFY]** `style.css`: Style the indicator to make it small and discreet.
- **[MODIFY]** `script.js`: Update the text value of this indicator whenever a speed change is executed or it returns to the base.

## User Review Required
> [!IMPORTANT]
> Confirm that removing the manual speed sliders also removes the keyboard shortcuts (up/down arrows) to avoid conflicts.

## Pull Request Plan
- **PR 1:** Removal of speed sliders + Tag instructions.
- **PR 2:** Reading Width control update.
- **PR 3:** Speed indicator on the guide line.
