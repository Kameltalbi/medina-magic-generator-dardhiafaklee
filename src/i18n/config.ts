import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "nav.home": "Home",
      "nav.about": "About",
      "nav.rooms": "Rooms",
      "nav.experiences": "Experiences",
      "nav.gallery": "Gallery",
      "nav.virtualTour": "Virtual Tour",
      "nav.tour360": "360° Tour",
      "nav.contact": "Contact",
      "nav.book": "Book Now",
      "nav.booking": "Booking",
      
      // Hero
      "hero.title": "Art and hospitality in the heart of Kairouan",
      "hero.subtitle": "A guesthouse inspired by Paul Klee. Authenticity, architectural charm and artistic immersion.",
      "hero.bookNow": "Book Now",
      "hero.explore360": "Explore in 360°",
      
      // Quick Booking
      "booking.checkin": "Check-in",
      "booking.checkout": "Check-out",
      "booking.guests": "Number of guests",
      "booking.checkAvailability": "Check Availability",
      "booking.guest": "guest",
      "booking.guests_plural": "guests",
      
      // About
      "about.title": "The artistic heritage of Kairouan",
      "about.description1": "In 1914, Paul Klee discovered Kairouan and its extraordinary colors that would forever transform his art. \"I am a painter,\" he wrote in his journal after this Tunisian revelation. Dar Dhiafa Klee perpetuates this legacy by offering you total immersion in the art and traditional architecture of the medina.",
      "about.description2": "Our guesthouse, nestled in the heart of centuries-old alleys, combines architectural authenticity with Klee's artistic inspirations. Each space tells a story, each color evokes a memory of this founding journey.",
      "about.learnMore": "Discover our story",
      
      // Rooms
      "rooms.title": "Rooms & Suites",
      "rooms.subtitle": "Unique spaces where art meets comfort",
      "rooms.details": "Details",
      "rooms.book": "Book",
      "rooms.perNight": "/ night",
      "rooms.viewAll": "View all our rooms",
      
      // Experiences
      "experiences.title": "Authentic experiences",
      "experiences.subtitle": "Immerse yourself in the culture and art of Kairouan",
      "experiences.learnMore": "Learn more about our experiences",
      
      // Gallery
      "gallery.title": "Gallery & Virtual Tour",
      "gallery.subtitle": "Art and architecture in images",
      "gallery.launch360": "Launch 360° tour",
      
      // Contact
      "contact.title": "Contact & Location",
      "contact.subtitle": "We are here to welcome you",
      "contact.name": "Your name",
      "contact.email": "Your email",
      "contact.phone": "Your phone",
      "contact.message": "Your message",
      "contact.send": "Send message",
      "contact.address": "Address",
      "contact.telephone": "Phone",
      
      // Footer
      "footer.tagline": "Art and hospitality in the heart of Kairouan",
      "footer.quickLinks": "Quick Links",
      "footer.followUs": "Follow us",
      "footer.newsletter": "Receive our news and special offers",
      "footer.rights": "All rights reserved",
      "footer.legal": "Legal Notice",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service"
    }
  },
  fr: {
    translation: {
      // Header
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.rooms": "Chambres",
      "nav.experiences": "Expériences",
      "nav.gallery": "Galerie",
      "nav.virtualTour": "Visite 360°",
      "nav.tour360": "Visite 360°",
      "nav.contact": "Contact",
      "nav.book": "Réserver",
      "nav.booking": "Réservation",
      
      // Hero
      "hero.title": "L'art et l'hospitalité au cœur de Kairouan",
      "hero.subtitle": "Une maison d'hôtes inspirée par Paul Klee. Authenticité, charme architectural et immersion artistique.",
      "hero.bookNow": "Réserver maintenant",
      "hero.explore360": "Explorer en 360°",
      
      // Quick Booking
      "booking.checkin": "Arrivée",
      "booking.checkout": "Départ",
      "booking.guests": "Nombre d'hôtes",
      "booking.checkAvailability": "Vérifier la disponibilité",
      "booking.guest": "personne",
      "booking.guests_plural": "personnes",
      
      // About
      "about.title": "L'héritage artistique de Kairouan",
      "about.description1": "En 1914, Paul Klee découvre Kairouan et ses couleurs extraordinaires qui transformeront à jamais son art. \"Je suis peintre\", écrit-il dans son journal après cette révélation tunisienne. Dar Dhiafa Klee perpétue cet héritage en vous offrant une immersion totale dans l'art et l'architecture traditionnelle de la médina.",
      "about.description2": "Notre maison d'hôtes, lovée au cœur des ruelles séculaires, marie l'authenticité architecturale aux inspirations artistiques de Klee. Chaque espace raconte une histoire, chaque couleur évoque un souvenir de ce voyage fondateur.",
      "about.learnMore": "Découvrir notre histoire",
      
      // Rooms
      "rooms.title": "Chambres & Suites",
      "rooms.subtitle": "Des espaces uniques où l'art rencontre le confort",
      "rooms.details": "Détails",
      "rooms.book": "Réserver",
      "rooms.perNight": "/ nuit",
      "rooms.viewAll": "Voir toutes nos chambres",
      
      // Experiences
      "experiences.title": "Expériences authentiques",
      "experiences.subtitle": "Plongez dans la culture et l'art de Kairouan",
      "experiences.learnMore": "En savoir plus sur nos expériences",
      
      // Gallery
      "gallery.title": "Galerie & Visite virtuelle",
      "gallery.subtitle": "L'art et l'architecture en images",
      "gallery.launch360": "Lancer la visite 360°",
      
      // Contact
      "contact.title": "Contact & Localisation",
      "contact.subtitle": "Nous sommes là pour vous accueillir",
      "contact.name": "Votre nom",
      "contact.email": "Votre email",
      "contact.phone": "Votre téléphone",
      "contact.message": "Votre message",
      "contact.send": "Envoyer le message",
      "contact.address": "Adresse",
      "contact.telephone": "Téléphone",
      
      // Footer
      "footer.tagline": "L'art et l'hospitalité au cœur de Kairouan",
      "footer.quickLinks": "Liens utiles",
      "footer.followUs": "Suivez-nous",
      "footer.newsletter": "Recevez nos actualités et offres spéciales",
      "footer.rights": "Tous droits réservés",
      "footer.legal": "Mentions légales",
      "footer.privacy": "Politique de confidentialité",
      "footer.terms": "Conditions générales"
    }
  },
  ar: {
    translation: {
      // Header
      "nav.home": "الرئيسية",
      "nav.about": "حولنا",
      "nav.rooms": "الغرف",
      "nav.experiences": "التجارب",
      "nav.gallery": "المعرض",
      "nav.virtualTour": "جولة 360°",
      "nav.tour360": "جولة 360°",
      "nav.contact": "اتصل بنا",
      "nav.book": "احجز الآن",
      "nav.booking": "الحجز",
      
      // Hero
      "hero.title": "الفن والضيافة في قلب القيروان",
      "hero.subtitle": "دار ضيافة مستوحاة من بول كلي. الأصالة والسحر المعماري والانغماس الفني.",
      "hero.bookNow": "احجز الآن",
      "hero.explore360": "استكشف بزاوية 360°",
      
      // Quick Booking
      "booking.checkin": "تاريخ الوصول",
      "booking.checkout": "تاريخ المغادرة",
      "booking.guests": "عدد الضيوف",
      "booking.checkAvailability": "تحقق من التوفر",
      "booking.guest": "ضيف",
      "booking.guests_plural": "ضيوف",
      
      // About
      "about.title": "التراث الفني للقيروان",
      "about.description1": "في عام 1914، اكتشف بول كلي القيروان وألوانها الاستثنائية التي غيرت فنه إلى الأبد. \"أنا رسام\"، كتب في مذكراته بعد هذا الوحي التونسي. دار ضيافة كلي تديم هذا الإرث بتقديم انغماس كامل في الفن والعمارة التقليدية للمدينة العتيقة.",
      "about.description2": "دار ضيافتنا، المتواجدة في قلب الأزقة العريقة، تجمع بين الأصالة المعمارية والإلهام الفني لكلي. كل مساحة تحكي قصة، كل لون يستحضر ذكرى من هذه الرحلة التأسيسية.",
      "about.learnMore": "اكتشف قصتنا",
      
      // Rooms
      "rooms.title": "الغرف والأجنحة",
      "rooms.subtitle": "مساحات فريدة حيث يلتقي الفن بالراحة",
      "rooms.details": "التفاصيل",
      "rooms.book": "احجز",
      "rooms.perNight": "/ ليلة",
      "rooms.viewAll": "شاهد جميع غرفنا",
      
      // Experiences
      "experiences.title": "تجارب أصيلة",
      "experiences.subtitle": "انغمس في ثقافة وفن القيروان",
      "experiences.learnMore": "تعرف على المزيد حول تجاربنا",
      
      // Gallery
      "gallery.title": "المعرض والجولة الافتراضية",
      "gallery.subtitle": "الفن والعمارة في صور",
      "gallery.launch360": "ابدأ الجولة 360°",
      
      // Contact
      "contact.title": "الاتصال والموقع",
      "contact.subtitle": "نحن هنا لاستقبالكم",
      "contact.name": "اسمك",
      "contact.email": "بريدك الإلكتروني",
      "contact.phone": "هاتفك",
      "contact.message": "رسالتك",
      "contact.send": "إرسال الرسالة",
      "contact.address": "العنوان",
      "contact.telephone": "الهاتف",
      
      // Footer
      "footer.tagline": "الفن والضيافة في قلب القيروان",
      "footer.quickLinks": "روابط مفيدة",
      "footer.followUs": "تابعنا",
      "footer.newsletter": "احصل على أخبارنا وعروضنا الخاصة",
      "footer.rights": "جميع الحقوق محفوظة",
      "footer.legal": "الإشعار القانوني",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الخدمة"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    lng: 'fr', // Set default language explicitly
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