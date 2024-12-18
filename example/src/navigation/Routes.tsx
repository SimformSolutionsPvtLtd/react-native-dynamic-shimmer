import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationStrings } from '../constants';
import {
  HomeScreen,
  ListScreen,
  ProfileScreen,
  ScrollViewExampleScreen,
} from '../modules';

const Stack = createNativeStackNavigator();

/**
 * Routes Component
 *
 * This component sets up the navigation structure of the application using a stack navigator.
 * It defines the various screens available in the app, including the Home screen, List
 * screen, Profile screen, and Scroll View Example screen. The initial route is set to
 * the Home screen.
 *
 * @returns {React.JSX.Element} A JSX element representing the navigation container with stack routes.
 */
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationStrings.HOME}>
        <Stack.Screen name={NavigationStrings.HOME} component={HomeScreen} />
        <Stack.Screen name={NavigationStrings.LIST} component={ListScreen} />
        <Stack.Screen
          name={NavigationStrings.PROFILE}
          component={ProfileScreen}
        />
        <Stack.Screen
          name={NavigationStrings.SCROLL_VIEW_EXAMPLE}
          component={ScrollViewExampleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
