import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from '../mockData';

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = onLogin(username, password);

    if (success) {
      setError('');
      navigate('/');
    } else {
      setError('Nieprawidłowy login lub hasło!');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '300px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Użytkownik:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>}

        <button
          type="submit"
          style={{padding: '10px',background: '#aa3bff',color: 'white',border: 'none',borderRadius: '4px',cursor: 'pointer'}}>
          Login
        </button>
      </form>
    </div>
  );
};