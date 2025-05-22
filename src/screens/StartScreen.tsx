import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ThemedHeader from '../components/common/ThemedHeader';
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
      <ThemedHeader />
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
          Arabuluculuk Ücreti{'\n'}Hesaplama Programı
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          {/* Halo View: Positioned behind the main logo */}
          <View style={styles.haloEffect} />

          {/* Main Logo Container: Animated, circular, with shadow */}
          <Animated.View style={[
            styles.logoContainerAnimated,
            {
              opacity: logoOpacity,
              // backgroundColor is managed by ThemedCard or transparent
              // shadowColor is set in StyleSheet
            }
          ]}>
            {/* ThemedCard: Made circular, contains the image */}
            <ThemedCard style={[
              styles.circularCard,
              { backgroundColor: theme.colors.card.background } // Corrected path to card background color
            ]}>
              <Image
                source={require('../../assets/images/first_screen_logo_transparent.png')}
                style={styles.logoImage}
              />
            </ThemedCard>
          </Animated.View>
        </View>
        <View style={styles.buttonWrapper}>
          <ThemedButton
            title="Başla"
            onPress={() => navigation.navigate('DisputeCategory')}
            textStyle={styles.buttonText}
            icon={
              <Image
                source={require('../../assets/images/start-icon.png')}
                style={styles.startIcon}
              />
            }
          />
        </View>
        <Text style={[styles.footer, { color: theme.colors.text.secondary, ...theme.typography.body }]}>
        © {new Date().getFullYear()} Tüm hakları saklıdır
        </Text>
      </View>
      
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: '15%', // Adjusted to position the header text
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    // fontSize and fontWeight removed, will be supplied by theme.typography.h2
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
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%', // Positions the top of the square logo area
    zIndex: 0,
    width: '70%', // Defines the width of the square area for the logo
    aspectRatio: 1, // Ensures the height matches the width, creating a square
  },
  haloEffect: {
    position: 'absolute',
    width: '102%', // Slightly larger than logoContainerAnimated to create a border/glow
    height: '102%',
    borderRadius: 9999, // Large value to ensure circular shape
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Translucent white for the halo
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25, // Opacity of the halo's shadow
    shadowRadius: 12,   // Blur radius of the halo's shadow
    elevation: 3,      // Android shadow for halo (lower elevation than main logo)
  },
  logoContainerAnimated: { // Styles for the main animated container of the logo
    width: '100%', // Fills the logoWrapper
    height: '100%', // Fills the logoWrapper
    borderRadius: 9999, // Makes it circular
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // ThemedCard will provide its own background
    shadowColor: '#FFFFFF', // Soft white shadow for the logo
    shadowOffset: { width: 0, height: 1 }, // Subtle shadow offset
    shadowOpacity: 0.6,  // Opacity of the main logo's shadow
    shadowRadius: 10,    // Blur radius of the main logo's shadow
    elevation: 8,       // Android shadow for the main logo
  },
  circularCard: { // Styles applied to the ThemedCard component
    width: '100%', // Ensures ThemedCard fills the circular Animated.View
    height: '100%',
    borderRadius: 9999, // Matches the parent's circular shape
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0, // Removes any default padding from ThemedCard that might shrink the image area
    overflow: 'hidden', // Crucial: clips the Image to the circular boundary of the card
  },
  logoImage: {
    width: '85%', // Size of the image within the circular card; adjust as needed
    height: '85%',
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
    // fontSize removed, will be supplied by theme.typography.body
    textAlign: 'center',
    position: 'absolute',
    bottom: '2%',
  },
  buttonText: {
    fontWeight: '600',
  },
  startIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
});

export default StartScreen;