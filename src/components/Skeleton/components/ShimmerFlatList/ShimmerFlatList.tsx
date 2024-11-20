import React from 'react';
import { staticFlatListData } from '../../../../constants';
import { calculatedEachChildWidth } from '../../../../utils';
import type {
  RenderItemProps,
  ShimmerFlatListPropType,
} from './ShimmerFlatListTypes';

/**
 * Renders components within a FlatList with a skeleton loading effect.
 *
 * @param {Object} props - The properties for rendering the FlatList.
 * @param {JSX.Element} props.child - The child component to render within the FlatList.
 * @param {Array} props.widthData - An array containing data about the widths of child components.
 * @param {number} props.calculatedChildWidth - The calculated width for the child component.
 * @param {number} props.globalScreenWidth - The total width of the screen.
 * @param {Function} props.fetchLeafNodes - A function that retrieves leaf nodes from a component.
 * @param {boolean} props.isRow - A flag indicating whether the layout is organized in a row.
 * @param {Object} props.parentInfo - Information pertaining to the parent component.
 * @param {number} props.finalMargin - The margin to apply to the layout.
 * @returns {JSX.Element} - A new child component with the shimmer effect applied.
 */
const ShimmerFlatList = ({
  child,
  widthData,
  calculatedChildWidth,
  globalScreenWidth,
  fetchLeafNodes,
  isRow,
  parentInfo,
  finalMargin,
}: ShimmerFlatListPropType) => {
  const renderItem =
    child?.props?.renderItem ?? child.type?.(child?.props)?.props?.renderItem;

  /**
   * Renders a shimmer effect for a given child element by fetching its leaf nodes.
   *
   * @param {JSX.Element} element - The child component to render with a shimmer effect.
   * @param {number | undefined} calculatedWidth - The calculated width for the shimmer effect.
   * @returns {JSX.Element} - The element with shimmer effect applied to its children.
   */
  const shimmerElement = (
    element: JSX.Element,
    calculatedWidth: number | undefined
  ) => {
    const shimmeredItem: React.ReactNode = fetchLeafNodes({
      subChildren: element?.props?.children,
      parentInfo: {
        parent: element,
      },
      calculatedWidth: calculatedWidth,
      isPreviousRow: isRow,
      isRoot: parentInfo?.parent,
      prevMargin: finalMargin,
    });

    return React.cloneElement(element, {
      children: shimmeredItem,
    });
  };

  /**
   * Applies a shimmer effect to a given React component or its nested children.
   *
   * @param {JSX.Element} element - The React component to apply the shimmer effect to.
   * @param {number | undefined} calculatedWidth - The calculated width for the shimmer effect.
   * @returns {JSX.Element} - The element with shimmer effect applied, either directly or to its nested children.
   */
  const handleShimmeringComponent = (
    element: JSX.Element,
    calculatedWidth: number | undefined
  ): JSX.Element => {
    if (element?.type?.prototype?.isReactComponent) {
      return shimmerElement(element, calculatedWidth);
    } else {
      const nestedChildren: JSX.Element = element?.type?.(element?.props);
      if (
        nestedChildren?.type?.name &&
        !nestedChildren?.type?.prototype?.isReactComponent
      ) {
        return handleShimmeringComponent(nestedChildren, calculatedWidth);
      } else {
        return shimmerElement(nestedChildren, calculatedWidth);
      }
    }
  };

  /**
   * Renders an item with a shimmer effect for a FlatList.
   *
   * This function takes the props of a FlatList item, calculates its width,
   * and applies a shimmer effect to it using the `handleShimmeringComponent`
   * or `shimmerElement` function based on the item type.
   *
   * @param {RenderItemProps} renderItemProps - The props provided to the renderItem function of the FlatList.
   * @returns {React.ReactElement} - The rendered item with shimmer effect applied.
   */
  const renderItemWithShimmer = (
    renderItemProps: RenderItemProps
  ): React.ReactElement => {
    const originalItem: JSX.Element = renderItem(renderItemProps);

    const calculatedWidth = calculatedEachChildWidth({
      child: originalItem,
      ...{ widthData, calculatedChildWidth, globalScreenWidth },
    });

    return originalItem?.type?.name
      ? handleShimmeringComponent(originalItem, calculatedWidth)
      : shimmerElement(originalItem, calculatedWidth);
  };

  return React.cloneElement(child, {
    data: staticFlatListData,
    renderItem: renderItemWithShimmer,
  });
};

export default ShimmerFlatList;
