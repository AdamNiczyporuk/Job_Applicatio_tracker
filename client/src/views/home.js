import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from '../Api';



const Home = () => {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        api.fetchAppplications()
            .then(response => setLinks(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    const addLink = () => {
        if (newLink.trim()) {
            api.addApplication(name, newLink)
                .then(() => {
                 api.fetchAppplications()
                        .then(response => setLinks(response.data))
                        .catch(error => console.error('Error fetching updated data:', error));
                    setNewLink('');
                })
                .catch(error => console.error('Error adding link:', error));
        }
    };
    const deleteLink = (id) => {
      api.deleteApplication(id)
            .then(() => {
                api.fetchAppplications()
                    .then(response => setLinks(response.data))
                    .catch(error => console.error('Error fetching updated data:', error));
            })
            .catch(error => {
                console.error('Error deleting application:', error);
                alert('Failed to delete the application!');
            });
    };
    return (
        <div style={{ textAlign: 'center', margin: '50px', height: '100vh' }}>
            <h1>Job Application Tracker</h1>
            <h2>Total Applications: {links.length}</h2>
            <input
                type="text"
                placeholder="Name of application"
                value={name}
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
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Home;