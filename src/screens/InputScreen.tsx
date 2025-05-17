import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { calculateMediationFee } from '../models/tariffModel';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { useTheme } from '../theme/ThemeContext';

const InputScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Input'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const isAgreement = route.params?.isAgreement ?? false;
  const disputeType = route.params?.disputeType ?? 'İşçi-İşveren';
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleCalculate = () => {
    // Validation
    if (!partyCount.trim()) {
      Alert.alert('Uyarı', 'Lütfen taraf sayısını boş bırakmayınız.');
      return;
    }
    if (isNaN(Number(partyCount))) {
      Alert.alert('Uyarı', 'Lütfen taraf sayısı için sayısal bir değer giriniz.');
      return;
    }
    if (isAgreement && !amount.trim()) {
      Alert.alert('Uyarı', 'Lütfen anlaşma tutarını boş bırakmayınız.');
      return;
    }
    if (isAgreement && isNaN(Number(amount))) {
      Alert.alert('Uyarı', 'Lütfen anlaşma tutarı için sayısal bir değer giriniz.');
      return;
    }

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
    <ThemedBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.container}>
          <Text style={[styles.titleText, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>Bilgileri Giriniz</Text>
          {isAgreement && (
            <TextInput
              style={[styles.input, { color: theme.colors.text.primary, backgroundColor: theme.colors.card.background, borderColor: theme.colors.button.border }]}
              keyboardType="numeric"
              placeholder="Anlaşma Tutarı (TL)"
              placeholderTextColor={theme.colors.text.secondary}
              value={amount}
              onChangeText={setAmount}
            />
          )}
          <TextInput
            style={[styles.input, { color: theme.colors.text.primary, backgroundColor: theme.colors.card.background, borderColor: theme.colors.button.border }]}
            keyboardType="numeric"
            placeholder="Taraf Sayısı"
            placeholderTextColor={theme.colors.text.secondary}
            value={partyCount}
            onChangeText={setPartyCount}
          />
          <ThemedButton
            title="Hesapla"
            onPress={handleCalculate}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    width: '90%',
  },
});

export default InputScreen;