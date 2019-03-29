import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
    backgroundColor: colors.seller.background,
    marginBottom: dimensions.indent * 2,
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
