import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

interface CustomJwtPayload {
  sub: string;
  role: 'USER' | 'ADMIN';
  id: number;
}

export const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      try {
        localStorage.setItem('token', token);
        
        const decoded = jwtDecode<CustomJwtPayload>(token);

        dispatch(login({
            email: decoded.sub, 
            role: decoded.role, 
            id: decoded.id 
        }));
        
        navigate('/');
      } catch (error) {
        console.error("Błąd podczas dekodowania tokena", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('payment.oauth.loading')}</p>
    </div>
  );
};