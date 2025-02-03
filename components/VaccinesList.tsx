import React, { useState } from "react";
import { Animated, StyleSheet, Dimensions, View } from "react-native";
import { Avatar, Card, Text, TouchableRipple, Divider } from "react-native-paper";
import { FloatingModal } from "./FloatingModal"; // Importar el modal

const { height } = Dimensions.get("window");

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
    date: "16/03/2020",
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

export const VaccinesList = () => {
  const [isModalVisible, setModalVisible] = useState(false);
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

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <View>
      <Card style={styles.groupedCard}>
        <Card.Content style={styles.cardContent}>
          {dataList.map((item, index) => (
            <View key={item.id}>
              <TouchableRipple
                onPress={() => console.log(`Clicked on ${item.title}`)}
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
                    icon={item.icon}
                    style={styles.icon}
                    color="#fff"
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.category}</Text>
                  </View>
                  <Text style={styles.itemAmount}>{item.date}</Text>
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
      <FloatingModal visible={isModalVisible} onClose={toggleModal} data={dataList} />
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
