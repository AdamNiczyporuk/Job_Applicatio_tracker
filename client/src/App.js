import React, { useState, useEffect } from 'react';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import axios from 'axios';
import { verifyToken } from './Api';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        verifyToken()
        .then(()=>{ 
            setIsAuthenticated(true);
        })
        .catch(()=>{
            setIsAuthenticated(false);
        });
    } , []);
            
  

    if (!isAuthenticated) {
        return <Login />; // Wyświetl logowanie, jeśli niezalogowany
    }

    return <Home />;
};

export default App;
