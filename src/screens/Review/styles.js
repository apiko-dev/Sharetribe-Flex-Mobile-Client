import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid, isLargeDevice } from '../../utils';

const isAndroidDevice = isAndroid();
const isLarge = isLargeDevice();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: dimensions.indent * 1.3,
    backgroundColor: colors.profileScreen.backgroundColorTop,
    paddingVertical: dimensions.indent,
  },

  userName: {
    margin: dimensions.smallIndent,
  },
  rating: {
    marginBottom: dimensions.smallIndent,
  },
  reviewContainer: {
    paddingHorizontal: dimensions.indent,
    paddingTop: dimensions.indent,
  },
  descriptionInputContainer: {

    height: dimensions.indent * 15,
    paddingTop: dimensions.indent * 0.5,
    paddingBottom: dimensions.indent * 0.5,
  },
  descriptionLabel: {
    position: 'absolute',
    top: isAndroidDevice
      ? dimensions.indent * 0.5
      : dimensions.indent * 0.6,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  descriptionInput: {
    textAlignVertical: 'top',
    height: dimensions.indent * 14,
    paddingTop: dimensions.indent * 0.5,
    margin: 0,
  },
  publishContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 2,
    marginRight: dimensions.indent * 2,
  },
});

export default styles;
