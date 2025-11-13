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
            className="space-y-12"
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div
              className="text-center"
              variants={staggerItem}
            >
              <motion.h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-terre-cuite mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                L'Héritage de Paul Klee à Kairouan
              </motion.h3>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div className="space-y-6" variants={staggerItem}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="space-y-4 text-foreground font-medium leading-relaxed">
                    {[
                      "Ce lieu est créé en honneur au grand peintre Paul Klee et à son œuvre. Il a su capter cette Tunisie dans son mode de vie et sa spiritualité.",
                      "Paul Klee à Kairouan a vécu un choc de sublimation purement intérieure. Dans son journal, il écrit : « L'ambiance me pénètre avec tant de douceur que sans plus y mettre de zèle, il se fait en moi de plus en plus d'assurance. La couleur me possède. »",
                      "Kairouan au temps de la visite de Paul Klee était imprégnée par une mouvance Soufi Qadiriyya qui générait la reliance spirituelle et les échanges entre les habitants et les villages.",
                      "« La peinture ne reproduit pas le visible, elle rend visible »"
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        className={index === 3 ? "italic text-indigo-medina font-semibold text-lg" : ""}
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

              {/* Images Side */}
              <motion.div
                className="space-y-8"
                variants={staggerItem}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Paul Klee Portrait - Reduced */}
                <motion.div
                  className="relative flex justify-center"
                >
                  <motion.div 
                    className="aspect-[2/3] max-w-[180px] bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-lg overflow-hidden shadow-medium"
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
                </motion.div>

                {/* Kairouan Image */}
                <motion.div
                  className="relative"
                >
                  <motion.div 
                    className="relative w-full bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-2xl overflow-hidden shadow-strong"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.picture
                      className="w-full h-full block"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    >
                      <source srcSet="/paul-klee-kairouan.webp" type="image/webp" />
                      <source srcSet="/paul-klee-kairouan-optimized.png" type="image/png" />
                      <img
                        src="/paul-klee-kairouan.png"
                        alt="Paul Klee à Kairouan - Vue de la médina"
                        className="w-full h-auto object-contain"
                      />
                    </motion.picture>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Decorative corner elements */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-logo-gold/50 rounded-tl-xl pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-logo-gold/50 rounded-br-xl pointer-events-none" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaulKleeSection;
