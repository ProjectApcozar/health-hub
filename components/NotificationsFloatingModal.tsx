
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { PermissionRequestList } from './PermissionRequestList';

interface FloatingModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationsFloatingModal: React.FC<FloatingModalProps> = ({ visible, onClose }) => {

  return (
    <View>
        <Modal transparent={false} animationType="slide" visible={visible}>
        <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
            <IconButton
                icon="arrow-left"
                size={24}
                onPress={onClose}
            />
            <Text style={styles.modalTitle}>Todas las notificaciones</Text>
            </View>

            <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <PermissionRequestList />
            </ScrollView>
        </View>
        </Modal>
    </View>
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