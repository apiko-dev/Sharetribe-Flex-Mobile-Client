import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: dimensions.smallIndent,
    marginTop: 0,
    marginRight: dimensions.indent,
  },
  avatarCustomer: {
    margin: dimensions.smallIndent,
    marginTop: 0,
    marginLeft: dimensions.indent,
  },

  timer: {
    marginTop: dimensions.smallIndent / 3,
    marginBottom: dimensions.indent / 2,
  },

  messageWithDate: {
    minWidth: '5%',
    maxWidth: '60%',
    alignItems: 'flex-start',
  },
  message: {
    padding: dimensions.smallIndent * 0.75,
    backgroundColor: colors.chat.backgroundColorMessageUser,
    borderRadius: dimensions.borderRadius,
    minHeight: 30,
  },

  contentFlexEnd: {
    alignItems: 'flex-end',
  },
  fromInterlocutor: {
    backgroundColor: colors.chat.backgroundColorMessage,
  },

  viewer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  interlocutor: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  titleTime: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
