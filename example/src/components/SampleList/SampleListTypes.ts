/**
 * Represents a list item.
 *
 * @property {string} id - The unique identifier for the item.
 * @property {string} imageUri - The URI of the item's image.
 * @property {string} name - The name associated with the item.
 * @property {string} jobTitle - The job title associated with the item.
 */
export interface ListItem {
  id: string;
  imageUri: string;
  name: string;
  jobTitle: string;
}
