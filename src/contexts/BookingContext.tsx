// Booking Context - Global state management for booking process
// Handles room selection, dates, customer info, and booking creation

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { 
  BookingContextType, 
  Room, 
  BookingRequest, 
  CustomerInfo, 
  BookingDetails, 
  PaymentInfo 
} from '@/lib/types';

// Initial state
const initialState = {
  selectedRoom: null as Room | null,
  bookingDates: null as BookingRequest | null,
  customerInfo: null as CustomerInfo | null,
  isBooking: false,
  isProcessingPayment: false,
};

// Action types
type BookingAction =
  | { type: 'SELECT_ROOM'; payload: Room }
  | { type: 'SET_BOOKING_DATES'; payload: BookingRequest }
  | { type: 'SET_CUSTOMER_INFO'; payload: CustomerInfo }
  | { type: 'CLEAR_BOOKING' }
  | { type: 'SET_BOOKING_LOADING'; payload: boolean }
  | { type: 'SET_PAYMENT_LOADING'; payload: boolean };

// Reducer
function bookingReducer(state: typeof initialState, action: BookingAction) {
  switch (action.type) {
    case 'SELECT_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'SET_BOOKING_DATES':
      return { ...state, bookingDates: action.payload };
    case 'SET_CUSTOMER_INFO':
      return { ...state, customerInfo: action.payload };
    case 'CLEAR_BOOKING':
      return { ...initialState };
    case 'SET_BOOKING_LOADING':
      return { ...state, isBooking: action.payload };
    case 'SET_PAYMENT_LOADING':
      return { ...state, isProcessingPayment: action.payload };
    default:
      return state;
  }
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider component
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Actions
  const selectRoom = useCallback((room: Room) => {
    dispatch({ type: 'SELECT_ROOM', payload: room });
  }, []);

  const setBookingDates = useCallback((dates: BookingRequest) => {
    dispatch({ type: 'SET_BOOKING_DATES', payload: dates });
  }, []);

  const setCustomerInfo = useCallback((info: CustomerInfo) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: info });
  }, []);

  const clearBooking = useCallback(() => {
    dispatch({ type: 'CLEAR_BOOKING' });
  }, []);

  // Mock API functions (replace with real API calls)
  const createBooking = useCallback(async (bookingData: BookingDetails): Promise<boolean> => {
    dispatch({ type: 'SET_BOOKING_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success (90% success rate)
      const success = Math.random() > 0.1;
      
      if (success) {
        // Store booking in localStorage for demo
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push({
          ...bookingData,
          id: `DH-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        localStorage.setItem('bookings', JSON.stringify(bookings));
      }
      
      dispatch({ type: 'SET_BOOKING_LOADING', payload: false });
      return success;
    } catch (error) {
      dispatch({ type: 'SET_BOOKING_LOADING', payload: false });
      return false;
    }
  }, []);

  const processPayment = useCallback(async (paymentInfo: PaymentInfo): Promise<boolean> => {
    dispatch({ type: 'SET_PAYMENT_LOADING', payload: true });
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock success (85% success rate)
      const success = Math.random() > 0.15;
      
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });
      return success;
    } catch (error) {
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });
      return false;
    }
  }, []);

  const value: BookingContextType = {
    ...state,
    selectRoom,
    setBookingDates,
    setCustomerInfo,
    clearBooking,
    createBooking,
    processPayment,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// Hook to use booking context
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
