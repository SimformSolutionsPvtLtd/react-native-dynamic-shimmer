import _ from 'lodash';
import React, { type ReactElement } from 'react';
import { StyleSheet, type DimensionValue, type ViewStyle } from 'react-native';
import type {
  AspectRatioReturnType,
  CalculateWidthFromAspectRatioReturnType,
  CalculatedEachChildWidthPropType,
  CalculatedParentWidthPropType,
  ComputeTotalWidthReturnType,
  GetCalculatedDimensionPropType,
  GetWidthFromAspectRatioParams,
  ParentInfo,
  ParseDimensionPropType,
} from '../../src/components';
import { AppConst } from '../constants';
import { height as screenHeight, width as screenWidth } from '../theme';

/**
 * Checks if the given parent component is a React Fragment.
 *
 * @param {JSX.Element} parent - The parent component to check.
 * @returns {boolean} - Returns `true` if the parent is a React Fragment, otherwise `false`.
 */
export const checkRootComponent = (parent: JSX.Element) => {
  return _.isEqual(parent, React.createElement(React.Fragment));
};

/**
 * Flattens a style object into a single style object.
 *
 * This function takes a `ViewStyle` object as input and uses
 * React Native's `StyleSheet.flatten` method to combine styles.
 * If the flattening results in a falsy value, an empty object is returned.
 *
 * @param {ViewStyle} style - The style object to flatten.
 * @returns {ViewStyle} The flattened style object.
 */
export const flattenStyle = (style: ViewStyle): ViewStyle => {
  return StyleSheet.flatten(style) || {};
};

/**
 * Fetches the default string text length from the given JSX element's `aria-label` property.
 *
 * This function retrieves the `aria-label` from the props of a JSX element,
 * calculates its length, and multiplies it by a predefined length multiplier from `AppConst`.
 * If the `aria-label` is not present or its length is zero, the function returns `undefined`.
 *
 * @param {JSX.Element} element - The JSX element from which to fetch the `aria-label`.
 * @returns {number | undefined} The computed length multiplied by the length multiplier, or `undefined` if the `aria-label` is not present.
 */
export const fetchDefaultStringText = (
  element: JSX.Element
): number | undefined => {
  const ariaLabelKey: string = 'aria-label';

  const elementProps = element?.props;
  const ariaLabel: string | undefined = elementProps?.[ariaLabelKey];

  return ariaLabel?.length
    ? ariaLabel?.length * AppConst.lengthMultiplier
    : undefined;
};

/**
 * Retrieves the width of the aria-label for a given child element.
 *
 * This function checks if the provided child is a 'Text' component and
 * if the `childStyle` does not specify a width. If both conditions are met,
 * it calls `fetchDefaultStringText` to compute the width based on the `aria-label`.
 *
 * @param {JSX.Element | undefined} child - The JSX element (should be of type 'Text') to evaluate.
 * @param {ViewStyle} childStyle - The style object associated with the child element.
 * @returns {number | undefined} The calculated width based on the `aria-label`, or `undefined` if conditions are not met.
 */
export const getAriaLabelWidth = (
  child: JSX.Element | undefined,
  childStyle: ViewStyle
): number | undefined => {
  return child?.type?.displayName === 'Text' && !childStyle?.width
    ? fetchDefaultStringText(child)
    : undefined;
};

/**
 * Calculates the width based on the provided aspect ratio parameters.
 *
 * This function returns the `aspectRatioValue` if `isAspectRatioBased` is true,
 * otherwise, it returns the `flattenedStyleValue`.
 * This allows for flexible width calculations depending on the context.
 *
 * @param {GetWidthFromAspectRatioParams} params - The parameters for width calculation.
 * @param {boolean} params.isAspectRatioBased - Indicates if the aspect ratio should be used.
 * @param {DimensionValue} params.aspectRatioValue - The width value based on the aspect ratio.
 * @param {DimensionValue} params.flattenedStyleValue - The width value based on flattened styles.
 * @returns {DimensionValue | undefined} The calculated width or `undefined`.
 */
