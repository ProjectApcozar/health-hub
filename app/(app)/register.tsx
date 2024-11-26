import { healthhubABI } from '@/abis/HealthHubABI';
import { registerUser } from '@/api/registerUser';
import { contractAddress } from '@/constants/ContractAddress';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAccount, useWriteContract } from 'wagmi';

export type User = {
  nombre: string;
  surname: string;
  edad: string;
  country: string;
  city: string;
  postalCode: string;
  telefono: string;
};

const Register: React.FC = () => {
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
    await registerUser(data);
    await writeContract({
      abi: healthhubABI,
      address: contractAddress,
      functionName: 'registerPatient',
      account: address
    });
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        {...register('nombre', { required: 'El nombre es obligatorio' })}
        onChangeText={(text) => setValue('nombre', text)}
      />
      {errors.nombre && <Text style={styles.error}>{errors.nombre.message}</Text>}

      <Text style={styles.label}>Edad</Text>
      <TextInput
        style={styles.input}
        {...register('edad', {
          required: 'La edad es obligatoria',
        })}
        onChangeText={(text) => setValue('edad', text)}
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
      />
      {errors.telefono && <Text style={styles.error}>{errors.telefono.message}</Text>}

      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default Register;
