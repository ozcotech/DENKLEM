import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { RootTabParamList } from '../../navigation/AppNavigator';

/**
 * Custom tab bar component that replaces the default header with bottom navigation
 */
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Determine if we're on the About screen to hide the info button
  const isOnAboutScreen = state.routes[state.index].name === 'About';
  
  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Start');
  };

  const navigateToLegislation = () => {
    navigation.navigate('Legislation');
  };

  const navigateToAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.tabBarWrapper}>
      <View 
        style={[
          styles.tabBarContainer, 
          { 
            backgroundColor: theme.colors.card.background,
            paddingBottom: 0, // Remove bottom padding
            borderTopColor: theme.colors.button.border,
            borderColor: theme.colors.button.border,
          }
        ]}
      >
      {/* Home Button */}
      <TouchableOpacity 
        style={[styles.tabButton, state.index === 0 && styles.activeTab]} 
        onPress={navigateToHome}
      >
        <View style={styles.tabButtonInner}>
          <Image
            source={require('../../../assets/images/home-icon.png')}
            style={[styles.tabIcon, { tintColor: state.index === 0 ? theme.colors.text.primary : theme.colors.text.secondary }]}
          />
          <Text 
            style={[
              styles.tabText, 
              { color: state.index === 0 ? theme.colors.text.primary : theme.colors.text.secondary }
            ]}
          >
            Ana Sayfa
          </Text>
        </View>
      </TouchableOpacity>

      {/* Legislation Button */}
      <TouchableOpacity 
        style={[styles.tabButton, state.index === 1 && styles.activeTab]} 
        onPress={navigateToLegislation}
      >
        <View style={styles.tabButtonInner}>
          <Image
            source={require('../../../assets/images/legislation-icon.png')}
            style={[styles.tabIcon, { tintColor: state.index === 1 ? theme.colors.text.primary : theme.colors.text.secondary }]}
          />
          <Text 
            style={[
              styles.tabText, 
              { color: state.index === 1 ? theme.colors.text.primary : theme.colors.text.secondary }
            ]}
          >
            Mevzuat
          </Text>
        </View>
      </TouchableOpacity>

      {/* Info Button (About Screen) */}
      <TouchableOpacity 
        style={[styles.tabButton, state.index === 2 && styles.activeTab]} 
        onPress={navigateToAbout}
      >
        <View style={styles.tabButtonInner}>
          <Image
            source={require('../../../assets/images/info-icon.png')}
            style={[styles.tabIcon, { tintColor: state.index === 2 ? theme.colors.text.primary : theme.colors.text.secondary }]}
          />
          <Text 
            style={[
              styles.tabText, 
              { color: state.index === 2 ? theme.colors.text.primary : theme.colors.text.secondary }
            ]}
          >
            Hakkında
          </Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20, // moved down for better positioning
    alignItems: 'center',
    zIndex: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 28, // Slightly increased for better proportion
    width: '90%', // Increased from 85% to 90% for better coverage
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 75 : 70, // Increased height for better touch targets
    alignItems: 'center',
    justifyContent: 'space-around',
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,           
    height: 75,          
    borderRadius: 40,    
    overflow: 'hidden',
    marginHorizontal: 15, 
  },
  activeTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
});

export default CustomTabBar;