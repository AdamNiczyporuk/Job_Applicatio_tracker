import React, { useState } from 'react';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log(`Email: ${email}, Password: ${password}`);
        // Tutaj dodaj żądanie do backendu
    };

    return (
        <div style={{ textAlign: 'center', margin: '50px', height: '100vh' }}>
            <h1>Registration</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
            />
            <br />
            <button onClick={handleRegister} style={{ padding: '10px', width: '150px' }}>
                Register
            </button>
        </div>
    );
};

export default Registration;
