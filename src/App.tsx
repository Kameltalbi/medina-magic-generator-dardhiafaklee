import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Experiences from "./pages/Experiences";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Events from "./pages/Events";
import Suites from "./pages/Suites";
import ChambresFamiliales from "./pages/ChambresFamiliales";
import ChambresDoubles from "./pages/ChambresDoubles";
import ChambresTwin from "./pages/ChambresTwin";
import ChambresTriples from "./pages/ChambresTriples";
import BackOffice from "./pages/BackOffice";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Composant principal de l'application
const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/suites" element={<Suites />} />
        <Route path="/chambres-familiales" element={<ChambresFamiliales />} />
        <Route path="/chambres-doubles" element={<ChambresDoubles />} />
        <Route path="/chambres-twin" element={<ChambresTwin />} />
        <Route path="/chambres-triples" element={<ChambresTriples />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/evenements" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/backoffice/login" element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />
        {/* Redirections 301 pour les anciennes routes "maison" */}
        <Route path="/maison" element={<Navigate to="/about" replace />} />
        <Route path="/house" element={<Navigate to="/about" replace />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <BookingProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </BookingProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
