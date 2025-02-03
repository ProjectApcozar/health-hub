import { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Text } from 'react-native-paper';
import { CommonHeader } from '@/components/CommonHeader';
import { useAccount } from 'wagmi';
import { useGetUserByAddressQuery } from '@/services/apis/user';
import { VaccinesList } from '@/components/VaccinesList';
import { VaccinesForm } from '@/components/VaccinesForm';

const { width, height } = Dimensions.get('window');

export default function Vaccines() {
  const { address } = useAccount();
  
  if (!address) return null;
  const [modalVisible, setModalVisible] = useState(false);
  const { data: user } = useGetUserByAddressQuery(address);

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />
      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Vacunas</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={styles.centralButton}
          labelStyle={styles.centralButtonText}
          >
            Añadir Vacunas
        </Button>
        <VaccinesForm visible={modalVisible} onClose={() => setModalVisible(false)} />
        <VaccinesList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
