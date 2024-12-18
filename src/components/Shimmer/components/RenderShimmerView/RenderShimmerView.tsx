import React from 'react';
import { View } from 'react-native';
import { ShimmerEffect } from '../ShimmerEffect';
import type { RenderShimmerPropTypes } from './RenderShimmerViewTypes';

/**
 * Renders the shimmer view for each child component.
 *
 * @param {Object} props - The props for the shimmer view.
 * @param {number} props.index - The index of the child.
 * @param {ViewStyle} props.childStyle - The style for the child component.
 * @param {ViewStyle} props.shimmerStyle - The style for the shimmer component.
 * @param {number} props.shimmerWidth - The calculated width for the shimmer effect.
 * @param {number} props.parentWidth - The width of the parent component.
 * @param {boolean} props.loading - Indicates if the data is still loading.
 * @param {React.ReactElement} props.shimmerElement - The gradient element used for the shimmer effect.
 * @param {number} props.duration - The duration of the shimmer effect animation
 *
 * @returns {JSX.Element} - The rendered shimmer view.
 */
const RenderShimmerView = ({
  index,
  childStyle,
  shimmerStyle,
  shimmerWidth,
  parentWidth,
  loading,
  shimmerElement,
  duration,
}: RenderShimmerPropTypes) => {
  return (
    <View
      key={index}
      style={[childStyle, shimmerStyle]}
      pointerEvents={loading ? 'none' : 'auto'}>
      <ShimmerEffect
        shimmerWidth={shimmerWidth}
        childStyle={childStyle}
        parentWidth={parentWidth}
        shimmerElement={shimmerElement}
        duration={duration}
      />
    </View>
  );
};

export default RenderShimmerView;
