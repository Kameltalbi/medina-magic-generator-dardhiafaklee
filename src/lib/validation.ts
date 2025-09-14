// Validation utilities for forms and booking data

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Tunisian format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+216|0)?[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Date validation
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Check if date is in the future
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Check if checkout is after checkin
export const isCheckoutAfterCheckin = (checkIn: string, checkOut: string): boolean => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkOutDate > checkInDate;
};

// Calculate minimum checkout date (checkin + 1 day)
export const getMinCheckoutDate = (checkIn: string): string => {
  const checkInDate = new Date(checkIn);
  checkInDate.setDate(checkInDate.getDate() + 1);
  return checkInDate.toISOString().split('T')[0];
};

// Validate booking request
export const validateBookingRequest = (data: {
  checkIn: string;
  checkOut: string;
  guests: number;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Check-in validation
  if (!data.checkIn) {
    errors.push({ field: 'checkIn', message: 'La date d\'arrivée est requise' });
  } else if (!isValidDate(data.checkIn)) {
    errors.push({ field: 'checkIn', message: 'Format de date invalide' });
  } else if (!isFutureDate(data.checkIn)) {
    errors.push({ field: 'checkIn', message: 'La date d\'arrivée doit être dans le futur' });
  }

  // Check-out validation
  if (!data.checkOut) {
    errors.push({ field: 'checkOut', message: 'La date de départ est requise' });
  } else if (!isValidDate(data.checkOut)) {
    errors.push({ field: 'checkOut', message: 'Format de date invalide' });
  } else if (data.checkIn && !isCheckoutAfterCheckin(data.checkIn, data.checkOut)) {
    errors.push({ field: 'checkOut', message: 'La date de départ doit être après la date d\'arrivée' });
  }

  // Guests validation
  if (!data.guests || data.guests < 1) {
    errors.push({ field: 'guests', message: 'Le nombre d\'invités doit être d\'au moins 1' });
  } else if (data.guests > 6) {
    errors.push({ field: 'guests', message: 'Le nombre maximum d\'invités est de 6' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate customer info
export const validateCustomerInfo = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // First name validation
  if (!data.firstName.trim()) {
    errors.push({ field: 'firstName', message: 'Le prénom est requis' });
  } else if (data.firstName.trim().length < 2) {
    errors.push({ field: 'firstName', message: 'Le prénom doit contenir au moins 2 caractères' });
  }

  // Last name validation
  if (!data.lastName.trim()) {
    errors.push({ field: 'lastName', message: 'Le nom est requis' });
  } else if (data.lastName.trim().length < 2) {
    errors.push({ field: 'lastName', message: 'Le nom doit contenir au moins 2 caractères' });
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'L\'email est requis' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Format d\'email invalide' });
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Le téléphone est requis' });
  } else if (!isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Format de téléphone invalide (ex: +216 12 345 678)' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate contact form
export const validateContactForm = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Le nom est requis' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Le nom doit contenir au moins 2 caractères' });
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'L\'email est requis' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Format d\'email invalide' });
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Le téléphone est requis' });
  } else if (!isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Format de téléphone invalide' });
  }

  // Message validation
  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Le message est requis' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Le message doit contenir au moins 10 caractères' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
