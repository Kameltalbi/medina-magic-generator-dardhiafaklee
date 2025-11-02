import BookingHeader from "@/components/booking/BookingHeader";
import BookingHero from "@/components/booking/BookingHero";
import BookingFlow from "@/components/booking/BookingFlow";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-sable">
      <BookingHeader />
      <BookingHero />
      <BookingFlow />
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default BookingPage;