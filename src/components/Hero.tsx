// Hero component - Image slider with automatic transitions every 3 seconds
// Features a booking button overlay on each slide

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Images for the slider
  const slides = [
    {
      id: 1,
      image: "/hero-dar-dhiafa-new.jpg",
      title: "Bienvenue à Dar Dhiafa Paul Klee",
      subtitle: "Une expérience unique inspirée de Paul Klee"
    },
    {
      id: 2,
      image: "/grid1.png",
      title: "Sérénité garantie",
      subtitle: "Un havre de paix artistique"
    },
    {
      id: 3,
      image: "/photosgaleriepage/pagegalerie2.jpg",
      title: "Galerie d'art",
      subtitle: "Découvrez nos œuvres"
    },
    {
      id: 4,
      image: "/photosgaleriepage/pagegalerie11.jpg",
      title: "Collection artistique",
      subtitle: "Inspiration et créativité"
    },
    {
      id: 5,
      image: "/peinture-paul-klee.png",
      title: "Œuvre de Paul Klee",
      subtitle: "L'artiste et son inspiration"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden pt-28">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ 
              opacity: 0, 
              scale: 1.1,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(5px)"
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              filter: { duration: 0.8 }
            }}
          >
            {/* Background Image */}
            <motion.img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 8,
                ease: "linear"
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay - Fixed CTA with Artistic Animations */}
        <div className="absolute inset-0 flex items-end justify-center z-10 pb-20">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(255,255,255,0.5)"
                }}
              >
                L'Héritage de Paul Klee
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl font-light mb-8 sm:mb-12 opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.02
                }}
              >
                Découvrez la beauté intemporelle de Kairouan
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold px-8 py-4 text-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-terre-cuite/50"
                  onClick={() => navigate('/booking')}
                >
                  Réserver maintenant
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Artistic Elements */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-terre-cuite scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;