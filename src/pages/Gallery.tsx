// Gallery and Virtual Visit page - HD photo gallery and 360° virtual tour
// Features interior/exterior spaces with lightbox viewing and virtual tour integration

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import { 
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  Eye,
  Camera,
  Building2,
  Bed,
  Utensils,
  TreePine,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import AvailabilityForm from "@/components/AvailabilityForm";
import { useAvailabilityForm } from "@/hooks/useAvailabilityForm";

const Gallery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAvailabilityFormOpen, openAvailabilityForm, closeAvailabilityForm } = useAvailabilityForm();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", name: { fr: "Toutes", en: "All", ar: "الكل" }, icon: Camera },
    { id: "rooms", name: { fr: "Chambres", en: "Rooms", ar: "الغرف" }, icon: Bed },
    { id: "common", name: { fr: "Espaces communs", en: "Common areas", ar: "المساحات المشتركة" }, icon: Building2 },
    { id: "restaurant", name: { fr: "Restaurant", en: "Restaurant", ar: "المطعم" }, icon: Utensils },
    { id: "exterior", name: { fr: "Extérieurs", en: "Exterior", ar: "الخارج" }, icon: TreePine },
    { id: "art", name: { fr: "Art & Décoration", en: "Art & Decoration", ar: "الفن والديكور" }, icon: Palette }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "/photosgaleriepage/pagegalerie1.jpg",
      category: "common",
      title: { fr: "Cour intérieure traditionnelle", en: "Traditional interior courtyard", ar: "الفناء الداخلي التقليدي" },
      description: { fr: "Fontaine centrale avec architecture mauresque", en: "Central fountain with Moorish architecture", ar: "نافورة مركزية بالعمارة المورية" }
    },
    {
      id: 2,
      src: "/photosgaleriepage/pagegalerie2.jpg",
      category: "rooms",
      title: { fr: "Suite Klee", en: "Klee Suite", ar: "جناح كلي" },
      description: { fr: "Élégance moderne inspirée de Paul Klee", en: "Modern elegance inspired by Paul Klee", ar: "أناقة عصرية مستوحاة من بول كلي" }
    },
    {
      id: 3,
      src: "/photosgaleriepage/pagegalerie3.jpg",
      category: "restaurant",
      title: { fr: "Restaurant avec vue médina", en: "Restaurant with medina view", ar: "مطعم مع إطلالة على المدينة" },
      description: { fr: "Cuisine traditionnelle dans un cadre authentique", en: "Traditional cuisine in an authentic setting", ar: "مطبخ تقليدي في إطار أصيل" }
    },
    {
      id: 4,
      src: "/photosgaleriepage/pagegalerie4.jpg",
      category: "exterior",
      title: { fr: "Terrasse panoramique", en: "Panoramic terrace", ar: "شرفة بانورامية" },
      description: { fr: "Vue exceptionnelle sur les toits de Kairouan", en: "Exceptional view over Kairouan rooftops", ar: "إطلالة استثنائية على أسطح القيروان" }
    },
    {
      id: 5,
      src: "/photosgaleriepage/pagegalerie5.jpg",
      category: "art",
      title: { fr: "Détail architectural mauresque", en: "Moorish architectural detail", ar: "تفصيل معماري مغربي" },
      description: { fr: "Ornements traditionnels et calligraphie", en: "Traditional ornaments and calligraphy", ar: "زخارف تقليدية وخط عربي" }
    },
    {
      id: 6,
      src: "/photosgaleriepage/pagegalerie6.jpg",
      category: "common",
      title: { fr: "Salon traditionnel", en: "Traditional lounge", ar: "صالة تقليدية" },
      description: { fr: "Tapis berbères et mobilier artisanal", en: "Berber carpets and handcrafted furniture", ar: "سجاد بربري وأثاث حرفي" }
    },
    {
      id: 7,
      src: "/photosgaleriepage/pagegalerie7.jpg",
      category: "rooms",
      title: { fr: "Chambre traditionnelle", en: "Traditional room", ar: "غرفة تقليدية" },
      description: { fr: "Décoration authentique tunisienne", en: "Authentic Tunisian decoration", ar: "ديكور تونسي أصيل" }
    },
    {
      id: 8,
      src: "/photosgaleriepage/pagegalerie8.jpg",
      category: "art",
      title: { fr: "Œuvre inspirée de Klee", en: "Klee-inspired artwork", ar: "عمل فني مستوحى من كلي" },
      description: { fr: "Art contemporain et héritage tunisien", en: "Contemporary art and Tunisian heritage", ar: "فن معاصر وتراث تونسي" }
    },
    {
      id: 9,
      src: "/photosgaleriepage/pagegalerie9.jpg",
      category: "exterior",
      title: { fr: "Entrée principale", en: "Main entrance", ar: "المدخل الرئيسي" },
      description: { fr: "Porte traditionnelle de la médina", en: "Traditional medina door", ar: "باب المدينة التقليدي" }
    },
    {
      id: 10,
      src: "/photosgaleriepage/pagegalerie10.jpg",
      category: "restaurant",
      title: { fr: "Petit-déjeuner traditionnel", en: "Traditional breakfast", ar: "إفطار تقليدي" },
      description: { fr: "Produits locaux et spécialités maison", en: "Local products and house specialties", ar: "منتجات محلية وتخصصات البيت" }
    },
    {
      id: 11,
      src: "/photosgaleriepage/pagegalerie11.jpg",
      category: "rooms",
      title: { fr: "Chambre Deluxe", en: "Deluxe Room", ar: "غرفة ديلوكس" },
      description: { fr: "Luxe et confort avec terrasse privée", en: "Luxury and comfort with private terrace", ar: "فخامة وراحة مع شرفة خاصة" }
    },
    {
      id: 12,
      src: "/photosgaleriepage/pagegalerie12.jpg",
      category: "exterior",
      title: { fr: "Jardin intérieur", en: "Interior garden", ar: "الحديقة الداخلية" },
      description: { fr: "Oasis de verdure au cœur de la médina", en: "Green oasis in the heart of the medina", ar: "واحة خضراء في قلب المدينة" }
    }
  ];

  const getCurrentLanguage = () => {
    const lang = localStorage.getItem('i18nextLng') || 'fr';
    return lang as 'fr' | 'en' | 'ar';
  };

  const currentLang = getCurrentLanguage();

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 bg-gradient-to-br from-indigo-medina/10 to-vert-porte/10">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Galerie & Visite Virtuelle'}
              {currentLang === 'en' && 'Gallery & Virtual Tour'}
              {currentLang === 'ar' && 'المعرض والجولة الافتراضية'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Découvrez la beauté de Dar Dhiafa Klee à travers notre galerie photo HD et explorez chaque recoin avec notre visite virtuelle 360° immersive.'}
              {currentLang === 'en' && 'Discover the beauty of Dar Dhiafa Klee through our HD photo gallery and explore every corner with our immersive 360° virtual tour.'}
              {currentLang === 'ar' && 'اكتشف جمال دار ضيافة كلي من خلال معرض الصور عالي الدقة واستكشف كل زاوية مع جولتنا الافتراضية الغامرة 360°.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="text-center mb-12"
              variants={staggerItem}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-4">
                {currentLang === 'fr' && 'Visite Virtuelle 360°'}
                {currentLang === 'en' && '360° Virtual Tour'}
                {currentLang === 'ar' && 'جولة افتراضية 360°'}
              </h2>
              <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
                {currentLang === 'fr' && 'Explorez Dar Dhiafa Klee comme si vous y étiez grâce à notre visite virtuelle interactive.'}
                {currentLang === 'en' && 'Explore Dar Dhiafa Klee as if you were there with our interactive virtual tour.'}
                {currentLang === 'ar' && 'استكشف دار ضيافة كلي وكأنك هناك مع جولتنا الافتراضية التفاعلية.'}
              </p>
            </motion.div>

            <motion.div
              className="relative aspect-[16/9] bg-gradient-to-br from-indigo-medina to-vert-porte rounded-2xl overflow-hidden shadow-large"
              variants={staggerItem}
            >
              {/* Virtual Tour Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-12 h-12 ml-2" />
                  </div>
                  <div>
                    <h3 className="font-bold font-bold text-2xl mb-3">
                      {currentLang === 'fr' && 'Visite Virtuelle Immersive'}
                      {currentLang === 'en' && 'Immersive Virtual Tour'}
                      {currentLang === 'ar' && 'جولة افتراضية غامرة'}
                    </h3>
                    <p className="font-medium opacity-90 max-w-md mx-auto mb-6">
                      {currentLang === 'fr' && 'Naviguez librement dans tous les espaces de notre maison d\'hôtes avec une qualité HD exceptionnelle.'}
                      {currentLang === 'en' && 'Navigate freely through all spaces of our guesthouse with exceptional HD quality.'}
                      {currentLang === 'ar' && 'تنقل بحرية في جميع مساحات دار الضيافة بجودة عالية استثنائية.'}
                    </p>
                    <Button
                      size="lg"
                      className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold px-8 py-3"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      {currentLang === 'fr' && 'Commencer la visite'}
                      {currentLang === 'en' && 'Start Tour'}
                      {currentLang === 'ar' && 'ابدأ الجولة'}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Future integration placeholder */}
              {/* 
              <iframe
                src="YOUR_MATTERPORT_OR_KUULA_URL"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Visite 360° Dar Dhiafa Klee"
                className="rounded-2xl"
              />
              */}
            </motion.div>

            {/* Virtual Tour Features */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              variants={staggerContainer}
            >
              {[
                {
                  icon: Eye,
                  title: { fr: "Navigation intuitive", en: "Intuitive navigation", ar: "تنقل بديهي" },
                  desc: { fr: "Déplacez-vous naturellement d'une pièce à l'autre", en: "Move naturally from room to room", ar: "انتقل بطبيعية من غرفة إلى أخرى" }
                },
                {
                  icon: Maximize2,
                  title: { fr: "Qualité HD", en: "HD Quality", ar: "جودة عالية" },
                  desc: { fr: "Images haute résolution pour une expérience immersive", en: "High resolution images for immersive experience", ar: "صور عالية الدقة لتجربة غامرة" }
                },
                {
                  icon: Camera,
                  title: { fr: "Points d'intérêt", en: "Points of interest", ar: "نقاط الاهتمام" },
                  desc: { fr: "Informations détaillées sur chaque espace", en: "Detailed information about each space", ar: "معلومات مفصلة عن كل مساحة" }
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-soft"
                  variants={staggerItem}
                >
                  <feature.icon className="w-8 h-8 text-terre-cuite mx-auto mb-4" />
                  <h4 className="font-bold font-bold text-indigo-medina mb-2">
                    {feature.title[currentLang]}
                  </h4>
                  <p className="text-muted-foreground font-medium text-sm">
                    {feature.desc[currentLang]}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Gallery Header */}
            <motion.div
              className="text-center mb-12"
              variants={staggerItem}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-4">
                {currentLang === 'fr' && 'Galerie Photo HD'}
                {currentLang === 'en' && 'HD Photo Gallery'}
                {currentLang === 'ar' && 'معرض الصور عالي الدقة'}
              </h2>
              <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
                {currentLang === 'fr' && 'Découvrez nos espaces intérieurs et extérieurs à travers une sélection de photos haute définition.'}
                {currentLang === 'en' && 'Discover our interior and exterior spaces through a selection of high-definition photos.'}
                {currentLang === 'ar' && 'اكتشف مساحاتنا الداخلية والخارجية من خلال مجموعة مختارة من الصور عالية الدقة.'}
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              variants={staggerItem}
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-terre-cuite text-white shadow-medium"
                        : "bg-white text-muted-foreground hover:bg-terre-cuite/10 hover:text-terre-cuite border border-border"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name[currentLang]}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Image Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group cursor-pointer"
                  variants={staggerItem}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl shadow-medium hover:shadow-large transition-all duration-300">
                    <img
                      src={image.src}
                      alt={image.title[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold font-bold text-sm mb-1">
                          {image.title[currentLang]}
                        </h3>
                        <p className="font-medium text-xs opacity-90">
                          {image.description[currentLang]}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-6xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={filteredImages[currentImageIndex]?.src}
                alt={filteredImages[currentImageIndex]?.title[currentLang]}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold font-bold text-lg mb-2">
                    {filteredImages[currentImageIndex]?.title[currentLang]}
                  </h3>
                  <p className="font-medium text-sm opacity-90">
                    {filteredImages[currentImageIndex]?.description[currentLang]}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge className="bg-terre-cuite text-white">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-sable to-card">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Prêt à vivre l\'expérience ?'}
              {currentLang === 'en' && 'Ready to live the experience?'}
              {currentLang === 'ar' && 'مستعد لخوض التجربة؟'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Réservez dès maintenant votre séjour à Dar Dhiafa Klee et découvrez par vous-même la beauté de notre maison d\'hôtes.'}
              {currentLang === 'en' && 'Book your stay at Dar Dhiafa Klee now and discover for yourself the beauty of our guesthouse.'}
              {currentLang === 'ar' && 'احجز إقامتك في دار ضيافة كلي الآن واكتشف بنفسك جمال دار الضيافة لدينا.'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
                onClick={openAvailabilityForm}
              >
                {currentLang === 'fr' && 'Réserver maintenant'}
                {currentLang === 'en' && 'Book Now'}
                {currentLang === 'ar' && 'احجز الآن'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Voir les chambres'}
                {currentLang === 'en' && 'View Rooms'}
                {currentLang === 'ar' && 'عرض الغرف'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default Gallery;
