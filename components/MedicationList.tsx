import React, { useState } from "react";
import { Animated, StyleSheet, Dimensions, View } from "react-native";
import { Avatar, Card, Text, TouchableRipple } from "react-native-paper";
import { MedicationFloatingModal } from "./MedicationFloatingModal";
import { useAccount } from "wagmi";
import { useGetMedicationsByAddressQuery } from "@/services/apis/medication";

const { height } = Dimensions.get("window");

export const MedicationList = () => {
  const { address } = useAccount();
  const [isModalVisible, setModalVisible] = useState(false);
  const { data: medications } = useGetMedicationsByAddressQuery(address!);
  console.log(medications);
  if (!address || !Array.isArray(medications) || medications.length === 0) return null;

  const animations = medications.map(() => new Animated.Value(1));

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

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <View>
      <Card style={styles.groupedCard}>
        <Card.Content style={styles.cardContent}>
          {medications.map((item, index) => (
            <View key={index}>
              <TouchableRipple
                onPress={() => console.log(`Clicked on ${item.name}`)}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                rippleColor="rgba(0, 0, 0, 0.1)"
                style={styles.touchable}
                borderless
              >
                <Animated.View
                  style={[
                    styles.listItem,
                    { transform: [{ scale: animations[index] }] },
                  ]}
                >
                  <Avatar.Icon
                    size={40}
                    icon="pill"
                    style={styles.icon}
                    color="#fff"
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemSubtitle}>{`${item.startDate} - ${item.duration} days`}</Text>
                  </View>
                  <Text style={styles.itemAmount}>{item.createdAt}</Text>
                </Animated.View>
              </TouchableRipple>
            </View>
          ))}
          <TouchableRipple
            onPress={toggleModal}
            rippleColor="rgba(0, 0, 0, 0.1)"
            borderless
          >
            <Text style={styles.seeAll}>Ver todo</Text>
          </TouchableRipple>
        </Card.Content>
      </Card>
      <MedicationFloatingModal visible={isModalVisible} onClose={toggleModal} data={medications} />
    </View>
  );
};

const styles = StyleSheet.create({
  groupedCard: {
    borderRadius: 15,
    backgroundColor: "#FFFF",
    elevation: 0,
    width: "100%",
    marginBottom: height * 0.02,
  },
  cardContent: {
    paddingHorizontal: 0,
  },
  touchable: {
    borderRadius: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  icon: {
    backgroundColor: "#62CCC7",
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: height * 0.02,
    fontWeight: "600",
    color: "#000",
  },
  itemSubtitle: {
    fontSize: height * 0.018,
    color: "#666",
    marginTop: 2,
  },
  itemAmount: {
    fontSize: height * 0.018,
    color: "#000",
    fontWeight: "600",
    marginLeft: 8,
  },
  seeAll: {
    textAlign: "center",
    paddingVertical: 12,
    color: "#62CCC7",
    fontWeight: "600",
  },
});
