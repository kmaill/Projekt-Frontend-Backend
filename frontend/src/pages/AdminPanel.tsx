import { useState } from 'react';
import { ArrowLeft, Users, LayoutDashboard, Building2 } from 'lucide-react';
import { WorkspaceManager } from './adminDashboard/WorkspaceManager';
import { UserManager } from './adminDashboard/UserManager';
import { AddonManager } from './adminDashboard/AddonManager';
import { useTranslation } from 'react-i18next';

export const AdminPanel = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'DASHBOARD' | 'WORKSPACES' | 'USERS' | 'ADDONS'>('DASHBOARD');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full dark:text-gray-100 transition-colors duration-200">
      <div className="flex items-center gap-4 mb-8 border-b dark:border-gray-700 pb-4">
        {view !== 'DASHBOARD' && (
          <button 
            onClick={() => setView('DASHBOARD')} 
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <LayoutDashboard size={32} className="text-emerald-600" />
          {t('adminPanel.dashboard.title')}
        </h1>
      </div>

      {view === 'DASHBOARD' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-200">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Building2 size={20} className="text-emerald-600"/> {t('adminPanel.dashboard.offlinePayments.title')}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{t('adminPanel.dashboard.offlinePayments.desc')}</p>
            <div className="mt-auto space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800/50 p-3 rounded-md flex justify-between items-center transition-colors">
                <div>
                  <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400">Firma ABC (Sala Duża)</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-500">Do zapłaty: 300 PLN</p>
                </div>
                <button className="bg-yellow-600 text-white text-xs px-3 py-1 rounded hover:bg-yellow-700 transition-colors">
                  Zatwierdź
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-200">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Building2 size={20} className="text-emerald-600"/> {t('adminPanel.dashboard.workspaces.title')}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{t('adminPanel.dashboard.workspaces.desc')}</p>
            <button 
              onClick={() => setView('WORKSPACES')}
              className="mt-auto bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              {t('adminPanel.dashboard.workspaces.btn')}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-200">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Building2 size={20} className="text-emerald-600"/> {t('adminPanel.dashboard.addons.title')}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{t('adminPanel.dashboard.addons.desc')}</p>
            <button 
              onClick={() => setView('ADDONS')}
              className="mt-auto bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              {t('adminPanel.dashboard.addons.btn')}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-200">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Users size={20} className="text-emerald-600"/> {t('adminPanel.dashboard.users.title')}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{t('adminPanel.dashboard.users.desc')}</p>
            <button 
              onClick={() => setView('USERS')}
              className="mt-auto bg-gray-800 dark:bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
            >
              {t('adminPanel.dashboard.users.btn')}
            </button>
          </div>
        </div>
      )}

      {view === 'WORKSPACES' && <WorkspaceManager />}
      {view === 'USERS' && <UserManager />}
      {view === 'ADDONS' && <AddonManager />}
    </div>
  );
};
