import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { useTheme } from '../theme/ThemeContext';

const StartScreen = () => {
  const theme = useTheme();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Start'>,
    NativeStackNavigationProp<RootStackParamList>
  >>();

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedBackground showOverlayImage>
      {/* Header with ScreenHeader component */}
      <ScreenHeader 
        title="DENKLEM" 
        useCard={true} 
      />

      <View style={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <Animated.View style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
            }
          ]}>
            <Image
              source={require('../../assets/images/first_screen_logo_transparent.png')}
              style={styles.logoImage}
            />
          </Animated.View>
        </View>
        <View style={styles.buttonWrapper}>
          <ThemedButton
            title={`Giriş`}
            onPress={() => navigation.navigate('DisputeCategory')} 
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
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  customButton: {
    paddingVertical: 18,
    width: '90%',
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
    top: '20%',
    zIndex: 0,
    width: '55%',
    aspectRatio: 1,
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
    alignSelf: 'center', 
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: '35%', // moved up further to make more space for tab bar
    zIndex: 1,
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