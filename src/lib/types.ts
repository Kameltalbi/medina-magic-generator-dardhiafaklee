// Types for Dar Dhiafa Klee application

export interface Room {
  id: string;
  title: string;
  pricePerNight: string;
  image: string;
  description: string;
  amenities: string[];
}

export interface BookingRequest {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}