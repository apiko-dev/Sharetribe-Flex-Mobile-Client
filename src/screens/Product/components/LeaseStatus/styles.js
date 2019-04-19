import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
    paddingBottom: dimensions.indent * 0.7,
    backgroundColor: colors.seller.background,
    marginTop: dimensions.indent * 0.7,
    height: dimensions.indent * 7,
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    marginBottom: dimensions.indent * 1.5,
  },
  leaseContainer: {
    marginBottom: dimensions.indent * 0.25,
  },
  button: {
    alignSelf: 'center',
  },
  avatarContainer: {
    marginRight: dimensions.indent * 0.75,
  },
  avatarBackgroundImage: {
    flex: 1,
  },
});

export default styles;
