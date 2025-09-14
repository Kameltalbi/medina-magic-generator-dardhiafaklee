// Types for Dar Dhiafa Klee application

export interface Room {
  id: string;
  title: string;
  pricePerNight: number;
  currency: string;
  image: string;
  description: string;
  amenities: string[];
  size?: string;
  capacity: number;
  rating?: number;
  reviews?: number;
  features?: string[];
  category?: string;
}

export interface BookingRequest {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId?: string;
}

export interface BookingDetails {
  id: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  subtotal: number;
  taxes: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  customerInfo?: CustomerInfo;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface PaymentInfo {
  method: 'konnect' | 'stripe' | 'paypal';
  amount: number;
  currency: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
  price?: number;
  category?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BookingContextType {
  // Current booking state
  selectedRoom: Room | null;
  bookingDates: BookingRequest | null;
  customerInfo: CustomerInfo | null;
  
  // Actions
  selectRoom: (room: Room) => void;
  setBookingDates: (dates: BookingRequest) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearBooking: () => void;
  
  // Booking process
  createBooking: (bookingData: BookingDetails) => Promise<boolean>;
  processPayment: (paymentInfo: PaymentInfo) => Promise<boolean>;
  
  // Loading states
  isBooking: boolean;
  isProcessingPayment: boolean;
}