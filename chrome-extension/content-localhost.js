
window.addEventListener('storage', function (event) {
    if (event.key === 'token') { 
      const token = localStorage.getItem('token');
      if (token) {
        chrome.runtime.sendMessage({ action: "saveToken", token: token });
        chrome.storage.local.set({ token: token }, function () {
          console.log('Token zapisany w chrome.storage:', token);
        });
      }
    }
  });
  