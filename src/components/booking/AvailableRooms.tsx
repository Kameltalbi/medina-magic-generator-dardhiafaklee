// Available rooms section - Staggered room cards with hover animations and CTA buttons
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Wifi, Coffee, Bath, Info, Calendar, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, imageHoverZoom } from "@/lib/animations";
import { useBooking } from "@/contexts/BookingContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "react-i18next";
import type { Room } from "@/lib/types";

// Real room data with actual images
const mockRooms: Room[] = [
  {
    id: "1",
    title: "Chambre Traditionnelle",
    pricePerNight: 400, // 400 TND
    currency: "DT",
    image: "/chambre 1.png",
    description: "Chambre authentique avec décoration inspirée des aquarelles de Paul Klee et vue sur la cour intérieure.",
    amenities: ["Wi-Fi", "Climatisation", "Salle de bain privée", "Thé traditionnel", "Vue sur la médina", "Décoration artisanale"],
    size: "25m²",
    capacity: 2,
    rating: 4.8,
    reviews: 127,
    features: ["Vue sur la médina", "Décoration artisanale", "Literie premium"],
    category: "Standard"
  },
  {
    id: "2", 
    title: "Suite Klee",
    pricePerNight: 600, // 600 TND
    currency: "DT",
    image: "/chambre 2.png", 
    description: "Suite spacieuse avec salon privé, terrasse panoramique et décoration raffinée alliant tradition et modernité.",
    amenities: ["Wi-Fi", "Terrasse privée", "Salon", "Minibar", "Climatisation", "Baignoire", "Service thé"],
    size: "45m²",
    capacity: 3,
    rating: 4.9,
    reviews: 89,
    features: ["Œuvres d'art originales", "Mobilier design", "Service personnalisé"],
    category: "Suite"
  },
  {
    id: "3",
    title: "Chambre Deluxe", 
    pricePerNight: 750, // 750 TND
    currency: "DT",
    image: "/chambre3.png",
    description: "Chambre élégante aux tons chauds inspirés de la palette de Klee, avec balcon donnant sur la médina.",
    amenities: ["Wi-Fi", "Balcon", "Climatisation", "Coffre-fort", "Peignoirs", "Minibar", "Service en chambre"],
    size: "35m²",
    capacity: 2,
    rating: 4.9,
    reviews: 156,
    features: ["Terrasse panoramique", "Mobilier haut de gamme", "Conciergerie 24h/24"],
    category: "Deluxe"
  }
];

const AvailableRooms = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { selectedRoom, selectRoom, bookingDates } = useBooking();
  const [showAllAmenities, setShowAllAmenities] = useState<{ [key: string]: boolean }>({});

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: any } = {
      "Wi-Fi": Wifi,
      "Climatisation": Coffee,
      "Salle de bain privée": Bath,
      "Terrasse privée": Users,
      "Balcon": Users,
      "Salon": Users,
      "Minibar": Coffee,
      "Coffre-fort": Info,
      "Peignoirs": Bath,
      "Thé traditionnel": Coffee,
      "Vue sur la médina": Users,
      "Décoration artisanale": Info,
      "Service thé": Coffee,
      "Baignoire": Bath,
      "Service en chambre": Users
    };
    
    return icons[amenity] || Info;
  };

  const handleRoomSelection = (room: Room) => {
    selectRoom(room);
  };

  const toggleAmenities = (roomId: string) => {
    setShowAllAmenities(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-4">
              {t("booking.rooms.title")}
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              {t("booking.rooms.subtitle")}
            </p>
            {bookingDates && (
              <div className="mt-4 p-4 bg-indigo-medina/10 rounded-lg inline-block">
                <p className="text-sm font-medium text-indigo-medina">
                  {t("booking.rooms.searchResults")}: {bookingDates.checkIn} - {bookingDates.checkOut} 
                  ({bookingDates.guests} {bookingDates.guests === 1 ? t("booking.rooms.guest") : t("booking.rooms.guests")})
                </p>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRooms.map((room, index) => (
              <motion.div
                key={room.id}
                variants={staggerItem}
                className={`relative group gradient-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 ${
                  selectedRoom?.id === room.id ? "ring-2 ring-indigo-medina" : ""
                }`}
              >
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                    variants={imageHoverZoom}
                    initial="rest"
                    whileHover="hover"
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-terre-cuite text-white px-3 py-1 rounded-full font-medium font-semibold text-sm shadow-soft">
                    {formatPrice(room.pricePerNight)} / nuit
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-indigo-medina text-white font-medium font-medium">
                      {room.category}
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  {room.rating && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium font-semibold text-sm">{room.rating}</span>
                        <span className="text-muted-foreground text-xs">({room.reviews})</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Selection Indicator */}
                  {selectedRoom?.id === room.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-vert-porte text-white px-4 py-2 rounded-full font-medium font-semibold text-sm shadow-soft flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Sélectionnée</span>
                    </motion.div>
                  )}
                </div>

                {/* Room Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold font-bold text-indigo-medina">
                      {room.title}
                    </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold font-bold text-terre-cuite">
                            {formatPrice(room.pricePerNight)}
                          </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        par nuit
                      </div>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-medium mb-3">
                    {room.size && <span>{room.size}</span>}
                    <span>•</span>
                    <span>{room.capacity} {room.capacity === 1 ? 'personne' : 'personnes'}</span>
                  </div>
                  
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="font-medium font-semibold text-indigo-medina mb-2 text-sm">
                      Équipements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(showAllAmenities[room.id] ? room.amenities : room.amenities.slice(0, 4)).map((amenity, i) => {
                        const IconComponent = getAmenityIcon(amenity);
                        return (
                          <div
                            key={i}
                            className="flex items-center space-x-1 text-xs bg-vert-porte/10 text-vert-porte px-2 py-1 rounded-full font-medium"
                          >
                            <IconComponent className="w-3 h-3" />
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                    {room.amenities.length > 4 && (
                      <button 
                        className="text-xs text-terre-cuite font-medium font-medium mt-2 hover:underline"
                        onClick={() => toggleAmenities(room.id)}
                      >
                        {showAllAmenities[room.id] 
                          ? 'Voir moins' 
                          : `+${room.amenities.length - 4} autres`
                        }
                      </button>
                    )}
                  </div>

                  {/* Features */}
                  {room.features && room.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium font-semibold text-indigo-medina mb-2 text-sm">
                        Points forts
                      </h4>
                      <div className="space-y-1">
                        {room.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs font-medium">
                            <Check className="w-3 h-3 text-vert-porte" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white transition-colors font-medium"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    
                    <Button
                      onClick={() => handleRoomSelection(room)}
                      className={`flex-1 font-medium font-semibold transition-all duration-300 shadow-soft hover:shadow-medium ${
                        selectedRoom?.id === room.id
                          ? "bg-vert-porte hover:bg-vert-porte/90 text-white"
                          : "bg-terre-cuite hover:bg-terre-cuite/90 text-white"
                      }`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedRoom?.id === room.id ? "Sélectionnée" : "Sélectionner"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Rooms Available State */}
          {mockRooms.length === 0 && (
            <motion.div
              variants={staggerItem}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold font-bold text-indigo-medina mb-2">
                Aucune chambre disponible
              </h3>
              <p className="text-muted-foreground font-medium">
                Essayez d'autres dates pour voir les disponibilités
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AvailableRooms;