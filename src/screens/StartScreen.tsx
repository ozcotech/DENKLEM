import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>MEDPAY</Text>
      </View>
      <Text style={styles.text}>
        Arabuluculuk Ücret{'\n'}
        Hesaplama Programına{'\n'}
        Hoşgeldiniz
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DisputeCategory')}>
        <Text style={styles.buttonText}>Hesaplamaya Başla</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Made by ozcotech</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoBox: {
    backgroundColor: '#d0e8ff', // light blue
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e86de',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

export default StartScreen;