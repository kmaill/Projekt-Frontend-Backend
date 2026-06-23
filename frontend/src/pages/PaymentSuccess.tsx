import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('reservation_id');

  useEffect(() => {
    console.log("Strona sukcesu załadowana. ID rezerwacji:", reservationId);

    if (reservationId) {
       fetch(`http://localhost:8080/api/reservations/confirm/${reservationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        console.log("Odpowiedź z serwera:", res.status);
      })
      .catch(err => console.error("Błąd wysyłania potwierdzenia:", err));
    }

    const timer = setTimeout(() => {
      navigate('/client');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate, reservationId]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center dark:text-white px-4 text-center">
      <CheckCircle size={80} className="text-emerald-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Sukces!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Rezerwacja ID: {reservationId} została opłacona i potwierdzona.
      </p>
      <button 
        onClick={() => navigate('/client')}
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
      >
        Panel Klienta
      </button>
    </div>
  );
};