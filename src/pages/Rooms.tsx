// Rooms and Suites page - Detailed room listings with photos, descriptions, and booking
// Features room gallery, amenities, pricing, and availability checking

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Wifi, 
  AirVent, 
  Bath, 
  Building2, 
  Car, 
  Coffee, 
  Tv, 
  Users, 
  Bed,
  Star,
  Calendar,
  MapPin,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

const Rooms = () => {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: {
        fr: "Chambre Traditionnelle",
        en: "Traditional Room", 
        ar: "غرفة تقليدية"
      },
      category: "Standard",
      price: 120,
      currency: "€",
      size: "25m²",
      capacity: 2,
      rating: 4.8,
      reviews: 127,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: {
        fr: "Authenticité et confort dans un décor tunisien traditionnel. Cette chambre vous plonge dans l'atmosphère unique de la médina de Kairouan.",
        en: "Authenticity and comfort in a traditional Tunisian decor. This room immerses you in the unique atmosphere of Kairouan's medina.",
        ar: "الأصالة والراحة في ديكور تونسي تقليدي. تغمرك هذه الغرفة في الأجواء الفريدة لمدينة القيروان العتيقة."
      },
      amenities: [
        { icon: Wifi, name: { fr: "WiFi gratuit", en: "Free WiFi", ar: "واي فاي مجاني" } },
        { icon: AirVent, name: { fr: "Climatisation", en: "Air conditioning", ar: "تكييف الهواء" } },
        { icon: Bath, name: { fr: "Salle de bain privée", en: "Private bathroom", ar: "حمام خاص" } },
        { icon: Building2, name: { fr: "Terrasse", en: "Terrace", ar: "شرفة" } },
        { icon: Tv, name: { fr: "TV écran plat", en: "Flat screen TV", ar: "تلفزيون بشاشة مسطحة" } },
        { icon: Coffee, name: { fr: "Service thé/café", en: "Tea/Coffee service", ar: "خدمة الشاي والقهوة" } }
      ],
      features: [
        { fr: "Vue sur la médina", en: "Medina view", ar: "إطلالة على المدينة" },
        { fr: "Décoration artisanale", en: "Handcrafted decoration", ar: "ديكور حرفي" },
        { fr: "Literie premium", en: "Premium bedding", ar: "أسرّة فاخرة" }
      ]
    },
    {
      id: 2,
      name: {
        fr: "Suite Klee",
        en: "Klee Suite",
        ar: "جناح كلي"
      },
      category: "Suite",
      price: 180,
      currency: "€",
      size: "45m²",
      capacity: 3,
      rating: 4.9,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: {
        fr: "Élégance moderne inspirée de l'art de Paul Klee. Cette suite unique combine luxe contemporain et héritage artistique.",
        en: "Modern elegance inspired by Paul Klee's art. This unique suite combines contemporary luxury with artistic heritage.",
        ar: "أناقة عصرية مستوحاة من فن بول كلي. يجمع هذا الجناح الفريد بين الفخامة المعاصرة والتراث الفني."
      },
      amenities: [
        { icon: Wifi, name: { fr: "WiFi gratuit", en: "Free WiFi", ar: "واي فاي مجاني" } },
        { icon: AirVent, name: { fr: "Climatisation", en: "Air conditioning", ar: "تكييف الهواء" } },
        { icon: Bath, name: { fr: "Baignoire", en: "Bathtub", ar: "حوض استحمام" } },
        { icon: Building2, name: { fr: "Vue médina", en: "Medina view", ar: "إطلالة على المدينة" } },
        { icon: Coffee, name: { fr: "Service thé", en: "Tea service", ar: "خدمة الشاي" } },
        { icon: Users, name: { fr: "Salon privé", en: "Private lounge", ar: "صالة خاصة" } }
      ],
      features: [
        { fr: "Œuvres d'art originales", en: "Original artworks", ar: "أعمال فنية أصلية" },
        { fr: "Mobilier design", en: "Designer furniture", ar: "أثاث مصمم" },
        { fr: "Service personnalisé", en: "Personalized service", ar: "خدمة شخصية" }
      ]
    },
    {
      id: 3,
      name: {
        fr: "Chambre Deluxe",
        en: "Deluxe Room",
        ar: "غرفة ديلوكس"
      },
      category: "Deluxe",
      price: 220,
      currency: "€",
      size: "35m²",
      capacity: 2,
      rating: 4.9,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: {
        fr: "Luxe et raffinement avec terrasse panoramique. Profitez d'une vue exceptionnelle sur les toits de la médina historique.",
        en: "Luxury and refinement with panoramic terrace. Enjoy an exceptional view over the rooftops of the historic medina.",
        ar: "الفخامة والرقي مع شرفة بانورامية. استمتع بإطلالة استثنائية على أسطح المدينة التاريخية."
      },
      amenities: [
        { icon: Wifi, name: { fr: "WiFi gratuit", en: "Free WiFi", ar: "واي فاي مجاني" } },
        { icon: AirVent, name: { fr: "Climatisation", en: "Air conditioning", ar: "تكييف الهواء" } },
        { icon: Building2, name: { fr: "Terrasse privée", en: "Private terrace", ar: "شرفة خاصة" } },
        { icon: Coffee, name: { fr: "Minibar", en: "Minibar", ar: "ميني بار" } },
        { icon: Bed, name: { fr: "Service en chambre", en: "Room service", ar: "خدمة الغرف" } },
        { icon: MapPin, name: { fr: "Vue panoramique", en: "Panoramic view", ar: "إطلالة بانورامية" } }
      ],
      features: [
        { fr: "Terrasse panoramique", en: "Panoramic terrace", ar: "شرفة بانورامية" },
        { fr: "Mobilier haut de gamme", en: "High-end furniture", ar: "أثاث راقي" },
        { fr: "Conciergerie 24h/24", en: "24/7 concierge", ar: "خدمة الكونسيرج 24/7" }
      ]
    }
  ];

  const getCurrentLanguage = () => {
    const lang = localStorage.getItem('i18nextLng') || 'fr';
    return lang as 'fr' | 'en' | 'ar';
  };

  const currentLang = getCurrentLanguage();

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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-indigo-medina mb-4 sm:mb-6 px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Chambres & Suites'}
              {currentLang === 'en' && 'Rooms & Suites'}
              {currentLang === 'ar' && 'الغرف والأجنحة'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed px-4"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Découvrez nos chambres et suites élégamment décorées, alliant confort moderne et charme traditionnel tunisien dans le cœur historique de Kairouan.'}
              {currentLang === 'en' && 'Discover our elegantly decorated rooms and suites, combining modern comfort with traditional Tunisian charm in the historic heart of Kairouan.'}
              {currentLang === 'ar' && 'اكتشف غرفنا وأجنحتنا المزينة بأناقة، والتي تجمع بين الراحة العصرية والسحر التونسي التقليدي في قلب القيروان التاريخي.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  variants={staggerItem}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 border-0 bg-card">
                    {/* Room Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={room.images[0]}
                        alt={room.name[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-terre-cuite text-white font-inter font-medium">
                          {room.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-inter font-semibold text-sm">{room.rating}</span>
                          <span className="text-muted-foreground text-xs">({room.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Room Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-playfair font-bold text-indigo-medina mb-1">
                            {room.name[currentLang]}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
                            <span>{room.size}</span>
                            <span>•</span>
                            <span>{room.capacity} {currentLang === 'fr' ? 'personnes' : currentLang === 'en' ? 'guests' : 'أشخاص'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-playfair font-bold text-terre-cuite">
                            {room.price}{room.currency}
                          </div>
                          <div className="text-sm text-muted-foreground font-inter">
                            {currentLang === 'fr' && 'par nuit'}
                            {currentLang === 'en' && 'per night'}
                            {currentLang === 'ar' && 'في الليلة'}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                        {room.description[currentLang]}
                      </p>

                      {/* Amenities */}
                      <div className="mb-6">
                        <h4 className="font-inter font-semibold text-indigo-medina mb-3 text-sm">
                          {currentLang === 'fr' && 'Équipements'}
                          {currentLang === 'en' && 'Amenities'}
                          {currentLang === 'ar' && 'المرافق'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                              <amenity.icon className="w-3 h-3 text-vert-porte" />
                              <span className="text-muted-foreground">{amenity.name[currentLang]}</span>
                            </div>
                          ))}
                        </div>
                        {room.amenities.length > 4 && (
                          <button 
                            className="text-xs text-terre-cuite font-inter font-medium mt-2 hover:underline"
                            onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                          >
                            {selectedRoom === room.id 
                              ? (currentLang === 'fr' ? 'Voir moins' : currentLang === 'en' ? 'Show less' : 'عرض أقل')
                              : (currentLang === 'fr' ? `+${room.amenities.length - 4} autres` : currentLang === 'en' ? `+${room.amenities.length - 4} more` : `+${room.amenities.length - 4} المزيد`)
                            }
                          </button>
                        )}
                      </div>

                      {/* Expanded Amenities */}
                      {selectedRoom === room.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4"
                        >
                          <div className="grid grid-cols-1 gap-2 border-t border-border pt-4">
                            {room.amenities.slice(4).map((amenity, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                                <amenity.icon className="w-3 h-3 text-vert-porte" />
                                <span className="text-muted-foreground">{amenity.name[currentLang]}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            <h5 className="font-inter font-semibold text-indigo-medina mb-2 text-sm">
                              {currentLang === 'fr' && 'Points forts'}
                              {currentLang === 'en' && 'Highlights'}
                              {currentLang === 'ar' && 'المميزات'}
                            </h5>
                            <div className="space-y-1">
                              {room.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs font-inter">
                                  <Check className="w-3 h-3 text-vert-porte" />
                                  <span className="text-muted-foreground">{feature[currentLang]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
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
                          {currentLang === 'fr' && 'Voir détails'}
                          {currentLang === 'en' && 'View Details'}
                          {currentLang === 'ar' && 'عرض التفاصيل'}
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
              {currentLang === 'fr' && 'Besoin d\'aide pour choisir ?'}
              {currentLang === 'en' && 'Need help choosing?'}
              {currentLang === 'ar' && 'تحتاج مساعدة في الاختيار؟'}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-inter mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              {currentLang === 'fr' && 'Notre équipe est là pour vous conseiller et vous aider à trouver l\'hébergement parfait pour votre séjour à Kairouan.'}
              {currentLang === 'en' && 'Our team is here to advise you and help you find the perfect accommodation for your stay in Kairouan.'}
              {currentLang === 'ar' && 'فريقنا هنا لتقديم المشورة ومساعدتك في العثور على الإقامة المثالية لإقامتك في القيروان.'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Contactez-nous'}
                {currentLang === 'en' && 'Contact Us'}
                {currentLang === 'ar' && 'اتصل بنا'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-vert-porte text-vert-porte hover:bg-vert-porte hover:text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {currentLang === 'fr' && 'Voir disponibilités'}
                {currentLang === 'en' && 'Check Availability'}
                {currentLang === 'ar' && 'تحقق من التوفر'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Rooms;