export const getWidthFromAspectRatio = ({
  isAspectRatioBased,
  aspectRatioValue,
  flattenedStyleValue,
}: GetWidthFromAspectRatioParams): DimensionValue | undefined => {
  return isAspectRatioBased ? aspectRatioValue : flattenedStyleValue;
};

/**
 *
 * This function checks if the style object contains an `aspectRatio` property
 * and whether the specified dimension property (`width` or `height`) is undefined.
 * If the `aspectRatio` is defined and the specified dimension property is not,
 * it indicates that the aspect ratio is being used.
 *
 * @param {ViewStyle} style - The style object to evaluate for aspect ratio.
 * @param {'width' | 'height'} property - The property to check in the style object.
 * @returns {AspectRatioReturnType} Returns true if `aspectRatio` is defined and the specified property is not; otherwise, false.
 */
export const isAspectRatio = (
  style: ViewStyle,
  property: 'width' | 'height'
): AspectRatioReturnType => {
  const dimensionValue: DimensionValue | undefined = style?.[property];

  return style?.aspectRatio && !dimensionValue;
};

/**
 * Parses a dimension value, which can be a string with percentage or pixel units, or a number.
 *
 * This function handles three cases:
 * - If the dimension is a string ending with '%', it calculates the corresponding value based on the screen size.
 * - If the dimension is a string ending with 'px', it converts it to a number.
 * - If the dimension is a number, it returns the value directly.
 *
 * If the dimension is not valid or cannot be parsed, the function returns `undefined`.
 *
 * @param {ParseDimensionPropType} params - The parameters for dimension parsing.
 * @param {string | number} params.dimension - The dimension value to parse (can be a string with units or a number).
 * @param {number} [params.screenSize] - The screen size for calculating percentage values.
 * @returns {number | undefined} The parsed dimension value as a number, or `undefined` if the value is invalid.
 */
export const parseDimension = ({
  dimension,
  screenSize,
}: ParseDimensionPropType): number | undefined => {
  if (typeof dimension === 'string') {
    if (dimension.endsWith('%')) {
      const percentage: number =
        parseFloat(dimension) / AppConst.percentageDenominator;

      return screenSize ? screenSize * percentage : undefined;
    } else if (dimension.endsWith('px')) {
      return parseFloat(dimension);
    } else if (!isNaN(parseFloat(dimension))) {
      return parseFloat(dimension);
    }
  } else if (typeof dimension === 'number') {
    return dimension;
  }

  return undefined;
};

/**
 * The function calculates width and height values based on aspect ratio and screen size.
 * @param {ViewStyle} style - The `style` parameter in the `calculateWidthFromAspectRatio` function
 * represents the styling properties of a view element in a user interface. It includes properties like
 * width, height, and aspect ratio that define the visual appearance of the element. The function
 * calculates the width and height values based on the aspect ratio
 * @param {number} [parenWidth] - The `parenWidth` parameter in the `calculateWidthFromAspectRatio`
 * function represents the width of the parent element or container. It is used to calculate the width
 * of an element based on its aspect ratio relative to the parent width. If the `parenWidth` is
 * provided, it will be used in
 * @returns The function `calculateWidthFromAspectRatio` returns an object with properties
 * `widthAccordingToAspectRatio` and `heightAccordingToAspectRatio`, which are calculated based on the
 * input `style` and `parenWidth` parameters.
 */
export const calculateWidthFromAspectRatio = (
  style: ViewStyle,
  parenWidth?: number
): CalculateWidthFromAspectRatioReturnType => {
  let widthAccordingToAspectRatio: DimensionValue | undefined = parseDimension({
    dimension: style?.width,
    screenSize: parenWidth,
  });

  let heightAccordingToAspectRatio: DimensionValue | undefined = parseDimension(
    {
      dimension: style?.height,
      screenSize: screenHeight,
    }
  );

  if (
    style?.aspectRatio &&
    style?.aspectRatio !== 'auto' &&
    typeof style?.aspectRatio === 'number' &&
    style?.aspectRatio > 0
  ) {
    if (!widthAccordingToAspectRatio && heightAccordingToAspectRatio) {
      widthAccordingToAspectRatio =
        heightAccordingToAspectRatio * style?.aspectRatio;
    }
    if (!heightAccordingToAspectRatio && widthAccordingToAspectRatio) {
      heightAccordingToAspectRatio =
        widthAccordingToAspectRatio / style?.aspectRatio;
    }
  }

  return { widthAccordingToAspectRatio, heightAccordingToAspectRatio };
};

