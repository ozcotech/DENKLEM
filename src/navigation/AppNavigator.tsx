import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import DisputeCategoryScreen from '../screens/DisputeCategoryScreen';

export type RootStackParamList = {
  Start: undefined;
  DisputeCategory: undefined;
  // Additional screens can be added here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DisputeCategory"
        component={DisputeCategoryScreen}
        options={{ headerShown: false }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;