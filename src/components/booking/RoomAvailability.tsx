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
  Star,
  Eye,
  BookOpen
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
import { useCurrency } from "@/contexts/CurrencyContext";
import { 
  initialRoomAvailability, 
  getRoomStatus, 
  getAvailableRooms,
  type RoomAvailability 
} from "@/data/roomAvailability";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface RoomAvailabilityProps {
  checkIn: string;
  checkOut: string;
  onRoomSelect: (room: RoomAvailability) => void;
}

const RoomAvailability = ({ checkIn, checkOut, onRoomSelect }: RoomAvailabilityProps) => {
  const { formatPrice } = useCurrency();
  const [rooms, setRooms] = useState<RoomAvailability[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<RoomAvailability[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Charger les données des chambres avec leur statut
  useEffect(() => {
    const roomsWithStatus = initialRoomAvailability.map(room => ({
      ...room,
      status: getRoomStatus(room.roomId, checkIn) as RoomAvailability['status']
    }));
    setRooms(roomsWithStatus);
    setFilteredRooms(roomsWithStatus);
  }, [checkIn, checkOut]);

  // Filtrer les chambres
  useEffect(() => {
    let filtered = rooms;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (categoryFilter !== "all") {
      filtered = filtered.filter(room => room.category === categoryFilter);
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(room => room.status === statusFilter);
    }

    setFilteredRooms(filtered);
  }, [rooms, searchQuery, categoryFilter, statusFilter]);

  const getStatusBadge = (status: RoomAvailability['status']) => {
    const variants = {
      available: "bg-green-100 text-green-800",
      occupied: "bg-red-100 text-red-800",
      reserved: "bg-yellow-100 text-yellow-800",
      maintenance: "bg-gray-100 text-gray-800",
    };
    return variants[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: RoomAvailability['status']) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <XCircle className="w-4 h-4" />;
      case 'reserved': return <Clock className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: RoomAvailability['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Occupée';
      case 'reserved': return 'Réservée';
      case 'maintenance': return 'Maintenance';
      default: return 'Inconnu';
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      "DOUBLE": "bg-blue-100 text-blue-800",
      "TWIN": "bg-green-100 text-green-800",
      "FAMILIALE": "bg-purple-100 text-purple-800",
      "DOUBLE+L.B": "bg-orange-100 text-orange-800",
      "S.ROYALE": "bg-red-100 text-red-800",
    };
    return variants[category as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const availableRooms = rooms.filter(room => room.status === 'available');
  const occupiedRooms = rooms.filter(room => room.status === 'occupied');
  const reservedRooms = rooms.filter(room => room.status === 'reserved');

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* En-tête avec statistiques */}
      <motion.div variants={staggerItem}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-bold text-indigo-medina">Disponibilité des chambres</h2>
            <p className="text-muted-foreground font-medium mt-2">
              Du {new Date(checkIn).toLocaleDateString('fr-FR')} au {new Date(checkOut).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4" variants={staggerItem}>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Disponibles</p>
                <p className="text-xl font-bold font-bold text-indigo-medina">{availableRooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Occupées</p>
                <p className="text-xl font-bold font-bold text-indigo-medina">{occupiedRooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Réservées</p>
                <p className="text-xl font-bold font-bold text-indigo-medina">{reservedRooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-terre-cuite/20 rounded-lg flex items-center justify-center">
                <Bed className="w-5 h-5 text-terre-cuite" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total</p>
                <p className="text-xl font-bold font-bold text-indigo-medina">{rooms.length}</p>
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
                    placeholder="Rechercher par numéro, nom ou catégorie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="DOUBLE">Double</SelectItem>
                  <SelectItem value="TWIN">Twin</SelectItem>
                  <SelectItem value="FAMILIALE">Familiale</SelectItem>
                  <SelectItem value="DOUBLE+L.B">Double+L.B</SelectItem>
                  <SelectItem value="S.ROYALE">Suite Royale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Occupée</SelectItem>
                  <SelectItem value="reserved">Réservée</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grille des chambres */}
      <motion.div variants={staggerItem}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <motion.div
              key={room.roomId}
              className="group"
              variants={staggerItem}
            >
              <Card className={`overflow-hidden transition-all duration-300 ${
                room.status === 'available' 
                  ? 'hover:shadow-lg cursor-pointer border-green-200' 
                  : 'opacity-75 border-gray-200'
              }`}>
                {/* Image de la chambre */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image || "/chambre 1.png"}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge de statut */}
                  <div className="absolute top-3 left-3">
                    <Badge className={getStatusBadge(room.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(room.status)}
                        <span className="text-xs">{getStatusText(room.status)}</span>
                      </div>
                    </Badge>
                  </div>

                  {/* Badge de catégorie */}
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryBadge(room.category)}>
                      {room.category}
                    </Badge>
                  </div>

                  {/* Prix */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="font-bold font-bold text-terre-cuite text-sm">
                      {formatPrice(room.pricePerNight)}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Nom et numéro */}
                    <div>
                      <h3 className="font-bold font-bold text-indigo-medina text-lg">
                        {room.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {room.roomNumber}
                      </p>
                    </div>

                    {/* Capacité */}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity} {room.capacity === 1 ? 'personne' : 'personnes'}</span>
                    </div>

                    {/* Actions */}
                    <div className="pt-2">
                      {room.status === 'available' ? (
                        <Button
                          onClick={() => onRoomSelect(room)}
                          className="w-full bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                          size="sm"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Réserver
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          size="sm"
                          disabled
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Non disponible
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Message si aucune chambre trouvée */}
      {filteredRooms.length === 0 && (
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold font-semibold text-indigo-medina">
                  Aucune chambre trouvée
                </h3>
                <p className="text-muted-foreground font-medium">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomAvailability;
