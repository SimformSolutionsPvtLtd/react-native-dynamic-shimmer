import {
  StyleSheet,
  type DimensionValue,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { AppConst } from '../../constants';
import {
  Colors,
  height as screenHeight,
  width as screenWidth,
} from '../../theme';
import {
  calculateWidthFromAspectRatio,
  flattenStyle,
  getAriaLabelWidth,
  getCalculatedDimension,
  isAspectRatio,
} from '../../utils';

/**
 * Generates styles for skeleton components based on child element properties and dimensions.
 *
 * This function computes the appropriate styles for a skeleton component,
 * considering the aspect ratio of the child element and the dimensions
 * of its parent. It flattens the child style, calculates the required width
 * and height, and returns the styles necessary for rendering the skeleton.
 *
 * @param child - The child JSX element for which to generate skeleton styles.
 * @param numericWidth - An optional numeric width to use if the child style does not specify one.
 * @param parentHeight - The height of the parent container (default is the screen height).
 * @param parentWidth - The width of the parent container (default is the screen width).
 * @returns An object containing the skeleton styles for the child element.
 */
const skeletonStyles = ({
  child,
  numericWidth,
  parentHeight = screenHeight,
  parentWidth = screenWidth,
}: {
  child?: JSX.Element;
  numericWidth?: number;
  parentHeight?: DimensionValue | undefined;
  parentWidth?: number;
}) => {
  const childStyle: ViewStyle | TextStyle = flattenStyle(
    child?.props?.style || {}
  );
  const margin = childStyle?.margin ?? AppConst.defaultMargin;
  const { widthAccordingToAspectRatio, heightAccordingToAspectRatio } =
    calculateWidthFromAspectRatio(childStyle, parentWidth);

  const isAspectRatioWidth = isAspectRatio(childStyle, 'width');
  const isAspectRatioHeight = isAspectRatio(childStyle, 'height');

  const widthStyle = isAspectRatioWidth
    ? widthAccordingToAspectRatio
    : childStyle?.width ?? numericWidth ?? screenWidth;

  const hasAspectRatioHeight = isAspectRatioHeight
    ? heightAccordingToAspectRatio
    : childStyle?.height;

  const heightStyle =
    hasAspectRatioHeight ??
    ('fontSize' in childStyle
      ? childStyle?.fontSize
      : AppConst.defaultFontSize);

  const calculatedWidth =
    getCalculatedDimension({
      styleValue: widthStyle,
      parentDimension: parentWidth,
      isWidthStyle: true,
      numericWidth: numericWidth,
    }) - AppConst.offSetForWidth;

  const ariaLabelWidth: number | undefined = getAriaLabelWidth(
    child,
    childStyle
  );

  const calculateHeight =
    getCalculatedDimension({
      styleValue: heightStyle,
      parentDimension: parentHeight,
    }) - AppConst.offSetForWidth;

  return StyleSheet.create({
    skeletonStylesForEachChild: {
      backgroundColor: Colors.gray,
      overflow: 'hidden',
      margin,
      width: ariaLabelWidth
        ? ariaLabelWidth - AppConst.offSetForWidth
        : calculatedWidth,
      height: calculateHeight,
    },
  });
};

export default skeletonStyles;
