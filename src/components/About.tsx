// About component - Section explaining the connection to Paul Klee and Tunisian heritage
// Uses staggered animations and the full color palette from design system

import { motion } from "framer-motion";
import { Palette, Heart, Star, Award } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const About = () => {
  const features = [
    {
      icon: Palette,
      title: "Inspiration artistique",
      description: "Inspirée par les aquarelles tunisiennes de Paul Klee (1914)",
    },
    {
      icon: Heart,
      title: "Hospitalité authentique",
      description: "L'art traditionnel de l'accueil tunisien dans la médina",
    },
    {
      icon: Star,
      title: "Patrimoine historique",
      description: "Au cœur de Kairouan, première capitale de l'Ifriqiya",
    },
    {
      icon: Award,
      title: "Excellence reconnue",
      description: "Une expérience unique alliant art, culture et confort",
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
              className="text-3xl md:text-5xl font-playfair font-bold text-indigo-medina mb-6"
              variants={fadeInUp}
            >
              Où l'art rencontre{" "}
              <span className="text-terre-cuite">l'hospitalité</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              En 1914, Paul Klee découvrait la lumière et les couleurs de la Tunisie, 
              transformant à jamais son art. Aujourd'hui, Dar Dhiafa Klee perpétue 
              cet héritage dans une maison d'hôtes exceptionnelle au cœur de la médina de Kairouan.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div className="space-y-8" variants={staggerItem}>
              <div>
                <h3 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-4">
                  Un voyage dans le temps et l'art
                </h3>
                <p className="text-foreground font-inter leading-relaxed mb-6">
                  Notre maison d'hôtes tire son inspiration du séjour transformateur 
                  de Paul Klee en Tunisie. Chaque espace reflète la richesse 
                  chromatique et la géométrie qui ont marqué ses œuvres les plus 
                  célèbres, tout en préservant l'authenticité de l'architecture 
                  traditionnelle kairouanaise.
                </p>
                <p className="text-foreground font-inter leading-relaxed">
                  Dans la médina historique de Kairouan, première capitale de l'Ifriqiya, 
                  nous offrons une expérience unique où se mêlent art contemporain, 
                  patrimoine millénaire et hospitalité tunisienne légendaire.
                </p>
              </div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-playfair font-semibold text-indigo-medina mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-inter">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Mosaic */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerItem}
            >
              <div className="space-y-4">
                <motion.div
                  className="aspect-square bg-gradient-to-br from-terre-cuite/20 to-indigo-medina/20 rounded-2xl overflow-hidden shadow-medium"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-terre-cuite to-indigo-medina opacity-80 flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  className="aspect-[4/3] bg-gradient-to-br from-vert-porte/20 to-sable/40 rounded-2xl overflow-hidden shadow-medium"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-vert-porte to-terre-cuite opacity-60 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
              </div>
              <div className="space-y-4 pt-8">
                <motion.div
                  className="aspect-[4/3] bg-gradient-to-br from-indigo-medina/20 to-vert-porte/20 rounded-2xl overflow-hidden shadow-medium"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-indigo-medina to-vert-porte opacity-70 flex items-center justify-center">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  className="aspect-square bg-gradient-to-br from-sable/40 to-terre-cuite/20 rounded-2xl overflow-hidden shadow-medium"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-terre-cuite to-sable opacity-50 flex items-center justify-center">
                    <Award className="w-16 h-16 text-indigo-medina" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;