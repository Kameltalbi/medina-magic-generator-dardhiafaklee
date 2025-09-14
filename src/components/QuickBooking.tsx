// QuickBooking component - Floating booking form card
// Uses card colors and indigo-medina for CTA from design system

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { slideInLeft } from "@/lib/animations";
import { validateBookingRequest } from "@/lib/validation";
import type { BookingRequest } from "@/lib/types";

const QuickBooking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState<BookingRequest>({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof BookingRequest, value: string | number) => {
    const newData = { ...bookingData, [field]: value };
    setBookingData(newData);
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('QuickBooking form submitted with data:', bookingData);
    
    // Validate the form
    const validation = validateBookingRequest(bookingData);
    
    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors);
      setErrors(validation.errors.map(error => error.message));
      return;
    }
    
    // Clear errors
    setErrors([]);
    
    // Store booking data in localStorage for the booking page
    localStorage.setItem('quickBookingData', JSON.stringify(bookingData));
    console.log('Data stored in localStorage, navigating to booking page');
    
    // Navigate to booking page
    navigate('/booking');
  };

  return (
    <section className="relative -mt-32 z-20 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-2">
                  {t("booking.title")}
                </h2>
                <p className="text-muted-foreground font-inter">
                  {t("booking.checkAvailability")}
                </p>
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-800 font-inter text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Check-in Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="text-indigo-medina font-inter font-medium">
                    {t("booking.checkin")}
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkin"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                    />
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="text-indigo-medina font-inter font-medium">
                    {t("booking.checkout")}
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkout"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      className="pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-indigo-medina font-inter font-medium">
                    {t("booking.guests")}
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <select
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md font-inter focus:ring-indigo-medina focus:border-indigo-medina bg-background"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? t("booking.guest") : t("booking.guests_plural")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-indigo-medina hover:bg-indigo-medina/90 text-primary-foreground font-inter font-semibold px-6 py-3 transition-all duration-300 shadow-soft hover:shadow-medium h-[42px]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {t("booking.checkAvailability")}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickBooking;