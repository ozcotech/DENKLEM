import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../theme/ThemeContext';

// Tab configuration
const TAB_CONFIG = [
  {
    key: 'Start',
    icon: require('../../../assets/images/home-icon.png'),
    label: 'Ana Sayfa',
    route: 'Start' as const,
  },
  {
    key: 'Legislation',
    icon: require('../../../assets/images/legislation-icon.png'),
    label: 'Mevzuat',
    route: 'Legislation' as const,
  },
  {
    key: 'About',
    icon: require('../../../assets/images/info-icon.png'),
    label: 'Hakkında',
    route: 'About' as const,
  },
] as const;

// Style constants
const STYLE_CONSTANTS = {
  TAB_BAR_HEIGHT: Platform.OS === 'ios' ? 75 : 70,
  TAB_BUTTON_SIZE: 75,
  TAB_ICON_SIZE: 24,
  BORDER_RADIUS: 28,
} as const;

/**
 * Custom tab bar component that replaces the default header with bottom navigation
 */
const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();

  // Render tab button
  const renderTabButton = (tabConfig: typeof TAB_CONFIG[number], index: number) => {
    const isActive = state.index === index;
    
    return (
      <TouchableOpacity 
        key={tabConfig.key}
        style={styles.tabButton} 
        onPress={() => navigation.navigate(tabConfig.route)}
      >
        <View style={styles.tabButtonInner}>
          <Image
            source={tabConfig.icon}
            style={[
              styles.tabIcon, 
              { tintColor: isActive ? theme.colors.text.primary : theme.colors.text.secondary }
            ]}
          />
          <Text 
            style={[
              styles.tabText, 
              { color: isActive ? theme.colors.text.primary : theme.colors.text.secondary }
            ]}
          >
            {tabConfig.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
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
        {TAB_CONFIG.map((tabConfig, index) => renderTabButton(tabConfig, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: STYLE_CONSTANTS.BORDER_RADIUS,
    width: '90%',
    alignSelf: 'center',
    height: STYLE_CONSTANTS.TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 0,
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
    width: STYLE_CONSTANTS.TAB_BUTTON_SIZE,
    height: STYLE_CONSTANTS.TAB_BUTTON_SIZE,
    borderRadius: 40,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  
  tabIcon: {
    width: STYLE_CONSTANTS.TAB_ICON_SIZE,
    height: STYLE_CONSTANTS.TAB_ICON_SIZE,
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