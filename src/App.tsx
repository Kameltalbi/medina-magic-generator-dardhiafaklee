import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";
import Experiences from "./pages/Experiences";
import Gallery from "./pages/Gallery";
import BackOffice from "./pages/BackOffice";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

// Composant pour gérer l'authentification et le routage
const AppContent = () => {
  const { isAuthenticated, login, isLoading } = useAuth();

  // Afficher un loader pendant la vérification de la session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-medina via-terre-cuite to-vert-porte flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="font-inter">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, afficher la page de connexion
  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  // Si authentifié, afficher l'application normale
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/backoffice" element={<BackOffice />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </BookingProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
