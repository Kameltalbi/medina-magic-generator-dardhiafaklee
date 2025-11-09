// BrochureButton component - Floating button to download brochure
// Uses vert-porte color from design system

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

const BrochureButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0, opacity: 0, x: -50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.7
      }}
    >
      <motion.a
        href="/brochure.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-4 bg-vert-porte hover:bg-vert-porte-hover text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        >
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
        <span className="text-sm sm:text-base lg:text-lg whitespace-nowrap hidden sm:inline">
          📘 Télécharger notre brochure
        </span>
        <span className="text-sm sm:hidden">
          📘 Brochure
        </span>
        <Download className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
      </motion.a>
    </motion.div>
  );
};

export default BrochureButton;

