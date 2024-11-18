import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextProps {
  address: string | null;
  setAddress: (address: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);

  const logout = () => {
    setAddress(null);
  };

  return (
    <AuthContext.Provider
      value={{
        address,
        setAddress,
        isAuthenticated: !!address,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
