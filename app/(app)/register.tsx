import { healthhubABI } from '@/abis/HealthHubABI';
import { registerUser } from '@/api/userAPI';
import { contractAddress } from '@/constants/ContractAddress';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useAccount, useWriteContract } from 'wagmi';
import { useForm, SubmitHandler } from 'react-hook-form';

export type User = {
  nombre: string;
  surname: string;
  edad: string;
  country: string;
  city: string;
  postalCode: string;
  telefono: string;
};

const { width, height } = Dimensions.get('window');

export default function Register() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const router = useRouter();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (!address) return;
    await registerUser(data, address);
    await writeContract({
      abi: healthhubABI,
      address: contractAddress,
      functionName: 'registerPatientSelf',
      account: address,
    });
    router.replace('/');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Title title="Registro de Usuario" titleStyle={styles.cardTitle} />
            <Card.Content>
              <View>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  {...register('nombre', { required: 'El nombre es obligatorio' })}
                  onChangeText={(text) => setValue('nombre', text)}
                  placeholder="Introduce tu nombre"
                  placeholderTextColor="#777"
                />
                {errors.nombre && <Text style={styles.error}>{errors.nombre.message}</Text>}

                <Text style={styles.label}>Edad</Text>
                <TextInput
                  style={styles.input}
                  {...register('edad', { required: 'La edad es obligatoria' })}
                  onChangeText={(text) => setValue('edad', text)}
                  placeholder="Introduce tu edad"
                  placeholderTextColor="#777"
                />
                {errors.edad && <Text style={styles.error}>{errors.edad.message}</Text>}

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  {...register('telefono', {
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^\d+$/,
                      message: 'El teléfono debe contener solo números',
                    },
                  })}
                  onChangeText={(text) => setValue('telefono', text)}
                  placeholder="Introduce tu teléfono"
                  placeholderTextColor="#777"
                />
                {errors.telefono && <Text style={styles.error}>{errors.telefono.message}</Text>}
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                  labelStyle={styles.buttonText}
                >
                  Enviar
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardTitle: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: height * 0.02,
    marginVertical: height * 0.01,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: height * 0.015,
    fontSize: height * 0.018,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: height * 0.018,
    marginBottom: height * 0.01,
  },
  button: {
    marginTop: height * 0.02,
    backgroundColor: '#62CCC7',
    borderRadius: 10,
    paddingVertical: height * 0.015,
  },
  buttonText: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#fff',
  },
});
