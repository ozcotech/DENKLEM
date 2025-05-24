import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';

const DisputeCategoryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const handleNotImplemented = () => {
    Alert.alert('Bilgi', 'Bu özellik henüz aktif değil. Daha sonra eklenecektir.');
  };

  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Main' as never);
  };

  const navigateToAbout = () => {
    navigation.navigate('Main', { screen: 'About' } as never);
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
                  borderWidth: 1.5, // Adjusted border width
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
      
      {/* Custom Tab Bar for DisputeCategoryScreen */}
      <View style={styles.tabBarWrapper}>
        <View 
          style={[
            styles.tabBarContainer, 
            { 
              backgroundColor: theme.colors.card.background,
              borderTopColor: theme.colors.button.border,
              borderColor: theme.colors.button.border,
            }
          ]}
        >
          {/* Home Button */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToHome}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/home-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Ana Sayfa
              </Text>
            </View>
          </TouchableOpacity>

          {/* Middle spacer - can be used for additional buttons */}
          <View style={styles.middleSpacer} />

          {/* Info Button (About Screen) */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToAbout}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/info-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Hakkında
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  // Tab Bar Styles
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // moved up to leave space for footer
    alignItems: 'center',
    zIndex: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 25, // Rounded corners for tab bar
    width: '85%',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 70 : 65, // Adjusted height
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 0, // Remove padding to allow button height control
    backgroundColor: '#fff', // fallback, will be overridden by theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    borderRadius: 10,
    height: '90%',
    overflow: 'hidden', // Prevents content from overflowing
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabButtonInner: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 6,
  },
  middleSpacer: {
    flex: 3, // This gives more space in the middle
  },
});

export default DisputeCategoryScreen;