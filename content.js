const themes = {
  green: {
    bg: '#F2F5F0',
    accent: '#B5C99A',
    shadowLight: '#ffffff',
    shadowDark: '#d1d9c9',
    text: '#2D3A2E'
  },
  red: {
    bg: '#F9F0F0',
    accent: '#E6A1A1',
    shadowLight: '#ffffff',
    shadowDark: '#d9c9c9',
    text: '#3A2D2D'
  },
  black: {
    bg: '#1A1A1A',
    accent: '#333333',
    shadowLight: '#252525',
    shadowDark: '#000000',
    text: '#E0E0E0'
  },
  white: {
    bg: '#FDFDFD',
    accent: '#F8F8FF',
    shadowLight: '#ffffff',
    shadowDark: '#e8e8e8',
    text: '#222222'
  }
};

let currentThemeStyle = null;

function getThemeCSS(themeName) {
  const theme = themes[themeName] || themes.green;
  return `
    :root {
      --clay-bg: ${theme.bg} !important;
      --clay-accent: ${theme.accent} !important;
      --clay-shadow-light: ${theme.shadowLight} !important;
      --clay-shadow-dark: ${theme.shadowDark} !important;
      --clay-text: ${theme.text} !important;
      --clay-radius: 24px !important;
    }

    /* Global Background */
    body, .S3, .aeN, .ah9, .aeF, .aeJ, .aDP, .a98, .bkK, .nH, .brC, .brD {
      background-color: var(--clay-bg) !important;
      color: var(--clay-text) !important;
    }

    /* Sidebar and Main Container */
    .aeN, .aeF, .no, .aH9, .bkK, .aeJ {
      border-radius: var(--clay-radius) !important;
      margin: 10px !important;
      box-shadow: inset 8px 8px 16px var(--clay-shadow-dark), 
                  inset -8px -8px 16px var(--clay-shadow-light) !important;
      border: none !important;
    }

    /* Compose Button */
    .T-I.T-I-KE.L3 {
      background-color: var(--clay-accent) !important;
      border-radius: 50px !important;
      box-shadow: 6px 6px 12px var(--clay-shadow-dark), 
                  -6px -6px 12px var(--clay-shadow-light),
                  inset 4px 4px 8px rgba(255,255,255,0.4),
                  inset -4px -4px 8px rgba(0,0,0,0.05) !important;
      border: none !important;
      height: 48px !important;
      padding: 0 24px !important;
      color: var(--clay-text) !important;
      transition: transform 0.2s ease !important;
    }

    .T-I.T-I-KE.L3:hover {
      transform: scale(1.05) !important;
    }

    /* Message Rows */
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

    /* Selected Message */
    .zA.x7 {
      background-color: var(--clay-accent) !important;
      box-shadow: inset 4px 4px 8px var(--clay-shadow-dark), 
                  inset -4px -4px 8px var(--clay-shadow-light) !important;
    }

    /* Search Bar */
    .gb_pe, header form, .gb_re {
      background-color: var(--clay-bg) !important;
      border-radius: 30px !important;
      box-shadow: inset 4px 4px 8px var(--clay-shadow-dark), 
                  inset -4px -4px 8px var(--clay-shadow-light) !important;
      border: none !important;
    }

    /* Sidebar Navigation Items */
    .nZ, .n6 {
      border-radius: 20px !important;
      margin: 2px 8px !important;
    }

    .nZ {
      background-color: var(--clay-accent) !important;
      box-shadow: inset 2px 2px 4px var(--clay-shadow-dark), 
                  inset -2px -2px 4px var(--clay-shadow-light) !important;
    }

    /* --- MESSAGE VIEW STYLING --- */
    .if, .adn, .gs, .a3s.aiL, .hx {
      background-color: var(--clay-bg) !important;
      border-radius: 16px !important;
      box-shadow: inset 4px 4px 10px var(--clay-shadow-dark), 
                  inset -4px -4px 10px var(--clay-shadow-light) !important;
    }

    /* --- COMPOSE WINDOW STYLING --- */
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

    /* UI CLEANUP */
    .yW, .y6, .BltHw, .ar5, .aS3, .hP, .gD, .qG, .qF, .T-I-ax7 {
      color: var(--clay-text) !important;
    }

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

function applyTheme(themeName) {
  const css = getThemeCSS(themeName);
  
  if (!currentThemeStyle) {
    currentThemeStyle = document.createElement('style');
    currentThemeStyle.id = 'gmail-claymate-styles';
    // Append to document head or body if head isn't ready
    (document.head || document.documentElement).appendChild(currentThemeStyle);
  }
  
  currentThemeStyle.textContent = css;
}

// Initial theme load
chrome.storage.sync.get('gmail_claymate_theme', (data) => {
  const currentTheme = data.gmail_claymate_theme || 'green';
  applyTheme(currentTheme);
});

// Listen for theme updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateTheme") {
    applyTheme(request.theme);
    sendResponse({ status: "success" });
  }
});

// Ensure styles stay injected even if Gmail's dynamic loading tries to overwrite them
const observer = new MutationObserver(() => {
  if (currentThemeStyle && !currentThemeStyle.parentNode) {
    (document.head || document.documentElement).appendChild(currentThemeStyle);
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });
