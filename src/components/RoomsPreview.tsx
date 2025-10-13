// RoomsPreview component - Showcase of available rooms with hover animations
// Uses imageHoverZoom and all brand colors from design system

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Coffee, Tv, Bath, Eye, Calendar, XCircle, Clock, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, imageHoverZoom } from "@/lib/animations";
import { useCurrency } from "@/contexts/CurrencyContext";
import { roomsData } from "@/data/rooms";
import { getRoomStatus } from "@/data/roomAvailability";
import type { Room } from "@/lib/types";
// import roomTraditional from "@/assets/room-traditional.jpg";
// import roomSuite from "@/assets/room-suite.jpg";
// import roomDeluxe from "@/assets/room-deluxe.jpg";

const RoomsPreview = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  
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

  // Afficher les 3 chambres les plus chères sur la page d'accueil
  const featuredRooms = roomsDataState
    .sort((a, b) => b.pricePerNight - a.pricePerNight) // Trier par prix décroissant
    .slice(0, 3); // Prendre les 3 plus chères
  
  const rooms: Room[] = featuredRooms.map(room => ({
    ...room,
    pricePerNight: formatPrice(room.pricePerNight),
    description: t(`rooms.${room.id}.description`) || room.description,
    amenities: room.amenities.slice(0, 4) // Limiter à 4 équipements pour l'affichage
  }));

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("Wifi")) return Wifi;
    if (amenity.includes("Tea") || amenity.includes("Minibar")) return Coffee;
    if (amenity.includes("TV") || amenity.includes("service")) return Tv;
    if (amenity.includes("Bathtub") || amenity.includes("bathroom")) return Bath;
    return Eye;
  };

  return (
    <section id="rooms" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {t("rooms.title")}
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
              variants={staggerItem}
            >
              {t("rooms.subtitle")}
            </motion.p>
          </div>

          {/* Rooms Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
          >
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-medium hover:shadow-strong transition-all duration-500"
                variants={staggerItem}
                whileHover={{ y: -5 }}
              >
                {/* Room Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img
                    src={room.image}
                    alt={`${room.title} - Dar Dhiafa Klee`}
                    className="w-full h-full object-cover"
                    variants={imageHoverZoom}
                    initial="rest"
                    whileHover="hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-medina/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-terre-cuite text-white px-3 py-1 rounded-full font-medium font-semibold text-sm shadow-soft">
                      {room.pricePerNight}/{t("rooms.perNight")}
                    </div>
                    {room.pricePerNight && parseFloat(room.pricePerNight.replace(/[^\d]/g, '')) >= 350 && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-medium font-bold text-xs shadow-soft">
                        ⭐ Premium
                      </div>
                    )}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {(() => {
                      const status = getRoomStatusInfo(room.id);
                      return (
                        <div className={`${getStatusBadge(status)} px-2 py-1 rounded-full font-medium font-medium text-xs flex items-center gap-1 shadow-soft`}>
                          {getStatusIcon(status)}
                          {getStatusText(status)}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-bold text-indigo-medina mb-2">
                    {room.title}
                  </h3>
                  <p className="text-muted-foreground font-medium mb-4 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, amenityIndex) => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <div
                          key={amenityIndex}
                          className="flex items-center space-x-2 text-sm text-muted-foreground"
                        >
                          <IconComponent className="w-4 h-4 text-logo-gold" />
                          <span className="font-medium">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-logo-dark text-logo-dark hover:bg-logo-dark hover:text-white font-medium font-medium transition-all duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t("rooms.details")}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-medium transition-all duration-300"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {t("rooms.book")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            variants={staggerItem}
          >
            <Button
              size="lg"
              className="bg-indigo-medina hover:bg-indigo-medina/90 text-primary-foreground font-medium font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              {t("rooms.viewAll")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomsPreview;