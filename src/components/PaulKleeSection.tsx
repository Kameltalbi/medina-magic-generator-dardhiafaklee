// Paul Klee Section - Dedicated section about Paul Klee's heritage
// Positioned right after the Hero section

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const PaulKleeSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Paul Klee Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
          >
            {/* Text Content */}
            <motion.div className="space-y-6" variants={staggerItem}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-terre-cuite mb-6"
                  whileHover={{ 
                    scale: 1.02,
                    color: "#8B5A2B"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  L'Héritage de Paul Klee à Kairouan
                </motion.h3>
                
                <div className="space-y-4 text-foreground font-medium leading-relaxed">
                  {[
                    "Ce lieu est créé en honneur au grand peintre Paul Klee et à son œuvre. Il a su capter cette Tunisie dans son mode de vie et sa spiritualité.",
                    "Paul Klee à Kairouan a vécu un choc de sublimation purement intérieure. Dans son journal, il écrit : « L'ambiance me pénètre avec tant de douceur que sans plus y mettre de zèle, il se fait en moi de plus en plus d'assurance. La couleur me possède. »",
                    "Kairouan au temps de la visite de Paul Klee était imprégnée par une mouvance Soufi Qadiriyya qui générait la reliance spirituelle et les échanges entre les habitants et les villages.",
                    "« La peinture ne reproduit pas le visible, elle rend visible »"
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      className={index === 3 ? "italic text-indigo-medina font-semibold" : ""}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        x: 10
                      }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Paul Klee Portrait */}
            <motion.div
              className="relative"
              variants={staggerItem}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="aspect-[2/3] max-w-sm mx-auto bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-2xl overflow-hidden shadow-medium"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.picture
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <source srcSet="/paul-klee-1911.webp" type="image/webp" />
                  <img
                    src="/paul-klee-1911.jpg"
                    alt="Portrait de Paul Klee"
                    className="w-full h-full object-cover"
                  />
                </motion.picture>
              </motion.div>
              
              {/* Floating Color Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { color: "bg-logo-gold/30", position: "top-4 right-4", size: "w-8 h-8" },
                  { color: "bg-logo-dark/30", position: "bottom-8 left-4", size: "w-6 h-6" },
                  { color: "bg-logo-gold/30", position: "top-1/2 left-2", size: "w-4 h-4" }
                ].map((element, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${element.color} ${element.position} ${element.size} rounded-full`}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaulKleeSection;
