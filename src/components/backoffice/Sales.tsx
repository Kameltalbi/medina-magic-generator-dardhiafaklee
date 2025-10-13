// Sales page - Page Ventes avec KPIs, graphiques et tableau de transactions
// Clean, professional UI avec couleurs turquoise et blanc
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Calendar,
  Users,
  DollarSign,
  PieChart,
  BarChart3,
  Eye,
  Search,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Transaction {
  id: string;
  invoiceId: string;
  clientName: string;
  clientEmail: string;
  reservationId?: string;
  experienceId?: string;
  type: 'accommodation' | 'experience' | 'extra';
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  date: string;
  paymentMethod: string;
  description: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  reservations: number;
}

const Sales = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Données simulées
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      invoiceId: "INV-2024-001",
      clientName: "Marie Dubois",
      clientEmail: "marie.dubois@example.com",
      reservationId: "RES-001",
      type: "accommodation",
      amount: 600,
      status: "paid",
      date: "2024-01-15T10:30:00Z",
      paymentMethod: "Carte bancaire",
      description: "Chambre Traditionnelle - 3 nuits"
    },
    {
      id: "2",
      invoiceId: "INV-2024-002",
      clientName: "Ahmed Ben Ali",
      clientEmail: "ahmed.ali@example.com",
      experienceId: "EXP-001",
      type: "experience",
      amount: 35,
      status: "paid",
      date: "2024-01-14T14:15:00Z",
      paymentMethod: "Espèces",
      description: "Visite Grande Mosquée"
    },
    {
      id: "3",
      invoiceId: "INV-2024-003",
      clientName: "Sophie Martin",
      clientEmail: "sophie.martin@example.com",
      reservationId: "RES-002",
      type: "accommodation",
      amount: 1200,
      status: "pending",
      date: "2024-01-13T09:45:00Z",
      paymentMethod: "Virement",
      description: "Suite Royale - 5 nuits"
    },
    {
      id: "4",
      invoiceId: "INV-2024-004",
      clientName: "Jean-Pierre Moreau",
      clientEmail: "jeanpierre.moreau@example.com",
      type: "extra",
      amount: 150,
      status: "paid",
      date: "2024-01-12T16:20:00Z",
      paymentMethod: "Carte bancaire",
      description: "Transfert aéroport + Petit-déjeuner"
    },
    {
      id: "5",
      invoiceId: "INV-2024-005",
      clientName: "Fatma Khelil",
      clientEmail: "fatma.khelil@example.com",
      experienceId: "EXP-002",
      type: "experience",
      amount: 50,
      status: "cancelled",
      date: "2024-01-11T11:30:00Z",
      paymentMethod: "Carte bancaire",
      description: "Atelier tissage de tapis"
    },
    {
      id: "6",
      invoiceId: "INV-2024-006",
      clientName: "Pierre Durand",
      clientEmail: "pierre.durand@example.com",
      reservationId: "RES-003",
      type: "accommodation",
      amount: 400,
      status: "paid",
      date: "2024-01-10T13:15:00Z",
      paymentMethod: "Espèces",
      description: "Chambre Double - 2 nuits"
    }
  ];

  const mockMonthlyRevenue: MonthlyRevenue[] = [
    { month: "Jan", revenue: 12500, reservations: 45 },
    { month: "Fév", revenue: 11800, reservations: 42 },
    { month: "Mar", revenue: 14200, reservations: 48 },
    { month: "Avr", revenue: 16800, reservations: 52 },
    { month: "Mai", revenue: 19500, reservations: 58 },
    { month: "Jun", revenue: 22300, reservations: 65 },
    { month: "Jul", revenue: 25600, reservations: 72 },
    { month: "Aoû", revenue: 28900, reservations: 78 },
    { month: "Sep", revenue: 21200, reservations: 61 },
    { month: "Oct", revenue: 18600, reservations: 55 },
    { month: "Nov", revenue: 15200, reservations: 48 },
    { month: "Déc", revenue: 13800, reservations: 44 }
  ];

  useEffect(() => {
    // Charger les données depuis localStorage
    const savedTransactions = localStorage.getItem('salesTransactions');
    const savedRevenue = localStorage.getItem('salesRevenue');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(mockTransactions);
      localStorage.setItem('salesTransactions', JSON.stringify(mockTransactions));
    }

    if (savedRevenue) {
      setMonthlyRevenue(JSON.parse(savedRevenue));
    } else {
      setMonthlyRevenue(mockMonthlyRevenue);
      localStorage.setItem('salesRevenue', JSON.stringify(mockMonthlyRevenue));
    }
  }, []);

  // Calculs des KPIs
  const currentMonth = new Date().getMonth();
  const currentMonthRevenue = monthlyRevenue[currentMonth]?.revenue || 0;
  const totalInvoicedReservations = transactions.filter(t => t.status === 'paid').length;
  const pendingPayments = transactions.filter(t => t.status === 'pending').length;
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filtrage des transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Calcul du breakdown des revenus
  const revenueBreakdown = {
    accommodation: transactions.filter(t => t.type === 'accommodation' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0),
    experience: transactions.filter(t => t.type === 'experience' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0),
    extra: transactions.filter(t => t.type === 'extra' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0)
  };

  const totalRevenue = revenueBreakdown.accommodation + revenueBreakdown.experience + revenueBreakdown.extra;

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'paid': return <Badge className="bg-green-100 text-green-800">Payé</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default: return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'accommodation': return 'Hébergement';
      case 'experience': return 'Expérience';
      case 'extra': return 'Extras';
      default: return 'Inconnu';
    }
  };

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'accommodation': return 'bg-blue-100 text-blue-800';
      case 'experience': return 'bg-purple-100 text-purple-800';
      case 'extra': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina mb-2">
            Ventes
          </h1>
          <p className="text-muted-foreground font-medium">
            Suivi des ventes et analyse des revenus
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chiffre d'Affaires du Mois</p>
                <p className="text-2xl font-bold text-indigo-medina">{currentMonthRevenue.toLocaleString()} DT</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs mois dernier
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Réservations facturées</p>
                <p className="text-2xl font-bold text-indigo-medina">{totalInvoicedReservations}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  Ce mois-ci
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paiements en attente</p>
                <p className="text-2xl font-bold text-indigo-medina">{pendingAmount.toLocaleString()} DT</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {pendingPayments} transaction(s)
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart - Chiffre d'Affaires Mensuel */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Chiffre d'Affaires Mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyRevenue.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      index === currentMonth 
                        ? 'bg-blue-600' 
                        : 'bg-blue-200 hover:bg-blue-300'
                    }`}
                    style={{ 
                      height: `${(month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 200}px`,
                      minHeight: '20px'
                    }}
                  />
                  <span className="text-xs text-muted-foreground mt-2">{month.month}</span>
                  <span className="text-xs font-medium text-indigo-medina">
                    {month.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Mois actuel mis en évidence en bleu foncé
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Revenue Breakdown */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Répartition des Revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium">Hébergement</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-indigo-medina">
                    {revenueBreakdown.accommodation.toLocaleString()} DT
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {totalRevenue > 0 ? Math.round((revenueBreakdown.accommodation / totalRevenue) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm font-medium">Expériences</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-indigo-medina">
                    {revenueBreakdown.experience.toLocaleString()} DT
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {totalRevenue > 0 ? Math.round((revenueBreakdown.experience / totalRevenue) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm font-medium">Extras</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-indigo-medina">
                    {revenueBreakdown.extra.toLocaleString()} DT
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {totalRevenue > 0 ? Math.round((revenueBreakdown.extra / totalRevenue) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-medina">Total</span>
                  <span className="font-bold text-indigo-medina text-lg">
                    {totalRevenue.toLocaleString()} DT
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="shadow-sm border-0 bg-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-indigo-medina">
              Tableau des Transactions
            </CardTitle>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facture ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.invoiceId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.clientName}</div>
                        <div className="text-sm text-muted-foreground">{transaction.clientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transaction.type)}>
                        {getTypeLabel(transaction.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-indigo-medina">
                      {transaction.amount.toLocaleString()} DT
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {getStatusBadge(transaction.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-medina">
              {transactions.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Transactions</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {transactions.filter(t => t.status === 'paid').length}
            </div>
            <div className="text-sm text-muted-foreground">Transactions Payées</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {transactions.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">En Attente</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {transactions.filter(t => t.status === 'cancelled').length}
            </div>
            <div className="text-sm text-muted-foreground">Annulées</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;