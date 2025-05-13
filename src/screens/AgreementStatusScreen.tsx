

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const AgreementStatusScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anlaşma Durumu</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DisputeType', { isAgreement: true })}
        >
          <Text style={styles.buttonText}>Anlaşma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DisputeType', { isAgreement: false })}
        >
          <Text style={styles.buttonText}>Anlaşmama</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#d0e8ff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AgreementStatusScreen;