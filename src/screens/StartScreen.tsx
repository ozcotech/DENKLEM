import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <LinearGradient colors={['#d0e8ff', '#6ca0dc']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Arabuluculuk Ücreti{'\n'}Hesaplama Programı</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/first_screen_logo.png')} 
          style={styles.logoImage}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DisputeCategory')}>
        <Text style={styles.buttonText}>Hesaplamaya Başla</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Made by ozcotech</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#b3e0ff', 
  },
  headerContainer: {
    position: 'absolute',
    top: 70, 
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
  logoContainer: {
    width: '85%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20, 
    padding: 20,
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
    position: 'absolute',
    zIndex: 0,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 150,
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
    bottom: 10,
  },
});

export default StartScreen;