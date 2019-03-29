import { StyleSheet, Dimensions } from 'react-native';
import { dimensions, colors } from '../../styles';
import { isAndroid, isLargeDevice } from '../../utils';

const isAndroidDevice = isAndroid();
const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.indent,
    paddingTop: dimensions.indent,
  },
  textPhotos: {
    marginBottom: dimensions.indent * 0.2,
  },
  inputContainer: {
    marginTop: dimensions.indent,
  },
  locationInputContainer: {
    zIndex: 1,
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
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
  },
  buttonContainerBottom: {
    marginBottom: dimensions.indent * 2,
  },
  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationDropDownList: {
    zIndex: 2,
    position: 'absolute',
    top: -dimensions.indent * 6.5,
    height: dimensions.indent * 6,
    width: Dimensions.get('window').width - dimensions.indent * 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.input.borderColor,
    backgroundColor:
      colors.addNewItemScreen.backgroundColorDropDownList,
  },
  locationDropDownListItem: {
    color: colors.input.textColor,
    height: dimensions.indent * 2,
    width: Dimensions.get('window').width - dimensions.indent * 2,
    paddingLeft: dimensions.indent * 0.8,
    paddingRight: dimensions.indent * 0.8,
    paddingTop: dimensions.indent * 0.4,
    paddingBottom: dimensions.indent * 0.5,
  },
});
