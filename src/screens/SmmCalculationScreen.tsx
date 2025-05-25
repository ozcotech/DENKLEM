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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { ThemedCard } from '../components/common/ThemedCard';
import ScreenContainer from '../components/common/ScreenContainer';
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // State management
  const [mediationFee, setMediationFee] = useState<string>('');
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
    
    const tlMediationFee = convertKurusStringToTlNumber(mediationFee);

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
    
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 200);
  };

  // Handle mediation fee input changes with formatting
  const handleMediationFeeChange = (text: string) => {
    const rawDigits = normalizeToKurusString(text);
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
      <ScreenContainer paddingTop={50} marginBottom={140}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={[
                  styles.contentContainer, 
                  { justifyContent: calculated ? 'flex-start' : 'center' }
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
                      value={mediationFee === '' ? '' : formatKurusToTlString(mediationFee)}
                      onChangeText={handleMediationFeeChange}
                      placeholder="Arabuluculuk Ücretini Girin"
                      placeholderTextColor={theme.colors.text.secondary || '#666666'}
                      keyboardType="numeric"
                      maxLength={18}
                      textAlign="center" 
                    />
                    
                    <Text style={[styles.label, { color: theme.colors.text.primary, marginTop: 15 }]}>
                      Hesaplama Türü:
                    </Text>
                    <View style={styles.optionsContainer}>
                      {smmCalculationTypeOptions.map((option) => {
                        const [firstLine, secondLine] = option.label.split(', ');
                        
                        return (
                          <ThemedButton
                            key={option.value}
                            title={`${firstLine}\n${secondLine}`} 
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
                        );
                      })}
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
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </ScreenContainer>
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
    paddingTop: 70,
    paddingBottom: 180,
    paddingHorizontal: '7.5%',
    minHeight: '100%',
    width: '100%',
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
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center', 
  },
  calculateButton: {
    marginTop: 10, 
    width: '100%',
    paddingVertical: 12, 
  },
  calculateButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultsContainer: {
    width: '100%',
    marginTop: 1,
    marginBottom: 20,
  },
  resultsCard: {
    width: '100%',
    padding: 8, 
    paddingTop: 10, 
    paddingBottom: 12,
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
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    marginVertical: 3,
    width: '48%',
    height: 60,
  },
  selectedOption: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    shadowOpacity: 0.4,
  },
  optionText: {
    fontSize: 13,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default SMMCalculationScreen;