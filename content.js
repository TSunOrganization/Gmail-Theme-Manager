const themes = {
  green: {
    bg: '#F2F5F0',
    accent: '#B5C99A',
    shadowLight: '#ffffff',
    shadowDark: '#d1d9c9',
    text: '#2D3A2E',
    secondaryText: '#5A6B5C'
  },
  red: {
    bg: '#F9F0F0',
    accent: '#E6A1A1',
    shadowLight: '#ffffff',
    shadowDark: '#d9c9c9',
    text: '#3A2D2D',
    secondaryText: '#7A5C5C'
  },
  black: {
    bg: '#0D0D0D',
    accent: '#1A1A1A',
    surface: '#161616',
    shadowLight: '#222222',
    shadowDark: '#000000',
    text: '#F0F0F0',
    secondaryText: '#A0A0A0',
    focusOutline: '#4A90D9'
  },
  blue: {
    bg: '#F0F7F9',
    accent: '#AED9E0',
    shadowLight: '#ffffff',
    shadowDark: '#c9d9e0',
    text: '#2D343A',
    secondaryText: '#555F67'
  }
};

let currentThemeName = null;
let currentThemeStyle = null;
const THEME_STYLE_ID = 'gmail-claymate-styles';

function getThemeCSS(themeName) {
  const theme = themes[themeName] || themes.green;
  const isDark = themeName === 'black';

  const darkModeStyles = isDark ? `
    /* Dark mode: message row surfaces */
    .zA {
      background-color: ${theme.surface} !important;
    }

    /* Dark mode: compose and editable areas */
    .AD, .Am, .Ar, .editable, .aYy {
      background-color: ${theme.surface} !important;
      color: ${theme.text} !important;
    }

    /* Dark mode: secondary text */
    .y2, .bAW, .yO, .x6, .x7, .aj9, .bog, .a3w {
      color: ${theme.secondaryText} !important;
    }

    /* Dark mode: strong focus outlines */
    :focus-visible {
      outline: 2px solid ${theme.focusOutline} !important;
      outline-offset: 2px !important;
    }

    /* Dark mode: input fields */
    input, textarea, .editable {
      background-color: ${theme.surface} !important;
      color: ${theme.text} !important;
      border: 1px solid ${theme.shadowLight} !important;
    }
  ` : '';

  return `
    :root {
      --clay-bg: ${theme.bg} !important;
      --clay-accent: ${theme.accent} !important;
      --clay-shadow-light: ${theme.shadowLight} !important;
      --clay-shadow-dark: ${theme.shadowDark} !important;
      --clay-text: ${theme.text} !important;
      --clay-secondary-text: ${theme.secondaryText || theme.text} !important;
      --clay-radius: 24px !important;
    }

    /* === Black Metal dedicated class for isolation === */
    .claymate-theme {
      background-color: var(--clay-bg) !important;
      color: var(--clay-text) !important;
    }

    /* === Global Background === */
    body, .S3, .aeN, .ah9, .aeF, .aeJ, .aDP, .a98, .bkK, .nH, .brC, .brD, .G-atb {
      background-color: var(--clay-bg) !important;
      color: var(--clay-text) !important;
    }

    /* === Sidebar and Main Container === */
    .aeN, .aeF, .no, .aH9, .bkK, .aeJ, .aDP {
      border-radius: var(--clay-radius) !important;
      margin: 10px !important;
      box-shadow: inset 8px 8px 16px var(--clay-shadow-dark),
                  inset -8px -8px 16px var(--clay-shadow-light) !important;
      border: none !important;
    }

    /* === Compose Button === */
    .T-I.T-I-KE.L3 {
      background-color: var(--clay-accent) !important;
      border-radius: 50px !important;
      box-shadow: 6px 6px 12px var(--clay-shadow-dark),
                  -6px -6px 12px var(--clay-shadow-light),
                  inset 4px 4px 8px rgba(255,255,255,0.4),
                  inset -4px -4px 8px rgba(0,0,0,0.1) !important;
      border: none !important;
      height: 48px !important;
      padding: 0 24px !important;
      color: var(--clay-text) !important;
      transition: transform 0.2s ease !important;
    }

    .T-I.T-I-KE.L3:hover {
      transform: scale(1.05) !important;
    }

    /* === Message Rows === */
    .zA {
      border-radius: 16px !important;
      margin: 4px 8px !important;
      background-color: transparent !important;
      border: none !important;
      transition: all 0.3s ease !important;
    }

    .zA:hover {
      background-color: var(--clay-bg) !important;
      box-shadow: 4px 4px 8px var(--clay-shadow-dark),
                  -4px -4px 8px var(--clay-shadow-light) !important;
    }

    /* === Selected Message === */
    .zA.x7 {
      background-color: var(--clay-accent) !important;
      box-shadow: inset 4px 4px 8px var(--clay-shadow-dark),
                  inset -4px -4px 8px var(--clay-shadow-light) !important;
    }

    /* === Search Bar === */
    .gb_pe, header form, .gb_re {
      background-color: var(--clay-bg) !important;
      border-radius: 30px !important;
      box-shadow: inset 4px 4px 8px var(--clay-shadow-dark),
                  inset -4px -4px 8px var(--clay-shadow-light) !important;
      border: none !important;
    }

    /* === Sidebar Navigation Items === */
    .nZ, .n6 {
      border-radius: 20px !important;
      margin: 2px 8px !important;
    }

    .nZ {
      background-color: var(--clay-accent) !important;
      box-shadow: inset 2px 2px 4px var(--clay-shadow-dark),
                  inset -2px -2px 4px var(--clay-shadow-light) !important;
    }

    /* === MESSAGE VIEW STYLING === */
    .if, .adn, .gs, .a3s.aiL, .hx, .a98 {
      background-color: var(--clay-bg) !important;
      border-radius: 16px !important;
      box-shadow: inset 4px 4px 10px var(--clay-shadow-dark),
                  inset -4px -4px 10px var(--clay-shadow-light) !important;
    }

    /* === COMPOSE WINDOW STYLING === */
    .AD, .Am, .Ar, .editable, .aYy {
      background-color: var(--clay-bg) !important;
      color: var(--clay-text) !important;
      border-radius: 12px !important;
      box-shadow: inset 2px 2px 5px var(--clay-shadow-dark),
                  inset -2px -2px 5px var(--clay-shadow-light) !important;
      border: none !important;
    }

    .aYy {
      background-color: var(--clay-accent) !important;
      color: var(--clay-text) !important;
      box-shadow: none !important;
    }

    /* === UI CLEANUP & TEXT VISIBILITY === */
    .yW, .y6, .BltHw, .ar5, .aS3, .hP, .gD, .qG, .qF, .T-I-ax7, .bog, .y2, .bAW {
      color: var(--clay-text) !important;
    }

    ${isDark ? `
      .y2, .bAW, .yO { color: ${theme.secondaryText} !important; }
      ${darkModeStyles}
    ` : ''}

    .apU, .akc, .a8k, .Wh, .G3, .ajz, .brC, .brD {
      border: none !important;
    }

    .gb_re, .gb_se, .T-I-ax7, .brC {
      border-radius: 50% !important;
      background-color: var(--clay-bg) !important;
      box-shadow: 4px 4px 8px var(--clay-shadow-dark),
                  -4px -4px 8px var(--clay-shadow-light) !important;
      border: none !important;
    }
  `;
}

