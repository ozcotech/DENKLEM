import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';

// ✅ Stack navigation type - DisputeCategory Stack'te olduğu için
type DisputeCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DisputeCategory'>;

const DisputeCategoryScreen = () => {
  // ✅ Stack navigation kullan
  const navigation = useNavigation<DisputeCategoryScreenNavigationProp>();
  const theme = useTheme();

  const handleNotImplemented = () => {
    Alert.alert('Bilgi', 'Bu özellik henüz aktif değil. Daha sonra eklenecektir.');
  };

  return (
    <ThemedBackground>
      <ScreenContainer paddingTop={50} marginBottom={140}>
        <View style={styles.centerContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Uyuşmazlık Kategorisi
          </Text>
          <View style={styles.rowButtonContainer}>
            <ThemedButton
              title="Konusu Para Olan  Uyuşmazlıklar"
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
              title="Konusu Para Olmayan Uyuşmazlıklar"
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
    paddingHorizontal: '7.5%', // Adjusted for better spacing
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
    // marginHorizontal: -2, // Removed to avoid negative margin
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
  },
});

export default DisputeCategoryScreen;