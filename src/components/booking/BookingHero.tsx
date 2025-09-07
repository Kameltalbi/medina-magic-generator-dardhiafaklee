// Booking hero section - Compact hero with fadeIn animation using design system colors
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTranslation } from "react-i18next";

const BookingHero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative pt-24 pb-16 px-4 bg-gradient-subtle">
      <div className="container mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-indigo-medina mb-6">
            {t("booking.hero.title")}{" "}
            <span className="text-terre-cuite">Dar Dhiafa Klee</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed">
            {t("booking.hero.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingHero;