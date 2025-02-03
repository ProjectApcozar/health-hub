import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Dialog, Portal } from "react-native-paper";
import { useAccount } from "wagmi";
import { useDeletePermissionMutation, useGetPatientPermissionsQuery } from "@/services/apis/permission";

export const PermissionsList = () => {
  const { address } = useAccount();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // Para almacenar el doctor seleccionado
  const [ deletePermission ] = useDeletePermissionMutation();

  if (!address) return null;
  const { data: doctors } = useGetPatientPermissionsQuery(address);
  if (!doctors || doctors.length === 0) return null;

  const dataList: any[] = doctors;
  const displayedDoctors = dataList.length < 4 ? dataList : dataList.slice(0, 3);

  const animations = doctors.map(() => new Animated.Value(1));

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

  const handleDelete = () => {
    deletePermission({address, permission: {patientId: address, doctorId: selectedDoctor.id }})
    setIsDialogVisible(false);
  };

  return (
    <Card style={styles.groupedCard}>
      <Card.Content>
        {displayedDoctors.map((item, index) => (
          <View key={index}>
            <Pressable
              onPress={() => {
                setSelectedDoctor(item); // Almacena el doctor seleccionado
                setIsDialogVisible(true); // Muestra el diálogo
              }}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Animated.View
                style={[
                  styles.listItem,
                  { transform: [{ scale: animations[index] }] },
                ]}
              >
                <Avatar.Icon
                  size={40}
                  icon="doctor"
                  style={styles.icon}
                  color="#fff"
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>
                    {item.name || `Doctor ${index}`}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {item.type || `Category ${index}`}
                  </Text>
                </View>
                <Text style={styles.itemDate}>{item.permissionDate || "11/01/2025"}</Text>
              </Animated.View>
            </Pressable>
          </View>
        ))}
      </Card.Content>

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalMessage}>
              ¿Está seguro de que desea quitar permisos al doctor{" "}
              <Text style={{ fontWeight: "bold" }}>
                {selectedDoctor?.title || "seleccionado"}
              </Text>
              ?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Quitar permisos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsDialogVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Dialog>
      </Portal>
    </Card>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  itemDate: {
    fontSize: height * 0.018,
    color: "#333",
    fontWeight: "600",
  },
  itemDetails: {
    flex: 1,
  },
  itemSubtitle: {
    fontSize: height * 0.018,
    color: "#777",
    marginTop: 4,
  },
  itemTitle: {
    fontSize: height * 0.02,
    fontWeight: "600",
    color: "#333",
  },
  icon: {
    backgroundColor: "#62CCC7",
    marginRight: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  groupedCard: {
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 2,
    width: "100%",
    marginBottom: height * 0.02,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#62CCC7",
    alignItems: "center",
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
