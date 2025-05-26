import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedCard } from '../components/common/ThemedCard'; // Eklendi

// ✅ Stack navigation type - DisputeCategory Stack'te olduğu için
type DisputeCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DisputeCategory'>;

const DisputeCategoryScreen = () => {
  // ✅ Stack navigation kullan
  const navigation = useNavigation<DisputeCategoryScreenNavigationProp>();
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Eklendi

  const handleNotImplemented = () => {
    Alert.alert('Bilgi', 'Bu özellik henüz aktif değil. Daha sonra eklenecektir.');
  };

  return (
    <ThemedBackground>
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          Uyuşmazlık Kategorisi
        </Text>
      </View>
      <ScreenContainer paddingTop={10} marginBottom={140}>
        <View style={styles.centerContainer}>
          {/* <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Uyuşmazlık Kategorisi
          </Text> */}
          {/* Yukarıdaki Text başlık kısmına taşındı */}
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
          
          <ThemedCard style={styles.subTitleCard}> 
            <Text style={[styles.subTitleText, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
              Diğer Hesaplamalar
            </Text>
          </ThemedCard>

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
  header: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '85%', // Değiştirildi: 90% -> 85%
    alignSelf: 'center',
  },
  headerText: {
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
    paddingHorizontal: '7.5%', // Adjusted for better spacing
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    // Bu stil artık headerText tarafından yönetiliyor, isterseniz kaldırılabilir veya farklı bir amaç için saklanabilir.
  },
  subTitleCard: {
    width: '100%', // Değiştirildi: 85% -> 100%
    // alignSelf: 'center', // Genişlik 100% olunca gereksizleşti
    marginTop: 30,
    marginBottom: 16,
    // ThemedCard'ın varsayılan padding'i ve diğer stilleri uygulanır
  },
  subTitleText: { // Yeni stil
    textAlign: 'center',
  },
  /* // Eski subTitle stili, artık kullanılmıyor
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