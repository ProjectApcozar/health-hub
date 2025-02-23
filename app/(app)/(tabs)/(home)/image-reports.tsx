import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button, Portal, Modal } from "react-native-paper";
import { CommonHeader } from "@/components/CommonHeader";
import { MedicationForm } from "@/components/Medication/MedicationForm";
import { useGetUserByAddressQuery } from "@/services/apis/user";
import { MedicationList } from "@/components/Medication/MedicationList";
import { useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { DocumentListItem } from "@/components/DocumentListItem";

const { width, height } = Dimensions.get("window");

export default function Medication() {
  const { patientId: workingAddress } = useLocalSearchParams();
  const address = Array.isArray(workingAddress) ? workingAddress[0] : workingAddress;

  if (!address) return null;

  const [documents, setDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const { data: user } = useGetUserByAddressQuery(address);
  const [modalVisible, setModalVisible] = useState(false);


    const openDocument = async (doc: DocumentPicker.DocumentPickerAsset) => {
      const pdfsDirectory = `${FileSystem.documentDirectory}pdfs/`;
      const dirInfo = await FileSystem.getInfoAsync(pdfsDirectory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(pdfsDirectory, { intermediates: true });
        console.log("📂 Carpeta 'pdfs' creada.");
      }
      const fileUri = `${pdfsDirectory}${doc.name}`;
      await FileSystem.copyAsync({
        from: doc.uri,
        to: fileUri,
      });
      Alert.alert("Descarga completada", `Archivo guardado en: ${fileUri}`);
    };
  
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
  
        if (result.assets && result.assets.length > 0) {
          setDocuments([...documents, result.assets[0]]);
        }      
      } catch (error) {
        console.error("Error seleccionando el documento:", error);
      }
    };
    const animations = documents.map(() => new Animated.Value(1));
    
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />
      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Pruebas de Imagen</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={styles.centralButton}
          labelStyle={styles.centralButtonText}
        >
          Añadir pruebas de imagen
        </Button>
        
        {documents.length > 0 &&
            <View>
              <Card style={styles.groupedCard}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.sectionTitle}>Documentos subidos:</Text>
                  {documents.map((item, index) => (
                    <DocumentListItem
                      key={index}
                      item={item}
                      onPress={() => openDocument(item)} // Agregar esta línea si no está en el componente
                      animation={animations[index]}
                    />
                  ))}
                </Card.Content>
              </Card>
            </View>
          }

          <Portal>
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
              <Text style={styles.modalTitle}>Subir Documento</Text>
              <Button
                mode="contained"
                onPress={pickDocument}
                style={styles.uploadButton}
                labelStyle={styles.uploadButtonText}
              >
                Seleccionar PDF
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)}>Cerrar</Button>
            </Modal>
          </Portal>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
  pdfModal: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  groupedCard: {
    borderRadius: 15,
    backgroundColor: '#FFFF',
    elevation: 0,
    width: '100%',
    marginBottom: height * 0.02,
  },
  cardContent: {
    paddingHorizontal: 0,
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
  },
  documentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  documentText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: "#62CCC7",
    paddingVertical: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
