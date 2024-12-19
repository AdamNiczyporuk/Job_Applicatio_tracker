// Nasłuchiwanie na załadowanie strony
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href === "http://localhost:8080/home") {
    const token = localStorage.getItem("token");
    if (token) {
      // Przekaż token do background.js
      chrome.runtime.sendMessage({ action: "saveToken", token: token }, (response) => {
        if (response && response.success) {
          console.log("Token został zapisany w background.js:", token);
        } else {
          console.error("Failed to save token in chrome.storage");
        }
      });
    } else {
      console.log("Token not found in localStorage");
    }
  }
});