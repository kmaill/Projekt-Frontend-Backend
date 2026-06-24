import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { removeItem, clearCart } from '../store/cartSlice';
import { createReservationRequest, addAddonToReservationRequest, createPaymentRequest, createStripeSession } from '../api/reservationApi';

import { OfflinePaymentScreen } from './OfflinePaymentScreen';

export const Checkout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [showOfflinePayment, setShowOfflinePayment] = useState(false);
  const [offlinePaymentData, setOfflinePaymentData] = useState({ amount: 0, reservationId: 0 });

  const handleCheckout = async (method: 'ONLINE' | 'OFFLINE') => {
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !user || !token) {
      alert("Musisz być zalogowany, aby dokonać rezerwacji!");
      navigate('/login');
      return;
    }

    try {
      let firstReservationId = 0;

      for (const item of items) {

        const startDateTime = `${item.date}T${item.startTime}:00`;
        const [hoursPart, minutesPart] = item.startTime.split(':').map(Number);
        let endHour: number;
        let formattedEndHour;
        let endDateTime;
        const [year, month, day] = item.date.split('-').map(Number);
        if((hoursPart + item.hours) >= 24) {
          let temp: number = hoursPart + item.hours;
          endHour = temp%24;
          console.log(endHour);
          formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
          endDateTime = `${year}-${month < 10 ? '0' : ''}${month}-${day + Math.floor(temp/24)}T${formattedEndHour}:${minutesPart < 10 ? '0' : ''}${minutesPart}:00`;
          console.log(endDateTime);
        } else {
          endHour = hoursPart + item.hours;
          formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
          endDateTime = `${item.date}T${formattedEndHour}:${minutesPart < 10 ? '0' : ''}${minutesPart}:00`;
        }

        console.log(hoursPart + item.hours);
        const reservation = await createReservationRequest({
          workspaceId: item.workspaceId,
          startTime: startDateTime,
          endTime: endDateTime,
          userId: user.id
        });

        if (firstReservationId === 0) {
          firstReservationId = reservation.id;
        }

        for (const addon of item.addons) {
          await addAddonToReservationRequest({
            reservationId: reservation.id,
            addonId: Number(addon.id),
            quantity: 1
          });
        }
        
        const itemTotalAmount = item.pricePerHour * item.hours + item.addons.reduce((acc, a) => acc + (a.billingType === 'PER_HOUR' ? a.price * item.hours : a.price), 0);

        await createPaymentRequest({
          reservationId: reservation.id,
          amount: itemTotalAmount,
          paymentMethod: method
        });

        if (method === 'ONLINE') {
          const { url } = await createStripeSession({
            reservationId: reservation.id,
            amount: itemTotalAmount,
            paymentMethod: 'ONLINE'
          });
          
          dispatch(clearCart());
          window.location.href = url;
          return;
        }
      }

      if (method === 'OFFLINE') {
        setOfflinePaymentData({ amount: total, reservationId: firstReservationId });
        dispatch(clearCart());
        setShowOfflinePayment(true);
      }

    } catch (error: any) {
      alert(error.message || "Wystąpił błąd podczas składania rezerwacji.");
    }
  };

  if (showOfflinePayment) {
    return (
      <OfflinePaymentScreen 
        amount={offlinePaymentData.amount} 
        reservationId={offlinePaymentData.reservationId} 
        onBack={() => navigate('/client')} 
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full dark:text-gray-100 transition-colors">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('checkout.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-4">
          {items.length > 0 ? items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('checkout.date')}: {item.date} {item.startTime} | {t('checkout.duration')}: {item.hours}h
                </p>
                {item.addons.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <strong>{t('checkout.addons')}</strong>
                    <ul className="list-disc pl-4 mt-1">
                      {item.addons.map(addon => (
                        <li key={addon.id}>{addon.name} (+{addon.price} PLN{addon.billingType === 'PER_HOUR' ? '/h' : ''})</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-right flex items-center sm:block gap-4">
                <div>
                  <p className="font-bold text-lg whitespace-nowrap">
                    {item.pricePerHour * item.hours + item.addons.reduce((acc, a) => acc + (a.billingType === 'PER_HOUR' ? a.price * item.hours : a.price), 0)} PLN
                  </p>
                </div>
                <button 
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold underline mt-1"
                >
                  Usuń
                </button>
              </div>
            </div>
          )) : (
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
              {t('checkout.emptyCart')} <Link to="/offer" className="text-emerald-600 dark:text-emerald-400 hover:underline">{t('checkout.backToOffer')}</Link>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-4 border-b dark:border-gray-700 pb-2">{t('checkout.summary')}</h3>
          
          <div className="flex justify-between items-center mb-6 text-lg">
            <span className="text-gray-600 dark:text-gray-400">{t('checkout.total')}:</span>
            <span className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">{total} PLN</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('checkout.paymentMethod')}</p>
            
            <button 
              onClick={() => handleCheckout('ONLINE')}
              disabled={items.length === 0} 
              className="w-full bg-[#005c8a] disabled:opacity-50 text-white py-3 rounded-lg font-medium hover:bg-[#004b70] transition-colors flex justify-center items-center gap-2"
            >
              {t('checkout.onlinePayment')}
            </button>
            
            <button 
              onClick={() => handleCheckout('OFFLINE')}
              disabled={items.length === 0} 
              className="w-full bg-white dark:bg-gray-700 disabled:opacity-50 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex justify-center items-center gap-2"
            >
              {t('checkout.bankTransfer')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};