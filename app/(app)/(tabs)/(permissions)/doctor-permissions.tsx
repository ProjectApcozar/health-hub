import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated, Modal, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Avatar, Button } from 'react-native-paper';
import { CommonHeader } from '@/components/CommonHeader';
import { useGetUserByAddress } from '@/hooks/useGetUserByAddress';
import { useAccount, useWriteContract } from 'wagmi';
import { healthhubABI } from '@/abis/HealthHubABI';
import { contractAddress } from '@/constants/ContractAddress';

const { width, height } = Dimensions.get('window');

const dataList = [
  {
    id: '1',
    title: 'Angel Paderne',
    date: '15/03/2020',
    category: 'Hospital Universitario de Caracas',
    icon: 'patient',
  },
  {
    id: '2',
    title: 'Paula Orozco',
    date: '10/07/2018',
    category: 'Hospital de Clínicas Caracas',
    icon: 'patient',
  },
  {
    id: '3',
    title: 'Manuel Parra',
    date: '20/01/2023',
    category: 'Hospital de Niños JM de los Ríos',
    icon: 'patient',
  },
];

export default function DoctorPermissions() {
  const { address } = useAccount();
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { writeContract } = useWriteContract();

  if (!address) return null;

  const { user } = useGetUserByAddress(address);
  /* const { doctors } = useGetAuthorizedDoctors(address); */
  const animations = dataList.map(() => new Animated.Value(1));

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

  const handleSumbit = async (comment: string) => {
    await writeContract({
        abi: healthhubABI,
        address: contractAddress,
        functionName: 'requestAccess',
        account: address,
        args: [comment],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.nombre} />
      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Datos Básicos de Salud</Text>
          </Card.Content>
        </Card>

        <TouchableOpacity
          style={styles.centralButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.centralButtonText}>Añadir Pacientes</Text>
        </TouchableOpacity>

        <Card style={styles.groupedCard}>
          <Card.Content>
            {dataList.map((item, index) => (
              <View key={index}>
                <Pressable
                  onPress={() => console.log(`Clicked on ${item}`)}
                  onPressIn={() => handlePressIn(index)}
                  onPressOut={() => handlePressOut(index)}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
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
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.category}</Text>
                    </View>
                    <Text style={styles.itemDate}>{item.date}</Text>
                  </Animated.View>
                </Pressable>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                onPress={() => {
                    handleSumbit(inputValue);
                    setModalVisible(false);
                }}
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
            </View>
          </View>
        </Modal>
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
  groupedCard: {
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 2,
    width: '100%',
    marginBottom: height * 0.02,
  },
  cardTitle: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  icon: {
    backgroundColor: '#62CCC7',
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: height * 0.02,
    fontWeight: '600',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: height * 0.018,
    color: '#777',
    marginTop: 4,
  },
  itemDate: {
    fontSize: height * 0.018,
    color: '#333',
    fontWeight: '600',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
  },
});