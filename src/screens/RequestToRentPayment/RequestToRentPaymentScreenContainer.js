import {
  compose,
  hoistStatics,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import { NavigationService } from '../../services';
import RequestToRentPaymentScreenView from './RequestToRentPaymentScreenView';
import { withParamsToProps, withModal } from '../../utils/enhancers';
import { payments } from '../../utils';
import RequestSentModal from './components/RequestSentModal/RequestSentModal';
import screens from '../../navigation/screens';
import { transitionName } from '../../constants';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('startRent'),
    withParamsToProps('endRent'),
    withParamsToProps('currentTransaction'),

    inject(({ transaction }, { currentTransaction }) => ({
      transactionStore: transaction,
      initiateTransaction: transaction.initiateTransaction,
      initiateOrderAfterEnquiry:
        currentTransaction.initiateOrderAfterEnquiry,
      isInitializationTransaction:
        transaction.initiateTransaction.inProgress,
      isLoading:
        transaction.initiateTransaction.inProgress ||
        currentTransaction.initiateOrderAfterEnquiry.inProgress,
      isError:
        transaction.initiateTransaction.isError ||
        currentTransaction.initiateOrderAfterEnquiry.isError,
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

          const {
            cardNumber,
            monthExpiration,
            yearExpiration,
          } = payments.normalizeCardData(
            values.cardNumber,
            values.cardExpiration,
          );

          onChange('isVisibleModal', true);
          if (currentTransaction) {
            await initiateOrderAfterEnquiry.run({
              transactionId: currentTransaction.id,
              transition:
                transitionName.TRANSITION_REQUEST_AFTER_ENQUIRY,
              listingId: product.id,
              startRent,
              endRent,
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
              endRent,
              cardNumber,
              monthExpiration,
              yearExpiration,
              cardCVC: values.cardCVC,
              message: values.message,
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    withModal(
      (props) => ({
        isVisible: props.isVisibleModal,
        goToChat: () => {
          const transaction = props.transactionStore.list.latest;
          NavigationService.navigateToChat({ transaction });
          props.onChange('isVisibleModal', false);
        },
        gotoProduct: () => {
          const { product } = props;
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
      }),
      RequestSentModal,
    ),
  ),
)(RequestToRentPaymentScreenView);
