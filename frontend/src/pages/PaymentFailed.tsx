import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PaymentFailed = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center dark:text-white px-4 text-center">
      <XCircle size={80} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">{t('payment.failed.title')}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        {t('payment.failed.desc')}
      </p>
      <button 
        onClick={() => navigate('/checkout')}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {t('payment.failed.btn')}
      </button>
    </div>
  );
};