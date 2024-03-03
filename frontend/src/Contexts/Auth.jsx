import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(
    sessionStorage.getItem("isVerified") === "true"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [isNeedVerification, setIsNeedVerification] = useState(
    sessionStorage.getItem("isNeedVerification") === "true"
  );
  const [isRegisterd, setIsRegisterd] = useState(
    sessionStorage.getItem("isRegisterd") === "true"
  );

  console.log("isAuthenticated:", isAuthenticated);
  console.log("isVerified:", isVerified);
  console.log("isNeedVerification:", isNeedVerification);
  console.log("isRegisterd:", isRegisterd);

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    sessionStorage.setItem("isVerified", isVerified);
  }, [isVerified]);

  useEffect(() => {
    sessionStorage.setItem("isNeedVerification", isNeedVerification);
    if (isNeedVerification) {
      const timeoutId = setTimeout(() => {
        setIsNeedVerification(false);
      }, 120000); // 2 minutes
      return () => clearTimeout(timeoutId);
    };

    sessionStorage.setItem("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        setIsAuthenticated(false);
      }, 600000); // 10 minutes
      return () => clearTimeout(timeoutId);
    };
  }, [isNeedVerification, isAuthenticated]);

  const login = () => {
    console.log("Logged in");
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Logged out");
    setIsAuthenticated(false);
  };

  const needVerification = () => {
    setIsNeedVerification(true);
  };

  const verified = () => {
    setIsVerified(true);
    setIsNeedVerification(false);
  };

  const register = () => {
    needVerification();
    setIsRegisterd(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isNeedVerification,
        isVerified,
        isRegisterd,
        login,
        logout,
        needVerification,
        verified,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
