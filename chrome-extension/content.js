document.addEventListener('click', function(event) {
    if (event.target.matches('.apply-button-class')) { // Zmień selektor na odpowiedni dla przycisku "Aplikuj"
      const jobTitle = document.querySelector('.job-title-class').innerText; // Zmień selektor na odpowiedni dla tytułu pracy
      const jobLink = window.location.href;
  
      chrome.runtime.sendMessage({
        action: 'addJob',
        jobTitle: jobTitle,
        jobLink: jobLink
      });
    }
  }, false);