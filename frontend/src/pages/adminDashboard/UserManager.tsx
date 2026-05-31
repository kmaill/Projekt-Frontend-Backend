import { getAllUsers, updateUserRole, deleteUser } from '../../api/userApi';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsersData = async () => {
    try {
      const token = localStorage.getItem('token');
      if(token) {
        const data = await getAllUsers(token);
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchUsersData(); }, []);

  const handleRoleChange = async (id: number, newRole: string) => {
    const token = localStorage.getItem('token');
    if(token) {
      await updateUserRole(token, id, newRole);
      fetchUsersData();
    }
  };

  const handleDeleteUser = async (id: number) => {
    if(!confirm("Na pewno usunąć użytkownika?")) return;
    const token = localStorage.getItem('token');
    if(token) {
      await deleteUser(token, id);
      fetchUsersData();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Baza Użytkowników</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 border-b dark:border-gray-700 rounded-tl-lg">ID</th>
              <th className="p-4 border-b dark:border-gray-700">Imię / Nazwa</th>
              <th className="p-4 border-b dark:border-gray-700">Email</th>
              <th className="p-4 border-b dark:border-gray-700">Data Rejestracji</th>
              <th className="p-4 border-b dark:border-gray-700">Rola</th>
              <th className="p-4 border-b dark:border-gray-700 rounded-tr-lg text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-500 dark:text-gray-400">#{u.id}</td>
                <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{u.name || '-'}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <select 
                    value={u.role || 'USER'} 
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className={`text-xs font-bold rounded-full px-2 py-1 outline-none cursor-pointer border-none bg-transparent ${u.role === 'ADMIN' ? 'text-red-700 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}
                  >
                    <option value="USER" className="text-black bg-white">USER</option>
                    <option value="ADMIN" className="text-black bg-white">ADMIN</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500 dark:text-gray-400">Brak danych / Ładowanie...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};