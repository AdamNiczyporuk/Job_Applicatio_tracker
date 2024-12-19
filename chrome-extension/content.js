document.addEventListener('click', function(event) {
  if (event.target.matches('.b14qiyz3') || event.target.closest('.b14qiyz3')) { // Zmień selektor na odpowiedni dla przycisku "Aplikuj"
    const jobTitleElement = document.querySelector('[data-test="text-employerName"]'); // Zmień selektor na odpowiedni dla tytułu pracy
    const jobTitle = jobTitleElement ? jobTitleElement.innerText : 'Unknown Job Title';
    const jobLink = window.location.href;

    chrome.runtime.sendMessage({
      action: 'addJob',
      jobTitle: jobTitle,
      jobLink: jobLink
    });
  }
}, false);