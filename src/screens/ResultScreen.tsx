import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import { ThemedCard } from '../components/common/ThemedCard';
import ScreenContainer from '../components/common/ScreenContainer';
import { useTheme } from '../theme/ThemeContext';
import { formatKurusToTlString } from '../utils/formatCurrency';
import { calculateSMM } from '../utils/smmCalculator';
import { SMMCalculationType } from '../constants/smmOptions';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Added import

const ResultScreen = () => {
  // ✅ Turned on stack navigation type checking
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Added insets
  const { result, isAgreement, disputeType } = route.params;

  // Convert TL result to kurus string
  const resultInKurusString = Math.round(result * 100).toString();
  const formattedResult = formatKurusToTlString(resultInKurusString);

  // Calculate SMM details for non-agreement cases
  const smmResults = !isAgreement ? calculateSMM({
    mediationFee: result,
    calculationType: SMMCalculationType.KDV_DAHIL_STOPAJ_VAR
  }) : null;

  // Format SMM values for display
  const formatSmmValue = (value: number | null) => {
    if (value === null) return `0,00 ₺`;
    const kurusString = Math.round(value * 100).toString();
    return `${formatKurusToTlString(kurusString)} ₺`;
  };

  return (
    <ThemedBackground>
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          {`Arabuluculuk Ücreti`}
        </Text>
      </View>
      <ScreenContainer paddingTop={10} marginBottom={140}> 
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView} 
        >
          {/* The original title \"Arabuluculuk Ücreti\" was here. It has been moved to the new header view. */}
          
          <ThemedCard style={styles.resultCard}>
            <>
              <Text style={[styles.resultLabel, { color: theme.colors.text.secondary }]}>
                {`Uyuşmazlık Türü`}
              </Text>
              <Text style={[styles.resultLabel, { color: theme.colors.text.secondary, fontWeight: 'bold' }]}>
                {disputeType} 
              </Text>
            </>
            <Text style={[styles.resultText, { color: theme.colors.text.primary }]}>
              {`${formattedResult} ₺`}
            </Text>
            <Text style={[styles.resultLabel, { color: theme.colors.text.secondary }]}>{` `}</Text>
          </ThemedCard>

          {!isAgreement && smmResults && (
            <ThemedCard style={styles.smmCard}>
              <Text style={[styles.smmCardTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
                {`Serbest Meslek Makbuzu`}
              </Text>
              
              <View style={styles.smmTableContainer}>
                {/* Row 1: Brüt Ücret */}
                <View style={styles.smmTableRow}>
                  <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                    {`Brüt Ücret`}
                  </Text>
                  <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                    {formatSmmValue(smmResults.rows[0].tuzelKisiAmount)}
                  </Text>
                </View>
                
                {/* Row 2: Gelir Vergisi Stopajı */}
                <View style={styles.smmTableRow}>
                  <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                    {`Gelir Vergisi Stopajı (%20)`}
                  </Text>
                  <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                    {formatSmmValue(smmResults.rows[1].tuzelKisiAmount)}
                  </Text>
                </View>
                
                {/* Row 3: Net Ücret */}
                <View style={styles.smmTableRow}>
                  <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                    {`Net Ücret`}
                  </Text>
                  <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                    {formatSmmValue(smmResults.rows[2].tuzelKisiAmount)}
                  </Text>
                </View>
                
                {/* Row 4: KDV */}
                <View style={styles.smmTableRow}>
                  <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                    {`KDV (%20)`}
                  </Text>
                  <Text style={[styles.smmTableCell, styles.smmValueCell, { color: theme.colors.text.primary }]}>
                    {formatSmmValue(smmResults.rows[3].tuzelKisiAmount)}
                  </Text>
                </View>
                
                {/* Row 5: Tahsil Edilecek Tutar */}
                <View style={styles.smmTableRow}>
                  <Text style={[styles.smmTableCell, styles.smmLabelCell, { color: theme.colors.text.secondary }]}>
                    {`Tahsil Edilecek Tutar`}
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 10,
    paddingHorizontal: '5%', // Reduced from 7.5% to match tabbar width
    minHeight: '100%',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    // marginTop: 20, // Removed marginTop as spacing is handled by header and ScreenContainer paddingTop
  },
});

export default ResultScreen;