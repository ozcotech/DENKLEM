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
  // ✅ Stack navigation'a çevrildi
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
      <ScreenContainer paddingTop={10} marginBottom={140}>
        <View style={styles.centerContainer}>
          {/* <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Anlaşma Durumu
          </Text> */}
          {/* Eski başlık yukarıdaki header'a taşındı. */}
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
  header: { // Yeni stil
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '85%',
    alignSelf: 'center',
  },
  headerText: { // Yeni stil
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
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
    // Bu stil artık headerText tarafından yönetiliyor, isterseniz kaldırılabilir.
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