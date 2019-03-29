import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: dimensions.indent,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  infoContainer: {},
  name: {
    marginBottom: dimensions.indent,
  },
  button: {
    alignSelf: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
  },
});

export default styles;
