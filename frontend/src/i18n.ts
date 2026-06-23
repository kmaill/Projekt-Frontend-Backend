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
      },
      "loginPage": {
        "welcomeBack": "Welcome back",
        "loginToManage": "Log in to manage your reservations",
        "emailLabel": "Email address",
        "emailPlaceholder": "your@email.com",
        "passwordLabel": "Password",
        "forgotPassword": "Forgot password?",
        "passwordPlaceholder": "••••••••",
        "invalidCredentials": "Invalid email or password",
        "loginBtn": "Log in",
        "orLoginWith": "or log in with",
        "noAccount": "Don't have an account?",
        "registerLink": "Register"
      },
      "clientPanel": {
        "myReservations": "My Reservations",
        "invoiceDataTitle": "Invoice Data",
        "invoiceDataDesc": "Enter your company's correct data so we can automate the invoicing process.",
        "successMsg": "Data has been successfully updated!",
        "companyName": "Company Name",
        "nip": "VAT ID (NIP)",
        "street": "Street",
        "city": "City",
        "postalCode": "Postal Code",
        "email": "E-mail (for invoices)",
        "saveBtn": "Save Data",
        "editBtn": "Edit",
        "errors": {
          "companyName": "Company name must have at least 3 characters",
          "nip": "VAT ID must consist of exactly 10 digits",
          "street": "Street is required",
          "city": "City is required",
          "postalCode": "Invalid postal code format",
          "email": "Invalid e-mail format"
        }
      },
      "adminPanel": {
        "dashboard": {
          "title": "Administrator Panel",
          "offlinePayments": {
            "title": "Offline Payments",
            "desc": "Approve payments from corporate clients."
          },
          "workspaces": {
            "title": "Workspace Management",
            "desc": "Add new desks, edit prices and remove spaces.",
            "btn": "Go to editor"
          },
          "addons": {
            "title": "Add-on Management",
            "desc": "Add new add-ons, edit prices and remove.",
            "btn": "Go to editor"
          },
          "users": {
            "title": "User Management",
            "desc": "Browse accounts, assign ADMIN/USER roles and manage the client base.",
            "btn": "User list"
          },
          "reservations": {
            "title": "Reservation Management",
            "desc": "View, manage and delete reservations in the system.",
            "btn": "Reservation list"
          }
        },
        "workspaces": {
          "deleteConfirm": "Are you sure you want to delete this workspace?",
          "dbTitle": "Workspace Database",
          "addBtn": "Add New",
          "table": {
            "name": "Name",
            "type": "Type",
            "capacity": "Capacity",
            "price": "Price /h",
            "status": "Status",
            "actions": "Actions"
          },
          "active": "Active",
          "inactive": "Inactive",
          "modal": {
            "editTitle": "Edit Workspace",
            "newTitle": "New Workspace",
            "name": "Name",
            "type": "Type",
            "desk": "Desk (DESK)",
            "room": "Room (CONFERENCE_ROOM)",
            "capacity": "Capacity (people)",
            "price": "Price /h (PLN)",
            "isActive": "Active",
            "cancel": "Cancel",
            "save": "Save"
          }
        },
        "users": {
          "deleteConfirm": "Are you sure you want to delete this user?",
          "dbTitle": "User Database",
          "table": {
            "name": "Name",
            "email": "Email",
            "regDate": "Registration Date",
            "role": "Role",
            "actions": "Actions"
          },
          "noData": "No data / Loading..."
        },
        "reservations": {
          "deleteConfirm": "Are you sure you want to delete this reservation?",
          "dbTitle": "Reservation Database",
          "table": {
            "workspace": "Workspace",
            "user": "User",
            "start": "Start",
            "end": "End",
            "status": "Status",
            "actions": "Actions"
          }
        },
        "addons": {
          "deleteConfirm": "Are you sure you want to delete this add-on?",
          "dbTitle": "Add-on Database",
          "addBtn": "Add New",
          "table": {
            "name": "Name",
            "billingType": "Billing Type",
            "price": "Price",
            "actions": "Actions"
          },
          "modal": {
            "editTitle": "Edit Add-on",
            "newTitle": "New Add-on",
            "name": "Add-on Name",
            "price": "Price (PLN)",
            "billing": "Billing",
            "perRes": "Per Reservation",
            "perHour": "Per Hour",
            "cancel": "Cancel",
            "save": "Save"
          }
        }
      },
      "registerPage": {
        "joinUs": "Join us",
        "createAccount": "Create an account to access the space",
        "fullNameLabel": "Full name",
        "fullNamePlaceholder": "John Doe",
        "emailLabel": "Email address",
        "emailPlaceholder": "your@email.com",
        "passwordLabel": "Password",
        "passwordPlaceholder": "••••••••",
        "emailExists": "An account with this email already exists",
        "createAccountBtn": "Create account",
        "orRegisterWith": "or register with",
        "haveAccount": "Already have an account?",
        "loginLink": "Log in"
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
      },
      "loginPage": {
        "welcomeBack": "Witaj ponownie",
        "loginToManage": "Zaloguj się, aby zarządzać rezerwacjami",
        "emailLabel": "Adres e-mail",
        "emailPlaceholder": "twoj@email.com",
        "passwordLabel": "Hasło",
        "forgotPassword": "Zapomniałeś?",
        "passwordPlaceholder": "••••••••",
        "invalidCredentials": "Nieprawidłowy email lub hasło",
        "loginBtn": "Zaloguj",
        "orLoginWith": "lub zaloguj przez",
        "noAccount": "Nie masz konta?",
        "registerLink": "Zarejestruj się"
      },
      "clientPanel": {
        "myReservations": "Moje Rezerwacje",
        "invoiceDataTitle": "Dane do faktury",
        "invoiceDataDesc": "Wprowadź poprawne dane swojej firmy, abyśmy mogli zautomatyzować proces fakturowania.",
        "successMsg": "Dane zostały pomyślnie zaktualizowane!",
        "companyName": "Nazwa firmy",
        "nip": "NIP (10 cyfr)",
        "street": "Ulica",
        "city": "Miasto",
        "postalCode": "Kod pocztowy",
        "email": "E-mail (do faktur)",
        "saveBtn": "Zapisz dane",
        "editBtn": "Edytuj",
        "errors": {
          "companyName": "Nazwa firmy musi mieć co najmniej 3 znaki",
          "nip": "NIP musi składać się dokładnie z 10 cyfr",
          "street": "Ulica jest wymagana",
          "city": "Miasto jest wymagane",
          "postalCode": "Niepoprawny kod pocztowy (np. 00-000)",
          "email": "Niepoprawny format adresu e-mail"
        }
      },
      "adminPanel": {
        "dashboard": {
          "title": "Panel Administratora",
          "offlinePayments": {
            "title": "Płatności Offline",
            "desc": "Zatwierdzaj wpłaty od klientów korporacyjnych."
          },
          "workspaces": {
            "title": "Zarządzanie Przestrzeniami",
            "desc": "Dodawaj nowe biurka, edytuj ceny i usuwaj przestrzenie.",
            "btn": "Przejdź do edytora"
          },
          "addons": {
            "title": "Zarządzanie Dodatkami",
            "desc": "Dodawaj nowe dodatki, edytuj ceny i usuwaj.",
            "btn": "Przejdź do edytora"
          },
          "users": {
            "title": "Zarządzanie Użytkownikami",
            "desc": "Przeglądaj konta, przypisuj role ADMIN/USER i zarządzaj bazą klientów.",
            "btn": "Lista użytkowników"
          },
          "reservations": {
            "title": "Zarządzanie Rezerwacjami",
            "desc": "Przeglądaj, zarządzaj i usuwaj rezerwacje w systemie.",
            "btn": "Lista rezerwacji"
          }
        },
        "workspaces": {
          "deleteConfirm": "Na pewno chcesz usunąć tę przestrzeń?",
          "dbTitle": "Baza Przestrzeni",
          "addBtn": "Dodaj Nową",
          "table": {
            "name": "Nazwa",
            "type": "Typ",
            "capacity": "Pojemność",
            "price": "Cena /h",
            "status": "Status",
            "actions": "Akcje"
          },
          "active": "Aktywna",
          "inactive": "Nieaktywna",
          "modal": {
            "editTitle": "Edytuj Przestrzeń",
            "newTitle": "Nowa Przestrzeń",
            "name": "Nazwa",
            "type": "Typ",
            "desk": "Biurko (DESK)",
            "room": "Sala (CONFERENCE_ROOM)",
            "capacity": "Pojemność (os.)",
            "price": "Cena /h (PLN)",
            "isActive": "Aktywna",
            "cancel": "Anuluj",
            "save": "Zapisz"
          }
        },
        "users": {
          "deleteConfirm": "Na pewno usunąć użytkownika?",
          "dbTitle": "Baza Użytkowników",
          "table": {
            "name": "Imię / Nazwa",
            "email": "Email",
            "regDate": "Data Rejestracji",
            "role": "Rola",
            "actions": "Akcje"
          },
          "noData": "Brak danych / Ładowanie..."
        },
        "reservations": {
          "deleteConfirm": "Na pewno chcesz usunąć tę rezerwację?",
          "dbTitle": "Baza Rezerwacji",
          "table": {
            "workspace": "Przestrzeń",
            "user": "Użytkownik",
            "start": "Od",
            "end": "Do",
            "status": "Status",
            "actions": "Akcje"
          }
        },
        "addons": {
          "deleteConfirm": "Na pewno chcesz usunąć ten dodatek?",
          "dbTitle": "Baza Dodatków",
          "addBtn": "Dodaj Nowy",
          "table": {
            "name": "Nazwa",
            "billingType": "Typ rozliczenia",
            "price": "Cena",
            "actions": "Akcje"
          },
          "modal": {
            "editTitle": "Edytuj Dodatek",
            "newTitle": "Nowy Dodatek",
            "name": "Nazwa dodatku",
            "price": "Cena (PLN)",
            "billing": "Rozliczenie",
            "perRes": "Za Rezerwację",
            "perHour": "Za Godzinę",
            "cancel": "Anuluj",
            "save": "Zapisz"
          }
        }
      },
      "registerPage": {
        "joinUs": "Dołącz do nas",
        "createAccount": "Załóż konto i zyskaj dostęp do przestrzeni",
        "fullNameLabel": "Imię i nazwisko",
        "fullNamePlaceholder": "Jan Kowalski",
        "emailLabel": "Adres e-mail",
        "emailPlaceholder": "twoj@email.com",
        "passwordLabel": "Hasło",
        "passwordPlaceholder": "••••••••",
        "emailExists": "Istnieje już konto z takim emailem",
        "createAccountBtn": "Utwórz konto",
        "orRegisterWith": "lub zaloguj przez",
        "haveAccount": "Masz już konto?",
        "loginLink": "Zaloguj się"
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