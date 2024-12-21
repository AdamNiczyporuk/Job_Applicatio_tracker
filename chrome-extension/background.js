let storedToken = null; // Zmienna do przechowywania tokena

// Obsługa komunikatów
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveToken") {
    storedToken = message.token; // Zapisz token w zmiennej
    console.log("Token zapisany w zmiennej:", storedToken);
    sendResponse({ success: true });
  }

  if (message.action === "getToken") {
    console.log("Token pobrany z zmiennej:", storedToken);
    sendResponse({ token: storedToken }); // Wyślij token do skryptu, który o niego poprosił
  }
  
  if (message.action === 'updateTable') {
    // Znajdź zakładkę z URL `http://localhost:8080/home`
    chrome.tabs.query({ url: 'http://localhost:8080/home' }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateTable' });
      }
    });
  }

  return true; // Wymagane dla asynchronicznych odpowiedzi
});
