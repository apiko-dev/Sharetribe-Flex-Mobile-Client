import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  message: {
    // margin: 10,
    padding: 7,
    backgroundColor: colors.chat.backgroundColorMessageUser,
    borderRadius: dimensions.borderRadius,
    minHeight: 30,
    minWidth: '5%',
    maxWidth: '65%',
    margin: 9,
    // margin: dimensions.indent / 2,
  },
  fromInterlocutor: {
    backgroundColor: 'white',
    backgroundColor: colors.chat.backgroundColorMessage,
  },
  textFromInterlocutor: {
    color: 'black',
  },

  userSend: {
    alignItems: 'flex-end',
  },
  interlocutor: {
    alignItems: 'flex-start',
  },

  input: {
    borderColor: 'black',
  },

  titleTime: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    // color: colors.white,
  },
});
export default styles;
