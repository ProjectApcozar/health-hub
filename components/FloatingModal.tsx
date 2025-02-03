import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { Avatar, Text, TouchableRipple, IconButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

const { height } = Dimensions.get("window");

interface FloatingModalProps {
  visible: boolean;
  data: any[];
  onClose: () => void;
}

// Función para agrupar los datos por fecha
const groupByDate = (data: any[]) => {
  return data.reduce((acc, item) => {
    const date = item.applicationDate;
    (acc[date] = acc[date] || []).push(item);
    return acc;
  }, {} as Record<string, any[]>);
};

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const [day, month, year] = dateString.split("/").map(Number);
  return `${day} de ${months[month - 1]}, ${year}`;
};

export const FloatingModal = ({ visible, data, onClose }: FloatingModalProps) => {
  const groupedData = groupByDate(data);

  return (
    <Modal transparent={false} animationType="slide" visible={visible}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={onClose}
          />
          <Text style={styles.modalTitle}>Todas las Vacunas</Text>
        </View>

        <ScrollView contentContainerStyle={styles.modalScrollContent}>
          {Object.keys(groupedData).map((date, index) => (
            <View key={index}>
              <Text style={styles.dateLabel}>{formatDate(date)}</Text>
              {groupedData[date].map((item: any) => (
                <TouchableRipple key={item.name} rippleColor="rgba(0, 0, 0, 0.1)" borderless>
                  <View style={styles.cardItem}>
                    <View style={styles.listItem}>
                      <Avatar.Icon size={40} icon={item.icon} style={styles.icon} color="#fff" />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemSubtitle}>{item.category}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "#F9F9F9", // Fondo claro principal
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalScrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  dateLabel: {
    color: "#62CCC7",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  cardItem: {
    backgroundColor: "#E8F6F3", // Color elegante para el fondo de cada tarjeta
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1E7E4", // Borde sutil para dar definición sin sombra
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#62CCC7", // Verde corporativo
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
    color: "#555",
    marginTop: 2,
  },
  itemAmount: {
    fontSize: height * 0.018,
    color: "#000",
    fontWeight: "600",
    marginLeft: 8,
  },
});
