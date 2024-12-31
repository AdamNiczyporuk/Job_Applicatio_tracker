let storedToken = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveToken") {
    storedToken = message.token;
    chrome.storage.local.set({ token: storedToken }, () => {
      console.log("Token zapisany w chrome.storage:", storedToken);
      sendResponse({ success: true });
    });
  }

  if (message.action === "getToken") {
    chrome.storage.local.get("token", (result) => {
      console.log("Token pobrany z chrome.storage:", result.token);
      sendResponse({ token: result.token });
    });
    return true; 
  }


  return true; 
});
