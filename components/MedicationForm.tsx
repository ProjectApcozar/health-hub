import { Button, Modal, Portal, Text } from "react-native-paper";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";

export type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
};

export const MedicationForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Medication>();

  const onSubmit: SubmitHandler<Medication> = (data) => {
    console.log("Datos del medicamento:", data);
    onClose(); // Cierra el modal al guardar
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Añadir Medicamento</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Nombre del medicamento"
              {...register("name", { required: "El nombre es obligatorio" })}
              onChangeText={(text) => setValue("name", text)}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Dosificación (e.g., 500mg)"
              {...register("dosage", { required: "La dosificación es obligatoria" })}
              onChangeText={(text) => setValue("dosage", text)}
            />
            {errors.dosage && <Text style={styles.error}>{errors.dosage.message}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Frecuencia (e.g., 2 veces al día)"
              {...register("frequency")}
              onChangeText={(text) => setValue("frequency", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Duración (e.g., 7 días)"
              {...register("duration")}
              onChangeText={(text) => setValue("duration", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Notas adicionales"
              {...register("notes")}
              onChangeText={(text) => setValue("notes", text)}
              multiline
            />
            <Button
              mode="contained"
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
            <Button
              mode="text"
              style={styles.cancelButton}
              onPress={onClose}
            >
              Cancelar
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    marginTop: 10,
    color: "#FF4444",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    padding: 10,
    marginBottom: 15,
    color: "#333333",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
  },
  saveButton: {
    backgroundColor: "#62CCC7",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
});
