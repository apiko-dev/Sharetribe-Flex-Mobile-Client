import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.chat.backgroundColor,
    flex: 1,
  },

  containerChat: {
    flex: 1,
    // backgroundColor: colors.chat.borderColor,
    // backgroundColor: colors.white,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chat.borderColor,
  },

  // listContainer: {
  //   flex: 1,
  // },
});

export default styles;
