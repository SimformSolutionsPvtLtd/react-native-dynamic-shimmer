import type { ViewStyle } from 'react-native';

/**
 * Props for configuring a shimmer effect.
 *
 * @property {number} shimmerWidth - The width of the shimmer effect.
 * @property {number} [duration] - Optional duration for the shimmer animation.
 * @property {ViewStyle} childStyle - The style to apply to the child elements.
 * @property {number} parentWidth - The width of the parent container.
 */
export interface ShimmerPropType {
  shimmerWidth: number;
  duration?: number;
  childStyle: ViewStyle;
  parentWidth: number;
}
