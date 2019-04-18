import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chat.borderColor,
    backgroundColor: colors.chat.backgroundColorWhite,
    borderRadius: 20,
  },
  textInput: {
    height: 50,
    flex: 1,
    marginLeft: 16,
  },
  send: {
    marginRight: 16,
  },
});

export default styles;
