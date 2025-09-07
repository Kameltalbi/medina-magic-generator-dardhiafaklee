// Footer component - Site footer with brand colors and social links
// Uses indigo-medina background and sable text from design system

import { motion } from "framer-motion";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram", 
      icon: Instagram,
      url: "#",
      color: "hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "hover:text-blue-300",
    },
  ];

  const footerLinks = {
    "Dar Dhiafa Klee": [
      { name: "À propos", url: "#about" },
      { name: "Nos chambres", url: "#rooms" },
      { name: "Expériences", url: "#experiences" },
      { name: "Galerie", url: "#gallery" },
    ],
    "Services": [
      { name: "Réservation", url: "#booking" },
      { name: "Conciergerie", url: "#concierge" },
      { name: "Visite 360°", url: "#virtual-tour" },
      { name: "Transferts", url: "#transfers" },
    ],
    "Informations": [
      { name: "Contact", url: "#contact" },
      { name: "Conditions", url: "#terms" },
      { name: "Confidentialité", url: "#privacy" },
      { name: "Mentions légales", url: "#legal" },
    ],
  };

  return (
    <footer className="bg-indigo-medina text-sable py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div variants={staggerItem} className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-full flex items-center justify-center">
                  <span className="text-white font-playfair font-bold text-xl">D</span>
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl text-sable leading-tight">
                    Dar Dhiafa Klee
                  </h3>
                  <p className="text-sable/80 text-sm font-inter">Kairouan</p>
                </div>
              </div>
              
              <p className="text-sable/90 font-inter leading-relaxed mb-6 text-sm">
                L'art et l'hospitalité se rencontrent au cœur de la médina historique 
                de Kairouan, dans une maison d'hôtes inspirée par Paul Klee.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-terre-cuite" />
                  <span className="text-sable/90 font-inter">Médina de Kairouan, Tunisie</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-vert-porte" />
                  <span className="text-sable/90 font-inter">+216 77 123 456</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-terre-cuite" />
                  <span className="text-sable/90 font-inter">info@dardhiafaklee.tn</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={staggerItem}>
                <h4 className="font-playfair font-semibold text-sable text-lg mb-4">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="text-sable/80 hover:text-terre-cuite transition-colors duration-300 font-inter text-sm hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="border-t border-sable/20 pt-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-sable/80 font-inter text-sm text-center md:text-left">
                <p>
                  © {currentYear} Dar Dhiafa Klee. Tous droits réservés.
                </p>
                <p className="mt-1">
                  Inspiré par l'art de{" "}
                  <span className="text-terre-cuite font-medium">Paul Klee</span> et 
                  l'hospitalité tunisienne traditionnelle.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sable/80 font-inter text-sm mr-2">
                  Suivez-nous :
                </span>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`w-10 h-10 bg-sable/10 hover:bg-sable/20 rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Suivez-nous sur ${social.name}`}
                  >
                    <social.icon className="w-5 h-5 text-sable" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Attribution */}
          <motion.div
            className="text-center mt-8 pt-6 border-t border-sable/10"
            variants={fadeInUp}
          >
            <p className="text-sable/60 font-inter text-xs">
              Conçu avec ❤️ pour préserver et partager le patrimoine culturel de Kairouan
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;