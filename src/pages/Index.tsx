// Main Index page - Complete homepage for Dar Dhiafa Klee
// Combines all components with proper SEO and semantic structure

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PaulKleeSection from "@/components/PaulKleeSection";
import About from "@/components/About";
import RoomsPreview from "@/components/RoomsPreview";
import ExperiencesPreview from "@/components/Experiences";
import PrivatizationSection from "@/components/PrivatizationSection";
import ContactMap from "@/components/ContactMap";
import DjerbaBanner from "@/components/DjerbaBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-optimized semantic structure */}
      <Header />
      
      <main>
        <Hero />
        <PaulKleeSection />
        <About />
        <RoomsPreview />
        <PrivatizationSection />
        <ExperiencesPreview />
        <ContactMap />
      </main>
      
      <DjerbaBanner />
      <Footer />
    </div>
  );
};

export default Index;