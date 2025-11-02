import { useState } from 'react';

export const useAvailabilityForm = () => {
  const [isAvailabilityFormOpen, setIsAvailabilityFormOpen] = useState(false);

  const openAvailabilityForm = () => {
    setIsAvailabilityFormOpen(true);
  };

  const closeAvailabilityForm = () => {
    setIsAvailabilityFormOpen(false);
  };

  return {
    isAvailabilityFormOpen,
    openAvailabilityForm,
    closeAvailabilityForm,
  };
};
