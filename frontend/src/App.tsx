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
import {useEffect} from "react";
import {refreshToken} from "./api/userApi.ts";
import {login} from "./store/authSlice.ts";
import {useDispatch} from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refresh = async () => {
      try {
        const token = localStorage.getItem('token');
        if(token != null) {
          const refreshedToken = await refreshToken(token);
          dispatch(login(refreshedToken));
          localStorage.setItem('token', refreshedToken.token);
          //console.log(refreshedToken);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    refresh();
  },[])

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
