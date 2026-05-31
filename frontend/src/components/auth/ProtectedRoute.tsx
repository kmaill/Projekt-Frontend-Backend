import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface ProtectedRouteProps {
  requiredRole?: 'USER' | 'ADMIN';
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isCheckingAuth, user } = useSelector((state: RootState) => state.auth);

  if (isCheckingAuth) {
    return <div className="min-h-[80vh] flex items-center justify-center dark:text-white font-semibold">Ładowanie</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
