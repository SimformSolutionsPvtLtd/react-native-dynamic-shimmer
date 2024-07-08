import React from 'react';
import {
  FlatList,
  View,
  type DimensionValue,
  type ViewStyle,
} from 'react-native';
import { dummyDataForFlatList, marginProperties } from '../../constants';
import { width as screenWidth } from '../../theme';
import {
  calculateAdjustedChildWidth,
  calculateAspectRatioDimensions,
  calculateGlobalScreenWidth,
  calculateParentWidth,
  calculateWidthFromAspectRatio,
  calculatedEachChildWidth,
  computeTotalWidths,
  distributeWidths,
  flattenStyle,
  getAdjustedWidth,
  getAriaLabelWidth,
  getHorizontalMargin,
  getWidthFromAspectRatio,
  isAspectRatio,
} from '../../utils';
import skeletonStyles from './SkeletonStyles';
import type {
  ComputeTotalWidthReturnType,
  FetchLeafNodesPropsType,
  HandleFlatListRenderingPropType,
  RenderItemProps,
  RenderShimmerPropTypes,
  SkeletonProps,
} from './SkeletonTypes';
import { RootChecker, Shimmer } from './components';

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
const HandleFlatListRendering = ({
  child,
  widthData,
  calculatedChildWidth,
  globalScreenWidth,
  fetchLeafNodes,
  isRow,
  parentInfo,
  finalMargin,
}: HandleFlatListRenderingPropType) => {
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
    data: dummyDataForFlatList,
    renderItem: renderItemWithShimmer,
  });
};

/**
 * Skeleton component that wraps child components and displays a loading state.
 *
 * @param {Object} props - The props for the Skeleton component.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {boolean} props.isLoading - Indicates if the skeleton is in loading state.
 * @returns {React.ReactNode} - The rendered children or skeleton view.
 */
