// ReservationManagement component - Centraliser et gérer toutes les réservations
// Contient calendrier interactif, détails des réservations et actions rapides
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Bed, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Wrench,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Plus,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Mail,
  Phone,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  depositPaid: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  source: string;
  notes?: string;
  createdAt: string;
}

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 1)); // Septembre 2025
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("calendar");

  // Données simulées - à remplacer par de vraies API calls
  const mockReservations: Reservation[] = [
    // SEPTEMBRE 2025
    {
      id: "RES-001",
      guestName: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      checkIn: "2025-09-15",
      checkOut: "2025-09-18",
      roomId: "ch-11",
      roomNumber: "CH 11",
      roomType: "Chambre Double",
      guests: 2,
      status: "confirmed",
      totalAmount: 600,
      depositPaid: 200,
      paymentStatus: "partial",
      source: "Site Web",
      notes: "Client VIP, préfère étage haut",
      createdAt: "2025-09-10T10:30:00Z"
    },
    {
      id: "RES-002",
      guestName: "Ahmed Ben Ali",
      email: "ahmed.benali@email.com",
      phone: "+216 98 76 54 32",
      checkIn: "2025-09-20",
      checkOut: "2025-09-23",
      roomId: "ch-12",
      roomNumber: "CH 12",
      roomType: "Chambre Twin",
      guests: 1,
      status: "pending",
      totalAmount: 800,
      depositPaid: 0,
      paymentStatus: "pending",
      source: "Booking.com",
      notes: "Arrivée tardive prévue",
      createdAt: "2025-09-12T14:20:00Z"
    },
    {
      id: "RES-003",
      guestName: "Sophie Martin",
      email: "sophie.martin@email.com",
      phone: "+33 6 98 76 54 32",
      checkIn: "2025-09-25",
      checkOut: "2025-09-28",
      roomId: "suite-klee",
      roomNumber: "Suite Klee",
      roomType: "Suite Royale",
      guests: 2,
      status: "confirmed",
      totalAmount: 1500,
      depositPaid: 1500,
      paymentStatus: "paid",
      source: "Airbnb",
      notes: "Anniversaire de mariage",
      createdAt: "2025-09-08T09:15:00Z"
    },
    
    // OCTOBRE 2025 - 3 PREMIÈRES SEMAINES REMPLIES
    {
      id: "RES-004",
      guestName: "Jean-Pierre Moreau",
      email: "jp.moreau@email.com",
      phone: "+33 6 11 22 33 44",
      checkIn: "2025-10-01",
      checkOut: "2025-10-03",
      roomId: "ch-13",
      roomNumber: "CH 13",
      roomType: "Chambre Familiale",
      guests: 4,
      status: "confirmed",
      totalAmount: 400,
      depositPaid: 400,
      paymentStatus: "paid",
      source: "Téléphone",
      notes: "Week-end en famille",
      createdAt: "2025-09-25T16:45:00Z"
    },
    {
      id: "RES-005",
      guestName: "Fatma Khelil",
      email: "fatma.khelil@email.com",
      phone: "+216 55 12 34 56",
      checkIn: "2025-10-02",
      checkOut: "2025-10-05",
      roomId: "ch-14",
      roomNumber: "CH 14",
      roomType: "Chambre Double + L.B",
      guests: 3,
      status: "confirmed",
      totalAmount: 500,
      depositPaid: 500,
      paymentStatus: "paid",
      source: "Site Web",
      notes: "Famille avec enfant",
      createdAt: "2025-09-20T11:20:00Z"
    },
    {
      id: "RES-006",
      guestName: "Pierre Durand",
      email: "pierre.durand@email.com",
      phone: "+33 6 99 88 77 66",
      checkIn: "2025-10-04",
      checkOut: "2025-10-07",
      roomId: "ch-15",
      roomNumber: "CH 15",
      roomType: "Chambre Twin",
      guests: 2,
      status: "confirmed",
      totalAmount: 400,
      depositPaid: 400,
      paymentStatus: "paid",
      source: "Booking.com",
      notes: "Séjour découverte",
      createdAt: "2025-09-18T14:30:00Z"
    },
    {
      id: "RES-007",
      guestName: "Isabelle Rousseau",
      email: "isabelle.rousseau@email.com",
      phone: "+33 6 44 55 66 77",
      checkIn: "2025-10-06",
      checkOut: "2025-10-09",
      roomId: "ch-16",
      roomNumber: "CH 16",
      roomType: "Chambre Double",
      guests: 2,
      status: "confirmed",
      totalAmount: 600,
      depositPaid: 600,
      paymentStatus: "paid",
      source: "Site Web",
      notes: "Escapade romantique",
      createdAt: "2025-09-22T09:15:00Z"
    },
    {
      id: "RES-008",
      guestName: "Mohamed Trabelsi",
      email: "mohamed.trabelsi@email.com",
      phone: "+216 22 33 44 55",
      checkIn: "2025-10-08",
      checkOut: "2025-10-11",
      roomId: "ch-17",
      roomNumber: "CH 17",
      roomType: "Chambre Twin",
      guests: 2,
      status: "pending",
      totalAmount: 450,
      depositPaid: 0,
      paymentStatus: "pending",
      source: "Airbnb",
      notes: "Voyage d'affaires",
      createdAt: "2025-09-28T16:20:00Z"
    },
    {
      id: "RES-009",
      guestName: "Claire Dubois",
      email: "claire.dubois@email.com",
      phone: "+33 6 77 88 99 00",
      checkIn: "2025-10-10",
      checkOut: "2025-10-13",
      roomId: "ch-18",
      roomNumber: "CH 18",
      roomType: "Chambre Familiale",
      guests: 4,
      status: "confirmed",
      totalAmount: 800,
      depositPaid: 800,
      paymentStatus: "paid",
      source: "Booking.com",
      notes: "Vacances scolaires",
      createdAt: "2025-09-15T12:30:00Z"
    },
    {
      id: "RES-010",
      guestName: "Karim Ben Salem",
      email: "karim.bensalem@email.com",
      phone: "+216 99 88 77 66",
      checkIn: "2025-10-12",
      checkOut: "2025-10-15",
      roomId: "ch-19",
      roomNumber: "CH 19",
      roomType: "Chambre Double + L.B",
      guests: 3,
      status: "confirmed",
      totalAmount: 550,
      depositPaid: 550,
      paymentStatus: "paid",
      source: "Site Web",
      notes: "Famille avec bébé",
      createdAt: "2025-09-20T14:45:00Z"
    },
    {
      id: "RES-011",
      guestName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 555 123 4567",
      checkIn: "2025-10-14",
      checkOut: "2025-10-17",
      roomId: "suite-klee",
      roomNumber: "Suite Klee",
      roomType: "Suite Royale",
      guests: 2,
      status: "confirmed",
      totalAmount: 1200,
      depositPaid: 1200,
      paymentStatus: "paid",
      source: "Expedia",
      notes: "Honeymoon trip",
      createdAt: "2025-09-10T08:00:00Z"
    },
    {
      id: "RES-012",
      guestName: "François Leroy",
      email: "francois.leroy@email.com",
      phone: "+33 6 11 22 33 44",
      checkIn: "2025-10-16",
      checkOut: "2025-10-19",
      roomId: "ch-20",
      roomNumber: "CH 20",
      roomType: "Chambre Twin",
      guests: 2,
      status: "pending",
      totalAmount: 400,
      depositPaid: 200,
      paymentStatus: "partial",
      source: "Téléphone",
      notes: "Séjour découverte Kairouan",
      createdAt: "2025-09-25T10:15:00Z"
    },
    {
      id: "RES-013",
      guestName: "Amina Khelil",
      email: "amina.khelil@email.com",
      phone: "+216 55 66 77 88",
      checkIn: "2025-10-18",
      checkOut: "2025-10-21",
      roomId: "ch-21",
      roomNumber: "CH 21",
      roomType: "Chambre Double",
      guests: 2,
      status: "confirmed",
      totalAmount: 500,
      depositPaid: 500,
      paymentStatus: "paid",
      source: "Site Web",
      notes: "Anniversaire de mariage",
      createdAt: "2025-09-12T15:30:00Z"
    },
    {
      id: "RES-014",
      guestName: "Thomas Müller",
      email: "thomas.muller@email.com",
      phone: "+49 30 123 456 78",
      checkIn: "2025-10-20",
      checkOut: "2025-10-23",
      roomId: "ch-22",
      roomNumber: "CH 22",
      roomType: "Chambre Familiale",
      guests: 4,
      status: "confirmed",
      totalAmount: 750,
      depositPaid: 750,
      paymentStatus: "paid",
      source: "Booking.com",
      notes: "Family vacation from Germany",
      createdAt: "2025-09-05T11:20:00Z"
    },
    {
      id: "RES-015",
      guestName: "Elena Rodriguez",
      email: "elena.rodriguez@email.com",
      phone: "+34 91 123 45 67",
      checkIn: "2025-10-22",
      checkOut: "2025-10-25",
      roomId: "ch-23",
      roomNumber: "CH 23",
      roomType: "Chambre Double + L.B",
      guests: 3,
      status: "confirmed",
      totalAmount: 600,
      depositPaid: 600,
      paymentStatus: "paid",
      source: "Airbnb",
      notes: "Cultural trip from Spain",
      createdAt: "2025-09-18T13:45:00Z"
    }
  ];

  useEffect(() => {
    // Forcer le rechargement des données mockées
    localStorage.removeItem('reservations'); // Vider le cache
    setReservations(mockReservations);
    localStorage.setItem('reservations', JSON.stringify(mockReservations));
    console.log('Réservations mockées rechargées:', mockReservations);
  }, []);

  const saveReservations = (updatedReservations: Reservation[]) => {
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmée</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Annulée</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>;
      case 'partial':
        return <Badge className="bg-orange-100 text-orange-800">Acompte</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-800">En attente</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        reservation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (reservationId: string, newStatus: string) => {
    const updatedReservations = reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, status: newStatus as Reservation['status'] }
        : reservation
    );
    saveReservations(updatedReservations);
    toast.success(`Statut de la réservation mis à jour`);
  };

  const handleDeleteReservation = (reservationId: string) => {
    const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId);
    saveReservations(updatedReservations);
    toast.success(`Réservation supprimée`);
  };

  const sendConfirmationEmail = (reservation: Reservation) => {
    // Simulation d'envoi d'email
    toast.success(`Email de confirmation envoyé à ${reservation.email}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    return `${amount} TND`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getReservationsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayReservations = reservations.filter(reservation => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
      // Normaliser les dates pour la comparaison (enlever les heures)
      const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const normalizedCheckIn = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
      const normalizedCheckOut = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
      
      // Vérifier si la date est dans la période de séjour (inclus le jour d'arrivée, exclut le jour de départ)
      const isInRange = normalizedDate >= normalizedCheckIn && normalizedDate < normalizedCheckOut;
      
      // Debug pour toutes les réservations
      console.log(`Vérification date ${dateString} pour ${reservation.guestName}:`, {
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        normalizedDate: normalizedDate.toISOString().split('T')[0],
        normalizedCheckIn: normalizedCheckIn.toISOString().split('T')[0],
        normalizedCheckOut: normalizedCheckOut.toISOString().split('T')[0],
        isInRange
      });
      
      return isInRange;
    });
    
    return dayReservations;
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
    const days = [];
    
    // Debug du calendrier
    console.log(`Rendu calendrier pour ${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`, {
      totalReservations: reservations.length,
      reservations: reservations.map(r => `${r.guestName}: ${r.checkIn} - ${r.checkOut}`)
    });
    
    // Jours du mois précédent
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`prev-${i}`} className="h-24"></div>);
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dayReservations = getReservationsForDate(currentDate);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      
      // Debug pour les jours avec réservations
      if (dayReservations.length > 0) {
        console.log(`Jour ${day}: ${dayReservations.length} réservation(s)`, dayReservations.map(r => r.guestName));
      }
      
      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${
            isToday ? 'bg-terre-cuite/10' : 'bg-white'
          } hover:bg-gray-50 cursor-pointer`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-terre-cuite font-bold' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayReservations.slice(0, 2).map((reservation) => (
              <div
                key={reservation.id}
                className={`text-xs p-1 rounded truncate cursor-pointer ${
                  reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
                onClick={() => {
                  setSelectedReservation(reservation);
                  setIsDialogOpen(true);
                }}
              >
                {reservation.guestName} - {reservation.roomNumber}
              </div>
            ))}
            {dayReservations.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayReservations.length - 2} autres
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina mb-2">
            Gestion des Réservations
          </h1>
          <p className="text-muted-foreground font-inter">
            Centraliser et gérer toutes les réservations
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle réservation
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Calendrier
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Liste
          </TabsTrigger>
        </TabsList>

        {/* Calendrier */}
        <TabsContent value="calendar" className="mt-6">
          <Card className="shadow-sm border-0 bg-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-playfair text-indigo-medina">
                  Calendrier des réservations
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-inter font-semibold min-w-[120px] text-center">
                      {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Jour</SelectItem>
                      <SelectItem value="week">Semaine</SelectItem>
                      <SelectItem value="month">Mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* En-têtes des jours */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} className="p-2 text-center font-inter font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {renderCalendar()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Liste des réservations */}
        <TabsContent value="list" className="mt-6">
          {/* Filtres et recherche */}
          <Card className="shadow-sm border-0 bg-card mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher par nom, email ou chambre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="confirmed">Confirmées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des réservations */}
          <Card className="shadow-sm border-0 bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Chambre</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <div className="font-inter font-semibold">{reservation.guestName}</div>
                          <div className="text-sm text-muted-foreground">{reservation.email}</div>
                          <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Arrivée: {formatDate(reservation.checkIn)}</div>
                          <div>Départ: {formatDate(reservation.checkOut)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-inter font-semibold">{reservation.roomNumber}</div>
                          <div className="text-sm text-muted-foreground">{reservation.roomType}</div>
                          <div className="text-sm text-muted-foreground">{reservation.guests} personne(s)</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(reservation.paymentStatus)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-semibold">{formatCurrency(reservation.totalAmount)}</div>
                          <div className="text-muted-foreground">Acompte: {formatCurrency(reservation.depositPaid)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedReservation(reservation);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendConfirmationEmail(reservation)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Select value={reservation.status} onValueChange={(value) => handleStatusChange(reservation.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirmée</SelectItem>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de détail de réservation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-indigo-medina">
              Détail de la réservation
            </DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-6">
              {/* Informations client */}
              <div>
                <h3 className="font-inter font-semibold text-lg mb-3">Informations client</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nom complet</Label>
                    <div className="font-inter">{selectedReservation.guestName}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="font-inter">{selectedReservation.email}</div>
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <div className="font-inter">{selectedReservation.phone}</div>
                  </div>
                  <div>
                    <Label>Source</Label>
                    <div className="font-inter">{selectedReservation.source}</div>
                  </div>
                </div>
              </div>

              {/* Informations séjour */}
              <div>
                <h3 className="font-inter font-semibold text-lg mb-3">Informations séjour</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Dates</Label>
                    <div className="font-inter">
                      {formatDate(selectedReservation.checkIn)} - {formatDate(selectedReservation.checkOut)}
                    </div>
                  </div>
                  <div>
                    <Label>Chambre</Label>
                    <div className="font-inter">{selectedReservation.roomNumber} - {selectedReservation.roomType}</div>
                  </div>
                  <div>
                    <Label>Nombre de personnes</Label>
                    <div className="font-inter">{selectedReservation.guests}</div>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <div>{getStatusBadge(selectedReservation.status)}</div>
                  </div>
                </div>
              </div>

              {/* Informations financières */}
              <div>
                <h3 className="font-inter font-semibold text-lg mb-3">Informations financières</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Montant total</Label>
                    <div className="font-inter font-semibold text-lg">{formatCurrency(selectedReservation.totalAmount)}</div>
                  </div>
                  <div>
                    <Label>Acompte payé</Label>
                    <div className="font-inter font-semibold text-lg">{formatCurrency(selectedReservation.depositPaid)}</div>
                  </div>
                  <div>
                    <Label>Statut paiement</Label>
                    <div>{getPaymentStatusBadge(selectedReservation.paymentStatus)}</div>
                  </div>
                  <div>
                    <Label>Solde restant</Label>
                    <div className="font-inter font-semibold text-lg">
                      {formatCurrency(selectedReservation.totalAmount - selectedReservation.depositPaid)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedReservation.notes && (
                <div>
                  <Label>Notes</Label>
                  <div className="font-inter p-3 bg-gray-50 rounded-lg">
                    {selectedReservation.notes}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => sendConfirmationEmail(selectedReservation)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer confirmation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Logique d'édition
                    toast.success("Modification de la réservation");
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteReservation(selectedReservation.id);
                    setIsDialogOpen(false);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'ajout de réservation */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-indigo-medina">
              Nouvelle réservation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestName">Nom complet</Label>
                <Input id="guestName" placeholder="Nom du client" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+33 6 12 34 56 78" />
              </div>
              <div>
                <Label htmlFor="room">Chambre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une chambre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ch-11">CH 11 - Chambre Double</SelectItem>
                    <SelectItem value="ch-12">CH 12 - Chambre Twin</SelectItem>
                    <SelectItem value="suite-klee">Suite Klee - Suite Royale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="checkIn">Date d'arrivée</Label>
                <Input id="checkIn" type="date" />
              </div>
              <div>
                <Label htmlFor="checkOut">Date de départ</Label>
                <Input id="checkOut" type="date" />
              </div>
              <div>
                <Label htmlFor="guests">Nombre de personnes</Label>
                <Input id="guests" type="number" min="1" max="6" />
              </div>
              <div>
                <Label htmlFor="source">Source</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Source de réservation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site">Site Web</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="airbnb">Airbnb</SelectItem>
                    <SelectItem value="phone">Téléphone</SelectItem>
                    <SelectItem value="walk-in">Sur place</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Notes spéciales..." />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                onClick={() => {
                  toast.success("Nouvelle réservation créée");
                  setIsAddDialogOpen(false);
                }}
              >
                Créer la réservation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationManagement;