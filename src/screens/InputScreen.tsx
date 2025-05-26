import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { calculateMediationFee } from '../models/tariffModel';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { useTheme } from '../theme/ThemeContext';
import { formatKurusToTlString, normalizeToKurusString, convertKurusStringToTlNumber } from '../utils/formatCurrency';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Added import

const InputScreen = () => {
  // ✅ Turned on stack navigation type checking
  const route = useRoute<RouteProp<RootStackParamList, 'Input'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Added insets
  const isAgreement = route.params?.isAgreement ?? false;
  const disputeType = route.params?.disputeType ?? `İşçi-İşveren`;
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleAmountChange = (text: string) => {
    const rawDigits = normalizeToKurusString(text);
    setAmount(rawDigits);
  };

  const handleCalculate = () => {
    if (!partyCount.trim()) {
      Alert.alert(`Uyarı`, `Lütfen taraf sayısını boş bırakmayınız.`);
      return;
    }

    const numPartyCount = Number(partyCount);

    if (isNaN(numPartyCount)) {
      Alert.alert(`Uyarı`, `Lütfen taraf sayısı için geçerli bir sayısal değer giriniz.`);
      return;
    }

    if (numPartyCount <= 0) {
      Alert.alert(`Uyarı`, `Taraf sayısı pozitif bir tam sayı olmalıdır.`);
      return;
    }

    if (!Number.isInteger(numPartyCount)) {
      Alert.alert(`Uyarı`, `Taraf sayısı ondalıklı bir değer olamaz, lütfen tam sayı giriniz.`);
      return;
    }

    let tlAmountForCalc: number | undefined = undefined;

    if (isAgreement) {
      if (!amount.trim()) {
        Alert.alert(`Uyarı`, `Lütfen anlaşma tutarını boş bırakmayınız.`);
        return;
      }
      
      tlAmountForCalc = convertKurusStringToTlNumber(amount);

      if (isNaN(tlAmountForCalc)) {
        Alert.alert(`Uyarı`, `Lütfen anlaşma tutarı için geçerli bir sayısal değer giriniz.`);
        return;
      }
      if (tlAmountForCalc < 0) {
         Alert.alert(`Uyarı`, `Anlaşma tutarı negatif bir değer olamaz.`);
         return;
      }
    }

    const fee = calculateMediationFee({
      isAgreement,
      isMonetary: true,
      amount: tlAmountForCalc,
      partyCount: numPartyCount,
      disputeType: disputeType,
    });

    navigation.navigate('Result', { result: fee, isAgreement, disputeType });
  };

  return (
    <ThemedBackground>
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          {`Uyuşmazlık Bilgileri`}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === `ios` ? `padding` : `height`}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === `ios` ? -100 : 0} 
      >
        <ScreenContainer paddingTop={10} marginBottom={140} scrollable={false}>
          <View style={styles.centerContainer}>
            {/* The main title "Uyuşmazlık Türü" was previously here. It has been moved to the new header component above. */}
            <Text style={[styles.disputeTypeValue, { color: theme.colors.text.primary, fontWeight: 'bold' }]}>
              {disputeType}
            </Text>
            {isAgreement && (
              <TextInput
                style={[styles.input, { color: theme.colors.text.primary, backgroundColor: theme.colors.card.background, borderColor: theme.colors.button.border }]}
                keyboardType="numeric"
                placeholder={`Anlaşma Tutarı (TL)`}
                placeholderTextColor={theme.colors.text.secondary}
                value={amount === '' ? '' : formatKurusToTlString(amount)}
                onChangeText={handleAmountChange}
                maxLength={18} 
              />
            )}
            <TextInput
              style={[styles.input, { color: theme.colors.text.primary, backgroundColor: theme.colors.card.background, borderColor: theme.colors.button.border }]}
              keyboardType="numeric"
              placeholder={`Taraf Sayısı`}
              placeholderTextColor={theme.colors.text.secondary}
              value={partyCount}
              onChangeText={setPartyCount}
            />
            <ThemedButton
              title={`Hesapla`}
              onPress={handleCalculate}
              style={styles.button}
              textStyle={styles.buttonText} // Added textStyle
            />
          </View>
        </ScreenContainer>
      </KeyboardAvoidingView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  header: { // Added header style
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    width: '90%', // Updated to match tabbar width
    alignSelf: 'center',
  },
  headerText: { // Added headerText style
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%', // Reduced from 7.5% to match tabbar width
  },
  titleText: { // This style might be removed or repurposed if no longer used
    textAlign: 'center',
    marginBottom: 30,
  },
  disputeTypeValue: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20, // Kept as is, assuming this is for the {disputeType} text
  },
  input: {
    borderRadius: 8,
    padding: 18, // Increased padding
    marginBottom: 20,
    fontSize: 18, // Increased font size
    width: '100%', 
    textAlign: 'center',
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 18, // Added for button height
  },
  buttonText: { // Added new style for button text
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InputScreen;