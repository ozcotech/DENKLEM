import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';

const AgreementStatusScreen = () => {
  // ✅ Stack navigation'a çevrildi
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  return (
    <ThemedBackground>
      <ScreenContainer paddingTop={50} marginBottom={140}>
        <View style={styles.centerContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Anlaşma Durumu
          </Text>
          <View style={styles.buttonContainer}>
            <ThemedButton
              title="Anlaşma"
              onPress={() => navigation.navigate('DisputeType', { isAgreement: true })}
              style={styles.button}
            />
            <ThemedButton
              title="Anlaşmama"
              onPress={() => navigation.navigate('DisputeType', { isAgreement: false })}
              style={styles.button} 
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
    paddingHorizontal: '7.5%', 
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
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
    padding: 5,
    height: 100,
    minHeight: 80,
    justifyContent: 'center',
  },
});

export default AgreementStatusScreen;