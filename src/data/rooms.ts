import type { Room } from "@/lib/types";

// Données des 13 chambres de Dar Dhiafa Klee (CH 11 à CH 23)
export const roomsData: Room[] = [
  // Chambres DOUBLE (5 chambres)
  {
    id: "ch-11",
    roomNumber: "CH 11",
    title: "KOTB (قطب)",
    pricePerNight: 200, // TND
    image: "/chambre 1.png",
    description: "Chambre double avec lit double, décorée dans l'esprit traditionnel tunisien.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "TV écran plat", "Coffre-fort"],
    size: "25m²",
    capacity: 2,
    rating: 4.7,
    reviews: 89,
    features: ["Lit double", "Décoration traditionnelle", "Vue cour intérieure"],
    category: "DOUBLE",
    characteristic: "lit double"
  },
  {
    id: "ch-16",
    roomNumber: "CH 16",
    title: "KMAR (قمر)",
    pricePerNight: 200, // TND
    image: "/chambre 1.png",
    description: "Chambre double avec lit double, ambiance romantique et vue sur la médina.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Vue médina", "Service thé"],
    size: "26m²",
    capacity: 2,
    rating: 4.8,
    reviews: 112,
    features: ["Lit double", "Vue médina", "Ambiance romantique"],
    category: "DOUBLE",
    characteristic: "lit double"
  },
  {
    id: "ch-18",
    roomNumber: "CH 18",
    title: "OULOU (علو)",
    pricePerNight: 200, // TND
    image: "/chambre 1.png",
    description: "Chambre double avec lit double, située à l'étage avec vue panoramique.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Vue panoramique", "Balcon"],
    size: "27m²",
    capacity: 2,
    rating: 4.6,
    reviews: 95,
    features: ["Lit double", "Vue panoramique", "Balcon privé"],
    category: "DOUBLE",
    characteristic: "lit double"
  },
  {
    id: "ch-23",
    roomNumber: "CH 23",
    title: "NOUR (نور)",
    pricePerNight: 200, // TND
    image: "/chambre 1.png",
    description: "Chambre double avec lit double, baignée de lumière naturelle.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Lumière naturelle", "Fenêtres grandes"],
    size: "28m²",
    capacity: 2,
    rating: 4.7,
    reviews: 78,
    features: ["Lit double", "Lumière naturelle", "Fenêtres grandes"],
    category: "DOUBLE",
    characteristic: "lit double"
  },

  // Chambres TWIN (4 chambres)
  {
    id: "ch-13",
    roomNumber: "CH 13",
    title: "BAHA (بهاء)",
    pricePerNight: 150, // TND
    image: "/chambre 1.png",
    description: "Chambre twin avec 2 lits single séparés, parfaite pour les amis ou collègues.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 lits single", "TV écran plat", "Coffre-fort"],
    size: "24m²",
    capacity: 2,
    rating: 4.5,
    reviews: 67,
    features: ["2 lits single", "Espace séparé", "Idéal amis"],
    category: "TWIN",
    characteristic: "2 lits single séparés"
  },
  {
    id: "ch-14",
    roomNumber: "CH 14",
    title: "WED (ود)",
    pricePerNight: 150, // TND
    image: "/chambre 1.png",
    description: "Chambre twin avec 2 lits single séparés, ambiance chaleureuse et accueillante.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 lits single", "Décoration chaleureuse", "Service thé"],
    size: "25m²",
    capacity: 2,
    rating: 4.6,
    reviews: 82,
    features: ["2 lits single", "Ambiance chaleureuse", "Décoration accueillante"],
    category: "TWIN",
    characteristic: "2 lits single séparés"
  },
  {
    id: "ch-20",
    roomNumber: "CH 20",
    title: "CHGHAF (شغف)",
    pricePerNight: 150, // TND
    image: "/chambre 1.png",
    description: "Chambre twin avec 2 lits single séparés, décorée avec passion et attention aux détails.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 lits single", "Décoration soignée", "Minibar"],
    size: "26m²",
    capacity: 2,
    rating: 4.7,
    reviews: 91,
    features: ["2 lits single", "Décoration soignée", "Attention détails"],
    category: "TWIN",
    characteristic: "2 lits single séparés"
  },
  {
    id: "ch-21",
    roomNumber: "CH 21",
    title: "BARIK (بريق)",
    pricePerNight: 150, // TND
    image: "/chambre 1.png",
    description: "Chambre twin avec 2 lits single séparés, brillante et moderne.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 lits single", "Style moderne", "Éclairage LED"],
    size: "25m²",
    capacity: 2,
    rating: 4.5,
    reviews: 73,
    features: ["2 lits single", "Style moderne", "Éclairage LED"],
    category: "TWIN",
    characteristic: "2 lits single séparés"
  },

  // Chambres FAMILIALE (2 chambres)
  {
    id: "ch-12",
    roomNumber: "CH 12",
    title: "HAYET (حياة)",
    pricePerNight: 320, // TND
    image: "/chambre 2.png",
    description: "Chambre familiale avec 2 grands lits, parfaite pour les familles avec enfants.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 grands lits", "Espace famille", "TV écran plat", "Coffre-fort"],
    size: "35m²",
    capacity: 4,
    rating: 4.8,
    reviews: 124,
    features: ["2 grands lits", "Espace famille", "Idéal enfants"],
    category: "FAMILIALE",
    characteristic: "2 grands lits"
  },
  {
    id: "ch-19",
    roomNumber: "CH 19",
    title: "HOUYEM (هيام)",
    pricePerNight: 320, // TND
    image: "/chambre 2.png",
    description: "Chambre familiale avec 2 grands lits, spacieuse et confortable pour toute la famille.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "2 grands lits", "Espace spacieux", "Minibar", "Service famille"],
    size: "38m²",
    capacity: 4,
    rating: 4.9,
    reviews: 156,
    features: ["2 grands lits", "Espace spacieux", "Service famille"],
    category: "FAMILIALE",
    characteristic: "2 grands lits"
  },

  // Chambre DOUBLE+L.B (1 chambre)
  {
    id: "ch-15",
    roomNumber: "CH 15",
    title: "HILAL (هلال)",
    pricePerNight: 250, // TND
    image: "/chambre 2.png",
    description: "Chambre double avec lit bébé, idéale pour les familles avec bébé.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Lit bébé", "Espace famille", "Service bébé"],
    size: "30m²",
    capacity: 3,
    rating: 4.7,
    reviews: 98,
    features: ["Lit double", "Lit bébé", "Service bébé"],
    category: "DOUBLE+L.B",
    characteristic: "Lit double + lit bébé"
  },

  // Suites ROYALE (2 suites)
  {
    id: "ch-17",
    roomNumber: "CH 17",
    title: "ICHK (عشق)",
    pricePerNight: 350, // TND
    image: "/chambre 2.png",
    description: "Suite royale avec lit double et salon privé, pour un séjour d'exception.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Salon privé", "Minibar", "Service VIP", "Peignoirs"],
    size: "45m²",
    capacity: 3,
    rating: 4.9,
    reviews: 134,
    features: ["Lit double", "Salon privé", "Service VIP"],
    category: "S.ROYALE",
    characteristic: "Lit double + salon"
  },
  {
    id: "ch-22",
    roomNumber: "CH 22",
    title: "SEHR (سحر)",
    pricePerNight: 350, // TND
    image: "/chambre 2.png",
    description: "Suite royale avec lit double et salon privé, ambiance magique et envoûtante.",
    amenities: ["Wi-Fi gratuit", "Climatisation", "Salle de bain privée", "Lit double", "Salon privé", "Minibar", "Service VIP", "Peignoirs", "Coffre-fort"],
    size: "48m²",
    capacity: 3,
    rating: 4.9,
    reviews: 142,
    features: ["Lit double", "Salon privé", "Ambiance magique"],
    category: "S.ROYALE",
    characteristic: "Lit double + salon"
  }
];

// Fonction pour obtenir les chambres par catégorie
export const getRoomsByCategory = (category: string) => {
  return roomsData.filter(room => room.category === category);
};

// Fonction pour obtenir une chambre par ID
export const getRoomById = (id: string) => {
  return roomsData.find(room => room.id === id);
};

// Statistiques des chambres
export const roomStats = {
  total: roomsData.length,
  double: getRoomsByCategory("DOUBLE").length,
  twin: getRoomsByCategory("TWIN").length,
  familiale: getRoomsByCategory("FAMILIALE").length,
  doubleLb: getRoomsByCategory("DOUBLE+L.B").length,
  suiteRoyale: getRoomsByCategory("S.ROYALE").length,
  totalCapacity: roomsData.reduce((sum, room) => sum + room.capacity, 0),
  averageRating: roomsData.reduce((sum, room) => sum + room.rating, 0) / roomsData.length,
  priceRange: {
    min: Math.min(...roomsData.map(room => room.pricePerNight)),
    max: Math.max(...roomsData.map(room => room.pricePerNight))
  }
};
