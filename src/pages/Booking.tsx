import BookingHeader from "@/components/booking/BookingHeader";
import BookingHero from "@/components/booking/BookingHero";
import BookingFlow from "@/components/booking/BookingFlow";
import Footer from "@/components/Footer";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-sable">
      <BookingHeader />
      <BookingHero />
      <BookingFlow />
      <Footer />
    </div>
  );
};

export default BookingPage;