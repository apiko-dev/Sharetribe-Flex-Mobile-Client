import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isLargeDevice } from '../../utils';

const isLarge = isLargeDevice();

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  safeAreaViewContainer: {
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  formContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: dimensions.indent * 0.75,
  },
  oneMoreThings: {
    paddingTop: dimensions.indent,
    paddingHorizontal: dimensions.indent,
    marginBottom: dimensions.indent * 2.2,
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.1,
  },
  inputRowContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  inputLeft: {
    flex: 2,
    marginRight: dimensions.indent,
  },
  inputRight: {
    flex: 2,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 1.3,
    marginBottom: isLarge
      ? dimensions.indent * 1.4
      : dimensions.indent,
    marginLeft: dimensions.indent * 2.2,
    marginRight: dimensions.indent * 2.2,
  },
  dropDownList: {
    zIndex: 2,
    position: 'absolute',
    left: dimensions.indent,
    top: -dimensions.indent * 4.8,
    height: dimensions.indent * 6,
    width: dimensions.width - dimensions.indentModerated * 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.input.borderColor,
    backgroundColor:
      colors.addNewItemScreen.backgroundColorDropDownList,
  },
  dropDownListItem: {
    color: colors.input.textColor,
    height: dimensions.indent * 2,
    width: dimensions.width - dimensions.indentModerated * 4,
    paddingLeft: dimensions.indent * 0.8,
    paddingRight: dimensions.indent * 0.8,
    paddingTop: dimensions.indent * 0.4,
    paddingBottom: dimensions.indent * 0.5,
  },
});
