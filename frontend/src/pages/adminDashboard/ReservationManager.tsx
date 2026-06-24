import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { getAllReservations, deleteReservation } from '../../api/reservationApi';
import { fetchWorkspaces } from '../../api/offerApi';
import { getAllUsers } from '../../api/userApi';
import { useTranslation } from 'react-i18next';

interface Reservation {
  id: number;
  workspaceId: number;
  userId: number;
  startTime: string;
  endTime: string;
  status: string;
}

export const ReservationManager = () => {
  const { t } = useTranslation();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const [resData, wsData, userData] = await Promise.all([
        getAllReservations(),
        fetchWorkspaces(),
        getAllUsers()
      ]);
      setReservations(resData);
      setWorkspaces(wsData);
      setUsers(userData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if(!confirm(t('adminPanel.reservations.deleteConfirm'))) return;
    const token = localStorage.getItem('token');
    if(token) {
        try {
            await deleteReservation(id);
            fetchData();
        } catch(e) {
            console.error(e);
        }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('adminPanel.reservations.dbTitle')}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 border-b dark:border-gray-700 rounded-tl-lg">ID</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.reservations.table.workspace')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.reservations.table.user')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.reservations.table.start')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.reservations.table.end')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.reservations.table.status')}</th>
              <th className="p-4 border-b dark:border-gray-700 rounded-tr-lg text-right">{t('adminPanel.reservations.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {reservations.map(r => {
              const ws = workspaces.find(w => w.id === r.workspaceId);
              const usr = users.find(u => u.id === r.userId);
              return (
              <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-500 dark:text-gray-400">#{r.id}</td>
                <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{ws ? ws.name : `ID: ${r.workspaceId}`}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{usr ? `${usr.name} (${usr.email})` : `ID: ${r.userId}`}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">{new Date(r.startTime).toLocaleString()}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">{new Date(r.endTime).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${r.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : r.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleDelete(r.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )})}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500 dark:text-gray-400">{t('adminPanel.users.noData')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
