import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Bed,
  User,
  Globe,
  Utensils,
  CheckCircle,
  X
} from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

interface AvailabilityFormData {
  firstName: string;
  lastName: string;
  nationality: string;
  roomType: string;
  numberOfGuests: string;
  message: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  checkIn: string;
  checkOut: string;
  includeMeals: boolean;
}

interface AvailabilityFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvailabilityForm = ({ isOpen, onClose }: AvailabilityFormProps) => {
  const [formData, setFormData] = useState<AvailabilityFormData>({
    firstName: "",
    lastName: "",
    nationality: "",
    roomType: "",
    numberOfGuests: "",
    message: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    checkIn: "",
    checkOut: "",
    includeMeals: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof AvailabilityFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      nationality: "",
      roomType: "",
      numberOfGuests: "",
      message: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      checkIn: "",
      checkOut: "",
      includeMeals: false,
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isSubmitted ? (
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <CardTitle className="text-2xl md:text-3xl font-bold text-terre-cuite mb-2">
                  Vérifier la disponibilité
                </CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire pour vérifier la disponibilité de nos chambres
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Informations personnelles */}
                    <motion.div className="space-y-4" variants={staggerItem}>
                      <h3 className="text-lg font-semibold text-indigo-medina flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Informations personnelles
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nationality">Nationalité *</Label>
                        <Input
                          id="nationality"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange("nationality", e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Ex: Française, Tunisienne..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Adresse e-mail *</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="pl-10"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                            className="pl-10"
                            placeholder="+33 1 23 45 67 89"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                        <div className="relative mt-1">
                          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="whatsapp"
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                            className="pl-10"
                            placeholder="+33 1 23 45 67 89"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="pl-10 min-h-[80px]"
                            placeholder="Votre adresse complète"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Détails de la réservation */}
                    <motion.div className="space-y-4" variants={staggerItem}>
                      <h3 className="text-lg font-semibold text-indigo-medina flex items-center gap-2">
                        <Bed className="w-5 h-5" />
                        Détails de la réservation
                      </h3>

                      <div>
                        <Label htmlFor="roomType">Type de chambre *</Label>
                        <Select value={formData.roomType} onValueChange={(value) => handleInputChange("roomType", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choisissez un type de chambre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DOUBLE">Chambre Double</SelectItem>
                            <SelectItem value="TWIN">Chambre Twin</SelectItem>
                            <SelectItem value="FAMILIALE">Chambre Familiale</SelectItem>
                            <SelectItem value="DOUBLE+L.B">Double + Lit Bébé</SelectItem>
                            <SelectItem value="S.ROYALE">Suite Royale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="numberOfGuests">Nombre de personnes *</Label>
                        <div className="relative mt-1">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Select value={formData.numberOfGuests} onValueChange={(value) => handleInputChange("numberOfGuests", value)}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Nombre de personnes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 personne</SelectItem>
                              <SelectItem value="2">2 personnes</SelectItem>
                              <SelectItem value="3">3 personnes</SelectItem>
                              <SelectItem value="4">4 personnes</SelectItem>
                              <SelectItem value="5">5 personnes</SelectItem>
                              <SelectItem value="6+">6+ personnes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkIn">Date d'arrivée *</Label>
                          <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="checkIn"
                              type="date"
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange("checkIn", e.target.value)}
                              required
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="checkOut">Date de départ *</Label>
                          <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="checkOut"
                              type="date"
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange("checkOut", e.target.value)}
                              required
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeMeals"
                          checked={formData.includeMeals}
                          onCheckedChange={(checked) => handleInputChange("includeMeals", checked as boolean)}
                        />
                        <Label htmlFor="includeMeals" className="flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          Inclure les repas
                        </Label>
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="mt-1 min-h-[100px]"
                          placeholder="Demandes spéciales, questions ou commentaires..."
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div className="pt-6" variants={fadeInUp}>
                    <Button
                      type="submit"
                      className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white py-3 text-lg font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </div>
                      ) : (
                        "Vérifier la disponibilité"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              className="p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-terre-cuite mb-2">
                    Merci pour votre demande !
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Nous avons bien reçu votre demande de réservation.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Un message de confirmation vous sera envoyé dans les plus brefs délais à l'adresse e-mail fournie.
                  </p>
                </div>

                <Button
                  onClick={handleClose}
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white px-8 py-2"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvailabilityForm;
