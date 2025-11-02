// WhatsApp Button component - Floating WhatsApp button for quick contact
// Displays a fixed floating button in the bottom right corner

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const [phoneNumber] = useState("+21677123456"); // Format: +21677123456 (no spaces or dashes)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after page load
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
  const whatsappMessage = encodeURIComponent(t("footer.whatsappMessage"));

  const handleClick = () => {
    window.open(`${whatsappUrl}?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.5 
      }}
    >
      <motion.button
        onClick={handleClick}
        className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contacter nous sur WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full opacity-75"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.75, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppButton;

