import React, { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmailForContext] = useState("");
  
  return (
    <EmailContext.Provider value={{ email, setEmailForContext }}>
      {children}
    </EmailContext.Provider>
  );
};
