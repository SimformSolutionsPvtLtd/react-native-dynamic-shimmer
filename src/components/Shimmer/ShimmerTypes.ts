import type { DimensionValue, ViewStyle } from 'react-native';

/**
 * Represents the information of a parent component.
 */
export interface ParentInfo {
  parent: JSX.Element;
}

/**
 * Props for fetching leaf nodes from a parent component.
 *
 * @property {JSX.Element} subChildren - The sub-children elements to fetch.
 * @property {ParentInfo} parentInfo - Information about the parent.
 * @property {number} [calculatedWidth] - Optional calculated width for the sub-children.
 * @property {boolean} [isPreviousRow] - Indicates if this is a previous row.
 * @property {React.ReactNode} [isRoot] - The root element, if applicable.
 * @property {number} [prevMargin] - Optional margin from the previous element.
 */
export interface FetchLeafNodesPropsType {
  subChildren: JSX.Element;
  parentInfo: ParentInfo;
  calculatedWidth?: number;
  isPreviousRow?: boolean;
  isRoot?: React.ReactNode;
  prevMargin?: number;
}

/**
 * Represents the styles applied to a child component.
 */
export interface ChildStyleType {
  style: ViewStyle; // The style object for the child.
}

/**
 * Props for calculating the width of a parent component.
 *
 * @property {DimensionValue | undefined} baseWidth - The base width of the parent, which may be undefined.
 * @property {number} containerWidth - The total width of the container in which the parent resides.
 * @property {boolean} parentIsRoot - Indicates whether the parent component is the root component.
 * @property {number | undefined} calculatedChildWidth - The calculated width of the child component, which may be undefined.
 */
export interface CalculatedParentWidthPropType {
  baseWidth: DimensionValue | undefined;
  containerWidth: number;
  parentIsRoot: boolean;
  calculatedChildWidth: number | undefined;
}

/**
 * Props for calculating the width of each child component.
 *
 * @property {JSX.Element} child - The child element whose width is being calculated.
 * @property {(JSX.Element & { width?: number })[]} widthData - An array of JSX elements with optional width properties.
 * @property {number | undefined} calculatedChildWidth - The calculated width of the child, which may be undefined.
 * @property {number} globalScreenWidth - The width of the global screen.
 */
export interface CalculatedEachChildWidthPropType {
  child: JSX.Element;
  widthData: (JSX.Element & { width?: number })[];
  calculatedChildWidth: number | undefined;
  globalScreenWidth: number;
}

/**
 * Props for calculating the dimensions based on style and parent dimensions.
 *
 * @property {DimensionValue | undefined} styleValue - The style value for the dimension, which may be undefined.
 * @property {DimensionValue | undefined} parentDimension - The parent dimension value, which may also be undefined.
 * @property {boolean} [isWidthStyle] - Indicates if the style value is related to width. Optional.
 * @property {number | undefined} [numericWidth] - A numeric width value, which may be undefined. Optional.
 */
export interface GetCalculatedDimensionPropType {
  styleValue: DimensionValue | undefined;
  parentDimension: DimensionValue | undefined;
  isWidthStyle?: boolean;
  numericWidth?: number | undefined;
}

/**
 * Return type for computing the total width of children components.
 *
 * @property {number} totalWidthWithFixedChildren - The total width calculated with fixed width children included.
 * @property {number} totalChildrenWithoutWidth - The total width of children that do not have an explicit width defined.
 */
export interface ComputeTotalWidthReturnType {
  totalWidthWithFixedChildren: number;
  totalChildrenWithoutWidth: number;
}

/**
 * Props for handling the rendering of FlatList items.
 *
 * @property {JSX.Element} child - The child element to be rendered.
 * @property {(JSX.Element & { width: number })[]} widthData - Array of elements with their corresponding widths.
 * @property {number | undefined} calculatedChildWidth - The calculated width for the child element, if available.
 * @property {number} globalScreenWidth - The total width of the screen.
 * @property {(args: FetchLeafNodesPropsType) => React.ReactNode} fetchLeafNodes - Function to fetch leaf nodes based on provided arguments.
 * @property {boolean} isRow - Indicates whether the layout is in a row format.
 * @property {ParentInfo} parentInfo - Information about the parent component.
 * @property {number} finalMargin - The final margin to be applied to the child element.
 */
export interface ShimmerFlatListPropType {
  child: JSX.Element;
  widthData: (JSX.Element & { width: number })[];
  calculatedChildWidth: number | undefined;
  globalScreenWidth: number;
  fetchLeafNodes: (args: FetchLeafNodesPropsType) => React.ReactNode;
  isRow: boolean;
  parentInfo: ParentInfo;
  finalMargin: number;
}

/**
 * Represents a copy of an item with its width.
 *
 * @property {object} itemCopy - The object containing item details.
 * @property {JSX.Element} itemCopy.item - The JSX element representing the item.
 * @property {number | string} itemCopy.width - The width of the item, which can be a number or a string.
 */
export interface ItemCopyType {
  itemCopy: {
    item: JSX.Element;
    width: number | string;
  };
}

/**
 * Parameters for getting width from aspect ratio.
 *
 * @property {boolean | '' | 0 | undefined} isAspectRatioBased - Indicates if the width calculation is based on aspect ratio.
 * @property {DimensionValue | undefined} aspectRatioValue - The aspect ratio value to use for width calculation.
 * @property {DimensionValue | undefined} flattenedStyleValue - The flattened style value for width calculation.
 */
export interface GetWidthFromAspectRatioParams {
  isAspectRatioBased: boolean | '' | 0 | undefined;
  aspectRatioValue: DimensionValue | undefined;
  flattenedStyleValue: DimensionValue | undefined;
}

/**
 * Represents the return type for aspect ratio calculations.
 *
 * This type can indicate whether the aspect ratio is defined,
 * not defined (represented by an empty string), or invalid (represented by 0).
 *
 * @type {boolean | '' | 0 | undefined}
 */
export type AspectRatioReturnType = boolean | '' | 0 | undefined;

/**
 * Props for parsing dimension values.
 *
 * @property {DimensionValue | undefined} dimension - The dimension value to be parsed, which can be a number, string, or undefined.
 * @property {number | undefined} screenSize - The size of the screen to be used for calculations, if applicable.
 */
export interface ParseDimensionPropType {
  dimension: DimensionValue | undefined;
  screenSize: number | undefined;
}

/**
 * Represents the calculated width and height based on aspect ratio.
 *
 * @property {number | undefined} widthAccordingToAspectRatio - The calculated width according to the aspect ratio, or undefined if not applicable.
 * @property {number | undefined} heightAccordingToAspectRatio - The calculated height according to the aspect ratio, or undefined if not applicable.
 */
export interface CalculateWidthFromAspectRatioReturnType {
  widthAccordingToAspectRatio: number | undefined;
  heightAccordingToAspectRatio: number | undefined;
}

/**
 * Props for the Shimmer component.
 *
 * @property {JSX.Element} children - The child elements to render within the shimmer.
 * @property {boolean} isLoading - Indicates whether the shimmer is in a loading state.
 */
export interface ShimmerProps {
  children: JSX.Element;
  isLoading: boolean;
}
