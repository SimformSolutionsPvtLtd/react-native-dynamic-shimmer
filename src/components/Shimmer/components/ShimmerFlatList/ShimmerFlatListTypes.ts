import type { FetchLeafNodesPropsType, ParentInfo } from '../../ShimmerTypes';

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
 * Represents an item of data.
 *
 * @property {string} id - The unique identifier for the item.
 * @property {string} title - The title of the item.
 */
interface ItemData {
  id: string;
  title: string;
}

/**
 * Props for rendering an item in a list.
 *
 * @property {ItemData} item - The item data to render.
 * @property {number} index - The index of the item in the list.
 */
export interface RenderItemProps {
  item: ItemData;
  index: number;
}
