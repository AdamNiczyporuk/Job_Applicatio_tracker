import React, { useState } from 'react';
import * as api from '../Api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleRegister = async () => {
    try { 
        const response = await api.registerUser(email, password);
        alert('Registration successful!');
        setError('');
    }catch(error){
        setError('Registration failed. Please try again.');
    }

  } 

    return (
        <div>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
