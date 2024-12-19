chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addJob') {
    const applicationsList = document.getElementById('applicationsList');
    const li = document.createElement('li');
    li.textContent = `${message.jobTitle}: ${message.jobLink}`;
    applicationsList.appendChild(li);

    // Wysyłanie danych do serwera
    fetch('http://localhost:5000/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: message.jobTitle,
        link: message.jobLink
      })
    })
    .then(response => response.json())
    .then(data => console.log('Job added:', data))
    .catch(error => console.error('Error adding job:', error));
  }
});