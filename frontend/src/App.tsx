import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Offer } from './pages/Offer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ClientPanel } from './pages/ClientPanel';
import { AdminPanel } from './pages/AdminPanel';
import { Checkout } from './pages/Checkout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="offer" element={<Offer />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="checkout" element={<Checkout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="client" element={<ClientPanel />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
