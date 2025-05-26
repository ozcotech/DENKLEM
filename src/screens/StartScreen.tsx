import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import { ThemedCard } from '../components/common/ThemedCard';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Added import

const StartScreen = () => {
  const theme = useTheme();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Start'>,
    NativeStackNavigationProp<RootStackParamList>
  >>();
  const insets = useSafeAreaInsets(); // Added insets

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedBackground>
      {/* New Header Card */}
      <View style={[styles.newHeaderCardContainer, { marginTop: insets.top + 10 }]}>
        <ThemedCard style={styles.newHeaderCard}>
          <Text style={[styles.headerText, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
            {`Arabuluculuk Ücreti\n Hesaplama Programı`}
          </Text>
        </ThemedCard>
      </View>
      
      {/* Original headerContainer View is removed or repurposed if its styling is no longer needed */}
      {/* 
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
          Arabuluculuk Ücreti{\\'\\n'}Hesaplama Programı
        </Text>
      </View> 
      */}

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
            title={`Giriş`}
            onPress={() => navigation.navigate('DisputeCategory')} // DisputeCategory'e git
            style={styles.customButton} // Added custom style for button height
            textStyle={styles.buttonText} // Will be modified for larger text
            icon={
              <Image
                source={require('../../assets/images/start-icon.png')}
                style={styles.startIcon} // Will be modified for larger icon
              />
            }
          />
        </View>
      </View>
      <Text style={[styles.footer, { color: theme.colors.text.secondary, ...theme.typography.body }]}>
        {`© ${new Date().getFullYear()} OZCO Studio. Tüm hakları saklıdır.`}
      </Text>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  newHeaderCardContainer: { // Style for the container of the new header card
    width: '100%',
    alignItems: 'center', // Center the card
    position: 'absolute', // Keep it at the top
    top: 0, // Start from the very top before insets are applied
    zIndex: 10, // Ensure it's above other content if necessary
  },
  newHeaderCard: { // Style for the new header card itself
    padding: 12, // Reduced padding from 15 to 12
    borderRadius: 10,
    // marginBottom: 10, // Add if spacing is needed below the card
    alignItems: 'center',
    width: '85%', // Consistent width with other headers
    // backgroundColor is handled by ThemedCard or can be overridden here
  },
  customButton: { // Added style for the Giriş button
    paddingVertical: 18, // Increased padding for a taller button
    width: '85%', // Keep consistent width
  },
  headerContainer: { // Original headerContainer, may need adjustment or removal
    position: 'absolute',
    // top: '15%', // This might be too low now or conflict
    alignItems: 'center',
    width: '100%',
    // paddingTop: 0, // Original comment: Removed padding since we don't have the header anymore - this comment might be misleading now
    // This container might be removed if the new card container replaces its functionality.
    // If kept, its 'top' and 'paddingTop' need to be re-evaluated.
    // For now, let's assume it's effectively replaced by newHeaderCardContainer for positioning the title.
    // If it's still used for other layout purposes, its styling needs to be carefully reviewed.
    // To avoid issues, we can comment it out from the JSX and see the layout.
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
    // paddingTop: '15%', // Adjust this if the new header card takes up space and pushes content down
  },
  logoWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%', // This might need to be pushed down if the new header card is tall
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
    bottom: '25%', // moved up further to make more space for tab bar and footer
    zIndex: 1,
  },
  footer: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    paddingBottom: 18,
    zIndex: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 26, // Increased font size further
  },
  startIcon: {
    width: 32, // Increased icon width further
    height: 32, // Increased icon height further
    tintColor: '#ffffff',
  },
});

export default StartScreen;