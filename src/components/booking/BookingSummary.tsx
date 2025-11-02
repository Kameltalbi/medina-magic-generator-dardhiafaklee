"use client";

import { motion } from "framer-motion";
import { Calendar, Users, MapPin } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
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


  return (
    <section className="py-16 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Booking Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-strong">
              <h2 className="text-2xl md:text-3xl font-bold font-bold text-indigo-medina mb-6">
                Récapitulatif de votre séjour
              </h2>

              {/* Dates */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-indigo-medina mt-1" />
                  <div className="font-medium">
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
                  <div className="font-medium">
                    <div className="font-semibold text-indigo-medina">Hôtes</div>
                    <div className="text-sm text-muted-foreground">
                      {dates.guests} {dates.guests === 1 ? 'personne' : 'personnes'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-medina mt-1" />
                  <div className="font-medium">
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
                <h3 className="font-bold font-bold text-indigo-medina mb-4">Détail des prix</h3>
                <div className="space-y-2 font-medium text-sm">
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

        </div>
      </div>
    </section>
  );
};

export default BookingSummary;