/**
 * The function `getWidth` calculates and returns the width of an item based on various style
 * properties and parent width.
 * @param {ViewStyle} itemStyle - The `itemStyle` parameter is of type `ViewStyle`, which represents
 * the style of the item being measured. It contains styling properties such as width, height, padding,
 * margin, etc., that define the appearance of the item.
 * @param {number} parentWidth - The `parentWidth` parameter in the `getWidth` function represents the
 * width of the parent container in pixels. This value is used to calculate the width of the item based
 * on different conditions and styles provided.
 * @param {number} widthPerUnassigned - The `widthPerUnassigned` parameter in the `getWidth` function
 * represents the default width value to be used when the width of the item is not explicitly defined
 * or calculated. If the width of the item cannot be determined based on the provided parameters or
 * conditions, the `widthPerUnassigned` value
 * @param item - The `item` parameter in the `getWidth` function is of type JSX.Element. It represents
 * the JSX element for which you are calculating the width. This element will be used to determine the
 * width of the item based on its style and other factors.
 * @returns The function `getWidth` returns a number value, which represents the calculated width of
 * the item based on the provided parameters and conditions within the function.
 */
export const getWidth = (
  itemStyle: ViewStyle,
  parentWidth: number,
  widthPerUnassigned: number,
  item: JSX.Element
): number => {
  const {
    widthAccordingToAspectRatio,
  }: CalculateWidthFromAspectRatioReturnType =
    calculateWidthFromAspectRatio(itemStyle);

  const isAspectRatioWidth: AspectRatioReturnType = isAspectRatio(
    itemStyle,
    'width'
  );

  const ariaLabelWidth: number | undefined = getAriaLabelWidth(item, itemStyle);

  const childWidth: DimensionValue | undefined = ariaLabelWidth
    ? ariaLabelWidth
    : getWidthFromAspectRatio({
        isAspectRatioBased: isAspectRatioWidth,
        aspectRatioValue: widthAccordingToAspectRatio,
        flattenedStyleValue: itemStyle?.width,
      });

  if (!childWidth) {
    return widthPerUnassigned;
  }

  if (typeof childWidth === 'string') {
    if (childWidth.endsWith('%')) {
      return (
        (parseFloat(childWidth) / AppConst.percentageDenominator) * parentWidth
      );
    }
    if (childWidth.endsWith('px')) {
      return parseFloat(childWidth);
    }
  }

  return parseFloat(String(childWidth)) ?? parentWidth;
};

/**
 * The function `distributeWidths` calculates and distributes widths for elements within a parent
 * container based on their styles and parent width.
 * @param {JSX.Element[]} elements - The `elements` parameter in the `distributeWidths` function is an
 * array of JSX elements that you want to distribute widths for. These elements will be analyzed to
 * determine their widths based on various factors like aspect ratio, aria labels, and styles.
 * @param {number} parentWidth - The `parentWidth` parameter in the `distributeWidths` function
 * represents the width of the parent container in which the elements will be distributed. It is a
 * number value that indicates the total width available for the elements to occupy within the parent
 * container.
 * @param {ViewStyle} flattenedParentStyle - The `flattenedParentStyle` parameter in the
 * `distributeWidths` function is a ViewStyle object that represents the style properties of the parent
 * container element after being flattened. This style object contains properties like `flexDirection`,
 * `alignItems`, `justifyContent`, `width`, `height
 * @returns The function `distributeWidths` returns an array of JSX elements with an added `width`
 * property, where the width value is calculated based on the parent width and the styles of the
 * elements being distributed.
 */
