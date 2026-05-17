import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": {
        "title": "Work flexibly, wherever and whenever you want",
        "subtitle": "SpaceSync is a system for instant booking of desks and meeting rooms. Discover a new quality of coworking.",
        "checkOffer": "Check Offer",
        "login": "Log in",
        "desks": "Desks per hour",
        "desksDesc": "Book desks in an open space per hour, day or week.",
        "rooms": "Meeting Rooms",
        "roomsDesc": "Professional meeting rooms equipped with modern AV gear.",
        "management": "Online Management",
        "managementDesc": "All reservations and invoices gathered in one panel."
      },
      "nav": {
        "offer": "Offer",
        "cart": "Cart",
        "clientPanel": "Client Panel",
        "admin": "Admin",
        "logout": "Log out",
        "login": "Log in"
      },
      "offer": {
        "title": "Our Offer",
        "subtitle": "Choose the perfect space for you and your company.",
        "all": "All",
        "desks": "Desks",
        "rooms": "Rooms",
        "capacity": "Capacity",
        "person": "person",
        "people": "people",
        "priceHour": "PLN / h",
        "book": "Book"
      },
      "booking": {
        "details": "Reservation Details",
        "date": "Date",
        "startTime": "Start Time",
        "duration": "Duration (hours)",
        "addons": "Additional services",
        "cancel": "Cancel",
        "addToCart": "Add to cart",
        "added": "Added to cart!"
      },
      "checkout": {
        "title": "Cart and Checkout",
        "summary": "Summary",
        "date": "Date",
        "duration": "Duration",
        "total": "Total to pay",
        "paymentMethod": "Select payment method:",
        "onlinePayment": "Online Payment",
        "bankTransfer": "Bank Transfer",
        "emptyCart": "Your cart is empty.",
        "backToOffer": "Back to offer",
        "addons": "Add-ons:"
      }
    }
  },
  pl: {
    translation: {
      "home": {
        "title": "Pracuj elastycznie, gdzie chcesz i kiedy chcesz",
        "subtitle": "SpaceSync to system do błyskawicznej rezerwacji biurek i sal konferencyjnych. Odkryj nową jakość pracy coworkingowej.",
        "checkOffer": "Sprawdź Ofertę",
        "login": "Zaloguj się",
        "desks": "Biurka na godziny",
        "desksDesc": "Rezerwuj biurka w otwartej przestrzeni na godziny, dni lub tygodnie.",
        "rooms": "Sale Konferencyjne",
        "roomsDesc": "Profesjonalne sale spotkań wyposażone w najnowocześniejszy sprzęt AV.",
        "management": "Zarządzanie Online",
        "managementDesc": "Wszystkie rezerwacje i faktury zebrane w jednym wygodnym panelu."
      },
      "nav": {
        "offer": "Oferta",
        "cart": "Koszyk",
        "clientPanel": "Panel Klienta",
        "admin": "Admin",
        "logout": "Wyloguj",
        "login": "Zaloguj"
      },
      "offer": {
        "title": "Nasza Oferta",
        "subtitle": "Wybierz idealną przestrzeń dla siebie i swojej firmy.",
        "all": "Wszystkie",
        "desks": "Biurka",
        "rooms": "Sale",
        "capacity": "Pojemność",
        "person": "osoba",
        "people": "osób",
        "priceHour": "PLN / h",
        "book": "Rezerwuj"
      },
      "booking": {
        "details": "Szczegóły rezerwacji",
        "date": "Data",
        "startTime": "Godzina rozpoczęcia",
        "duration": "Czas trwania (godziny)",
        "addons": "Dodatkowe usługi",
        "cancel": "Anuluj",
        "addToCart": "Dodaj do koszyka",
        "added": "Dodano do koszyka!"
      },
      "checkout": {
        "title": "Koszyk i Finalizacja",
        "summary": "Podsumowanie",
        "date": "Data",
        "duration": "Czas trwania",
        "total": "Razem do zapłaty",
        "paymentMethod": "Wybierz metodę płatności:",
        "onlinePayment": "Płatność Online",
        "bankTransfer": "Przelew Tradycyjny",
        "emptyCart": "Twój koszyk jest pusty.",
        "backToOffer": "Wróć do oferty",
        "addons": "Dodatki:"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pl",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;