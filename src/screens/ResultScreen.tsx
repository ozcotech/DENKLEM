import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { useTheme } from '../theme/ThemeContext';

const ResultScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const theme = useTheme();
  const { result } = route.params;

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <Text style={[styles.titleText, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>Hesaplama Sonucu</Text>
        <Text style={[styles.resultText, { color: theme.colors.text.primary, ...theme.typography.h1, fontSize: 32 }]}>{result.toLocaleString('tr-TR')} TL</Text>

        <ThemedButton 
          title="Ana Sayfaya Dön"
          onPress={() => navigation.navigate('Start')}
          style={styles.button}
        />
      </View>
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
  resultText: {
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    marginTop: 20,
  },
});

export default ResultScreen;