export const distributeWidths = (
  elements: JSX.Element[],
  parentWidth: number,
  flattenedParentStyle: ViewStyle
): (JSX.Element & { width: number })[] => {
  const { totalAssigned, unassignedCount } = elements?.reduce(
    (accumulator, item) => {
      const elementStyle: ViewStyle = flattenStyle(item?.props?.style);

      const {
        widthAccordingToAspectRatio,
      }: CalculateWidthFromAspectRatioReturnType =
        calculateWidthFromAspectRatio(elementStyle);

      const isAspectRatioWidth: AspectRatioReturnType = isAspectRatio(
        elementStyle,
        'width'
      );

      const ariaLabelWidth: number | undefined = getAriaLabelWidth(
        item,
        elementStyle
      );

      const childWidth: DimensionValue | undefined = ariaLabelWidth
        ? ariaLabelWidth
        : getWidthFromAspectRatio({
            isAspectRatioBased: isAspectRatioWidth,
            aspectRatioValue: widthAccordingToAspectRatio,
            flattenedStyleValue: elementStyle?.width,
          });

      if (typeof childWidth === 'string') {
        if (childWidth?.endsWith('px')) {
          accumulator.totalAssigned += parseFloat(childWidth);
        } else if (childWidth?.endsWith('%')) {
          accumulator.totalAssigned +=
            (parseFloat(childWidth) / AppConst.percentageDenominator) *
            parentWidth;
        }
      } else if (typeof childWidth === 'number') {
        accumulator.totalAssigned += childWidth;
      } else {
        accumulator.unassignedCount += 1;
      }

      return accumulator;
    },
    { totalAssigned: 0, unassignedCount: 0 }
  );

  const remainingWidth: number = parentWidth - totalAssigned;
  const widthPerUnassigned: number = remainingWidth / unassignedCount;

  return elements?.map(item => {
    const itemStyle = flattenStyle(item?.props?.style);

    if (flattenedParentStyle?.flexDirection !== 'row') {
      return {
        ...item,
        width: getWidth(itemStyle, parentWidth, parentWidth, item),
      };
    }

    return {
      ...item,
      width: getWidth(itemStyle, parentWidth, widthPerUnassigned, item),
    };
  });
};

/**
 * Calculates the width of a child component based on provided width data.
 *
 * This function searches for a child in the width data array, retrieves its width,
 * and adjusts it based on the global screen width. If the child width is found and
 * greater than zero, it subtracts the global screen width from the child's width.
 * If no valid width is found, it returns the provided calculated child width.
 *
 * @param {Object} params - The parameters for calculating the child width.
 * @param {JSX.Element} params.child - The child component for which the width is being calculated.
 * @param {Array<{ width?: number }>} params.widthData - An array of width data objects containing width properties.
 * @param {number} params.calculatedChildWidth - The width to return if the child width is not found.
 * @param {number} params.globalScreenWidth - The global screen width to adjust the child's width against.
 * @returns {number} The adjusted width of the child component, or the calculated child width if no valid width is found.
 */
export const calculatedEachChildWidth = ({
  child,
  widthData,
  calculatedChildWidth,
  globalScreenWidth,
}: CalculatedEachChildWidthPropType) => {
  let childWidth: number = 0;

  if (widthData?.length > 0) {
    widthData?.find(item => {
      const itemCopy = { ...item };

      if (itemCopy.width) {
        delete itemCopy.width;
      }
      if (_.isEqual(itemCopy, child)) {
        childWidth = item?.width ?? 0;
      }
    });
  }

  return childWidth > 0 ? childWidth - globalScreenWidth : calculatedChildWidth;
};

/**
 * The function `getHorizontalMargin` calculates the total horizontal margin based on different margin
 * properties in a given ViewStyle object.
 * @param {ViewStyle} style - The `style` parameter is an object that contains margin-related
 * properties such as `margin`, `marginHorizontal`, `marginLeft`, and `marginRight`. These properties
 * define the horizontal spacing around an element in a UI component. The `getHorizontalMargin`
 * function calculates the total horizontal margin based on these properties
 * @returns The function `getHorizontalMargin` returns the total horizontal margin value calculated
 * based on the provided `style` object.
 */
