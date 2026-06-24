import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as React from "react";
import { useEffect, useState } from "react";
import { createCompanyProfile, fetchCompanyProfile } from "../api/companyProfileApi.ts";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAllReservations } from '../api/reservationApi';
import { fetchWorkspaces } from '../api/offerApi';
import type { RootState } from '../store/store';

const getInvoiceSchema = (t: any) => z.object({
  companyName: z.string().min(3, t('clientPanel.errors.companyName')),
  nip: z.string().regex(/^[0-9]{10}$/, t('clientPanel.errors.nip')),
  street: z.string().min(3, t('clientPanel.errors.street')),
  city: z.string().min(2, t('clientPanel.errors.city')),
  postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, t('clientPanel.errors.postalCode')),
  email: z.email(t('clientPanel.errors.email')),
});

type InvoiceFormValues = z.infer<ReturnType<typeof getInvoiceSchema>>;

export type InvoicePayload = {
  companyName: string;
  nip: string;
  address: string;
  contactEmail: string;
};

export const ClientPanel = () => {
  const { t } = useTranslation();
  const invoiceSchema = React.useMemo(() => getInvoiceSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [editCheck, setEditCheck] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<InvoicePayload | null>(null);
  
  const [reservations, setReservations] = useState<any[]>([]);
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      if (token == null) {
        dispatch(logout());
        navigate('/login');
      } else {
        try {
          const fetchAttempt = await fetchCompanyProfile(token);
          setCurrentInvoice({
            companyName: fetchAttempt.companyName,
            nip: fetchAttempt.nip,
            address: fetchAttempt.address,
            contactEmail: fetchAttempt.contactEmail,
          });
        } catch (error) {
          setEditCheck(true);
        }
      }
    }
    load();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!editCheck) {
      const load = async () => {
        const token = localStorage.getItem("token");
        if (token == null) {
          dispatch(logout());
          navigate('/login');
        } else {
          try {
            const fetchAttempt = await fetchCompanyProfile(token);
            setCurrentInvoice({
              companyName: fetchAttempt.companyName,
              nip: fetchAttempt.nip,
              address: fetchAttempt.address,
              contactEmail: fetchAttempt.contactEmail,
            });
          } catch (error) {
          }
        }
      }
      load();
    }
  }, [editCheck, dispatch, navigate]);

  useEffect(() => {
    const fetchResData = async () => {
      const token = localStorage.getItem('token');
      if (token && user?.id) {
        try {
          const [resData, wsData] = await Promise.all([
            getAllReservations(token),
            fetchWorkspaces()
          ]);
          const myReservations = resData.filter((r: any) => r.userId === user.id);
          setReservations(myReservations);
          setWorkspaces(wsData);
        } catch (e) {
        }
      }
    };
    fetchResData();
  }, [user]);

  const onSubmit = async (data: InvoiceFormValues) => {
    const token = localStorage.getItem('token');
    if (token == null) {
      dispatch(logout());
      navigate('/login');
    } else {
      const payloadForBackend: InvoicePayload = {
        companyName: data.companyName,
        nip: data.nip,
        address: `${data.street}, ${data.postalCode} ${data.city}`,
        contactEmail: data.email
      };

      await createCompanyProfile(token, payloadForBackend);
      setEditCheck(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 dark:text-gray-100 transition-colors">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b dark:border-gray-700 pb-2">{t('clientPanel.myReservations')}</h2>
        <div className="space-y-4">
          
          {reservations.length > 0 ? reservations.map(r => {
            const ws = workspaces.find(w => w.id === r.workspaceId);
            return (
              <div key={r.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{ws ? ws.name : `${t('clientPanel.res.workspaceId')}: ${r.workspaceId}`}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${r.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : r.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'}`}>
                    {t(`clientPanel.res.status.${r.status}`)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {t('clientPanel.res.start')}: {new Date(r.startTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('clientPanel.res.end')}: {new Date(r.endTime).toLocaleString()}
                </p>
              </div>
            )
          }) : (
            <p className="text-gray-500 dark:text-gray-400">{t('clientPanel.res.noData')}</p>
          )}

        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('clientPanel.invoiceDataTitle')}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('clientPanel.invoiceDataDesc')}</p>
        
        {isSubmitSuccessful && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg text-sm">
            {t('clientPanel.successMsg')}
          </div>
        )}

        {editCheck ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.companyName')}</label>
              <input
                  {...register('companyName')}
                  className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.nip')}</label>
              <input
                  {...register('nip')}
                  className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.nip ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
              />
              {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip.message as string}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.street')}</label>
                <input
                    {...register('street')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.street ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.city')}</label>
                <input
                    {...register('city')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.postalCode')}</label>
                <input
                    {...register('postalCode')}
                    placeholder="00-000"
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.postalCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.email')}</label>
                <input
                    {...register('email')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>
            </div>

            <button type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors mt-4">
              {t('clientPanel.saveBtn')}
            </button>
          </form>
        ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.companyName')}</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.companyName ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.nip')}</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.nip ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.street')}</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.address ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('clientPanel.email')}</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.contactEmail ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message as string}</p>}
              </div>
              <button onClick={() => setEditCheck(true)}
                      className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors mt-4">
                {t('clientPanel.editBtn')}
              </button>

            </div>
        )}
      </div>

    </div>
  );
};