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


  return true; // Wymagane dla asynchronicznych odpowiedzi
});
