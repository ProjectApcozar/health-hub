import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, Portal, Modal } from 'react-native-paper';
import { CommonHeader } from '@/components/CommonHeader';
import { useAccount, useWriteContract } from 'wagmi';
import { healthhubABI } from '@/abis/HealthHubABI';
import { contractAddress } from '@/constants/ContractAddress';
import { PermissionsList } from '@/components/PermissionsList';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserByAddressQuery } from '@/services/user';

const { width, height } = Dimensions.get('window');

export default function PatientPermissions() {
  const { address } = useAccount();
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();

  if (!address) return null;

  const { data: user } = useGetUserByAddressQuery(address);

  const handleSumbit = (comment: string) => {
    writeContract(
      {
        abi: healthhubABI,
        address: contractAddress,
        functionName: 'authorizeDoctor',
        account: address,
        args: [comment],
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['doctors'] });
          setModalVisible(false);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />
      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Permisos</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={styles.centralButton}
          labelStyle={styles.centralButtonText}
        >
          Añadir Doctores
        </Button>
        <PermissionsList />

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Introduce un comentario</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe algo..."
              value={inputValue}
              onChangeText={setInputValue}
              placeholderTextColor="#aaa"
            />
            <Button
              mode="contained"
              onPress={() => handleSumbit(inputValue)}
              style={styles.button}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            >
              Enviar
            </Button>
            <Button
              mode="text"
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              Cerrar
            </Button>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  primaryCard: {
    borderRadius: 15,
    backgroundColor: '#A5E3E0',
    elevation: 2,
    padding: 16,
    width: '80%',
    height: height * 0.15,
    alignSelf: 'center',
    marginTop: height * 0.1,
  },
  cardTitle: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  centralButton: {
    alignSelf: 'center',
    backgroundColor: '#62CCC7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 3,
  },
  centralButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#62CCC7',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});
