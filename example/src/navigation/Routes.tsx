import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationStrings } from '../constants';
import {
  HomeScreen,
  SampleListScreen,
  SampleProfileScreen,
  ScrollViewExampleScreen,
} from '../modules';

const Stack = createNativeStackNavigator();

/**
 * Routes Component
 *
 * This component sets up the navigation structure of the application using a stack navigator.
 * It defines the various screens available in the app, including the Home screen, Sample List
 * screen, Sample Profile screen, and Scroll View Example screen. The initial route is set to
 * the Home screen.
 *
 * @returns {React.JSX.Element} A JSX element representing the navigation container with stack routes.
 */
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationStrings.HOME}>
        <Stack.Screen name={NavigationStrings.HOME} component={HomeScreen} />
        <Stack.Screen
          name={NavigationStrings.SAMPLE_LIST}
          component={SampleListScreen}
        />
        <Stack.Screen
          name={NavigationStrings.SAMPLE_PROFILE}
          component={SampleProfileScreen}
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
