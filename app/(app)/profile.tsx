import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Card, Portal, Text, Appbar, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "expo-router";
import { useGetUserByAddress } from "@/hooks/useGetUserByAddress";
import { updateUser } from "@/api/userAPI";
import { useIsPatient } from "@/hooks/useIsPatient";

export default function Profile() {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { isPatient } = useIsPatient(address);

  const [fields, setFields] = useState({
    phone_number: "",
    date_of_birth: "",
    dni: "",
    hospital: "",
    residence: "",
    email: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<keyof typeof fields | null>(null);
  const [tempValue, setTempValue] = useState("");

  const { user } = useGetUserByAddress(address!);
  useEffect(() => {
    if (user) {
      setFields({
        phone_number: user.phone_number || "",
        date_of_birth: user.date_of_birth || "",
        dni: user.dni || "",
        hospital: user.hospital || "",
        residence: user.residence || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (editingField) {
      const updatedFields = { ...fields, [editingField]: tempValue };
      console.log(updatedFields);
      setFields(updatedFields);
      await updateUser({ [editingField]: tempValue }, address!);
      setModalVisible(false);
    }
  };

  const openModal = (field: keyof typeof fields) => {
    setEditingField(field);
    setTempValue(fields[field]);
    setModalVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Perfil" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileCardContent}>
            <Avatar.Icon size={64} icon="account" style={styles.avatar} />
            <Text style={styles.userName}>{user?.name || "Usuario Anónimo"}</Text>
            <Text style={styles.userRole}>{isPatient ? "Paciente" : "Usuario"}</Text>
            <Text style={styles.walletAddress}>{address}</Text>
          </Card.Content>
        </Card>

        {Object.entries(fields).map(([field, value]) => (
          <Card
            style={[styles.infoCard, { minHeight: value ? undefined : 50 }]}
            key={field}
            onPress={() => openModal(field as keyof typeof fields)}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.fieldDescription}>
                {field.replace(/_/g, " ").toUpperCase()}
              </Text>
              <Text style={styles.fieldValue}>{value || "No especificado"}</Text>
            </Card.Content>
          </Card>
        ))}

        <Button mode="contained" style={styles.disconnectButton} onPress={handleDisconnect}>
          Desconectar
        </Button>
      </ScrollView>

      <Portal>
        {modalVisible && (
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingField?.replace(/_/g, " ").toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={tempValue}
              onChangeText={setTempValue}
              placeholder={`Introduce tu ${editingField}`}
              keyboardType={editingField === "email" ? "email-address" : "default"}
            />
            <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
              Guardar
            </Button>
            <Button
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
              textColor="#FF4444"
            >
              Cancelar
            </Button>
          </SafeAreaView>
        )}
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#62CCC7",
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  profileCardContent: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#62CCC7",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333333",
    textAlign: "center",
  },
  userRole: {
    fontSize: 14,
    color: "#777777",
    marginTop: 4,
    textAlign: "center",
  },
  walletAddress: {
    marginTop: 6,
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
  },
  infoCard: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    elevation: 1,
    paddingHorizontal: 12,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
  },
  fieldDescription: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "bold",
  },
  disconnectButton: {
    marginTop: 20,
    backgroundColor: "#62CCC7",
    alignSelf: "center",
    width: "50%",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    color: "#333333",
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#62CCC7",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
});
