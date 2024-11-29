import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/login';
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
            
  
<Router> 
    <Routes>
    if (!isAuthenticated) {
       <Route path="/login" element={<Login />} />
    }
    <Route path="/home" element={<Home />} />
    </Routes>
</Router>;
};

export default App;
