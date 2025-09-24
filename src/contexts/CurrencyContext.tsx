import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'EUR' | 'USD' | 'TND';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  getCurrencySymbol: () => string;
  convertPrice: (priceInTND: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Taux de change approximatifs (TND comme devise de base)
const EXCHANGE_RATES: Record<Currency, number> = {
  TND: 1,        // Devise de base en Tunisie
  EUR: 0.30,     // 1 TND = 0.30 EUR (approximatif)
  USD: 0.32      // 1 TND = 0.32 USD (approximatif)
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  TND: 'TND'
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // Récupérer la devise depuis le localStorage ou utiliser TND par défaut (Tunisie)
    const savedCurrency = localStorage.getItem('selectedCurrency') as Currency;
    return savedCurrency && ['EUR', 'USD', 'TND'].includes(savedCurrency) 
      ? savedCurrency 
      : 'TND';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);
  };

  const getCurrencySymbol = () => {
    return CURRENCY_SYMBOLS[currency];
  };

  const convertPrice = (priceInTND: number): number => {
    return Math.round(priceInTND * EXCHANGE_RATES[currency]);
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    const symbol = getCurrencySymbol();
    
    if (currency === 'TND') {
      return `${convertedPrice} ${symbol}`;
    }
    
    return `${symbol}${convertedPrice}`;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatPrice,
    getCurrencySymbol,
    convertPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
