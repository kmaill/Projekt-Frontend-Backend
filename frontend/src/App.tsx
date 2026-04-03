import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Workspaces } from './pages/Workspaces';

const Home = () => (
  <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
    <h1>SpaceSync</h1>
    <p>Zarządzaj swoją przestrzenią biurową</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px 20px', background: '#333', color: 'white', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Strona Główna</Link>
        <Link to="/workspaces" style={{ color: 'white', textDecoration: 'none' }}>Oferta</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspaces" element={<Workspaces />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;