import { Link, useLocation } from 'react-router-dom';
import { Briefcase, ShoppingCart, User as UserIcon, LogIn, Menu, X, Settings, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  const isActive = (path: string) => location.pathname === path;
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon?: any }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive(to)
          ? 'bg-emerald-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-gray-900 dark:bg-black text-white shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400">
              <Briefcase size={24} />
              SpaceSync
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-4">
              <NavLink to="/offer">{t('nav.offer')}</NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <div className="flex items-center space-x-2 border-r border-gray-700 pr-4 mr-2">
              <button onClick={toggleLanguage} className="p-2 text-gray-300 hover:text-white transition flex items-center gap-1 text-sm font-semibold uppercase">
                <Globe size={18} /> {i18n.language}
              </button>
              <button onClick={() => setIsDark(!isDark)} className="p-2 text-gray-300 hover:text-white transition">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <Link to="/checkout" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive('/checkout') ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              <div className="relative">
                <ShoppingCart size={18} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <span>{t('nav.cart')}</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/client" icon={UserIcon}>{t('nav.clientPanel')}</NavLink>
                {isAdmin && <NavLink to="/admin" icon={Settings}>{t('nav.admin')}</NavLink>}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md transition-colors"
                >
                  <LogOut size={16} />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <NavLink to="/login" icon={LogIn}>{t('nav.login')}</NavLink>
            )}
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="text-gray-300 hover:text-white">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLanguage} className="text-gray-300 font-bold uppercase text-sm">
              {i18n.language}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-900 dark:bg-black">
          <NavLink to="/offer">{t('nav.offer')}</NavLink>
          <NavLink to="/checkout" icon={ShoppingCart}>{t('nav.cart')} ({items.length})</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/client" icon={UserIcon}>{t('nav.clientPanel')}</NavLink>
              {isAdmin && <NavLink to="/admin" icon={Settings}>{t('nav.admin')}</NavLink>}
              <button 
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <LogOut size={18} />
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <NavLink to="/login" icon={LogIn}>{t('nav.login')}</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};
