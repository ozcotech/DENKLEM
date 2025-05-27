import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import ScreenHeader from '../components/common/ScreenHeader';

const AgreementStatusScreen = () => {
  // ✅ Turned into a NativeStackNavigationProp for AgreementStatusScreen
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  return (
    <ThemedBackground>
      <ScreenHeader title="Anlaşma Durumu" />
      <ScreenContainer paddingTop={10} marginBottom={140} scrollable={false}>
        <View style={styles.centerContainer}>
          
          <View style={styles.buttonContainer}>
            <ThemedButton
              title={`Anlaşma\n\n✅`}
              onPress={() => navigation.navigate('DisputeType', { isAgreement: true })}
              style={styles.button}
              textStyle={styles.buttonText} // Added textStyle
            />
            <ThemedButton
              title={`Anlaşmama\n\n❌`}
              onPress={() => navigation.navigate('DisputeType', { isAgreement: false })}
              style={styles.button}
              textStyle={styles.buttonText} // Added textStyle
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
    justifyContent: 'center', // Ensures vertical centering
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%', // Reduced from 7.5% to match tabbar width
    paddingTop: 60, // Added to push content down
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    // This title style is not used in the current component, but can be used if needed
  },
  buttonContainer: {
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 0, // Reduced padding from 5 to 0
    height: 140, // Increased height to match DisputeCategoryScreen's halfButton
    minHeight: 100, // Adjusted minHeight
    justifyContent: 'center',
    alignItems: 'center', // Added for text centering
    minWidth: 0, // Ensures buttons can shrink if needed
  },
  buttonText: { // Added new style for button text
    fontSize: 20, // Changed from 21 to 20 for multi-line text
    textAlign: 'center',
  },
});

export default AgreementStatusScreen;