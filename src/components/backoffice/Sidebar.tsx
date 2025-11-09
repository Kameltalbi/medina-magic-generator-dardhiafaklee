// Sidebar component for back-office navigation
// Uses existing design tokens and responsive design
// French only - no translations

import { 
  LayoutDashboard, 
  ShoppingCart, 
  Settings,
  Calendar,
  DollarSign,
  Star,
  Bed,
  Image as ImageIcon,
  FileText,
  Users
} from "lucide-react";

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
      id: "rooms",
      label: "Chambres",
      icon: Bed,
      permission: "rooms.manage",
    },
    {
      id: "pricing",
      label: "Tarifs",
      icon: DollarSign,
      permission: "pricing.manage",
    },
    {
      id: "gallery",
      label: "Galerie",
      icon: ImageIcon,
      permission: "gallery.manage",
    },
    {
      id: "content",
      label: "Contenu",
      icon: FileText,
      permission: "content.manage",
    },
    {
      id: "reservations",
      label: "Réservations",
      icon: Calendar,
      permission: "reservations.manage",
    },
    {
      id: "sales",
      label: "Ventes",
      icon: ShoppingCart,
      permission: "sales.read",
    },
    {
      id: "users",
      label: "Utilisateurs",
      icon: Users,
      permission: "users.manage",
      superadminOnly: true,
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
        "rooms.manage",
        "pricing.manage",
        "gallery.manage",
        "content.manage",
        "reservations.manage",
        "sales.read", "sales.export", "sales.edit",
        "analytics.read", "analytics.export",
        "seo.read", "seo.update"
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
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-indigo-medina/10 to-terre-cuite/10">
            <div className="flex items-center space-x-3">
              <img
                src="/logo Klee.png"
                alt="Dar Dhiafa Klee"
                className="h-10 w-auto object-contain"
              />
              <div>
                <span className="font-bold font-bold text-indigo-medina block">
                  Back Office
                </span>
                <span className="text-xs text-muted-foreground">Administration</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-terre-cuite text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-terre-cuite"}`} />
                  <span className="font-medium font-medium text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="text-xs text-muted-foreground text-center">
              <p className="font-medium">Dar Dhiafa Klee</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
