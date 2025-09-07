// RoomsPreview component - Showcase of available rooms with hover animations
// Uses imageHoverZoom and all brand colors from design system

import { motion } from "framer-motion";
import { Wifi, Coffee, Tv, Bath, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, imageHoverZoom } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import type { Room } from "@/lib/types";
import roomTraditional from "@/assets/room-traditional.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";

const RoomsPreview = () => {
  const { t } = useTranslation();
  
  const rooms: Room[] = [
    {
      id: "traditional",
      title: t("rooms.traditional.title"),
      pricePerNight: "120€",
      image: roomTraditional,
      description: t("rooms.traditional.description"),
      amenities: [
        t("rooms.amenities.wifi"),
        t("rooms.amenities.ac"),
        t("rooms.amenities.privateBathroom"),
        t("rooms.amenities.balcony")
      ],
    },
    {
      id: "suite",
      title: t("rooms.suite.title"),
      pricePerNight: "180€",
      image: roomSuite,
      description: t("rooms.suite.description"),
      amenities: [
        t("rooms.amenities.privateLounge"),
        t("rooms.amenities.bathtub"),
        t("rooms.amenities.cityView"),
        t("rooms.amenities.teaService")
      ],
    },
    {
      id: "deluxe",
      title: t("rooms.deluxe.title"),
      pricePerNight: "220€",
      image: roomDeluxe,
      description: t("rooms.deluxe.description"),
      amenities: [
        t("rooms.amenities.privateBalcony"),
        t("rooms.amenities.minibar"),
        t("rooms.amenities.roomService"),
        t("rooms.amenities.panoramicView")
      ],
    },
  ];

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
              className="text-3xl md:text-5xl font-playfair font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {t("rooms.title")}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={staggerItem}
            >
              {t("rooms.subtitle")}
            </motion.p>
          </div>

          {/* Rooms Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  <div className="absolute top-4 right-4 bg-terre-cuite text-white px-3 py-1 rounded-full font-inter font-semibold text-sm shadow-soft">
                    {room.pricePerNight}/{t("rooms.perNight")}
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-indigo-medina mb-2">
                    {room.title}
                  </h3>
                  <p className="text-muted-foreground font-inter mb-4 leading-relaxed">
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
                          <IconComponent className="w-4 h-4 text-vert-porte" />
                          <span className="font-inter">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-medium transition-all duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t("rooms.details")}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-medium transition-all duration-300"
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
              className="bg-indigo-medina hover:bg-indigo-medina/90 text-primary-foreground font-inter font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium"
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