import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Avatar, Button } from "react-native-paper";
import { CommonHeader } from "@/components/CommonHeader";
import { useAccount } from "wagmi";
import { MedicationForm } from "@/components/MedicationForm";
import { useGetUserByAddressQuery } from "@/services/apis/user";

const { width, height } = Dimensions.get("window");

const dataList = [
  {
    id: "1",
    title: "Diabetes Mellitus",
    date: "15/03/2020",
    category: "Endocrinología",
    icon: "clipboard-text-outline",
  },
  {
    id: "2",
    title: "Hipertensión Arterial",
    date: "10/07/2018",
    category: "Cardiología",
    icon: "heart-outline",
  },
  {
    id: "3",
    title: "Vacunas Completas",
    date: "20/01/2023",
    category: "Inmunología",
    icon: "needle",
  },
];

export default function Medication() {
  const { address } = useAccount();
  if (!address) return null;

  const { data: user } = useGetUserByAddressQuery(address);
  const [modalVisible, setModalVisible] = useState(false);
  const animations = dataList.map(() => new Animated.Value(1));

  const handlePressIn = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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

        <Card style={styles.groupedCard}>
          <Card.Content>
            {dataList.map((item, index) => (
              <View key={item.id}>
                <Pressable
                  onPress={() => console.log(`Clicked on ${item.title}`)}
                  onPressIn={() => handlePressIn(index)}
                  onPressOut={() => handlePressOut(index)}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.listItem,
                      { transform: [{ scale: animations[index] }] },
                    ]}
                  >
                    <Avatar.Icon
                      size={40}
                      icon={item.icon}
                      style={styles.icon}
                      color="#fff"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.category}</Text>
                    </View>
                    <Text style={styles.itemDate}>{item.date}</Text>
                  </Animated.View>
                </Pressable>
              </View>
            ))}
          </Card.Content>
        </Card>
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
  groupedCard: {
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 2,
    width: "100%",
    marginBottom: height * 0.02,
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
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  icon: {
    backgroundColor:
     "#62CCC7",
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: height * 0.02,
    fontWeight: "600",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: height * 0.018,
    color: "#777",
    marginTop: 4,
  },
  itemDate: {
    fontSize: height * 0.018,
    color: "#333",
    fontWeight: "600",
  },
});
