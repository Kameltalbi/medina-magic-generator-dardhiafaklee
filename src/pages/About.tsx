// About page - Full page dedicated to "À propos"
// Combines Header, About component content, and Footer

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import PaulKleeSection from "@/components/PaulKleeSection";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const About = () => {
  const { t } = useTranslation();

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
                {t("about.title") || "À propos de Dar Dhiafa Paul Klee"}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-foreground/80 mb-8"
                variants={staggerItem}
              >
                {t("about.subtitle") || "Une maison d'hôtes unique où l'art de Paul Klee rencontre l'hospitalité tunisienne"}
              </motion.p>
              <motion.div variants={staggerItem} className="flex justify-center">
                <a
                  href="/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold rounded-lg transition-colors shadow-medium hover:shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>📘 Télécharger notre brochure</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <div className="py-8">
          {/* Custom About Content for this page */}
          <section className="py-20 px-4 bg-background">
            <div className="container mx-auto">
              <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Text Content */}
                  <motion.div className="space-y-8" variants={staggerItem}>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-terre-cuite mb-4">
                        {t("about.subtitle")}
                      </h3>
                      <p className="text-foreground font-medium leading-relaxed mb-6">
                        {t("about.description1")}
                      </p>
                      <p className="text-foreground font-medium leading-relaxed mb-6">
                        {t("about.description2")}
                      </p>
                      <p className="text-foreground font-medium leading-relaxed">
                        {t("about.description3")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Single Featured Image */}
                  <motion.div
                    className="flex justify-center"
                    variants={staggerItem}
                  >
                    <motion.div
                      className="w-full aspect-[4/3] bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-2xl overflow-hidden shadow-medium"
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src="/galerie/imagegalerie5.jpg"
                        alt="Salle à manger de Dar Dhiafa Klee - Hospitalité tunisienne authentique"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <PaulKleeSection />
        </div>
      </main>
      
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default About;

