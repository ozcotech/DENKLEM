import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import DisputeCategoryScreen from '../screens/DisputeCategoryScreen';
import AgreementStatusScreen from '../screens/AgreementStatusScreen';
import DisputeTypeScreen from '../screens/DisputeTypeScreen';
import InputScreen from '../screens/InputScreen';
import ResultScreen from '../screens/ResultScreen';

export type RootStackParamList = {
  Start: undefined;
  DisputeCategory: undefined;
  AgreementStatus: undefined;
  DisputeType: { isAgreement: boolean };
  Input: { isAgreement: boolean; disputeType: string };
  Result: { result: number };
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
        options={{
          gestureEnabled: true, 
        }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;