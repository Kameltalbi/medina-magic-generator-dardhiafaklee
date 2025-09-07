// Authentication and permissions hook for back-office
// Manages user roles and permissions

import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "admin";
  permissions: string[];
  lastLogin: Date;
}

export interface Permission {
  resource: string;
  action: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Simulate API call to verify token and get user data
          const userData = await mockGetUserData(token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const response = await mockLogin(email, password);
      if (response.success) {
        localStorage.setItem("auth_token", response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Superadmin has all permissions
    if (user.role === "superadmin") return true;
    
    // Check specific permissions for admin
    return user.permissions.includes(permission);
  };

  const role = user?.role || null;

  return {
    user,
    role,
    loading,
    login,
    logout,
    hasPermission,
  };
};

// Mock functions - replace with real API calls
const mockGetUserData = async (token: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock user data based on token
  const isSuperAdmin = token.includes("superadmin");
  
  return {
    id: "1",
    email: isSuperAdmin ? "superadmin@dardhiafa.com" : "admin@dardhiafa.com",
    name: isSuperAdmin ? "Super Admin" : "Admin User",
    role: isSuperAdmin ? "superadmin" : "admin",
    permissions: isSuperAdmin 
      ? ["*"] // All permissions
      : [
          "sales.read", "sales.export", "sales.edit",
          "analytics.read", "analytics.export",
          "seo.read", "seo.update",
          "content.manage"
        ],
    lastLogin: new Date(),
  };
};

const mockLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock login logic
  if (email === "superadmin@dardhiafa.com" && password === "admin123") {
    return {
      success: true,
      token: "mock_token_superadmin",
      user: {
        id: "1",
        email: "superadmin@dardhiafa.com",
        name: "Super Admin",
        role: "superadmin" as const,
        permissions: ["*"],
        lastLogin: new Date(),
      },
    };
  } else if (email === "admin@dardhiafa.com" && password === "admin123") {
    return {
      success: true,
      token: "mock_token_admin",
      user: {
        id: "2",
        email: "admin@dardhiafa.com",
        name: "Admin User",
        role: "admin" as const,
        permissions: [
          "sales.read", "sales.export", "sales.edit",
          "analytics.read", "analytics.export",
          "seo.read", "seo.update",
          "content.manage"
        ],
        lastLogin: new Date(),
      },
    };
  }
  
  return {
    success: false,
    error: "Invalid credentials",
  };
};

export { useAuth };
export default useAuth;
