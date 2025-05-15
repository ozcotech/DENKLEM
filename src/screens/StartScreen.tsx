import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const StartScreen = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient colors={['#d0e8ff', '#6ca0dc']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Arabuluculuk Ücreti{'\n'}Hesaplama Programı</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
            <Image 
              source={require('../../assets/images/first_screen_logo.png')} 
              style={styles.logoImage}
            />
          </Animated.View>
        </View>
        <View style={styles.buttonWrapper}>
          <AnimatedButton
            title="Hesaplamaya Başla"
            onPress={() => navigation.navigate('DisputeCategory')}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
      <Text style={styles.footer}>Made by ozcotech</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: '10%', 
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
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
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: '15%', 
    zIndex: 1,
  },
  logoContainer: {
    width: '85%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20, 
    padding: '5%', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'transparent', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30, 
    borderWidth: 2, 
    borderColor: '#fff',
    width: '85%',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    position: 'absolute',
    bottom: '2%', 
  },
});

export default StartScreen;