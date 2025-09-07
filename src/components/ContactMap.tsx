// ContactMap component - Contact form and Google Maps integration
// Uses slideInLeft and slideInRight animations with brand colors

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from "@/lib/animations";
import type { ContactForm } from "@/lib/types";

const ContactMap = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement form submission logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    console.log("Contact form submitted:", formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Médina de Kairouan", "3100 Kairouan, Tunisie"],
      color: "text-terre-cuite",
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+216 77 123 456", "+216 20 987 654"],
      color: "text-vert-porte",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@dardhiafaklee.tn", "reservation@dardhiafaklee.tn"],
      color: "text-indigo-medina",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["24h/24 - 7j/7", "Accueil disponible"],
      color: "text-terre-cuite",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-playfair font-bold text-indigo-medina mb-6"
              variants={staggerItem}
            >
              Contact & <span className="text-vert-porte">Localisation</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed"
              variants={staggerItem}
            >
              Nous sommes là pour vous accompagner dans l'organisation de votre séjour. 
              N'hésitez pas à nous contacter pour toute question ou demande spéciale.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-card rounded-2xl p-8 shadow-medium"
              variants={slideInLeft}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-indigo-medina">
                  Envoyez-nous un message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-indigo-medina font-inter font-medium">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-indigo-medina font-inter font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-indigo-medina font-inter font-medium">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-indigo-medina font-inter font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina min-h-[120px] resize-none"
                    required
                    placeholder="Décrivez votre demande, vos dates de séjour, le nombre de personnes..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white font-inter font-semibold py-3 transition-all duration-300 shadow-soft hover:shadow-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Envoyer le message</span>
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map and Contact Info */}
            <motion.div
              className="space-y-8"
              variants={slideInRight}
            >
              {/* Google Maps */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-medium">
                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-medina/10 to-vert-porte/10 relative">
                  {/* Placeholder for Google Maps */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-medina to-vert-porte">
                    <div className="text-center text-white space-y-4">
                      <MapPin className="w-16 h-16 mx-auto opacity-80" />
                      <div>
                        <h4 className="font-playfair font-bold text-xl mb-2">
                          Médina de Kairouan
                        </h4>
                        <p className="font-inter text-sm opacity-90 max-w-xs mx-auto">
                          Carte interactive disponible bientôt
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Future Google Maps integration */}
                  {/* 
                  <iframe
                    src="https://www.google.com/maps/embed?pb=..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation Dar Dhiafa Klee"
                  />
                  */}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-playfair font-semibold text-indigo-medina mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-sm text-muted-foreground font-inter leading-relaxed"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;