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
  type: 'accommodation' | 'extra' | 'online'; // 'online' pour paiement en ligne futur
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  date: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'card' | 'online' | 'other'; // Méthodes de paiement
  description: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
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
  const [searchTerm, setSearchTerm] = useState("");

  // Charger les réservations et générer les transactions
  useEffect(() => {
    // Nettoyer TOUTES les anciennes données mockées au chargement initial
    const savedTransactions = localStorage.getItem('salesTransactions');
    if (savedTransactions) {
      try {
        const transactions = JSON.parse(savedTransactions);
        // Supprimer TOUTES les transactions mockées (détection par invoiceId, ID numérique, ou email mocké)
        const cleanedTransactions = transactions.filter((t: Transaction) => {
          // Supprimer les transactions avec invoiceId mockés (INV-2024-xxx, etc.)
          if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) {
            return false;
          }
          // Supprimer les transactions avec IDs numériques simples (1, 2, 3, etc.)
          if (t.id && /^\d+$/.test(t.id) && !t.reservationId) {
            return false;
          }
          // Supprimer les transactions avec emails mockés (@example.com)
          if (t.clientEmail && (t.clientEmail.includes('@example.com') || t.clientEmail.includes('example.com'))) {
            if (!t.reservationId || !t.id?.startsWith('TXN-')) {
              return false;
            }
          }
          // Garder uniquement les transactions valides
          return (t.id && t.id.startsWith('TXN-')) || 
                 (t.reservationId && t.reservationId.startsWith('RES-')) || 
                 (t.type === 'extra' && !t.reservationId && t.id && !/^\d+$/.test(t.id) && !t.clientEmail?.includes('example.com'));
        });
        // Toujours sauvegarder les transactions nettoyées
        localStorage.setItem('salesTransactions', JSON.stringify(cleanedTransactions));
        if (cleanedTransactions.length !== transactions.length) {
          console.log(`Nettoyé ${transactions.length - cleanedTransactions.length} transactions mockées`);
        }
      } catch (error) {
        console.error('Error cleaning transactions on load:', error);
        // En cas d'erreur, supprimer complètement les transactions mockées
        localStorage.removeItem('salesTransactions');
      }
    }
    
    loadTransactionsFromReservations();
    calculateMonthlyRevenue();
    
    // Écouter les changements de réservations
    const handleStorageChange = () => {
      loadTransactionsFromReservations();
      calculateMonthlyRevenue();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reservationUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reservationUpdated', handleStorageChange);
    };
  }, []);

  const loadTransactionsFromReservations = () => {
    // Charger les réservations depuis localStorage
    const savedReservations = localStorage.getItem('reservations');
    const savedTransactions = localStorage.getItem('salesTransactions');
    
    let allTransactions: Transaction[] = [];
    
    // NETTOYAGE STRICT : Ne charger QUE les transactions valides
    if (savedTransactions) {
      try {
        const existingTransactions = JSON.parse(savedTransactions);
        // Filtrer strictement : ne garder QUE les transactions générées depuis les réservations
        allTransactions = existingTransactions.filter((t: Transaction) => {
          // SUPPRIMER toutes les transactions mockées
          if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) {
            return false;
          }
          if (t.id && /^\d+$/.test(t.id) && !t.reservationId) {
            return false;
          }
          // SUPPRIMER les transactions avec des emails mockés
          if (t.clientEmail && (t.clientEmail.includes('@example.com') || t.clientEmail.includes('example.com'))) {
            if (!t.reservationId || !t.id?.startsWith('TXN-')) {
              return false;
            }
          }
          // GARDER uniquement les transactions valides
          if (t.id && t.id.startsWith('TXN-')) return true;
          if (t.reservationId && t.reservationId.startsWith('RES-')) return true;
          if (t.type === 'extra' && !t.reservationId && t.id && !/^\d+$/.test(t.id) && !t.clientEmail?.includes('example.com')) return true;
          // Supprimer tout le reste
          return false;
        });
      } catch (error) {
        console.error('Error loading transactions:', error);
        // En cas d'erreur, vider complètement
        allTransactions = [];
      }
    }
    
    // Générer les transactions à partir des réservations
    if (savedReservations) {
      try {
        const reservations = JSON.parse(savedReservations);
        
        reservations.forEach((reservation: any) => {
          // Créer une transaction pour le montant total payé
          if (reservation.depositPaid > 0) {
            const existingTransaction = allTransactions.find(
              t => t.reservationId === reservation.id && t.type === 'accommodation' && t.id.includes('deposit')
            );
            
            if (!existingTransaction) {
              allTransactions.push({
                id: `TXN-${reservation.id}-deposit`,
                invoiceId: `INV-${reservation.id}`,
                clientName: reservation.guestName,
                clientEmail: reservation.email,
                reservationId: reservation.id,
                type: 'accommodation',
                amount: reservation.depositPaid,
                status: reservation.paymentStatus === 'paid' ? 'paid' : 
                        reservation.paymentStatus === 'partial' ? 'pending' : 'pending',
                date: reservation.createdAt,
                paymentMethod: mapPaymentMethod(reservation.source),
                description: `${reservation.roomType} - ${reservation.roomNumber}`,
                roomType: reservation.roomType,
                checkIn: reservation.checkIn,
                checkOut: reservation.checkOut
              });
            } else {
              // Mettre à jour la transaction existante
              const index = allTransactions.indexOf(existingTransaction);
              allTransactions[index] = {
                ...existingTransaction,
                amount: reservation.depositPaid,
                status: reservation.paymentStatus === 'paid' ? 'paid' : 
                        reservation.paymentStatus === 'partial' ? 'pending' : 'pending',
                paymentMethod: mapPaymentMethod(reservation.source),
              };
            }
          }
          
          // Si le solde est payé, créer une transaction pour le solde
          if (reservation.paymentStatus === 'paid' && reservation.totalAmount > reservation.depositPaid) {
            const balance = reservation.totalAmount - reservation.depositPaid;
            const existingBalanceTransaction = allTransactions.find(
              t => t.reservationId === reservation.id && t.id.includes('balance')
            );
            
            if (!existingBalanceTransaction && balance > 0) {
              allTransactions.push({
                id: `TXN-${reservation.id}-balance`,
                invoiceId: `INV-${reservation.id}-B`,
                clientName: reservation.guestName,
                clientEmail: reservation.email,
                reservationId: reservation.id,
                type: 'accommodation',
                amount: balance,
                status: 'paid',
                date: new Date().toISOString(),
                paymentMethod: mapPaymentMethod(reservation.source),
                description: `Solde - ${reservation.roomType}`,
                roomType: reservation.roomType,
                checkIn: reservation.checkIn,
                checkOut: reservation.checkOut
              });
            }
          }
        });
      } catch (error) {
        console.error('Error processing reservations:', error);
      }
    }
    
    // Filtrer et supprimer TOUTES les transactions mockées
    // On ne garde QUE les transactions générées depuis les réservations ou les extras manuels
    allTransactions = allTransactions.filter((t: Transaction) => {
      // Supprimer toutes les transactions avec des IDs mockés (INV-2024-xxx, INV-2023-xxx, etc.) sans reservationId
      if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) {
        return false; // Supprimer les transactions mockées
      }
      // Supprimer les transactions avec des IDs numériques simples (1, 2, 3, etc.) - anciennes données mockées
      if (t.id && /^\d+$/.test(t.id) && !t.reservationId) {
        return false;
      }
      // Garder les transactions avec des IDs TXN- (générées depuis les réservations)
      if (t.id && t.id.startsWith('TXN-')) return true;
      // Garder les transactions liées aux réservations (avec reservationId qui commence par RES-)
      if (t.reservationId && t.reservationId.startsWith('RES-')) return true;
      // Garder les extras manuels (type 'extra' sans reservationId et avec un ID valide)
      if (t.type === 'extra' && !t.reservationId && t.id && !/^\d+$/.test(t.id)) return true;
      // Supprimer tout le reste (anciennes données mockées)
      return false;
    });
    
    // Trier par date (plus récentes en premier)
    allTransactions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // S'assurer qu'il n'y a plus de transactions mockées avant de sauvegarder
    const finalTransactions = allTransactions.filter((t: Transaction) => {
      // Supprimer toutes les transactions mockées
      if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) {
        return false;
      }
      if (t.id && /^\d+$/.test(t.id) && !t.reservationId) {
        return false;
      }
      return true;
    });
    
    setTransactions(finalTransactions);
    localStorage.setItem('salesTransactions', JSON.stringify(finalTransactions));
  };

  const mapPaymentMethod = (source: string): Transaction['paymentMethod'] => {
    const sourceLower = source.toLowerCase();
    if (sourceLower.includes('carte') || sourceLower.includes('card')) return 'card';
    if (sourceLower.includes('virement') || sourceLower.includes('transfer')) return 'bank_transfer';
    if (sourceLower.includes('espèces') || sourceLower.includes('cash')) return 'cash';
    if (sourceLower.includes('online') || sourceLower.includes('site')) return 'online';
    return 'other';
  };

  const calculateMonthlyRevenue = () => {
    const savedTransactions = localStorage.getItem('salesTransactions');
    if (!savedTransactions) {
      // Données par défaut pour l'affichage
      const defaultRevenue: MonthlyRevenue[] = [
        { month: "Jan", revenue: 0, reservations: 0 },
        { month: "Fév", revenue: 0, reservations: 0 },
        { month: "Mar", revenue: 0, reservations: 0 },
        { month: "Avr", revenue: 0, reservations: 0 },
        { month: "Mai", revenue: 0, reservations: 0 },
        { month: "Jun", revenue: 0, reservations: 0 },
        { month: "Jul", revenue: 0, reservations: 0 },
        { month: "Aoû", revenue: 0, reservations: 0 },
        { month: "Sep", revenue: 0, reservations: 0 },
        { month: "Oct", revenue: 0, reservations: 0 },
        { month: "Nov", revenue: 0, reservations: 0 },
        { month: "Déc", revenue: 0, reservations: 0 }
      ];
      setMonthlyRevenue(defaultRevenue);
      return;
    }
    
    try {
      const transactions = JSON.parse(savedTransactions);
      const monthlyData: { [key: number]: { revenue: number; reservations: number } } = {};
      
      transactions.forEach((transaction: Transaction) => {
        if (transaction.status === 'paid') {
          const date = new Date(transaction.date);
          const month = date.getMonth();
          
          if (!monthlyData[month]) {
            monthlyData[month] = { revenue: 0, reservations: 0 };
          }
          
          monthlyData[month].revenue += transaction.amount;
          if (transaction.type === 'accommodation') {
            monthlyData[month].reservations += 1;
          }
        }
      });
      
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      const revenueData: MonthlyRevenue[] = months.map((month, index) => ({
        month,
        revenue: monthlyData[index]?.revenue || 0,
        reservations: monthlyData[index]?.reservations || 0
      }));
      
      setMonthlyRevenue(revenueData);
      localStorage.setItem('salesRevenue', JSON.stringify(revenueData));
    } catch (error) {
      console.error('Error calculating monthly revenue:', error);
    }
  };

  // Calculs des KPIs
  const currentMonth = new Date().getMonth();
  const currentMonthRevenue = monthlyRevenue[currentMonth]?.revenue || 0;
  const previousMonthRevenue = monthlyRevenue[currentMonth > 0 ? currentMonth - 1 : 11]?.revenue || 0;
  const revenueGrowth = previousMonthRevenue > 0 
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
    : 0;
  // Filtrer les transactions mockées pour les KPIs (filtre ultra-strict)
  const validTransactions = transactions.filter(t => {
    // Supprimer les transactions avec invoiceId mockés
    if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) return false;
    // Supprimer les transactions avec IDs numériques simples
    if (t.id && /^\d+$/.test(t.id) && !t.reservationId) return false;
    // Supprimer les transactions avec emails mockés
    if (t.clientEmail && (t.clientEmail.includes('@example.com') || t.clientEmail.includes('example.com'))) {
      if (!t.reservationId || !t.id?.startsWith('TXN-')) {
        return false;
      }
    }
    // Garder uniquement les transactions valides
    return (t.id && t.id.startsWith('TXN-')) || 
           (t.reservationId && t.reservationId.startsWith('RES-')) ||
           (t.type === 'extra' && !t.reservationId && t.id && !/^\d+$/.test(t.id) && !t.clientEmail?.includes('example.com'));
  });
  
  const totalInvoicedReservations = validTransactions.filter(t => t.status === 'paid' && t.type === 'accommodation').length;
  const pendingPayments = validTransactions.filter(t => t.status === 'pending').length;
  const pendingAmount = validTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filtrage des transactions (utiliser uniquement les transactions valides)
  const filteredTransactions = validTransactions.filter(transaction => {
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Calcul du breakdown des revenus (utiliser uniquement les transactions valides)
  const revenueBreakdown = {
    accommodation: validTransactions.filter(t => t.type === 'accommodation' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0),
    extra: validTransactions.filter(t => t.type === 'extra' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0),
    online: validTransactions.filter(t => t.type === 'online' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0) // Pour futur paiement en ligne
  };

  const totalRevenue = revenueBreakdown.accommodation + revenueBreakdown.extra + revenueBreakdown.online;

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
      case 'extra': return 'Extras';
      case 'online': return 'Paiement en ligne';
      default: return 'Inconnu';
    }
  };

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'accommodation': return 'bg-blue-100 text-blue-800';
      case 'extra': return 'bg-orange-100 text-orange-800';
      case 'online': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodLabel = (method: Transaction['paymentMethod']) => {
    switch (method) {
      case 'cash': return 'Espèces';
      case 'bank_transfer': return 'Virement';
      case 'card': return 'Carte bancaire';
      case 'online': return 'En ligne';
      case 'other': return 'Autre';
      default: return 'Non spécifié';
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
          <Button 
            variant="outline"
            onClick={() => {
              // Supprimer complètement les transactions mockées et régénérer depuis les réservations
              const savedTransactions = localStorage.getItem('salesTransactions');
              if (savedTransactions) {
                try {
                  const transactions = JSON.parse(savedTransactions);
                  // Supprimer TOUTES les transactions mockées (INV-2024-xxx, INV-2023-xxx, etc.)
                  const cleanedTransactions = transactions.filter((t: Transaction) => {
                    // Supprimer toutes les transactions avec des IDs mockés (INV-2024-xxx, etc.)
                    if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) {
                      return false;
                    }
                    // Supprimer les transactions avec des IDs numériques simples (1, 2, 3, etc.)
                    if (t.id && /^\d+$/.test(t.id) && !t.reservationId) {
                      return false;
                    }
                    // Garder uniquement les transactions valides
                    return (t.id && t.id.startsWith('TXN-')) || 
                           (t.reservationId && t.reservationId.startsWith('RES-')) || 
                           (t.type === 'extra' && !t.reservationId && t.id && !/^\d+$/.test(t.id));
                  });
                  const removedCount = transactions.length - cleanedTransactions.length;
                  localStorage.setItem('salesTransactions', JSON.stringify(cleanedTransactions));
                  if (removedCount > 0) {
                    console.log(`Nettoyé ${removedCount} transactions mockées`);
                    toast.success(`${removedCount} transaction(s) mockée(s) supprimée(s)`);
                  }
                } catch (error) {
                  console.error('Error cleaning transactions:', error);
                }
              }
              // Forcer la régénération depuis les réservations
              loadTransactionsFromReservations();
              calculateMonthlyRevenue();
              toast.success("Données actualisées");
            }}
          >
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
                {previousMonthRevenue > 0 && (
                  <p className={`text-xs flex items-center mt-1 ${parseFloat(revenueGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {parseFloat(revenueGrowth) >= 0 ? '+' : ''}{revenueGrowth}% vs mois dernier
                  </p>
                )}
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
            {monthlyRevenue.length > 0 && monthlyRevenue.some(m => m.revenue > 0) ? (
              <div className="h-64 flex items-end justify-between space-x-2">
                {monthlyRevenue.map((month, index) => {
                  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1);
                  return (
                    <div key={month.month} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          index === currentMonth 
                            ? 'bg-blue-600' 
                            : 'bg-blue-200 hover:bg-blue-300'
                        }`}
                        style={{ 
                          height: `${(month.revenue / maxRevenue) * 200}px`,
                          minHeight: month.revenue > 0 ? '20px' : '0px'
                        }}
                      />
                      <span className="text-xs text-muted-foreground mt-2">{month.month}</span>
                      <span className="text-xs font-medium text-indigo-medina">
                        {month.revenue.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <p>Aucune donnée de revenus disponible</p>
              </div>
            )}
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

              {revenueBreakdown.online > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm font-medium">Paiements en ligne</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-indigo-medina">
                      {revenueBreakdown.online.toLocaleString()} DT
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {totalRevenue > 0 ? Math.round((revenueBreakdown.online / totalRevenue) * 100) : 0}%
                    </div>
                  </div>
                </div>
              )}

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
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Aucune transaction pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
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
                      <div className="max-w-xs">
                        <div className="truncate">{transaction.description}</div>
                        {transaction.roomType && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {transaction.checkIn && transaction.checkOut && 
                              `${new Date(transaction.checkIn).toLocaleDateString('fr-FR')} - ${new Date(transaction.checkOut).toLocaleDateString('fr-FR')}`
                            }
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-indigo-medina">
                      {transaction.amount.toLocaleString()} DT
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          {getStatusBadge(transaction.status)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getPaymentMethodLabel(transaction.paymentMethod)}
                        </div>
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
                  ))
                )}
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
              {validTransactions.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Transactions</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {validTransactions.filter(t => t.status === 'paid').length}
            </div>
            <div className="text-sm text-muted-foreground">Transactions Payées</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {validTransactions.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">En Attente</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {validTransactions.filter(t => t.status === 'cancelled').length}
            </div>
            <div className="text-sm text-muted-foreground">Annulées</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;