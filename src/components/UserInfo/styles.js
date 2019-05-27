import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dimensions.indent,
    paddingBottom: 0,
    backgroundColor: colors.seller.background,
    marginTop: dimensions.indent * 0.7,
    minHeight: dimensions.indent * 7.6,
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
    marginTop: dimensions.indent / 1.6,
  },
  avatarContainer: {
    marginRight: dimensions.indent * 0.75,
  },
  avatarBackgroundImage: {
    flex: 1,
  },
  reviewTextContainer: {
    marginBottom: dimensions.indent / 1.6,
    marginTop: dimensions.indent / 1.6,
    overflow: 'hidden',
    maxWidth: '100%',
  },
});

export default styles;
