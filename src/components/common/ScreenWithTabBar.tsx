import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTabBar from './CustomTabBar';
import { RootTabParamList } from '../../navigation/AppNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface ScreenWithTabBarProps {
  children: React.ReactNode;
  currentRoute?: 'Start' | 'Legislation' | 'About';
}

/**
 * Wrapper component that adds CustomTabBar overlay to any screen
 */
const ScreenWithTabBar: React.FC<ScreenWithTabBarProps> = ({ 
  children, 
  currentRoute = 'Start' 
}) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // Create mock tab bar props to match BottomTabBarProps interface
  const mockTabBarProps: any = {
    state: {
      index: currentRoute === 'Start' ? 0 : currentRoute === 'Legislation' ? 1 : 2,
      routes: [
        { key: 'Start', name: 'Start', params: undefined },
        { key: 'Legislation', name: 'Legislation', params: undefined },
        { key: 'About', name: 'About', params: undefined },
      ],
      routeNames: ['Start', 'Legislation', 'About'],
      history: [],
      type: 'tab',
      key: 'tab',
      stale: false,
    },
    descriptors: {},
    navigation: {
      navigate: (screenName: string) => {
        if (screenName === 'Start' || screenName === 'Legislation' || screenName === 'About') {
          // Navigate to MainTabs with specific screen
          navigation.navigate('MainTabs', { screen: screenName });
        }
      },
      emit: () => ({ defaultPrevented: false }),
    },
    insets,
  };

  return (
    <View style={styles.container}>
      {children}
      <CustomTabBar {...mockTabBarProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWithTabBar;
