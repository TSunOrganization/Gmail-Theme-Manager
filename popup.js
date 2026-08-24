// Load current theme on popup open
const status = document.getElementById('status');
const loadingIndicator = document.getElementById('loading-indicator');
const activeThemeDisplay = document.getElementById('active-theme');
const resetButton = document.getElementById('reset-button');
let isLoading = false;
let themeChangeInProgress = false;

function showStatus(message, color = '#4CAF50') {
  status.textContent = message;
  status.style.color = color;
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}

function updateActiveThemeDisplay(themeName) {
  const themeDisplay = themeName.charAt(0).toUpperCase() + themeName.slice(1);
  activeThemeDisplay.textContent = `Active: ${themeDisplay}`;
}

function setLoading(isLoadingState) {
  isLoading = isLoadingState;
  loadingIndicator.style.display = isLoadingState ? 'block' : 'none';
  document.querySelectorAll('.color-option').forEach(opt => {
    opt.style.pointerEvents = isLoadingState ? 'none' : 'auto';
    opt.style.opacity = isLoadingState ? '0.6' : '1';
  });
  resetButton.style.pointerEvents = isLoadingState ? 'none' : 'auto';
}

function applyThemeToAllTabs(theme) {
  setLoading(true);
  chrome.storage.sync.set({ 'gmail_claymate_theme': theme }, () => {
    chrome.tabs.query({ url: "*://mail.google.com/*" }, (tabs) => {
      const messagePromises = tabs.map(tab => {
        return new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: "updateTheme", theme: theme }, (response) => {
            resolve(response);
          });
        });
      });

      Promise.all(messagePromises).finally(() => {
        setLoading(false);
        showStatus(`${theme.charAt(0).toUpperCase() + theme.slice(1)} Applied!`, '#4CAF50');
        setTimeout(() => {
          updateActiveThemeDisplay(theme);
        }, 100);
      });
    });
  });
}

function resetToGmail() {
  setLoading(true);
  chrome.storage.sync.remove('gmail_claymate_theme', () => {
    chrome.tabs.query({ url: "*://mail.google.com/*" }, (tabs) => {
      const messagePromises = tabs.map(tab => {
        return new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: "resetTheme" }, (response) => {
            resolve(response);
          });
        });
      });

      Promise.all(messagePromises).finally(() => {
        setLoading(false);
        showStatus('Gmail theme restored!', '#2196F3');
        setTimeout(() => {
          document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
          updateActiveThemeDisplay('Green');
        }, 100);
      });
    });
  });
}

// Load current theme on popup open
chrome.storage.sync.get('gmail_claymate_theme', (data) => {
  const currentTheme = data.gmail_claymate_theme || 'green';
  const selectedElement = document.querySelector(`[data-theme="${currentTheme}"]`);
  if (selectedElement) {
    selectedElement.classList.add('selected');
  }
  updateActiveThemeDisplay(currentTheme);
});

document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {
    if (isLoading || themeChangeInProgress) return;

    themeChangeInProgress = true;
    const theme = option.getAttribute('data-theme');

    // Update visual selection
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');

    applyThemeToAllTabs(theme);

    themeChangeInProgress = false;
  });
});

// Add keyboard focus states
function addKeyboardAccessibility() {
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        option.click();
      }
    });

    option.addEventListener('focus', () => {
      option.style.outline = '2px solid #4CAF50';
      option.style.outlineOffset = '2px';
    });

    option.addEventListener('blur', () => {
      option.style.outline = 'none';
    });
  });

  // Add reduced motion support
  const style = document.createElement('style');
  style.textContent = `
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize accessibility features
addKeyboardAccessibility();

// Reset button functionality
resetButton.addEventListener('click', () => {
  if (isLoading || themeChangeInProgress) return;
  resetToGmail();
});

// Add hover effects for reset button
resetButton.addEventListener('mouseenter', () => {
  resetButton.style.backgroundColor = '#E8ECE5';
  resetButton.style.transform = 'translateY(-1px)';
});

resetButton.addEventListener('mouseleave', () => {
  resetButton.style.backgroundColor = '#F2F5F0';
  resetButton.style.transform = 'none';
});
