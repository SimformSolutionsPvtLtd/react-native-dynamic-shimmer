import { Dimensions, type ScaledSize } from 'react-native';

/**
 * Get the width and height of the device screen.
 * @returns {ScaledSize} - the width and height of the device screen.
 */
let { width, height }: ScaledSize = Dimensions.get('window');

export { height, width };