export const getHorizontalMargin = (style: ViewStyle): number => {
  if (!style) return 0;

  const {
    margin = 0,
    marginHorizontal = 0,
    marginLeft = 0,
    marginRight = 0,
  } = style;

  const totalMargin: number =
    (Number(margin) || 0) * AppConst.paddingMarginMultiplier + // Apply margin to both sides
    (Number(marginHorizontal) || 0) * AppConst.paddingMarginMultiplier + // Apply margin to both sides
    (Number(marginLeft) || 0) +
    (Number(marginRight) || 0);

  return totalMargin;
};

/**
 * Calculates the parent width based on the given base width.
 *
 * This function handles both string percentages and numeric values for the base width.
 * If the base width is a percentage, it calculates the actual width based on the
 * container width or the calculated child width, depending on whether the parent
 * is the root component. If the base width is a numeric value, it converts it
 * to a number and returns it directly.
 *
 * @param {Object} params - The parameters for calculating the parent width.
 * @param {string | number} params.baseWidth - The base width value (can be a percentage string or a numeric value).
 * @param {number} params.containerWidth - The width of the container to calculate the percentage from.
 * @param {boolean} params.parentIsRoot - Indicates if the parent component is the root.
 * @param {number} params.calculatedChildWidth - The calculated width of the child component.
 * @returns {number} The calculated parent width as a number.
 */
export const calculateParentWidth = ({
  baseWidth,
  containerWidth,
  parentIsRoot,
  calculatedChildWidth,
}: CalculatedParentWidthPropType): number => {
  if (typeof baseWidth === 'string' && baseWidth?.includes('%')) {
    const percentageValue: number =
      parseFloat(baseWidth) / AppConst.percentageDenominator;

    return parentIsRoot
      ? percentageValue * containerWidth
      : percentageValue * Number(calculatedChildWidth);
  } else {
    return Number(baseWidth);
  }
};

/**
 * The function `calculateChildWidth` calculates the width of a child element based on various styles
 * and conditions within a parent component hierarchy.
 * @param child - The `child` parameter in the `calculateChildWidth` function represents the JSX
 * element of the child component for which you want to calculate the width. It contains information
 * about the child component's type, props, and style.
 * @param {ParentInfo} parentInfo - The `parentInfo` parameter in the `calculateChildWidth`
 * function seems to be of type `ParentInfo`. It likely contains information about the parent
 * component of the child element being processed. This information could include details such as the
 * parent component itself, its children, and possibly some styles or configurations
 * @param {ReactElement} subChildren - The `subChildren` parameter in the `calculateChildWidth`
 * function refers to the React element that represents the sub-children of the parent component. It is
 * used to extract style information for calculations related to the width of the child component.
 * @returns The `calculateChildWidth` function returns a `DimensionValue` or `undefined`.
 */
