import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    margin: dimensions.smallIndent,
    marginRight: dimensions.indent,
    // margin: dimensions.indent
  },
  avatarCustomer: {
    margin: dimensions.smallIndent,
    marginLeft: dimensions.indent,
  },

  // timer: {
  //   width: 20,
  // },

  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    // margin: 10,
    padding: 7,
    backgroundColor: colors.chat.backgroundColorMessageUser,
    borderRadius: dimensions.borderRadius,
    minHeight: 30,
    minWidth: '5%',
    maxWidth: '65%',
    // margin: 9,
    // margin: dimensions.indent / 2,
  },
  fromInterlocutor: {
    // padding: 7,
    // backgroundColor: colors.chat.backgroundColorWhite,
    backgroundColor: colors.chat.backgroundColorMessage,
  },
  textFromInterlocutor: {
    color: 'black',
  },

  userSend: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  interlocutor: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
