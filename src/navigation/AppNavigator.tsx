import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from '../screens/StartScreen';
import DisputeCategoryScreen from '../screens/DisputeCategoryScreen';
import AgreementStatusScreen from '../screens/AgreementStatusScreen';
import DisputeTypeScreen from '../screens/DisputeTypeScreen';
import InputScreen from '../screens/InputScreen';
import ResultScreen from '../screens/ResultScreen';
import TimeCalculationScreen from '../screens/TimeCalculationScreen';
import SMMCalculationScreen from '../screens/SmmCalculationScreen';
import AboutScreen from '../screens/AboutScreen';
import LegislationScreen from '../screens/LegislationScreen';
import CustomTabBar from '../components/common/CustomTabBar';
import ScreenWithTabBar from '../components/common/ScreenWithTabBar';

// Screen name constants
const SCREEN_NAMES = {
  MAIN_TABS: 'MainTabs',
  DISPUTE_CATEGORY: 'DisputeCategory',
  AGREEMENT_STATUS: 'AgreementStatus',
  DISPUTE_TYPE: 'DisputeType',
  INPUT: 'Input',
  RESULT: 'Result',
  TIME_CALCULATION: 'TimeCalculation',
  SMM_CALCULATION: 'SMMCalculation',
  START: 'Start',
  LEGISLATION: 'Legislation',
  ABOUT: 'About',
} as const;

// Type definition for the stack navigator
export type RootStackParamList = {
  [SCREEN_NAMES.MAIN_TABS]: undefined;
  [SCREEN_NAMES.DISPUTE_CATEGORY]: undefined;
  [SCREEN_NAMES.AGREEMENT_STATUS]: undefined;
  [SCREEN_NAMES.DISPUTE_TYPE]: { isAgreement: boolean };
  [SCREEN_NAMES.INPUT]: { isAgreement: boolean; disputeType: string };
  [SCREEN_NAMES.RESULT]: { result: number; isAgreement: boolean; disputeType: string };
  [SCREEN_NAMES.TIME_CALCULATION]: undefined;
  [SCREEN_NAMES.SMM_CALCULATION]: undefined;
};

// Type definition for the tab navigator
export type RootTabParamList = {
  [SCREEN_NAMES.START]: undefined;
  [SCREEN_NAMES.LEGISLATION]: undefined;
  [SCREEN_NAMES.ABOUT]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Common screen options
const COMMON_SCREEN_OPTIONS = {
  presentation: 'card' as const,
};

// Helper function to create a screen with tab bar wrapper
const createScreenWithTabBar = (ScreenComponent: React.ComponentType) => () => (
  <ScreenWithTabBar>
    <ScreenComponent />
  </ScreenWithTabBar>
);

// Tab Navigator with custom tab bar
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.START}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={SCREEN_NAMES.START} component={StartScreen} />
      <Tab.Screen name={SCREEN_NAMES.LEGISLATION} component={LegislationScreen} />
      <Tab.Screen name={SCREEN_NAMES.ABOUT} component={AboutScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.MAIN_TABS} 
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
      }}
    >
      {/* Main Tab Navigator */}
      <Stack.Screen 
        name={SCREEN_NAMES.MAIN_TABS} 
        component={TabNavigator} 
      />
      
      {/* Stack screens with tab bar */}
      <Stack.Screen
        name={SCREEN_NAMES.DISPUTE_CATEGORY}
        component={createScreenWithTabBar(DisputeCategoryScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.AGREEMENT_STATUS}
        component={createScreenWithTabBar(AgreementStatusScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DISPUTE_TYPE}
        component={createScreenWithTabBar(DisputeTypeScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.INPUT}
        component={createScreenWithTabBar(InputScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.RESULT}
        component={createScreenWithTabBar(ResultScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.TIME_CALCULATION}
        component={createScreenWithTabBar(TimeCalculationScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SMM_CALCULATION}
        component={createScreenWithTabBar(SMMCalculationScreen)}
        options={COMMON_SCREEN_OPTIONS}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;