export const calculateChildWidth = (
  child: JSX.Element,
  parentInfo: ParentInfo,
  subChildren: ReactElement
): DimensionValue | undefined => {
  const isFunctionComponent: boolean =
    typeof subChildren?.type === 'function' &&
    !subChildren?.type?.prototype?.isReactComponent;

  const childStyle: ViewStyle = flattenStyle(child?.props?.style);

  const parentChildren: JSX.Element = parentInfo?.parent?.props?.children;

  const parentChildStyle: ViewStyle = flattenStyle(
    parentChildren?.props?.style
  );

  const subChildrenStyle: ViewStyle = isFunctionComponent
    ? flattenStyle(parentChildren?.type?.(parentChildren?.props)?.props?.style)
    : flattenStyle(parentChildren?.props?.style);

  const isFunctionComponentChild: boolean =
    typeof child?.type === 'function' &&
    !child?.type?.prototype?.isReactComponent;

  const childStyleForCustomComponent: ViewStyle = isFunctionComponentChild
    ? flattenStyle(child?.type?.(child?.props)?.props?.style)
    : childStyle;

  const childType = child?.type?.name;

  const isParentRoot: boolean = checkRootComponent(parentInfo?.parent);

  const calculateWidth = (style: ViewStyle): DimensionValue | undefined => {
    const {
      widthAccordingToAspectRatio,
    }: CalculateWidthFromAspectRatioReturnType =
      calculateWidthFromAspectRatio(style);

    const isAspectRatioWidth: AspectRatioReturnType = isAspectRatio(
      style,
      'width'
    );

    return isAspectRatioWidth ? widthAccordingToAspectRatio : style?.width;
  };

  if (isParentRoot) {
    if (childType) {
      if (child?.type?.prototype?.isReactComponent) {
        const ariaLabelWidth: number | undefined = getAriaLabelWidth(
          child,
          childStyle
        );

        return ariaLabelWidth ? ariaLabelWidth : calculateWidth(childStyle);
      } else {
        return calculateWidth(childStyleForCustomComponent);
      }
    } else {
      const ariaLabelWidth: number | undefined = getAriaLabelWidth(
        child,
        childStyle
      );

      return ariaLabelWidth ? ariaLabelWidth : calculateWidth(childStyle);
    }
  } else {
    if (child?.type?.name) {
      if (child?.type?.prototype?.isReactComponent) {
        const ariaLabelWidth: number | undefined = getAriaLabelWidth(
          parentChildren,
          parentChildStyle
        );

        return ariaLabelWidth
          ? ariaLabelWidth
          : calculateWidth(parentChildStyle);
      } else {
        return calculateWidth(subChildrenStyle);
      }
    } else {
      const ariaLabelWidth: number | undefined = getAriaLabelWidth(
        parentChildren,
        parentChildStyle
      );

      return ariaLabelWidth ? ariaLabelWidth : calculateWidth(parentChildStyle);
    }
  }
};

/**
 * The function calculates the global screen width based on the padding information of a parent
 * element.
 * @param {ParentInfo} parentInfo - The `parentInfo` parameter in the `calculateGlobalScreenWidth`
 * function is of type `ParentInfo`. It contains information about the parent component, such as
 * its props and style. The function calculates the global screen width based on the padding of the
 * parent component.
 * @returns The function `calculateGlobalScreenWidth` returns an object with a property
 * `globalScreenWidth` which contains a number value.
 */
export const calculateGlobalScreenWidth = (
  parentInfo: ParentInfo
): { globalScreenWidth: number } => {
  let globalScreenWidth: number = 0;
  const parentStyle: ViewStyle = flattenStyle(parentInfo?.parent?.props?.style);

  const padding = parentStyle?.padding || 0;

  const paddingRight =
    Number(parentStyle?.paddingRight ?? 0) +
      Number(parentStyle?.paddingLeft ?? 0) ||
    Number(parentStyle?.paddingHorizontal) * AppConst.paddingMarginMultiplier ||
    Number(padding) * AppConst.paddingMarginMultiplier;

  if (paddingRight !== 0) {
    globalScreenWidth = paddingRight;
  }

  return {
    globalScreenWidth,
  };
};

/**
 * The function `computeTotalWidths` calculates the total width of child elements within a parent
 * element, considering various width calculation scenarios.
 * @param subChildren - The `subChildren` parameter in the `computeTotalWidths` function represents the
 * JSX elements that are children of a parent component. These elements are typically passed as props
 * to the parent component and can include various child components or elements that need to be
 * processed to calculate their total widths within the parent container
 * @param {number} parentWidth - The `parentWidth` parameter in the `computeTotalWidths` function
 * represents the width of the parent element in which the subChildren are being rendered. This value
 * is used to calculate the total width of children elements that have fixed widths specified in pixels
 * or percentages relative to the parent width.
 * @returns The function `computeTotalWidths` returns an object with two properties:
 * `totalWidthWithFixedChildren` and `totalChildrenWithoutWidth`.
 */
