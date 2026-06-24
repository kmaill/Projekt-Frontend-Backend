import { useState } from 'react';
import { Copy, CheckCircle, ArrowLeft, Building2 } from 'lucide-react';

interface OfflinePaymentProps {
  amount: number;
  reservationId: number;
  onBack: () => void;
}

export const OfflinePaymentScreen = ({ amount, reservationId, onBack }: OfflinePaymentProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    companyName: "SpaceSync Sp. z o.o.",
    bankName: "mBank S.A.",
    iban: "PL 11 1140 2004 0000 3002 0123 4567",
    swift: "BREXPLPW",
    title: `Rezerwacja nr #${reservationId}`,
    amount: `${amount.toFixed(2)} PLN`
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Wróć do rezerwacji
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Przelew tradycyjny</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Opłać rezerwację zgodnie z poniższymi danymi</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-300">
            Pamiętaj, aby w tytule przelewu wpisać <strong>dokładnie</strong> podany niżej tytuł. Przyspieszy to proces księgowania i zatwierdzenia Twojej rezerwacji.
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Odbiorca</p>
                <p className="font-medium text-gray-900 dark:text-white">{bankDetails.companyName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{bankDetails.bankName}</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Numer konta (IBAN)</p>
                <p className="font-mono font-bold text-lg text-gray-900 dark:text-white tracking-wide">{bankDetails.iban}</p>
              </div>
              <button 
                onClick={() => handleCopy(bankDetails.iban, 'iban')}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Kopiuj numer konta"
              >
                {copiedField === 'iban' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tytuł przelewu</p>
                <p className="font-medium text-gray-900 dark:text-white">{bankDetails.title}</p>
              </div>
              <button 
                onClick={() => handleCopy(bankDetails.title, 'title')}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Kopiuj tytuł"
              >
                {copiedField === 'title' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Kwota do zapłaty</p>
                <p className="font-bold text-xl text-blue-600 dark:text-blue-400">{bankDetails.amount}</p>
              </div>
              <button 
                onClick={() => handleCopy(amount.toString(), 'amount')}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Kopiuj kwotę"
              >
                {copiedField === 'amount' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};