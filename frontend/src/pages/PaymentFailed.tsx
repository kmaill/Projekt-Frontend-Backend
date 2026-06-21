import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center dark:text-white px-4 text-center">
      <XCircle size={80} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Płatność odrzucona</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Transakcja nie mogła zostać zrealizowana. Spróbuj ponownie lub wybierz inną metodę.
      </p>
      <button 
        onClick={() => navigate('/checkout')}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Wróć do koszyka
      </button>
    </div>
  );
};