export const computeTotalWidths = (
  subChildren: JSX.Element,
  parentWidth: number
): ComputeTotalWidthReturnType => {
  let totalChildrenWithoutWidth: number = 0;
  let totalWidthWithFixedChildren: number = 0;

  React.Children.forEach(subChildren, child => {
    const childStyle: ViewStyle = flattenStyle(child?.props?.style);

    const {
      widthAccordingToAspectRatio,
    }: CalculateWidthFromAspectRatioReturnType =
      calculateWidthFromAspectRatio(childStyle);

    const isAspectRatioWidth: AspectRatioReturnType = isAspectRatio(
      childStyle,
      'width'
    );

    const ariaLabelWidth: number | undefined = getAriaLabelWidth(
      child,
      childStyle
    );

    const childWidth: DimensionValue | undefined = ariaLabelWidth
      ? ariaLabelWidth
      : getWidthFromAspectRatio({
          isAspectRatioBased: isAspectRatioWidth,
          aspectRatioValue: widthAccordingToAspectRatio,
          flattenedStyleValue: childStyle?.width,
        });

    if (typeof childWidth === 'string' && childWidth?.includes('%')) {
      const percentageValue: number =
        parseFloat(childWidth) / AppConst.percentageDenominator;
      totalWidthWithFixedChildren += percentageValue * parentWidth;
    } else if (childWidth) {
      totalWidthWithFixedChildren += Number(childWidth);
    } else {
      totalChildrenWithoutWidth++;
    }
  });

  return {
    totalWidthWithFixedChildren,
    totalChildrenWithoutWidth,
  };
};

/**
 * The function `calculateAdjustedChildWidth` calculates the adjusted width of child elements based on
 * their specified width values relative to the parent width.
 * @param subChildren - The `subChildren` parameter in the `calculateAdjustedChildWidth` function
 * represents the child elements of a parent component. It is of type `JSX.Element`, which is a React
 * element. These child elements are the components that are nested within the parent component.
 * @param {ParentInfo} parentInfo - The `parentInfo` parameter in the `calculateAdjustedChildWidth`
 * function is of type `ParentInfo`. It likely contains information about the parent element, such
 * as its dimensions, position, or other relevant data needed for calculating the adjusted child width.
 * You would need to refer to the definition of
 * @param {number} parentWidth - The `parentWidth` parameter in the `calculateAdjustedChildWidth`
 * function represents the width of the parent element in pixels. This value is used to calculate the
 * adjusted width of the child elements based on their specified width values.
 * @returns The function `calculateAdjustedChildWidth` is returning the `adjustedChildWidth`, which is
 * either a number representing the adjusted width of the child element based on the parent width, or
 * `undefined` if no valid child width is calculated.
 */
export const calculateAdjustedChildWidth = (
  subChildren: JSX.Element,
  parentInfo: ParentInfo,
  parentWidth: number
): number | undefined => {
  let adjustedChildWidth;

  React.Children.forEach(subChildren, (child: JSX.Element) => {
    const childWidth: DimensionValue | undefined = calculateChildWidth(
      child,
      parentInfo,
      subChildren
    );

    if (typeof childWidth === 'string' && childWidth?.includes('%')) {
      const percentageValue: number =
        parseFloat(childWidth) / AppConst.percentageDenominator;
      adjustedChildWidth = percentageValue * parentWidth;
    } else {
      adjustedChildWidth = childWidth;
    }
  });

  return adjustedChildWidth;
};

/**
 * The function `getAdjustedWidth` calculates the adjusted width of a child element by subtracting
 * total margin and previous margin from the calculated child width.
 * @param {number | undefined} calculatedChildWidth - The `calculatedChildWidth` parameter is the width
 * of a child element that has been calculated or measured in your layout. It can be a number
 * representing the width of the child element in pixels. If the width has not been calculated yet, it
 * can be `undefined`.
 * @param {number} totalMargin - Total margin is the sum of the left and right margins of an element.
 * It is the total space that the margins occupy around the element.
 * @param {number | undefined} prevMargin - The `prevMargin` parameter in the `getAdjustedWidth`
 * function represents the margin of the previous element in a layout. It is optional and can be either
 * a number indicating the margin of the previous element or `undefined` if there is no previous margin
 * to consider.
 * @returns The function `getAdjustedWidth` returns the adjusted width calculated by subtracting the
 * total margin and the previous margin (if provided) from the calculated child width. If the
 * calculated child width is undefined, it defaults to 0.
 */
