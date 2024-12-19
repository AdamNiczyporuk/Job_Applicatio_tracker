chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showNotification') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: message.title,
      message: message.message
    });
  }
});