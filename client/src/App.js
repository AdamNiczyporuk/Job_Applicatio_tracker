// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching users:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.mail}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
