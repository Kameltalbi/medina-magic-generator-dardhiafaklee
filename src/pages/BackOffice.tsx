// BackOffice main page - Dashboard with sidebar and role-based access control
// Uses existing design tokens and color palette
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<"superadmin" | "admin">("superadmin");

  useEffect(() => {
    // Charger le rôle depuis localStorage ou utiliser superadmin par défaut
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);
        // Pour l'instant, utiliser superadmin par défaut
        // Plus tard, on pourra charger le rôle de l'utilisateur connecté
        setUserRole("superadmin");
      } catch (error) {
        console.error('Error loading user role:', error);
      }
    }
  }, []);

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
          user={{ name: "Super Admin", email: "superadmin@dardhiafa.com" }}
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
