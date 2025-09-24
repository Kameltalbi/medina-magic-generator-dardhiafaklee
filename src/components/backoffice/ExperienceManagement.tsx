// ExperienceManagement component - Gestion complète des expériences
// Vue tableau/cartes, formulaire de modification, ajout d'expériences
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Save,
  X,
  Eye,
  EyeOff,
  DollarSign,
  Clock,
  Users,
  Star,
  Image as ImageIcon,
  AlertCircle,
  Calendar,
  MapPin,
  Camera,
  CheckCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Experience {
  id: number;
  category: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  duration: string;
  price: number;
  priceType: 'per_person' | 'per_group';
  groupPrice?: number;
  maxGuests: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: { fr: string; en: string; ar: string }[];
  included: { fr: string; en: string; ar: string }[];
  isActive: boolean;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  timeSlots: string[];
}

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [activeTab, setActiveTab] = useState("general");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(null);

  // Toutes les expériences existantes de la page publique
  const defaultExperiences: Experience[] = [
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
      priceType: 'per_person',
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
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["09:00", "11:00", "14:00", "16:00"]
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
      priceType: 'per_person',
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
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["09:00", "14:00", "16:00"]
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
      priceType: 'per_person',
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
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["09:00", "11:00", "14:00", "16:00"]
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
      priceType: 'per_person',
      maxGuests: 25,
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Reliques sacrées", en: "Sacred relics", ar: "الآثار المقدسة" },
        { fr: "Faïences décoratives", en: "Decorative ceramics", ar: "الخزف الزخرفي" },
        { fr: "Architecture spirituelle", en: "Spiritual architecture", ar: "العمارة الروحية" }
      ],
      included: [
        { fr: "Guide spirituel", en: "Spiritual guide", ar: "مرشد روحي" },
        { fr: "Entrée mausolée", en: "Mausoleum entry", ar: "دخول الضريح" },
        { fr: "Documentation religieuse", en: "Religious documentation", ar: "وثائق دينية" }
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["09:00", "11:00", "14:00", "16:00"]
    },
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
      priceType: 'per_person',
      maxGuests: 8,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Techniques traditionnelles", en: "Traditional techniques", ar: "التقنيات التقليدية" },
        { fr: "Motifs kairouanais", en: "Kairouan patterns", ar: "أنماط قيروانية" },
        { fr: "Création personnelle", en: "Personal creation", ar: "إبداع شخصي" }
      ],
      included: [
        { fr: "Matériel de tissage", en: "Weaving materials", ar: "مواد النسيج" },
        { fr: "Artisan expert", en: "Expert artisan", ar: "حرفي خبير" },
        { fr: "Tapis à emporter", en: "Carpet to take home", ar: "سجادة للعودة بها" }
      ],
      isActive: true,
      availability: {
        monday: false,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["10:00", "14:00"]
    },
    {
      id: 8,
      category: "gastronomy",
      name: {
        fr: "Cours de cuisine kairouanaise",
        en: "Kairouan cooking class",
        ar: "دورة طبخ قيروانية"
      },
      description: {
        fr: "Participez à la préparation d'un couscous traditionnel ou des fameux « makroudh », pâtisseries à la semoule et aux dattes emblématiques de Kairouan. Un moment convivial suivi d'une dégustation dans le patio.",
        en: "Participate in the preparation of traditional couscous or the famous « makroudh », semolina and date pastries emblematic of Kairouan. A friendly moment followed by a tasting in the patio.",
        ar: "شارك في تحضير الكسكس التقليدي أو «المقروض» الشهير، حلويات السميد والتمر الرمزية للقيروان. لحظة ودية تليها تذوق في الفناء."
      },
      duration: "3h",
      price: 55,
      priceType: 'per_person',
      maxGuests: 8,
      rating: 4.9,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Couscous traditionnel", en: "Traditional couscous", ar: "كسكس تقليدي" },
        { fr: "Makroudh aux dattes", en: "Date makroudh", ar: "مقروض بالتمر" },
        { fr: "Dégustation patio", en: "Patio tasting", ar: "تذوق في الفناء" }
      ],
      included: [
        { fr: "Ingrédients frais", en: "Fresh ingredients", ar: "مكونات طازجة" },
        { fr: "Chef traditionnel", en: "Traditional chef", ar: "طاهي تقليدي" },
        { fr: "Recettes authentiques", en: "Authentic recipes", ar: "وصفات أصيلة" }
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      timeSlots: ["10:00", "16:00"]
    },
    {
      id: 14,
      category: "spiritual",
      name: {
        fr: "Chant soufi et traditions spirituelles",
        en: "Sufi singing and spiritual traditions",
        ar: "الغناء الصوفي والتقاليد الروحية"
      },
      description: {
        fr: "Participez à une soirée exceptionnelle où chants mystiques et musique soufie vous transporteront dans l'âme spirituelle de Kairouan.",
        en: "Participate in an exceptional evening where mystical songs and Sufi music will transport you into the spiritual soul of Kairouan.",
        ar: "شارك في أمسية استثنائية حيث ستنتقل بك الأغاني الصوفية والموسيقى الصوفية إلى الروح الروحية للقيروان."
      },
      duration: "2h",
      price: 45,
      priceType: 'per_person',
      maxGuests: 30,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Chants mystiques", en: "Mystical songs", ar: "أغاني صوفية" },
        { fr: "Musique soufie", en: "Sufi music", ar: "موسيقى صوفية" },
        { fr: "Expérience spirituelle", en: "Spiritual experience", ar: "تجربة روحية" }
      ],
      included: [
        { fr: "Musiciens professionnels", en: "Professional musicians", ar: "موسيقيون محترفون" },
        { fr: "Thé à la menthe", en: "Mint tea", ar: "شاي بالنعناع" },
        { fr: "Documentation", en: "Documentation", ar: "وثائق" }
      ],
      isActive: true,
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: true,
        saturday: true,
        sunday: false
      },
      timeSlots: ["19:00", "20:00"]
    },
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
      priceType: 'per_person',
      maxGuests: 8,
      rating: 4.9,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Amphithéâtre UNESCO", en: "UNESCO amphitheater", ar: "مدرج اليونسكو" },
        { fr: "Architecture romaine", en: "Roman architecture", ar: "عمارة رومانية" },
        { fr: "Histoire antique", en: "Ancient history", ar: "تاريخ قديم" }
      ],
      included: [
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Guide historien", en: "Historian guide", ar: "مرشد مؤرخ" },
        { fr: "Déjeuner", en: "Lunch", ar: "غداء" }
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      timeSlots: ["08:00"]
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
      priceType: 'per_person',
      maxGuests: 8,
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Temples romains", en: "Roman temples", ar: "معابد رومانية" },
        { fr: "Vestiges byzantins", en: "Byzantine remains", ar: "آثار بيزنطية" },
        { fr: "Site archéologique", en: "Archaeological site", ar: "موقع أثري" }
      ],
      included: [
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Guide archéologue", en: "Archaeologist guide", ar: "مرشد أثري" },
        { fr: "Déjeuner", en: "Lunch", ar: "غداء" }
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      timeSlots: ["08:00"]
    },
    {
      id: 18,
      category: "excursions",
      name: {
        fr: "Mahdia et Monastir – Entre mer et patrimoine",
        en: "Mahdia and Monastir – Between sea and heritage",
        ar: "المهدية والمنستير – بين البحر والتراث"
      },
      description: {
        fr: "Partez vers la côte pour une journée entre patrimoine maritime et plages de sable fin. Visitez la médina de Mahdia ou le Ribat de Monastir.",
        en: "Head to the coast for a day between maritime heritage and fine sandy beaches. Visit the medina of Mahdia or the Ribat of Monastir.",
        ar: "توجه إلى الساحل لقضاء يوم بين التراث البحري والشواطئ الرملية الناعمة. زر مدينة المهدية أو رباط المنستير."
      },
      duration: "8h",
      price: 100,
      priceType: 'per_person',
      maxGuests: 8,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        { fr: "Patrimoine maritime", en: "Maritime heritage", ar: "تراث بحري" },
        { fr: "Plages paradisiaques", en: "Paradise beaches", ar: "شواطئ جنة" },
        { fr: "Médina historique", en: "Historical medina", ar: "مدينة تاريخية" }
      ],
      included: [
        { fr: "Transport privé", en: "Private transport", ar: "نقل خاص" },
        { fr: "Guide côtier", en: "Coastal guide", ar: "مرشد ساحلي" },
        { fr: "Déjeuner maritime", en: "Maritime lunch", ar: "غداء بحري" }
      ],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      timeSlots: ["08:00"]
    }
  ];

  useEffect(() => {
    const savedExperiences = localStorage.getItem('experiences');
    if (savedExperiences) {
      try {
        const parsedExperiences = JSON.parse(savedExperiences);
        setExperiences(parsedExperiences);
      } catch (error) {
        console.error("Error parsing experiences from localStorage:", error);
        setExperiences(defaultExperiences);
      }
    } else {
      setExperiences(defaultExperiences);
    }
  }, []);

  const saveExperiences = (updatedExperiences: Experience[]) => {
    setExperiences(updatedExperiences);
    localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
  };

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.name.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.name.ar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || exp.category === filterCategory;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && exp.isActive) ||
                         (filterStatus === "inactive" && !exp.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddExperience = () => {
    setCurrentExperience(null);
    setFormData({
      category: "culture",
      name: { fr: "", en: "", ar: "" },
      description: { fr: "", en: "", ar: "" },
      duration: "",
      price: 0,
      priceType: 'per_person',
      maxGuests: 1,
      rating: 0,
      reviews: 0,
      image: "",
      highlights: [],
      included: [],
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      timeSlots: []
    });
    setIsDialogOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setCurrentExperience(experience);
    setFormData(experience);
    setIsDialogOpen(true);
  };

  const handleSaveExperience = () => {
    if (!formData.name?.fr || !formData.description?.fr || !formData.price) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    let updatedExperiences;
    if (currentExperience) {
      // Modification
      updatedExperiences = experiences.map(exp =>
        exp.id === currentExperience.id ? { ...exp, ...formData } as Experience : exp
      );
      toast.success("Expérience modifiée avec succès");
    } else {
      // Ajout
      const newExperience: Experience = {
        id: Math.max(...experiences.map(e => e.id)) + 1,
        ...formData
      } as Experience;
      updatedExperiences = [...experiences, newExperience];
      toast.success("Nouvelle expérience ajoutée");
    }

    saveExperiences(updatedExperiences);
    setIsDialogOpen(false);
  };

  const handleDeleteExperience = (id: number) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    saveExperiences(updatedExperiences);
    setIsDeleteDialogOpen(false);
    toast.success("Expérience supprimée");
  };

  const handleToggleStatus = (id: number) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? { ...exp, isActive: !exp.isActive } : exp
    );
    saveExperiences(updatedExperiences);
    toast.success(`Expérience ${experiences.find(e => e.id === id)?.isActive ? 'désactivée' : 'activée'}`);
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      culture: "Culture",
      artisanat: "Artisanat",
      gastronomy: "Gastronomie",
      nature: "Nature",
      spiritual: "Spirituel",
      excursions: "Excursions"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      culture: "bg-blue-100 text-blue-800",
      artisanat: "bg-green-100 text-green-800",
      gastronomy: "bg-orange-100 text-orange-800",
      nature: "bg-emerald-100 text-emerald-800",
      spiritual: "bg-purple-100 text-purple-800",
      excursions: "bg-red-100 text-red-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina mb-2">
            Gestion des Expériences
          </h1>
          <p className="text-muted-foreground font-inter">
            Gérez vos expériences et activités
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
            variant="outline"
          >
            {viewMode === 'table' ? 'Vue cartes' : 'Vue tableau'}
          </Button>
          <Button
            onClick={handleAddExperience}
            className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle expérience
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card className="shadow-sm border-0 bg-card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une expérience..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="artisanat">Artisanat</SelectItem>
                <SelectItem value="gastronomy">Gastronomie</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="spiritual">Spirituel</SelectItem>
                <SelectItem value="excursions">Excursions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="inactive">Inactives</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vue Tableau */}
      {viewMode === 'table' && (
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExperiences.map((experience) => (
                  <TableRow key={experience.id}>
                    <TableCell>
                      <div className="w-16 h-12 rounded-lg overflow-hidden">
                        <img
                          src={experience.image}
                          alt={experience.name.fr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-inter font-semibold">{experience.name.fr}</div>
                        <div className="text-sm text-muted-foreground">{experience.description.fr}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(experience.category)}>
                        {getCategoryLabel(experience.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-terre-cuite" />
                        <span className="font-semibold">{experience.price} TND</span>
                        <span className="text-sm text-muted-foreground">
                          / {experience.priceType === 'per_person' ? 'pers.' : 'groupe'}
                        </span>
                      </div>
                      {experience.groupPrice && (
                        <div className="text-xs text-muted-foreground">
                          Groupe: {experience.groupPrice} TND
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{experience.duration}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={experience.isActive ? "default" : "secondary"}>
                          {experience.isActive ? "Actif" : "Inactif"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(experience.id)}
                        >
                          {experience.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditExperience(experience)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setExperienceToDelete(experience.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Vue Cartes */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => (
            <Card key={experience.id} className="shadow-sm border-0 bg-card overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.name.fr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(experience.category)}>
                    {getCategoryLabel(experience.category)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={experience.isActive ? "default" : "secondary"}>
                    {experience.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-indigo-medina mb-2">
                      {experience.name.fr}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {experience.description.fr}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{experience.maxGuests} max</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-playfair font-bold text-terre-cuite">
                        {experience.price} TND
                      </div>
                      <div className="text-xs text-muted-foreground">
                        / {experience.priceType === 'per_person' ? 'pers.' : 'groupe'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{experience.rating}</span>
                      <span className="text-xs text-muted-foreground">({experience.reviews})</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditExperience(experience)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setExperienceToDelete(experience.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog d'ajout/modification d'expérience */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-indigo-medina">
              {currentExperience ? "Modifier l'expérience" : "Nouvelle expérience"}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="pricing">Tarifs</TabsTrigger>
              <TabsTrigger value="availability">Disponibilités</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nameFr">Titre (Français) *</Label>
                  <Input
                    id="nameFr"
                    value={formData.name?.fr || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: { ...prev.name, fr: e.target.value }
                    }))}
                    placeholder="Ex: Atelier de tissage de tapis"
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn">Titre (Anglais)</Label>
                  <Input
                    id="nameEn"
                    value={formData.name?.en || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: { ...prev.name, en: e.target.value }
                    }))}
                    placeholder="Ex: Carpet weaving workshop"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category || ""}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="artisanat">Artisanat</SelectItem>
                    <SelectItem value="gastronomy">Gastronomie</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="spiritual">Spirituel</SelectItem>
                    <SelectItem value="excursions">Excursions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Durée *</Label>
                  <Input
                    id="duration"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="Ex: 2h, 3h30"
                  />
                </div>
                <div>
                  <Label htmlFor="maxGuests">Nombre max de participants *</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    value={formData.maxGuests || 1}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Image de l'expérience</Label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <div className="w-24 h-16 rounded-lg overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    id="image"
                    value={formData.image || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="URL de l'image"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
                />
                <Label htmlFor="isActive">Expérience active (visible sur le site)</Label>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="descriptionFr">Description (Français) *</Label>
                <Textarea
                  id="descriptionFr"
                  value={formData.description?.fr || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: { ...prev.description, fr: e.target.value }
                  }))}
                  placeholder="Décrivez l'expérience en détail..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="descriptionEn">Description (Anglais)</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.description?.en || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: { ...prev.description, en: e.target.value }
                  }))}
                  placeholder="Describe the experience in detail..."
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Prix par personne *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="priceType">Type de prix</Label>
                  <Select
                    value={formData.priceType || 'per_person'}
                    onValueChange={(value: 'per_person' | 'per_group') => setFormData(prev => ({ ...prev, priceType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_person">Par personne</SelectItem>
                      <SelectItem value="per_group">Par groupe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="groupPrice">Prix par groupe (optionnel)</Label>
                <Input
                  id="groupPrice"
                  type="number"
                  value={formData.groupPrice || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, groupPrice: parseInt(e.target.value) || undefined }))}
                  min="0"
                  placeholder="Prix fixe pour un groupe"
                />
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4 mt-4">
              <div>
                <Label>Jours de disponibilité</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Object.entries(formData.availability || {}).map(([day, available]) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={available}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            [day]: !!checked
                          }
                        }))}
                      />
                      <Label htmlFor={day} className="capitalize">
                        {day === 'monday' ? 'Lundi' :
                         day === 'tuesday' ? 'Mardi' :
                         day === 'wednesday' ? 'Mercredi' :
                         day === 'thursday' ? 'Jeudi' :
                         day === 'friday' ? 'Vendredi' :
                         day === 'saturday' ? 'Samedi' : 'Dimanche'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 pt-6 border-t mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSaveExperience}
              className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {currentExperience ? "Modifier" : "Créer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair text-indigo-medina">
              Confirmer la suppression
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Êtes-vous sûr de vouloir supprimer cette expérience ? Cette action est irréversible.
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => experienceToDelete && handleDeleteExperience(experienceToDelete)}
            >
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceManagement;