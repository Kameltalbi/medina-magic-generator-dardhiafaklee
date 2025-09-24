// Experiences component - Showcase of unique experiences offered
// Uses vert-porte color for CTA and full color palette from design system

import { motion } from "framer-motion";
import { MapPin, Utensils, Palette, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import type { Experience } from "@/lib/types";

const ExperiencesPreview = () => {
  const { t } = useTranslation();
  
  const experiences: Experience[] = [
    {
      id: "souk-tour",
      title: t("experiences.soukTour.title"),
      description: t("experiences.soukTour.description"),
      image: "🏛️",
      duration: "3h",
    },
    {
      id: "heritage",
      title: t("experiences.heritage.title"),
      description: t("experiences.heritage.description"),
      image: "🕌",
      duration: "4h",
    },
    {
      id: "gastronomy",
      title: t("experiences.gastronomy.title"),
      description: t("experiences.gastronomy.description"),
      image: "🍽️",
      duration: "2h",
    },
    {
      id: "art-workshop",
      title: t("experiences.artWorkshop.title"),
      description: t("experiences.artWorkshop.description"),
      image: "🎨",
      duration: "3h",
    },
  ];

  const getExperienceIcon = (id: string) => {
    switch (id) {
      case "souk-tour":
        return MapPin;
      case "heritage":
        return Camera;
      case "gastronomy":
        return Utensils;
      case "art-workshop":
        return Palette;
      default:
        return MapPin;
    }
  };

  return (
    <section id="experiences" className="py-20 px-4 bg-muted/30">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={fadeInUp}
            >
              {t("experiences.title")}
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              {t("experiences.subtitle")}
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Description Text */}
            <motion.div variants={staggerItem} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina">
                {t("experiences.discoverTitle")}
              </h3>
              
              <div className="space-y-4">
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-terre-cuite">{t("experiences.traditionalMarkets.title")}</strong> {t("experiences.traditionalMarkets.description")}
                </p>
                
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-vert-porte">{t("experiences.architecturalHeritage.title")}</strong> {t("experiences.architecturalHeritage.description")}
                </p>
                
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-indigo-medina">{t("experiences.localCuisine.title")}</strong> {t("experiences.localCuisine.description")}
                </p>
              </div>

              <Button
                size="lg"
                className="bg-vert-porte hover:bg-vert-porte-hover text-white font-inter font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium group"
              >
                {t("experiences.learnMore")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>

            {/* Experiences Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
            >
              {experiences.map((experience, index) => {
                const IconComponent = getExperienceIcon(experience.id);
                return (
                  <motion.div
                    key={experience.id}
                    className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    {/* Experience Icon & Emoji */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl">{experience.image}</div>
                    </div>

                    {/* Content */}
                    <h4 className="font-playfair font-bold text-indigo-medina mb-2 group-hover:text-terre-cuite transition-colors duration-300">
                      {experience.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-3">
                      {experience.description}
                    </p>
                    
                    {/* Duration Badge */}
                    <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full text-xs font-inter font-medium text-muted-foreground">
                      🕒 {experience.duration}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center bg-gradient-to-r from-indigo-medina/10 to-vert-porte/10 rounded-2xl p-8"
            variants={staggerItem}
          >
            <h3 className="text-2xl font-playfair font-bold text-indigo-medina mb-4">
              {t("experiences.cta.title")}
            </h3>
            <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
              {t("experiences.cta.description")}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
            >
              {t("experiences.cta.button")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesPreview;