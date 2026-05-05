import React, { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 6) return setError('Password must be at least 6 characters');

        try {
            await register(formData); 
            window.location.href = '/dashboard'; 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Create your PlayerCard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required
                    onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <input type="email" placeholder="Email" required
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Register;
