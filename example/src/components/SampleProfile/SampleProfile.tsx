import React from 'react';
import { Image, Text, View } from 'react-native';
import { Skeleton } from 'react-native-dynamic-shimmer';
import { AppConst, Strings } from '../../constants';
import { useLoading } from '../../hooks';
import styles from './SampleProfileStyles';

/**
 * ProfileCard
 *
 * This component displays the user's profile image, name, job title, and a short bio.
 * It uses the `Strings` and `AppConst` constants to dynamically load the user's information.
 *
 * @returns {React.JSX.Element} A profile card containing the user's image, name, job title, and bio.
 */
const ProfileCard = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: AppConst.profileImageUrl,
        }}
      />
      <View style={styles.textContainer}>
        {/* The shimmer width for this Text element is calculated based on the aria-label string length, offering more precise control over shimmer width. */}
        <Text aria-label={Strings.michael_williams} style={styles.name}>
          {Strings.michael_williams}
        </Text>
        <Text style={styles.jobTitle}>{Strings.software_engineer}</Text>
        <Text style={styles.bio}>{Strings.lorem_string}</Text>
      </View>
    </View>
  );
};

/**
 * SampleProfile
 *
 * It integrates the ProfileCard with a loading skeleton.
 * It uses the `useLoading` hook to determine if the content should display the skeleton or the profile.
 *
 * @returns {React.JSX.Element} A component that conditionally renders the ProfileCard wrapped in a Skeleton
 * loading animation based on the loading state.
 */
const SampleProfile = (): React.JSX.Element => {
  const isLoading = useLoading();

  return (
    <Skeleton isLoading={isLoading}>
      <ProfileCard />
    </Skeleton>
  );
};

export default SampleProfile;
