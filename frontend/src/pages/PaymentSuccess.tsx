import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('reservation_id');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/client');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center dark:text-white px-4 text-center">
      <CheckCircle size={80} className="text-emerald-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Płatność zakończona sukcesem!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Dziękujemy. Twoja rezerwacja (ID: {reservationId}) została opłacona.
      </p>
      <button 
        onClick={() => navigate('/client')} 
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
      >
        Wróć do Panelu Klienta
      </button>
    </div>
  );
};