import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withState,
  withHandlers,
} from 'recompose';
import { LayoutAnimation } from 'react-native';
import { inject } from 'mobx-react/native';
import R from 'ramda';

import ChatScreen from './ChatScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    inject((stores, { product }) => ({
      // transactionId: R.path(['listings', 'list', 'of',], stores)
      author: R.pathOr(false, ['relationships', 'author'], product),
      // isUser: R.pathOr(false, [''])
      messages: R.pathOr([], ['messages'], product),
      // messages: R.pathOr([], ['entities', 'messages'], stores),
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
          // if (this.props.product.transactionId === null) {
          //   await this.props.product.messageTransaction.run(
          if (this.props.product.transactionId === null) {
            await this.props.messages.messageTransaction.run(
              this.props.product.id,
            );
          }

          // await this.props.product.fetchMessage.run(
          await this.props.messages.fetchMessage.run(
            this.props.product.transactionId,
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    withState('messageInputText', 'setMessageInputText', ''),
    withHandlers({
      onSend: (props) => () => {
        const mess = props.messageInputText.trim();
        if (props.messageInputText.trim().length > 0) {
          try {
            // props.product.sendMessage.run(
            props.messages.sendMessage.run(
              props.product.transactionId,
              mess,
            );
            props.setMessageInputText('');
          } catch (err) {
            console.log(err);
          }
        }
      },
    }),
  ),
)(ChatScreen);
