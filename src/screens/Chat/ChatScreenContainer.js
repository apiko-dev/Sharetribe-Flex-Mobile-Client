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
import { transitionStatuses } from '../../constants';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('transaction'),
    withParamsToProps('product'),
    withParamsToProps('rentPeriod'),
    withStateHandlers(
      (props) => ({
        transaction: R.pathOr({}, ['transaction'], props),
      }),
      {
        setTransaction: () => (value) => ({
          transaction: value,
        }),
        onChange: () => (field, value) => ({
          [field]: value,
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
      getAvailableDays: stores.listings.getAvailableDays,
      listing: R.path(
        ['relationships', 'listing', 'id'],
        transaction,
      ),
    })),
    withStateHandlers(
      (props) => ({
        isShowDetails: false,
        isOpenedChat:
          R.pathOr(false, ['lastTransition'], props.transaction) ===
          transitionStatuses.ENQUIRE,
      }),
      {
        setIsOpenedChat: () => (value) => ({
          isOpenedChat: value,
        }),
        setShowDetails: (props) => () => ({
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
    withHandlers({
      navigationToRequestToRent: (props) => () => {
        NavigationService.navigateTo(screens.RequestToRent, {
          product: props.transaction.relationships.listing,
        });
      },
      navigateToListing: (props) => () => {
        NavigationService.navigateToProduct({
          product: props.transaction.relationships.listing,
        });
      },
    }),
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
            this.props.setIsOpenedChat(
              R.pathOr(
                '',
                ['transaction', 'lastTransition'],
                this.props,
              ) === transitionStatuses.ENQUIRE,
            );
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
        props.transaction.changeStateTransactions.run(
          transitionStatuses.ACCEPT,
        );
        NavigationService.navigateTo(screens.Inbox, {});
      },
      onDeny: (props) => () => {
        props.transaction.changeStateTransactions.run(
          transitionStatuses.DECLINE,
        );
        NavigationService.navigateTo(screens.Inbox, {});
      },
    }),
  ),
)(ChatScreen);
