// About page - Full page dedicated to "À propos"
// Combines Header, About component content, and Footer

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import AboutSection from "@/components/About";
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
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <div className="py-8">
          <AboutSection />
          <PaulKleeSection />
        </div>
      </main>
      
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default About;

