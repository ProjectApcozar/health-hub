import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { CommonHeader } from "@/components/CommonHeader";
import { useGetUserByAddressQuery } from "@/services/apis/user";
import { contractAddress } from "@/constants/ContractAddress";
import { dataintegrityABI } from "@/abis/DataIntergrityABI";
import { publicClient } from "@/utils/wagmi";
import { useDispatch } from "react-redux";
import { addLog } from "@/store/notificationsSlice";

const { width, height } = Dimensions.get("window");

export default function PatientHome() {
  const { address } = useAccount();
  const { patientId } = useLocalSearchParams();
  const router = useRouter();
  const workingAddress = Array.isArray(patientId) ? patientId[0] : patientId || address;
  if (!workingAddress) return null;

  const {
    data: user
  } = useGetUserByAddressQuery(workingAddress);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: contractAddress,
      abi: dataintegrityABI,
      eventName: "AccessRequested",
      onLogs: (logs) => {
        let nicelog: any = logs[0];
        console.log("Nuevo log recibido:", nicelog.args.doctor);
        let doctor = nicelog.args.doctor;
        dispatch(addLog(doctor)); // Guarda los logs en Redux
      },
      onError: (errors) => console.error("Error al recibir logs:", errors),
    });

    return () => unwatch(); // Detener la suscripción cuando se desmonte el componente
  }, [dispatch]);

  const radius = Math.min(width, height) * 0.3;
  const angles = [30, 90, 150, 210, 270, 330];
  const items = [
    { label: "Pruebas Analíticas", href: "/analytic-reports" as const },
    { label: "Pruebas de Imagen", href: "/image-reports" as const },
    { label: "Vacunas", href: "/vaccines"  as const },
    { label: "Incapacidad Temporal", href: "/temporary-incapacity" as const },
    { label: "Medicación", href: "/medication" as const },
    { label: "Informes Clínicos", href: "/clinic-reports" as const },
  ];

  const menuPositions = angles.map((angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: useSharedValue(Math.cos(rad) * radius),
      y: useSharedValue(Math.sin(rad) * radius),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />
      <View style={styles.menuContainer}>
        {items.map((item, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { translateX: menuPositions[index].x.value },
              { translateY: menuPositions[index].y.value },
            ],
          }));

          return (
            <Animated.View key={index} style={[styles.menuItem, animatedStyle]}>
                <TouchableOpacity 
                  style={[styles.itemButton]} 
                  onPress={()=> router.push(item.href)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
            </Animated.View>
          );
        })}
        <TouchableOpacity 
          style={styles.centerButton}
          onPress={() => router.push("/basic-data")}>
          <Text style={styles.centerText}>Datos Médicos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    width: "100%",
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  profileButton: {
    backgroundColor: "#62CCC7",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationButton: {
    padding: 8,
  },
  menuContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    position: "absolute",
  },
  itemButton: {
    width: Math.min(width, height) * 0.25,
    height: Math.min(width, height) * 0.25,
    borderRadius: Math.min(width, height) * 0.25,
    backgroundColor: "#62CCC782",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  itemText: {
    color: "#000",
    textAlign: "center",
    fontSize: Math.min(width, height) * 0.035,
  },
  centerButton: {
    width: Math.min(width, height) * 0.25,
    height: Math.min(width, height) * 0.25,
    borderRadius: Math.min(width, height) * 0.25,
    backgroundColor: "#62CCC7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  centerText: {
    color: "#000",
    fontSize: Math.min(width, height) * 0.04,
    fontWeight: "bold",
    textAlign: "center",
  },
});