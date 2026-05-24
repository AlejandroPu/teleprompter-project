/* ==========================================================================
   TELEPROMPTER PROJECT - CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // ==========================================
  // 1. STATE VARIABLES
  // ==========================================
  const state = {
    text: '',
    isScrolling: false,
    baseSpeed: 100,      // Pixels per second
    currentSpeed: 100,   // Active speed (can be modified by speed markers)
    fontSize: 48,        // Pixels
    lineHeight: 1.5,
    marginWidth: 65,     // Percentage of viewport width
    fontFamily: 'font-inter',
    mirrorH: false,
    mirrorV: false,
    guideType: 'guide-line',
    theme: 'dark',
    
    // Scroll variables
    scrollY: 0,
    maxScrollY: 0,
    lastTime: 0,
    animationFrameId: null,
    
    // Trackers
    lastAppliedSpeedElement: null,
    lastActiveLineElement: null,
    
    // Reading calculations
    countdownDuration: 3, // Seconds
    isCountingDown: false
  };

  // Default script text if none in localStorage
  const DEFAULT_SCRIPT = `[speed:80]
Welcome to Teleprompter project!

This is a modern, high-definition web teleprompter designed for flawless speeches, presentations, and video recordings.

[speed:120]
This line is now scrolling at a speed of 120, a bit faster. You can see the visual speed marker [v:120] on the left if you wish to monitor your current pace.

[speed:180]
Attention! We just crossed the 180 speed marker. This part of the speech is read at a fairly fast pace. It's ideal for high-energy sections or if you are short on time.

[speed:60]
And we gradually slow down back to 60. This allows you to make a dramatic pause, breathe, and speak with complete tranquility and emphasis.

[speed:100]
The teleprompter system automatically saves your script and settings in your browser's local storage.

Try pressing the [Space] key to pause or resume, the [Up] or [Down] arrows to manually change the base speed, or the [Esc] key to return to the editor.

Enjoy your presentation!`;

  // ==========================================
  // 2. DOM ELEMENTS
  // ==========================================
  // Screens
  const editorScreen = document.getElementById('editor-screen');
  const prompterScreen = document.getElementById('prompter-screen');

  // Editor Inputs & Controls
  const scriptInput = document.getElementById('script-input');
  const btnStart = document.getElementById('btn-start');
  const btnShortcutsHelper = document.getElementById('btn-shortcuts-helper');
  const selectFont = document.getElementById('select-font');
  const selectGuide = document.getElementById('select-guide');
  
  // Sidebar sliders
  const inputFontSize = document.getElementById('input-font-size');
  const valFontSize = document.getElementById('val-font-size');
  const inputLineHeight = document.getElementById('input-line-height');
  const valLineHeight = document.getElementById('val-line-height');
  const inputMargin = document.getElementById('input-margin');
  const valMargin = document.getElementById('val-margin');
  
  // Mirror buttons
  const btnMirrorH = document.getElementById('btn-mirror-h');
  const btnMirrorV = document.getElementById('btn-mirror-v');
  
  // Theme selection buttons
  const themeBtns = document.querySelectorAll('.theme-btn');
  
  // Stats
  const statWords = document.getElementById('stat-words');
  const statTime = document.getElementById('stat-time');

  // Prompter Elements
  const prompterViewport = document.getElementById('prompter-viewport');
  const prompterTextContainer = document.getElementById('prompter-text-container');
  const prompterText = document.getElementById('prompter-text');
  const eyeGuide = document.getElementById('eye-guide');
  const guideSpeedIndicator = document.getElementById('guide-speed-indicator');
  const countdownOverlay = document.getElementById('countdown-overlay');
  const countdownNumber = document.getElementById('countdown-number');

  // HUD Elements
  const prompterHud = document.getElementById('prompter-hud');
  const hudBtnPlay = document.getElementById('hud-btn-play');
  const hudPlayIcon = document.getElementById('hud-play-icon');
  const hudBtnBack = document.getElementById('hud-btn-back');
  const hudBtnRestart = document.getElementById('hud-btn-restart');
  const hudBtnFullscreen = document.getElementById('hud-btn-fullscreen');
  const hudBtnMirrorH = document.getElementById('hud-btn-mirror-h');
  const hudBtnMirrorV = document.getElementById('hud-btn-mirror-v');
  
  const hudFontSizeSlider = document.getElementById('hud-font-size');
  const hudValFontSize = document.getElementById('hud-val-font-size');
  const hudProgressBar = document.getElementById('hud-progress-bar');
  
  const hudTimeElapsed = document.getElementById('hud-time-elapsed');
  const hudTimeRemaining = document.getElementById('hud-time-remaining');
  const hudMarkerSpeedInfo = document.getElementById('hud-marker-speed-info');

  // Modal Shortcuts Elements
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCloseModalOk = document.getElementById('btn-close-modal-ok');

  // HUD hiding timer variables
  let hudTimeoutId = null;

  // ==========================================
  // 3. STORAGE & CONFIG LOADING
  // ==========================================
  function loadSettings() {
    state.text = localStorage.getItem('tp_script') || DEFAULT_SCRIPT;
    state.baseSpeed = parseInt(localStorage.getItem('tp_base_speed')) || 100;
    state.currentSpeed = state.baseSpeed;
    state.fontSize = parseInt(localStorage.getItem('tp_font_size')) || 48;
    state.lineHeight = parseFloat(localStorage.getItem('tp_line_height')) || 1.5;
    state.marginWidth = parseInt(localStorage.getItem('tp_margin_width')) || 65;
    state.fontFamily = localStorage.getItem('tp_font_family') || 'font-inter';
    state.mirrorH = localStorage.getItem('tp_mirror_h') === 'true';
    state.mirrorV = localStorage.getItem('tp_mirror_v') === 'true';
    state.guideType = localStorage.getItem('tp_guide_type') || 'guide-line';
    state.theme = localStorage.getItem('tp_theme') || 'dark';

    // Set UI elements
    scriptInput.value = state.text;
    
    
    inputFontSize.value = state.fontSize;
    hudFontSizeSlider.value = state.fontSize;
    valFontSize.textContent = `${state.fontSize}px`;
    hudValFontSize.textContent = `${state.fontSize}px`;
    
    inputLineHeight.value = state.lineHeight;
    valLineHeight.textContent = state.lineHeight.toFixed(1);
    
    inputMargin.value = state.marginWidth;
    valMargin.value = state.marginWidth;
    
    selectFont.value = state.fontFamily;
    selectGuide.value = state.guideType;
    
    // Apply initial mirror classes
    updateMirrorState();
    
    // Apply theme
    applyTheme(state.theme);
    
    // Calculate statistics
    calculateStats();
  }

  function saveSettings() {
    localStorage.setItem('tp_script', state.text);
    localStorage.setItem('tp_font_size', state.fontSize);
    localStorage.setItem('tp_line_height', state.lineHeight);
    localStorage.setItem('tp_margin_width', state.marginWidth);
    localStorage.setItem('tp_font_family', state.fontFamily);
    localStorage.setItem('tp_mirror_h', state.mirrorH);
    localStorage.setItem('tp_mirror_v', state.mirrorV);
    localStorage.setItem('tp_guide_type', state.guideType);
    localStorage.setItem('tp_theme', state.theme);
  }

  function applyTheme(themeName) {
    document.body.className = '';
    document.body.classList.add(`theme-${themeName}`);
    state.theme = themeName;
    
    // Update theme selectors UI
    themeBtns.forEach(btn => {
      if (btn.dataset.theme === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 4. TEXT PROCESSING & CALCULATIONS
  // ==========================================
  function calculateStats() {
    const text = scriptInput.value;
    // Strip speed markers for word counts
    const cleanText = text.replace(/\[speed:\s*\d+(?:\.\d+)?\s*\]/g, '').trim();
    
    if (cleanText === '') {
      statWords.textContent = '0 words';
      statTime.textContent = '0:00 min reading time';
      return;
    }
    
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Average reading speed is around 130 - 150 words per minute.
    const averageWPM = 140;
    const readingTimeSec = (wordCount / averageWPM) * 60;
    const minutes = Math.floor(readingTimeSec / 60);
    const seconds = Math.floor(readingTimeSec % 60);
    
    statWords.textContent = `${wordCount} word${wordCount !== 1 ? 's' : ''}`;
    statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} min reading time`;
  }

  // Parse raw text and build HTML elements for the prompter screen
  function parseTextToPrompter() {
    const rawText = scriptInput.value;
    prompterText.innerHTML = '';
    
    // Split into paragraphs (or lines)
    const rawParagraphs = rawText.split('\n');
    
    rawParagraphs.forEach((para, index) => {
      para = para.trim();
      if (para === '') {
        // Render blank lines as small spacing containers
        const blankLine = document.createElement('p');
        blankLine.className = 'line blank-line';
        blankLine.style.height = '1em';
        prompterText.appendChild(blankLine);
        return;
      }
      
      // Check for inline speed change marker [speed:120]
      const speedRegex = /\[speed:\s*(\d+(?:\.\d+)?)\s*\]/gi;
      const match = speedRegex.exec(para);
      
      const lineElement = document.createElement('p');
      lineElement.className = 'line';
      lineElement.id = `line-${index}`;
      
      if (match) {
        const speedVal = parseFloat(match[1]);
        lineElement.dataset.speed = speedVal;
        
        // Remove the speed marker text from displayed reading text
        let cleanText = para.replace(speedRegex, '').trim();
        
        if (cleanText === '') {
          // It's a line that ONLY contains a speed marker
          lineElement.classList.add('speed-marker-only');
          lineElement.style.height = '1px';
          lineElement.style.margin = '0';
          lineElement.style.padding = '0';
          lineElement.style.opacity = '0';
        } else {
          // Line contains both speed marker and reading text
          // Render a small beautiful badge inside the line to indicate speed change
          const badge = document.createElement('span');
          badge.className = 'speed-marker-span';
          badge.textContent = `[v:${speedVal}]`;
          
          lineElement.appendChild(badge);
          lineElement.appendChild(document.createTextNode(cleanText));
        }
      } else {
        // Plain text line
        lineElement.appendChild(document.createTextNode(para));
      }
      
      prompterText.appendChild(lineElement);
    });
    
    // End of Document Markers
    const endSpacer = document.createElement('p');
    endSpacer.className = 'line blank-line';
    endSpacer.style.height = '2em';
    prompterText.appendChild(endSpacer);
    
    const endDocLine = document.createElement('p');
    endDocLine.className = 'line end-marker';
    endDocLine.textContent = '>> End of Document <<';
    endDocLine.style.textAlign = 'center';
    endDocLine.style.opacity = '0.5';
    prompterText.appendChild(endDocLine);
    
    const dashLine = document.createElement('p');
    dashLine.className = 'line end-marker';
    dashLine.textContent = '- | - | -';
    dashLine.style.textAlign = 'center';
    dashLine.style.opacity = '0.5';
    prompterText.appendChild(dashLine);
    
    const dashLine2 = document.createElement('p');
    dashLine2.className = 'line end-marker';
    dashLine2.textContent = '- | - | -';
    dashLine2.style.textAlign = 'center';
    dashLine2.style.opacity = '0.5';
    prompterText.appendChild(dashLine2);

    const dashLine3 = document.createElement('p');
    dashLine3.className = 'line end-marker';
    dashLine3.textContent = '- | - | -';
    dashLine3.style.textAlign = 'center';
    dashLine3.style.opacity = '0.5';
    prompterText.appendChild(dashLine3);

    // Update prompter custom styles
    updatePrompterStyles();
  }

  function updatePrompterStyles() {
    document.documentElement.style.setProperty('--prompter-font-size', `${state.fontSize}px`);
    document.documentElement.style.setProperty('--prompter-line-height', state.lineHeight);
    document.documentElement.style.setProperty('--prompter-margin-width', `${state.marginWidth}%`);
    
    // Change font family classes
    prompterViewport.className = 'prompter-viewport';
    prompterViewport.classList.add(state.fontFamily);
    
    // Update guide type classes
    eyeGuide.className = 'eye-guide';
    eyeGuide.classList.add(state.guideType);
  }

  // ==========================================
  // 5. MIRRORING
  // ==========================================
  function updateMirrorState() {
    // Sync HUD button states
    if (state.mirrorH) {
      btnMirrorH.classList.add('active');
      hudBtnMirrorH.classList.add('active');
    } else {
      btnMirrorH.classList.remove('active');
      hudBtnMirrorH.classList.remove('active');
    }
    
    if (state.mirrorV) {
      btnMirrorV.classList.add('active');
      hudBtnMirrorV.classList.add('active');
    } else {
      btnMirrorV.classList.remove('active');
      hudBtnMirrorV.classList.remove('active');
    }

    // Apply mirror CSS transforms to the prompter text container
    prompterTextContainer.className = '';
    if (state.mirrorH && state.mirrorV) {
      prompterTextContainer.classList.add('mirror-hv');
    } else if (state.mirrorH) {
      prompterTextContainer.classList.add('mirror-h');
    } else if (state.mirrorV) {
      prompterTextContainer.classList.add('mirror-v');
    }
  }

  // ==========================================
  // 6. PROMPTER ENGINE & SCROLL LOOP
  // ==========================================
  function calculateMaxScroll() {
    // Force DOM layouts to update so scroll measurements are accurate
    const containerHeight = prompterText.scrollHeight;
    
    // Max scrollable is the actual height of the text content
    // padded elements are set using paddingTop and paddingBottom
    const guideY = window.innerHeight * 0.35; // Matches typical eye guide line position
    document.documentElement.style.setProperty('--guide-y', `${guideY}px`);
    
    // We add padding-top equal to guideY and padding-bottom equal to screen - guideY.
    // The scrollable range of the content is containerHeight - paddingTop - paddingBottom
    const paddingTop = guideY;
    const paddingBottom = window.innerHeight - guideY;
    
    state.maxScrollY = containerHeight - paddingTop - paddingBottom;
    if (state.maxScrollY < 0) state.maxScrollY = 0;
  }

  function startPrompter() {
    state.isScrolling = true;
    state.lastTime = performance.now();
    hudPlayIcon.setAttribute('data-lucide', 'pause');
    lucide.createIcons();
    
    // Hide HUD after small delay
    resetHudTimeout();
    
    state.animationFrameId = requestAnimationFrame(scrollLoop);
  }

  function pausePrompter() {
    state.isScrolling = false;
    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
      state.animationFrameId = null;
    }
    hudPlayIcon.setAttribute('data-lucide', 'play');
    lucide.createIcons();
    showHud();
  }

  function togglePlayPause() {
    if (state.isCountingDown) return;
    
    if (state.isScrolling) {
      pausePrompter();
    } else {
      // If we are at the very end, restart first
      if (state.scrollY >= state.maxScrollY - 2) {
        restartPrompter();
      }
      startPrompter();
    }
  }

  function restartPrompter() {
    pausePrompter();
    state.scrollY = 0;
    state.currentSpeed = state.baseSpeed;
    state.lastAppliedSpeedElement = null;
    state.lastActiveLineElement = null;
    
    // Clear highlights
    const lines = prompterText.querySelectorAll('.line');
    lines.forEach(l => l.classList.remove('active-line'));
    
    // Apply position reset
    prompterText.style.transform = `translateY(0px)`;
    
    // Reset HUD details
    updateHudStats();
    hudMarkerSpeedInfo.classList.remove('visible');
    hudMarkerSpeedInfo.textContent = 'Marker: None';
    guideSpeedIndicator.textContent = state.baseSpeed;
  }

  // The rendering frame loop
  function scrollLoop(timestamp) {
    if (!state.isScrolling) return;
    
    if (!state.lastTime) state.lastTime = timestamp;
    const deltaTime = (timestamp - state.lastTime) / 1000; // Time delta in seconds
    state.lastTime = timestamp;
    
    // Advance scroll based on current active speed
    state.scrollY += state.currentSpeed * deltaTime;
    
    // Clamp to boundaries
    if (state.scrollY >= state.maxScrollY) {
      state.scrollY = state.maxScrollY;
      prompterText.style.transform = `translateY(${-state.scrollY}px)`;
      pausePrompter();
      updateHudStats();
      return;
    }
    
    // Apply scroll transform
    prompterText.style.transform = `translateY(${-state.scrollY}px)`;
    
    // Perform dynamic check for speed markers and eye guide highlights
    checkIntersectionAndMarkers();
    
    // Update progress bar and timers
    updateHudStats();
    
    state.animationFrameId = requestAnimationFrame(scrollLoop);
  }

  // Detect which line crosses the center eye guide line
  function checkIntersectionAndMarkers() {
    const guideRect = eyeGuide.getBoundingClientRect();
    const guideY = guideRect.top + guideRect.height / 2;
    
    const lines = prompterText.querySelectorAll('.line');
    let currentActiveLine = null;
    
    // Find the last line that has crossed the guideY
    for (const line of lines) {
      const rect = line.getBoundingClientRect();
      // Consider a line "active" if its top edge has crossed the guide.
      // We add a small buffer (e.g. +10) for smoother transitions.
      if (rect.top <= guideY + 10) {
        currentActiveLine = line;
      } else {
        break; // lines are ordered top-to-bottom
      }
    }
    
    if (currentActiveLine && currentActiveLine !== state.lastActiveLineElement) {
      // Change active highlight
      if (state.lastActiveLineElement) {
        state.lastActiveLineElement.classList.remove('active-line');
      }
      currentActiveLine.classList.add('active-line');
      state.lastActiveLineElement = currentActiveLine;
      
      // Look backwards from the active line to find the most recent speed marker
      let speedLine = currentActiveLine;
      let newSpeed = null;
      while (speedLine) {
        if (speedLine.dataset.speed) {
          newSpeed = parseFloat(speedLine.dataset.speed);
          break;
        }
        speedLine = speedLine.previousElementSibling;
      }
      
      if (newSpeed !== null && newSpeed !== state.currentSpeed) {
        state.currentSpeed = newSpeed;
        
        // Show alert in HUD
        hudMarkerSpeedInfo.textContent = `Marker: [speed:${newSpeed}]`;
        hudMarkerSpeedInfo.classList.add('visible');
        guideSpeedIndicator.textContent = newSpeed;
      } else if (newSpeed === null && state.currentSpeed !== state.baseSpeed) {
        // Revert to base speed if no marker found before this line
        state.currentSpeed = state.baseSpeed;
        
        hudMarkerSpeedInfo.classList.remove('visible');
        hudMarkerSpeedInfo.textContent = 'Marker: None';
        guideSpeedIndicator.textContent = state.baseSpeed;
      }
    }
  }

  function updateHudStats() {
    // 1. Progress Bar
    const progress = state.maxScrollY > 0 ? (state.scrollY / state.maxScrollY) * 100 : 0;
    hudProgressBar.style.width = `${progress}%`;
    
    // 2. Timers
    // Elapsed reading time (approx based on active rendering elapsed seconds)
    // For simplicity, we calculate real clock elapsed time or scroll speed progression
    // Let's compute based on remaining distance and current speed
    const currentSpeedVal = state.currentSpeed > 0 ? state.currentSpeed : state.baseSpeed;
    const remainingPixels = state.maxScrollY - state.scrollY;
    
    const elapsedSeconds = Math.floor(state.scrollY / (state.baseSpeed || 100)); // normalized speed seconds
    const remainingSeconds = Math.floor(remainingPixels / (currentSpeedVal || 100));
    
    const elapsedMin = Math.floor(elapsedSeconds / 60);
    const elapsedSec = Math.floor(elapsedSeconds % 60);
    hudTimeElapsed.textContent = `${elapsedMin.toString().padStart(2, '0')}:${elapsedSec.toString().padStart(2, '0')}`;
    
    const remainingMin = Math.floor(remainingSeconds / 60);
    const remainingSec = Math.floor(remainingSeconds % 60);
    hudTimeRemaining.textContent = `Remaining: ${remainingMin.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  }

  // Handle manual scroll gestures (wheel)
  let scrollTimeout = null;
  let wasPlayingBeforeScroll = false;
  
  prompterViewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (!scrollTimeout) {
      wasPlayingBeforeScroll = state.isScrolling;
    }
    
    pausePrompter();
    
    // Adjust scrollY manually
    state.scrollY += e.deltaY * 0.5;
    
    // Keep bounded
    if (state.scrollY < 0) state.scrollY = 0;
    if (state.scrollY > state.maxScrollY) state.scrollY = state.maxScrollY;
    
    prompterText.style.transform = `translateY(${-state.scrollY}px)`;
    
    // Refresh intersection indicators
    checkIntersectionAndMarkers();
    updateHudStats();
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      if (wasPlayingBeforeScroll) {
        startPrompter();
      }
    }, 500);
  }, { passive: false });

  // ==========================================
  // 7. COUNTDOWN OVERLAY
  // ==========================================
  function runCountdown(callback) {
    state.isCountingDown = true;
    countdownOverlay.classList.add('active');
    
    let currentNumber = state.countdownDuration;
    countdownNumber.textContent = currentNumber;
    countdownNumber.className = 'animate';
    
    const countdownInterval = setInterval(() => {
      currentNumber--;
      if (currentNumber > 0) {
        countdownNumber.textContent = currentNumber;
        // Trigger small bounce animation
        countdownNumber.classList.remove('animate');
        void countdownNumber.offsetWidth; // Force reflow
        countdownNumber.classList.add('animate');
      } else if (currentNumber === 0) {
        countdownNumber.textContent = '¡Acción!';
        countdownNumber.classList.remove('animate');
        void countdownNumber.offsetWidth;
        countdownNumber.classList.add('animate');
      } else {
        clearInterval(countdownInterval);
        countdownOverlay.classList.remove('active');
        state.isCountingDown = false;
        callback();
      }
    }, 1000);
  }

  // ==========================================
  // 8. SCREEN SWITCHING (NAVIGATION)
  // ==========================================
  function showEditorScreen() {
    pausePrompter();
    prompterScreen.classList.remove('active');
    editorScreen.classList.add('active');
    
    // Reload state slider syncs
    inputFontSize.value = state.fontSize;
    valFontSize.textContent = `${state.fontSize}px`;
    inputLineHeight.value = state.lineHeight;
    valLineHeight.textContent = state.lineHeight.toFixed(1);
    
    // Restore header elements
    calculateStats();
  }

  function showPrompterScreen() {
    state.text = scriptInput.value;
    saveSettings();
    
    // Compile script paragraphs
    parseTextToPrompter();
    
    editorScreen.classList.remove('active');
    prompterScreen.classList.add('active');
    
    // Reset positions
    restartPrompter();
    
    // Wait slightly for DOM to render layout, then calculate dimensions
    setTimeout(() => {
      calculateMaxScroll();
      updateHudStats();
      
      // Start with countdown
      runCountdown(() => {
        startPrompter();
      });
    }, 100);
  }

  // ==========================================
  // 9. DYNAMIC HUD SHOW/HIDE (INACTIVITY)
  // ==========================================
  function showHud() {
    prompterHud.classList.remove('hud-hidden');
    document.body.style.cursor = 'default';
    resetHudTimeout();
  }

  function hideHud() {
    if (state.isScrolling && !state.isCountingDown) {
      prompterHud.classList.add('hud-hidden');
      document.body.style.cursor = 'none'; // Distraction-free hide cursor
    }
  }

  function resetHudTimeout() {
    clearTimeout(hudTimeoutId);
    if (state.isScrolling) {
      hudTimeoutId = setTimeout(hideHud, 3000); // 3 seconds timeout
    }
  }

  // Detect mouse movement on prompter viewport
  prompterScreen.addEventListener('mousemove', () => {
    showHud();
  });

  // ==========================================
  // 10. INTERACTIVE CONTROL LISTENERS
  // ==========================================
  
  // Script changes
  scriptInput.addEventListener('input', () => {
    state.text = scriptInput.value;
    localStorage.setItem('tp_script', state.text);
    calculateStats();
  });

  // Launch Button
  btnStart.addEventListener('click', showPrompterScreen);

  // Font size adjustments
  inputFontSize.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.fontSize = val;
    valFontSize.textContent = `${val}px`;
    hudFontSizeSlider.value = val;
    hudValFontSize.textContent = `${val}px`;
    updatePrompterStyles();
    calculateMaxScroll();
    saveSettings();
  });

  hudFontSizeSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.fontSize = val;
    hudValFontSize.textContent = `${val}px`;
    inputFontSize.value = val;
    valFontSize.textContent = `${val}px`;
    updatePrompterStyles();
    calculateMaxScroll();
    saveSettings();
  });

  document.querySelector('.decrease-font').addEventListener('click', () => {
    const step = 4;
    let val = state.fontSize - step;
    if (val < 24) val = 24;
    inputFontSize.value = val;
    inputFontSize.dispatchEvent(new Event('input'));
  });

  document.querySelector('.increase-font').addEventListener('click', () => {
    const step = 2;
    let val = state.fontSize + step;
    if (val > 120) val = 120;
    inputFontSize.value = val;
    inputFontSize.dispatchEvent(new Event('input'));
  });

  // Line Height adjustments
  inputLineHeight.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    state.lineHeight = val;
    valLineHeight.textContent = val.toFixed(1);
    updatePrompterStyles();
    calculateMaxScroll();
    saveSettings();
  });

  document.querySelector('.decrease-line-height').addEventListener('click', () => {
    const step = 0.1;
    let val = state.lineHeight - step;
    if (val < 1.0) val = 1.0;
    inputLineHeight.value = val.toFixed(1);
    inputLineHeight.dispatchEvent(new Event('input'));
  });

  document.querySelector('.increase-line-height').addEventListener('click', () => {
    const step = 0.1;
    let val = state.lineHeight + step;
    if (val > 3.0) val = 3.0;
    inputLineHeight.value = val.toFixed(1);
    inputLineHeight.dispatchEvent(new Event('input'));
  });

  // Margin adjustment
  inputMargin.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.marginWidth = val;
    valMargin.value = val;
    updatePrompterStyles();
    calculateMaxScroll();
    saveSettings();
  });

  valMargin.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 5 && val <= 90) {
      state.marginWidth = val;
      inputMargin.value = val;
      updatePrompterStyles();
      calculateMaxScroll();
      saveSettings();
    }
  });

  // Font Family selector
  selectFont.addEventListener('change', (e) => {
    state.fontFamily = e.target.value;
    updatePrompterStyles();
    calculateMaxScroll();
    saveSettings();
  });

  // Eye Guide selector
  selectGuide.addEventListener('change', (e) => {
    state.guideType = e.target.value;
    updatePrompterStyles();
    saveSettings();
  });

  // Mirror events
  btnMirrorH.addEventListener('click', () => {
    state.mirrorH = !state.mirrorH;
    updateMirrorState();
    saveSettings();
  });

  btnMirrorV.addEventListener('click', () => {
    state.mirrorV = !state.mirrorV;
    updateMirrorState();
    saveSettings();
  });

  hudBtnMirrorH.addEventListener('click', () => {
    state.mirrorH = !state.mirrorH;
    updateMirrorState();
    saveSettings();
  });

  hudBtnMirrorV.addEventListener('click', () => {
    state.mirrorV = !state.mirrorV;
    updateMirrorState();
    saveSettings();
  });

  // Themes presets
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      saveSettings();
    });
  });

  // HUD buttons
  hudBtnPlay.addEventListener('click', togglePlayPause);
  hudBtnBack.addEventListener('click', showEditorScreen);
  hudBtnRestart.addEventListener('click', restartPrompter);
  
  hudBtnFullscreen.addEventListener('click', toggleFullscreen);

  // Fullscreen support
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al intentar pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Monitor browser fullscreen state changes to toggle HUD icons
  document.addEventListener('fullscreenchange', () => {
    const icon = hudBtnFullscreen.querySelector('i');
    if (document.fullscreenElement) {
      icon.setAttribute('data-lucide', 'minimize');
    } else {
      icon.setAttribute('data-lucide', 'maximize');
    }
    lucide.createIcons();
    // recalculate viewport layouts
    setTimeout(calculateMaxScroll, 300);
  });

  // Window resize resets bounds
  window.addEventListener('resize', () => {
    if (prompterScreen.classList.contains('active')) {
      calculateMaxScroll();
      updateHudStats();
    }
  });

  // ==========================================
  // 11. KEYBOARD SHORTCUTS ENGINE
  // ==========================================
  window.addEventListener('keydown', (e) => {
    const isPrompterActive = prompterScreen.classList.contains('active');
    
    // Disable global shortcuts if the user is typing in the textarea
    if (document.activeElement === scriptInput) {
      if (e.key === 'Escape') {
        scriptInput.blur();
      }
      return;
    }

    switch (e.key) {
      case ' ': // Spacebar
        e.preventDefault();
        if (isPrompterActive) {
          togglePlayPause();
        } else {
          showPrompterScreen();
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        if (isPrompterActive) {
          showEditorScreen();
        } else {
          // If in editor, launch
          showPrompterScreen();
        }
        break;
        
      case 'ArrowRight':
        e.preventDefault();
        // Font size up
        const fontUpVal = Math.min(state.fontSize + 4, 120);
        hudFontSizeSlider.value = fontUpVal;
        hudFontSizeSlider.dispatchEvent(new Event('input'));
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        // Font size down
        const fontDownVal = Math.max(state.fontSize - 4, 24);
        hudFontSizeSlider.value = fontDownVal;
        hudFontSizeSlider.dispatchEvent(new Event('input'));
        break;
        
      case 'r':
      case 'R':
        if (isPrompterActive) {
          e.preventDefault();
          restartPrompter();
        }
        break;
        
      case 'h':
      case 'H':
        e.preventDefault();
        state.mirrorH = !state.mirrorH;
        updateMirrorState();
        saveSettings();
        break;
        
      case 'v':
      case 'V':
        e.preventDefault();
        state.mirrorV = !state.mirrorV;
        updateMirrorState();
        saveSettings();
        break;
        
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });

  // ==========================================
  // 12. SHORTCUTS MODAL
  // ==========================================
  btnShortcutsHelper.addEventListener('click', () => {
    shortcutsModal.classList.add('active');
  });

  const closeModal = () => {
    shortcutsModal.classList.remove('active');
  };

  btnCloseModal.addEventListener('click', closeModal);
  btnCloseModalOk.addEventListener('click', closeModal);
  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) {
      closeModal();
    }
  });

  // ==========================================
  // 13. INITIAL LOAD
  // ==========================================
  loadSettings();
});
