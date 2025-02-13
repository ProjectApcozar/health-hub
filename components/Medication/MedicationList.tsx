// MedicationList.tsx
import React, { useState } from 'react';
import { Animated, StyleSheet, Dimensions, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MedicationFloatingModal } from './MedicationFloatingModal';
import { useAccount } from 'wagmi';
import { useGetMedicationsByAddressQuery } from '@/services/apis/medication';
import { MedicationListItem } from './MedicationListItem';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  seeAll: {
    textAlign: 'center',
    paddingVertical: 12,
    color: '#62CCC7',
    fontWeight: '600',
  },
});

export const MedicationList = () => {
  const { address } = useAccount();
  const [isModalVisible, setModalVisible] = useState(false);
  const { data: medications } = useGetMedicationsByAddressQuery(address!);

  if (!address || !Array.isArray(medications) || medications.length === 0) return null;

  const animations = medications.map(() => new Animated.Value(1));
  const showSeeAll = true;
  const displayedMedications = showSeeAll ? medications.slice(0, 3) : medications;

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <View>
      <Card style={styles.groupedCard}>
        <Card.Content style={styles.cardContent}>
          {displayedMedications.map((item, index) => (
            <MedicationListItem
              key={index}
              item={item}
              onPress={() => console.log(`Clicked on ${item.name}`)}
              animation={animations[index]}
            />
          ))}
          {showSeeAll && (
            <Text onPress={toggleModal} style={styles.seeAll}>
              Ver todo
            </Text>
          )}
        </Card.Content>
      </Card>
      <MedicationFloatingModal
        visible={isModalVisible}
        onClose={toggleModal}
        data={medications}
      />
    </View>
  );
};
