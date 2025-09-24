// Complete booking flow component
// Handles the entire booking process from search to confirmation

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import RoomAvailability from "./RoomAvailability";
import CustomerForm from "./CustomerForm";
import BookingSummary from "./BookingSummary";
import { fadeInUp } from "@/lib/animations";
import type { BookingDetails, CustomerInfo } from "@/lib/types";

type BookingStep = 'search' | 'rooms' | 'customer' | 'summary' | 'payment' | 'success' | 'error';

const BookingFlow = () => {
  const { t } = useTranslation();
  const { 
    selectedRoom, 
    bookingDates, 
    customerInfo, 
    createBooking, 
    processPayment,
    selectRoom,
    isBooking,
    isProcessingPayment 
  } = useBooking();
  
  const [currentStep, setCurrentStep] = useState<BookingStep>('search');
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Calculate booking details
  const calculateBookingDetails = (): BookingDetails | null => {
    if (!selectedRoom || !bookingDates || !customerInfo) return null;

    const checkIn = new Date(bookingDates.checkIn);
    const checkOut = new Date(bookingDates.checkOut);
    const totalNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const subtotal = selectedRoom.pricePerNight * totalNights;
    const taxes = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + taxes;

    return {
      id: `DH-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      room: selectedRoom,
      checkIn: bookingDates.checkIn,
      checkOut: bookingDates.checkOut,
      guests: bookingDates.guests,
      totalNights,
      subtotal,
      taxes,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      customerInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  // Step handlers
  const handleSearch = (searchData?: any) => {
    console.log('handleSearch called with:', searchData);
    console.log('Current bookingDates:', bookingDates);
    console.log('Current step:', currentStep);
    
    // Si on a des données de recherche, passer directement à l'étape suivante
    if (searchData || bookingDates) {
      console.log('Moving to rooms step');
      setCurrentStep('rooms');
    } else {
      console.log('No data available, staying on search step');
    }
  };

  const handleRoomSelected = () => {
    if (selectedRoom) {
      setCurrentStep('customer');
    }
  };

  const handleCustomerInfo = (customer: CustomerInfo) => {
    setCurrentStep('summary');
  };

  const handleBookingConfirmation = async () => {
    const bookingDetails = calculateBookingDetails();
    if (!bookingDetails) return;

    const success = await createBooking(bookingDetails);
    if (success) {
      setBookingId(bookingDetails.id);
      setCurrentStep('payment');
    } else {
      setCurrentStep('error');
    }
  };

  const handlePayment = async () => {
    const bookingDetails = calculateBookingDetails();
    if (!bookingDetails) return;

    const success = await processPayment({
      method: 'konnect',
      amount: bookingDetails.total,
      currency: 'TND',
      status: 'pending'
    });

    if (success) {
      setCurrentStep('success');
    } else {
      setCurrentStep('error');
    }
  };

  const resetBooking = () => {
    setCurrentStep('search');
    setBookingId(null);
  };

  // Render current step
  const renderCurrentStep = () => {
    console.log('Rendering step:', currentStep);
    switch (currentStep) {
      case 'search':
        return (
          <BookingForm 
            onSearch={handleSearch}
            showValidation={true}
          />
        );

      case 'rooms':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-8"
          >
            <RoomAvailability 
              checkIn={bookingDates?.checkIn || ''}
              checkOut={bookingDates?.checkOut || ''}
              onRoomSelect={(room) => {
                // Convertir RoomAvailability en Room pour le contexte
                const selectedRoom = {
                  id: room.roomId,
                  title: room.title,
                  pricePerNight: room.pricePerNight,
                  image: room.image || "/chambre 1.png",
                  description: `Chambre ${room.roomNumber}`,
                  amenities: [],
                  size: "25m²",
                  capacity: room.capacity || 2,
                  rating: 4.5,
                  reviews: 50,
                  features: [],
                  category: room.category
                };
                // Utiliser le contexte de réservation pour sélectionner la chambre
                selectRoom(selectedRoom);
                setCurrentStep('customer');
              }}
            />
            {selectedRoom && (
              <div className="text-center">
                <Button
                  onClick={handleRoomSelected}
                  size="lg"
                  className="bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
                >
                  Continuer avec cette chambre
                </Button>
              </div>
            )}
          </motion.div>
        );

      case 'customer':
        return (
          <CustomerForm
            onNext={handleCustomerInfo}
            onBack={() => setCurrentStep('rooms')}
            initialData={customerInfo || undefined}
          />
        );

      case 'summary':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-8"
          >
            <BookingSummary 
              selectedRoom={selectedRoom}
              bookingDates={bookingDates}
            />
            <div className="text-center">
              <Button
                onClick={handleBookingConfirmation}
                disabled={isBooking}
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {isBooking ? 'Création de la réservation...' : 'Confirmer la réservation'}
              </Button>
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <h2 className="text-3xl font-playfair font-bold text-indigo-medina mb-6">
                Paiement sécurisé
              </h2>
              <p className="text-muted-foreground font-inter mb-8">
                Votre réservation a été créée avec succès. Procédez au paiement pour finaliser votre séjour.
              </p>
              <div className="bg-background/50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-playfair font-bold text-indigo-medina mb-3">Détails de la réservation</h3>
                <div className="space-y-2 text-sm font-inter text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Référence :</span>
                    <span className="font-semibold text-indigo-medina">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chambre :</span>
                    <span>{selectedRoom?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total à payer :</span>
                    <span className="font-semibold text-terre-cuite">
                      {calculateBookingDetails()?.total} TND
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                size="lg"
                className="bg-terre-cuite hover:bg-terre-cuite/90 text-white font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                {isProcessingPayment ? 'Traitement du paiement...' : 'Payer avec Konnect'}
              </Button>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <div className="w-16 h-16 bg-vert-porte text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
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
                    <span className="font-semibold text-indigo-medina">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chambre :</span>
                    <span>{selectedRoom?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dates :</span>
                    <span>{bookingDates?.checkIn} - {bookingDates?.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total payé :</span>
                    <span className="font-semibold text-terre-cuite">
                      {calculateBookingDetails()?.total} TND
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={resetBooking}
                className="bg-indigo-medina hover:bg-indigo-medina/90 text-white font-inter"
              >
                Nouvelle réservation
              </Button>
            </div>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gradient-card rounded-2xl p-8 shadow-strong">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-playfair font-bold text-indigo-medina mb-4">
                Erreur de réservation
              </h2>
              <p className="text-muted-foreground font-inter mb-6">
                Une erreur est survenue lors de la création de votre réservation. Veuillez réessayer.
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
                  onClick={() => window.location.href = '/'}
                  className="bg-indigo-medina hover:bg-indigo-medina/90 text-white font-inter"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </motion.div>
        );

      default:
        console.log('Unknown step:', currentStep);
        return (
          <div className="max-w-2xl mx-auto text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Étape inconnue: {currentStep}
            </h2>
            <p className="text-gray-600 mb-4">
              Une erreur s'est produite. Étape actuelle: {currentStep}
            </p>
            <Button onClick={resetBooking} className="bg-terre-cuite text-white">
              Recommencer
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentStep()}
    </div>
  );
};

export default BookingFlow;
