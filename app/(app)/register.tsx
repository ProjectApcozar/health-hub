import { registerUser } from '@/services/userAPI';
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
import { useAccount } from 'wagmi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setUserRole } from '@/store/userRoleSlice';
import { useDispatch } from 'react-redux';

export type User = {
  name: string;
  date_of_birth: string;
  phone_number: string;
  user_password: string;
  dni: string;
  hospital: string;
  residence: string;
  email: string;
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
  // const dispatch = useDispatch();

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (!address) return;

    await registerUser(data, address);
    // dispatch(setUserRole('patient'));
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
                  {...register('name', { required: 'El nombre es obligatorio' })}
                  onChangeText={(text) => setValue('name', text)}
                  placeholder="Introduce tu nombre"
                  placeholderTextColor="#777"
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                <Text style={styles.label}>Edad</Text>
                <TextInput
                  style={styles.input}
                  {...register('date_of_birth', { required: 'La edad es obligatoria' })}
                  onChangeText={(text) => setValue('date_of_birth', text)}
                  placeholder="Introduce tu edad"
                  placeholderTextColor="#777"
                />
                {errors.date_of_birth && <Text style={styles.error}>{errors.date_of_birth.message}</Text>}
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  {...register('phone_number', {
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^\d+$/,
                      message: 'El teléfono debe contener solo números',
                    },
                  })}
                  onChangeText={(text) => setValue('phone_number', text)}
                  placeholder="Introduce tu teléfono"
                  placeholderTextColor="#777"
                />
                {errors.phone_number && <Text style={styles.error}>{errors.phone_number.message}</Text>}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  {...register('user_password', { required: 'La contraseña es obligatoria' })}
                  onChangeText={(text) => setValue('user_password', text)}
                  placeholder="Introduce tu contraseña"
                  passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
                  placeholderTextColor="#777"
                  />
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
