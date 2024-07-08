import { StyleSheet } from 'react-native';
import { Colors } from '../../../../src/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
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
    color: Colors.gray,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default styles;
