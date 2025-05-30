import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Removed Alert
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import ScreenHeader from '../components/common/ScreenHeader';
import { ThemedCard } from '../components/common/ThemedCard'; // Added

// ✅ Stack navigation type - Because it is at DisputeCategory Stack
type DisputeCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DisputeCategory'>;

const DisputeCategoryScreen = () => {
  // ✅ Use navigation with type checking
  const navigation = useNavigation<DisputeCategoryScreenNavigationProp>();
  const theme = useTheme();

  return (
    <ThemedBackground>
      <ScreenHeader title="Uyuşmazlık Kategorisi" />
      <ScreenContainer paddingTop={10} marginBottom={110} scrollable={false}>
        <View style={styles.centerContainer}>
          {/* <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Uyuşmazlık Kategorisi
          </Text> */}
          {/* Text header moved */}
          <View style={styles.rowButtonContainer}>
            <ThemedButton
              title={`Konusu Para\nOlan\nUyuşmazlıklar`}
              onPress={() => navigation.navigate('AgreementStatus')}
              style={[
                styles.halfButton,
                { 
                  borderColor: theme.colors.text.primary, 
                  borderWidth: 1.5,
                } 
              ]}
              textStyle={styles.smallButtonText}
            />
            <ThemedButton
              title={`Konusu Para\nOlmayan\nUyuşmazlıklar`}
              onPress={() => navigation.navigate('DisputeType', { isAgreement: false })}
              style={styles.halfButton}
              textStyle={styles.smallButtonText}
            />
          </View>
          
          <ThemedCard style={styles.subTitleCard}> 
            <Text style={[styles.subTitleText, { color: theme.colors.text.primary, fontSize: 20, fontWeight: 'bold' }]}>
              Diğer Hesaplamalar
            </Text>
          </ThemedCard>

          <View style={styles.rowButtonContainer}>
            <ThemedButton
              title={`Süre\nHesaplama`}
              onPress={() => navigation.navigate('TimeCalculation')}
              style={styles.halfButton}
              textStyle={styles.smallButtonText} // Added textStyle here
            />
            <ThemedButton
              title={`SMM\nHesaplama`}
              onPress={() => navigation.navigate('SMMCalculation')}
              style={styles.halfButton}
              textStyle={styles.smallButtonText} // Added textStyle here
            />
          </View>
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%', // Reduced from 7.5% to better match tabbar width
    paddingTop: 90, // Changed from 80 to 90 to push content further down
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    // This title style is no longer used, but kept for reference
  },
  subTitleCard: {
    width: '100%', // Back to 100% to match button container
    // Not needed when width is 100%
    marginTop: 30,
    marginBottom: 50, // Changed from 24 to 50 for symmetry and more space
    borderRadius: 10, // Added to override ThemedCard default
  },
  subTitleText: { 
    textAlign: 'center',
  },
  /* // Old subTitle style, kept for reference
  subTitle: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  */
  rowButtonContainer: {
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 10,
    // Removed to avoid negative margin
  },
  halfButton: {
    flex: 1,
    margin: 5,
    height: 120, 
    padding: 5, 
    paddingHorizontal: 3, 
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center', // Added for text centering
  },
  smallButtonText: {
    fontSize: 18, // Changed from 16 to 18
    textAlign: 'center', // Ensure text is centered for multi-line
  },
});

export default DisputeCategoryScreen;