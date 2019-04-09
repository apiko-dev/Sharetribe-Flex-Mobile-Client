import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimensions.indent * 8.5,
    marginTop: dimensions.indent * 0.7,
  },

  bannerContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  banner: {
    height: dimensions.indent * 3.7,
    width: dimensions.width * 0.86,
    backgroundColor: colors.location.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
