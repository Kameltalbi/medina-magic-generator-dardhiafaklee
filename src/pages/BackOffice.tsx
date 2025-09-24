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
import ExperienceManagement from "@/components/backoffice/ExperienceManagement";
import ReservationManagement from "@/components/backoffice/ReservationManagement";
import Settings from "@/components/backoffice/Settings";
import BackOfficeLogin from "./BackOfficeLogin";
import { useAuth } from "@/hooks/useAuth";

const BackOffice = () => {
  const { user, role, hasPermission } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show login page if not authenticated
  if (!user) {
    return <BackOfficeLogin />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "reservations":
        return hasPermission("reservations.manage") ? <ReservationManagement /> : <div>Access denied</div>;
      case "pricing":
        return hasPermission("pricing.manage") ? <RoomPricing /> : <div>Access denied</div>;
      case "sales":
        return <Sales />;
      case "experiences":
        return hasPermission("experiences.manage") ? <ExperienceManagement /> : <div>Access denied</div>;
      case "settings":
        return hasPermission("settings.manage") ? <Settings /> : <div>Access denied</div>;
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
        userRole={role}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          role={role}
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
