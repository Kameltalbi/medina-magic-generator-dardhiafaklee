// Events page - Privatization and events information
// Complete page for event organization and hotel privatization

import { motion } from "framer-motion";
import { Building2, Users, Heart, Sparkles, ArrowRight, Calendar, Utensils, Briefcase, Presentation, Camera, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  const fullPrivatizationFeatures = [
    "Séjours familiaux",
    "Retraites privées",
    "Groupes de voyageurs",
    "Séjours culturels ou thématiques",
    "Mariages intimistes (micro-weddings)",
    "Week-ends événementiels"
  ];

  const commonSpaceEvents = [
    "Réceptions conviviales",
    "Célébrations de mariage en petit comité",
    "Team buildings",
    "Ateliers professionnels",
    "Tables d'hôtes et dîners privés",
    "Présentations de produits",
    "Rencontres culturelles ou artistiques"
  ];

  const weddingFeatures = [
    "Cérémonies symboliques",
    "Séances photo dans les patios et terrasses",
    "Dîners de mariage en petit comité",
    "Séjours privatifs avec les familles et proches"
  ];

  const inspiringFeatures = [
    {
      icon: Building2,
      title: "Architecture traditionnelle",
      description: "Un cadre authentique au cœur de la médina"
    },
    {
      icon: Sparkles,
      title: "Atmosphère apaisante",
      description: "Un environnement propice au partage et à la créativité"
    },
    {
      icon: Utensils,
      title: "Cuisine raffinée",
      description: "Des saveurs authentiques pour vos événements"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-logo-gold/10 via-terre-cuite/10 to-indigo-medina/10">
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-block mb-4"
                variants={fadeInUp}
              >
                <div className="bg-gradient-to-r from-vert-porte/20 to-vert-porte/30 px-6 py-2 rounded-full inline-block border border-vert-porte/30">
                  <span className="text-vert-porte font-semibold text-sm md:text-base">✨ Événements Privés</span>
                </div>
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-terre-cuite mb-6"
                variants={fadeInUp}
              >
                Événements & Privatisation
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl text-foreground/80 mb-8 font-medium"
                variants={fadeInUp}
              >
                Un lieu d'exception pour vos moments uniques
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.p 
                className="text-lg sm:text-xl text-foreground leading-relaxed font-medium"
                variants={fadeInUp}
              >
                Dar Dhiafa Kairouan offre un cadre authentique et raffiné, parfaitement adapté à l'organisation d'événements privés et professionnels. L'ensemble de la maison peut être entièrement privatisé pour une expérience exclusive, ou uniquement l'espace commun selon la nature de votre projet.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Full Privatization Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Image */}
                <motion.div 
                  variants={staggerItem}
                  className="order-2 lg:order-1"
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-logo-gold/20 to-logo-dark/20">
                      <picture>
                        <source srcSet="/galerie/imagegalerie5.webp" type="image/webp" />
                        <img
                          src="/galerie/imagegalerie5.jpg"
                          alt="Espace événementiel Dar Dhiafa - Privatisation complète"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {/* Decorative corner */}
                    <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-logo-gold/70 rounded-tl-xl" />
                  </motion.div>
                </motion.div>

                {/* Right side - Content */}
                <motion.div variants={staggerItem} className="space-y-8 order-1 lg:order-2">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-logo-gold to-logo-dark rounded-xl flex items-center justify-center shadow-medium">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-terre-cuite">
                        Privatisation complète de la maison
                      </h2>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-logo-gold/20">
                    <h3 className="text-xl font-semibold text-indigo-medina mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-logo-gold" />
                      Capacité
                    </h3>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Hébergement : <span className="text-terre-cuite font-semibold">24 à 28 personnes</span>
                    </p>
                  </div>

                  {/* Access */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-logo-gold/20">
                    <h3 className="text-xl font-semibold text-indigo-medina mb-4">
                      Accès réservé
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <div className="w-2 h-2 bg-logo-gold rounded-full" />
                        Toutes les chambres
                      </li>
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <div className="w-2 h-2 bg-logo-gold rounded-full" />
                        Patio central
                      </li>
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <div className="w-2 h-2 bg-logo-gold rounded-full" />
                        Terrasses
                      </li>
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <div className="w-2 h-2 bg-logo-gold rounded-full" />
                        Espaces communs
                      </li>
                    </ul>
                  </div>

                  {/* Service */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-logo-gold/20">
                    <h3 className="text-xl font-semibold text-indigo-medina mb-2">
                      Service personnalisé
                    </h3>
                    <p className="text-foreground font-medium">
                      Accompagnement sur mesure pour votre événement
                    </p>
                  </div>

                  {/* Ideal for */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-logo-gold/20">
                    <h3 className="text-xl font-semibold text-indigo-medina mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-logo-gold" />
                      Idéal pour
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {fullPrivatizationFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                          whileHover={{ scale: 1.02, x: 3 }}
                        >
                          <div className="w-2 h-2 bg-terre-cuite rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                          <span className="text-foreground font-medium text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Common Space Privatization Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <motion.div variants={staggerItem} className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-medina to-terre-cuite rounded-xl flex items-center justify-center shadow-medium">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-terre-cuite">
                        Privatisation de l'espace commun
                      </h2>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border-indigo-medina/20">
                    <h3 className="text-xl font-semibold text-indigo-medina mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-terre-cuite" />
                      Capacité
                    </h3>
                    <p className="text-lg font-medium text-foreground">
                      À partir de <span className="text-terre-cuite font-semibold">10 personnes</span>
                    </p>
                  </div>
                </motion.div>

                {/* Right side - Image */}
                <motion.div 
                  variants={staggerItem}
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-indigo-medina/20 to-terre-cuite/20">
                      <picture>
                        <source srcSet="/galerie/imagegalerie6.webp" type="image/webp" />
                        <img
                          src="/galerie/imagegalerie6.jpg"
                          alt="Espace commun privatisé - Événements Dar Dhiafa"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {/* Decorative corner */}
                    <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-indigo-medina/70 rounded-br-xl" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Events List Below Image */}
              <motion.div 
                variants={staggerItem}
                className="mt-8"
              >
                <Card className="bg-white shadow-lg border-indigo-medina/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-terre-cuite flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-indigo-medina" />
                      Événements accueillis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {commonSpaceEvents.map((event, index) => {
                        const icons = [Utensils, Heart, Briefcase, Briefcase, Utensils, Presentation, Palette];
                        const IconComponent = icons[index] || Calendar;
                        return (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-medina/20 to-terre-cuite/20 rounded-lg flex items-center justify-center group-hover:from-indigo-medina group-hover:to-terre-cuite transition-all duration-300">
                              <IconComponent className="w-5 h-5 text-indigo-medina group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-foreground font-medium flex-1 text-sm">{event}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Weddings Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-logo-gold/5 via-terre-cuite/5 to-indigo-medina/5">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-logo-gold to-terre-cuite rounded-full flex items-center justify-center mx-auto mb-6"
                variants={fadeInUp}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-terre-cuite mb-6"
                variants={fadeInUp}
              >
                Mariages à Dar Dhiafa Kairouan
              </motion.h2>
              <motion.p 
                className="text-lg sm:text-xl text-foreground leading-relaxed font-medium max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                Vous pouvez célébrer un mariage intimiste dans un cadre au charme unique, fait de traditions, de lumière naturelle et d'architecture raffinée.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-logo-gold/20"
            >
              <h3 className="text-2xl font-semibold text-indigo-medina mb-6 text-center">
                L'espace se prête parfaitement :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weddingFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-logo-gold/10 to-terre-cuite/10 hover:from-logo-gold/20 hover:to-terre-cuite/20 transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Camera className="w-6 h-6 text-terre-cuite flex-shrink-0 mt-1" />
                    <span className="text-foreground font-medium text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inspiring Framework Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-terre-cuite mb-6"
                variants={fadeInUp}
              >
                Un cadre inspirant
              </motion.h2>
              <motion.p 
                className="text-lg sm:text-xl text-foreground leading-relaxed font-medium max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                Entre architecture traditionnelle, atmosphère apaisante et cuisine raffinée, Dar Dhiafa crée un environnement propice au partage, à la créativité et à la célébration.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {inspiringFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-logo-gold/20 h-full">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-logo-gold to-logo-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-terre-cuite">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-foreground font-medium">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-medina/10 via-logo-gold/10 to-terre-cuite/10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center bg-white rounded-2xl p-8 md:p-12 shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-logo-gold to-logo-dark rounded-full flex items-center justify-center mx-auto mb-6"
                variants={fadeInUp}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Calendar className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-terre-cuite mb-6"
                variants={fadeInUp}
              >
                Faites-nous part de votre projet à Dar Dhiafa
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-8 font-medium max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Contactez-nous dès aujourd'hui pour discuter de vos besoins et recevoir une proposition personnalisée pour votre événement
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Button
                  size="lg"
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium"
                  onClick={() => navigate('/contact')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver un événement
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white font-semibold px-8 py-4 transition-all duration-300"
                  onClick={() => navigate('/contact')}
                >
                  Demander plus d'informations
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default Events;

