import React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from './navigation/Routes';
import { applicationStyle } from './theme';

/**
 * App Component
 *
 * The main application component that serves as the entry point of the React Native app.
 * It wraps the application's routes in a `SafeAreaView` to ensure that content is rendered
 * within the safe area boundaries of the device.
 *
 * @returns {React.JSX.Element} A JSX element representing the main application layout.
 */
const App = () => {
  return (
    <SafeAreaView style={applicationStyle.screen}>
      <Routes />
    </SafeAreaView>
  );
};

export default App;
