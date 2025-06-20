import React, { createContext, useContext, useState } from 'react';


type VehicleIdContextType = {
    vehicleId: string | null;
    setVehicleId: (id: string | null) => void;
  };
  
  const VehicleIdContext = createContext<VehicleIdContextType | undefined>(undefined);
  
  export const VehicleIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [vehicleId, setVehicleId] = useState<string | null>(null);
  
    return (
      <VehicleIdContext.Provider value={{ vehicleId, setVehicleId }}>
        {children}
      </VehicleIdContext.Provider>
    );
  };
  
  export const useVehicleId = () => {
    const context = useContext(VehicleIdContext);
    if (!context) {
      throw new Error('useVehicleId must be used within a VehicleIdProvider');
    }
    return context;
  };