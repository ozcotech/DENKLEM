import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { calculateMediationFee } from '../models/tariffModel';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
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

  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Main' as never);
  };

  const navigateToAbout = () => {
    navigation.navigate('About' as never);
  };

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

    navigation.navigate('Result', { result: fee, isAgreement, disputeType });
  };

  return (
    <ThemedBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScreenContainer paddingTop={50} marginBottom={140}>
          <View style={styles.centerContainer}>
            <>
              <Text style={[styles.titleText, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
                Uyuşmazlık Türü
              </Text>
              <Text style={[styles.disputeTypeValue, { color: theme.colors.text.primary, fontWeight: 'bold' }]}>
                {disputeType}
              </Text>
            </>
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
        </ScreenContainer>
      </KeyboardAvoidingView>
      
      {/* Custom Tab Bar for InputScreen */}
      <View style={styles.tabBarWrapper}>
        <View 
          style={[
            styles.tabBarContainer, 
            { 
              backgroundColor: theme.colors.card.background,
              borderTopColor: theme.colors.button.border,
              borderColor: theme.colors.button.border,
            }
          ]}
        >
          {/* Home Button */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToHome}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/home-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Ana Sayfa
              </Text>
            </View>
          </TouchableOpacity>

          {/* Middle spacer - can be used for additional buttons */}
          <View style={styles.middleSpacer} />

          {/* Info Button (About Screen) */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToAbout}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/info-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Hakkında
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  resultLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  disputeTypeValue: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20,
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
  // Tab Bar Styles
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // moved up to leave space for footer
    alignItems: 'center',
    zIndex: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 25, // Rounded corners for tab bar
    width: '85%',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 70 : 65, // Adjusted height
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 0, // Remove padding to allow button height control
    backgroundColor: '#fff', // fallback, will be overridden by theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    borderRadius: 10,
    height: '90%',
    overflow: 'hidden', // Prevents content from overflowing
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabButtonInner: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 6,
  },
  middleSpacer: {
    flex: 3, // This gives more space in the middle
  },
});

export default InputScreen;