import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type DimensionValue } from 'react-native';
import { AppConst } from '../../../../constants';
import { width as screenWidth } from '../../../../theme';
import {
  calculateWidthFromAspectRatio,
  isAspectRatio,
} from '../../../../utils';
import shimmerEffectStyles from './ShimmerEffectStyles';
import type { ShimmerEffectPropType } from './ShimmerEffectTypes';

/**
 * ShimmerEffect Component
 *
 * A functional component that renders a shimmering effect using an animated gradient.
 * The shimmer effect can be applied to any child component, providing a loading indicator
 * for users. The component takes in properties to customize the shimmer's width and duration.
 *
 * @param {Object} props - The component props.
 * @param {DimensionValue} props.shimmerWidth - The width of the shimmer effect.
 * @param {number} [props.duration=1000] - The duration of the shimmer animation in milliseconds. Default is 1000.
 * @param {Object} [props.childStyle] - The style object to apply to the child component.
 * @param {number} [props.parentWidth] - The width of the parent component, used for calculating percentage-based widths.
 * @param {React.ReactElement} props.shimmerElement - The gradient element used for the shimmer effect.
 *
 * @returns {JSX.Element} The rendered shimmer component.
 */
const ShimmerEffect: React.FC<ShimmerEffectPropType> = ({
  shimmerWidth,
  duration = 1000,
  childStyle,
  parentWidth,
  shimmerElement,
}) => {
  // Create a reference to an animated value initialized to 0
  const animatedValue: Animated.Value = useRef(new Animated.Value(0)).current;

  /**
   * Effect hook to manage the shimmer animation lifecycle.
   *
   * This effect sets up a looping animation that changes the `animatedValue`
   * from 0 to 0.8 over the specified duration. The animation uses the native driver
   * for improved performance. The animation starts immediately upon component mount
   * and stops when the component unmounts.
   */
  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      })
    );
    // Start the shimmer animation
    shimmerAnimation.start();

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      shimmerAnimation.stop(); // Stop the animation to prevent memory leaks
    };
  }, [animatedValue, duration]);

  const { widthAccordingToAspectRatio } =
    calculateWidthFromAspectRatio(childStyle);

  const isAspectRatioWidth = isAspectRatio(childStyle, 'width');

  let childWidth: DimensionValue | undefined = isAspectRatioWidth
    ? widthAccordingToAspectRatio
    : childStyle?.width;

  if (typeof childWidth === 'string' && childWidth?.includes('%')) {
    const percentage: number =
      parseFloat(childWidth) / AppConst.percentageDenominator;
    childWidth = percentage * parentWidth;
  } else {
    childWidth = childWidth;
  }

  const interpolatedChildWidth =
    typeof childWidth === 'number' ? childWidth : shimmerWidth ?? screenWidth;

  const { shimmerEffectStylesForGradient, shimmerOverlay } =
    shimmerEffectStyles({
      interpolatedChildWidth,
    });

  return (
    <Animated.View
      style={[
        shimmerEffectStylesForGradient,
        StyleSheet.absoluteFillObject,
        {
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-interpolatedChildWidth, interpolatedChildWidth],
              }),
            },
          ],
        },
        {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0],
          }),
        },
      ]}>
      {shimmerElement ? shimmerElement : <View style={shimmerOverlay} />}
    </Animated.View>
  );
};

export default ShimmerEffect;
