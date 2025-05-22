import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { calculateMediationFee } from '../models/tariffModel';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ThemedHeader from '../components/common/ThemedHeader';
import { useTheme } from '../theme/ThemeContext';
import { formatKurusToTlString, normalizeToKurusString, convertKurusStringToTlNumber } from '../utils/formatCurrency'; // Import helper functions

const InputScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Input'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const isAgreement = route.params?.isAgreement ?? false;
  const disputeType = route.params?.disputeType ?? 'İşçi-İşveren';
  const [amount, setAmount] = useState(''); // Stores raw kurus as string (e.g., "350000")
  const [partyCount, setPartyCount] = useState('');

  const handleAmountChange = (text: string) => {
    // When text is input, we expect it to be the formatted TL string (e.g., "3.500,00")
    // We need to convert it back to a raw digit string (kurus) for storage.
    const rawDigits = normalizeToKurusString(text); // "350000"
    setAmount(rawDigits);
  };

  const handleCalculate = () => {
    // Is party count empty?
    if (!partyCount.trim()) {
      Alert.alert('Uyarı', 'Lütfen taraf sayısını boş bırakmayınız.');
      return;
    }

    const numPartyCount = Number(partyCount);

    // Is it numeric?
    if (isNaN(numPartyCount)) {
      Alert.alert('Uyarı', 'Lütfen taraf sayısı için geçerli bir sayısal değer giriniz.');
      return;
    }

    // Is it zero or negative?
    if (numPartyCount <= 0) {
      Alert.alert('Uyarı', 'Taraf sayısı pozitif bir tam sayı olmalıdır.');
      return;
    }

    // Is it decimal? (If not an integer)
    if (!Number.isInteger(numPartyCount)) {
      Alert.alert('Uyarı', 'Taraf sayısı ondalıklı bir değer olamaz, lütfen tam sayı giriniz.');
      return;
    }

    let tlAmountForCalc: number | undefined = undefined;

    // If agreement, check amount fields
    if (isAgreement) {
      if (!amount.trim()) { // amount is still the raw kurus string "350000"
        Alert.alert('Uyarı', 'Lütfen anlaşma tutarını boş bırakmayınız.');
        return;
      }
      
      tlAmountForCalc = convertKurusStringToTlNumber(amount); // Convert "350000" to 3500

      if (isNaN(tlAmountForCalc)) { // Should not happen if normalizeToKurusString works
        Alert.alert('Uyarı', 'Lütfen anlaşma tutarı için geçerli bir sayısal değer giriniz.');
        return;
      }
      if (tlAmountForCalc < 0) { // Check the converted TL amount
         Alert.alert('Uyarı', 'Anlaşma tutarı negatif bir değer olamaz.');
         return;
      }
    }

    const fee = calculateMediationFee({
      isAgreement,
      isMonetary: true,
      amount: tlAmountForCalc, // Use the converted TL number
      partyCount: numPartyCount,
      disputeType: disputeType,
    });

    navigation.navigate('Result', { result: fee, isAgreement });
  };

  return (
    <ThemedBackground>
      <ThemedHeader />
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
              value={amount === '' ? '' : formatKurusToTlString(amount)} // Show placeholder when empty, otherwise formatted value
              onChangeText={handleAmountChange}
              maxLength={18} 
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