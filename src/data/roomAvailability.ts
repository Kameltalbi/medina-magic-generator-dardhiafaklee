import { roomsData } from './rooms';

export interface RoomAvailability {
  roomId: string;
  roomNumber: string;
  title: string;
  category: string;
  pricePerNight: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  checkIn?: string;
  checkOut?: string;
  guestName?: string;
  bookingId?: string;
  notes?: string;
}

export interface BookingPeriod {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  notes?: string;
}

// Données initiales de disponibilité des chambres
export const initialRoomAvailability: RoomAvailability[] = roomsData.map(room => ({
  roomId: room.id,
  roomNumber: room.roomNumber || room.id,
  title: room.title,
  category: room.category,
  pricePerNight: room.pricePerNight,
  status: 'available' as const
}));

// Fonction pour obtenir le statut d'une chambre à une date donnée
export const getRoomStatus = (roomId: string, date: string): RoomAvailability['status'] => {
  // Exemples de chambres occupées pour la démonstration
  const occupiedRooms = ['ch-11', 'ch-12']; // KOTB et KMAR occupées
  const reservedRooms = ['ch-13']; // OULOU réservée
  const maintenanceRooms = ['ch-14']; // NOUR en maintenance
  
  if (occupiedRooms.includes(roomId)) {
    return 'occupied';
  } else if (reservedRooms.includes(roomId)) {
    return 'reserved';
  } else if (maintenanceRooms.includes(roomId)) {
    return 'maintenance';
  }
  
  // Vérifier aussi les réservations réelles
  const bookings = getBookingsForDate(date);
  const roomBooking = bookings.find(booking => booking.roomId === roomId);
  
  if (roomBooking) {
    return roomBooking.status === 'confirmed' ? 'occupied' : 'reserved';
  }
  
  return 'available';
};

// Fonction pour obtenir les réservations pour une date donnée
export const getBookingsForDate = (date: string): BookingPeriod[] => {
  const bookings = JSON.parse(localStorage.getItem('roomBookings') || '[]');
  return bookings.filter((booking: BookingPeriod) => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const targetDate = new Date(date);
    
    return targetDate >= checkIn && targetDate < checkOut && booking.status !== 'cancelled';
  });
};

// Fonction pour vérifier si une chambre est disponible pour une période
export const isRoomAvailable = (roomId: string, checkIn: string, checkOut: string): boolean => {
  const bookings = JSON.parse(localStorage.getItem('roomBookings') || '[]');
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  return !bookings.some((booking: BookingPeriod) => {
    if (booking.roomId !== roomId || booking.status === 'cancelled') return false;
    
    const bookingCheckIn = new Date(booking.checkIn);
    const bookingCheckOut = new Date(booking.checkOut);
    
    // Vérifier s'il y a un chevauchement
    return (checkInDate < bookingCheckOut && checkOutDate > bookingCheckIn);
  });
};

// Fonction pour obtenir les chambres disponibles pour une période
export const getAvailableRooms = (checkIn: string, checkOut: string): RoomAvailability[] => {
  return initialRoomAvailability.filter(room => 
    isRoomAvailable(room.roomId, checkIn, checkOut)
  );
};

// Fonction pour créer une réservation
export const createBooking = (booking: Omit<BookingPeriod, 'id' | 'createdAt'>): string => {
  const bookings = JSON.parse(localStorage.getItem('roomBookings') || '[]');
  const newBooking: BookingPeriod = {
    ...booking,
    id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem('roomBookings', JSON.stringify(bookings));
  
  return newBooking.id;
};

// Fonction pour obtenir toutes les réservations
export const getAllBookings = (): BookingPeriod[] => {
  return JSON.parse(localStorage.getItem('roomBookings') || '[]');
};

// Fonction pour mettre à jour le statut d'une réservation
export const updateBookingStatus = (bookingId: string, status: BookingPeriod['status']): boolean => {
  const bookings = getAllBookings();
  const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
  
  if (bookingIndex !== -1) {
    bookings[bookingIndex].status = status;
    localStorage.setItem('roomBookings', JSON.stringify(bookings));
    return true;
  }
  
  return false;
};

// Fonction pour obtenir les statistiques de réservation
export const getBookingStats = () => {
  const bookings = getAllBookings();
  const today = new Date().toISOString().split('T')[0];
  
  return {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    todayCheckIns: bookings.filter(b => b.checkIn === today && b.status === 'confirmed').length,
    todayCheckOuts: bookings.filter(b => b.checkOut === today && b.status === 'confirmed').length,
    totalRevenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.totalPrice, 0)
  };
};
