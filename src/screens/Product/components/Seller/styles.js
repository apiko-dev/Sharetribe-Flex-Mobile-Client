import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
    paddingBottom: 0,
    backgroundColor: colors.seller.background,
    marginBottom: dimensions.indent * 1.5,
    marginTop: dimensions.indent * 0.7,
    height: dimensions.indent * 8,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    marginTop: dimensions.indent * 0.25,
  },
  name: {
    marginBottom: dimensions.indent / 2,
  },
  button: {
    alignSelf: 'center',
    marginBottom: dimensions.indent / 1.6,
  },
  avatarContainer: {
    marginRight: dimensions.indent * 0.75,
  },
  avatarBackgroundImage: {
    flex: 1,
  },
});

export default styles;
