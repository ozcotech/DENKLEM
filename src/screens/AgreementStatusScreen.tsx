import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AgreementStatusScreen = () => {
  // ✅ Turned into a NativeStackNavigationProp for AgreementStatusScreen
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedBackground>
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          Anlaşma Durumu
        </Text>
      </View>
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
  header: { // New header style
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '90%', // Updated to match tabbar width
    alignSelf: 'center',
  },
  headerText: { // New header text style
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
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