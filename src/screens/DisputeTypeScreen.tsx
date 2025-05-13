import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const disputeTypes = [
  'İşçi-İşveren',
  'Ticari',
  'Tüketici',
  'Ortaklığın Giderilmesi',
  'Kira, Komşu Hakkı, Kat Mülkiyeti',
  'Diğer',
  'Aile',
];

const DisputeTypeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { isAgreement } = route.params as { isAgreement: boolean };

  const handleSelect = (type: string) => {
    console.log('Seçilen Uyuşmazlık Türü:', type);
    navigation.navigate('Input', { isAgreement, disputeType: type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uyuşmazlık Türü</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {disputeTypes.map((type, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handleSelect(type)}>
            <Text style={styles.buttonText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e86de',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#d0e8ff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DisputeTypeScreen;