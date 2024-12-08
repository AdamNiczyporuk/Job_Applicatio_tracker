import React, { useState } from 'react';
import * as api from '../Api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.loginUser(email, password);
            const {token} = response.data;
            localStorage.setItem('token', token);
            alert('Login successful!');
            setError('');
            if(onLogin) onLogin();
            navigate('/home');
        }catch(error){
            setError('Login failed. Please try again.');
        }
    }

    return (
        <div style={{ textAlign: 'center', margin: '50px', height: '100vh' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        marginBottom: '10px' // Dodajemy margines dolny, aby inputy były pod sobą
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        marginBottom: '10px' // Dodajemy margines dolny
                    }}
                />
                <button type="submit" style={{ padding: '10px'}}>Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
