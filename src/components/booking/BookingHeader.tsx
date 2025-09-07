// Booking header - Minimal sticky navigation with indigo and terre cuite accents
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BookingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/20" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
            <span className="text-xl font-playfair font-bold text-indigo-medina">
              Dar Dhiafa Klee
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-indigo-medina hover:text-terre-cuite transition-colors font-inter"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/#chambres"
              className="text-indigo-medina hover:text-terre-cuite transition-colors font-inter"
            >
              {t("nav.rooms")}
            </Link>
            <Link
              to="/#contact"
              className="text-indigo-medina hover:text-terre-cuite transition-colors font-inter"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Back to Home Button */}
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-indigo-medina text-indigo-medina rounded-lg hover:bg-indigo-medina hover:text-white transition-all duration-300 font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t("booking.backHome")}</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default BookingHeader;