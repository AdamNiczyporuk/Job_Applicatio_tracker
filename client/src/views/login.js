import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(`Email: ${email}, Password: ${password}`);
        // Tutaj dodaj żądanie do backendu
    };

    return (
        <div style={{ textAlign: 'center', margin: '50px', height: '100vh' }}>
            <h1>Login</h1>
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
            <button onClick={handleLogin} style={{ padding: '10px', width: '150px' }}>
                Login
            </button>
        </div>
    );
};

export default Login;
