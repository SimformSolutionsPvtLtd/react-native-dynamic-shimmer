import type { ViewStyle } from 'react-native';

/**
 * An array of dummy data for use in a FlatList component.
 * Each item contains an `id` and a `title`.
 * @type {Array<{ id: string; title: string }>}
 */
export const staticFlatListData = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
];

/**
 * An array of margin property keys that can be used in React Native styles.
 * These properties define the margin spacing around a component.
 * @type {Array<keyof ViewStyle>}
 */
export const marginProperties: Array<keyof ViewStyle> = [
  'margin',
  'marginLeft',
  'marginRight',
];
