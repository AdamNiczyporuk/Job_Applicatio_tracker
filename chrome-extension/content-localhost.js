// // Nasłuchiwanie na załadowanie strony
// document.addEventListener("DOMContentLoaded", function () {
//   if (window.location.href === "http://localhost:8080/home") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // Przekaż token do background.js
//       chrome.runtime.sendMessage({ action: "saveToken", token: token }, (response) => {
//         if (response && response.success) {
//           console.log("Token został zapisany w background.js:", token);
//         } else {
//           console.error("Failed to save token in chrome.storage");
//         }
//       });
//     } else {
//       console.log("Token not found in localStorage");
//     }
//   }
// });

// document.addEventListener("click", function (event) {
//   if (event.target.matches('span.v-btn__content') && event.target.textContent.includes('Login')) {
//     const token = localStorage.getItem('token');
//     console.log('Token:', token);
//     if (token) {
//       // Przekaż token do background.js
//       chrome.runtime.sendMessage({ action: "saveToken", token: token }, (response) => {
//         if (response && response.success) {
//           console.log("Token został zapisany w background.js:", token);
//         } else {
//           console.error("Failed to save token in chrome.storage");
//         }
//       });
//     } else {
//       console.log("Token not found in localStorage");
//     }
//   }
// });

function checkForToken() {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token found:', token);
    // Przekaż token do background.js
    chrome.runtime.sendMessage({ action: "saveToken", token: token }, (response) => {
      if (response && response.success) {
        console.log("Token został zapisany w background.js:", token);
      } else {
        console.error("Failed to save token in chrome.storage");
      }
    });
    return true; // Zatrzymaj pętlę
  } else {
    console.log("Token not found in localStorage");
    return false; // Kontynuuj pętlę
  }
}

// Uruchom pętlę sprawdzającą co 1 sekundę
const intervalId = setInterval(() => {
  if (checkForToken()) {
    clearInterval(intervalId); // Zatrzymaj pętlę, gdy token zostanie znaleziony
  }
}, 1000);