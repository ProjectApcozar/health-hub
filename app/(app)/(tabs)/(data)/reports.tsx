import React from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Avatar, Divider } from 'react-native-paper';
import { CommonHeader } from '@/components/CommonHeader';
import { useGetUserByAddress } from '@/hooks/useGetUserByAddress';
import { useAccount } from 'wagmi';

const { width, height } = Dimensions.get('window');

const dataList = [
  {
    id: '1',
    title: 'Diabetes Mellitus',
    date: '15/03/2020',
    category: 'Endocrinología',
    icon: 'clipboard-text-outline',
  },
  {
    id: '2',
    title: 'Hipertensión Arterial',
    date: '10/07/2018',
    category: 'Cardiología',
    icon: 'heart-outline',
  },
  {
    id: '3',
    title: 'Vacunas Completas',
    date: '20/01/2023',
    category: 'Inmunología',
    icon: 'needle',
  },
];

export default function Reports() {
  const { address } = useAccount();
  if (!address) return null;

  const { user } = useGetUserByAddress(address);

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

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader userName={user?.name} />

      <View style={styles.content}>
        <Card style={styles.primaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Datos Básicos de Salud</Text>
          </Card.Content>
        </Card>
        <Card style={styles.groupedCard}>
          <Card.Content>
            {dataList.map((item, index) => (
              <View key={item.id}>
                <Pressable
                  onPress={() => console.log(`Clicked on ${item.title}`)}
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
                      icon={item.icon}
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
});
