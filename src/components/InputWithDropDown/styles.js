import { StyleSheet, Dimensions } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  locationDropDownList: {
    position: 'absolute',
    top: dimensions.indent * 3,
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
    paddingLeft: dimensions.indent * 0.8,
    paddingRight: dimensions.indent * 0.8,
    paddingTop: dimensions.indent * 0.4,
    paddingBottom: dimensions.indent * 0.5,
  },
});
