document.addEventListener('click', function(event) {
  if (event.target.matches('[data-test="anchor-apply"]')) { 
    event.preventDefault(); 

    const jobTitleElement = document.querySelector('[data-test="text-employerName"]');
    const jobTitle = jobTitleElement ? jobTitleElement.innerText : 'Unknown Job Title';
    const jobLink = window.location.href;

    console.log('Job title:', jobTitle);
    console.log('Job link:', jobLink);

    chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
      const token = response.token;
      if (token) {
        console.log("Pobrano token:", token);
      } else {
        console.error("Brak tokena");
      }
  

      // Wysyłanie danych do serwera
      fetch('http://localhost:5000/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: jobTitle,
          link: jobLink
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Job added:', data);
        setTimeout(() => {
          window.location.href = event.target.closest('[data-test="anchor-apply"]').href;
        }, 100);
      })
      .catch(error => console.error('Error adding job:', error));
    });
  }
}, false);
