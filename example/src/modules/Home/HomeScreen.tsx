import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationStrings, Strings } from '../../constants';
import type { NavProps } from '../../navigation/types';
import styles from './HomeScreenStyles';

/**
 * HomeScreen Component
 *
 * This component serves as the main screen of the application. It displays a set of buttons
 * that navigate to different sections of the app. Each button corresponds to a specific
 * screen defined in the navigation structure.
 *
 * @returns {React.JSX.Element} A JSX element representing the Home screen with navigation buttons.
 */
const HomeScreen = () => {
  const navigation = useNavigation<NavProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationStrings.SAMPLE_LIST);
        }}>
        <Text style={styles.title}>{Strings.sample_list}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationStrings.SAMPLE_PROFILE);
        }}>
        <Text style={styles.title}>{Strings.sample_profile}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationStrings.SCROLL_VIEW_EXAMPLE);
        }}>
        <Text style={styles.title}>{Strings.scroll_view_example}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;