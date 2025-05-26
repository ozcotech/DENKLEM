import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import {
  calculateWeekDates,
  getDisputeTypes,
  shouldCalculate,
} from '../utils/mediationTimeCalc';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Added import

export default function TimeCalculationScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets(); // Added insets
  
  const [startDate, setStartDate] = useState('');
  const [dateObject, setDateObject] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [weekDates, setWeekDates] = useState<{ [week: number]: Date }>({});
  const [calculated, setCalculated] = useState(false);

  // Set today's date as default on component mount
  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    setStartDate(formattedDate);
    setDateObject(today);
  }, []);

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
    console.log('onDateChange triggered:', event.type, selectedDate);
    
    // Handle date selection - always process when user selects a date
    if (event.type === 'set') {
      if (selectedDate) {
        setDateObject(selectedDate);
        
        // Format and set the date string
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        
        setStartDate(formattedDate);
      }
      
      // Always close picker when user taps a date (even if it's the same date)
      setShowPicker(false);
    }
    
    // Handle dismiss/cancel
    if (event.type === 'dismissed') {
      setShowPicker(false);
    }
  };

  const handleCalculate = () => {
    try {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(startDate)) {
        Alert.alert(
          `Giriş Hatası`,
          `Lütfen tarihi GG.AA.YYYY formatında girin`,
        );
        return;
      }
      const dates = calculateWeekDates(startDate);
      setWeekDates(dates);
      setCalculated(true);
    } catch (error) {
      Alert.alert(`Hesaplama Hatası`, String(error));
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
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          {`Süre Hesaplama`}
        </Text>
      </View>
      <ScreenContainer paddingTop={10} marginBottom={140}> 
        <View style={styles.centerContainer}>
          {/* The original title \"Süre Hesaplama\" was here. It has been moved to the new header view. */}
          
          <View style={styles.inputSection}>
            <Pressable
              onPress={openPicker}
              style={[styles.dateInputDisplay, { borderColor: theme.colors.button?.border || '#ccc' }]}>
              <Text style={[styles.dateInputText, { color: startDate ? theme.colors.text.primary : (theme.colors.text.secondary || '#888') }]}>
                {startDate || `Tarih Seçin`}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                key={`datepicker-${Date.now()}`} // Force re-render each time
                value={dateObject}
                mode="date"
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                onChange={onDateChange}
                locale={`tr-TR`}
                textColor={theme.colors.text.primary}
              />
            )}

            <ThemedButton
              title={`Hesapla`}
              onPress={handleCalculate}
              style={styles.calculateButton}
              textStyle={styles.calculateButtonText} // Added textStyle prop
            />
          </View>

          {calculated && (
            <View style={styles.resultsContainer}>
              <Text style={[styles.resultsHeader, { color: theme.colors.text.primary }]}>
                {`Uyuşmazlık Türüne Göre Süreler:`}
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
                          {`${week}. Hafta: ${formatDate(weekDates[week])}`}
                        </Text>
                      );
                    }
                    return null;
                  })}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  header: { // Added header style
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '85%',
    alignSelf: 'center',
  },
  headerText: { // Added headerText style
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '7.5%',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 30,
    // This style might be removed or repurposed if the original title is no longer used within ScreenContainer
  },
  inputSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 10,
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
    fontSize: 22,
  },
  calculateButton: {
    width: '100%',
    marginTop: 10,
    // Ensure button itself has enough padding if text becomes very large
    paddingVertical: 12, // Example padding, adjust as needed
  },
  calculateButtonText: { // Added new style for button text
    fontSize: 20, // Increased font size
    fontWeight: 'bold', // Optional: make it bold
  },
  resultsContainer: {
    width: '100%',
    marginTop: 10,
  },
  resultsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  disputeTypeContainer: {
    width: '100%',
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 20,
    marginLeft: 10,
    lineHeight: 22,
  },
});