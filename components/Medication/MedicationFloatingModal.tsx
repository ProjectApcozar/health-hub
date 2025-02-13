import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { MedicationListItem } from './MedicationListItem';
import { Medication } from '@/common/types';

interface FloatingModalProps {
  visible: boolean;
  data: Medication[];
  onClose: () => void;
}

const groupByDate = (data: Medication[]) => {
  return data.reduce((acc, item) => {
    (acc[item.startDate] = acc[item.startDate] || []).push(item);
    return acc;
  }, {} as Record<string, Medication[]>);
};

const formatDate = (dateString: string) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const [day, month, year] = dateString.split('/').map(Number);
  return `${day} de ${months[month - 1]}, ${year}`;
};

export const MedicationFloatingModal: React.FC<FloatingModalProps> = ({ visible, data, onClose }) => {
  const groupedData = groupByDate(data);

  return (
    <Modal transparent={false} animationType="slide" visible={visible}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={onClose}
          />
          <Text style={styles.modalTitle}>Todos los medicamentos</Text>
        </View>

        <ScrollView contentContainerStyle={styles.modalScrollContent}>
          {Object.keys(groupedData).map((date) => (
            <View key={date}>
              <Text style={styles.dateLabel}>{formatDate(date)}</Text>
              {groupedData[date].map((item) => (
                <MedicationListItem
                  key={item.name}
                  item={item}
                  onPress={() => console.log(`Clicked on ${item.name}`)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalScrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  dateLabel: {
    color: '#62CCC7',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
});