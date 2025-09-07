// User and role management page (superadmin only)
// Uses existing design tokens and comprehensive user management

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck,
  Eye,
  Key,
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Mock users data
  const usersData = [
    {
      id: "1",
      name: "Super Admin",
      email: "superadmin@dardhiafa.com",
      role: "superadmin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      permissions: ["*"],
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@dardhiafa.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 10:15",
      permissions: ["sales.read", "analytics.read", "content.manage"],
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "Content Manager",
      email: "content@dardhiafa.com",
      role: "admin",
      status: "inactive",
      lastLogin: "2024-01-10 16:45",
      permissions: ["content.manage", "seo.read"],
      createdAt: "2024-01-08",
    },
  ];

  const activityLog = [
    {
      id: "1",
      user: "Super Admin",
      action: "Created new user",
      target: "Content Manager",
      timestamp: "2024-01-15 14:30",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      user: "Admin User",
      action: "Updated pricing",
      target: "Traditional Room",
      timestamp: "2024-01-15 10:15",
      ip: "192.168.1.101",
    },
    {
      id: "3",
      user: "Super Admin",
      action: "Modified SEO settings",
      target: "Homepage",
      timestamp: "2024-01-14 16:20",
      ip: "192.168.1.100",
    },
  ];

  const allPermissions = [
    { category: "Dashboard", permissions: ["dashboard.read"] },
    { category: "Sales", permissions: ["sales.read", "sales.export", "sales.edit", "sales.delete"] },
    { category: "Analytics", permissions: ["analytics.read", "analytics.export"] },
    { category: "SEO", permissions: ["seo.read", "seo.update", "seo.publish"] },
    { category: "Content", permissions: ["content.manage", "content.publish"] },
    { category: "Users", permissions: ["users.manage", "users.create", "users.delete"] },
    { category: "Settings", permissions: ["settings.manage", "settings.advanced"] },
  ];

  const getRoleIcon = (role: string) => {
    return role === "superadmin" ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      superadmin: "bg-red-100 text-red-800",
      admin: "bg-blue-100 text-blue-800",
    };
    return variants[role as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Gestion des Utilisateurs"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Gérez les utilisateurs, rôles et permissions"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {"Exporter"}
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                <Plus className="w-4 h-4 mr-2" />
                {"Ajouter Utilisateur"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{"Ajouter Utilisateur"}</DialogTitle>
                <DialogDescription>
                  Créer un nouvel utilisateur avec des permissions spécifiques
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{"Rôle"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{"Permissions"}</Label>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {allPermissions.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <h4 className="text-sm font-medium">{category.category}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.permissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox id={permission} />
                              <Label htmlFor={permission} className="text-sm">
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Annuler
                </Button>
                <Button className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  Créer l'utilisateur
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs totaux
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.length}</div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs actifs
            </CardTitle>
            <UserCheck className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Actuellement actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Super administrateurs
            </CardTitle>
            <ShieldCheck className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.role === "superadmin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Accès complet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrateurs
            </CardTitle>
            <Shield className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData.filter(u => u.role === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Accès limité
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{"Filtres"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={"Rechercher utilisateurs..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Tous les rôles"}</SelectItem>
                <SelectItem value="superadmin">{"Super Admin"}</SelectItem>
                <SelectItem value="admin">{"Admin"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{"Utilisateurs"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{"Utilisateur"}</TableHead>
                <TableHead>{"Rôle"}</TableHead>
                <TableHead>{"Statut"}</TableHead>
                <TableHead>{"Dernière connexion"}</TableHead>
                <TableHead>{"Permissions"}</TableHead>
                <TableHead className="text-right">{"Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-terre-cuite to-vert-porte rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.lastLogin.split(' ')[0]}</div>
                      <div className="text-muted-foreground">{user.lastLogin.split(' ')[1]}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {user.permissions.includes("*") ? (
                        <Badge variant="outline">All Permissions</Badge>
                      ) : (
                        <span>{user.permissions.length} permissions</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>{"Journal d'activité"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      <span className="text-terre-cuite">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.target} • {activity.timestamp} • {activity.ip}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {activity.timestamp.split(' ')[0]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
