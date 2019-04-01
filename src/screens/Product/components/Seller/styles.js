import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
    backgroundColor: colors.seller.background,
    marginBottom: dimensions.indent * 1.5,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    marginTop: dimensions.indent / 2,
  },
  name: {
    marginBottom: dimensions.indent / 2,
  },
  button: {
    alignSelf: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: dimensions.indent,
  },
  carouselBackgroundImage: {
    flex: 1,
  },
});

export default styles;
