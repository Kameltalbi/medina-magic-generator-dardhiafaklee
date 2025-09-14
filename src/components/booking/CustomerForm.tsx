// Customer form component for booking process
// Collects customer information with validation

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { validateCustomerInfo, type ValidationError } from "@/lib/validation";
import type { CustomerInfo } from "@/lib/types";
import { fadeInUp } from "@/lib/animations";

interface CustomerFormProps {
  onNext: (customerInfo: CustomerInfo) => void;
  onBack: () => void;
  initialData?: CustomerInfo;
}

const CustomerForm = ({ onNext, onBack, initialData }: CustomerFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    specialRequests: initialData?.specialRequests || "",
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const validation = validateCustomerInfo(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onNext(formData);
    setIsSubmitting(false);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="max-w-2xl mx-auto"
    >
      <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-strong">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-indigo-medina mb-2">
            {t("booking.customer.title")}
          </h2>
          <p className="text-muted-foreground font-inter">
            {t("booking.customer.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-indigo-medina font-inter font-medium">
                {t("booking.customer.firstName")} *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                    getFieldError('firstName') ? 'border-red-500' : ''
                  }`}
                  placeholder={t("booking.customer.firstNamePlaceholder")}
                />
              </div>
              {getFieldError('firstName') && (
                <p className="text-red-500 text-sm font-inter">{getFieldError('firstName')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-indigo-medina font-inter font-medium">
                {t("booking.customer.lastName")} *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                    getFieldError('lastName') ? 'border-red-500' : ''
                  }`}
                  placeholder={t("booking.customer.lastNamePlaceholder")}
                />
              </div>
              {getFieldError('lastName') && (
                <p className="text-red-500 text-sm font-inter">{getFieldError('lastName')}</p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-indigo-medina font-inter font-medium">
                {t("booking.customer.email")} *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                    getFieldError('email') ? 'border-red-500' : ''
                  }`}
                  placeholder={t("booking.customer.emailPlaceholder")}
                />
              </div>
              {getFieldError('email') && (
                <p className="text-red-500 text-sm font-inter">{getFieldError('email')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-indigo-medina font-inter font-medium">
                {t("booking.customer.phone")} *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina ${
                    getFieldError('phone') ? 'border-red-500' : ''
                  }`}
                  placeholder={t("booking.customer.phonePlaceholder")}
                />
              </div>
              {getFieldError('phone') && (
                <p className="text-red-500 text-sm font-inter">{getFieldError('phone')}</p>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-indigo-medina font-inter font-medium">
              {t("booking.customer.specialRequests")}
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="pl-10 font-inter border-border focus:ring-indigo-medina focus:border-indigo-medina min-h-[100px]"
                placeholder={t("booking.customer.specialRequestsPlaceholder")}
              />
            </div>
            <p className="text-xs text-muted-foreground font-inter">
              {t("booking.customer.specialRequestsHelp")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 border-indigo-medina text-indigo-medina hover:bg-indigo-medina hover:text-white font-inter font-semibold transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("booking.customer.back")}
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? t("booking.customer.processing") : t("booking.customer.continue")}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CustomerForm;
