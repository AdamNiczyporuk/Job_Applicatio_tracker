document.addEventListener('click', function(event) {
    if (event.target.matches('.b14qiyz3')) { // Zmień selektor na odpowiedni dla przycisku "Aplikuj"
      const jobTitle = document.querySelector('.cp9trhu').innerText; // Zmień selektor na odpowiedni dla tytułu pracy
      const jobLink = window.location.href;
  
      chrome.runtime.sendMessage({
        action: 'addJob',
        jobTitle: jobTitle,
        jobLink: jobLink
      });
    }
  }, false);