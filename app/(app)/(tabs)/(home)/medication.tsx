import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button } from "react-native-paper";
import { CommonHeader } from "@/components/CommonHeader";
import { MedicationForm } from "@/components/Medication/MedicationForm";
import { useGetUserByAddressQuery } from "@/services/apis/user";
import { MedicationList } from "@/components/Medication/MedicationList";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Medication() {
  const { patientId: workingAddress } = useLocalSearchParams();
  const address = Array.isArray(workingAddress) ? workingAddress[0] : workingAddress;

  if (!address) return null;

  const { data: user } = useGetUserByAddressQuery(address);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />
      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Medicación</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={styles.centralButton}
          labelStyle={styles.centralButtonText}
        >
          Añadir Medicamentos
        </Button>
        <MedicationForm visible={modalVisible} onClose={() => setModalVisible(false)} />
        <MedicationList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  primaryCard: {
    borderRadius: 50,
    backgroundColor: "#A5E3E0",
    width: "80%",
    height: height * 0.15,
    alignSelf: "center",
    marginTop: height * 0.1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: height * 0.025,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  centralButton: {
    alignSelf: "center",
    backgroundColor: "#62CCC7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 3,
  },
  centralButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  }
});