function injectClaymateClass() {
  // Add the claymate-theme class to the body for isolation
  if (document.body && !document.body.classList.contains('claymate-theme')) {
    document.body.classList.add('claymate-theme');
  }
}

function removeClaymateClass() {
  if (document.body) {
    document.body.classList.remove('claymate-theme');
  }
}

function applyTheme(themeName) {
  const css = getThemeCSS(themeName);

  // Prevent duplicate style injection
  let styleEl = document.getElementById(THEME_STYLE_ID);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = THEME_STYLE_ID;
    (document.head || document.documentElement).appendChild(styleEl);
  }

  styleEl.textContent = css;
  currentThemeStyle = styleEl;
  currentThemeName = themeName;

  // Apply claymate theme class for isolation
  injectClaymateClass();
}

function resetTheme() {
  let styleEl = document.getElementById(THEME_STYLE_ID);
  if (styleEl && styleEl.parentNode) {
    styleEl.parentNode.removeChild(styleEl);
  }
  currentThemeStyle = null;
  currentThemeName = null;
  removeClaymateClass();
}

// Initial theme load
chrome.storage.sync.get('gmail_claymate_theme', (data) => {
  const currentTheme = data.gmail_claymate_theme;
  if (currentTheme) {
    applyTheme(currentTheme);
  } else {
    // Default to green theme (closest to Gmail's natural appearance)
    applyTheme('green');
  }
});

// Listen for theme updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateTheme") {
    applyTheme(request.theme);
    sendResponse({ status: "success", theme: request.theme });
  } else if (request.action === "resetTheme") {
    resetTheme();
    sendResponse({ status: "success", reset: true });
  }
});

// Ensure styles stay injected with improved stability
const observer = new MutationObserver(() => {
  // Re-apply claymate class if body exists
  injectClaymateClass();

  // Re-inject styles if they were removed but we still have a theme
  if (currentThemeName && currentThemeStyle && !currentThemeStyle.parentNode) {
    const css = getThemeCSS(currentThemeName);
    let styleEl = document.getElementById(THEME_STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = THEME_STYLE_ID;
      (document.head || document.documentElement).appendChild(styleEl);
    }
    styleEl.textContent = css;
    currentThemeStyle = styleEl;
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// Handle Gmail's dynamic navigation - re-apply styles after SPA-like transitions
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;

    // Debounce re-application to avoid redundant work
    if (applyThemeTimeout) clearTimeout(applyThemeTimeout);
    applyThemeTimeout = setTimeout(() => {
      if (currentThemeName) {
        applyTheme(currentThemeName);
      }
    }, 500);
  }
}, { subtree: true, childList: true });
let applyThemeTimeout = null;