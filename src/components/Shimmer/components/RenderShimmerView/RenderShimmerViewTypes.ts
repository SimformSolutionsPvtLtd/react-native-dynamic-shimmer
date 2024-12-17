import type React from 'react';
import type { ViewStyle } from 'react-native';

/**
 * Props for rendering a shimmer effect.
 *
 * @property {number} index - The index of the item being rendered.
 * @property {ViewStyle} childStyle - The style applied to the child component.
 * @property {ViewStyle} shimmerStyle - The style applied to the shimmer effect.
 * @property {number} shimmerWidth - The width of the shimmer effect.
 * @property {number} parentWidth - The width of the parent component.
 * @property {boolean} loading - Indicates whether the loading state is active.
 * @property {React.ReactElement} shimmerElement - The gradient element used for the shimmer effect.
 * @property {number} duration - The duration of the shimmer effect animation
 */
export interface RenderShimmerPropTypes {
  index: number;
  childStyle: ViewStyle;
  shimmerStyle: ViewStyle;
  shimmerWidth: number;
  parentWidth: number;
  loading: boolean;
  shimmerElement?: React.ReactElement;
  duration?: number;
}
