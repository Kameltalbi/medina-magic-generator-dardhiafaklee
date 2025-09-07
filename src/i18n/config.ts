import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "rooms": "Rooms",
        "experiences": "Experiences",
        "gallery": "Gallery",
        "tour360": "360° Tour",
        "contact": "Contact",
        "booking": "Booking"
      },
      "hero": {
        "title": "Dar Dhiafa Klee",
        "subtitle": "Discover authentic Tunisian hospitality in an exceptional setting that blends tradition and modernity.",
        "bookNow": "Book now",
        "explore360": "Explore in 360°"
      },
      "booking": {
        "title": "Booking",
        "checkIn": "Check-in date",
        "checkOut": "Check-out date",
        "guests": "Guests",
        "search": "Search",
        "availableRooms": "Available rooms",
        "bookRoom": "Book this room",
        "summary": "Booking summary",
        "total": "Total",
        "confirm": "Confirm booking"
      },
      "rooms": {
        "traditional": "Traditional Room",
        "deluxe": "Deluxe Room",
        "suite": "Suite"
      },
      "about": {
        "title": "About Dar Dhiafa Klee",
        "description": "Nestled in the heart of Tunisia, Dar Dhiafa Klee embodies the Mediterranean art of living."
      },
      "contact": {
        "title": "Contact us",
        "address": "Address",
        "phone": "Phone",
        "email": "Email"
      },
      "footer": {
        "brand": "Dar Dhiafa Klee",
        "description": "Your exceptional destination in Tunisia",
        "services": "Services",
        "information": "Information",
        "followUs": "Follow us",
        "allRightsReserved": "All rights reserved"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "rooms": "Chambres",
        "experiences": "Expériences",
        "gallery": "Galerie",
        "tour360": "Visite 360°",
        "contact": "Contact",
        "booking": "Réservation"
      },
      "hero": {
        "title": "Dar Dhiafa Klee",
        "subtitle": "Découvrez l'hospitalité authentique tunisienne dans un cadre exceptionnel alliant tradition et modernité.",
        "bookNow": "Réserver maintenant",
        "explore360": "Explorer en 360°"
      },
      "booking": {
        "title": "Réservation",
        "checkIn": "Date d'arrivée",
        "checkOut": "Date de départ",
        "guests": "Invités",
        "search": "Rechercher",
        "availableRooms": "Chambres disponibles",
        "bookRoom": "Réserver cette chambre",
        "summary": "Résumé de réservation",
        "total": "Total",
        "confirm": "Confirmer la réservation"
      },
      "rooms": {
        "traditional": "Chambre Traditionnelle",
        "deluxe": "Chambre Deluxe",
        "suite": "Suite"
      },
      "about": {
        "title": "À Propos de Dar Dhiafa Klee",
        "description": "Nichée au cœur de la Tunisie, Dar Dhiafa Klee incarne l'art de vivre méditerranéen."
      },
      "contact": {
        "title": "Contactez-nous",
        "address": "Adresse",
        "phone": "Téléphone",
        "email": "Email"
      },
      "footer": {
        "brand": "Dar Dhiafa Klee",
        "description": "Votre destination d'exception en Tunisie",
        "services": "Services",
        "information": "Informations",
        "followUs": "Suivez-nous",
        "allRightsReserved": "Tous droits réservés"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "rooms": "الغرف",
        "experiences": "التجارب",
        "gallery": "المعرض",
        "tour360": "جولة 360°",
        "contact": "اتصل بنا",
        "booking": "الحجز"
      },
      "hero": {
        "title": "دار ضيافة كلي",
        "subtitle": "اكتشف الضيافة التونسية الأصيلة في إطار استثنائي يمزج بين التقاليد والحداثة.",
        "bookNow": "احجز الآن",
        "explore360": "استكشف بزاوية 360°"
      },
      "booking": {
        "title": "الحجز",
        "checkIn": "تاريخ الوصول",
        "checkOut": "تاريخ المغادرة",
        "guests": "الضيوف",
        "search": "بحث",
        "availableRooms": "الغرف المتاحة",
        "bookRoom": "احجز هذه الغرفة",
        "summary": "ملخص الحجز",
        "total": "المجموع",
        "confirm": "تأكيد الحجز"
      },
      "rooms": {
        "traditional": "غرفة تقليدية",
        "deluxe": "غرفة ديلوكس",
        "suite": "جناح"
      },
      "about": {
        "title": "عن دار ضيافة كلي",
        "description": "تقع في قلب تونس، تجسد دار ضيافة كلي فن العيش المتوسطي."
      },
      "contact": {
        "title": "اتصل بنا",
        "address": "العنوان",
        "phone": "الهاتف",
        "email": "البريد الإلكتروني"
      },
      "footer": {
        "brand": "دار ضيافة كلي",
        "description": "وجهتكم الاستثنائية في تونس",
        "services": "الخدمات",
        "information": "المعلومات",
        "followUs": "تابعونا",
        "allRightsReserved": "جميع الحقوق محفوظة"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;