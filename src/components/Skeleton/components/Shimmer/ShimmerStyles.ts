import { StyleSheet } from 'react-native';

/**
 * The function `shimmerStyles` creates styles for a gradient shimmer effect with a specified width.
 * @param  - The `shimmerStyles` function takes in an object as a parameter with an optional property
 * `interpolatedChildWidth`, which is a number representing the width of the child element being
 * interpolated. The function then returns a StyleSheet object with styles for a gradient shimmer
 * effect, setting the width of the shimmer
 * @returns A StyleSheet object with a single style definition named "shimmerStylesForGradient" that
 * includes a width property set to the value of interpolatedChildWidth and a zIndex property set to 1.
 */
const shimmerStyles = ({
  interpolatedChildWidth,
}: {
  interpolatedChildWidth?: number;
}) => {
  return StyleSheet.create({
    shimmerStylesForGradient: {
      width: interpolatedChildWidth,
      zIndex: 1,
    },
  });
};

export default shimmerStyles;
