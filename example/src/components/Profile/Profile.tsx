import React from 'react';
import { Image, Text, View } from 'react-native';
import { Shimmer } from 'react-native-dynamic-shimmer';
import { AppConst, Strings } from '../../constants';
import { useLoading } from '../../hooks';
import { ShimmerElement } from '../ShimmerElement';
import styles from './ProfileStyles';

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
        <Text aria-label={Strings.michaelWilliams} style={styles.name}>
          {Strings.michaelWilliams}
        </Text>
        <Text style={styles.jobTitle}>{Strings.softwareEngineer}</Text>
        <Text style={styles.bio}>{Strings.loremString}</Text>
      </View>
    </View>
  );
};

/**
 * Profile
 *
 * It integrates the ProfileCard with a loading shimmer effect.
 * It uses the `useLoading` hook to determine if the content should display the shimmer or the profile.
 *
 * @returns {React.JSX.Element} A component that conditionally renders the ProfileCard wrapped in a Shimmer
 * loading animation based on the loading state.
 */
const Profile = (): React.JSX.Element => {
  const isLoading = useLoading();

  return (
    <Shimmer
      loading={isLoading}
      shimmerElement={<ShimmerElement />}
      duration={2450}>
      <ProfileCard />
    </Shimmer>
  );
};

export default Profile;
