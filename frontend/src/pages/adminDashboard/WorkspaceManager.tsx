import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit, Trash2, Plus } from 'lucide-react';
import { fetchWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace } from '../../api/offerApi';
import { useTranslation } from 'react-i18next';

interface Workspace {
  id: number;
  name: string;
  type: string;
  pricePerHour: number;
  capacity: number;
  isActive: boolean;
}

export const WorkspaceManager = () => {
  const { t } = useTranslation();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', type: 'DESK', pricePerHour: 20, capacity: 1, isActive: true }
  });

  const fetchWorkspacesData = async () => {
    try {
      const data = await fetchWorkspaces();
      setWorkspaces(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchWorkspacesData(); }, []);

  const handleDelete = async (id: number) => {
    if(!confirm(t('adminPanel.workspaces.deleteConfirm'))) return;
    const token = localStorage.getItem('token');
    if(token) {
        await deleteWorkspace(token, id);
        fetchWorkspacesData();
    }
  };

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if(!token) return;

    if (editingWorkspace) {
      await updateWorkspace(token, editingWorkspace.id, data);
    } else {
      await createWorkspace(token, data);
    }
    
    setIsModalOpen(false);
    fetchWorkspacesData();
  };

  const openModal = (workspace?: Workspace) => {
    if(workspace) {
      setEditingWorkspace(workspace);
      reset({ 
        name: workspace.name, 
        type: workspace.type, 
        pricePerHour: workspace.pricePerHour, 
        capacity: workspace.capacity,
        isActive: workspace.isActive ?? true
      });
    } else {
      setEditingWorkspace(null);
      reset({ name: '', type: 'DESK', pricePerHour: 20, capacity: 1, isActive: true });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('adminPanel.workspaces.dbTitle')}</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
          <Plus size={18} /> {t('adminPanel.workspaces.addBtn')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 border-b dark:border-gray-700 rounded-tl-lg">ID</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.workspaces.table.name')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.workspaces.table.type')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.workspaces.table.capacity')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.workspaces.table.price')}</th>
              <th className="p-4 border-b dark:border-gray-700">{t('adminPanel.workspaces.table.status')}</th>
              <th className="p-4 border-b dark:border-gray-700 rounded-tr-lg text-right">{t('adminPanel.workspaces.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {workspaces.map(w => (
              <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-500 dark:text-gray-400">#{w.id}</td>
                <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{w.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${w.type === 'DESK' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'}`}>
                    {w.type}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{w.capacity} os.</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">{w.pricePerHour} PLN</td>
                <td className="p-4">
                  {w.isActive ? (
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                      {t('adminPanel.workspaces.active')}
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                      {t('adminPanel.workspaces.inactive')}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => openModal(w)} className="p-2 text-gray-500 hover:text-emerald-600 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(w.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {editingWorkspace ? t('adminPanel.workspaces.modal.editTitle') : t('adminPanel.workspaces.modal.newTitle')}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.workspaces.modal.name')}</label>
                <input {...register('name', { required: true })} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.workspaces.modal.type')}</label>
                <select {...register('type')} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="DESK">DESK</option>
                  <option value="CONFERENCE_ROOM">CONFERENCE_ROOM</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.workspaces.modal.capacity')}</label>
                  <input type="number" {...register('capacity', { required: true, valueAsNumber: true })} min="1" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t('adminPanel.workspaces.modal.price')}</label>
                  <input type="number" step="0.01" {...register('pricePerHour', { required: true, valueAsNumber: true })} min="0" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="isActive" {...register('isActive')} className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500" />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{t('adminPanel.workspaces.modal.isActive')}</label>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">{t('adminPanel.workspaces.modal.cancel')}</button>
                <button type="submit" className="px-5 py-2 rounded-lg font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg hover:shadow-xl">{t('adminPanel.workspaces.modal.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};