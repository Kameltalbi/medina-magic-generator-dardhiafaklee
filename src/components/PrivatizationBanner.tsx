// PrivatizationBanner component - Prominent banner for privatization services
// Compact and eye-catching banner to highlight privatization options

import { motion } from "framer-motion";
import { Building2, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrivatizationBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="relative py-6 md:py-8 bg-gradient-to-r from-logo-gold via-logo-gold/95 to-terre-cuite overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {/* Left side - Content */}
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <motion.div
              className="hidden sm:flex items-center gap-2"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center -ml-4">
                <Users className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.h3
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Privatisez Dar Dhiafa Paul Klee
              </motion.h3>
              <motion.p
                className="text-sm md:text-base lg:text-lg text-white/90 font-medium"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Hôtel complet (24-28 pers.) • Espace commun (10+ pers.) • Réceptions • Team Building • Tables d'hôtes
              </motion.p>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-terre-cuite font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={() => navigate('/evenements')}
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Organiser un événement
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.section>
  );
};

export default PrivatizationBanner;

