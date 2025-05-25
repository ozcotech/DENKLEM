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

// Type definition for the stack navigator
export type RootStackParamList = {
  MainTabs: undefined; // Start yerine MainTabs olarak değiştirildi
  DisputeCategory: undefined;
  AgreementStatus: undefined;
  DisputeType: { isAgreement: boolean };
  Input: { isAgreement: boolean; disputeType: string };
  Result: { result: number; isAgreement: boolean; disputeType: string };
  TimeCalculation: undefined;
  SMMCalculation: undefined;
};

// Type definition for the tab navigator
export type RootTabParamList = {
  Start: undefined;
  About: undefined;
  Legislation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Start Tab Navigator that includes the custom tab bar
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Start"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Start" component={StartScreen} />
      <Tab.Screen name="Legislation" component={LegislationScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs" 
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true
      }}
    >
      {/* Main Tab Navigator */}
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      
      {/* Stack screens for the app flow */}
      <Stack.Screen
        name="DisputeCategory"
        component={DisputeCategoryScreen}
      />
      <Stack.Screen
        name="AgreementStatus"
        component={AgreementStatusScreen}
      />
      <Stack.Screen
        name="DisputeType"
        component={DisputeTypeScreen}
      />
      <Stack.Screen
        name="Input"
        component={InputScreen}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
      />
      <Stack.Screen
        name="TimeCalculation"
        component={TimeCalculationScreen}
        options={{ title: 'Süre Hesaplama' }}
      />
      <Stack.Screen
        name="SMMCalculation"
        component={SMMCalculationScreen}
        options={{ title: 'SMM Hesaplama' }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;