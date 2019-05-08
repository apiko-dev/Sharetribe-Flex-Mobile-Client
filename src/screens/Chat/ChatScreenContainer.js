import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withState,
  withHandlers,
} from 'recompose';
import { LayoutAnimation } from 'react-native';
import { inject } from 'mobx-react';
import R from 'ramda';

import ChatScreen from './ChatScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { NavigationService } from '../../services';

export default hoistStatics(
  compose(
    withParamsToProps('transaction'),
    withParamsToProps('product'),
    withStateHandlers(
      (props) => ({
        transaction: props.transaction,
      }),
      {
        setTransaction: () => (value) => ({
          transaction: value,
        }),
      },
    ),
    inject((stores, { transaction }) => ({
      messageCollection: R.pathOr(
        [],
        ['messages', 'list', 'asArray'],
        transaction,
      ),
      transactionId: R.path(['id'], transaction),
      isLoading: R.path(
        ['messages', 'fetchMessages', 'inProgress'],
        transaction,
      ),
      transactionStore: stores.transaction,
    })),
    withStateHandlers(
      {
        isShowDetails: false,
      },
      {
        setShowDetails: (props) => () => ({
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
    lifecycle({
      async componentDidMount() {
        try {
          if (this.props.product) {
            await this.props.transactionStore.initiateMessageTransaction.run(
              this.props.product.id,
            );
            const transaction = this.props.transactionStore.list
              .latest;
            this.props.setTransaction(transaction);
          } else {
            this.props.transaction.messages.fetchMessages.run();
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    withState('messageInputText', 'setMessageInputText', ''),
    withHandlers({
      onSend: (props) => () => {
        const content = props.messageInputText.trim();

        LayoutAnimation.easeInEaseOut();
        if (content.length > 0) {
          props.transaction.messages.sendMessage.run(content);
          props.setMessageInputText('');
        }
      },

      fetchMoreMessages: (props) => () => {
        props.transaction.messages.fetchMoreMessages.run();
      },
      onAccept: (props) => () => {
        props.transactionStore.changeStateTransactions.run({
          transactionId: props.transactionId,
          transition: 'accept',
        });
      },
      onDeny: (props) => () => {
        props.transactionStore.changeStateTransactions.run({
          transactionId: props.transactionId,
          transition: 'decline',
        });
      },
      goToProduct: (props) => () => {
        NavigationService.navigateToProduct({
          product: props.transaction.relationships.listing,
        });
      },
    }),
  ),
)(ChatScreen);
