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
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  calculateWeekDates,
  getDisputeTypes,
  shouldCalculate,
} from '../utils/mediationTimeCalc';
import { useTheme } from '../theme/ThemeContext';

export default function TimeCalculationScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  
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

  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Main' as never);
  };

  const navigateToAbout = () => {
    navigation.navigate('Main', { screen: 'About' } as never);
  };

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
      <ScreenContainer paddingTop={50} marginBottom={140}>
        <View style={styles.centerContainer}>
          <Text style={[styles.titleText, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Süre Hesaplama
          </Text>
          
          <View style={styles.inputSection}>
            <Pressable
              onPress={openPicker}
              style={[styles.dateInputDisplay, { borderColor: theme.colors.button?.border || '#ccc' }]}>
              <Text style={[styles.dateInputText, { color: startDate ? theme.colors.text.primary : (theme.colors.text.secondary || '#888') }]}>
                {startDate || 'Tarih Seçin'}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                key={`datepicker-${Date.now()}`} // Force re-render each time
                value={dateObject}
                mode="date"
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                onChange={onDateChange}
                locale="tr-TR"
                textColor={theme.colors.text.primary}
              />
            )}

            <ThemedButton
              title="Hesapla"
              onPress={handleCalculate}
              style={styles.calculateButton}
            />
          </View>

          {calculated && (
            <View style={styles.resultsContainer}>
              <Text style={[styles.resultsHeader, { color: theme.colors.text.primary }]}>
                Uyuşmazlık Türüne Göre Süreler:
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
            </View>
          )}
        </View>
      </ScreenContainer>
      
      {/* Custom Tab Bar for TimeCalculationScreen */}
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
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '7.5%', // Added to match tab bar width
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputSection: {
    width: '100%', // Changed from 85% to 100% to fill container
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 10,
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
    width: '100%', // Full width of inputSection (which is now 85%)
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dateInputText: {
    fontSize: 16,
  },
  calculateButton: {
    width: '100%', // Full width of inputSection (which is now 85%)
    marginTop: 10,
  },
  resultsContainer: {
    width: '100%',
    marginTop: 10,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  disputeTypeContainer: {
    width: '100%', // Added to ensure consistent width
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