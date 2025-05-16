import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { ThemedCard } from '../components/common/ThemedCard';
import { useTheme } from '../theme/ThemeContext';

const StartScreen = () => {
  const theme = useTheme();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedBackground>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          Arabuluculuk Ücreti{'\n'}Hesaplama Programı
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <Animated.View style={{ 
            opacity: logoOpacity, 
            width: '100%', 
            height: '100%',
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <ThemedCard>
              <Image 
                source={require('../../assets/images/first_screen_logo_transparent.png')} 
                style={styles.logoImage}
              />
            </ThemedCard>
          </Animated.View>
        </View>
        <View style={styles.buttonWrapper}>
          <ThemedButton
            title="Hesaplamaya Başla"
            onPress={() => navigation.navigate('DisputeCategory')}
          />
        </View>
      </View>
      <Text style={[styles.footer, { color: theme.colors.text.secondary }]}>
        Made by ozcotech
      </Text>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%',
    zIndex: 0,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center', 
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: '15%',
    zIndex: 1,
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    bottom: '2%',
  },
});

export default StartScreen;