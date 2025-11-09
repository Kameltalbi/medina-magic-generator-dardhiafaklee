// Dashboard component - Vue d'ensemble immédiate de l'activité
// Contient résumé quotidien, indicateurs clés et alertes
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Calendar,
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Bed,
  Star,
  CreditCard,
  Globe,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dailySummary, setDailySummary] = useState({
    arrivals: 0,
    departures: 0,
    pendingReservations: 0,
    totalGuests: 0
  });
  const [keyIndicators, setKeyIndicators] = useState({
    occupancyRate: {
      today: 0,
      month: 0,
      trend: "0%"
    },
    monthlyRevenue: {
      current: 0,
      target: 50000,
      trend: "0%"
    },
    bestSources: [] as Array<{ name: string; percentage: number; bookings: number }>
  });
  const [alerts, setAlerts] = useState<Array<{
    type: string;
    severity: string;
    title: string;
    description: string;
    count: number;
  }>>([]);
  const [recentBookings, setRecentBookings] = useState<Array<{
    id: string;
    guest: string;
    room: string;
    checkIn: string;
    status: string;
  }>>([]);

  useEffect(() => {
    loadDashboardData();
    
    // Écouter les changements
    const handleStorageChange = () => {
      loadDashboardData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reservationUpdated', handleStorageChange);
    window.addEventListener('reservationRequestAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reservationUpdated', handleStorageChange);
      window.removeEventListener('reservationRequestAdded', handleStorageChange);
    };
  }, []);

  const loadDashboardData = () => {
    // Charger les réservations
    const savedReservations = localStorage.getItem('reservations');
    const savedRequests = localStorage.getItem('reservationRequests');
    const savedTransactions = localStorage.getItem('salesTransactions');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let arrivals = 0;
    let departures = 0;
    let totalGuests = 0;
    let pendingReservations = 0;
    const sourcesMap: { [key: string]: number } = {};
    const recentBookingsList: Array<{
      id: string;
      guest: string;
      room: string;
      checkIn: string;
      status: string;
    }> = [];
    
    // Calculer depuis les réservations
    if (savedReservations) {
      try {
        const reservations = JSON.parse(savedReservations);
        
        reservations.forEach((reservation: any) => {
          const checkIn = new Date(reservation.checkIn);
          const checkOut = new Date(reservation.checkOut);
          checkIn.setHours(0, 0, 0, 0);
          checkOut.setHours(0, 0, 0, 0);
          
          // Arrivées aujourd'hui
          if (checkIn.getTime() === today.getTime()) {
            arrivals++;
            totalGuests += reservation.guests || 0;
          }
          
          // Départs aujourd'hui
          if (checkOut.getTime() === today.getTime()) {
            departures++;
          }
          
          // Compter les sources
          const source = reservation.source || "Autres";
          sourcesMap[source] = (sourcesMap[source] || 0) + 1;
          
          // Réservations récentes (5 dernières)
          if (recentBookingsList.length < 5) {
            const checkInDate = new Date(reservation.checkIn);
            const daysDiff = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            let checkInText = "";
            if (daysDiff === 0) checkInText = "Aujourd'hui";
            else if (daysDiff === 1) checkInText = "Demain";
            else if (daysDiff > 1) checkInText = `Dans ${daysDiff} jours`;
            else checkInText = checkInDate.toLocaleDateString('fr-FR');
            
            recentBookingsList.push({
              id: reservation.id,
              guest: reservation.guestName,
              room: reservation.roomNumber || reservation.roomType,
              checkIn: checkInText,
              status: reservation.status || "pending"
            });
          }
        });
        
        // Trier les réservations récentes par date
        recentBookingsList.sort((a, b) => {
          const resA = reservations.find((r: any) => r.id === a.id);
          const resB = reservations.find((r: any) => r.id === b.id);
          if (!resA || !resB) return 0;
          return new Date(resB.createdAt).getTime() - new Date(resA.createdAt).getTime();
        });
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
    
    // Compter les demandes en attente
    if (savedRequests) {
      try {
        const requests = JSON.parse(savedRequests);
        pendingReservations = requests.filter((r: any) => r.status === 'pending').length;
      } catch (error) {
        console.error('Error loading requests:', error);
      }
    }
    
    // Calculer les revenus mensuels
    let monthlyRevenue = 0;
    if (savedTransactions) {
      try {
        const transactions = JSON.parse(savedTransactions);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        monthlyRevenue = transactions
          .filter((t: any) => {
            if (t.status !== 'paid') return false;
            // Supprimer les transactions mockées
            if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) return false;
            if (t.id && /^\d+$/.test(t.id) && !t.reservationId) return false;
            if (t.clientEmail && t.clientEmail.includes('example.com') && (!t.reservationId || !t.id?.startsWith('TXN-'))) return false;
            
            const transactionDate = new Date(t.date);
            return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
          })
          .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
    
    // Calculer les sources
    const totalBookings = Object.values(sourcesMap).reduce((sum, count) => sum + count, 0);
    const bestSources = Object.entries(sourcesMap)
      .map(([name, bookings]) => ({
        name,
        percentage: totalBookings > 0 ? Math.round((bookings / totalBookings) * 100) : 0,
        bookings
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);
    
    // Calculer le taux d'occupation (simplifié)
    const occupancyRate = 0; // À calculer selon le nombre de chambres disponibles
    
    // Créer les alertes
    const alertsList: Array<{
      type: string;
      severity: string;
      title: string;
      description: string;
      count: number;
    }> = [];
    
    if (pendingReservations > 0) {
      alertsList.push({
        type: "payment",
        severity: "high",
        title: "Demandes en attente",
        description: `${pendingReservations} demande(s) de réservation en attente de réponse`,
        count: pendingReservations
      });
    }
    
    // Compter les paiements en attente
    if (savedTransactions) {
      try {
        const transactions = JSON.parse(savedTransactions);
        const pendingPayments = transactions.filter((t: any) => {
          if (t.status !== 'pending') return false;
          // Exclure les mockées
          if (t.invoiceId && /INV-20\d{2}-\d{3}/.test(t.invoiceId) && !t.reservationId) return false;
          if (t.id && /^\d+$/.test(t.id) && !t.reservationId) return false;
          if (t.clientEmail && t.clientEmail.includes('example.com') && (!t.reservationId || !t.id?.startsWith('TXN-'))) return false;
          return true;
        }).length;
        
        if (pendingPayments > 0) {
          alertsList.push({
            type: "payment",
            severity: "high",
            title: "Paiements en attente",
            description: `${pendingPayments} transaction(s) avec paiement non confirmé`,
            count: pendingPayments
          });
        }
      } catch (error) {
        console.error('Error loading transactions for alerts:', error);
      }
    }
    
    setDailySummary({
      arrivals,
      departures,
      pendingReservations,
      totalGuests
    });
    
    setKeyIndicators({
      occupancyRate: {
        today: occupancyRate,
        month: occupancyRate,
        trend: "0%"
      },
      monthlyRevenue: {
        current: monthlyRevenue,
        target: 50000,
        trend: "0%"
      },
      bestSources: bestSources.length > 0 ? bestSources : [
        { name: "Aucune donnée", percentage: 0, bookings: 0 }
      ]
    });
    
    setAlerts(alertsList);
    setRecentBookings(recentBookingsList.slice(0, 5));
  };

  const refreshData = () => {
    setLastUpdate(new Date());
    loadDashboardData();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-200 bg-red-50 text-red-800";
      case "medium": return "border-yellow-200 bg-yellow-50 text-yellow-800";
      case "low": return "border-blue-200 bg-blue-50 text-blue-800";
      default: return "border-gray-200 bg-gray-50 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground font-medium">
            Vue d'ensemble immédiate de l'activité • Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
          </p>
        </div>
        <Button 
          onClick={refreshData}
          className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Résumé quotidien */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Arrivées du jour
                  </p>
                  <p className="text-2xl font-bold font-bold text-green-600">
                    {dailySummary.arrivals}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dailySummary.totalGuests} clients
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Départs du jour
                  </p>
                  <p className="text-2xl font-bold font-bold text-blue-600">
                    {dailySummary.departures}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chambres libérées
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <ArrowUpRight className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    En attente
                  </p>
                  <p className="text-2xl font-bold font-bold text-orange-600">
                    {dailySummary.pendingReservations}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Confirmations
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Taux d'occupation
                  </p>
                  <p className="text-2xl font-bold font-bold text-purple-600">
                    {keyIndicators.occupancyRate.today}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {keyIndicators.occupancyRate.trend} vs hier
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Bed className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Indicateurs clés et Sources de réservation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Indicateurs clés */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-medina flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Indicateurs clés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Taux d'occupation */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium font-semibold text-sm">Taux d'occupation</p>
                  <p className="text-xs text-muted-foreground">Mois en cours</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-bold text-indigo-medina">
                    {keyIndicators.occupancyRate.month}%
                  </p>
                  <p className="text-xs text-green-600">+5% vs mois dernier</p>
                </div>
              </div>

              {/* Revenu mensuel */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium font-semibold text-sm">Revenu mensuel</p>
                  <p className="text-xs text-muted-foreground">Objectif: {keyIndicators.monthlyRevenue.target.toLocaleString()} TND</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-bold text-terre-cuite">
                    {keyIndicators.monthlyRevenue.current.toLocaleString()} TND
                  </p>
                  <p className="text-xs text-green-600">{keyIndicators.monthlyRevenue.trend}</p>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-terre-cuite h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(keyIndicators.monthlyRevenue.current / keyIndicators.monthlyRevenue.target) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sources de réservation */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-medina flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Sources de réservation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keyIndicators.bestSources.map((source, index) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-terre-cuite"></div>
                    <span className="font-medium text-sm">{source.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-terre-cuite transition-all duration-500"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium font-semibold w-8">
                        {source.percentage}%
                      </span>
                      <p className="text-xs text-muted-foreground">{source.bookings} réservations</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et Réservations récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alertes */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-medina flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Alertes importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p>Aucune alerte pour le moment</p>
                </div>
              ) : (
                alerts.map((alert, index) => (
                  <Alert key={alert.type} className={getSeverityColor(alert.severity)}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(alert.severity)}
                        <div>
                          <AlertDescription className="font-medium font-semibold">
                            {alert.title}
                          </AlertDescription>
                          <p className="text-xs opacity-75 mt-1">{alert.description}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {alert.count}
                      </Badge>
                    </div>
                  </Alert>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Réservations récentes */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-medina flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Réservations récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>Aucune réservation récente</p>
                </div>
              ) : (
                recentBookings.map((booking, index) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-full">
                        <Users className="w-4 h-4 text-indigo-medina" />
                      </div>
                      <div>
                        <p className="font-medium font-semibold text-sm">{booking.guest}</p>
                        <p className="text-xs text-muted-foreground">{booking.room} • {booking.checkIn}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                      className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {booking.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;