// Nasłuchiwanie komunikatów z content scriptów
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveToken") {
    // Zapisz token w chrome.storage.local
    chrome.storage.local.set({ token: message.token }, () => {
      console.log("Token zapisany:", message.token);
      sendResponse({ status: "success" });
    });
    return true; // Aby umożliwić asynchroniczne sendResponse
  }

  if (message.action === "getToken") {
    // Pobierz token
    chrome.storage.local.get("token", (data) => {
      const token = data.token || null;
      sendResponse({ token: token });
    });
    return true; // Aby umożliwić asynchroniczne sendResponse
  }
});
