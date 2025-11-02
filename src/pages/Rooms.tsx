// Rooms and Suites page - Detailed room listings with photos, descriptions, and booking
// Features room gallery, amenities, pricing, and availability checking

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { roomsData } from "@/data/rooms";
import Header from "@/components/Header";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import { 
  Calendar,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

const Rooms = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  

  // État pour les données des chambres avec synchronisation
  const [roomsDataState, setRoomsDataState] = useState(roomsData);

  // Fonction pour charger les données des chambres
  const loadRoomsData = () => {
    const savedPricing = localStorage.getItem('roomPricing');
    if (savedPricing) {
      try {
        const pricingData = JSON.parse(savedPricing);
        // Mettre à jour les prix des chambres avec les données de l'administration
        const updatedRooms = roomsData.map(room => {
          const pricingInfo = pricingData.find((p: any) => p.id === room.id);
          return pricingInfo ? { ...room, pricePerNight: pricingInfo.pricePerNight } : room;
        });
        setRoomsDataState(updatedRooms);
      } catch (error) {
        console.error('Error loading room pricing from localStorage:', error);
        setRoomsDataState(roomsData);
      }
    } else {
      setRoomsDataState(roomsData);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    loadRoomsData();

    // Écouter les changements de localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'roomPricing' && e.newValue) {
        loadRoomsData();
      }
    };

    // Écouter les événements personnalisés
    const handleCustomUpdate = () => {
      loadRoomsData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('roomPricingUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('roomPricingUpdated', handleCustomUpdate);
    };
  }, []);

  // Organiser les chambres par catégorie
  const roomsByCategory = {
    "S.ROYALE": roomsDataState.filter(r => r.category === "S.ROYALE"),
    "TWIN": roomsDataState.filter(r => r.category === "TWIN"),
    "DOUBLE": roomsDataState.filter(r => r.category === "DOUBLE"),
    "FAMILIALE": roomsDataState.filter(r => r.category === "FAMILIALE")
  };

  // Définir les catégories avec leurs descriptions
  const categories = [
    {
      id: "S.ROYALE",
      name: {
        fr: "Suite Royale",
        en: "Royal Suite",
        ar: "جناح ملكي"
      },
      description: {
        fr: "Nos suites royales offrent un espace généreux avec lit double et salon privé. Parfaites pour un séjour d'exception dans un cadre luxueux et raffiné.",
        en: "Our royal suites offer generous space with double bed and private lounge. Perfect for an exceptional stay in a luxurious and refined setting.",
        ar: "أجنحتنا الملكية توفر مساحة واسعة مع سرير مزدوج وصالة خاصة. مثالية لإقامة استثنائية في إطار فاخر ومتطور."
      },
      image: "/chambre 2.png",
      rooms: roomsByCategory["S.ROYALE"],
      features: {
        fr: ["Lit double confortable", "Salon privé spacieux", "Service VIP", "Minibar", "Salle de bain privée avec peignoirs", "45-48m²"],
        en: ["Comfortable double bed", "Spacious private lounge", "VIP service", "Minibar", "Private bathroom with bathrobes", "45-48m²"],
        ar: ["سرير مزدوج مريح", "صالة خاصة فسيحة", "خدمة VIP", "ميني بار", "حمام خاص مع مناشف", "45-48م²"]
      },
      capacity: {
        fr: "Jusqu'à 3 personnes",
        en: "Up to 3 guests",
        ar: "حتى 3 أشخاص"
      },
      priceRange: {
        min: Math.min(...roomsByCategory["S.ROYALE"].map(r => r.pricePerNight)),
        max: Math.max(...roomsByCategory["S.ROYALE"].map(r => r.pricePerNight))
      }
    },
    {
      id: "TWIN",
      name: {
        fr: "Chambres Twin",
        en: "Twin Rooms",
        ar: "غرف توأم"
      },
      description: {
        fr: "Chambres avec deux lits simples séparés, idéales pour les amis ou collègues de voyage. Confortables et fonctionnelles avec tous les équipements nécessaires.",
        en: "Rooms with two separate single beds, ideal for friends or traveling colleagues. Comfortable and functional with all necessary amenities.",
        ar: "غرف مع سريرين منفصلين، مثالية للأصدقاء أو الزملاء المسافرين. مريحة وعملية مع جميع المرافق اللازمة."
      },
      image: "/chambre 1.png",
      rooms: roomsByCategory["TWIN"],
      features: {
        fr: ["2 lits simples séparés", "Parfait pour 2 personnes", "Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "24-26m²"],
        en: ["2 separate single beds", "Perfect for 2 guests", "Free Wi-Fi", "Air conditioning", "Private bathroom", "24-26m²"],
        ar: ["سريران منفصلان", "مثالية لشخصين", "واي فاي مجاني", "تكييف", "حمام خاص", "24-26م²"]
      },
      capacity: {
        fr: "2 personnes",
        en: "2 guests",
        ar: "شخصان"
      },
      priceRange: {
        min: Math.min(...roomsByCategory["TWIN"].map(r => r.pricePerNight)),
        max: Math.max(...roomsByCategory["TWIN"].map(r => r.pricePerNight))
      }
    },
    {
      id: "DOUBLE",
      name: {
        fr: "Chambres Double",
        en: "Double Rooms",
        ar: "غرف مزدوجة"
      },
      description: {
        fr: "Chambres doubles avec lit double confortable, décorées dans l'esprit traditionnel tunisien. Idéales pour les couples cherchant confort et authenticité.",
        en: "Double rooms with comfortable double bed, decorated in traditional Tunisian spirit. Ideal for couples seeking comfort and authenticity.",
        ar: "غرف مزدوجة مع سرير مزدوج مريح، مزينة بروح تونسية تقليدية. مثالية للأزواج الذين يبحثون عن الراحة والأصالة."
      },
      image: "/chambre 1.png",
      rooms: roomsByCategory["DOUBLE"],
      features: {
        fr: ["Lit double confortable", "Décoration traditionnelle", "Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "25-28m²"],
        en: ["Comfortable double bed", "Traditional decoration", "Free Wi-Fi", "Air conditioning", "Private bathroom", "25-28m²"],
        ar: ["سرير مزدوج مريح", "ديكور تقليدي", "واي فاي مجاني", "تكييف", "حمام خاص", "25-28م²"]
      },
      capacity: {
        fr: "2 personnes",
        en: "2 guests",
        ar: "شخصان"
      },
      priceRange: {
        min: Math.min(...roomsByCategory["DOUBLE"].map(r => r.pricePerNight)),
        max: Math.max(...roomsByCategory["DOUBLE"].map(r => r.pricePerNight))
      }
    },
    {
      id: "FAMILIALE",
      name: {
        fr: "Chambres Triple/Familiale",
        en: "Triple/Family Rooms",
        ar: "غرف ثلاثية/عائلية"
      },
      description: {
        fr: "Chambres familiales spacieuses avec deux grands lits, parfaites pour les familles avec enfants. Offrent confort et espace pour tous.",
        en: "Spacious family rooms with two large beds, perfect for families with children. Offer comfort and space for everyone.",
        ar: "غرف عائلية فسيحة مع سريرين كبيرين، مثالية للعائلات مع الأطفال. توفر الراحة والمساحة للجميع."
      },
      image: "/chambre 2.png",
      rooms: roomsByCategory["FAMILIALE"],
      features: {
        fr: ["2 grands lits confortables", "Espace famille généreux", "Parfait pour enfants", "Wi-Fi gratuit", "Climatisation", "35-38m²"],
        en: ["2 comfortable large beds", "Generous family space", "Perfect for children", "Free Wi-Fi", "Air conditioning", "35-38m²"],
        ar: ["سريران كبيران مريحان", "مساحة عائلية واسعة", "مثالية للأطفال", "واي فاي مجاني", "تكييف", "35-38م²"]
      },
      capacity: {
        fr: "Jusqu'à 4 personnes",
        en: "Up to 4 guests",
        ar: "حتى 4 أشخاص"
      },
      priceRange: {
        min: Math.min(...roomsByCategory["FAMILIALE"].map(r => r.pricePerNight)),
        max: Math.max(...roomsByCategory["FAMILIALE"].map(r => r.pricePerNight))
      }
    }
  ];

  const getCurrentLanguage = () => {
    const lang = localStorage.getItem('i18nextLng') || 'fr';
    return lang as 'fr' | 'en' | 'ar';
  };

  const currentLang = getCurrentLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 bg-gradient-to-br from-indigo-medina/10 to-vert-porte/10">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Chambres & Suites'}
              {currentLang === 'en' && 'Rooms & Suites'}
              {currentLang === 'ar' && 'الغرف والأجنحة'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Découvrez nos chambres et suites élégamment décorées, alliant confort moderne et charme traditionnel tunisien dans le cœur historique de Kairouan.'}
              {currentLang === 'en' && 'Discover our elegantly decorated rooms and suites, combining modern comfort with traditional Tunisian charm in the historic heart of Kairouan.'}
              {currentLang === 'ar' && 'اكتشف غرفنا وأجنحتنا المزينة بأناقة، والتي تجمع بين الراحة العصرية والسحر التونسي التقليدي في قلب القيروان التاريخي.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={staggerItem}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 border-0 bg-card h-full">
                    {/* Category Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-terre-cuite text-white font-medium font-medium text-sm">
                          {category.name[currentLang]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-sm font-semibold text-terre-cuite">
                          {category.rooms.length} {currentLang === 'fr' ? 'chambres' : currentLang === 'en' ? 'rooms' : 'غرف'}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      {/* Category Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold font-bold text-indigo-medina mb-2">
                          {category.name[currentLang]}
                          </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-medium mb-3">
                          <span>{category.capacity[currentLang]}</span>
                          {category.priceRange.min === category.priceRange.max ? (
                            <span>• {formatPrice(category.priceRange.min)} {currentLang === 'fr' ? 'par nuit' : currentLang === 'en' ? 'per night' : 'في الليلة'}</span>
                          ) : (
                            <span>• {formatPrice(category.priceRange.min)} - {formatPrice(category.priceRange.max)} {currentLang === 'fr' ? 'par nuit' : currentLang === 'en' ? 'per night' : 'في الليلة'}</span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground font-medium leading-relaxed mb-6 flex-grow">
                        {category.description[currentLang]}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-medium font-semibold text-terre-cuite mb-3 text-sm">
                          {currentLang === 'fr' && 'Caractéristiques'}
                          {currentLang === 'en' && 'Features'}
                          {currentLang === 'ar' && 'المميزات'}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {category.features[currentLang].map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-medium">
                              <Check className="w-3 h-3 text-vert-porte flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                              <Button 
                        className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold transition-all duration-300 mt-auto"
                                size="sm"
                                onClick={() => navigate('/booking')}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                        {currentLang === 'fr' && 'Réserver une chambre'}
                        {currentLang === 'en' && 'Book a Room'}
                        {currentLang === 'ar' && 'احجز غرفة'}
                        </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-sable to-card">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Besoin d\'aide pour choisir ?'}
              {currentLang === 'en' && 'Need help choosing?'}
              {currentLang === 'ar' && 'تحتاج مساعدة في الاختيار؟'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Notre équipe est là pour vous conseiller et vous aider à trouver l\'hébergement parfait pour votre séjour à Kairouan.'}
              {currentLang === 'en' && 'Our team is here to advise you and help you find the perfect accommodation for your stay in Kairouan.'}
              {currentLang === 'ar' && 'فريقنا هنا لتقديم المشورة ومساعدتك في العثور على الإقامة المثالية لإقامتك في القيروان.'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Contactez-nous'}
                {currentLang === 'en' && 'Contact Us'}
                {currentLang === 'ar' && 'اتصل بنا'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Voir disponibilités'}
                {currentLang === 'en' && 'Check Availability'}
                {currentLang === 'ar' && 'تحقق من التوفر'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default Rooms;
