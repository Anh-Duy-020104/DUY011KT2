import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CT1Screen from '../screens/CT1Screen';
import CT2Screen from '../screens/CT2Screen';
import CT3Screen from '../screens/CT3Screen';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="CT1" component={CT1Screen} />
          <Stack.Screen name="CT2" component={CT2Screen} />
          <Stack.Screen name="CT3" component={CT3Screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}