export const getAdjustedWidth = (
  calculatedChildWidth: number | undefined,
  totalMargin: number,
  prevMargin: number | undefined
): number => {
  return (calculatedChildWidth ?? 0) - totalMargin - (prevMargin ?? 0);
};

/**
 * Calculates the dimension based on the provided style value and parent dimension.
 *
 * This function handles percentage strings and numeric values for the style value.
 * If the style value is a percentage, it calculates the actual dimension based on
 * the parent dimension. If it is a width style, it returns the style value directly
 * if it is a number or falls back to the provided numeric width or screen width.
 * For non-width styles, it returns the style value directly if it's a number or defaults to 16.
 *
 * @param {Object} params - The parameters for calculating the dimension.
 * @param {string | number} params.styleValue - The style value (can be a percentage string or a numeric value).
 * @param {number} params.parentDimension - The dimension of the parent component for calculations.
 * @param {boolean} params.isWidthStyle - Indicates if the style value pertains to width.
 * @param {number} params.numericWidth - An optional numeric width to use if styleValue is not a number.
 * @returns {number} The calculated dimension as a number.
 */
export const getCalculatedDimension = ({
  styleValue,
  parentDimension,
  isWidthStyle,
  numericWidth,
}: GetCalculatedDimensionPropType): number => {
  if (typeof styleValue === 'string' && styleValue?.includes('%')) {
    return (
      (parseFloat(styleValue) / AppConst.percentageDenominator) *
      Number(parentDimension)
    );
  } else if (isWidthStyle) {
    return typeof styleValue === 'number'
      ? styleValue
      : numericWidth ?? screenWidth;
  } else {
    return typeof styleValue === 'number'
      ? styleValue
      : AppConst.defaultFontSize;
  }
};

/**
 * The function `calculateAspectRatioDimensions` calculates aspect ratio dimensions based on the
 * provided style and child width.
 * @param {ViewStyle} style - The `style` parameter in the `calculateAspectRatioDimensions` function is
 * of type `ViewStyle` and represents the styling properties of a view component in a UI framework like
 * React Native. It contains style attributes such as width, height, padding, margin, background color,
 * etc., that define the appearance
 * @param {number} [calculatedChildWidth] - The `calculatedChildWidth` parameter is a number
 * representing the width of a child element that has been calculated based on certain criteria or
 * constraints. It is an optional parameter that can be passed to the `calculateAspectRatioDimensions`
 * function to assist in determining the aspect ratio dimensions of a parent element based on
 * @returns The function `calculateAspectRatioDimensions` returns an object with two properties:
 * `aspectRatioWidth` and `aspectRatioHeight`. Each property can have a value of `DimensionValue` or
 * `undefined`.
 */
export const calculateAspectRatioDimensions = (
  style: ViewStyle,
  calculatedChildWidth?: number
): {
  aspectRatioWidth: DimensionValue | undefined;
  aspectRatioHeight: DimensionValue | undefined;
} => {
  const {
    widthAccordingToAspectRatio,
    heightAccordingToAspectRatio,
  }: CalculateWidthFromAspectRatioReturnType = calculateWidthFromAspectRatio(
    style,
    calculatedChildWidth
  );

  const isAspectRatioWidth: AspectRatioReturnType = isAspectRatio(
    style,
    'width'
  );

  const isAspectRatioHeight: AspectRatioReturnType = isAspectRatio(
    style,
    'height'
  );

  return {
    aspectRatioWidth: getWidthFromAspectRatio({
      isAspectRatioBased: isAspectRatioWidth,
      aspectRatioValue: widthAccordingToAspectRatio,
      flattenedStyleValue: style?.width,
    }),

    aspectRatioHeight: getWidthFromAspectRatio({
      isAspectRatioBased: isAspectRatioHeight,
      aspectRatioValue: heightAccordingToAspectRatio,
      flattenedStyleValue: style?.height,
    }),
  };
};
