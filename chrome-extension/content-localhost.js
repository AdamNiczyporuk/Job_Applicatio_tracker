function checkForToken() {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token found:', token);
    chrome.runtime.sendMessage({ action: "saveToken", token: token }, (response) => {
      if (response && response.success) {
        console.log("Token został zapisany w background.js:", token);
      } else {
        console.error("Failed to save token in chrome.storage");
      }
    });
    return true; 
  } else {
    console.log("Token not found in localStorage");
    return false; 
  }
}


const intervalId = setInterval(() => {
  if (checkForToken()) {
    clearInterval(intervalId);
  }
}, 1000);