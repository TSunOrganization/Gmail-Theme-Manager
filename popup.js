// Load current theme on popup open
chrome.storage.sync.get('gmail_claymate_theme', (data) => {
  const currentTheme = data.gmail_claymate_theme || 'green';
  const selectedElement = document.querySelector(`[data-theme="${currentTheme}"]`);
  if (selectedElement) {
    selectedElement.classList.add('selected');
  }
});

document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {
    const theme = option.getAttribute('data-theme');
    
    // Update visual selection
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');

    // Show confirmation message
    const status = document.getElementById('status');
    status.textContent = theme.charAt(0).toUpperCase() + theme.slice(1) + " Applied!";
    setTimeout(() => { status.textContent = ""; }, 2000);

    // Save theme and send message to all Gmail tabs
    chrome.storage.sync.set({ 'gmail_claymate_theme': theme }, () => {
      chrome.tabs.query({ url: "*://mail.google.com/*" }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { action: "updateTheme", theme: theme });
        });
      });
    });
  });
});
