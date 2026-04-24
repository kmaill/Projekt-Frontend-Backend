import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Workspaces } from './pages/Workspaces';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { mockLogin } from './mockData';
import { useState } from 'react';

const Home = () => (
  <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
    <h1>SpaceSync</h1>
    <p>Zarządzaj swoją przestrzenią biurową</p>
  </div>
);

function App() {

  const [currentUser, setCurrentUser] = useState(mockLogin[0]);

  const handleLogin = (username: string, password: string) => {
    const user = mockLogin.find(
      (u) => u.name === username && u.password === password
    );

    if (user) {
      setCurrentUser({ ...user, log: true });
      return true;
    }
    return false;
  };

  const isLoggedIn = currentUser.log;

  return (
    <BrowserRouter>
      <nav style={{ padding: '10px 20px', background: '#333', color: 'white', display: 'flex', gap: '15px' , width: '100%',boxSizing: 'border-box'}}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Strona Główna</Link>
        <Link to="/workspaces" style={{ color: 'white', textDecoration: 'none' }}>Oferta</Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>
              Login
            </Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/"></Link>
          <span>Witaj, {currentUser.name}!</span>
    
          <button 
          onClick={() => setCurrentUser(mockLogin[0])} 
          style={{background: '#ff4d4d',color: 'white',border: 'none',padding: '5px 12px',borderRadius: '4px',cursor: 'pointer',fontSize: '14px'}}>
          Log out
          </button>
          </div>
        )}
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;