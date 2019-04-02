import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

export default StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  circled: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.disableColor,
    opacity: 0.4,
    zIndex: 1,
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    zIndex: 200,
  },
  right: {
    marginRight: dimensions.indent,
  },
  left: {
    marginLeft: dimensions.indent,
  },
});
