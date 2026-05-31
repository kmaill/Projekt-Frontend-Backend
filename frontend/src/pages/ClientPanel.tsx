import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import * as React from "react";
import {useEffect} from "react";
import {createCompanyProfile, fetchCompanyProfile} from "../api/companyProfileApi.ts";
import {useNavigate} from "react-router-dom";
import {logout} from "../store/authSlice.ts";
import {useDispatch} from "react-redux";

const invoiceSchema = z.object({
  companyName: z.string().min(3, 'Nazwa firmy musi mieć co najmniej 3 znaki'),
  nip: z.string().regex(/^[0-9]{10}$/, 'NIP musi składać się dokładnie z 10 cyfr'),
  street: z.string().min(3, 'Ulica jest wymagana'),
  city: z.string().min(2, 'Miasto jest wymagane'),
  postalCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/, 'Niepoprawny kod pocztowy (np. 00-000)'),
  email: z.email('Niepoprawny format adresu e-mail'),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export type InvoicePayload = {
  companyName: string;
  nip: string;
  address: string;
  contactEmail: string;
};

export const ClientPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editCheck, setEditCheck] = React.useState(false);
  const [currentInvoice, setCurrentInvoice] = React.useState<InvoicePayload | null>(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      //do zmiany - nie odnawia tokenu
      if(token == null) {
        dispatch(logout());
        //nie wiem czemu po odświerzeniu przechodzi do loginu nawet bez wylogowywania
        //navigate('/login');
      } else {
        try {
          const fetchAttempt = await fetchCompanyProfile(token);
          setCurrentInvoice({
            companyName: fetchAttempt.companyName,
            nip: fetchAttempt.nip,
            address: fetchAttempt.address,
            contactEmail: fetchAttempt.contactEmail,
          });
          console.log(currentInvoice);
        } catch (error) {
          setEditCheck(true);
        }
      }
    }
    load();
  }, []);

  useEffect(() => {
    if(!editCheck) {
      const load = async () => {
        const token = localStorage.getItem("token");
        if(token == null) {
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
            console.log("Error temp message");
          }
        }
      }
      load();
    }
  }, [editCheck]);

  const onSubmit = async (data: InvoiceFormValues) => {
    const token = localStorage.getItem('token');
    if(token == null) {
      dispatch(logout());
      navigate('/login');
    } else {
      const payloadForBackend: InvoicePayload = {
        companyName: data.companyName,
        nip: data.nip,
        address: `${data.street}, ${data.postalCode} ${data.city}`,
        contactEmail: data.email
      };

      console.log('Payload: ', payloadForBackend);
      await createCompanyProfile(token, payloadForBackend);
      setEditCheck(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 dark:text-gray-100 transition-colors">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b dark:border-gray-700 pb-2">Moje Rezerwacje</h2>
        <div className="space-y-4">
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">Biurko Open Space A1</h3>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full font-semibold">
                Zatwierdzona
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data: 18.05.2026</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Godziny: 09:00 - 17:00 (8h)</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">Sala Konferencyjna Mała</h3>
              <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-400 text-xs px-2 py-1 rounded-full font-semibold">
                Oczekuje na płatność
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data: 20.05.2026</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Godziny: 10:00 - 12:00 (2h)</p>
          </div>

        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dane do faktury</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Wprowadź poprawne dane swojej firmy, abyśmy mogli zautomatyzować proces fakturowania.</p>
        
        {isSubmitSuccessful && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg text-sm">
            Dane zostały pomyślnie zaktualizowane!
          </div>
        )}

        {editCheck ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nazwa firmy</label>
              <input
                  {...register('companyName')}
                  className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP (10 cyfr)</label>
              <input
                  {...register('nip')}
                  className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.nip ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
              />
              {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ulica</label>
                <input
                    {...register('street')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.street ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Miasto</label>
                <input
                    {...register('city')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kod pocztowy</label>
                <input
                    {...register('postalCode')}
                    placeholder="00-000"
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.postalCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail (do
                  faktur)</label>
                <input
                    {...register('email')}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <button type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors mt-4">
              Zapisz dane
            </button>
          </form>
        ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nazwa firmy</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.companyName ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.nip ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.address ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                    readOnly={true}
                    value={currentInvoice?.contactEmail ?? ""}
                    className={`w-full px-3 py-2 border dark:bg-gray-700 rounded-md focus:outline-none ${errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-200'}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>
              <button onClick={() => setEditCheck(true)}
                      className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors mt-4">
                Edytuj
              </button>

            </div>
        )}
      </div>

    </div>
  );
};
