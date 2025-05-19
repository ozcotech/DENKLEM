// filepath: /Users/ozkan/MEDPAY_react/src/screens/SmmCalculationScreen.tsx
import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
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

const SMMCalculationScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
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

    const numMediationFee = Number(mediationFee);

    if (isNaN(numMediationFee)) {
      Alert.alert('Uyarı', 'Lütfen arabuluculuk ücreti için geçerli bir sayısal değer giriniz.');
      return;
    }

    if (numMediationFee <= 0) {
      Alert.alert('Uyarı', 'Arabuluculuk ücreti pozitif bir değer olmalıdır.');
      return;
    }

    const input = {
      mediationFee: numMediationFee,
      calculationType,
    };

    const calculationResults = calculateSMM(input);
    setResults(calculationResults);
    setCalculated(true);
    Keyboard.dismiss();
  };

  // Navigate back to home screen
  const handleGoHome = () => {
    navigation.navigate('Start' as never);
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
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.contentContainer, { justifyContent: calculated ? 'flex-start' : 'center' }]}>
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
                      backgroundColor: theme.colors.card.background
                    }
                  ]}
                  value={mediationFee}
                  onChangeText={setMediationFee}
                  placeholder="Arabuluculuk Ücretini Girin"
                  placeholderTextColor={'#A0A0A0'}
                  keyboardType="numeric"
                />
                
                <Text style={[styles.label, { color: theme.colors.text.primary, marginTop: 15 }]}>
                  Hesaplama Türü:
                </Text>
                <View style={[
                  styles.pickerContainer, 
                  { 
                    borderColor: theme.colors.button.border,
                    backgroundColor: theme.colors.card.background
                  }
                ]}>
                  <Picker
                    selectedValue={calculationType}
                    onValueChange={(itemValue) => setCalculationType(itemValue as SMMCalculationType)}
                    style={[styles.picker, { color: theme.colors.text.primary }]}
                    dropdownIconColor={theme.colors.text.primary}
                  >
                    {smmCalculationTypeOptions.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        color={Platform.OS === 'ios' ? theme.colors.text.primary : undefined}
                      />
                    ))}
                  </Picker>
                </View>

                <ThemedButton
                  title="Hesapla"
                  onPress={mediationFee.trim() ? handleCalculate : () => {}}
                  style={[
                    styles.calculateButton,
                    !mediationFee.trim() && { opacity: 0.5 }
                  ]}
                  textStyle={!mediationFee.trim() ? { opacity: 0.5 } : undefined}
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
                  !calculated && { marginTop: 40 } // More margin when no results
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
  },
  resultsContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  resultsCard: {
    padding: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
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
    marginTop: 10,
    width: '85%',
  },
});

export default SMMCalculationScreen;