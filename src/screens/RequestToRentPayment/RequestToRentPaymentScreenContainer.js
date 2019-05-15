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

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('startRent'),
    withParamsToProps('endRent'),

    inject(({ transaction }) => ({
      transactionStore: transaction,
      initiateTransaction: transaction.initiateTransaction,
      isInitializationTransaction:
        transaction.initiateTransaction.inProgress,
      isLoading: transaction.initiateTransaction.inProgress,
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
        isError: props.initiateTransaction.isError,
      }),
      RequestSentModal,
    ),
  ),
)(RequestToRentPaymentScreenView);
