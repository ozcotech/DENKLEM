// filepath: /Users/ozkan/MEDPAY_react/src/screens/SmmCalculationScreen.tsx
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { ThemedCard } from '../components/common/ThemedCard';
import { calculateSMM } from '../utils/smmCalculator';
import { 
  SMMCalculationType, 
  smmCalculationTypeOptions,
  PERSON_TYPE_GERCEK,
  PERSON_TYPE_TUZEL
} from '../constants/smmOptions';
import { formatKurusToTlString, normalizeToKurusString, convertKurusStringToTlNumber } from '../utils/formatCurrency';

const SMMCalculationScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // State management
  const [mediationFee, setMediationFee] = useState<string>(''); // Stores raw kurus as string (e.g., "100000")
  const [calculationType, setCalculationType] = useState<SMMCalculationType>(
    SMMCalculationType.KDV_DAHIL_STOPAJ_YOK
  );
  const [calculated, setCalculated] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  // Calculate SMM results based on inputs
  const handleCalculate = () => {
    if (!mediationFee || mediationFee.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen arabuluculuk ücretini boş bırakmayınız.');
      return;
    }
    
    const tlMediationFee = convertKurusStringToTlNumber(mediationFee); // Convert "100000" to 1000

    if (isNaN(tlMediationFee)) {
      Alert.alert('Uyarı', 'Lütfen arabuluculuk ücreti için geçerli bir sayısal değer giriniz.');
      return;
    }

    if (tlMediationFee <= 0) {
      Alert.alert('Uyarı', 'Arabuluculuk ücreti pozitif bir değer olmalıdır.');
      return;
    }

    const input = {
      mediationFee: tlMediationFee,
      calculationType,
    };

    const calculationResults = calculateSMM(input);
    setResults(calculationResults);
    setCalculated(true);
    Keyboard.dismiss();
    
    // Hesaplama sonrası scroll pozisyonunu ayarla
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  // Navigate back to home screen
  const handleGoHome = () => {
    navigation.navigate('Start' as never);
  };
  
  // Handle mediation fee input changes with formatting
  const handleMediationFeeChange = (text: string) => {
    // When text is input, we expect it to be the formatted TL string (e.g., "1.000,00")
    // We need to convert it back to a raw digit string (kurus) for storage.
    const rawDigits = normalizeToKurusString(text); // "100000"
    setMediationFee(rawDigits);
  };

  // Format currency for display
  const formatCurrency = (amount: number | null): string => {
    if (amount === null) return '-';
    return `₺${amount.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <ThemedBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[
              styles.contentContainer, 
              { 
                justifyContent: calculated ? 'flex-start' : 'center',
                paddingTop: calculated ? 70 : 0 
              }
            ]}>
              {/* Input Section */}
              <View style={styles.inputSection}>
                <Text style={[styles.label, { color: theme.colors.text.primary }]}>
                  Arabuluculuk Ücreti:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: theme.colors.text.primary,
                      borderColor: theme.colors.button.border,
                      backgroundColor: theme.colors.card.background,
                      textAlign: 'center' 
                    }
                  ]}
                  value={mediationFee === '' ? '' : formatKurusToTlString(mediationFee)} // Show formatted value or empty string
                  onChangeText={handleMediationFeeChange}
                  placeholder="Arabuluculuk Ücretini Girin"
                  placeholderTextColor={'#A0A0A0'}
                  keyboardType="numeric"
                  maxLength={18} // Prevent excessively long entries
                  textAlign="center" 
                />
                
                <Text style={[styles.label, { color: theme.colors.text.primary, marginTop: 15 }]}>
                  Hesaplama Türü:
                </Text>
                <View style={styles.optionsContainer}>
                  {smmCalculationTypeOptions.map((option) => (
                    <ThemedButton
                      key={option.value}
                      title={option.label}
                      onPress={() => setCalculationType(option.value)}
                      style={[
                        styles.optionButton,
                        calculationType === option.value && {
                          ...styles.selectedOption,
                          borderColor: theme.colors.text.primary
                        }
                      ]}
                      textStyle={[
                        styles.optionText,
                        calculationType === option.value && styles.selectedOptionText
                      ]}
                    />
                  ))}
                </View>

                <ThemedButton
                  title="Hesapla"
                  onPress={handleCalculate}
                  style={styles.calculateButton}
                  textStyle={styles.calculateButtonText}
                />
              </View>
              
              {/* Results Section */}
              {calculated && results && (
                <View style={styles.resultsContainer}>
                  <ThemedCard style={styles.resultsCard}>
                    <Text style={[styles.resultsTitle, { color: theme.colors.text.primary }]}>
                      SMM Hesaplama Sonuçları
                    </Text>
                    
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableHeaderCell, styles.descriptionCell, { color: theme.colors.text.primary }]}>
                        Açıklama
                      </Text>
                      <Text style={[styles.tableHeaderCell, styles.amountCell, { color: theme.colors.text.primary }]}>
                        {PERSON_TYPE_TUZEL}
                      </Text>
                      <Text style={[styles.tableHeaderCell, styles.amountCell, { color: theme.colors.text.primary }]}>
                        {PERSON_TYPE_GERCEK}
                      </Text>
                    </View>
                    
                    {/* Table Rows */}
                    {results.rows.map((row: any, index: number) => (
                      <View key={index} style={[
                        styles.tableRow,
                        index % 2 === 0 ? { backgroundColor: 'rgba(0,0,0,0.02)' } : {}
                      ]}>
                        <Text style={[styles.tableCell, styles.descriptionCell, { color: theme.colors.text.primary }]}>
                          {row.label}
                        </Text>
                        <Text style={[styles.tableCell, styles.amountCell, { color: theme.colors.text.primary }]}>
                          {formatCurrency(row.tuzelKisiAmount)}
                        </Text>
                        <Text style={[styles.tableCell, styles.amountCell, { color: theme.colors.text.primary }]}>
                          {formatCurrency(row.gercekKisiAmount)}
                        </Text>
                      </View>
                    ))}
                  </ThemedCard>
                </View>
              )}

              {/* Home Button */}
              <ThemedButton
                title="Ana Sayfaya Dön"
                onPress={handleGoHome}
                style={[
                  styles.homeButton,
                  !calculated && { marginTop: 40 } 
                ]}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 40, 
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  inputSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '7.5%',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '85%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center', 
  },
  pickerContainer: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  calculateButton: {
    marginTop: 10, 
    width: '85%',
    paddingVertical: 12, 
  },
  calculateButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultsContainer: {
    width: '100%',
    marginTop: 1, 
    marginBottom: 5, 
  },
  resultsCard: {
    padding: 8, 
    paddingTop: 10, 
    paddingBottom: 8, 
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, 
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 7, 
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCell: {
    fontSize: 14,
  },
  descriptionCell: {
    flex: 2,
    paddingRight: 5,
  },
  amountCell: {
    flex: 1.5,
    textAlign: 'right',
    paddingRight: 5,
  },
  homeButton: {
    marginTop: 5, 
    width: '85%',
  },
  optionsContainer: {
    width: '85%',
    flexDirection: 'column',
    marginBottom: 10, 
  },
  optionButton: {
    marginVertical: 5, 
    width: '100%', // Make sure the button takes full width of its container
  },
  selectedOption: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#FFFFFF',
    borderWidth: 1.5, // Make the border more pronounced
    shadowOpacity: 0.4, // Add more shadow for better visibility
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default SMMCalculationScreen;