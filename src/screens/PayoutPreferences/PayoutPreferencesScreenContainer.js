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
import { NavigationService, AlertService } from '../../services';
import PayoutPreferencesScreenView from './PayoutPreferencesScreenView';
import screens from '../../navigation/screens';

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
      },
      {
        onChooseCreditCard: () => (cardNumber) => ({
          cardNumber,
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
        }),

      onSave: ({ createStripeAccount }) => async (data) => {
        try {
          await createStripeAccount.run(data);
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
      };

      const isLoading = isCreatingStripeAccount;

      return {
        initialValues,
        isLoading,
      };
    }),
  ),
)(PayoutPreferencesScreenView);
