import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsUser, loginAsAdmin } from '../store/authSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              />
            </div>
          </div>

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
