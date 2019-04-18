import { compose, hoistStatics, withStateHandlers } from 'recompose';
import {
  LayoutAnimation,
  withState,
  withHandlers,
} from 'react-native';

import uuid from 'uuid/v4';

import ChatScreen from './ChatScreenView';

export default hoistStatics(
  compose(
    withStateHandlers(
      {
        isShowDetails: false,
      },
      {
        setShowDetails: (props) => () => ({
          // LayoutAnimation.easeInEaseOut();
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
    // withState('messageInputText', 'setMessageInputText', ''),
    // withState(
    //   'name',
    //   'setName',
    //   (props) => props.navigation.state.params.name,
    // ),
    // withHandlers({
    // onSend: (props) => () => {
    //   const body = (text) => ({
    //     id: uuid(),
    //     fromUser: 'Taras',
    //     toUser: 'Reeves',
    //     message: text,
    //     dateTime: new Date().getTime(),
    //   });
    //   const mess = body(props.messageInputText);
    //   if (props.messageInputText.trim().length > 0) {
    //     props.sendMessage(mess);
    //     props.setMessageInputText('');
    //   }
    // //////
    // const delayMessage = () => {
    //   const body = () => ({
    //     id: uuid(),
    //     fromUser: 'Reeves',
    //     toUser: 'Taras',
    //     message: 'Whats uuuuuup',
    //     dateTime: new Date().getTime(),
    //   });
    //   const mess = body(props.messageInputText);
    //   props.sendMessage(mess);
    // };
    // setTimeout(delayMessage, 1000);
    // },
    // }),
  ),
)(ChatScreen);
