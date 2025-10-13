// RoomPricing component - Simplifier la gestion des prix selon saisons et canaux
// Contient tableau des tarifs, options & suppléments, offres spéciales
// French only - no translations

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bed, 
  Users, 
  DollarSign, 
  Edit, 
  Save, 
  X, 
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Calendar,
  Coffee,
  Plus,
  Minus,
  Percent,
  Gift,
  Star,
  Settings,
  Copy,
  Trash2
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrency } from "@/contexts/CurrencyContext";
import { roomsData, roomStats } from "@/data/rooms";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { toast } from "sonner";

interface RoomPricingData {
  id: string;
  roomNumber: string;
  title: string;
  category: string;
  characteristic: string;
  pricePerNight: number;
  capacity: number;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  weekendPrice: number;
  weeklyPrice: number;
  breakfastIncluded: boolean;
  cityTax: number;
  extraBedPrice: number;
}

interface SpecialOffer {
  id: string;
  name: string;
  code: string;
  type: 'percentage' | 'fixed' | 'package';
  value: number;
  description: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  applicableRooms: string[];
}

const RoomPricing = () => {
  const { formatPrice } = useCurrency();
  const [pricingData, setPricingData] = useState<RoomPricingData[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("pricing");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomPricingData | null>(null);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);

  // Données simulées - à remplacer par de vraies API calls
  const mockPricingData: RoomPricingData[] = roomsData.map(room => ({
    id: room.id,
    roomNumber: room.roomNumber,
    title: room.title,
    category: room.category,
    characteristic: room.characteristic,
    pricePerNight: room.pricePerNight,
    capacity: room.capacity,
    lowSeasonPrice: Math.round(room.pricePerNight * 0.8), // -20% basse saison
    highSeasonPrice: Math.round(room.pricePerNight * 1.3), // +30% haute saison
    weekendPrice: Math.round(room.pricePerNight * 1.2), // +20% week-end
    weeklyPrice: Math.round(room.pricePerNight * 6), // 7 nuits pour le prix de 6
    breakfastIncluded: room.pricePerNight >= 300, // Petit-déjeuner inclus pour chambres >= 300 TND
    cityTax: 2, // Taxe de séjour fixe
    extraBedPrice: 50 // Lit supplémentaire
  }));

  const mockSpecialOffers: SpecialOffer[] = [
    {
      id: "OFFER-001",
      name: "Réduction longue durée",
      code: "LONGSTAY",
      type: "percentage",
      value: 15,
      description: "15% de réduction pour séjours de 7 nuits ou plus",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      isActive: true,
      applicableRooms: ["ch-11", "ch-12", "ch-13", "ch-14"]
    },
    {
      id: "OFFER-002",
      name: "Pack Expérience Kairouan",
      code: "EXPERIENCE",
      type: "package",
      value: 200,
      description: "Séjour + visite guidée de la Grande Mosquée + cours de cuisine",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      isActive: true,
      applicableRooms: ["suite-klee", "ch-15", "ch-16"]
    },
    {
      id: "OFFER-003",
      name: "Réduction précoce",
      code: "EARLYBIRD",
      type: "percentage",
      value: 10,
      description: "10% de réduction pour réservations 30 jours à l'avance",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      isActive: true,
      applicableRooms: []
    }
  ];

  useEffect(() => {
    // Charger les données depuis localStorage ou utiliser les données simulées
    const savedPricing = localStorage.getItem('roomPricing');
    const savedOffers = localStorage.getItem('specialOffers');
    
    if (savedPricing) {
      setPricingData(JSON.parse(savedPricing));
    } else {
      setPricingData(mockPricingData);
      localStorage.setItem('roomPricing', JSON.stringify(mockPricingData));
    }

    if (savedOffers) {
      setSpecialOffers(JSON.parse(savedOffers));
    } else {
      setSpecialOffers(mockSpecialOffers);
      localStorage.setItem('specialOffers', JSON.stringify(mockSpecialOffers));
    }
  }, []);

  const savePricingData = (updatedData: RoomPricingData[]) => {
    setPricingData(updatedData);
    localStorage.setItem('roomPricing', JSON.stringify(updatedData));
    
    // Trigger custom event to notify other components
    window.dispatchEvent(new CustomEvent('roomPricingUpdated'));
    
    toast.success("Tarifs des chambres mis à jour avec succès");
  };

  const saveSpecialOffers = (updatedOffers: SpecialOffer[]) => {
    setSpecialOffers(updatedOffers);
    localStorage.setItem('specialOffers', JSON.stringify(updatedOffers));
  };

  const filteredRooms = pricingData.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || room.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePriceUpdate = (roomId: string, field: keyof RoomPricingData, value: number | boolean) => {
    const updatedData = pricingData.map(room =>
      room.id === roomId ? { ...room, [field]: value } : room
    );
    savePricingData(updatedData);
    toast.success("Tarif mis à jour");
  };

  const handleOfferToggle = (offerId: string) => {
    const updatedOffers = specialOffers.map(offer =>
      offer.id === offerId ? { ...offer, isActive: !offer.isActive } : offer
    );
    saveSpecialOffers(updatedOffers);
    toast.success("Offre mise à jour");
  };

  const handleDeleteOffer = (offerId: string) => {
    const updatedOffers = specialOffers.filter(offer => offer.id !== offerId);
    saveSpecialOffers(updatedOffers);
    toast.success("Offre supprimée");
  };

  const getOfferTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage': return <Percent className="w-4 h-4" />;
      case 'fixed': return <DollarSign className="w-4 h-4" />;
      case 'package': return <Gift className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getOfferTypeColor = (type: string) => {
    switch (type) {
      case 'percentage': return "bg-blue-100 text-blue-800";
      case 'fixed': return "bg-green-100 text-green-800";
      case 'package': return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-bold text-indigo-medina mb-2">
            Gestion des Tarifs
          </h1>
          <p className="text-muted-foreground font-medium">
            Simplifier la gestion des prix selon saisons et canaux
          </p>
        </div>
        <div className="text-right">
          <div className="bg-logo-gold/10 border border-logo-gold/20 rounded-lg p-3 max-w-xs">
            <div className="flex items-center space-x-2 text-logo-gold mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="font-semibold text-sm">Aide</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Les modifications de prix sont automatiquement synchronisées avec les pages publiques des chambres.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
          <Button 
            onClick={() => setIsEditDialogOpen(true)}
            className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Tarifs par chambre
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            Options & suppléments
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Offres spéciales
          </TabsTrigger>
        </TabsList>

        {/* Tableau des tarifs par chambre */}
        <TabsContent value="pricing" className="mt-6">
          {/* Filtres */}
          <Card className="shadow-sm border-0 bg-card mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher par chambre ou nom..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="DOUBLE">Double</SelectItem>
                    <SelectItem value="TWIN">Twin</SelectItem>
                    <SelectItem value="FAMILIALE">Familiale</SelectItem>
                    <SelectItem value="DOUBLE+L.B">Double + L.B</SelectItem>
                    <SelectItem value="S.ROYALE">Suite Royale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des tarifs */}
          <Card className="shadow-sm border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-medina">
                Tarifs par chambre et saison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chambre</TableHead>
                      <TableHead>Capacité</TableHead>
                      <TableHead>Basse saison</TableHead>
                      <TableHead>Haute saison</TableHead>
                      <TableHead>Week-end</TableHead>
                      <TableHead>Semaine (7j)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium font-semibold">{room.roomNumber}</div>
                            <div className="text-sm text-muted-foreground">{room.title}</div>
                            <Badge variant="outline" className="mt-1">
                              {room.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{room.capacity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={room.lowSeasonPrice}
                              onChange={(e) => handlePriceUpdate(room.id, 'lowSeasonPrice', parseInt(e.target.value))}
                              className="w-20 h-8"
                            />
                            <span className="text-sm text-muted-foreground">TND</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={room.highSeasonPrice}
                              onChange={(e) => handlePriceUpdate(room.id, 'highSeasonPrice', parseInt(e.target.value))}
                              className="w-20 h-8"
                            />
                            <span className="text-sm text-muted-foreground">TND</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={room.weekendPrice}
                              onChange={(e) => handlePriceUpdate(room.id, 'weekendPrice', parseInt(e.target.value))}
                              className="w-20 h-8"
                            />
                            <span className="text-sm text-muted-foreground">TND</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={room.weeklyPrice}
                              onChange={(e) => handlePriceUpdate(room.id, 'weeklyPrice', parseInt(e.target.value))}
                              className="w-20 h-8"
                            />
                            <span className="text-sm text-muted-foreground">TND</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRoom(room);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Informations saisons */}
          <Card className="shadow-sm border-0 bg-card mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-indigo-medina">
                Périodes de saisons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium font-semibold text-blue-800">Basse saison</h3>
                    <p className="text-sm text-blue-600">Novembre - Mars</p>
                    <p className="text-xs text-blue-500">Tarifs réduits (-20%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-medium font-semibold text-orange-800">Haute saison</h3>
                    <p className="text-sm text-orange-600">Juin - Septembre</p>
                    <p className="text-xs text-orange-500">Tarifs majorés (+30%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Options & suppléments */}
        <TabsContent value="options" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Petit-déjeuner */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Petit-déjeuner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingData.map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium font-semibold">{room.roomNumber}</div>
                        <div className="text-sm text-muted-foreground">{room.title}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {room.breakfastIncluded ? "Inclus" : "Supplément"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePriceUpdate(room.id, 'breakfastIncluded', !room.breakfastIncluded)}
                        >
                          {room.breakfastIncluded ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Taxe de séjour */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Taxe de séjour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Taxe de séjour automatiquement calculée et affichée aux clients
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-3">
                    {pricingData.map((room) => (
                      <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium font-semibold">{room.roomNumber}</div>
                          <div className="text-sm text-muted-foreground">{room.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={room.cityTax}
                            onChange={(e) => handlePriceUpdate(room.id, 'cityTax', parseInt(e.target.value))}
                            className="w-16 h-8"
                          />
                          <span className="text-sm text-muted-foreground">TND/nuit</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lit supplémentaire */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  Lit supplémentaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pricingData.map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium font-semibold">{room.roomNumber}</div>
                        <div className="text-sm text-muted-foreground">{room.title}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={room.extraBedPrice}
                          onChange={(e) => handlePriceUpdate(room.id, 'extraBedPrice', parseInt(e.target.value))}
                          className="w-16 h-8"
                        />
                        <span className="text-sm text-muted-foreground">TND/nuit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Résumé des options */}
            <Card className="shadow-sm border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-indigo-medina">
                  Résumé des options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-green-600" />
                      <span className="font-medium font-semibold">Petit-déjeuner inclus</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {pricingData.filter(room => room.breakfastIncluded).length} chambres
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="font-medium font-semibold">Taxe de séjour moyenne</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {Math.round(pricingData.reduce((sum, room) => sum + room.cityTax, 0) / pricingData.length)} TND
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-purple-600" />
                      <span className="font-medium font-semibold">Lit supplémentaire moyen</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {Math.round(pricingData.reduce((sum, room) => sum + room.extraBedPrice, 0) / pricingData.length)} TND
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Offres spéciales */}
        <TabsContent value="offers" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-bold text-indigo-medina">
              Offres spéciales et codes promo
            </h2>
            <Button 
              onClick={() => {
                setEditingOffer(null);
                setIsOfferDialogOpen(true);
              }}
              className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="shadow-sm border-0 bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-indigo-medina">
                      {offer.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingOffer(offer);
                          setIsOfferDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteOffer(offer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getOfferTypeColor(offer.type)}>
                        <div className="flex items-center gap-1">
                          {getOfferTypeIcon(offer.type)}
                          {offer.type === 'percentage' ? `${offer.value}%` : 
                           offer.type === 'fixed' ? `${offer.value} TND` : 
                           'Pack'}
                        </div>
                      </Badge>
                      <Badge variant={offer.isActive ? "default" : "secondary"}>
                        {offer.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold">Code promo</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {offer.code}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(offer.code);
                            toast.success("Code copié");
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold">Validité</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(offer.validFrom).toLocaleDateString('fr-FR')} - {new Date(offer.validTo).toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={offer.isActive ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleOfferToggle(offer.id)}
                        className="flex-1"
                      >
                        {offer.isActive ? "Désactiver" : "Activer"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de configuration des tarifs */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-medina">
              Configuration des tarifs
            </DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium font-semibold text-lg mb-3">
                  {selectedRoom.roomNumber} - {selectedRoom.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prix basse saison</Label>
                    <Input
                      type="number"
                      value={selectedRoom.lowSeasonPrice}
                      onChange={(e) => setSelectedRoom({...selectedRoom, lowSeasonPrice: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Prix haute saison</Label>
                    <Input
                      type="number"
                      value={selectedRoom.highSeasonPrice}
                      onChange={(e) => setSelectedRoom({...selectedRoom, highSeasonPrice: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Prix week-end</Label>
                    <Input
                      type="number"
                      value={selectedRoom.weekendPrice}
                      onChange={(e) => setSelectedRoom({...selectedRoom, weekendPrice: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Prix semaine (7j)</Label>
                    <Input
                      type="number"
                      value={selectedRoom.weeklyPrice}
                      onChange={(e) => setSelectedRoom({...selectedRoom, weeklyPrice: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                  onClick={() => {
                    handlePriceUpdate(selectedRoom.id, 'lowSeasonPrice', selectedRoom.lowSeasonPrice);
                    handlePriceUpdate(selectedRoom.id, 'highSeasonPrice', selectedRoom.highSeasonPrice);
                    handlePriceUpdate(selectedRoom.id, 'weekendPrice', selectedRoom.weekendPrice);
                    handlePriceUpdate(selectedRoom.id, 'weeklyPrice', selectedRoom.weeklyPrice);
                    setIsEditDialogOpen(false);
                  }}
                >
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'ajout/modification d'offre */}
      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-medina">
              {editingOffer ? "Modifier l'offre" : "Nouvelle offre spéciale"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="offerName">Nom de l'offre</Label>
                <Input id="offerName" placeholder="Ex: Réduction longue durée" />
              </div>
              <div>
                <Label htmlFor="offerCode">Code promo</Label>
                <Input id="offerCode" placeholder="Ex: LONGSTAY" />
              </div>
              <div>
                <Label htmlFor="offerType">Type d'offre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage</SelectItem>
                    <SelectItem value="fixed">Montant fixe</SelectItem>
                    <SelectItem value="package">Pack séjour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="offerValue">Valeur</Label>
                <Input id="offerValue" type="number" placeholder="15" />
              </div>
              <div>
                <Label htmlFor="validFrom">Valide du</Label>
                <Input id="validFrom" type="date" />
              </div>
              <div>
                <Label htmlFor="validTo">Valide jusqu'au</Label>
                <Input id="validTo" type="date" />
              </div>
            </div>
            <div>
              <Label htmlFor="offerDescription">Description</Label>
              <Textarea id="offerDescription" placeholder="Description de l'offre..." />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsOfferDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                className="bg-terre-cuite hover:bg-terre-cuite-hover text-white"
                onClick={() => {
                  toast.success(editingOffer ? "Offre modifiée" : "Nouvelle offre créée");
                  setIsOfferDialogOpen(false);
                }}
              >
                {editingOffer ? "Modifier" : "Créer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomPricing;
