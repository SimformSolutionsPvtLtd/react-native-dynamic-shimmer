import Strings from './Strings';

/**
 * sampleDataForList
 *
 * This is a static array that holds a list of user data, including each user's id, image URI,
 * name, and job title. This data can be used to populate components like lists or user profiles
 * within the application.
 *
 * @type {Array<Object>}
 * @property {string} id - A unique identifier for each user.
 * @property {string} imageUri - The URI link to the user's profile picture.
 * @property {string} name - The user's name.
 * @property {string} jobTitle - The user's job title.
 */
const sampleDataForList = [
  {
    id: '1',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Olivia Martinez',
    jobTitle: 'Marketing Manager',
  },
  {
    id: '2',
    imageUri: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    jobTitle: 'Backend Developer',
  },
  {
    id: '3',
    imageUri: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Michael Johnson',
    jobTitle: 'Backend Developer',
  },
  {
    id: '4',
    imageUri: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Merry Martinez',
    jobTitle: 'Marketing Manager',
  },
  {
    id: '5',
    imageUri: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Andrew Johnson',
    jobTitle: 'Marketing Manager',
  },
];

/**
 * contentForScrollView
 *
 * This is a static array containing data for images and descriptions. Each object in the array
 * includes an image URL and a description, which is stored in `Strings.description`.
 * This data can be used in scrollable views for displaying images with accompanying text.
 *
 * @type {Array<Object>}
 * @property {string} imageUrl - The URL of the image to be displayed.
 * @property {string} description - A description text for the image, fetched from the `Strings` module.
 */
const contentForScrollView = [
  {
    imageUrl:
      'https://img.freepik.com/free-photo/young-woman-walking-wooden-path-with-green-rice-field-vang-vieng-laos_335224-1258.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/premium-photo/garden-near-sigiriya_219717-5813.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498359.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/young-woman-walking-wooden-path-with-green-rice-field-vang-vieng-laos_335224-1258.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498359.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/premium-photo/garden-near-sigiriya_219717-5813.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
  {
    imageUrl:
      'https://img.freepik.com/free-photo/young-woman-walking-wooden-path-with-green-rice-field-vang-vieng-laos_335224-1258.jpg?size=626&ext=jpg&ga=GA1.1.719202892.1708413389&semt=ais_hybrid',
    description: Strings.description,
  },
];

export { contentForScrollView, sampleDataForList };
