import React from 'react';
import {
  compose,
  hoistStatics,
  withHandlers,
  defaultProps,
  withProps,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import {
  NavigationService,
  AlertService,
  StripeService,
} from '../../services';
import PayoutPreferencesScreenView from './PayoutPreferencesScreenView';
import screens from '../../navigation/screens';
import { withModal } from '../../utils/enhancers';
import { ServiceConnectModal } from './components';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
      createStripeAccount: viewer.createStripeAccount,
      isCreatingStripeAccount: viewer.createStripeAccount.inProgress,
    })),

    defaultProps({
      formRef: React.createRef(),
    }),

    withStateHandlers(
      {
        cardNumber: '',
        isVisibleConnectModal: false,
        connectUrl: '',
      },
      {
        onChooseCreditCard: () => (cardNumber) => ({
          cardNumber,
        }),
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      goToCreditCardList: (props) => () =>
        NavigationService.navigateTo(screens.CardList, {
          selectCard: (cardNumber) => {
            props.onChooseCreditCard(cardNumber);
            NavigationService.goBack();
          },
          cardNumber: props.cardNumber,
        }),

      onSave: (props) => (data) => {
        const connectUrl = StripeService.formUrl(data);
        props.onChange('connectUrl', connectUrl);
        props.onChange('isVisibleConnectModal', true);
      },

      onCreateStripeAccount: ({ createStripeAccount }) => async (
        code,
      ) => {
        try {
          await createStripeAccount.run(code);
        } catch (err) {
          console.log('createStripeAccount err: ', err);
          AlertService.showSomethingWentWrong();
        }
      },
    }),

    withProps(({ user, isCreatingStripeAccount }) => {
      const initialValues = {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.email,
      };

      const isLoading = isCreatingStripeAccount;

      return {
        initialValues,
        isLoading,
      };
    }),

    withModal(
      (props) => ({
        isVisible: props.isVisibleConnectModal,
        url: props.connectUrl,
        onCloseModal: () =>
          props.onChange('isVisibleConnectModal', false),
        onSuccess: (code) => props.onCreateStripeAccount(code),
      }),
      ServiceConnectModal,
    ),
  ),
)(PayoutPreferencesScreenView);
