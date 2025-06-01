import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTabBar from './CustomTabBar';
import { RootTabParamList } from '../../navigation/AppNavigator';

// Tab route name constants to eliminate magic strings
const TAB_ROUTE_NAMES = {
  START: 'Start',
  LEGISLATION: 'Legislation', 
  ABOUT: 'About',
} as const;

type TabRouteName = typeof TAB_ROUTE_NAMES[keyof typeof TAB_ROUTE_NAMES];

const Tab = createBottomTabNavigator<RootTabParamList>();

interface ScreenWithTabBarProps {
  children: React.ReactNode;
  currentRoute?: TabRouteName;
}

/**
 * Wrapper component that adds CustomTabBar overlay to any screen
 */
const ScreenWithTabBar: React.FC<ScreenWithTabBarProps> = ({ 
  children, 
  currentRoute = TAB_ROUTE_NAMES.START 
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Get current tab index based on currentRoute using constants
  const getCurrentTabIndex = (): number => {
    switch (currentRoute) {
      case TAB_ROUTE_NAMES.START:
        return 0;
      case TAB_ROUTE_NAMES.LEGISLATION:
        return 1;
      case TAB_ROUTE_NAMES.ABOUT:
        return 2;
      default:
        return 0;
    }
  };

  // Create mock tab bar props to match BottomTabBarProps interface
  const mockTabBarProps: any = {
    state: {
      index: getCurrentTabIndex(),
      routes: [
        { key: TAB_ROUTE_NAMES.START, name: TAB_ROUTE_NAMES.START, params: undefined },
        { key: TAB_ROUTE_NAMES.LEGISLATION, name: TAB_ROUTE_NAMES.LEGISLATION, params: undefined },
        { key: TAB_ROUTE_NAMES.ABOUT, name: TAB_ROUTE_NAMES.ABOUT, params: undefined },
      ],
      routeNames: [TAB_ROUTE_NAMES.START, TAB_ROUTE_NAMES.LEGISLATION, TAB_ROUTE_NAMES.ABOUT],
      history: [],
      type: 'tab',
      key: 'tab',
      stale: false,
    },
    descriptors: {},
    navigation: {
      navigate: (screenName: string) => {
        // Special handling for home button - navigate to DisputeCategory when in app flow
        if (screenName === TAB_ROUTE_NAMES.START) {
          (navigation as any).navigate('DisputeCategory');
        } else if (screenName === 'DisputeCategory') {
          // Direct navigation to DisputeCategory for handleHomeNavigation
          (navigation as any).navigate('DisputeCategory');
        } else {
          // Validate against our defined tab route names
          const validRoutes = [TAB_ROUTE_NAMES.LEGISLATION, TAB_ROUTE_NAMES.ABOUT];
          const typedScreenName = screenName as 'Legislation' | 'About';
          if (validRoutes.includes(typedScreenName)) {
            // Navigate to MainTabs with specific screen
            (navigation as any).navigate('MainTabs', { screen: typedScreenName });
          }
        }
      },
      emit: () => ({ defaultPrevented: false }),
      getState: () => ({
        index: 0,
        routes: [{ name: 'AgreementStatus', key: 'stack' }], // Use actual current route name
        routeNames: ['AgreementStatus'],
        history: [],
        type: 'stack',
        key: 'stack',
        stale: false,
      }),
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
