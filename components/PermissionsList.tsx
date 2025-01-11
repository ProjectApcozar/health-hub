import { Avatar, Card, Text } from "react-native-paper";
import { View, StyleSheet, Dimensions, Pressable, Animated, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useGetAuthorizedDoctors } from "@/hooks/useGetAuthorizedDoctors";
import { useAccount } from "wagmi";

export const PermissionsList = () => {
  const { address } = useAccount();
  if (!address) return null;

  const { doctors } = useGetAuthorizedDoctors(address);
  const dataList: any[] = doctors;
  if (!doctors || doctors.length === 0) return null;

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
    
    console.log('Doctors:', doctors);

    return (
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
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  itemDate: {
    fontSize: height * 0.018,
    color: '#333',
    fontWeight: '600',
  },
  itemDetails: {
    flex: 1,
  },
  itemSubtitle: {
    fontSize: height * 0.018,
    color: '#777',
    marginTop: 4,
  },
  itemTitle: {
    fontSize: height * 0.02,
    fontWeight: '600',
    color: '#333',
  },
  icon: {
    backgroundColor: '#62CCC7',
    marginRight: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  groupedCard: {
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 2,
    width: '100%',
    marginBottom: height * 0.02,
  },
});