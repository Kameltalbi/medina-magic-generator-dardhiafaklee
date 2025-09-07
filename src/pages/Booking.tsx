import BookingHeader from "@/components/booking/BookingHeader";
import BookingHero from "@/components/booking/BookingHero";
import BookingForm from "@/components/booking/BookingForm";
import AvailableRooms from "@/components/booking/AvailableRooms";
import BookingSummary from "@/components/booking/BookingSummary";
import Footer from "@/components/Footer";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-sable">
      <BookingHeader />
      <BookingHero />
      <BookingForm />
      <AvailableRooms />
      <BookingSummary />
      <Footer />
    </div>
  );
};

export default BookingPage;