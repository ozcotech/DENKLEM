import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ThemedHeader from '../components/common/ThemedHeader';

const AgreementStatusScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  return (
    <ThemedBackground>
      <ThemedHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
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
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 70, // Adjust this value based on the height of your header
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 180,
    width: '100%',
    minHeight: '100%',
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
    marginHorizontal: -2,
    paddingHorizontal: 16,
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