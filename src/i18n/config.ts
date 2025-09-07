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
      "booking.quickBooking": "Quick Booking",
      "booking.checkin": "Check-in",
      "booking.checkout": "Check-out",
      "booking.guests": "Number of guests",
      "booking.checkAvailability": "Check Availability",
      "booking.guest": "guest",
      "booking.guests_plural": "guests",
      
      // About
      "about.title": "Where art meets hospitality",
      "about.subtitle": "A journey through time and art",
      "about.description1": "In 1914, Paul Klee discovered the light and colors of Tunisia, which changed his art forever. Today, Dar Dhiafa Klee continues this legacy in an exceptional guesthouse in the heart of the old city of Kairouan.",
      "about.description2": "Our guesthouse draws its inspiration from Paul Klee's transformative stay in Tunisia. Each space reflects the colorful richness and geometry that characterized his most famous works, while preserving the authenticity of traditional Kairouan architecture.",
      "about.description3": "In the historic city of Kairouan, the first capital of Ifriqiya, we offer a unique experience where contemporary art, millennial heritage and legendary Tunisian hospitality come together.",
      "about.feature1.title": "Artistic Inspiration",
      "about.feature1.description": "Inspired by Paul Klee's Tunisian watercolors (1914)",
      "about.feature2.title": "Authentic Hospitality",
      "about.feature2.description": "Traditional Tunisian welcome art in the old city",
      "about.feature3.title": "Historical Heritage",
      "about.feature3.description": "In the heart of Kairouan, first capital of Ifriqiya",
      "about.feature4.title": "Recognized Excellence",
      "about.feature4.description": "A unique experience combining art, culture and comfort",
      
      // Rooms Details
      "rooms.traditional.title": "Traditional Room",
      "rooms.traditional.description": "Authenticity and comfort in traditional Tunisian decor",
      "rooms.suite.title": "Klee Suite",
      "rooms.suite.description": "Modern elegance inspired by Paul Klee's art",
      "rooms.deluxe.title": "Deluxe Room",
      "rooms.deluxe.description": "Luxury and elegance with panoramic terrace",
      "rooms.amenities.wifi": "Free WiFi",
      "rooms.amenities.ac": "Air conditioning",
      "rooms.amenities.bathroom": "Private bathroom",
      "rooms.amenities.balcony": "Balcony",
      "rooms.amenities.livingroom": "Private lounge",
      "rooms.amenities.bathtub": "Bathtub",
      "rooms.amenities.cityview": "City view",
      "rooms.amenities.teaservice": "Tea service",
      "rooms.amenities.privateterrace": "Private terrace",
      "rooms.amenities.minibar": "Mini bar",
      "rooms.amenities.roomservice": "Room service",
      "rooms.amenities.panoramicview": "Panoramic view",
      
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
      "booking.quickBooking": "Réservation rapide",
      "booking.checkin": "Arrivée",
      "booking.checkout": "Départ",
      "booking.guests": "Nombre d'hôtes",
      "booking.checkAvailability": "Vérifier la disponibilité",
      "booking.guest": "personne",
      "booking.guests_plural": "personnes",
      
      // About
      "about.title": "L'art et l'hospitalité au cœur de Kairouan",
      "about.subtitle": "Un voyage à travers le temps et l'art",
      "about.description1": "En 1914, Paul Klee découvre la lumière et les couleurs de la Tunisie, ce qui changera son art à jamais. Aujourd'hui, Dar Dhiafa Klee perpétue cet héritage dans une maison d'hôtes exceptionnelle au cœur de la vieille ville de Kairouan.",
      "about.description2": "Notre maison d'hôtes puise son inspiration dans le séjour transformateur de Paul Klee en Tunisie. Chaque espace reflète la richesse colorée et la géométrie qui ont caractérisé ses œuvres les plus célèbres, tout en préservant l'authenticité de l'architecture traditionnelle kairouanaise.",
      "about.description3": "Dans la ville historique de Kairouan, première capitale de l'Ifriqiya, nous proposons une expérience unique où l'art contemporain, l'héritage millénaire et l'hospitalité tunisienne légendaire se rencontrent.",
      "about.feature1.title": "Inspiration artistique",
      "about.feature1.description": "Inspiré par les aquarelles tunisiennes de Paul Klee (1914)",
      "about.feature2.title": "Hospitalité authentique",
      "about.feature2.description": "Art de l'accueil tunisien traditionnel dans la médina",
      "about.feature3.title": "Patrimoine historique",
      "about.feature3.description": "Au cœur de Kairouan, première capitale de l'Ifriqiya",
      "about.feature4.title": "Excellence reconnue",
      "about.feature4.description": "Une expérience unique alliant art, culture et confort",
      
      // Rooms Details
      "rooms.traditional.title": "Chambre Traditionnelle",
      "rooms.traditional.description": "Authenticité et confort dans un décor tunisien traditionnel",
      "rooms.suite.title": "Suite Klee",
      "rooms.suite.description": "Élégance moderne inspirée par l'art de Paul Klee",
      "rooms.deluxe.title": "Chambre Deluxe",
      "rooms.deluxe.description": "Luxe et élégance avec terrasse panoramique",
      "rooms.amenities.wifi": "WiFi gratuit",
      "rooms.amenities.ac": "Climatisation",
      "rooms.amenities.bathroom": "Salle de bain privée",
      "rooms.amenities.balcony": "Balcon",
      "rooms.amenities.livingroom": "Salon privé",
      "rooms.amenities.bathtub": "Baignoire",
      "rooms.amenities.cityview": "Vue sur la ville",
      "rooms.amenities.teaservice": "Service de thé",
      "rooms.amenities.privateterrace": "Terrasse privée",
      "rooms.amenities.minibar": "Mini bar",
      "rooms.amenities.roomservice": "Service en chambre",
      "rooms.amenities.panoramicview": "Vue panoramique",
      
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
      "booking.quickBooking": "الحجز السريع",
      "booking.checkin": "تاريخ الوصول",
      "booking.checkout": "تاريخ المغادرة",
      "booking.guests": "عدد الضيوف",
      "booking.checkAvailability": "تحقق من التوفر",
      "booking.guest": "ضيف",
      "booking.guests_plural": "ضيوف",
      
      // About  
      "about.title": "حيث يلتقي الفن بالضيافة",
      "about.subtitle": "رحلة عبر الزمن والفن",
      "about.description1": "في عام 1914، اكتشف بول كلي ضوء وألوان تونس، مما غيّر فنه إلى الأبد. اليوم، تواصل دار ضيافة كلي هذا التراث في بيت ضيافة استثنائي في قلب مدينة القيروان العتيقة.",
      "about.description2": "يستمد بيت ضيافتنا إلهامه من إقامة بول كلي التحويلية في تونس. كل مساحة تعكس الثراء اللوني والهندسة التي ميزت أشهر أعماله، مع الحفاظ على أصالة العمارة القيروانية التقليدية.",
      "about.description3": "في المدينة التاريخية للقيروان، أول عاصمة لإفريقية، نقدم تجربة فريدة حيث يمتزج الفن المعاصر والتراث الألفي والضيافة التونسية الأسطورية معاً.",
      "about.feature1.title": "الإلهام الفني",
      "about.feature1.description": "مستوحى من ألوان بول كلي المائية التونسية (1914)",
      "about.feature2.title": "الضيافة الأصيلة",
      "about.feature2.description": "فن الترحيب التونسي التقليدي في المدينة العتيقة",
      "about.feature3.title": "التراث التاريخي",
      "about.feature3.description": "في قلب القيروان، أول عاصمة لإفريقية",
      "about.feature4.title": "التميز المعترف به",
      "about.feature4.description": "تجربة فريدة تجمع بين الفن والثقافة والراحة",
      
      // Rooms Details
      "rooms.traditional.title": "غرفة تقليدية", 
      "rooms.traditional.description": "الأصالة والراحة في ديكور تونسي تقليدي",
      "rooms.suite.title": "جناح كلي",
      "rooms.suite.description": "أناقة عصرية مستوحاة من فن بول كلي",
      "rooms.deluxe.title": "غرفة فاخرة",
      "rooms.deluxe.description": "فخامة وأناقة مع شرفة بانورامية",
      "rooms.amenities.wifi": "واي فاي مجاني",
      "rooms.amenities.ac": "تكييف هواء",
      "rooms.amenities.bathroom": "حمام خاص",
      "rooms.amenities.balcony": "شرفة",
      "rooms.amenities.livingroom": "صالة خاصة",
      "rooms.amenities.bathtub": "حوض استحمام",
      "rooms.amenities.cityview": "إطلالة على المدينة",
      "rooms.amenities.teaservice": "خدمة الشاي",
      "rooms.amenities.privateterrace": "شرفة خاصة",
      "rooms.amenities.minibar": "ميني بار",
      "rooms.amenities.roomservice": "خدمة الغرف",
      "rooms.amenities.panoramicview": "إطلالة بانورامية",
      
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