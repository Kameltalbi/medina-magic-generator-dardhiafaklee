// ChambresDoubles page - Dedicated page for Double Rooms with photo gallery and lightbox
// Features all double room photos with expandable lightbox viewing

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import AvailabilityForm from "@/components/AvailabilityForm";
import { useAvailabilityForm } from "@/hooks/useAvailabilityForm";
import { 
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, fadeInUp, imageHoverZoom } from "@/lib/animations";

const ChambresDoubles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAvailabilityFormOpen, openAvailabilityForm, closeAvailabilityForm } = useAvailabilityForm();

  const chambreImages = [
    {
      id: 1,
      src: "/chambre-double1.jpg",
      alt: "Chambre Double - Vue principale"
    },
    {
      id: 2,
      src: "/chambretwin2.jpg",
      alt: "Chambre Double - Détails"
    },
    {
      id: 3,
      src: "/chambre-double3.jpg",
      alt: "Chambre Double - Ambiance"
    }
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % chambreImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + chambreImages.length) % chambreImages.length);
  };

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % chambreImages.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + chambreImages.length) % chambreImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, chambreImages.length]);

  // Scroll vers le haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-logo-gold/10 to-logo-dark/10">
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-terre-cuite mb-6"
                variants={staggerItem}
              >
                Chambres Doubles
              </motion.h1>
              <motion.div
                className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed space-y-6"
                variants={staggerItem}
              >
                <p>
                  Nos chambres doubles offrent un espace confortable avec lit double, 
                  parfaites pour les couples. Élégantes et authentiques, elles allient 
                  charme traditionnel tunisien et confort moderne pour un séjour agréable.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section - Between paragraphs */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {/* Images Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                variants={staggerContainer}
              >
                {chambreImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 aspect-square"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => openLightbox(index)}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-medium text-sm">
                          {image.alt}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-gradient-to-r from-terre-cuite/10 to-indigo-medina/10 rounded-xl p-6 sm:p-8 border-l-4 border-terre-cuite"
                variants={staggerItem}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-terre-cuite mb-4">
                  Chambres Doubles
                </h3>
                <p className="mb-4 text-lg text-foreground/90 leading-relaxed">
                  Les Chambres Doubles allient élégance, simplicité et authenticité. Chaque espace 
                  a été soigneusement aménagé pour offrir une atmosphère apaisante où la lumière 
                  naturelle met en valeur les détails architecturaux typiques des demeures traditionnelles tunisiennes.
                </p>
                <p className="mb-4 text-lg text-foreground/90 leading-relaxed">
                  Dotées d'un lit double confortable, d'une salle de bain privative et d'un mobilier 
                  artisanal, elles invitent à un séjour empreint de calme et d'intimité.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Parfaites pour les couples ou les voyageurs en quête de détente, ces chambres 
                  incarnent l'esprit de Dar Dhiafa Paul Klee : un lieu où le charme du patrimoine 
                  rencontre le confort contemporain.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-terre-cuite text-terre-cuite hover:bg-terre-cuite hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button
                  onClick={openAvailabilityForm}
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Vérifier la disponibilité
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {chambreImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 px-4 py-2 rounded-full text-white text-sm font-medium">
                {currentImageIndex + 1} / {chambreImages.length}
              </div>

              {/* Image */}
              <motion.img
                key={currentImageIndex}
                src={chambreImages[currentImageIndex].src}
                alt={chambreImages[currentImageIndex].alt}
                className="w-full h-full object-contain max-h-[90vh] rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DjerbaBanner />
      <Footer />
      
      <AvailabilityForm
        isOpen={isAvailabilityFormOpen}
        onClose={closeAvailabilityForm}
      />
    </div>
  );
};

export default ChambresDoubles;

