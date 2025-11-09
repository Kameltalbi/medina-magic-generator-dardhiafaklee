// BackOffice main page - Dashboard with sidebar and role-based access control
// Uses existing design tokens and color palette
// French only - no translations

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/backoffice/Sidebar";
import Header from "@/components/backoffice/Header";
import Dashboard from "@/components/backoffice/Dashboard";
import Sales from "@/components/backoffice/Sales";
import RoomPricing from "@/components/backoffice/RoomPricing";
import RoomManagement from "@/components/backoffice/RoomManagement";
import GalleryManagement from "@/components/backoffice/GalleryManagement";
import ContentManagement from "@/components/backoffice/ContentManagement";
import ReservationManagement from "@/components/backoffice/ReservationManagement";
import UserManagement from "@/components/backoffice/UserManagement";
import Settings from "@/components/backoffice/Settings";

const BackOffice = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Rediriger vers le login si non authentifié
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/backoffice/login" replace />;
  }

  const userRole = user?.role === "superadmin" ? "superadmin" : "admin";

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "rooms":
        return <RoomManagement />;
      case "pricing":
        return <RoomPricing />;
      case "gallery":
        return <GalleryManagement />;
      case "content":
        return <ContentManagement />;
      case "reservations":
        return <ReservationManagement />;
      case "sales":
        return <Sales />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="ml-64 transition-all duration-300">
        {/* Header */}
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          user={{ name: user?.name || "", email: user?.email || "" }}
          role={userRole}
        />

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default BackOffice;
