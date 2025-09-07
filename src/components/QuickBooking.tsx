// QuickBooking component - Floating booking form card
// Uses card colors and indigo-medina for CTA from design system

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slideInLeft } from "@/lib/animations";
import type { BookingRequest } from "@/lib/types";

const QuickBooking = () => {
  const [bookingData, setBookingData] = useState<BookingRequest>({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking logic
    console.log("Booking request:", bookingData);
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
          <div className="gradient-card rounded-2xl shadow-strong p-6 md:p-8 border border-border/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-2">
                  الحجز السريع
                </h2>
                <p className="text-muted-foreground font-inter">
                  تحقق من التوفر لإقامتك
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Check-in Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="text-indigo-medina font-inter font-medium">
                    تاريخ الوصول
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkin"
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, checkIn: e.target.value })
                      }
                      className="pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                    />
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="text-indigo-medina font-inter font-medium">
                    تاريخ المغادرة
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="checkout"
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, checkOut: e.target.value })
                      }
                      className="pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina"
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-indigo-medina font-inter font-medium">
                    الضيوف
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <select
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, guests: parseInt(e.target.value) })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md font-inter focus:ring-indigo-medina focus:border-indigo-medina bg-background"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "ضيف" : "ضيوف"}
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
                  تحقق من التوفر
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