import {
  compose,
  hoistStatics,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import { Keyboard } from 'react-native';
import R from 'ramda';
import { NavigationService, AlertService } from '../../services';
import RequestToRentPaymentScreenView from './RequestToRentPaymentScreenView';
import { withParamsToProps, withModal } from '../../utils/enhancers';
import { payments, dates } from '../../utils';
import RequestSentModal from './components/RequestSentModal/RequestSentModal';
import screens from '../../navigation/screens';
import { transitionStatuses } from '../../constants';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('startRent'),
    withParamsToProps('endRent'),
    withParamsToProps('currentTransaction'),

    inject(({ transaction }, { currentTransaction, product }) => ({
      transactionStore: transaction,
      initiateTransaction: transaction.initiateTransaction,
      initiateOrderAfterEnquiry:
        currentTransaction.initiateOrderAfterEnquiry,
      isInitializationTransaction:
        transaction.initiateTransaction.inProgress,
      isLoading:
        transaction.initiateTransaction.inProgress ||
        R.pathOr(
          false,
          ['initiateOrderAfterEnquiry', 'inProgress'],
          currentTransaction,
        ),
      isError:
        transaction.initiateTransaction.isError ||
        R.pathOr(
          false,
          ['initiateOrderAfterEnquiry', 'isError'],
          currentTransaction,
        ),
      // isErrorSpec:
      //   transaction.initiateTransaction.isError ||
      //   R.pathOr(
      //     false,
      //     ['initiateOrderAfterEnquiry', 'isError'],
      //     currentTransaction,
      //   ),
      currentTransaction,
      // errorMessage: R.pathOr(
      //   false,
      //   ['initiateTransaction', 'errorMessage'],
      //   transaction,
      // ),
      // errorMessage: transaction.initiateTransaction.errorMessage,
      getAvailableDays: product.getAvailableDays,
    })),
    withStateHandlers(
      {
        isVisibleModal: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      onRequest: ({
        initiateTransaction,
        initiateOrderAfterEnquiry,
        currentTransaction,
        product,
        startRent,
        endRent,
        onChange,
      }) => async (values) => {
        try {
          console.log('onRequest: ', startRent, endRent);
          Keyboard.dismiss();
          const {
            cardNumber,
            monthExpiration,
            yearExpiration,
          } = payments.normalizeCardData(
            values.cardNumber,
            values.cardExpiration,
          );
          // add one day as in sharetribe the last date is not included
          // in the term of the lease
          const newEndRent = dates.addOneDay(endRent);

          onChange('isVisibleModal', true);
          if (
            currentTransaction.lastTransitions ===
            transitionStatuses.ENQUIRE
          ) {
            await initiateOrderAfterEnquiry.run({
              transactionId: currentTransaction.id,
              transition: transitionStatuses.AFTER_ENQUIRE,
              listingId: product.id,
              startRent,
              endRent: newEndRent,
              cardNumber,
              monthExpiration,
              yearExpiration,
              cardCVC: values.cardCVC,
              message: values.message,
            });
          } else {
            await initiateTransaction.run({
              listingId: product.id,
              startRent,
              endRent: newEndRent,
              cardNumber,
              monthExpiration,
              yearExpiration,
              cardCVC: values.cardCVC,
              message: values.message,
            });
          }
        } catch (err) {
          // throw new Error(err);
          console.log(err);
        }
      },
    }),
    withModal(
      (props) => ({
        isVisible: props.isVisibleModal,
        goToChat: () => {
          const transaction = props.transactionStore.list.latest;
          props.onChange('isVisibleModal', false);
          NavigationService.navigateToChat({
            transaction,
            fromRequest: true,
            product: props.product,
          });
        },
        gotoProduct: async () => {
          const { product } = props;
          try {
            await props.getAvailableDays.run(product.id);
          } catch (error) {
            AlertService.showSomethingWentWrong();
          }
          NavigationService.navigateToProduct({ product });
          props.onChange('isVisibleModal', false);
        },
        navigationToRequestToRent: () => {
          NavigationService.navigateTo(screens.RequestToRent, {
            product: props.product,
          });
          props.onChange('isVisibleModal', false);
        },
        onCloseModal: () => {
          props.onChange('isVisibleModal', false);
        },
        isLoading: props.isLoading,
        isError: props.isError,
        // isErrorSpec: props.isErrorSpec,
        // errorMessage: props.errorMessage,
      }),
      RequestSentModal,
    ),
  ),
)(RequestToRentPaymentScreenView);
