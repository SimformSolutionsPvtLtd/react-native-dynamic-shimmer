<!-- // here we will have the poster of library -->

# react-native-dynamic-shimmer

[![react-native-dynamic-shimmer on npm](https://img.shields.io/npm/v/react-native-dynamic-shimmer.svg?style=flat)](https://www.npmjs.com/package/react-native-dynamic-shimmer) [![react-native-dynamic-shimmer downloads](https://img.shields.io/npm/dm/react-native-dynamic-shimmer)](https://www.npmtrends.com/react-native-dynamic-shimmer) [![react-native-dynamic-shimmer install size](https://packagephobia.com/badge?p=react-native-dynamic-shimmer)](https://packagephobia.com/result?p=react-native-dynamic-shimmer) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

This package offers an efficient Skeleton component wrapper for React Native apps, enabling you to effortlessly show loading placeholders (shimmer effects) while data is being retrieved.

The Skeleton component can be used with any view, including text, images, and custom components, ensuring a smooth loading experience.

---

## 🎬 Preview

---

 <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer"><img width="300" alt="SimformSolutions" src="./assets/basic_example.gif"></a></td>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer"><img width="300" alt="SimformSolutions" src="./assets/faltlist_example.gif"></a></td>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer"><img width="300" alt="SimformSolutions" src="./assets/scrollview_example.gif"></a></td>
    </tr>
  </table>

---

## Quick Access

- [Installation](#installation)
- [Usage and Examples](#usage)
- [Properties](#properties)
- [Example Code](#example)
- [License](#license)

## Getting Started 🔧

Here's how to get started with react-native-dynamic-shimmer in your React Native project:

### Installation

##### 1. Install the package

```bash
$ npm install react-native-dynamic-shimmer
# --- or ---
$ yarn add react-native-dynamic-shimmer
```

##### 2. Install peer dependencies

```bash
$ npm install react-native-linear-gradient lodash
# --- or ---
$ yarn add react-native-linear-gradient lodash
```

##### 3. Install cocoapods in the ios project

```bash
cd ios && pod install
```

##### Know more about [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient) and [lodash](https://www.npmjs.com/package/lodash)

---

### Usage

#### Basic Example

Here i have created one custom component and wrap that component using skeleton for shimmer effect.

Check the example below for more information.

```tsx
import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Skeleton } from 'react-native-dynamic-shimmer';

const Example = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [3000]);

  const ProfileCard = (): React.JSX.Element => {
    return (
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://randomuser.me/api/portraits/men/1.jpg',
          }}
        />
        <View style={styles.textWrapper}>
          <Text aria-label="Michael Williams" style={styles.name}>
            Michael Williams
          </Text>
          <Text style={styles.jobTitle}>Software Engineer</Text>
          <Text style={styles.profileBio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ultricies urna eget sapien ultrices, eu maximus justo rutrum.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Skeleton isLoading={isLoading}>
      <ProfileCard />
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#9b9b9b',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#9b9b9b',
  },
  profileBio: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default Example;
```

#### 🎬 Preview

---

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer"><img width="300" alt="SimformSolutions" src="./assets/basic_example.gif"></a></td>
    </tr>
  </table>

### Properties

| **Props** | **Default** |    **Type**     | **Description**                                                                                                                                                                                                                       |
| --------- | :---------: | :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children  |      -      | React.ReactNode | The child components that will be rendered inside the Skeleton component. When isLoading is true, these children will be replaced by the shimmer effect. When isLoading is false, the children are displayed normally.                |
| isLoading |    true     |     boolean     | This prop controls whether the Skeleton component displays the loading shimmer effect. If isLoading is true, the shimmer effect will be visible; otherwise, the actual content (wrapped by the Skeleton component) will be displayed. |

---

### Advanced Prop

This prop is used in a **Text** element when you need a customized length for a particular text.

| **Props**  | **Default** | **Type** | **Description**                                                                                                                                          |
| ---------- | :---------: | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-label |      -      |  string  | If provided, the shimmer width for a Text element is calculated based on the aria-label string length, offering more precise control over shimmer width. |

---

## Example

You can check out the example app for react-native-dynamic-shimmer in [Example](./example/src/App.tsx)

```sh
yarn
yarn example ios   // For ios
yarn example android   // For Android
```

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-dynamic-shimmer/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## Awesome Mobile Libraries

- Check out our other [available awesome mobile libraries](https://github.com/SimformSolutionsPvtLtd/Awesome-Mobile-Libraries)

## License

- [MIT License](./LICENSE)
