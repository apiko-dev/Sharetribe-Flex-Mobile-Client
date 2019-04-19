import {
  compose,
  hoistStatics,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import { AlertService } from '../../services';
import RequestToRentPaymentScreenView from './RequestToRentPaymentScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { payments } from '../../utils';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('startRent'),
    withParamsToProps('endRent'),

    inject(({ transaction }) => ({
      initiateTransaction: transaction.initiateTransaction,
      isInitializationTransaction:
        transaction.initiateTransaction.inProgress,
    })),

    withHandlers({
      onRequest: ({
        initiateTransaction,
        product,
        startRent,
        endRent,
      }) => async (values) => {
        try {
          console.log('onRequest: ', startRent, endRent);

          const {
            cardDate,
            cardExpiration,
          } = payments.normalizeCardData(
            values.cardNumber,
            values.cardExpiration,
          );

          await initiateTransaction.run({
            listingId: product.id,
            startRent,
            endRent,
            cardDate,
            cardExpiration,
            cardCVC: values.cardCVC,
            message: values.message,
          });
          AlertService.showInDevelopmentAlert();
        } catch (err) {
          console.log('error: ', err);
          AlertService.showInDevelopmentAlert();
        }
      },
    }),

    withPropsOnChange(['product'], (props) => {
      props.navigation.setParams({
        productName: props.product.title,
      });
    }),
  ),
)(RequestToRentPaymentScreenView);
