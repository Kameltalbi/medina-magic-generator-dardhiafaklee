// Available rooms section - Staggered room cards with hover animations and CTA buttons
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Wifi, Coffee, Bath, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, imageHoverZoom } from "@/lib/animations";
import type { Room } from "@/lib/types";

// Mock data for available rooms
const mockRooms: Room[] = [
  {
    id: "1",
    title: "Chambre Traditionnelle Klee",
    pricePerNight: "120 DT",
    image: "/src/assets/room-traditional.jpg",
    description: "Chambre authentique avec décoration inspirée des aquarelles de Paul Klee et vue sur la cour intérieure.",
    amenities: ["Wi-Fi", "Climatisation", "Salle de bain privée", "Thé traditionnel"]
  },
  {
    id: "2", 
    title: "Suite Médina",
    pricePerNight: "180 DT",
    image: "/src/assets/room-suite.jpg", 
    description: "Suite spacieuse avec salon privé, terrasse panoramique et décoration raffinée alliant tradition et modernité.",
    amenities: ["Wi-Fi", "Terrasse privée", "Salon", "Minibar", "Climatisation"]
  },
  {
    id: "3",
    title: "Chambre Deluxe Aquarelle", 
    pricePerNight: "150 DT",
    image: "/src/assets/room-deluxe.jpg",
    description: "Chambre élégante aux tons chauds inspirés de la palette de Klee, avec balcon donnant sur la médina.",
    amenities: ["Wi-Fi", "Balcon", "Climatisation", "Coffre-fort", "Peignoirs"]
  }
];

const AvailableRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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
      "Thé traditionnel": Coffee
    };
    
    return icons[amenity] || Info;
  };

  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room);
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
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-medina mb-4">
              Chambres disponibles
            </h2>
            <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
              Choisissez parmi nos chambres authentiques inspirées par l'art de Paul Klee
            </p>
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
                  <div className="absolute top-4 right-4 bg-terre-cuite text-white px-3 py-1 rounded-full font-inter font-semibold text-sm shadow-soft">
                    {room.pricePerNight} / nuit
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedRoom?.id === room.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 left-4 bg-indigo-medina text-white px-3 py-1 rounded-full font-inter font-semibold text-sm shadow-soft"
                    >
                      Sélectionnée
                    </motion.div>
                  )}
                </div>

                {/* Room Content */}
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-indigo-medina mb-3">
                    {room.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 3).map((amenity, i) => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <div
                          key={i}
                          className="flex items-center space-x-1 text-xs bg-vert-porte/10 text-vert-porte px-2 py-1 rounded-full font-inter"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {room.amenities.length > 3 && (
                      <div className="text-xs text-muted-foreground px-2 py-1 rounded-full font-inter">
                        +{room.amenities.length - 3} autres
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white transition-colors font-inter"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    
                    <Button
                      onClick={() => handleRoomSelection(room)}
                      className="flex-1 bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold transition-all duration-300 shadow-soft hover:shadow-medium"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedRoom?.id === room.id ? "Sélectionnée" : "Réserver"}
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
              <h3 className="text-2xl font-playfair font-bold text-indigo-medina mb-2">
                Aucune chambre disponible
              </h3>
              <p className="text-muted-foreground font-inter">
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