// Rooms and Suites page - Detailed room listings with photos, descriptions, and booking
// Features room gallery, amenities, pricing, and availability checking

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { roomsData } from "@/data/rooms";
import { getRoomStatus } from "@/data/roomAvailability";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Wifi, 
  AirVent, 
  Bath, 
  Building2, 
  Car, 
  Coffee, 
  Tv, 
  Users, 
  Bed,
  Star,
  Calendar,
  MapPin,
  Check,
  XCircle,
  Clock,
  Wrench,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

const Rooms = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formatPrice, getCurrencySymbol } = useCurrency();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Fonction pour obtenir le statut d'une chambre
  const getRoomStatusInfo = (roomId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const status = getRoomStatus(roomId, today);
    return status;
  };

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    const variants = {
      available: "bg-green-100 text-green-800",
      occupied: "bg-red-100 text-red-800",
      reserved: "bg-yellow-100 text-yellow-800",
      maintenance: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  // Fonction pour obtenir l'icône de statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-3 h-3" />;
      case 'occupied': return <XCircle className="w-3 h-3" />;
      case 'reserved': return <Clock className="w-3 h-3" />;
      case 'maintenance': return <Wrench className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  // Fonction pour obtenir le texte de statut
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Occupée';
      case 'reserved': return 'Réservée';
      case 'maintenance': return 'Maintenance';
      default: return 'Inconnu';
    }
  };

  // Convertir les données des chambres pour l'affichage et trier par prix décroissant
  const rooms = roomsData
    .map(room => ({
      id: room.id,
      name: {
        fr: room.title,
        en: room.title, 
        ar: room.title
      },
      category: room.category,
      price: room.pricePerNight,
      currency: getCurrencySymbol(),
      size: room.size,
      capacity: room.capacity,
      rating: room.rating,
      reviews: room.reviews,
      images: [
        room.image,
        room.image, // Pour l'instant, on utilise la même image
        room.image
      ],
      description: {
        fr: room.description,
        en: room.description,
        ar: room.description
      },
      amenities: room.amenities.slice(0, 6).map(amenity => ({
        icon: Wifi, // Icône par défaut, à améliorer
        name: { fr: amenity, en: amenity, ar: amenity }
      })),
      features: room.features.map(feature => ({
        fr: feature,
        en: feature,
        ar: feature
      }))
    }))
    .sort((a, b) => b.price - a.price); // Trier par prix décroissant (plus chères en premier)

  // Filtrer les chambres par catégorie
  const filteredRooms = selectedCategory === "all" 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory);

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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Chambres & Suites'}
              {currentLang === 'en' && 'Rooms & Suites'}
              {currentLang === 'ar' && 'الغرف والأجنحة'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Découvrez nos chambres et suites élégamment décorées, alliant confort moderne et charme traditionnel tunisien dans le cœur historique de Kairouan.'}
              {currentLang === 'en' && 'Discover our elegantly decorated rooms and suites, combining modern comfort with traditional Tunisian charm in the historic heart of Kairouan.'}
              {currentLang === 'ar' && 'اكتشف غرفنا وأجنحتنا المزينة بأناقة، والتي تجمع بين الراحة العصرية والسحر التونسي التقليدي في قلب القيروان التاريخي.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="py-8 px-4 bg-card">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="flex flex-wrap justify-center gap-4 mb-8" variants={staggerItem}>
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Toutes les chambres ({rooms.length})
              </Button>
              <Button
                variant={selectedCategory === "DOUBLE" ? "default" : "outline"}
                onClick={() => setSelectedCategory("DOUBLE")}
                className={selectedCategory === "DOUBLE" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Double ({rooms.filter(r => r.category === "DOUBLE").length})
              </Button>
              <Button
                variant={selectedCategory === "TWIN" ? "default" : "outline"}
                onClick={() => setSelectedCategory("TWIN")}
                className={selectedCategory === "TWIN" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Twin ({rooms.filter(r => r.category === "TWIN").length})
              </Button>
              <Button
                variant={selectedCategory === "FAMILIALE" ? "default" : "outline"}
                onClick={() => setSelectedCategory("FAMILIALE")}
                className={selectedCategory === "FAMILIALE" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Familiale ({rooms.filter(r => r.category === "FAMILIALE").length})
              </Button>
              <Button
                variant={selectedCategory === "DOUBLE+L.B" ? "default" : "outline"}
                onClick={() => setSelectedCategory("DOUBLE+L.B")}
                className={selectedCategory === "DOUBLE+L.B" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Double+L.B ({rooms.filter(r => r.category === "DOUBLE+L.B").length})
              </Button>
              <Button
                variant={selectedCategory === "S.ROYALE" ? "default" : "outline"}
                onClick={() => setSelectedCategory("S.ROYALE")}
                className={selectedCategory === "S.ROYALE" ? "bg-terre-cuite hover:bg-terre-cuite-hover" : ""}
              >
                Suite Royale ({rooms.filter(r => r.category === "S.ROYALE").length})
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  variants={staggerItem}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 border-0 bg-card">
                    {/* Room Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={room.images[0]}
                        alt={room.name[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay pour chambres occupées */}
                      {(() => {
                        const status = getRoomStatusInfo(room.id);
                        if (status === 'occupied') {
                          return (
                            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-[1px] flex items-center justify-center">
                              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-inter font-bold text-sm shadow-lg">
                                🚫 OCCUPÉE
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className="bg-terre-cuite text-white font-inter font-medium">
                          {room.category}
                        </Badge>
                        {room.price >= 350 && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-inter font-bold text-xs">
                            ⭐ Premium
                          </Badge>
                        )}
                        {/* Badge de statut de la chambre */}
                        {(() => {
                          const status = getRoomStatusInfo(room.id);
                          return (
                            <Badge className={`${getStatusBadge(status)} font-inter font-medium text-xs flex items-center gap-1`}>
                              {getStatusIcon(status)}
                              {getStatusText(status)}
                            </Badge>
                          );
                        })()}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-inter font-semibold text-sm">{room.rating}</span>
                          <span className="text-muted-foreground text-xs">({room.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Room Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-playfair font-bold text-indigo-medina mb-1">
                            {room.name[currentLang]}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
                            <span>{room.size}</span>
                            <span>•</span>
                            <span>{room.capacity} {currentLang === 'fr' ? 'personnes' : currentLang === 'en' ? 'guests' : 'أشخاص'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <div className="text-2xl font-playfair font-bold text-terre-cuite">
                              {formatPrice(room.price)}
                            </div>
                            {room.price >= 350 && (
                              <div className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-bold">
                                TOP
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground font-inter">
                            {currentLang === 'fr' && 'par nuit'}
                            {currentLang === 'en' && 'per night'}
                            {currentLang === 'ar' && 'في الليلة'}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                        {room.description[currentLang]}
                      </p>

                      {/* Amenities */}
                      <div className="mb-6">
                        <h4 className="font-inter font-semibold text-indigo-medina mb-3 text-sm">
                          {currentLang === 'fr' && 'Équipements'}
                          {currentLang === 'en' && 'Amenities'}
                          {currentLang === 'ar' && 'المرافق'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                              <amenity.icon className="w-3 h-3 text-vert-porte" />
                              <span className="text-muted-foreground">{amenity.name[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                        {room.amenities.length > 4 && (
                          <button 
                            className="text-xs text-terre-cuite font-inter font-medium mt-2 hover:underline"
                            onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                          >
                            {selectedRoom === room.id 
                              ? (currentLang === 'fr' ? 'Voir moins' : currentLang === 'en' ? 'Show less' : 'عرض أقل')
                              : (currentLang === 'fr' ? `+${room.amenities.length - 4} autres` : currentLang === 'en' ? `+${room.amenities.length - 4} more` : `+${room.amenities.length - 4} المزيد`)
                            }
                          </button>
                        )}
                      </div>

                      {/* Expanded Amenities */}
                      {selectedRoom === room.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4"
                        >
                          <div className="grid grid-cols-1 gap-2 border-t border-border pt-4">
                            {room.amenities.slice(4).map((amenity, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                                <amenity.icon className="w-3 h-3 text-vert-porte" />
                                <span className="text-muted-foreground">{amenity.name[currentLang]}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            <h5 className="font-inter font-semibold text-indigo-medina mb-2 text-sm">
                              {currentLang === 'fr' && 'Points forts'}
                              {currentLang === 'en' && 'Highlights'}
                              {currentLang === 'ar' && 'المميزات'}
                            </h5>
                            <div className="space-y-1">
                              {room.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                                  <Check className="w-3 h-3 text-vert-porte" />
                                  <span className="text-muted-foreground">{feature[currentLang]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {(() => {
                          const status = getRoomStatusInfo(room.id);
                          if (status === 'occupied') {
                            return (
                              <Button 
                                className="flex-1 bg-red-500 text-white font-inter font-semibold cursor-not-allowed"
                                size="sm"
                                disabled
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                {currentLang === 'fr' && 'Occupée'}
                                {currentLang === 'en' && 'Occupied'}
                                {currentLang === 'ar' && 'مشغولة'}
                              </Button>
                            );
                          } else if (status === 'reserved') {
                            return (
                              <Button 
                                className="flex-1 bg-yellow-500 text-white font-inter font-semibold cursor-not-allowed"
                                size="sm"
                                disabled
                              >
                                <Clock className="w-4 h-4 mr-2" />
                                {currentLang === 'fr' && 'Réservée'}
                                {currentLang === 'en' && 'Reserved'}
                                {currentLang === 'ar' && 'محجوزة'}
                              </Button>
                            );
                          } else if (status === 'maintenance') {
                            return (
                              <Button 
                                className="flex-1 bg-gray-500 text-white font-inter font-semibold cursor-not-allowed"
                                size="sm"
                                disabled
                              >
                                <Wrench className="w-4 h-4 mr-2" />
                                {currentLang === 'fr' && 'Maintenance'}
                                {currentLang === 'en' && 'Maintenance'}
                                {currentLang === 'ar' && 'صيانة'}
                              </Button>
                            );
                          } else {
                            return (
                              <Button 
                                className="flex-1 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold transition-all duration-300"
                                size="sm"
                                onClick={() => navigate('/booking')}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                {currentLang === 'fr' && 'Réserver'}
                                {currentLang === 'en' && 'Book Now'}
                                {currentLang === 'ar' && 'احجز الآن'}
                              </Button>
                            );
                          }
                        })()}
                        <Button 
                          variant="outline" 
                          className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold transition-all duration-300"
                          size="sm"
                        >
                          {currentLang === 'fr' && 'Voir détails'}
                          {currentLang === 'en' && 'View Details'}
                          {currentLang === 'ar' && 'عرض التفاصيل'}
                        </Button>
                      </div>
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
              className="text-3xl md:text-4xl font-playfair font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Besoin d\'aide pour choisir ?'}
              {currentLang === 'en' && 'Need help choosing?'}
              {currentLang === 'ar' && 'تحتاج مساعدة في الاختيار؟'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-inter mb-8 max-w-2xl mx-auto"
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
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Contactez-nous'}
                {currentLang === 'en' && 'Contact Us'}
                {currentLang === 'ar' && 'اتصل بنا'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Voir disponibilités'}
                {currentLang === 'en' && 'Check Availability'}
                {currentLang === 'ar' && 'تحقق من التوفر'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Rooms;
