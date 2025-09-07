// Hero component - Main hero section with image, overlay, and call-to-actions
// Uses gradient-hero, terre-cuite, and vert-porte colors from design system

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, fadeIn } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-dar-dhiafa.jpg";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={t("hero.alt")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight mb-6"
            variants={fadeInUp}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl font-inter font-light mb-8 max-w-2xl mx-auto leading-relaxed opacity-95"
            variants={fadeInUp}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeIn}
          >
            <Button
              size="lg"
              className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-medium hover:shadow-strong hover:scale-105"
            >
              {t("hero.bookNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-vert-porte bg-vert-porte/10 hover:bg-vert-porte hover:border-vert-porte text-white hover:text-white font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 backdrop-blur-sm"
            >
              {t("hero.explore360")}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;