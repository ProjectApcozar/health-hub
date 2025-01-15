import React, { createContext, useContext, useState, ReactNode } from "react";
import { useWatchContractEvent } from "wagmi";
import { contractAddress } from "@/constants/ContractAddress";
import { healthhubABI } from "@/abis/HealthHubABI";

interface ContractEventContextProps {
  events: any[];
}

const ContractEventContext = createContext<ContractEventContextProps>({
  events: [],
});

export const ContractEventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);

  useWatchContractEvent({
    address: contractAddress,
    abi: healthhubABI,
    eventName: "AccessRequest",
    onLogs: (logs) => {
      console.log("Nuevo evento AccessRequest:", logs);
      setEvents((prev) => [...prev, ...logs]);
    },
    onError: (error) => console.error("Error en el evento:", error),
  });

  return (
    <ContractEventContext.Provider value={{ events }}>
      {children}
    </ContractEventContext.Provider>
  );
};

export const useContractEvents = () => useContext(ContractEventContext);
