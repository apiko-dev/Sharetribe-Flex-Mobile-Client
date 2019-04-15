import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.helpScreen.backgroundColorTop,
    padding: dimensions.indent,
  },
  touchableContainer: {
    // borderTop:
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: dimensions.indent,
  },
  bottom: {},
});

export default styles;
