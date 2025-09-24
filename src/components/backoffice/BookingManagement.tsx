import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  MapPin, 
  CreditCard, 
  Mail, 
  Phone, 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/contexts/CurrencyContext";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface Booking {
  id: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  room: {
    title: string;
    pricePerNight: number;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

const BookingManagement = () => {
  const { formatPrice } = useCurrency();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // Charger les réservations depuis localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
    setFilteredBookings(savedBookings);
  }, []);

  // Filtrer les réservations
  useEffect(() => {
    let filtered = bookings;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerInfo.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerInfo.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerInfo.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Filtre par paiement
    if (paymentFilter !== "all") {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchQuery, statusFilter, paymentFilter]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getPaymentBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const exportBookings = () => {
    const csvContent = [
      ['ID', 'Client', 'Email', 'Chambre', 'Arrivée', 'Départ', 'Total', 'Statut', 'Paiement'].join(','),
      ...filteredBookings.map(booking => [
        booking.id,
        `${booking.customerInfo.firstName} ${booking.customerInfo.lastName}`,
        booking.customerInfo.email,
        booking.room.title,
        formatDate(booking.checkIn),
        formatDate(booking.checkOut),
        formatPrice(booking.total),
        booking.status,
        booking.paymentStatus
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* En-tête */}
      <motion.div variants={staggerItem}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-indigo-medina">Gestion des réservations</h1>
            <p className="text-muted-foreground font-inter mt-2">
              Gérez toutes les réservations de votre établissement
            </p>
          </div>
          <Button onClick={exportBookings} className="bg-terre-cuite hover:bg-terre-cuite-hover">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6" variants={staggerItem}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-inter">Total réservations</p>
                <p className="text-2xl font-playfair font-bold text-indigo-medina">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-inter">Confirmées</p>
                <p className="text-2xl font-playfair font-bold text-indigo-medina">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-inter">En attente</p>
                <p className="text-2xl font-playfair font-bold text-indigo-medina">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-terre-cuite/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-terre-cuite" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-inter">Revenus</p>
                <p className="text-2xl font-playfair font-bold text-indigo-medina">
                  {formatPrice(bookings.reduce((sum, b) => sum + b.total, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filtres */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tableau des réservations */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardHeader>
            <CardTitle>Réservations ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Chambre</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-inter font-semibold">
                            {booking.customerInfo.firstName} {booking.customerInfo.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.customerInfo.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-inter">{booking.room.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{formatDate(booking.checkIn)}</p>
                          <p className="text-muted-foreground">au {formatDate(booking.checkOut)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-playfair font-semibold text-terre-cuite">
                        {formatPrice(booking.total)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(booking.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentBadge(booking.paymentStatus)}>
                          <div className="flex items-center space-x-1">
                            <CreditCard className="w-3 h-3" />
                            <span className="capitalize">{booking.paymentStatus}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirmer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Annuler
                            </DropdownMenuItem>
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
      </motion.div>
    </motion.div>
  );
};

export default BookingManagement;
