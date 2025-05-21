import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ThemedHeader from '../components/common/ThemedHeader';
import {
  calculateWeekDates,
  getDisputeTypes,
  shouldCalculate,
} from '../utils/mediationTimeCalc';
import { useTheme } from '../theme/ThemeContext';

export default function TimeCalculationScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  
  // That method is commented out because it was not used in the original code
  // const handleNavigateHome = () => {
  //   navigation.navigate('Start' as never); 
  // };
  
  const [startDate, setStartDate] = useState('');
  const [dateObject, setDateObject] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [weekDates, setWeekDates] = useState<{ [week: number]: Date }>({});
  const [calculated, setCalculated] = useState(false);

  const disputeTypes = getDisputeTypes();
  const allWeeks = Array.from(
    new Set(disputeTypes.flatMap(d => d.weekIntervals)),
  ).sort((a, b) => a - b);

  const openPicker = () => {
    // Set dateObject to current date if no startDate, otherwise parse from startDate
    if (startDate) {
      const parts = startDate.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        const parsedDate = new Date(year, month, day);
        if (!isNaN(parsedDate.getTime())) {
          setDateObject(parsedDate);
        } else {
          setDateObject(new Date());
        }
      } else {
        setDateObject(new Date());
      }
    } else {
      setDateObject(new Date());
    }
    setShowPicker(true);
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // Always update the Date object if there's a selectedDate, 
    // regardless of the event type (even when selecting the same date)
    if (selectedDate) {
      setDateObject(selectedDate);
      
      // Format and set the date string
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      
      // Only update startDate if it's actually changed
      // or if it's the first time setting (empty string)
      if (startDate !== formattedDate || startDate === '') {
        setStartDate(formattedDate);
      }
    }
    
    // Close picker on set or dismissed events
    if (event.type === 'set' || event.type === 'dismissed') {
      setShowPicker(false);
    }
  };

  const handleCalculate = () => {
    try {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(startDate)) {
        Alert.alert(
          'Giriş Hatası',
          'Lütfen tarihi GG.AA.YYYY formatında girin',
        );
        return;
      }
      const dates = calculateWeekDates(startDate);
      setWeekDates(dates);
      setCalculated(true);
    } catch (error) {
      Alert.alert('Hesaplama Hatası', String(error));
    }
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <ThemedBackground>
      <ThemedHeader />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.pageContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.inputSection}>
              <Text style={[styles.header, {
                color: theme.colors.text.primary,
                fontSize: theme.typography.h2?.fontSize || 22,
                fontWeight: theme.typography.h2?.fontWeight || 'bold',
              }]}>
                Başlangıç Tarihi Girin:
              </Text>
              <Pressable
                onPress={openPicker}
                style={[styles.dateInputDisplay, { borderColor: theme.colors.button?.border || '#ccc' }]}>
                <Text style={[styles.dateInputText, { color: startDate ? theme.colors.text.primary : (theme.colors.text.secondary || '#888') }]}>
                  {startDate || 'Tarih Seçin'}
                </Text>
              </Pressable>

              {showPicker && (
                <DateTimePicker
                  value={dateObject}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              <ThemedButton
                title="Hesapla"
                onPress={handleCalculate}
                style={styles.calculateButton}
              />
              {/* Home button is now provided by ThemedHeader */}
            </View>

            {calculated && (
              <ScrollView style={styles.resultsContainer}>
                <Text style={[styles.resultsHeader, { color: theme.colors.text.primary }]}>
                  Hesaplanan Tarihler:
                </Text>
                {disputeTypes.map(disputeType => (
                  <View key={disputeType.name} style={[styles.disputeTypeContainer, { backgroundColor: theme.colors.card?.background || (Array.isArray(theme.colors.background) ? theme.colors.background[1] : '#f9f9f9') }]}>
                    <Text style={[styles.disputeTypeName, { color: theme.colors.text.primary }]}>
                      {disputeType.name}
                    </Text>
                    {allWeeks.map(week => {
                      if (shouldCalculate(disputeType.name, week) && weekDates[week]) {
                        return (
                          <Text key={week} style={[styles.dateText, { color: theme.colors.text.secondary || theme.colors.text.primary || '#555' }]}>
                            {week}. Hafta: {formatDate(weekDates[week])}
                          </Text>
                        );
                      }
                      return null;
                    })}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 10, // Extra padding for the header
  },
  pageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputSection: {
    width: '100%', 
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dateInputDisplay: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
    marginBottom: 20,
    width: '100%', 
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dateInputText: {
    fontSize: 16,
  },
  calculateButton: {
    width: '100%', 
    marginTop: 10,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  disputeTypeContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disputeTypeName: {
    fontSize: 16,
    fontWeight: '600', 
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    marginLeft: 10, 
    lineHeight: 20, 
  },
});