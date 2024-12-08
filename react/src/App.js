import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Login from './views/login.js';
import Home from './views/home.js';
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
            
  
    return ( // Dodajemy return
        <Router>
            <Routes>
                {!isAuthenticated && <Route path="/login" element={<Login onLogin={() =>setIsAuthenticated(true)}/>} />}
                {isAuthenticated && <Route path="/home" element={<Home />} />}
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
