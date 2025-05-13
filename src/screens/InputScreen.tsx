import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { calculateMediationFee } from '../models/tariffModel';

const InputScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Input'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isAgreement = route.params?.isAgreement ?? false;
  const disputeType = route.params?.disputeType ?? 'İşçi-İşveren';
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleCalculate = () => {
    const fee = calculateMediationFee({
      isAgreement,
      isMonetary: true,
      amount: isAgreement ? Number(amount) : undefined,
      partyCount: Number(partyCount),
      disputeType: disputeType,
    });

    navigation.navigate('Result', { result: fee });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bilgileri Giriniz</Text>
      {isAgreement && (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Anlaşma Tutarı (TL)"
          value={amount}
          onChangeText={setAmount}
        />
      )}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Taraf Sayısı"
        value={partyCount}
        onChangeText={setPartyCount}
      />
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Hesapla</Text>
      </TouchableOpacity>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#444',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InputScreen;