import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginAsUser, loginAsAdmin, login/*, login */} from '../store/authSlice';
import {useState} from "react";
import { loginRequest } from '../api/userApi';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {

    try {
      const loginAttempt = await loginRequest(email, password);
      localStorage.setItem('token', await loginAttempt.token);
      console.log(loginAttempt.token);
      dispatch(login(loginAttempt));
      navigate('/');
    }
    catch (error) {
      setMessage("Nieprawidłowy email lub hasło");
    }
  }

  const handleLoginUser = () => {
    dispatch(loginAsUser());
    navigate('/client');
  };

  const handleLoginAdmin = () => {
    dispatch(loginAsAdmin());
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 dark:text-gray-100 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Witaj ponownie</h2>
          <p className="text-gray-500 dark:text-gray-400">Zaloguj się, aby zarządzać rezerwacjami</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adres e-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all dark:text-white" 
                placeholder="twoj@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hasło</label>
              <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">Zapomniałeś?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all dark:text-white" 
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400">{message}</p>
          </div>

          <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            Zaloguj
          </button>

          <button 
            type="button" 
            onClick={handleLoginUser}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            Zaloguj się jako Klient (Demo)
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">lub zaloguj jako</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <div className="mt-6 space-y-3">
        <a 
          href="http://localhost:8080/oauth2/authorization/google" 
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </a>

        <button 
          onClick={handleLoginAdmin}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-sm"
        >
          Administrator (Demo)
        </button>
      </div>
        
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Nie masz konta? <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
};
