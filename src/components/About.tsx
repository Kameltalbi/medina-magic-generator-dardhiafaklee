// About component - Section explaining the connection to Paul Klee and Tunisian heritage
// Uses staggered animations and the full color palette from design system

import { motion } from "framer-motion";
import { Palette, Bed, Star, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const About = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Palette,
      title: t("about.feature1.title"),
      description: t("about.feature1.description"),
    },
    {
      icon: Bed,
      title: t("about.feature2.title"),
      description: t("about.feature2.description"),
    },
    {
      icon: Star,
      title: t("about.feature3.title"),
      description: t("about.feature3.description"),
    },
    {
      icon: Award,
      title: t("about.feature4.title"),
      description: t("about.feature4.description"),
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-bold text-terre-cuite mb-4 sm:mb-6 px-4"
              variants={fadeInUp}
            >
              {t("about.title")}
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              {t("about.description1")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div className="space-y-8" variants={staggerItem}>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-bold text-terre-cuite mb-4">
                  {t("about.subtitle")}
                </h3>
                <p className="text-foreground font-medium leading-relaxed mb-6">
                  {t("about.description2")}
                </p>
                <p className="text-foreground font-medium leading-relaxed">
                  {t("about.description3")}
                </p>
              </div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                variants={staggerContainer}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 2,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-logo-gold to-logo-dark rounded-lg flex items-center justify-center"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="font-bold font-semibold text-terre-cuite mb-1"
                        whileHover={{ 
                          color: "#8B5A2B",
                          scale: 1.02
                        }}
                      >
                        {feature.title}
                      </motion.h4>
                      <motion.p 
                        className="text-sm text-muted-foreground font-medium"
                        whileHover={{ 
                          opacity: 1,
                          x: 5
                        }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Single Image */}
            <motion.div
              className="flex justify-center"
              variants={staggerItem}
            >
              <motion.div
                className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-2xl overflow-hidden shadow-medium"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/grid3.png"
                    alt="Image de la grille"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;