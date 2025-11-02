// Contact page - Contact information and form
// Features contact details, location, and contact form

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Médina de Kairouan, Tunisie",
      description: "Au cœur de la médina historique classée UNESCO"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+216 XX XXX XXX",
      description: "Disponible 24h/24"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@dardhiafaklee.com",
      description: "Réponse sous 24h"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Réception 24h/24",
      description: "Service disponible en permanence"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-logo-gold/10 to-logo-dark/10">
          <div className="container mx-auto">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-terre-cuite mb-6"
                variants={staggerItem}
              >
                Contactez-nous
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-foreground/80 mb-8"
                variants={staggerItem}
              >
                Nous sommes là pour vous accompagner dans votre séjour à Dar Dhiafa Paul Klee
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-logo-gold/20">
                      <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-logo-gold to-logo-dark rounded-full flex items-center justify-center mx-auto mb-4">
                          <info.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-terre-cuite text-lg font-semibold">
                          {info.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-foreground font-medium mb-2">
                          {info.content}
                        </p>
                        <p className="text-foreground/70 text-sm">
                          {info.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Form and Map */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div variants={staggerItem}>
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-terre-cuite text-2xl font-bold">
                        Envoyez-nous un message
                      </CardTitle>
                      <p className="text-foreground/70">
                        Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Prénom
                            </label>
                            <Input 
                              placeholder="Votre prénom"
                              className="border-logo-gold/30 focus:border-logo-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Nom
                            </label>
                            <Input 
                              placeholder="Votre nom"
                              className="border-logo-gold/30 focus:border-logo-gold"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email
                          </label>
                          <Input 
                            type="email"
                            placeholder="votre@email.com"
                            className="border-logo-gold/30 focus:border-logo-gold"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Téléphone
                          </label>
                          <Input 
                            placeholder="+216 XX XXX XXX"
                            className="border-logo-gold/30 focus:border-logo-gold"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Message
                          </label>
                          <Textarea 
                            placeholder="Décrivez votre demande ou vos questions..."
                            className="min-h-[120px] border-logo-gold/30 focus:border-logo-gold"
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white font-semibold py-3"
                          size="lg"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer le message
                        </Button>
                      </form>
                      
                      {/* WhatsApp Button */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Button
                          onClick={() => window.open(`https://wa.me/21698306481?text=${encodeURIComponent("Bonjour, je souhaite avoir plus d'informations sur Dar Dhiafa Paul Klee.")}`, '_blank', 'noopener,noreferrer')}
                          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3"
                          size="lg"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Nous contacter sur WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Map Placeholder */}
                <motion.div variants={staggerItem}>
                  <Card className="bg-white shadow-lg h-full">
                    <CardHeader>
                      <CardTitle className="text-terre-cuite text-2xl font-bold">
                        Notre localisation
                      </CardTitle>
                      <p className="text-foreground/70">
                        Dar Dhiafa Paul Klee se trouve au cœur de la médina historique de Kairouan
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[4/3] bg-gradient-to-br from-logo-gold/20 to-logo-dark/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-16 h-16 text-logo-gold mx-auto mb-4" />
                          <p className="text-foreground font-medium">
                            Médina de Kairouan
                          </p>
                          <p className="text-foreground/70 text-sm">
                            Tunisie
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default Contact;
