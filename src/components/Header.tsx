// Header component - Sticky navigation with Dar Dhiafa Klee branding
// Uses indigo-medina, terre-cuite, and sable colors from design system

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, Camera, Eye, Bed, Star, Info, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Chambres", href: "/rooms", icon: Bed },
    { label: "Expériences", href: "/experiences", icon: Star },
    { label: "Galerie", href: "/gallery", icon: Camera },
    { label: "Tour 360°", href: "/gallery#virtual-tour", icon: Eye },
    { label: "À propos", href: "/#about", icon: Info },
    { label: "Contact", href: "/#contact", icon: Phone },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-8 h-28 flex items-center justify-between relative">
        {/* Nom seulement */}
        <Link to="/" className="flex items-center">
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-lg font-bold text-indigo-medina leading-tight">
              Dar Dhiafa Paul Klee
            </h1>
            <h1 className="text-lg font-bold text-indigo-medina leading-tight">
              Kairouan
            </h1>
            <h1 className="text-lg font-bold text-indigo-medina leading-tight">
              Hôtel particulier
            </h1>
          </motion.div>
        </Link>

        {/* Logo au centre */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/logo Klee.png"
              alt="Logo Klee"
              className="h-24 w-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Bouton Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-indigo-medina hover:text-terre-cuite transition-colors"
          aria-label="Ouvrir le menu"
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Menu déroulant */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.href.startsWith('/') && !item.href.includes('#') ? (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors" />
                        <span className="text-gray-700 group-hover:text-indigo-medina font-medium font-medium transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors" />
                        <span className="text-gray-700 group-hover:text-indigo-medina font-medium font-medium transition-colors">
                          {item.label}
                        </span>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;