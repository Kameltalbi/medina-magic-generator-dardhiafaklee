// Experiences and Activities page - Medina visits, artistic workshops, and local gastronomy
// Features detailed experience listings with booking and cultural immersion

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Calendar,
  Camera,
  Palette,
  ChefHat,
  Building,
  Heart,
  BookOpen,
  Music,
  Utensils,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const Experiences = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: { fr: "Toutes", en: "All", ar: "الكل" } },
    { id: "medina", name: { fr: "Visites médina", en: "Medina visits", ar: "زيارات المدينة" } },
    { id: "art", name: { fr: "Ateliers artistiques", en: "Art workshops", ar: "ورش فنية" } },
    { id: "gastronomy", name: { fr: "Gastronomie", en: "Gastronomy", ar: "فن الطبخ" } }
  ];

  const experiences = [
    {
      id: 1,
      category: "medina",
      name: {
        fr: "Visite guidée du souk",
        en: "Guided souk tour",
        ar: "جولة مرشدة في السوق"
      },
      description: {
        fr: "Découvrez les trésors cachés de la médina avec nos guides passionnés locaux",
        en: "Discover the hidden treasures of the medina with our passionate local guides",
        ar: "اكتشف الكنوز المخفية للمدينة مع مرشدينا المحليين المتحمسين"
      },
      duration: "3h",
      price: 45,
      maxGuests: 8,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Artisans traditionnels", en: "Traditional craftsmen", ar: "الحرفيون التقليديون" },
        { fr: "Architecture islamique", en: "Islamic architecture", ar: "العمارة الإسلامية" },
        { fr: "Marchés authentiques", en: "Authentic markets", ar: "الأسواق الأصيلة" }
      ],
      included: [
        { fr: "Guide expert local", en: "Local expert guide", ar: "مرشد محلي خبير" },
        { fr: "Thé à la menthe", en: "Mint tea", ar: "شاي بالنعناع" },
        { fr: "Entrées monuments", en: "Monument entries", ar: "دخول المعالم" }
      ]
    },
    {
      id: 2,
      category: "medina",
      name: {
        fr: "Patrimoine et architecture",
        en: "Heritage and architecture",
        ar: "التراث والعمارة"
      },
      description: {
        fr: "Explorez la richesse architecturale de Kairouan, berceau de la civilisation islamique",
        en: "Explore the architectural richness of Kairouan, cradle of Islamic civilization",
        ar: "استكشف الثراء المعماري للقيروان، مهد الحضارة الإسلامية"
      },
      duration: "4h",
      price: 65,
      maxGuests: 6,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Grande Mosquée", en: "Great Mosque", ar: "الجامع الكبير" },
        { fr: "Bassins des Aghlabides", en: "Aghlabid Basins", ar: "أحواض الأغالبة" },
        { fr: "Mausolée du Barbier", en: "Barber's Mausoleum", ar: "مقام الحلاق" }
      ],
      included: [
        { fr: "Historien spécialisé", en: "Specialized historian", ar: "مؤرخ متخصص" },
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Déjeuner traditionnel", en: "Traditional lunch", ar: "غداء تقليدي" }
      ]
    },
    {
      id: 3,
      category: "art",
      name: {
        fr: "Atelier art de Klee",
        en: "Klee art workshop",
        ar: "ورشة فن كلي"
      },
      description: {
        fr: "Créez votre propre œuvre inspirée des techniques de Paul Klee en Tunisie",
        en: "Create your own artwork inspired by Paul Klee's techniques in Tunisia",
        ar: "أنشئ عملك الفني المستوحى من تقنيات بول كلي في تونس"
      },
      duration: "3h",
      price: 55,
      maxGuests: 10,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Techniques aquarelle", en: "Watercolor techniques", ar: "تقنيات الألوان المائية" },
        { fr: "Inspiration orientale", en: "Oriental inspiration", ar: "الإلهام الشرقي" },
        { fr: "Œuvre personnelle", en: "Personal artwork", ar: "عمل فني شخصي" }
      ],
      included: [
        { fr: "Matériel artistique", en: "Art materials", ar: "مواد فنية" },
        { fr: "Artiste professionnel", en: "Professional artist", ar: "فنان محترف" },
        { fr: "Encadrement œuvre", en: "Artwork framing", ar: "تأطير العمل" }
      ]
    },
    {
      id: 4,
      category: "gastronomy",
      name: {
        fr: "Atelier culinaire",
        en: "Culinary workshop",
        ar: "ورشة طبخ"
      },
      description: {
        fr: "Apprenez à cuisiner les spécialités locales avec nos chefs traditionnels",
        en: "Learn to cook local specialties with our traditional chefs",
        ar: "تعلم طبخ الأطباق المحلية مع طهاتنا التقليديين"
      },
      duration: "2h",
      price: 40,
      maxGuests: 12,
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Couscous traditionnel", en: "Traditional couscous", ar: "كسكس تقليدي" },
        { fr: "Pâtisseries orientales", en: "Oriental pastries", ar: "حلويات شرقية" },
        { fr: "Épices locales", en: "Local spices", ar: "توابل محلية" }
      ],
      included: [
        { fr: "Ingrédients frais", en: "Fresh ingredients", ar: "مكونات طازجة" },
        { fr: "Recettes authentiques", en: "Authentic recipes", ar: "وصفات أصيلة" },
        { fr: "Dégustation", en: "Tasting", ar: "تذوق" }
      ]
    }
  ];

  const getCurrentLanguage = () => {
    const lang = localStorage.getItem('i18nextLng') || 'fr';
    return lang as 'fr' | 'en' | 'ar';
  };

  const currentLang = getCurrentLanguage();

  const filteredExperiences = selectedCategory === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

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
              className="text-4xl md:text-6xl font-playfair font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Expériences & Activités'}
              {currentLang === 'en' && 'Experiences & Activities'}
              {currentLang === 'ar' && 'التجارب والأنشطة'}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Plongez dans la richesse culturelle de Kairouan à travers nos expériences authentiques : visites de la médina, ateliers artistiques et découvertes gastronomiques.'}
              {currentLang === 'en' && 'Immerse yourself in the cultural richness of Kairouan through our authentic experiences: medina visits, artistic workshops and gastronomic discoveries.'}
              {currentLang === 'ar' && 'انغمس في الثراء الثقافي للقيروان من خلال تجاربنا الأصيلة: زيارات المدينة وورش العمل الفنية والاكتشافات الغذائية.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-card/50">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={staggerItem}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-terre-cuite text-white shadow-medium"
                      : "bg-white text-muted-foreground hover:bg-terre-cuite/10 hover:text-terre-cuite border border-border"
                  }`}
                >
                  {category.name[currentLang]}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  variants={staggerItem}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 border-0 bg-card h-full">
                    {/* Experience Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={experience.image}
                        alt={experience.name[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-terre-cuite text-white font-inter font-medium">
                          {experience.duration}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-inter font-semibold text-sm">{experience.rating}</span>
                          <span className="text-muted-foreground text-xs">({experience.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      {/* Experience Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-playfair font-bold text-indigo-medina mb-2">
                            {experience.name[currentLang]}
                          </h3>
                          <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                            {experience.description[currentLang]}
                          </p>
                        </div>
                      </div>

                      {/* Experience Details */}
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground font-inter">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{experience.maxGuests} max</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-playfair font-bold text-terre-cuite">
                            {experience.price}€
                          </div>
                          <div className="text-xs">
                            {currentLang === 'fr' && 'par personne'}
                            {currentLang === 'en' && 'per person'}
                            {currentLang === 'ar' && 'للشخص'}
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <h4 className="font-inter font-semibold text-indigo-medina mb-2 text-sm">
                          {currentLang === 'fr' && 'Points forts'}
                          {currentLang === 'en' && 'Highlights'}
                          {currentLang === 'ar' && 'المميزات'}
                        </h4>
                        <div className="space-y-1">
                          {experience.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                              <div className="w-2 h-2 bg-vert-porte rounded-full"></div>
                              <span className="text-muted-foreground">{highlight[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Included */}
                      <div className="mb-6">
                        <h4 className="font-inter font-semibold text-indigo-medina mb-2 text-sm">
                          {currentLang === 'fr' && 'Inclus'}
                          {currentLang === 'en' && 'Included'}
                          {currentLang === 'ar' && 'مشمول'}
                        </h4>
                        <div className="space-y-1">
                          {experience.included.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                              <div className="w-2 h-2 bg-terre-cuite rounded-full"></div>
                              <span className="text-muted-foreground">{item[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <Button 
                          className="flex-1 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold transition-all duration-300"
                          size="sm"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {currentLang === 'fr' && 'Réserver'}
                          {currentLang === 'en' && 'Book Now'}
                          {currentLang === 'ar' && 'احجز الآن'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold transition-all duration-300"
                          size="sm"
                        >
                          {currentLang === 'fr' && 'En savoir plus'}
                          {currentLang === 'en' && 'Learn More'}
                          {currentLang === 'ar' && 'اعرف المزيد'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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
              className="text-3xl md:text-4xl font-playfair font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Créez votre expérience sur mesure'}
              {currentLang === 'en' && 'Create your custom experience'}
              {currentLang === 'ar' && 'أنشئ تجربتك المخصصة'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-inter mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Combinez plusieurs activités ou créez une expérience unique adaptée à vos intérêts et à votre emploi du temps.'}
              {currentLang === 'en' && 'Combine multiple activities or create a unique experience tailored to your interests and schedule.'}
              {currentLang === 'ar' && 'اجمع بين عدة أنشطة أو أنشئ تجربة فريدة مصممة خصيصاً لاهتماماتك وجدولك الزمني.'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Demander un devis'}
                {currentLang === 'en' && 'Request Quote'}
                {currentLang === 'ar' && 'اطلب عرض سعر'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Nous contacter'}
                {currentLang === 'en' && 'Contact Us'}
                {currentLang === 'ar' && 'اتصل بنا'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Experiences;
