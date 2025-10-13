// QuickBooking component - Simple booking button
// Uses card colors and indigo-medina for CTA from design system

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { slideInLeft } from "@/lib/animations";

const QuickBooking = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative -mt-32 z-20 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-medina mb-4">
                {t("booking.title")}
              </h2>
              <p className="text-muted-foreground font-medium mb-8">
                {t("booking.checkAvailability")}
              </p>
            </div>

            <Button
              onClick={() => navigate('/booking')}
              size="lg"
              className="bg-indigo-medina hover:bg-indigo-medina/90 text-primary-foreground font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-soft hover:shadow-medium hover:scale-105"
            >
              Réserver maintenant
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickBooking;