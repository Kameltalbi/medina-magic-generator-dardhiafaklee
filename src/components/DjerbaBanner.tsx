// Djerba Banner component - Informative banner about Dar Dhiafa Djerba
// Displays before footer with link to dardhiafa.tn with scrolling animation

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const DjerbaBanner = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (localStorage.getItem('i18nextLng') || i18n.language || 'fr') as 'fr' | 'en' | 'ar';
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(currentLang === 'ar');
  }, [currentLang]);

  const bannerContent = {
    fr: {
      title: "Dar Dhiafa à Djerba",
      subtitle: "Découvrez aussi notre maison d'hôtes sur l'île de Djerba",
      description: "Vivez une expérience authentique dans notre établissement à Erriadh, Djerba. Une maison vivante, traversée par l'histoire, où chaque porte ouvre sur un souvenir.",
      marquee: "✨ Découvrez Dar Dhiafa à Djerba • Une expérience authentique • Île de Djerba • Erriadh • Maison d'hôtes • ✨",
      cta: "Découvrir Dar Dhiafa Djerba",
      link: "https://www.dardhiafa.tn/"
    },
    en: {
      title: "Dar Dhiafa in Djerba",
      subtitle: "Discover also our guesthouse on the island of Djerba",
      description: "Live an authentic experience at our property in Erriadh, Djerba. A living house, crossed by history, where every door opens onto a memory.",
      marquee: "✨ Discover Dar Dhiafa in Djerba • An authentic experience • Djerba Island • Erriadh • Guesthouse • ✨",
      cta: "Discover Dar Dhiafa Djerba",
      link: "https://www.dardhiafa.tn/"
    },
    ar: {
      title: "دار ضيافة في جربة",
      subtitle: "اكتشف أيضاً بيت الضيافة لدينا في جزيرة جربة",
      description: "عش تجربة أصيلة في منشأنا في رياح، جربة. منزل حي، تعبره التاريخ، حيث يفتح كل باب على ذكرى.",
      marquee: "✨ اكتشف دار ضيافة في جربة • تجربة أصيلة • جزيرة جربة • رياح • بيت ضيافة • ✨",
      cta: "اكتشف دار ضيافة جربة",
      link: "https://www.dardhiafa.tn/"
    }
  };

  const content = bannerContent[currentLang];

  return (
    <motion.section
      className="relative py-0 bg-gradient-to-r from-indigo-medina via-indigo-medina/95 to-indigo-medina overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Scrolling Marquee */}
      <div className="relative py-4 border-b border-white/10 overflow-hidden">
        <div className="flex items-center">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: isRTL ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{
              width: "200%",
            }}
          >
            {/* Double the content for seamless loop */}
            <span className="inline-block text-white font-semibold text-sm md:text-base px-8 tracking-wide">
              {content.marquee}
            </span>
            <span className="inline-block text-white font-semibold text-sm md:text-base px-8 tracking-wide">
              {content.marquee}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative py-8 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <motion.div
                    className="w-10 h-10 bg-terre-cuite/20 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="w-5 h-5 text-terre-cuite" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold font-bold text-white">
                    {content.title}
                  </h3>
                </div>
                
                <p className="text-white/90 font-medium mb-1 text-sm md:text-base">
                  {content.subtitle}
                </p>
                
                <p className="text-white/80 font-medium text-xs md:text-sm leading-relaxed max-w-2xl">
                  {content.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Button
                  size="lg"
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold px-6 py-3 transition-all duration-300 shadow-medium hover:shadow-strong group"
                  onClick={() => window.open(content.link, '_blank', 'noopener,noreferrer')}
                >
                  <Star className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {content.cta}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-terre-cuite/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-logo-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    </motion.section>
  );
};

export default DjerbaBanner;
