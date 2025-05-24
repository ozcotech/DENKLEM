import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { ThemedCard } from '../components/common/ThemedCard';
import ScreenContainer from '../components/common/ScreenContainer';
import { useTheme } from '../theme/ThemeContext';
import { formatKurusToTlString } from '../utils/formatCurrency'; // Import formatKurusToTlString
import { calculateSMM } from '../utils/smmCalculator';
import { SMMCalculationType } from '../constants/smmOptions';

const ResultScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const theme = useTheme();
  const { result, isAgreement, disputeType } = route.params; // result is in TL, e.g., 6000

  // Convert TL result to kurus string
  const resultInKurusString = Math.round(result * 100).toString(); // "600000"
  const formattedResult = formatKurusToTlString(resultInKurusString); // "6.000,00"

  // Calculate SMM details for non-agreement cases using the smmCalculator utility
  // Using KDV_DAHIL_STOPAJ_VAR (KDV ve Stopaj Dahil) calculation type for Tüzel Kişi
  const smmResults = !isAgreement ? calculateSMM({
    mediationFee: result,
    calculationType: SMMCalculationType.KDV_DAHIL_STOPAJ_VAR
  }) : null;

  // Format SMM values for display
  const formatSmmValue = (value: number | null) => {
    if (value === null) return '0,00 ₺';
    const kurusString = Math.round(value * 100).toString();
    return formatKurusToTlString(kurusString) + ' ₺';
  };

  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Main' as never);
  };

  const navigateToAbout = () => {
    navigation.navigate('Main', { screen: 'About' } as never);
  };

  return (
    <ThemedBackground>
      <ScreenContainer paddingTop={20} marginBottom={140}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
        <Text style={[styles.titleText, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>Arabuluculuk Ücreti</Text>
        
        <ThemedCard style={styles.resultCard}>
          <>
            <Text style={[styles.resultLabel, { color: theme.colors.text.secondary }]}>
              Uyuşmazlık Türü
            </Text>
            <Text style={[styles.resultLabel, { color: theme.colors.text.secondary, fontWeight: 'bold' }]}>
              {disputeType}
            </Text>
          </>
          <Text style={[styles.resultText, { color: theme.colors.text.primary }]}>{formattedResult} ₺</Text>
          <Text style={[styles.resultLabel, { color: theme.colors.text.secondary }]}>{/* Sub Text */}</Text>
        </ThemedCard>

        {!isAgreement && smmResults && (
          <ThemedCard style={styles.smmCard}>
            <Text style={[styles.smmCardTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
              Serbest Meslek Makbuzu
            </Text>
            
            <View style={styles.smmTableContainer}>
              {/* Row 1: Brüt Ücret */}
              <View style={styles.smmTableRow}>
                <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                  Brüt Ücret
                </Text>
                <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                  {formatSmmValue(smmResults.rows[0].tuzelKisiAmount)}
                </Text>
              </View>
              
              {/* Row 2: Gelir Vergisi Stopajı */}
              <View style={styles.smmTableRow}>
                <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                  Gelir Vergisi Stopajı (%20)
                </Text>
                <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                  {formatSmmValue(smmResults.rows[1].tuzelKisiAmount)}
                </Text>
              </View>
              
              {/* Row 3: Net Ücret */}
              <View style={styles.smmTableRow}>
                <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                  Net Ücret
                </Text>
                <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                  {formatSmmValue(smmResults.rows[2].tuzelKisiAmount)}
                </Text>
              </View>
              
              {/* Row 4: KDV */}
              <View style={styles.smmTableRow}>
                <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                  KDV (%20)
                </Text>
                <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                  {formatSmmValue(smmResults.rows[3].tuzelKisiAmount)}
                </Text>
              </View>
              
              {/* Row 5: Tahsil Edilecek Tutar */}
              <View style={styles.smmTableRow}>
                <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                  Tahsil Edilecek Tutar
                </Text>
                <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary, fontWeight: 'bold' }]}>
                  {formatSmmValue(smmResults.rows[4].tuzelKisiAmount)}
                </Text>
              </View>
            </View>
          </ThemedCard>
        )}
      </ScrollView>
      </ScreenContainer>
      
      {/* Custom Tab Bar for ResultScreen */}
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
      
      <Text style={[styles.footer, { color: theme.colors.text.secondary, ...theme.typography.body }]}>
        info@ozco.studio
      </Text>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  resultCard: {
    width: '100%', 
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smmCard: {
    width: '100%', 
    padding: 15,
    marginBottom: 20,
  },
  smmCardTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  smmTableContainer: {
    width: '100%',
  },
  smmTableRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between',
  },
  smmTableCell: {
    fontSize: 14,
  },
  smmLabelCell: {
    flex: 2,
    textAlign: 'left',
    paddingRight: 10,
  },
  smmValueCell: {
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '2%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 10,
    paddingHorizontal: '7.5%', 
    minHeight: '100%',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    marginTop: 20,
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

export default ResultScreen;