const Skeleton = ({ children, isLoading }: SkeletonProps) => {
  if (!isLoading) return children;

  /**
   * Recursively fetches and renders leaf nodes from a given set of children,
   * applying appropriate width and margin calculations to ensure proper layout
   * within the parent component's dimensions. This function supports handling
   * of aspect ratios, margin adjustments, and shimmer effects for loading states.
   *
   * @param {Object} params - Parameters for fetching leaf nodes.
   * @param {React.ReactNode} params.subChildren - The child components or elements
   *  that are to be processed and rendered. Can be an array of elements or a single element.
   * @param {Object} params.parentInfo - Information about the parent component,
   *  including a reference to the parent element.
   * @param {number} params.calculatedWidth - The width that should be assigned to
   *  the child components based on the parent's dimensions and other factors.
   * @param {boolean} params.isPreviousRow - Indicates if the current node is
   *  part of a previous row, affecting how width is calculated.
   * @param {boolean} params.isRoot - Indicates if the current component is
   *  the root of the rendering tree.
   * @param {number} params.prevMargin - The margin that was applied to the
   *  previous child, which may affect the layout of the current child.
   *
   * @returns {React.ReactNode} - The rendered child components with appropriate
   *  width and margin adjustments applied. This can include shimmer effects
   *  for loading states, as well as nested child components processed recursively.
   *
   */
  const fetchLeafNodes = ({
    subChildren,
    parentInfo,
    calculatedWidth,
    isPreviousRow,
    isRoot,
    prevMargin,
  }: FetchLeafNodesPropsType): React.ReactNode => {
    // Initialize total margin for child components.
    let finalMargin: number = 0;

    // Store child components with calculated widths.
    let widthData: (JSX.Element & { width: number })[] = [];

    // Calculate global screen width.
    const { globalScreenWidth } = calculateGlobalScreenWidth(parentInfo);

    // Extract parent component from parentInfo.
    const parent: JSX.Element = parentInfo?.parent;

    // Check if the parent is the root component.
    const parentIsRoot: boolean = RootChecker(parent);

    // Count number of child components.
    const childrenCount: number = parent?.props?.children?.length || 0;

    // Flatten parent's styles.
    const flattenedParentStyle: ViewStyle = flattenStyle(parent?.props?.style);

    // Check if parent layout is 'row'.
    const isRow: boolean = flattenedParentStyle?.flexDirection === 'row';

    // Determine if current context is a root row.
    const isRootRow = isRoot && !isRow;

    // Flatten content container styles.
    const flattenContentContainerStyle: ViewStyle = flattenStyle(
      parent?.props?.contentContainerStyle
    );

    const { widthAccordingToAspectRatio } =
      calculateWidthFromAspectRatio(flattenedParentStyle);

    const { aspectRatioWidth } = calculateAspectRatioDimensions(
      flattenContentContainerStyle,
      calculatedWidth
    );

    const primaryWidth: DimensionValue | undefined = getWidthFromAspectRatio({
      isAspectRatioBased: isAspectRatio(flattenedParentStyle, 'width'),
      aspectRatioValue: widthAccordingToAspectRatio,
      flattenedStyleValue: flattenedParentStyle?.width,
    });

    const contentContainerWidth: DimensionValue | undefined =
      getWidthFromAspectRatio({
        isAspectRatioBased: isAspectRatio(
          flattenContentContainerStyle,
          'width'
        ),
        aspectRatioValue: aspectRatioWidth,
        flattenedStyleValue: flattenContentContainerStyle?.width,
      });

    const baseWidth: DimensionValue | undefined =
      primaryWidth || contentContainerWidth || calculatedWidth || screenWidth;

    const parentWidth: number = calculateParentWidth({
      baseWidth: baseWidth,
      containerWidth: screenWidth,
      parentIsRoot: parentIsRoot,
      calculatedChildWidth: calculatedWidth,
    });

    const {
      totalWidthWithFixedChildren,
      totalChildrenWithoutWidth,
    }: ComputeTotalWidthReturnType = computeTotalWidths(
      subChildren,
      parentWidth
    );

    const remainingWidth: number =
      parentWidth - globalScreenWidth - totalWidthWithFixedChildren;

    if (childrenCount > 0) {
      widthData = distributeWidths(
        parent?.props?.children,
        parentWidth,
        flattenedParentStyle
      );
    }

    const childrenWithoutWidth: number =
      childrenCount - totalChildrenWithoutWidth;

    const divisor: number = isRootRow
      ? 1
      : childrenCount > 0
      ? childrenCount - childrenWithoutWidth
      : 1;

    const availableWidth: number = isRootRow
      ? parentWidth - globalScreenWidth
      : remainingWidth;

    const adjustedChildWidth: number | undefined = calculateAdjustedChildWidth(
      subChildren,
      parentInfo,
      parentWidth
    );

    const computedWidth: number =
      calculatedWidth && !isRow
        ? calculatedWidth - globalScreenWidth
        : availableWidth;

    const derivedWidth: number | undefined = calculatedWidth
      ? calculatedWidth - globalScreenWidth
      : undefined;

    const calculatedChildWidth: number | undefined = isPreviousRow
      ? derivedWidth
      : adjustedChildWidth
      ? adjustedChildWidth - globalScreenWidth
      : computedWidth / divisor;

    /**
     * Calculates the total margin from a given style object.
     *
     * This function iterates through a predefined set of margin properties and
     * accumulates their values from the provided style. It handles the case where
     * margin values might be undefined, ensuring that only valid numeric margins
     * are included in the total.
     *
     * @param style - The style object from which to extract margin values. It
     *                should conform to the ViewStyle type.
     * @returns The total margin as a number. If no valid margin properties
     *          are found, it returns 0.
     */
    const calculateTotalMargin = (style: ViewStyle): number => {
      marginProperties.forEach(marginProp => {
        if (style?.[marginProp] !== undefined) {
          finalMargin += Number(style?.[marginProp]) ?? 0;
        }
      });

      return finalMargin;
    };

    return React.Children.map(subChildren, (child: JSX.Element, index) => {
      const childStyle = flattenStyle(child?.props?.style);
      const totalMargin = getHorizontalMargin(childStyle);

      const { heightAccordingToAspectRatio } = calculateWidthFromAspectRatio(
        flattenedParentStyle,
        calculatedChildWidth
      );

      const { aspectRatioHeight } = calculateAspectRatioDimensions(
        flattenContentContainerStyle,
        calculatedChildWidth
      );

      const parentHeightFromAspectRatio = getWidthFromAspectRatio({
        isAspectRatioBased: isAspectRatio(flattenedParentStyle, 'height'),
        aspectRatioValue: heightAccordingToAspectRatio,
        flattenedStyleValue: flattenedParentStyle?.height,
      });

      const contentContainerHeightFromAspectRatio = getWidthFromAspectRatio({
        isAspectRatioBased: isAspectRatio(
          flattenContentContainerStyle,
          'height'
        ),
        aspectRatioValue: aspectRatioHeight,
        flattenedStyleValue: flattenContentContainerStyle?.height,
      });

      const { skeletonStylesForEachChild } = skeletonStyles({
        child,
        numericWidth: getAdjustedWidth(
          calculatedChildWidth,
          totalMargin,
          prevMargin
        ),
        parentHeight:
          parentHeightFromAspectRatio || contentContainerHeightFromAspectRatio,
        parentWidth: parentWidth,
      });

      /**
       * Processes a React component to apply a shimmer effect.
       *
       * This function checks the type of the provided React element and applies
       * the shimmer effect conditionally based on whether the element is a
       * FlatList, a custom React component, or a nested child. It calculates
       * necessary widths and margins for rendering and handles various component
       * types accordingly.
       *
       * @param element - The React element (JSX.Element) to process. This can be
       *                  a FlatList, a custom component, or any nested child element.
       * @returns The processed React element with a shimmer effect applied.
       *          If the element is a FlatList, it renders using the `renderFlatList`
       *          function; otherwise, it clones and modifies the element as needed.
       */
      const processComponentWithShimmer = (
        element: JSX.Element
      ): JSX.Element => {
        const renderFlatList = (nestedChild: JSX.Element) =>
          HandleFlatListRendering({
            child: nestedChild,
            widthData,
            calculatedChildWidth,
            globalScreenWidth,
            fetchLeafNodes,
            isRow,
            parentInfo,
            finalMargin,
          });

        if (element?.type === FlatList) {
          return renderFlatList(element);
        } else if (element?.type?.prototype?.isReactComponent) {
          const widthForEachChild = calculatedEachChildWidth({
            child: element,
            ...{ widthData, calculatedChildWidth, globalScreenWidth },
          });

          return React.cloneElement(element, {
            children: fetchLeafNodes({
              subChildren: element?.props?.children,
              parentInfo: {
                parent: element,
              },
              calculatedWidth: widthForEachChild,
              isPreviousRow: isRow,
              isRoot: parentInfo?.parent,
              prevMargin: finalMargin,
            }),
          });
        } else {
          const nestedChildren: JSX.Element = element?.type?.(element?.props);

          if (nestedChildren?.type?.name) {
            return processComponentWithShimmer(nestedChildren);
          }

          if (nestedChildren?.type === FlatList) {
            return renderFlatList(nestedChildren);
          }

          if (
            typeof nestedChildren?.props?.children === 'string' ||
            (!nestedChildren?.type?.name && !nestedChildren?.props?.children)
          ) {
            const nestedChildStyle = flattenStyle(nestedChildren?.props?.style);
            calculateTotalMargin(nestedChildStyle);

            const ariaLabelWidth: number | undefined = getAriaLabelWidth(
              nestedChildren,
              nestedChildStyle
            );

            return RenderShimmerView({
              index,
              childStyle: nestedChildStyle,
              skeletonStyle: skeletonStylesForEachChild,
              shimmerWidth: getAdjustedWidth(
                ariaLabelWidth ? ariaLabelWidth : calculatedChildWidth,
                totalMargin,
                prevMargin
              ),
              parentWidth,
              isLoading,
            });
          } else {
            const widthForEachChild = calculatedEachChildWidth({
              child: nestedChildren,
              ...{ widthData, calculatedChildWidth, globalScreenWidth },
            });

            return React.cloneElement(nestedChildren, {
              children: fetchLeafNodes({
                subChildren: nestedChildren?.props?.children,
                parentInfo: {
                  parent: nestedChildren,
                },
                calculatedWidth: widthForEachChild,
                isPreviousRow: isRow,
                isRoot: parentInfo?.parent,
                prevMargin: finalMargin,
              }),
            });
          }
        }
      };

      if (child?.type?.name) {
        return processComponentWithShimmer(child);
      } else {
        if (typeof child?.props?.children === 'string') {
          calculateTotalMargin(childStyle);

          const ariaLabelWidth: number | undefined = getAriaLabelWidth(
            child,
            childStyle
          );

          return RenderShimmerView({
            index,
            childStyle,
            skeletonStyle: skeletonStylesForEachChild,
            shimmerWidth: getAdjustedWidth(
              ariaLabelWidth ? ariaLabelWidth : calculatedChildWidth,
              totalMargin,
              prevMargin
            ),
            parentWidth,
            isLoading,
          });
        }
        if (!child?.props?.children) {
          calculateTotalMargin(childStyle || {});

          const ariaLabelWidth: number | undefined = getAriaLabelWidth(
            child,
            childStyle
          );

          return RenderShimmerView({
            index,
            childStyle,
            skeletonStyle: skeletonStylesForEachChild,
            shimmerWidth: getAdjustedWidth(
              ariaLabelWidth ? ariaLabelWidth : calculatedChildWidth,
              totalMargin,
              prevMargin
            ),
            parentWidth,
            isLoading,
          });
        } else {
          const widthForEachChild = calculatedEachChildWidth({
            ...{ child, widthData, calculatedChildWidth, globalScreenWidth },
          });

          return React.cloneElement(child, {
            children: fetchLeafNodes({
              subChildren: child?.props?.children,
              parentInfo: {
                parent: child,
              },
              calculatedWidth: widthForEachChild,
              isPreviousRow: isRow,
              isRoot: parentInfo?.parent,
              prevMargin: finalMargin,
            }),
          });
        }
      }
    });
  };

  const updatedChildren = fetchLeafNodes({
    subChildren: children,
    parentInfo: { parent: <></> },
  });

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'}>{updatedChildren}</View>
  );
};

export default Skeleton;
