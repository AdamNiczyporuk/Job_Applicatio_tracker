import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './vies/home'; // Główna część aplikacji (Twój obecny kod)
import Login from './views/login'; // Widok logowania
import Registration from './views/register'; // Widok rejestracji

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Strona główna */}
                <Route path="/login" element={<Login />} /> {/* Logowanie */}
                <Route path="/register" element={<Registration />} /> {/* Rejestracja */}
            </Routes>
        </Router>
    );
};

export default App;
