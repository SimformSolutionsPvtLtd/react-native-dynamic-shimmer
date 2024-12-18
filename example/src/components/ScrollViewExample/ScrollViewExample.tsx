import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Shimmer } from 'react-native-dynamic-shimmer';
import { Strings, contentForScrollView } from '../../constants';
import { useLoading } from '../../hooks';
import { ShimmerElement } from '../ShimmerElement';
import styles from './ScrollViewExampleStyles';

/**
 * ScrollViewSample
 *
 * This component renders a scrollable view containing a heading and a list of items.
 * Each item consists of an image and a description. he data for these items comes
 * from the static `contentForScrollView` which contains the image URL and description for each item.
 * @returns {React.JSX.Element} A JSX element representing a ScrollView with content.
 */
const ScrollViewSample = (): React.JSX.Element => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{Strings.welcomeText}</Text>
      {contentForScrollView.map((item, index) => (
        <View style={styles.container} key={index}>
          <Image style={styles.image} source={{ uri: item?.imageUrl }} />
          <Text style={styles.paragraph}>{item?.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

/**
 * ScrollViewExample
 *
 * This component checks if the data is loading, and based on the loading state,
 * either renders the `ScrollViewSample` component wrapped inside a Shimmer effect,
 * or the loaded content itself. The `useLoading` hook manages the loading state.
 *
 * @returns {React.JSX.Element} A JSX element that conditionally renders the content with a shimmer effect.
 */
const ScrollViewExample = (): React.JSX.Element => {
  const isLoading = useLoading();

  return (
    <View style={styles.mainContainer}>
      <Shimmer
        loading={isLoading}
        shimmerElement={<ShimmerElement />}
        duration={2450}>
        <ScrollViewSample />
      </Shimmer>
    </View>
  );
};

export default ScrollViewExample;
