import React, { createContext, useContext, useState, useEffect } from "react";

const TransferDataContext = createContext();

export const TransferDataProvider = ({ children }) => {
  const [transferData, setTransferData] = useState(() => {
    // Load data from localStorage when the application starts
    const storedData = localStorage.getItem("transferData");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("transferData", JSON.stringify(transferData));
  }, [transferData]);

  return (
    <TransferDataContext.Provider value={{ transferData, setTransferData }}>
      {children}
    </TransferDataContext.Provider>
  );
};

export const useTransferData = () => {
  const context = useContext(TransferDataContext);
  if (!context) {
    throw new Error("useTransferData must be used within a TransferDataProvider");
  }
  return context;
};
