// Header component - Sticky navigation with Dar Dhiafa Klee branding
// Uses indigo-medina, terre-cuite, and sable colors from design system

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("about.title"), href: "#about" },
    { label: t("nav.rooms"), href: "#rooms" },
    { label: t("nav.experiences"), href: "#experiences" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.tour360"), href: "#virtual-tour" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-medium"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-full flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-indigo-medina font-playfair font-bold text-xl leading-tight">
                Dar Dhiafa Klee
              </h1>
              <p className="text-muted-foreground text-xs">Kairouan</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-terre-cuite transition-colors font-inter font-medium"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Language Switcher & CTA Button Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-6 py-2 transition-all duration-300 shadow-soft hover:shadow-medium">
              {t("nav.booking")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-terre-cuite transition-colors"
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
        <motion.nav
          className={`lg:hidden mt-4 ${isMobileMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-border">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-terre-cuite transition-colors font-inter font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <LanguageSwitcher />
            </div>
            <Button className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold mt-4 w-full">
              {t("nav.booking")}
            </Button>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;