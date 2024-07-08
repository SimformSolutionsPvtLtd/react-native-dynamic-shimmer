import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gradient: {
    // Setting the width to 320% ensures that the shimmer effect covers a larger area
    // than the actual width of the component. This allows the shimmer to smoothly
    // move across the screen and fully exit from one side before looping again.
    // Without this extended width, the shimmer would appear too short or clipped
    // at the edges, resulting in an incomplete visual effect.
    width: '320%',
    zIndex: 1,
  },
});
