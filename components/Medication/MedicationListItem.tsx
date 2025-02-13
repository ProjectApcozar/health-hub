// MedicationListItem.tsx
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Avatar, Text, TouchableRipple } from 'react-native-paper';

interface MedicationListItemProps {
  item: {
    name: string;
    startDate: string;
    duration: string;
    icon?: string;
    category?: string;
  };
  onPress?: () => void;
  animation?: Animated.Value;
}

export const MedicationListItem = ({ item, onPress, animation }: MedicationListItemProps) => {
  const scale = animation || new Animated.Value(1);

  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, 0.1)"
      style={styles.touchable}
      borderless
    >
      <Animated.View style={[styles.listItem, { transform: [{ scale }] }]}>
        <Avatar.Icon
          size={40}
          icon={item.icon || 'pill'}
          style={styles.icon}
          color="#fff"
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          {item.category ? (
            <Text style={styles.itemSubtitle}>{item.category}</Text>
          ) : (
            <Text style={styles.itemSubtitle}>{`${item.startDate} - ${item.duration} days`}</Text>
          )}
        </View>
      </Animated.View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
    touchable: {
      borderRadius: 10,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: '#FFFFFF',
    },
    icon: {
      backgroundColor: '#62CCC7',
      marginRight: 12,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    itemSubtitle: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
    },
  });
