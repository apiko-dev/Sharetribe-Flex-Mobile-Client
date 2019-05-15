import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.chat.backgroundColor,
    flex: 1,
  },

  containerChat: {
    flex: 1,
  },

  inputContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chat.borderColor,
    transform: [{ rotate: '180deg' }],
  },

  rotate: {
    transform: [{ rotate: '180deg' }],
  },

  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
