import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [name, setName] = useState('');

    // Pobierz istniejące linki
    useEffect(() => {
        axios.get('http://localhost:5000/applications')
            .then(response => setLinks(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Dodaj nowy link
    const addLink = () => {
        if (newLink.trim()) {
            axios.post('http://localhost:5000/applications', { link: newLink, name: name })
                .then(() => {
                    // Pobranie zaktualizowanych danych z backendu po dodaniu
                    axios.get('http://localhost:5000/applications')
                        .then(response => setLinks(response.data))
                        .catch(error => console.error('Error fetching updated data:', error));
                    setNewLink('');
                })
                .catch(error => console.error('Error adding link:', error));
        }
    };
    
    

    const deleteLink = (id) => {
        axios.delete(`http://localhost:5000/applications/${id}`)
            .then(() => {
                // Pobranie zaktualizowanych danych z backendu po usunięciu
                axios.get('http://localhost:5000/applications')
                    .then(response => setLinks(response.data))
                    .catch(error => console.error('Error fetching updated data:', error));
            })
            .catch(error => {
                console.error('Error deleting application:', error);
                alert('Failed to delete the application!');
            });
    };
  

    return (
        <div style={{ textAlign: 'center',justifyContent:"center",alignItems:"center", margin: '50px', height: '100vh',   }}>
            <h1>Job Application Tracker</h1>
            <h2>Total Applications: {links.length}</h2>
            <input type="text"
                    placeholder='Name of application'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '10px', width: '200px', marginRight: '2px' }}
                    />
            <input
                type="text"
                placeholder="Enter application link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                style={{ padding: '10px', width: '300px' }}
            />
            <button onClick={addLink} style={{ marginLeft: '10px', padding: '10px' }}>
                Add Link
            </button>
            <ul style={{ marginTop: '20px', listStyle: 'none' }}>
                {links.map((item) => (
                    <li key={item.id}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.name}
                        </a>
                        <button onClick={() => deleteLink(item.id)} style={{ marginLeft: '10px' }}>
                            Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default App;
