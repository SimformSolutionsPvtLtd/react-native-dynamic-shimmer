import React from 'react';
import { View } from 'react-native';
import { Shimmer } from '../Shimmer';
import type { RenderShimmerPropTypes } from './RenderShimmerViewTypes';

/**
 * Renders the shimmer view for each child component.
 *
 * @param {Object} props - The props for the shimmer view.
 * @param {number} props.index - The index of the child.
 * @param {ViewStyle} props.childStyle - The style for the child component.
 * @param {ViewStyle} props.skeletonStyle - The style for the skeleton component.
 * @param {number} props.shimmerWidth - The calculated width for the shimmer effect.
 * @param {number} props.parentWidth - The width of the parent component.
 * @param {boolean} props.isLoading - Indicates if the data is still loading.
 * @returns {JSX.Element} - The rendered shimmer view.
 */
const RenderShimmerView = ({
  index,
  childStyle,
  skeletonStyle,
  shimmerWidth,
  parentWidth,
  isLoading,
}: RenderShimmerPropTypes) => {
  return (
    <View
      key={index}
      style={[childStyle, skeletonStyle]}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <Shimmer
        shimmerWidth={shimmerWidth}
        childStyle={childStyle}
        parentWidth={parentWidth}
      />
    </View>
  );
};

export default RenderShimmerView;
