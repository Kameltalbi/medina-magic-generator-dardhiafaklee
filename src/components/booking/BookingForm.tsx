// Booking form - Search form with validation and context integration
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slideInLeft } from "@/lib/animations";
import { useTranslation } from "react-i18next";
import { useBooking } from "@/contexts/BookingContext";
import { validateBookingRequest, getMinCheckoutDate, type ValidationError } from "@/lib/validation";
import type { BookingRequest } from "@/lib/types";

interface BookingFormProps {
  onSearch?: (data: BookingRequest) => void;
  showValidation?: boolean;
}

const BookingForm = ({ onSearch, showValidation = true }: BookingFormProps) => {
  const { t } = useTranslation();
  const { setBookingDates, bookingDates } = useBooking();
  
  const [bookingData, setBookingData] = useState<BookingRequest>(() => {
    // Try to get data from context first, then from localStorage
    if (bookingDates) {
      return bookingDates;
    }
    
    // Check localStorage for quick booking data
    const quickBookingData = localStorage.getItem('quickBookingData');
    if (quickBookingData) {
      try {
        const parsed = JSON.parse(quickBookingData);
        // Clear localStorage after reading
        localStorage.removeItem('quickBookingData');
        return parsed;
      } catch (error) {
        console.error('Error parsing quick booking data:', error);
      }
    }
    
    return {
      checkIn: "",
      checkOut: "",
      guests: 2,
    };
  });
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update form when context changes
  useEffect(() => {
    if (bookingDates) {
      setBookingData(bookingDates);
    }
  }, [bookingDates]);

  const handleInputChange = (field: keyof BookingRequest, value: string | number) => {
    const newData = { ...bookingData, [field]: value };
    setBookingData(newData);
    
    // Clear error for this field when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }

    // Auto-update checkout minimum date when checkin changes
    if (field === 'checkIn' && typeof value === 'string' && value) {
      const minCheckout = getMinCheckoutDate(value);
      if (newData.checkOut && newData.checkOut <= value) {
        setBookingData(prev => ({ ...prev, checkOut: minCheckout }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form if validation is enabled
    if (showValidation) {
      const validation = validateBookingRequest(bookingData);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsLoading(false);
        return;
      }
    }
    
    // Update context
    setBookingDates(bookingData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSearch?.(bookingData);
    setIsLoading(false);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <section className="relative -mt-8 z-20 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <div className="gradient-card rounded-2xl shadow-strong p-6 md:p-8 border border-border/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-bold text-indigo-medina mb-2 px-4">
                  {t("booking.form.title")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-medium px-4">
                  {t("booking.form.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                {/* Check-in Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="text-indigo-medina font-medium font-medium">
                    {t("booking.form.checkIn")} *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkin"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`pl-10 font-medium border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                        getFieldError('checkIn') ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {getFieldError('checkIn') && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="font-medium">{getFieldError('checkIn')}</span>
                    </div>
                  )}
                </div>

                {/* Check-out Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="text-indigo-medina font-medium font-medium">
                    {t("booking.form.checkOut")} *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkout"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={bookingData.checkIn ? getMinCheckoutDate(bookingData.checkIn) : new Date().toISOString().split('T')[0]}
                      className={`pl-10 font-medium border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                        getFieldError('checkOut') ? 'border-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {getFieldError('checkOut') && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="font-medium">{getFieldError('checkOut')}</span>
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-indigo-medina font-medium font-medium">
                    {t("booking.form.guests")} *
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <select
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                      className={`w-full pl-10 pr-4 py-2 border border-border rounded-md font-medium focus:ring-indigo-medina focus:border-indigo-medina bg-background ${
                        getFieldError('guests') ? 'border-red-500' : ''
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? t("booking.form.guest") : t("booking.form.guests")}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getFieldError('guests') && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="font-medium">{getFieldError('guests')}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-indigo-medina hover:bg-indigo-medina/90 text-primary-foreground font-medium font-semibold px-6 py-3 transition-all duration-300 shadow-soft hover:shadow-medium h-[42px]"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      {t("booking.form.checkAvailability")}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;