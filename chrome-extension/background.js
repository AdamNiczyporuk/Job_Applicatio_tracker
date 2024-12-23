let storedToken = null;

// Obsługa komunikatów
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveToken") {
    storedToken = message.token;
    console.log("Token zapisany w zmiennej:", storedToken);
    sendResponse({ success: true });
  }

  if (message.action === "getToken") {
    console.log("Token pobrany z zmiennej:", storedToken);
    sendResponse({ token: storedToken }); 
  }


  return true; 
});
