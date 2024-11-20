import React from 'react';
import {
  FlatList,
  View,
  type DimensionValue,
  type ViewStyle,
} from 'react-native';
import { marginProperties } from '../../constants';
import { width as screenWidth } from '../../theme';
import {
  calculateAdjustedChildWidth,
  calculateAspectRatioDimensions,
  calculateGlobalScreenWidth,
  calculateParentWidth,
  calculateWidthFromAspectRatio,
  calculatedEachChildWidth,
  checkRootComponent,
  computeTotalWidths,
  distributeWidths,
  flattenStyle,
  getAdjustedWidth,
  getAriaLabelWidth,
  getHorizontalMargin,
  getWidthFromAspectRatio,
  isAspectRatio,
} from '../../utils';
import shimmerStyles from './ShimmerStyles';
import type {
  ComputeTotalWidthReturnType,
  FetchLeafNodesPropsType,
  ShimmerProps,
} from './ShimmerTypes';
import { RenderShimmerView, ShimmerFlatList } from './components';

/**
 * Shimmer component that wraps child components and displays a loading state.
 *
 * @param {Object} props - The props for the Shimmer component.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {boolean} props.isLoading - Indicates if the shimmer is in loading state.
 * @returns {React.ReactNode} - The rendered children or shimmer view.
 */
const Shimmer = ({ children, isLoading }: ShimmerProps) => {
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
    const parentIsRoot: boolean = checkRootComponent(parent);

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

      const { shimmerStylesForEachChild } = shimmerStyles({
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
          ShimmerFlatList({
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
              shimmerStyle: shimmerStylesForEachChild,
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
            shimmerStyle: shimmerStylesForEachChild,
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
            shimmerStyle: shimmerStylesForEachChild,
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

  const shimmerChildren = fetchLeafNodes({
    subChildren: children,
    parentInfo: { parent: <></> },
  });

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'}>{shimmerChildren}</View>
  );
};

export default Shimmer;
