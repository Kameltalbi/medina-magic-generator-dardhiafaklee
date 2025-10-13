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

  // Données simulées - à remplacer par de vraies API calls
  const dailySummary = {
    arrivals: 8,
    departures: 6,
    pendingReservations: 3,
    totalGuests: 24
  };

  const keyIndicators = {
    occupancyRate: {
      today: 78,
      month: 82,
      trend: "+5%"
    },
    monthlyRevenue: {
      current: 45680,
      target: 50000,
      trend: "+12%"
    },
    bestSources: [
      { name: "Site Web", percentage: 35, bookings: 45 },
      { name: "Booking.com", percentage: 28, bookings: 36 },
      { name: "Airbnb", percentage: 20, bookings: 26 },
      { name: "Référencement", percentage: 12, bookings: 15 },
      { name: "Autres", percentage: 5, bookings: 6 }
    ]
  };

  const alerts = [
    {
      type: "payment",
      severity: "high",
      title: "Paiements en retard",
      description: "3 réservations avec paiements non confirmés",
      count: 3
    },
    {
      type: "pricing",
      severity: "medium",
      title: "Tarifs à mettre à jour",
      description: "Tarifs haute saison non configurés pour décembre",
      count: 1
    },
    {
      type: "reviews",
      severity: "low",
      title: "Nouveaux avis clients",
      description: "5 nouveaux avis à traiter",
      count: 5
    }
  ];

  const recentBookings = [
    { id: "BK-001", guest: "Marie Dubois", room: "CH 11", checkIn: "Aujourd'hui", status: "confirmed" },
    { id: "BK-002", guest: "Ahmed Ben Ali", room: "CH 12", checkIn: "Demain", status: "pending" },
    { id: "BK-003", guest: "Sophie Martin", room: "Suite Klee", checkIn: "Demain", status: "confirmed" }
  ];

  const refreshData = () => {
    setLastUpdate(new Date());
    // Ici on ferait un appel API pour actualiser les données
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
              {alerts.map((alert, index) => (
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
              ))}
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
              {recentBookings.map((booking, index) => (
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;