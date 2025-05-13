

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';

const InputScreen = () => {
  // This will later come from route params or navigation
  const [isAgreement, setIsAgreement] = useState(true);
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleCalculate = () => {
    console.log('Calculating fee...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bilgileri Giriniz</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Anlaşmalı</Text>
        <Switch
          value={isAgreement}
          onValueChange={setIsAgreement}
        />
        <Text style={styles.switchLabel}>Anlaşmasız</Text>
      </View>
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