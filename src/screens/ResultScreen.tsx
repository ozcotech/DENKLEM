

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

const ResultScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesaplama Sonucu</Text>
      <Text style={styles.resultText}>{result.toLocaleString('tr-TR')} TL</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Start')}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e86de',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultScreen;