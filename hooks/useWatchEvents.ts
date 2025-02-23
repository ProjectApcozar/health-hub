import { addLog } from "@/store/notificationsSlice";
import { publicClient } from "@/utils/wagmi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useWatchEvents = (contractAddress: `0x${string}`, dataintegrityABI: any, refetch?: () => void) => {
    const dispatch = useDispatch();

    useEffect(() => {
    console.log("🔍 Iniciando watcher de eventos...");

      const accessGrantedWatcher = publicClient.watchContractEvent({
        address: contractAddress,
        abi: dataintegrityABI,
        eventName: "AccessGranted",
        onLogs: (logs) => {
          let nicelog: any = logs[0];
          console.log("Nuevo log recibido:", nicelog.args.doctor);
          if (refetch) refetch();
        },
        onError: (errors) => console.error("Error al recibir logs:", errors),
      });

      const accessRevokedWatcher = publicClient.watchContractEvent({
        address: contractAddress,
        abi: dataintegrityABI,
        eventName: "AccessRevoked",
        onLogs: (logs) => {
          let nicelog: any = logs[0];
          console.log("Nuevo log recibido:", nicelog.args.doctor);          
          if (refetch) refetch();
        },
        onError: (errors) => console.error("Error al recibir logs:", errors),
      });
    const accessRequestedWatcher = publicClient.watchContractEvent({
      address: contractAddress,
      abi: dataintegrityABI,
      eventName: "AccessRequested",
      onLogs: (logs) => {
        let nicelog: any = logs[0];
        console.log("Nuevo log recibido:", nicelog.args.doctor);
        let doctor = nicelog.args.doctor;
        dispatch(addLog(doctor));
      },
      onError: (errors) => console.error("Error al recibir logs:", errors),
    });
    return () => {
      console.log("🛑 Eliminando watcher de eventos...");
      accessGrantedWatcher();
      accessRevokedWatcher();
      accessRequestedWatcher();
    };
  }, [contractAddress, dataintegrityABI, refetch]);
};
