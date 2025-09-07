// Experiences component - Showcase of unique experiences offered
// Uses vert-porte color for CTA and full color palette from design system

import { motion } from "framer-motion";
import { MapPin, Utensils, Palette, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import type { Experience } from "@/lib/types";

const Experiences = () => {
  const experiences: Experience[] = [
    {
      id: "souk-tour",
      title: "Visite guidée des souks",
      description: "Découvrez les trésors cachés de la médina avec nos guides locaux passionnés",
      image: "🏛️",
      duration: "3h",
    },
    {
      id: "heritage",
      title: "Patrimoine et architecture",
      description: "Explorez la richesse architecturale de Kairouan, berceau de la civilisation islamique",
      image: "🕌",
      duration: "4h",
    },
    {
      id: "gastronomy",
      title: "Atelier gastronomique",
      description: "Apprenez à cuisiner les spécialités locales avec nos chefs traditionnels",
      image: "🍽️",
      duration: "2h",
    },
    {
      id: "art-workshop",
      title: "Atelier d'art Klee",
      description: "Créez votre propre œuvre inspirée par les techniques de Paul Klee en Tunisie",
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
              className="text-3xl md:text-5xl font-playfair font-bold text-indigo-medina mb-6"
              variants={fadeInUp}
            >
              Expériences <span className="text-vert-porte">authentiques</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Plongez au cœur de la culture kairouanaise à travers des expériences uniques 
              qui éveilleront tous vos sens et enrichiront votre séjour.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Description Text */}
            <motion.div variants={staggerItem} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina">
                Découvrez Kairouan autrement
              </h3>
              
              <div className="space-y-4">
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-terre-cuite">Les souks traditionnels</strong> vous dévoileront 
                  leurs secrets ancestraux, des épices aux tissus brodés main, 
                  en passant par l'artisanat local transmis de génération en génération.
                </p>
                
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-vert-porte">Le patrimoine architectural</strong> de Kairouan, 
                  première capitale de l'Ifriqiya, raconte 13 siècles d'histoire islamique 
                  à travers ses mosquées, medersas et demeures traditionnelles.
                </p>
                
                <p className="text-foreground font-inter leading-relaxed">
                  <strong className="text-indigo-medina">La gastronomie locale</strong> et les 
                  <strong className="text-terre-cuite"> ateliers artistiques</strong> complètent 
                  cette immersion culturelle unique, créant des souvenirs inoubliables.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-vert-porte hover:bg-vert-porte-hover text-white font-inter font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium group"
              >
                En savoir plus
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
              Créez votre expérience sur mesure
            </h3>
            <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
              Nos concierges se feront un plaisir de composer un programme personnalisé 
              selon vos centres d'intérêt et la durée de votre séjour.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
            >
              Contactez notre concierge
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experiences;