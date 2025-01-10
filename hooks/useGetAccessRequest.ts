import { healthhubABI } from "@/abis/HealthHubABI";
import { contractAddress } from "@/constants/ContractAddress";
import { useState } from "react";
import { useWatchContractEvent } from "wagmi";

export const useGetAccessRequest = () => {
    const [notifications, setNotifications] = useState<{ patient: string; doctor: string }[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
  
    useWatchContractEvent({
        address: contractAddress,
        abi: healthhubABI,
        eventName: "AccessRequest",
        onLogs(logs) {
            console.log('access request logs');
            console.log(logs);
            setNotifications((prev) => [...prev, { patient: logs[0].data, doctor: logs[1].data }]);
        },
    });

    const toggleNotifications = () => setShowNotifications((prev) => !prev);

    return {
      notifications,
      showNotifications,
      toggleNotifications
    };
}