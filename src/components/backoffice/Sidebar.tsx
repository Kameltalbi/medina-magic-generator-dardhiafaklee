// Sidebar component for back-office navigation
// Uses existing design tokens and responsive design
// French only - no translations

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  userRole: "superadmin" | "admin" | null;
}

const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle, userRole }: SidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      permission: "dashboard.read",
    },
    {
      id: "reservations",
      label: "Réservations",
      icon: Calendar,
      permission: "reservations.manage",
    },
    {
      id: "pricing",
      label: "Tarifs",
      icon: DollarSign,
      permission: "pricing.manage",
    },
    {
      id: "sales",
      label: "Ventes",
      icon: ShoppingCart,
      permission: "sales.read",
    },
    {
      id: "experiences",
      label: "Expériences",
      icon: Star,
      permission: "experiences.manage",
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
      permission: "settings.manage",
      superadminOnly: true,
    },
  ];

  const hasPermission = (permission: string): boolean => {
    if (userRole === "superadmin") return true;
    if (userRole === "admin") {
      return [
        "dashboard.read",
        "sales.read", "sales.export", "sales.edit",
        "analytics.read", "analytics.export",
        "seo.read", "seo.update",
        "content.manage"
      ].includes(permission);
    }
    return false;
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (item.superadminOnly && userRole !== "superadmin") return false;
    return hasPermission(item.permission);
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
        initial={false}
        animate={{ width: isOpen ? 256 : 64 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                          <img
                            src="/logogofinal dardhiafa.png"
                            alt="Dar Dhiafa Klee"
                            className="h-24 w-auto object-contain"
                          />
                <span className="font-bold font-bold text-indigo-medina">
                  Back Office
                </span>
              </motion.div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 hover:bg-muted"
            >
              {isOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-terre-cuite text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-medium font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border-t border-border"
            >
              <div className="text-xs text-muted-foreground text-center">
                Version 1.0.0
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
