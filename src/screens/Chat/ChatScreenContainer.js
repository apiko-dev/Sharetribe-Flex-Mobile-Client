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
import { NavigationService, AlertService } from '../../services';
import { transitionStatuses } from '../../constants';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('transaction'),
    withParamsToProps('product'),
    withStateHandlers(
      (props) => ({
        transaction: props.transaction,
        availableDates: {},
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
          R.pathOr('', ['lastTransition'], props.transaction) ===
          transitionStatuses.ENQUIRE,
      }),
      {
        setShowDetails: (props) => () => ({
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
    withHandlers({
      navigationToRequestToRent: (props) => () => {
        NavigationService.navigateTo(screens.RequestToRent, {
          product: props.transaction.relationships.listing,
          availableDates: props.availableDates,
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
          } else {
            this.props.transaction.messages.fetchMessages.run();
          }
        } catch (err) {
          console.log(err);
        }
        // ////////////////////////
        if (this.props.isOpenedChat) {
          try {
            const availableDates = await this.props.getAvailableDays.run(
              this.props.listing,
            );
            // const availableDates = this.props.product.availabilityPlan
            //   .entries;

            this.props.onChange('availableDates', availableDates);
          } catch (error) {
            AlertService.showSomethingWentWrong();
          }
        }
        // /////////////////////
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
          transition: transitionStatuses.ACCEPT,
        });
      },
      onDeny: (props) => () => {
        props.transactionStore.changeStateTransactions.run({
          transactionId: props.transactionId,
          transition: transitionStatuses.DECLINE,
        });
        NavigationService.navigateTo(screens.Inbox, {});
      },
      // goToProduct: (props) => () => {
      //   NavigationService.navigateToProduct({
      //     product: props.transaction.relationships.listing,
      //   });
      // },
    }),
  ),
)(ChatScreen);
