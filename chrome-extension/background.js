let storedToken = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveToken") {
    storedToken = message.token;
    localStorage.setItem('token', storedToken);
    console.log("Token zapisany w zmiennej:", storedToken);
    sendResponse({ success: true });
  }

  if (message.action === "getToken") {
    console.log("Token pobrany z zmiennej:", storedToken);
    token =localStorage.getItem('token');
    sendResponse({ token: token }); 
  }


  return true; 
});
