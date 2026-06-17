import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit, Trash2, Plus } from 'lucide-react';
import { fetchAddons, createAddon, updateAddon, deleteAddon } from '../../api/offerApi';
import { useTranslation } from 'react-i18next';

interface Addon {
  id: number;
  name: string;
  price: number;
  billingType: string;
}

export const AddonManager = () => {
  const { t } = useTranslation();
  const [addons, setAddons] = useState<Addon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', price: 10, billingType: 'PER_RESERVATION' }
  });

  const fetchAddonsData = async () => {
    try {
      const data = await fetchAddons();
      //console.log(data);
      setAddons(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchAddonsData(); }, []);

  const handleDelete = async (id: number) => {
    if(!confirm(t('adminPanel.addons.deleteConfirm'))) return;
    const token = localStorage.getItem('token');
    if(token) {
        await deleteAddon(token, id);
        fetchAddonsData();
    }
  };

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if(!token) return;

    if (editingAddon) {
      await updateAddon(token, editingAddon.id, data);
    } else {
      await createAddon(token, data);
    }
    
    setIsModalOpen(false);
    fetchAddonsData();
  };

  const openModal = (addon?: Addon) => {
    if(addon) {
      setEditingAddon(addon);
      reset({ 
        name: addon.name, 
        price: addon.price, 
        billingType: addon.billingType || (addon as any).billing_type || 'PER_RESERVATION'
      });
    } else {
      setEditingAddon(null);
      reset({ name: '', price: 10, billingType: 'PER_RESERVATION' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('adminPanel.addons.dbTitle')}</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
          <Plus size={18} /> {t('adminPanel.addons.addBtn')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 border-b dark:border-gray-700 rounded-tl-lg">ID</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.addons.table.name')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.addons.table.billingType')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.addons.table.price')}</th>
              <th className="p-4 border-b dark:border-gray-700 rounded-tr-lg text-right">{t('adminPanel.addons.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {addons.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-500 dark:text-gray-400">#{a.id}</td>
                <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{a.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${(a.billingType === 'PER_HOUR' || (a as any).billing_type === 'PER_HOUR') ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'}`}>
                    {(a.billingType === 'PER_HOUR' || (a as any).billing_type === 'PER_HOUR') ? 'PER_HOUR' : 'PER_RESERVATION'}
                  </span>
                </td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">{a.price} PLN</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => openModal(a)} className="p-2 text-gray-500 hover:text-emerald-600 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {addons.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">{t('adminPanel.users.noData')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {editingAddon ? t('adminPanel.addons.modal.editTitle') : t('adminPanel.addons.modal.newTitle')}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.addons.modal.name')}</label>
                <input {...register('name', { required: true })} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.addons.modal.price')}</label>
                  <input type="number" step="0.01" {...register('price', { required: true, valueAsNumber: true })} min="0" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.addons.modal.billing')}</label>
                  <select {...register('billingType')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="PER_RESERVATION">PER_RESERVATION</option>
                    <option value="PER_HOUR">PER_HOUR</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">{t('adminPanel.addons.modal.cancel')}</button>
                <button type="submit" className="px-5 py-2 rounded-lg font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg hover:shadow-xl">{t('adminPanel.addons.modal.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
