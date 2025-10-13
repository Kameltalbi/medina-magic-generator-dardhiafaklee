// Experiences and Activities page - Medina visits, artistic workshops, and local gastronomy
// Features detailed experience listings with booking and cultural immersion

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  ArrowRight,
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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: { fr: "Toutes", en: "All", ar: "الكل" } },
    { id: "culture", name: { fr: "Visites culturelles", en: "Cultural visits", ar: "زيارات ثقافية" } },
    { id: "artisanat", name: { fr: "Expériences artisanales", en: "Artisan experiences", ar: "تجارب حرفية" } },
    { id: "gastronomy", name: { fr: "Saveurs et gastronomie", en: "Flavors & gastronomy", ar: "النكهات والطبخ" } },
    { id: "nature", name: { fr: "Nature et bien-être", en: "Nature & wellness", ar: "الطبيعة والعافية" } },
    { id: "excursions", name: { fr: "Excursions journée", en: "Day excursions", ar: "رحلات نهارية" } }
  ];

  // Load experiences from localStorage or use default data
  const [experiences, setExperiences] = useState([
    // VISITES CULTURELLES ET HISTORIQUES
    {
      id: 1,
      category: "culture",
      name: {
        fr: "Grande Mosquée de Kairouan (Okba Ibn Nafi)",
        en: "Great Mosque of Kairouan (Okba Ibn Nafi)",
        ar: "الجامع الكبير بالقيروان (عقبة بن نافع)"
      },
      description: {
        fr: "Plongez dans l'histoire de l'une des plus anciennes mosquées du monde musulman. Accompagné d'un guide, vous découvrirez son architecture impressionnante, ses colonnes antiques venues de Carthage et son rôle fondateur dans le rayonnement de Kairouan.",
        en: "Immerse yourself in the history of one of the oldest mosques in the Muslim world. Accompanied by a guide, you will discover its impressive architecture, ancient columns from Carthage and its founding role in the influence of Kairouan.",
        ar: "انغمس في تاريخ إحدى أقدم المساجد في العالم الإسلامي. برفقة مرشد، ستكتشف عمارتها المثيرة للإعجاب وأعمدةها القديمة من قرطاج ودورها المؤسس في إشعاع القيروان."
      },
      duration: "2h",
      price: 35,
      maxGuests: 15,
      rating: 4.9,
      reviews: 287,
      image: "/Experiences/grande mosquee de kairouan.webp",
      highlights: [
        { fr: "Architecture islamique millénaire", en: "Millennial Islamic architecture", ar: "العمارة الإسلامية الألفية" },
        { fr: "Colonnes antiques de Carthage", en: "Ancient Carthage columns", ar: "أعمدة قرطاج القديمة" },
        { fr: "Guide historien spécialisé", en: "Specialized historian guide", ar: "مرشد مؤرخ متخصص" }
      ],
      included: [
        { fr: "Guide expert certifié", en: "Certified expert guide", ar: "مرشد خبير معتمد" },
        { fr: "Entrée monument", en: "Monument entry", ar: "دخول المعلم" },
        { fr: "Documentation historique", en: "Historical documentation", ar: "وثائق تاريخية" }
      ]
    },
    {
      id: 2,
      category: "culture",
      name: {
        fr: "La Médina de Kairouan – Classée UNESCO",
        en: "Kairouan Medina – UNESCO World Heritage",
        ar: "مدينة القيروان – مصنفة اليونسكو"
      },
      description: {
        fr: "Promenez-vous dans un labyrinthe de ruelles bordées de maisons blanchies à la chaux, de portes colorées et d'ateliers d'artisans. Vous y rencontrerez des tisserands de tapis, des potiers et des maîtres du cuivre, perpétuant un savoir-faire transmis de génération en génération.",
        en: "Stroll through a maze of alleys lined with whitewashed houses, colorful doors and artisan workshops. You will meet carpet weavers, potters and copper masters, perpetuating know-how passed down from generation to generation.",
        ar: "تجول في متاهة من الأزقة المبطنة بالبيوت المبيضة بالجير والأبواب الملونة وورش الحرفيين. ستلتقي بناسجي السجاد والخزافين وأسياد النحاس، مستمرين في الحفاظ على المعرفة المنقولة من جيل إلى جيل."
      },
      duration: "3h",
      price: 45,
      maxGuests: 12,
      rating: 4.8,
      reviews: 198,
      image: "/Experiences/medina kairouan.jpg",
      highlights: [
        { fr: "Architecture traditionnelle", en: "Traditional architecture", ar: "العمارة التقليدية" },
        { fr: "Ateliers d'artisans", en: "Artisan workshops", ar: "ورش الحرفيين" },
        { fr: "Patrimoine UNESCO", en: "UNESCO heritage", ar: "تراث اليونسكو" }
      ],
      included: [
        { fr: "Guide local expert", en: "Local expert guide", ar: "مرشد محلي خبير" },
        { fr: "Visite ateliers", en: "Workshop visits", ar: "زيارة الورش" },
        { fr: "Thé à la menthe", en: "Mint tea", ar: "شاي بالنعناع" }
      ]
    },
    {
      id: 3,
      category: "culture",
      name: {
        fr: "Bassins des Aghlabides",
        en: "Aghlabid Basins",
        ar: "أحواض الأغالبة"
      },
      description: {
        fr: "Découvrez ces gigantesques réservoirs construits au IXe siècle, véritable prouesse d'ingénierie hydraulique. Ils témoignent du génie des Aghlabides et de l'importance de l'eau dans cette région semi-aride.",
        en: "Discover these gigantic reservoirs built in the 9th century, a true feat of hydraulic engineering. They bear witness to the genius of the Aghlabids and the importance of water in this semi-arid region.",
        ar: "اكتشف هذه الخزانات العملاقة التي بنيت في القرن التاسع، إنجاز حقيقي للهندسة الهيدروليكية. تشهد على عبقرية الأغالبة وأهمية الماء في هذه المنطقة شبه القاحلة."
      },
      duration: "1h30",
      price: 25,
      maxGuests: 20,
      rating: 4.7,
      reviews: 156,
      image: "/Experiences/bassin les aghlabides.jpg",
      highlights: [
        { fr: "Ingénierie hydraulique", en: "Hydraulic engineering", ar: "الهندسة الهيدروليكية" },
        { fr: "Architecture du IXe siècle", en: "9th century architecture", ar: "عمارة القرن التاسع" },
        { fr: "Patrimoine historique", en: "Historical heritage", ar: "التراث التاريخي" }
      ],
      included: [
        { fr: "Guide spécialisé", en: "Specialized guide", ar: "مرشد متخصص" },
        { fr: "Documentation technique", en: "Technical documentation", ar: "وثائق تقنية" },
        { fr: "Accès privilégié", en: "Privileged access", ar: "وصول مميز" }
      ]
    },
    {
      id: 4,
      category: "culture",
      name: {
        fr: "Mausolée de Sidi Sahbi – La Mosquée du Barbier",
        en: "Sidi Sahbi Mausoleum – The Barber's Mosque",
        ar: "مقام سيدي الصحبي – مسجد الحلاق"
      },
      description: {
        fr: "Lieu de recueillement, ce mausolée abrite les reliques d'un compagnon du Prophète. Orné de faïences et de plafonds sculptés, il illustre le raffinement spirituel et artistique de Kairouan.",
        en: "A place of contemplation, this mausoleum houses the relics of a companion of the Prophet. Adorned with ceramics and carved ceilings, it illustrates the spiritual and artistic refinement of Kairouan.",
        ar: "مكان للتأمل، يضم هذا الضريح آثار صحابي من صحابة النبي. مزين بالخزف والأسقف المنحوتة، يوضح الرقي الروحي والفني للقيروان."
      },
      duration: "1h",
      price: 20,
      maxGuests: 25,
      rating: 4.6,
      reviews: 134,
      image: "/Experiences/mausoleeSS.jpg",
      highlights: [
        { fr: "Reliques sacrées", en: "Sacred relics", ar: "الآثار المقدسة" },
        { fr: "Faïences décoratives", en: "Decorative ceramics", ar: "الخزف الزخرفي" },
        { fr: "Architecture spirituelle", en: "Spiritual architecture", ar: "العمارة الروحية" }
      ],
      included: [
        { fr: "Guide spirituel", en: "Spiritual guide", ar: "مرشد روحي" },
        { fr: "Entrée mausolée", en: "Mausoleum entry", ar: "دخول الضريح" },
        { fr: "Documentation religieuse", en: "Religious documentation", ar: "وثائق دينية" }
      ]
    },
    // EXPÉRIENCES ARTISANALES
    {
      id: 5,
      category: "artisanat",
      name: {
        fr: "Atelier de tissage de tapis",
        en: "Carpet weaving workshop",
        ar: "ورشة نسج السجاد"
      },
      description: {
        fr: "Initiez-vous à l'art du tissage kairouanais, réputé dans tout le monde arabe. Aux côtés d'une artisan tisserande, vous apprendrez les gestes précis et la patience nécessaires pour créer un motif traditionnel.",
        en: "Learn the art of Kairouan weaving, renowned throughout the Arab world. Alongside a weaver artisan, you will learn the precise gestures and patience necessary to create a traditional pattern.",
        ar: "تعلم فن النسيج القيرواني، المشهور في جميع أنحاء العالم العربي. إلى جانب حرفية ناسجة، ستتعلم الحركات الدقيقة والصبر اللازم لإنشاء نمط تقليدي."
      },
      duration: "2h30",
      price: 50,
      maxGuests: 8,
      rating: 4.9,
      reviews: 89,
      image: "/Experiences/atelier-de-tissage-de-tapis.jpg",
      highlights: [
        { fr: "Techniques traditionnelles", en: "Traditional techniques", ar: "التقنيات التقليدية" },
        { fr: "Motifs kairouanais", en: "Kairouan patterns", ar: "أنماط قيروانية" },
        { fr: "Création personnelle", en: "Personal creation", ar: "إبداع شخصي" }
      ],
      included: [
        { fr: "Matériel de tissage", en: "Weaving materials", ar: "مواد النسيج" },
        { fr: "Artisan expert", en: "Expert artisan", ar: "حرفي خبير" },
        { fr: "Tapis à emporter", en: "Carpet to take home", ar: "سجادة للعودة بها" }
      ]
    },
    // EXCURSIONS À LA JOURNÉE
    {
      id: 16,
      category: "excursions",
      name: {
        fr: "El Jem – L'amphithéâtre romain",
        en: "El Jem – The Roman amphitheater",
        ar: "الجم – المدرج الروماني"
      },
      description: {
        fr: "À une heure de route, découvrez l'un des plus grands amphithéâtres romains du monde, classé UNESCO. Un monument impressionnant qui raconte la grandeur de l'Afrique romaine.",
        en: "An hour's drive away, discover one of the largest Roman amphitheaters in the world, UNESCO listed. An impressive monument that tells the greatness of Roman Africa.",
        ar: "على بعد ساعة بالسيارة، اكتشف أحد أكبر المدرجات الرومانية في العالم، المصنف اليونسكو. نصب مثير للإعجاب يحكي عظمة إفريقيا الرومانية."
      },
      duration: "8h",
      price: 120,
      maxGuests: 8,
      rating: 4.9,
      reviews: 198,
      image: "/image-eljem.jpg",
      highlights: [
        { fr: "Amphithéâtre UNESCO", en: "UNESCO amphitheater", ar: "مدرج اليونسكو" },
        { fr: "Architecture romaine", en: "Roman architecture", ar: "عمارة رومانية" },
        { fr: "Histoire antique", en: "Ancient history", ar: "تاريخ قديم" }
      ],
      included: [
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Guide historien", en: "Historian guide", ar: "مرشد مؤرخ" },
        { fr: "Déjeuner", en: "Lunch", ar: "غداء" }
      ]
    },
    {
      id: 17,
      category: "excursions",
      name: {
        fr: "Sbeitla – La cité antique",
        en: "Sbeitla – The ancient city",
        ar: "سبيطلة – المدينة القديمة"
      },
      description: {
        fr: "Explorez les vestiges majestueux de temples romains et byzantins, dans un site archéologique parmi les mieux conservés de Tunisie.",
        en: "Explore the majestic remains of Roman and Byzantine temples, in one of the best-preserved archaeological sites in Tunisia.",
        ar: "استكشف الآثار المهيبة للمعابد الرومانية والبيزنطية، في أحد أفضل المواقع الأثرية المحفوظة في تونس."
      },
      duration: "8h",
      price: 110,
      maxGuests: 8,
      rating: 4.7,
      reviews: 145,
      image: "/image-Sbeitla.jpg",
      highlights: [
        { fr: "Temples romains", en: "Roman temples", ar: "معابد رومانية" },
        { fr: "Vestiges byzantins", en: "Byzantine remains", ar: "آثار بيزنطية" },
        { fr: "Site archéologique", en: "Archaeological site", ar: "موقع أثري" }
      ],
      included: [
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Guide archéologue", en: "Archaeologist guide", ar: "مرشد أثري" },
        { fr: "Déjeuner", en: "Lunch", ar: "غداء" }
      ]
    },
    // HAMMAM TRADITIONNEL
    {
      id: 18,
      category: "nature",
      name: {
        fr: "Hammam Traditionnel à Kairouan",
        en: "Traditional Hammam in Kairouan",
        ar: "الحمام التقليدي بالقيروان"
      },
      description: {
        fr: "Plongez dans l'authenticité tunisienne avec notre expérience de hammam traditionnel. Découvrez les rituels ancestraux de purification et de bien-être dans un cadre historique préservé depuis des siècles.",
        en: "Immerse yourself in Tunisian authenticity with our traditional hammam experience. Discover ancestral purification and wellness rituals in a historical setting preserved for centuries.",
        ar: "انغمس في الأصالة التونسية مع تجربة الحمام التقليدي. اكتشف طقوس التطهير والعافية القديمة في إطار تاريخي محفوظ منذ قرون."
      },
      duration: "2h",
      price: 80,
      maxGuests: 6,
      rating: 4.8,
      reviews: 156,
      image: "/hammam-kairouan.jpg",
      highlights: [
        { fr: "Salle de vapeur", en: "Steam room", ar: "غرفة البخار" },
        { fr: "Savon noir", en: "Black soap", ar: "الصابون الأسود" },
        { fr: "Huiles essentielles", en: "Essential oils", ar: "الزيوت الأساسية" }
      ],
      included: [
        { fr: "Accès hammam", en: "Hammam access", ar: "دخول الحمام" },
        { fr: "Savon noir", en: "Black soap", ar: "الصابون الأسود" },
        { fr: "Thé à la menthe", en: "Mint tea", ar: "الشاي بالنعناع" }
      ]
    }
  ]);

  const getCurrentLanguage = () => {
    const lang = localStorage.getItem('i18nextLng') || 'fr';
    return lang as 'fr' | 'en' | 'ar';
  };

  const currentLang = getCurrentLanguage();

  // Load experiences from localStorage on component mount
  useEffect(() => {
    const loadExperiences = () => {
      const savedExperiences = localStorage.getItem('experiences');
      if (savedExperiences) {
        try {
          const parsedExperiences = JSON.parse(savedExperiences);
          setExperiences(parsedExperiences);
        } catch (error) {
          console.error('Error loading experiences from localStorage:', error);
        }
      }
    };

    // Load initially
    loadExperiences();

    // Listen for changes in localStorage (when admin updates prices)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'experiences' && e.newValue) {
        try {
          const parsedExperiences = JSON.parse(e.newValue);
          setExperiences(parsedExperiences);
        } catch (error) {
          console.error('Error parsing updated experiences:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomUpdate = () => {
      loadExperiences();
    };
    
    window.addEventListener('experiencesUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('experiencesUpdated', handleCustomUpdate);
    };
  }, []);

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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bold text-terre-cuite mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Expériences & Activités'}
              {currentLang === 'en' && 'Experiences & Activities'}
              {currentLang === 'ar' && 'التجارب والأنشطة'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
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
                  className={`px-6 py-3 rounded-full font-medium font-medium transition-all duration-300 ${
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
                <div
                  key={experience.id}
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
                        <Badge className="bg-terre-cuite text-white font-medium font-medium">
                          {experience.duration}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium font-semibold text-sm">{experience.rating}</span>
                          <span className="text-muted-foreground text-xs">({experience.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      {/* Experience Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold font-bold text-terre-cuite mb-2">
                            {experience.name[currentLang]}
                          </h3>
                          <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-4">
                            {experience.description[currentLang]}
                          </p>
                        </div>
                      </div>

                      {/* Experience Details */}
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground font-medium">
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
                          <div className="text-2xl font-bold font-bold text-terre-cuite">
                            {experience.price} TND
                          </div>
                          <div className="text-xs">
                            {experience.priceType === 'per_person' 
                              ? (currentLang === 'fr' && 'par personne')
                              : (currentLang === 'fr' && 'par groupe')
                            }
                            {experience.priceType === 'per_person' 
                              ? (currentLang === 'en' && 'per person')
                              : (currentLang === 'en' && 'per group')
                            }
                            {experience.priceType === 'per_person' 
                              ? (currentLang === 'ar' && 'للشخص')
                              : (currentLang === 'ar' && 'للمجموعة')
                            }
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <h4 className="font-medium font-semibold text-terre-cuite mb-2 text-sm">
                          {currentLang === 'fr' && 'Points forts'}
                          {currentLang === 'en' && 'Highlights'}
                          {currentLang === 'ar' && 'المميزات'}
                        </h4>
                        <div className="space-y-1">
                          {experience.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-medium">
                              <div className="w-2 h-2 bg-vert-porte rounded-full"></div>
                              <span className="text-muted-foreground">{highlight[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Included */}
                      <div className="mb-6">
                        <h4 className="font-medium font-semibold text-terre-cuite mb-2 text-sm">
                          {currentLang === 'fr' && 'Inclus'}
                          {currentLang === 'en' && 'Included'}
                          {currentLang === 'ar' && 'مشمول'}
                        </h4>
                        <div className="space-y-1">
                          {experience.included.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-medium">
                              <div className="w-2 h-2 bg-terre-cuite rounded-full"></div>
                              <span className="text-muted-foreground">{item[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <Button 
                          className="flex-1 bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold transition-all duration-300"
                          size="sm"
                          onClick={() => navigate('/booking')}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {currentLang === 'fr' && 'Réserver'}
                          {currentLang === 'en' && 'Book Now'}
                          {currentLang === 'ar' && 'احجز الآن'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-medium font-semibold transition-all duration-300"
                          size="sm"
                        >
                          {currentLang === 'fr' && 'En savoir plus'}
                          {currentLang === 'en' && 'Learn More'}
                          {currentLang === 'ar' && 'اعرف المزيد'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
              className="text-3xl md:text-4xl font-bold font-bold text-terre-cuite mb-6"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Créez votre expérience sur mesure'}
              {currentLang === 'en' && 'Create your custom experience'}
              {currentLang === 'ar' && 'أنشئ تجربتك المخصصة'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto"
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
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Demander un devis'}
                {currentLang === 'en' && 'Request Quote'}
                {currentLang === 'ar' && 'اطلب عرض سعر'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-medium font-semibold px-8 py-3 transition-all duration-300"
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
