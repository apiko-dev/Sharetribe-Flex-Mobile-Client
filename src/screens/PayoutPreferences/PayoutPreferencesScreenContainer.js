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
import { withModal, withParamsToProps } from '../../utils/enhancers';
import { StripeTokenService } from './components';
import { countries } from '../../constants';

export default hoistStatics(
  compose(
    withParamsToProps('onContinue'),
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
        stripeData: {},
        isCreatingTokens: false,
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
        props.onChange('isVisibleConnectModal', true);
        props.onChange('isCreatingTokens', true);

        // Get country key by country name
        const index = countries.stripeCountriesList.findIndex(
          (i) => i.title === data.country,
        );
        const countryKey = countries.stripeCountriesList[index].key;

        props.onChange('stripeData', {
          ...data,
          country: countryKey,
        });
      },

      onCreateStripeAccount: ({
        createStripeAccount,
        onContinue,
      }) => async (tokens) => {
        try {
          await createStripeAccount.run(tokens);
          await onContinue();
        } catch (err) {
          AlertService.showSomethingWentWrong();
        }
      },
    }),

    withProps(
      ({ user, isCreatingStripeAccount, isCreatingTokens }) => {
        const initialValues = {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          email: user.email,
          birthDate: '12',
          month: '12',
          year: '2000',
          country: 'United States',
          streetAddress: '560 S Lawrence St',
          city: 'Montgomery',
          postalCode: '36104',
          accountNumber: '123412341234',
        };

        const isLoading = isCreatingStripeAccount || isCreatingTokens;

        return {
          initialValues,
          isLoading,
        };
      },
    ),

    withModal(
      (props) => ({
        isVisible: props.isVisibleConnectModal,
        stripeData: props.stripeData,
        onCloseModal: () => {
          props.onChange('isVisibleConnectModal', false);
          props.onChange('isCreatingTokens', false);
        },
        onSuccess: (data) => props.onCreateStripeAccount(data),
      }),
      StripeTokenService,
    ),
  ),
)(PayoutPreferencesScreenView);
