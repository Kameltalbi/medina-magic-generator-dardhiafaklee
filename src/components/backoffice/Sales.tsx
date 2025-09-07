// Sales management page with detailed tracking and analytics
// Uses existing design tokens and responsive table layout

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sales = () => {
    const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock sales data
  const salesData = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      time: "14:30",
      status: "paid",
      amount: 180,
      currency: "EUR",
      source: "Organic",
      campaign: "Summer Promotion",
      product: "Deluxe Suite - 2 nights",
      customer: "john.doe@email.com",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-002",
      date: "2024-01-15",
      time: "16:45",
      status: "paid",
      amount: 120,
      currency: "EUR",
      source: "Facebook",
      campaign: "Facebook Campaign",
      product: "Traditional Room - 1 night",
      customer: "marie.martin@email.com",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-003",
      date: "2024-01-14",
      time: "09:15",
      status: "failed",
      amount: 220,
      currency: "EUR",
      source: "Google Ads",
      campaign: "Google Ads Campaign",
      product: "Deluxe Suite - 3 nights",
      customer: "pierre.dupont@email.com",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-004",
      date: "2024-01-14",
      time: "20:30",
      status: "refunded",
      amount: 90,
      currency: "EUR",
      source: "Direct",
      campaign: "Direct Traffic",
      product: "Traditional Room - 1 night",
      customer: "sophie.bernard@email.com",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "ORD-005",
      date: "2024-01-13",
      time: "11:20",
      status: "paid",
      amount: 360,
      currency: "EUR",
      source: "Email",
      campaign: "Newsletter Campaign",
      product: "Deluxe Suite - 4 nights",
      customer: "alexandre.leclerc@email.com",
      paymentMethod: "Credit Card",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "refunded":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      refunded: "bg-orange-100 text-orange-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const filteredSales = salesData.filter(sale => {
    const matchesSearch = sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredSales
    .filter(sale => sale.status === "paid")
    .reduce((sum, sale) => sum + sale.amount, 0);

  const totalSales = filteredSales.filter(sale => sale.status === "paid").length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const refundRate = filteredSales.length > 0 ? 
    (filteredSales.filter(sale => sale.status === "refunded").length / filteredSales.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Gestion des Ventes"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Suivez et gérez vos performances de vente"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {"Exporter"}
          </Button>
          <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
            {"Actualiser"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("backoffice.sales.kpis.revenue")}
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {t("backoffice.sales.kpis.totalRevenue")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("backoffice.sales.kpis.totalSales")}
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              {t("backoffice.sales.kpis.successfulOrders")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("backoffice.sales.kpis.averageOrder")}
            </CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {t("backoffice.sales.kpis.perOrder")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("backoffice.sales.kpis.refundRate")}
            </CardTitle>
            <XCircle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{refundRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {t("backoffice.sales.kpis.refundedOrders")}
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
                  placeholder={"Rechercher commandes, clients..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Tous les statuts"}</SelectItem>
                <SelectItem value="paid">{"Payé"}</SelectItem>
                <SelectItem value="failed">{"Échoué"}</SelectItem>
                <SelectItem value="refunded">{"Remboursé"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>{"Commandes"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{"ID Commande"}</TableHead>
                  <TableHead>{"Date"}</TableHead>
                  <TableHead>{"Statut"}</TableHead>
                  <TableHead>{"Montant"}</TableHead>
                  <TableHead>{"Source"}</TableHead>
                  <TableHead>{"Campagne"}</TableHead>
                  <TableHead>{"Produit"}</TableHead>
                  <TableHead>{"Client"}</TableHead>
                  <TableHead className="text-right">{"Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{sale.date}</div>
                        <div className="text-xs text-muted-foreground">{sale.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(sale.status)}
                        <Badge className={getStatusBadge(sale.status)}>
                          {t(`backoffice.sales.${sale.status}`)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.currency} {sale.amount}
                    </TableCell>
                    <TableCell>{sale.source}</TableCell>
                    <TableCell>{sale.campaign}</TableCell>
                    <TableCell className="max-w-xs truncate">{sale.product}</TableCell>
                    <TableCell className="max-w-xs truncate">{sale.customer}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{"Actions"}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {"Voir détails"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            {"Modifier"}
                          </DropdownMenuItem>
                          {sale.status === "paid" && (
                            <DropdownMenuItem className="text-orange-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {"Rembourser"}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
