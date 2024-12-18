import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme';

/**
 * Renders a horizontal gradient with gray-to-white-to-gray colors.
 *
 * @returns {JSX.Element} Gradient background covering the parent.
 */
const ShimmerElement = () => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 1.0, y: 0.25 }}
      locations={[0, 0.5, 1]}
      colors={[Colors.gray, Colors.white, Colors.gray]}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default ShimmerElement;
