// Booking header - Consistent with other pages design
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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/60 backdrop-blur-md shadow-medium"
          : "bg-vert-porte/60 backdrop-blur-md shadow-medium" // Green background like other pages
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
                        <img
                          src="/logo Dar Dhiafa klee.png"
                          alt="Dar Dhiafa Klee"
                          className="h-22 w-auto sm:h-24 object-contain drop-shadow-lg"
                        />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-terre-cuite drop-shadow-sm transition-colors font-inter"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/#chambres"
              className="text-white hover:text-terre-cuite drop-shadow-sm transition-colors font-inter"
            >
              {t("nav.rooms")}
            </Link>
            <Link
              to="/#contact"
              className="text-white hover:text-terre-cuite drop-shadow-sm transition-colors font-inter"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Back to Home Button */}
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 bg-terre-cuite hover:bg-terre-cuite-hover text-white rounded-lg transition-all duration-300 font-inter shadow-lg hover:shadow-xl"
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