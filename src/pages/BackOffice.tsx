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

const BackOffice = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "reservations":
        return <ReservationManagement />;
      case "pricing":
        return <RoomPricing />;
      case "sales":
        return <Sales />;
      case "experiences":
        return <ExperienceManagement />;
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
        userRole="admin"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          user={{ name: "Admin", email: "admin@dardhiafa.com" }}
          role="admin"
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
