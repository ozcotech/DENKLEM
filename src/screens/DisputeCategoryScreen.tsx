import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';

const DisputeCategoryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const handleNotImplemented = () => {
    Alert.alert('Bilgi', 'Bu özellik henüz aktif değil. Daha sonra eklenecektir.');
  };

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
          Uyuşmazlık Kategorisi
        </Text>
        <View style={styles.rowButtonContainer}>
          <ThemedButton
            title="Konusu Para Olan Veya Para İle Değerlendirilebilen Uyuşmazlıklar"
            onPress={() => navigation.navigate('AgreementStatus')}
            style={styles.halfButton}
            textStyle={styles.smallButtonText}
          />
          <ThemedButton
            title="Konusu Para Olmayan Veya Para İle Değerlendirilemeyen Uyuşmazlıklar"
            onPress={() => navigation.navigate('DisputeType', { isAgreement: false })}
            style={styles.halfButton}
            textStyle={styles.smallButtonText}
          />
        </View>
        
        <Text style={[styles.subTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
          Diğer Hesaplamalar
        </Text>
        <View style={styles.rowButtonContainer}>
          <ThemedButton
            title="Süre Hesaplama" 
            onPress={() => navigation.navigate('TimeCalculation')}
            style={styles.halfButton}
          />
          <ThemedButton
            title="SMM Hesaplama"
            onPress={() => navigation.navigate('SMMCalculation')}
            style={styles.halfButton}
          />
        </View>
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  rowButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 10,
    marginHorizontal: -2, 
  },
  halfButton: {
    flex: 1,
    margin: 5,
    height: 140, 
    padding: 5, 
    paddingHorizontal: 3, 
    minHeight: 130,
    justifyContent: 'center',
  },
  smallButtonText: {
    fontSize: 14,
  }
});

export default DisputeCategoryScreen;