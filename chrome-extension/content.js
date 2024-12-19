document.addEventListener('click', function(event) {
  if (event.target.matches('[data-test="anchor-apply"]') ) { 
    event.preventDefault(); // Przechwycenie kliknięcia i zapobieżenie domyślnemu zachowaniu

    const jobTitleElement = document.querySelector('[data-test="text-employerName"]'); // Zmień selektor na odpowiedni dla tytułu pracy
    const jobTitle = jobTitleElement ? jobTitleElement.innerText : 'Unknown Job Title';
    const jobLink = window.location.href;

    // Wyświetlanie danych w konsoli
    console.log('Job title:', jobTitle);
    console.log('Job link:', jobLink);

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
      // Po wysłaniu danych, pozwól na przekierowanie
      setTimeout(() => {
        window.location.href = event.target.closest('[data-test="anchor-apply"]').href;
      }, 100); // Opóźnienie, aby upewnić się, że dane są wysłane przed przekierowaniem
    })
    .catch(error => console.error('Error adding job:', error));
  }
}, false);