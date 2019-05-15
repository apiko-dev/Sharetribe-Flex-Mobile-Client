import { StyleSheet } from 'react-native';
import { colors, dimensions, fontSizes } from '../../../../styles';

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chat.borderColor,
    backgroundColor: colors.chat.backgroundColorWhite,
    alignItems: 'flex-end',
  },
  textInput: {
    minHeight: 50,
    maxHeight: 150,
    flex: 1,
    fontSize: fontSizes.medium,
    padding: dimensions.indent,
    paddingTop: dimensions.indent,
  },
  send: {
    textAlignVertical: 'center',
    margin: dimensions.smallIndent,
  },
});

export default styles;
