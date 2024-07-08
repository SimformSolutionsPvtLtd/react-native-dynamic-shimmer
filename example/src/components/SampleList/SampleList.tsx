import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Skeleton } from 'react-native-dynamic-shimmer';
import { sampleDataForList } from '../../constants';
import { useLoading } from '../../hooks';
import styles from './SampleListStyles';
import type { ListItem } from './SampleListTypes';

/**
 * SampleList
 *
 * It renders a list of items with a skeleton loading effect in a React Native
 * app.
 * @returns A functional component named SampleList is being returned. This component renders a
 * FlatList with items from sampleDataForList. Each item in the list is rendered using the renderItem
 * function which displays an image, name, and job title. The component also includes a Skeleton
 * component that shows a loading indicator based on the isLoading state.
 */
const SampleList = (): React.JSX.Element => {
  const isLoading = useLoading();

  const renderItem = ({ item }: { item: ListItem }) => {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image style={styles.imageStyle} source={{ uri: item.imageUri }} />
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.text}>{item?.name}</Text>
          <Text style={styles.text}>{item?.jobTitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <Skeleton isLoading={isLoading}>
      <FlatList
        data={sampleDataForList}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </Skeleton>
  );
};

export default SampleList;
