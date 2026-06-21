import { useState, useEffect } from 'react';
import { ArrowLeft, Users, LayoutDashboard, Building2 } from 'lucide-react';
import { WorkspaceManager } from './adminDashboard/WorkspaceManager';
import { UserManager } from './adminDashboard/UserManager';
import { AddonManager } from './adminDashboard/AddonManager';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { approveOfflinePayment } from '../api/reservationApi';

export const AdminPanel = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'DASHBOARD' | 'WORKSPACES' | 'USERS' | 'ADDONS'>('DASHBOARD');
  
  const { user } = useSelector((state: RootState) => state.auth);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);

  const loadPayments = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:8080/api/payments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const offlinePending = data.filter((p: any) => p.status === 'PENDING' && p.paymentMethod === 'OFFLINE');
        setPendingPayments(offlinePending);
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    if (view === 'DASHBOARD') {
      loadPayments();
    }
  }, [view]);

  const handleApprove = async (paymentId: number) => {
    const token = localStorage.getItem('token');
    if (token && user?.id) {
      try {
        await approveOfflinePayment(token, paymentId, user.id);
        loadPayments();
      } catch (e) {
      }
    }
  };

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
            <div className="mt-auto space-y-3 max-h-48 overflow-y-auto">
              {pendingPayments.length > 0 ? pendingPayments.map(payment => (
                <div key={payment.id} className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800/50 p-3 rounded-md flex justify-between items-center transition-colors">
                  <div>
                    <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400">Rezerwacja #{payment.reservationId}</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-500">Do zapłaty: {payment.amount} PLN</p>
                  </div>
                  <button 
                    onClick={() => handleApprove(payment.id)}
                    className="bg-yellow-600 text-white text-xs px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Zatwierdź
                  </button>
                </div>
              )) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Brak płatności do zatwierdzenia.</p>
              )}
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