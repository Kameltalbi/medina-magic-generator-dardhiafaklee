// Header component - Sticky navigation with Dar Dhiafa Klee branding
// Uses indigo-medina, terre-cuite, and sable colors from design system

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Home, Camera, Bed, Star, Info, Phone, FileText } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const menuItems = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "À propos", href: "/about", icon: Info },
    { label: "Chambres", href: "/rooms", icon: Bed },
    { label: "Expériences", href: "/experiences", icon: Star },
    { label: "Galerie", href: "/gallery", icon: Camera },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 h-20 sm:h-24 md:h-28 flex items-center justify-between lg:justify-start lg:space-x-8">
        {/* Logo à gauche - Responsive */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/logo Klee.png"
              alt="Logo Klee"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
          </motion.div>
          {/* Nom à côté du logo */}
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xs sm:text-base md:text-lg font-normal text-black leading-tight">
              Hôtel
            </h1>
            <h1 className="text-xs sm:text-base md:text-lg font-normal text-black leading-tight">
              Dar Dhiafa Paul Klee
            </h1>
            <h1 className="text-xs sm:text-base md:text-lg font-normal text-black leading-tight">
              Kairouan
            </h1>
          </motion.div>
        </Link>

        {/* Menu Desktop - Caché sur mobile */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              {item.hasSubmenu ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsSubmenuOpen(true)}
                  onMouseLeave={() => setIsSubmenuOpen(false)}
                >
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-terre-cuite transition-colors font-medium">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  <AnimatePresence>
                    {isSubmenuOpen && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.submenu?.map((subItem) => (
                          <div key={subItem.href}>
                            {subItem.href.startsWith('/') && !subItem.href.includes('#') ? (
                              <Link
                                to={subItem.href}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-terre-cuite transition-colors"
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </Link>
                            ) : (
                              <a
                                href={subItem.href}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-terre-cuite transition-colors"
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </a>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.href ? (
                <div>
                  {item.href.startsWith('/') && !item.href.includes('#') ? (
                    <Link
                      to={item.href}
                      className="flex items-center space-x-2 text-gray-700 hover:text-terre-cuite transition-colors font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-700 hover:text-terre-cuite transition-colors font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        {/* Boutons Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-terre-cuite hover:text-terre-cuite-hover border border-terre-cuite/30 hover:border-terre-cuite rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Brochure</span>
          </a>
          <Link to="/rooms">
            <Button
              size="sm"
              className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold"
            >
              Réserver
            </Button>
          </Link>
        </div>

        {/* Bouton Menu Mobile - Visible uniquement sur mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-indigo-medina hover:text-terre-cuite transition-colors"
          aria-label="Ouvrir le menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
          )}
        </button>
      </div>

      {/* Menu déroulant - Mobile uniquement */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4 sm:py-6">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasSubmenu ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                          <item.icon className="w-5 h-5 text-terre-cuite flex-shrink-0" />
                          <span className="text-gray-700 font-semibold">
                            {item.label}
                          </span>
                        </div>
                        <div className="ml-4 space-y-1">
                          {item.submenu?.map((subItem) => (
                            <div key={subItem.href}>
                              {subItem.href.startsWith('/') && !subItem.href.includes('#') ? (
                                <Link
                                  to={subItem.href}
                                  className="flex items-center space-x-3 p-2 pl-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <subItem.icon className="w-4 h-4 text-terre-cuite group-hover:text-indigo-medina transition-colors flex-shrink-0" />
                                  <span className="text-gray-600 group-hover:text-indigo-medina font-medium text-sm transition-colors">
                                    {subItem.label}
                                  </span>
                                </Link>
                              ) : (
                                <a
                                  href={subItem.href}
                                  className="flex items-center space-x-3 p-2 pl-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <subItem.icon className="w-4 h-4 text-terre-cuite group-hover:text-indigo-medina transition-colors flex-shrink-0" />
                                  <span className="text-gray-600 group-hover:text-indigo-medina font-medium text-sm transition-colors">
                                    {subItem.label}
                                  </span>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : item.href ? (
                      <div>
                        {item.href.startsWith('/') && !item.href.includes('#') ? (
                          <Link
                            to={item.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors flex-shrink-0" />
                            <span className="text-gray-700 group-hover:text-indigo-medina font-medium transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors" />
                            <span className="text-gray-700 group-hover:text-indigo-medina font-medium transition-colors">
                              {item.label}
                            </span>
                          </a>
                        )}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-3">
                <a
                  href="/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm sm:text-base font-semibold bg-vert-porte hover:bg-vert-porte-hover text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  <span>📘 Télécharger notre brochure</span>
                </a>
                <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold text-sm sm:text-base py-2 sm:py-3"
                  >
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;