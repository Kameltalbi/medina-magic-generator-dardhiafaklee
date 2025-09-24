// Header component - Sticky navigation with Dar Dhiafa Klee branding
// Uses indigo-medina, terre-cuite, and sable colors from design system

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Home, Camera, Eye, Bed, Star, Info, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { t } = useTranslation();
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mega menu structure
  const megaMenuItems = [
    {
      id: "maison",
      label: t("nav.maison"),
      icon: Home,
      items: [
        { label: t("nav.home"), href: "/", icon: Home },
        { label: t("nav.gallery"), href: "/gallery", icon: Camera },
        { label: t("nav.tour360"), href: "/gallery#virtual-tour", icon: Eye },
      ]
    },
    {
      id: "sejour",
      label: t("nav.sejour"),
      icon: Bed,
      items: [
        { label: t("nav.rooms"), href: "/rooms", icon: Bed },
        { label: t("nav.experiences"), href: "/experiences", icon: Star },
        { label: t("nav.booking"), href: "/booking", icon: Star },
      ]
    },
    {
      id: "apropos",
      label: t("nav.apropos"),
      icon: Info,
      items: [
        { label: t("about.title"), href: "/#about", icon: Info },
        { label: t("nav.contact"), href: "/#contact", icon: Phone },
      ]
    }
  ];

  return (
    <motion.header
                  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                      ? "bg-card/60 backdrop-blur-md shadow-medium"
                      : isHomePage
                        ? "bg-gray-100/50 backdrop-blur-sm"
                        : "bg-vert-porte/60 backdrop-blur-md shadow-medium"
                  }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/logogofinal dardhiafa.png"
                alt="Dar Dhiafa Klee"
                className="h-24 w-auto object-contain drop-shadow-lg cursor-pointer"
              />
            </motion.div>
          </Link>

                      {/* Desktop Mega Menu Navigation */}
                      <nav className="hidden lg:flex items-center space-x-6">
            {megaMenuItems.map((category, index) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(category.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                     <motion.button
                       className={`flex items-center space-x-1 transition-colors font-inter font-medium py-2 ${
                         isScrolled 
                           ? "text-foreground hover:text-terre-cuite" 
                           : isHomePage 
                             ? "text-white hover:text-terre-cuite drop-shadow-sm"
                             : "text-white hover:text-terre-cuite drop-shadow-sm"
                       }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === category.id && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 gap-3">
                          {category.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                            >
                              {item.href.startsWith('/') && !item.href.includes('#') ? (
                                <Link
                                  to={item.href}
                                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                >
                                  <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors" />
                                  <span className="text-gray-700 group-hover:text-indigo-medina font-inter font-medium transition-colors">
                                    {item.label}
                                  </span>
                                </Link>
                              ) : (
                                <a
                                  href={item.href}
                                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                >
                                  <item.icon className="w-5 h-5 text-terre-cuite group-hover:text-indigo-medina transition-colors" />
                                  <span className="text-gray-700 group-hover:text-indigo-medina font-inter font-medium transition-colors">
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
              </div>
            ))}
          </nav>

          {/* Language Switcher & CTA Button Desktop */}
               <div className="hidden lg:flex items-center gap-3">
                 <LanguageSwitcher isScrolled={isScrolled} isHomePage={isHomePage} />
                 <Link to="/booking">
                   <Button className={`font-inter font-semibold px-4 py-2 transition-all duration-300 ${
                     isScrolled 
                       ? "bg-terre-cuite hover:bg-terre-cuite-hover text-white shadow-soft hover:shadow-medium"
                       : isHomePage 
                         ? "bg-terre-cuite hover:bg-terre-cuite-hover text-white shadow-lg hover:shadow-xl"
                         : "bg-terre-cuite hover:bg-terre-cuite-hover text-white shadow-lg hover:shadow-xl"
                   }`}>
                     {t("nav.booking")}
                   </Button>
                 </Link>
               </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isScrolled 
                ? "text-foreground hover:text-terre-cuite" 
                : isHomePage 
                  ? "text-white hover:text-terre-cuite drop-shadow-sm"
                  : "text-white hover:text-terre-cuite drop-shadow-sm"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="lg:hidden mt-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-1 py-4">
                {megaMenuItems.map((category) => (
                  <div key={category.id} className="space-y-1">
                    <div className="flex items-center space-x-2 py-2 px-4 text-indigo-medina font-inter font-semibold text-sm">
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      {category.items.map((item) => (
                        <div key={item.href}>
                          {item.href.startsWith('/') && !item.href.includes('#') ? (
                            <Link
                              to={item.href}
                              className="flex items-center space-x-2 text-gray-700 hover:text-terre-cuite transition-colors font-inter font-medium py-2 px-4 rounded-lg hover:bg-gray-50 text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              className="flex items-center space-x-2 text-gray-700 hover:text-terre-cuite transition-colors font-inter font-medium py-2 px-4 rounded-lg hover:bg-gray-50 text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200 px-4">
                  <LanguageSwitcher isScrolled={isScrolled} isHomePage={isHomePage} />
                </div>
                <div className="px-4">
                  <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold mt-4 w-full text-sm py-3">
                      {t("nav.booking")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;