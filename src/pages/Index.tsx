// Main Index page - Complete homepage for Dar Dhiafa Klee
// Combines all components with proper SEO and semantic structure

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickBooking from "@/components/QuickBooking";
import About from "@/components/About";
import RoomsPreview from "@/components/RoomsPreview";
import ExperiencesPreview from "@/components/Experiences";
import Gallery360 from "@/components/Gallery360";
import ContactMap from "@/components/ContactMap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-optimized semantic structure */}
      <Header />
      
      <main>
        <Hero />
        <QuickBooking />
        <About />
        <RoomsPreview />
        <ExperiencesPreview />
        <Gallery360 />
        <ContactMap />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;