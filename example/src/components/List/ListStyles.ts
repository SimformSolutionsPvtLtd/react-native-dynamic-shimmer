import { StyleSheet } from 'react-native';
import { Colors } from '../../../../src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  subContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  secondContainer: { padding: 10 },
});

export default styles;
