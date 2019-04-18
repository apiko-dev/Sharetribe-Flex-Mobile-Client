import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: -90,
    left: -110,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.7,
  },
  messageContainer: {
    backgroundColor: colors.formInfo.backgroundColor,
    padding: dimensions.indent * 0.5,
    borderRadius: 10,
    width: dimensions.indent * 11,
  },
  text: {
    marginLeft: dimensions.indent * 0.3,
    marginRight: dimensions.indent,
  },
  triangle: {
    left: 130,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.formInfo.backgroundColor,
    transform: [{ rotate: '180deg' }],
  },
});
