// Footer component - Site footer with brand colors and social links
// Uses indigo-medina background and sable text from design system

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=61581954914255",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram", 
      icon: Instagram,
      url: "https://www.instagram.com/dardhiafapaulklee/",
      color: "hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/dar-dhiafa-klee/",
      color: "hover:text-blue-300",
    },
  ];

  const footerLinks = {
    [t("footer.discover")]: [
      { name: t("footer.ourRooms"), href: "#rooms" },
      { name: t("footer.experiences"), href: "#experiences" },
      { name: t("footer.gallery"), href: "#gallery" },
      { name: t("footer.tour360"), href: "#gallery" },
    ],
    [t("footer.services")]: [
      { name: t("footer.booking"), href: "#booking" },
      { name: t("footer.concierge"), href: "#contact" },
      { name: t("footer.restaurant"), href: "#restaurant" },
      { name: t("footer.wellness"), href: "#wellness" },
    ],
    [t("footer.information")]: [
      { name: t("footer.aboutUs"), href: "/about" },
      { name: t("footer.contact"), href: "#contact" },
      { name: t("footer.termsOfService"), href: "/terms" },
      { name: t("footer.privacyPolicy"), href: "/privacy" },
      { name: "Administration", href: "/backoffice" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-sable via-sable to-muted/50 py-16 px-4 border-t border-terre-cuite/20">
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
                <div className="w-12 h-12 bg-gradient-to-br from-terre-cuite to-indigo-medina rounded-full flex items-center justify-center shadow-medium">
                  <span className="text-white font-bold font-bold text-xl">D</span>
                </div>
                <div>
                  <h3 className="font-bold font-bold text-xl text-terre-cuite leading-tight">
                    Dar Dhiafa Klee
                  </h3>
                  <p className="text-indigo-medina/80 text-sm font-medium">Kairouan</p>
                </div>
              </div>
              
              <p className="text-indigo-medina/90 font-medium leading-relaxed mb-6 text-sm">
                {t("footer.brandDescription")}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-terre-cuite" />
                  <span className="text-indigo-medina/90 font-medium" dangerouslySetInnerHTML={{ __html: t("footer.address") }} />
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-terre-cuite" />
                  <span className="text-indigo-medina/90 font-medium">{t("footer.phone")}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-terre-cuite" />
                  <span className="text-indigo-medina/90 font-medium">{t("footer.email")}</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={staggerItem}>
                <h4 className="font-bold font-semibold text-terre-cuite text-lg mb-4">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-indigo-medina/80 hover:text-terre-cuite transition-colors duration-300 font-medium text-sm hover:underline"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-indigo-medina/80 hover:text-terre-cuite transition-colors duration-300 font-medium text-sm hover:underline"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="border-t border-terre-cuite/20 pt-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-indigo-medina/80 font-medium text-sm text-center md:text-left">
                <p>
                  {t("footer.copyright")}
                </p>
                <p className="mt-1 text-indigo-medina/70">
                  {t("footer.brandDescription")}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-indigo-medina/80 font-medium text-sm mr-2">
                  {t("footer.followUsText")}
                </span>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-terre-cuite/10 hover:bg-terre-cuite/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5 text-terre-cuite" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Attribution */}
          <motion.div
            className="text-center mt-8 pt-6 border-t border-terre-cuite/10"
            variants={fadeInUp}
          >
            <p className="text-indigo-medina/60 font-medium text-xs">
              {t("footer.attribution")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;