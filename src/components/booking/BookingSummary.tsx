"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, CreditCard, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, slideInRight } from "@/lib/animations";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

interface BookingSummaryProps {
  selectedRoom?: {
    id: string;
    title: string;
    pricePerNight: string;
  };
  bookingDates?: {
    checkIn: string;
    checkOut: string;
    guests: number;
  };
}

const BookingSummary = ({ selectedRoom, bookingDates }: BookingSummaryProps) => {
  const [paymentStep, setPaymentStep] = useState<'summary' | 'payment' | 'success' | 'error'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  // Mock booking data if not provided
  const defaultRoom = {
    id: "1",
    title: "Chambre Traditionnelle Klee",
    pricePerNight: formatPrice(400) // 400 TND
  };

  const defaultDates = {
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    guests: 2
  };

  const room = selectedRoom || defaultRoom;
  const dates = bookingDates || defaultDates;

  // Calculate nights and total
  const calculateNights = () => {
    const checkIn = new Date(dates.checkIn);
    const checkOut = new Date(dates.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  // Prix de base en TND (400 TND pour la chambre traditionnelle)
  const basePricePerNight = 400;
  const subtotal = nights * basePricePerNight;
  const taxes = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + taxes;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep('payment');
    
    // Simulate Konnect API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate success/failure (80% success rate)
    const success = Math.random() > 0.2;
    setPaymentStep(success ? 'success' : 'error');
    setIsProcessing(false);
  };

  const resetBooking = () => {
    setPaymentStep('summary');
    setIsProcessing(false);
  };

  if (paymentStep === 'success') {
    return (
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-vert-porte text-white rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-8 h-8" />
              </motion.div>
              
              <h2 className="text-3xl font-playfair font-bold text-indigo-medina mb-4">
                Réservation confirmée !
              </h2>
              
              <p className="text-muted-foreground font-inter mb-6">
                Votre séjour à Dar Dhiafa Klee est confirmé. Vous recevrez un email de confirmation sous peu.
              </p>
              
              <div className="bg-background/50 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-playfair font-bold text-indigo-medina mb-3">Détails de votre réservation</h3>
                <div className="space-y-2 text-sm font-inter text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Référence :</span>
                    <span className="font-semibold text-indigo-medina">DH-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chambre :</span>
                    <span>{room.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total payé :</span>
                    <span className="font-semibold text-terre-cuite">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => navigate('/')}
                className="bg-indigo-medina hover:bg-indigo-medina/90 text-white font-inter"
              >
                Retour à l'accueil
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (paymentStep === 'error') {
    return (
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <X className="w-8 h-8" />
              </motion.div>
              
              <h2 className="text-3xl font-playfair font-bold text-indigo-medina mb-4">
                Erreur de paiement
              </h2>
              
              <p className="text-muted-foreground font-inter mb-6">
                Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetBooking}
                  variant="outline"
                  className="border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white"
                >
                  Réessayer
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-indigo-medina hover:bg-indigo-medina/90 text-white font-inter"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (paymentStep === 'payment') {
    return (
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-medina border-t-transparent rounded-full mx-auto mb-6"
              />
              
              <h2 className="text-3xl font-playfair font-bold text-indigo-medina mb-4">
                Traitement du paiement...
              </h2>
              
              <p className="text-muted-foreground font-inter">
                Veuillez patienter pendant que nous traitons votre paiement via Konnect.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Booking Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-strong">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-6">
                Récapitulatif de votre séjour
              </h2>

              {/* Dates */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-indigo-medina mt-1" />
                  <div className="font-inter">
                    <div className="font-semibold text-indigo-medina">Dates</div>
                    <div className="text-sm text-muted-foreground">
                      Du {formatDate(dates.checkIn)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Au {formatDate(dates.checkOut)}
                    </div>
                    <div className="text-sm font-semibold text-terre-cuite mt-1">
                      {nights} {nights === 1 ? 'nuit' : 'nuits'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-indigo-medina" />
                  <div className="font-inter">
                    <div className="font-semibold text-indigo-medina">Hôtes</div>
                    <div className="text-sm text-muted-foreground">
                      {dates.guests} {dates.guests === 1 ? 'personne' : 'personnes'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-medina mt-1" />
                  <div className="font-inter">
                    <div className="font-semibold text-indigo-medina">Chambre</div>
                    <div className="text-sm text-muted-foreground">{room.title}</div>
                    <div className="text-sm text-terre-cuite font-semibold">
                      {formatPrice(basePricePerNight)} / nuit
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border pt-6">
                <h3 className="font-playfair font-bold text-indigo-medina mb-4">Détail des prix</h3>
                <div className="space-y-2 font-inter text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {formatPrice(basePricePerNight)} × {nights} {nights === 1 ? 'nuit' : 'nuits'}
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes et frais</span>
                    <span>{formatPrice(taxes)}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-4">
                    <div className="flex justify-between text-lg font-bold text-indigo-medina">
                      <span>Total</span>
                      <span className="text-terre-cuite">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
          >
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-strong">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-6">
                Finaliser la réservation
              </h2>

              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3 className="font-inter font-semibold text-indigo-medina mb-3">
                    Méthode de paiement
                  </h3>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg bg-background/50">
                    <CreditCard className="w-6 h-6 text-terre-cuite" />
                    <div className="font-inter">
                      <div className="font-semibold text-indigo-medina">Konnect Payment</div>
                      <div className="text-sm text-muted-foreground">
                        Paiement sécurisé par carte bancaire
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-muted-foreground font-inter leading-relaxed">
                  En procédant au paiement, vous acceptez nos{" "}
                  <a href="#" className="text-terre-cuite hover:underline">
                    conditions générales
                  </a>{" "}
                  et notre{" "}
                  <a href="#" className="text-terre-cuite hover:underline">
                    politique de confidentialité
                  </a>
                  . Le paiement sera traité de manière sécurisée via Konnect.
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  size="lg"
                  className="w-full bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold py-4 text-lg transition-all duration-300 shadow-soft hover:shadow-medium"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                  ) : (
                    <CreditCard className="w-5 h-5 mr-3" />
                  )}
                  Payer {formatPrice(total)} avec Konnect
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSummary;