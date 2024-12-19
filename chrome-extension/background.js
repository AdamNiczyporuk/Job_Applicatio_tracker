chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showNotification') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: message.title,
      message: message.message
    });
  }
  else if (message.action === 'saveToken') {
    chrome.storage.local.set({ token: message.token }, function() {
      console.log('Token saved');
      sendResponse({ status: 'success' });
    });
    return true; // Keep the message channel open for sendResponse
  }
});