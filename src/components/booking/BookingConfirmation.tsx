import { motion } from "framer-motion";
import { CheckCircle, Calendar, MapPin, Users, CreditCard, Mail, Phone, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "react-i18next";

interface BookingConfirmationProps {
  bookingId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  room: {
    title: string;
    pricePerNight: number;
  };
  dates: {
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  total: number;
  onNewBooking: () => void;
}

const BookingConfirmation = ({ 
  bookingId, 
  customerInfo, 
  room, 
  dates, 
  total, 
  onNewBooking 
}: BookingConfirmationProps) => {
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(dates.checkIn);
    const checkOut = new Date(dates.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const handleDownloadConfirmation = () => {
    // Créer un PDF de confirmation (simulation)
    const confirmationData = {
      bookingId,
      customer: customerInfo,
      room: room.title,
      checkIn: formatDate(dates.checkIn),
      checkOut: formatDate(dates.checkOut),
      nights,
      total: formatPrice(total)
    };
    
    // Simulation de téléchargement
    const blob = new Blob([JSON.stringify(confirmationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confirmation-${bookingId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Confirmation de réservation - Dar Dhiafa Klee',
        text: `Réservation confirmée ${bookingId} pour ${room.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(`Réservation ${bookingId} - Dar Dhiafa Klee`);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sable to-card py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header de confirmation */}
        <motion.div className="text-center mb-12" variants={staggerItem}>
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            variants={fadeInUp}
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-4xl font-bold font-bold text-indigo-medina mb-4"
            variants={fadeInUp}
          >
            Demande de réservation enregistrée !
          </motion.h1>
          
          <motion.p
            className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto mb-6"
            variants={fadeInUp}
          >
            Votre demande de réservation a été enregistrée avec succès.
          </motion.p>
          
          {/* Message informatif */}
          <motion.div
            className="max-w-2xl mx-auto bg-gradient-to-r from-terre-cuite/10 to-indigo-medina/10 rounded-xl p-6 border border-terre-cuite/20"
            variants={fadeInUp}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-terre-cuite" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold font-semibold text-terre-cuite mb-2">
                  Confirmation à venir
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-3">
                  Dar Dhiafa vous contactera par <strong>email</strong> ou <strong>WhatsApp</strong> pour confirmer votre réservation.
                </p>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  <strong>Important :</strong> Si la chambre que vous avez choisie n'est pas disponible, nous vous informerons des alternatives et vous proposerons d'autres options. Dans tous les cas, vous recevrez un message de notre part.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Détails de la réservation */}
          <motion.div className="lg:col-span-2" variants={staggerItem}>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-indigo-medina" />
                  <span>Détails de la réservation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Numéro de réservation */}
                <div className="bg-indigo-medina/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Numéro de réservation</p>
                      <p className="text-xl font-bold font-bold text-indigo-medina">{bookingId}</p>
                    </div>
                    <Badge className="bg-terre-cuite/20 text-terre-cuite font-medium">
                      En attente de confirmation
                    </Badge>
                  </div>
                </div>

                {/* Informations de la chambre */}
                <div className="space-y-4">
                  <h3 className="font-bold font-semibold text-indigo-medina text-lg">Chambre réservée</h3>
                  <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border">
                    <div className="w-16 h-16 bg-indigo-medina/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-indigo-medina" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium font-semibold text-indigo-medina">{room.title}</h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {formatPrice(room.pricePerNight)} par nuit
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dates et invités */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium font-semibold text-indigo-medina">Arrivée</h4>
                    <p className="font-medium">{formatDate(dates.checkIn)}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium font-semibold text-indigo-medina">Départ</h4>
                    <p className="font-medium">{formatDate(dates.checkOut)}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium font-semibold text-indigo-medina">Durée du séjour</h4>
                    <p className="font-medium">{nights} {nights === 1 ? 'nuit' : 'nuits'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium font-semibold text-indigo-medina">Nombre d'invités</h4>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{dates.guests} {dates.guests === 1 ? 'personne' : 'personnes'}</span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium font-semibold text-indigo-medina">Total payé</span>
                    <span className="text-2xl font-bold font-bold text-terre-cuite">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions et informations */}
          <motion.div className="space-y-6" variants={staggerItem}>
            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDownloadConfirmation}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger la confirmation
                </Button>
                
                <Button
                  onClick={handleShareBooking}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager la réservation
                </Button>
                
                <Button
                  onClick={onNewBooking}
                  className="w-full bg-terre-cuite hover:bg-terre-cuite-hover"
                >
                  Nouvelle réservation
                </Button>
              </CardContent>
            </Card>

            {/* Informations importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-indigo-medina mt-0.5" />
                  <div>
                    <p className="font-semibold text-indigo-medina">Email de confirmation</p>
                    <p className="text-muted-foreground">
                      Envoyé à {customerInfo.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-indigo-medina mt-0.5" />
                  <div>
                    <p className="font-semibold text-indigo-medina">Support client</p>
                    <p className="text-muted-foreground">
                      +216 XX XXX XXX
                    </p>
                  </div>
                </div>
                
                <div className="bg-terre-cuite/10 p-3 rounded-lg border border-terre-cuite/20">
                  <p className="text-terre-cuite font-semibold mb-2">Prochaines étapes :</p>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm font-medium">
                    <li>• Confirmation par email ou WhatsApp</li>
                    <li>• Contact 24h avant arrivée</li>
                    <li>• Check-in à partir de 15h</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
