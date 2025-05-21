import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import DisputeCategoryScreen from '../screens/DisputeCategoryScreen';
import AgreementStatusScreen from '../screens/AgreementStatusScreen';
import DisputeTypeScreen from '../screens/DisputeTypeScreen';
import InputScreen from '../screens/InputScreen';
import ResultScreen from '../screens/ResultScreen';
import TimeCalculationScreen from '../screens/TimeCalculationScreen';
import SMMCalculationScreen from '../screens/SmmCalculationScreen';

export type RootStackParamList = {
  Start: undefined;
  DisputeCategory: undefined;
  AgreementStatus: undefined;
  DisputeType: { isAgreement: boolean };
  Input: { isAgreement: boolean; disputeType: string };
  Result: { result: number };
  TimeCalculation: undefined; // Added for TimeCalculationScreen
  SMMCalculation: undefined; // Added for SMMCalculationScreen
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
      />
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