// Gallery360 component - Photo gallery and virtual tour section
// Uses image grid and iframe for 360° tour with design system colors

import { motion } from "framer-motion";
import { Camera, Play, Maximize2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, imageHoverZoom } from "@/lib/animations";
import { useTranslation } from "react-i18next";

const Gallery360 = () => {
  const { t } = useTranslation();
  
  // Mock gallery images - in real app, these would be fetched from API
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image1.alt"),
      category: t("gallery.image1.category"),
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image2.alt"),
      category: t("gallery.image2.category"),
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image3.alt"),
      category: t("gallery.image3.category"),
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image4.alt"),
      category: t("gallery.image4.category"),
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image5.alt"),
      category: t("gallery.image5.category"),
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: t("gallery.image6.alt"),
      category: t("gallery.image6.category"),
    },
  ];

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
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
              {t("gallery.title")}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={staggerItem}
            >
              {t("gallery.subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Photo Gallery */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-playfair font-bold text-indigo-medina">
                  {t("gallery.photoGallery")}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t("gallery.viewAll")}
                </Button>
              </div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {galleryImages.slice(0, 6).map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 ${
                      index === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                    }`}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      variants={imageHoverZoom}
                      initial="rest"
                      whileHover="hover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-medina/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-terre-cuite text-white px-2 py-1 rounded-full text-xs font-inter font-medium mb-2">
                          {image.category}
                        </span>
                        <p className="text-white font-inter font-medium text-sm">
                          {image.alt}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Virtual Tour */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-playfair font-bold text-indigo-medina">
                  {t("gallery.virtualTour")}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-terre-cuite text-terre-cuite hover:bg-terre-cuite hover:text-white font-inter"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t("gallery.fullscreen")}
                </Button>
              </div>

              {/* 360° Tour Placeholder */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-indigo-medina/10 to-vert-porte/10 rounded-xl overflow-hidden shadow-medium">
                {/* Placeholder for Matterport/Kuula iframe */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-medina to-vert-porte">
                  <div className="text-center text-white space-y-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <div>
                      <h4 className="font-playfair font-bold text-xl mb-2">
                        {t("gallery.tourTitle")}
                      </h4>
                      <p className="font-inter text-sm opacity-90 max-w-xs mx-auto">
                        {t("gallery.tourDescription")}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-6 py-3"
                    >
                      {t("gallery.startTour")}
                    </Button>
                  </div>
                </div>
                
                {/* Future iframe integration */}
                {/* 
                <iframe
                  src="YOUR_MATTERPORT_OR_KUULA_URL"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Visite 360° Dar Dhiafa Klee"
                  className="rounded-xl"
                />
                */}
              </div>

              {/* Virtual Tour Features */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 text-sm font-inter">
                  <div className="w-2 h-2 bg-terre-cuite rounded-full"></div>
                  <span className="text-muted-foreground">{t("gallery.feature1")}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-inter">
                  <div className="w-2 h-2 bg-vert-porte rounded-full"></div>
                  <span className="text-muted-foreground">{t("gallery.feature2")}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-inter">
                  <div className="w-2 h-2 bg-indigo-medina rounded-full"></div>
                  <span className="text-muted-foreground">{t("gallery.feature3")}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center bg-gradient-to-r from-sable to-card rounded-2xl p-8 shadow-soft border border-border/20"
            variants={staggerItem}
          >
            <h3 className="text-2xl font-playfair font-bold text-indigo-medina mb-4">
              {t("gallery.ctaTitle")}
            </h3>
            <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
              {t("gallery.ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {t("gallery.bookNow")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {t("gallery.requestQuote")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery360;