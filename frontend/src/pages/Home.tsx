import { Link } from 'react-router-dom';
import { Building2, Laptop, CalendarCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col dark:bg-gray-900 transition-colors duration-200">
      <section className="bg-emerald-600 dark:bg-emerald-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('home.title')}</h1>
          <p className="text-xl md:text-2xl mb-10 text-emerald-100">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/offer" className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {t('home.checkOffer')}
            </Link>
            <Link to="/login" className="bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-emerald-800 transition-colors border border-emerald-500">
              {t('home.login')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <Laptop size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{t('home.desks')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('home.desksDesc')}</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{t('home.rooms')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('home.roomsDesc')}</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
              <CalendarCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{t('home.management')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('home.managementDesc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
