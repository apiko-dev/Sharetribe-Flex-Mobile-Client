import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import {
  LayoutAnimation,
  withState,
  withHandlers,
} from 'react-native';
import { inject } from 'mobx-react/native';
import R from 'ramda';

import uuid from 'uuid/v4';

import ChatScreen from './ChatScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    inject((stores, { product }) => ({
      // transactionId: R.path(['listings', 'list', 'of',], stores)
      author: R.pathOr(false, ['relationships', 'author'], product),
      // isUser: R.pathOr(false, [''])
    })),
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
    lifecycle({
      async componentDidMount() {
        console.log(
          'sddsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd',
          this.props.product,
        );
        try {
          if (this.props.product.transactionId === null) {
            await this.props.product.messageTransaction.run(
              this.props.product.id,
            );
          }

          await this.props.product.fetchMessage.run(
            this.props.product.transactionId,
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

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
