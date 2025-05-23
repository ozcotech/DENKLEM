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
import CustomTabBar from '../components/common/CustomTabBar';

// Stack navigator için tür tanımı
export type RootStackParamList = {
  Main: undefined; // Ana tab navigator route'u
  DisputeCategory: undefined;
  AgreementStatus: undefined;
  DisputeType: { isAgreement: boolean };
  Input: { isAgreement: boolean; disputeType: string };
  Result: { result: number; isAgreement: boolean; disputeType: string };
  TimeCalculation: undefined; // Added for TimeCalculationScreen
  SMMCalculation: undefined; // Added for SMMCalculationScreen
  About: undefined; // Added for AboutScreen
};

// Tab navigator için tür tanımı
export type RootTabParamList = {
  Start: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Main Tab Navigator that includes the custom tab bar
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
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true // Enable full-screen gestures
      }}
    >
      {/* Main Tab Navigator */}
      <Stack.Screen 
        name="Main" 
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
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Hakkımızda' }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;