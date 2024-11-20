import type { ViewStyle } from 'react-native';

/**
 * Props for rendering a shimmer effect.
 *
 * @property {number} index - The index of the item being rendered.
 * @property {ViewStyle} childStyle - The style applied to the child component.
 * @property {ViewStyle} shimmerStyle - The style applied to the shimmer effect.
 * @property {number} shimmerWidth - The width of the shimmer effect.
 * @property {number} parentWidth - The width of the parent component.
 * @property {boolean} isLoading - Indicates whether the loading state is active.
 */
export interface RenderShimmerPropTypes {
  index: number;
  childStyle: ViewStyle;
  shimmerStyle: ViewStyle;
  shimmerWidth: number;
  parentWidth: number;
  isLoading: boolean;
}