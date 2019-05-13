import { compose, hoistStatics, withHandlers } from 'recompose';
import { inject } from 'mobx-react';
import { AlertService, NavigationService } from '../../services';
import RequestToRentPaymentScreenView from './RequestToRentPaymentScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { payments } from '../../utils';
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
    })),

    withHandlers({
      onRequest: ({
        initiateTransaction,
        transactionStore,
        product,
        startRent,
        endRent,
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
          // TODO: Modal
          const transaction = transactionStore.list.latest;
          NavigationService.navigateToChat({ transaction });
        } catch (err) {
          AlertService.showInDevelopmentAlert();
        }
      },
    }),
  ),
)(RequestToRentPaymentScreenView);
