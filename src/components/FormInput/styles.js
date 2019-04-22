import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  inputError: {
    borderColor: colors.input.errorBorderColor,
  },

  dropDownList: {
    zIndex: 2,
    position: 'absolute',
    left: dimensions.indent,
    top: dimensions.indent * 4.8,
    height: dimensions.indent * 6,
    width: dimensions.width - dimensions.indentModerated * 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.input.borderColor,
    backgroundColor:
      colors.addNewItemScreen.backgroundColorDropDownList,
  },
  dropDownListItem: {
    zIndex: 3,
    color: colors.input.textColor,
    height: dimensions.indent * 2,
    width: dimensions.width - dimensions.indentModerated * 4,
    paddingLeft: dimensions.indent * 0.8,
    paddingRight: dimensions.indent * 0.8,
    paddingTop: dimensions.indent * 0.4,
    paddingBottom: dimensions.indent * 0.5,
  },
});
