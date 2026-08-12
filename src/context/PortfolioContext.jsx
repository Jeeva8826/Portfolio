import React, { createContext, useContext } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const data = usePortfolioData();
  
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
}
