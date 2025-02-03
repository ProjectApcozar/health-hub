import { Button, Modal, Portal, Text } from "react-native-paper";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { Vaccine } from "@/common/types";
import { useCreateVaccineMutation } from "@/services/apis/vaccine";
import { useAccount } from "wagmi";

export const VaccinesForm = ({
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
  } = useForm<Vaccine>();
  const [createVaccine] = useCreateVaccineMutation();
  const { address } = useAccount();

  const onSubmit: SubmitHandler<Vaccine> = async (vaccine) => {
    if (!address) return;
    await createVaccine({ 
      address, 
      vaccine,
    });
    onClose();
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
          <Text style={styles.modalTitle}>Añadir Vacuna</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Vacuna administrada"
              {...register("name", { required: "El nombre es obligatorio" })}
              onChangeText={(text) => setValue("name", text)}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Hospital"
              {...register("healthCenter", { required: "El hospital es obligatorio" })}
              onChangeText={(text) => setValue("healthCenter", text)}
            />
            {errors.healthCenter && <Text style={styles.error}>{errors.healthCenter.message}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Fecha"
              {...register("applicationDate")}
              onChangeText={(text) => setValue("applicationDate", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Edad"
              {...register("age")}
              onChangeText={(text) => setValue("age", text)}
            />
            {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}
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
