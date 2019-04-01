import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.disableColor,
    opacity: 0.4,
  },
  icon: {},
  right: {
    marginRight: dimensions.indent,
  },
  left: {
    marginLeft: dimensions.indent,
  },
});
