import {
  compose,
  hoistStatics,
  withStateHandlers,
  withState,
  withHandlers,
  lifecycle,
  withPropsOnChange,
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
    inject((stores, { transaction }) => ({
      isShowLinkReview:
        !transaction.isViewer &&
        R.pathOr(false, ['lastTransition'], transaction) ===
          transitionStatuses.COMPLETE,
      messageCollection: R.pathOr(
        [],
        ['messages', 'list', 'asArray'],
        transaction,
      ),
      currentTransaction: transaction,
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
      isOpenedChat:
        R.pathOr(false, ['lastTransition'], transaction) ===
        transitionStatuses.ENQUIRE,
      listingAuthor: R.pathOr(
        '',
        [
          'relationships',
          'listing',
          'relationships',
          'author',
          'profile',
          'displayName',
        ],
        transaction,
      ),
    })),
    withPropsOnChange(['listingAuthor'], (props) => {
      let userName;
      if (props.currentTransaction.isViewer) {
        userName =
          props.currentTransaction.relationships.customer.profile
            .displayName;
      } else {
        userName =
          props.currentTransaction.relationships.provider.profile
            .displayName;
      }

      props.navigation.setParams({
        userName,
      });

    }),
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
    withHandlers({
      navigationToRequestToRent: (props) => () => {
        NavigationService.navigateTo(screens.RequestToRent, {
          product: props.transaction.relationships.listing,
          currentTransaction: props.currentTransaction,
        });
      },
      navigateToListing: (props) => () => {
        NavigationService.navigateToProduct({
          product: props.transaction.relationships.listing,
        });
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
        props.transaction.changeStateTransactions.run({
          transition: transitionStatuses.ACCEPT,
        });
        NavigationService.navigateTo(screens.Inbox, {});
      },
      onDeny: (props) => () => {
        props.transaction.changeStateTransactions.run({
          transition: transitionStatuses.DECLINE,
        });
        NavigationService.navigateTo(screens.Inbox, {});
      },
      writeReview: ({ transaction }) => () => {
        NavigationService.navigateTo(screens.Review, { transaction });
      },
    }),
    lifecycle({
      async componentDidMount() {
        try {
          this.props.transaction.messages.fetchMessages.run();
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ),
)(ChatScreen);
