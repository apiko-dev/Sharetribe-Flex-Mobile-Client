import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.helpScreen.backgroundColorTop,
    padding: dimensions.indent,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.helpScreen.borderColor,
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: dimensions.indent * 1.5,
  },
  bottom: {
    paddingTop: dimensions.indent,
  },
});

export default styles;
