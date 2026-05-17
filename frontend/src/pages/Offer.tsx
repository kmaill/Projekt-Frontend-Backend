import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import type { Addon } from '../store/cartSlice';

const MOCK_WORKSPACES = [
  { id: 1, name: 'Biurko Open Space A1', type: 'DESK', pricePerHour: 20, capacity: 1, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Biurko Open Space A2', type: 'DESK', pricePerHour: 20, capacity: 1, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Sala Konferencyjna Mała', type: 'CONFERENCE_ROOM', pricePerHour: 80, capacity: 6, image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Sala Konferencyjna Duża', type: 'CONFERENCE_ROOM', pricePerHour: 150, capacity: 15, image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=500&q=60' },
];

const AVAILABLE_ADDONS: Addon[] = [
  { id: 'a1', name: 'Projektor multimedialny', price: 20, type: 'PER_HOUR' },
  { id: 'a2', name: 'Catering (kawa, ciastka)', price: 50, type: 'PER_RESERVATION' },
];

export const Offer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState('ALL');
  const [selectedSpace, setSelectedSpace] = useState<typeof MOCK_WORKSPACES[0] | null>(null);
  
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [hours, setHours] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const filteredWorkspaces = MOCK_WORKSPACES.filter(w => filter === 'ALL' || w.type === filter);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleAddToCart = () => {
    if (!selectedSpace || !date) return;

    const addonsToAdd = AVAILABLE_ADDONS.filter(a => selectedAddons.includes(a.id));

    dispatch(addItem({
      id: Date.now().toString(),
      workspaceId: selectedSpace.id,
      name: selectedSpace.name,
      pricePerHour: selectedSpace.pricePerHour,
      date,
      startTime,
      hours,
      addons: addonsToAdd
    }));

    setSelectedSpace(null);
    setDate('');
    setHours(1);
    setSelectedAddons([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full dark:text-gray-100 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('offer.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('offer.subtitle')}</p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => setFilter('ALL')} className={`px-4 py-2 rounded-md font-medium ${filter === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{t('offer.all')}</button>
          <button onClick={() => setFilter('DESK')} className={`px-4 py-2 rounded-md font-medium ${filter === 'DESK' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{t('offer.desks')}</button>
          <button onClick={() => setFilter('CONFERENCE_ROOM')} className={`px-4 py-2 rounded-md font-medium ${filter === 'CONFERENCE_ROOM' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{t('offer.rooms')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWorkspaces.map(workspace => (
          <div key={workspace.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <img src={workspace.image} alt={workspace.name} className="w-full h-48 object-cover" />
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{workspace.name}</h3>
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs px-2 py-1 rounded-full font-semibold">
                  {workspace.type === 'CONFERENCE_ROOM' ? t('offer.rooms') : t('offer.desks')}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                {t('offer.capacity')}: {workspace.capacity} {workspace.capacity === 1 ? t('offer.person') : t('offer.people')}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{workspace.pricePerHour}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400"> {t('offer.priceHour')}</span>
                </div>
                <button 
                  onClick={() => setSelectedSpace(workspace)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t('offer.book')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSpace && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-700">{t('booking.details')}: {selectedSpace.name}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('booking.date')}</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 rounded-lg outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('booking.startTime')}</label>
                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 rounded-lg outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('booking.duration')} ({hours}h)</label>
                <input type="range" min="1" max="12" value={hours} onChange={e => setHours(parseInt(e.target.value))} className="w-full" />
              </div>

              {selectedSpace.type === 'CONFERENCE_ROOM' && (
                <div className="pt-2">
                  <label className="block text-sm font-medium mb-2">{t('booking.addons')}</label>
                  <div className="space-y-2">
                    {AVAILABLE_ADDONS.map(addon => (
                      <label key={addon.id} className="flex items-center gap-2 p-2 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input type="checkbox" checked={selectedAddons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} className="w-4 h-4 text-emerald-600" />
                        <div className="flex justify-between w-full">
                          <span>{addon.name}</span>
                          <span className="font-semibold">+{addon.price} PLN {addon.type === 'PER_HOUR' ? '/h' : ''}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setSelectedSpace(null)} className="px-5 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                {t('booking.cancel')}
              </button>
              <button onClick={handleAddToCart} disabled={!date} className="px-5 py-2 rounded-lg font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                {t('booking.addToCart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
