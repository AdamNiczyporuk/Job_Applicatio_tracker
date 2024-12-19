document.addEventListener('click', function(event) {
  if (event.target.matches('.b14qiyz3') || event.target.closest('.b14qiyz3')) { // Zmień selektor na odpowiedni dla przycisku "Aplikuj"
    const jobTitleElement = document.querySelector('[data-test="text-employerName"]'); // Zmień selektor na odpowiedni dla tytułu pracy
    const jobTitle = jobTitleElement ? jobTitleElement.innerText : 'Unknown Job Title';
    const jobLink = window.location.href;

    // Wysyłanie danych do serwera
    fetch('http://localhost:5000/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: jobTitle,
        link: jobLink
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Job added:', data);
      // Wyświetlanie powiadomienia
      chrome.runtime.sendMessage({
        action: 'showNotification',
        title: 'Job Application Tracker',
        message: 'Job application saved successfully!'
      });
    })
    .catch(error => console.error('Error adding job:', error));
  }
}, false);