// PrivatizationSection component - Showcase of hotel and common space privatization options
// Uses the same design patterns as other sections with brand colors

import { motion } from "framer-motion";
import { Users, Building2, Utensils, Briefcase, Presentation, ArrowRight, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { useNavigate } from "react-router-dom";

const PrivatizationSection = () => {
  const navigate = useNavigate();

  const privatizationOptions = [
    {
      id: "full-hotel",
      title: "Privatisation complète de l'hôtel",
      capacity: "24 à 28 personnes",
      description: "Profitez d'une expérience exclusive en privatisant l'ensemble de Dar Dhiafa Paul Klee pour votre groupe.",
      icon: Building2,
      features: [
        "Accès à toutes les chambres",
        "Espaces communs privatisés",
        "Service personnalisé",
        "Cuisine sur mesure"
      ],
      color: "from-logo-gold to-logo-dark"
    },
    {
      id: "common-space",
      title: "Privatisation de l'espace commun",
      capacity: "À partir de 10 personnes",
      description: "Idéal pour vos événements d'entreprise ou privés dans un cadre authentique et chaleureux.",
      icon: Users,
      features: [
        "Espace commun exclusif",
        "Service traiteur disponible",
        "Équipements audiovisuels",
        "Personnalisation complète"
      ],
      color: "from-indigo-medina to-terre-cuite"
    }
  ];

  const eventTypes = [
    {
      id: "receptions",
      title: "Réceptions",
      description: "Célébrez vos événements spéciaux dans un cadre unique",
      icon: Utensils,
      color: "text-logo-gold"
    },
    {
      id: "team-building",
      title: "Team Building",
      description: "Renforcez la cohésion de votre équipe dans un environnement inspirant",
      icon: Briefcase,
      color: "text-indigo-medina"
    },
    {
      id: "table-hote",
      title: "Tables d'hôtes",
      description: "Partagez un moment convivial autour d'une table d'hôtes authentique",
      icon: Users,
      color: "text-terre-cuite"
    },
    {
      id: "product-presentation",
      title: "Présentations de produits",
      description: "Mettez en valeur vos produits dans un cadre prestigieux",
      icon: Presentation,
      color: "text-vert-porte"
    }
  ];

  return (
    <section id="privatization" className="relative py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-logo-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-terre-cuite rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Section Header - Enhanced */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block mb-4"
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-r from-vert-porte/20 to-vert-porte/30 px-6 py-2 rounded-full inline-block border border-vert-porte/30">
                <span className="text-vert-porte font-semibold text-sm md:text-base">✨ Événements Privés</span>
              </div>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bold text-terre-cuite mb-4 sm:mb-6 px-4"
              variants={fadeInUp}
            >
              Privatisation & Événements
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              Organisez vos événements dans un cadre d'exception au cœur de la médina de Kairouan
            </motion.p>
          </div>

          {/* Privatization Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {privatizationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.id}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-logo-gold/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center shadow-medium`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="bg-terre-cuite/10 text-terre-cuite px-4 py-2 rounded-full font-semibold text-sm">
                          {option.capacity}
                        </div>
                      </div>
                      <CardTitle className="text-terre-cuite text-2xl font-bold mb-2">
                        {option.title}
                      </CardTitle>
                      <p className="text-foreground/70 font-medium leading-relaxed">
                        {option.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-logo-gold rounded-full flex-shrink-0" />
                            <span className="text-foreground font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold"
                        onClick={() => navigate('/evenements')}
                      >
                        En savoir plus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Event Types */}
          <motion.div
            variants={staggerItem}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-bold text-terre-cuite mb-8 text-center">
              Types d'événements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventTypes.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <motion.div
                    key={event.id}
                    className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-logo-gold group-hover:to-logo-dark transition-all duration-300`}>
                      <IconComponent className={`w-6 h-6 ${event.color} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <h4 className="font-bold font-semibold text-indigo-medina mb-2 group-hover:text-terre-cuite transition-colors duration-300">
                      {event.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center bg-gradient-to-r from-indigo-medina/10 via-logo-gold/10 to-terre-cuite/10 rounded-2xl p-8 md:p-12"
            variants={staggerItem}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-logo-gold to-logo-dark rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold font-bold text-terre-cuite mb-4">
              Prêt à organiser votre événement ?
            </h3>
            <p className="text-muted-foreground font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et recevoir une proposition personnalisée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold px-8 py-4 transition-all duration-300 shadow-soft hover:shadow-medium"
                onClick={() => navigate('/contact')}
              >
                <FileText className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white font-semibold px-8 py-4 transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                Nous contacter
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivatizationSection;

