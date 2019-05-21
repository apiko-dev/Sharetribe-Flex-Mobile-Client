import {
  compose,
  hoistStatics,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose';
import R from 'ramda';
import { NavigationService } from '../../services';
import RequestToRentScreenView from './RequestToRentScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { dates } from '../../utils';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('currentTransaction'),

    withProps((props) => ({
      price: R.path(['product', 'price', 'amount'], props),
      currentTransaction: R.pathOr(
        false,
        ['currentTransaction'],
        props,
      ),
    })),

    withStateHandlers(
      {
        startRent: '',
        endRent: '',
        diffDays: 0,
        formatedDate: '',
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      goToRequestToRentPayment: ({
        product,
        startRent,
        endRent,
        currentTransaction,
      }) => () =>
        NavigationService.navigateTo(screens.RequestToRentPayment, {
          product,
          startRent,
          endRent,
          productName: product.title,
          currentTransaction,
        }),

      getStartAndEndDate: (props) => (
        startRent,
        endRent,
        diffDays,
      ) => {
        props.onChange('startRent', startRent);
        props.onChange('endRent', endRent);
        props.onChange('diffDays', diffDays);

        const { rangeDate } = dates.formatedDate({
          start: startRent,
          end: endRent,
          withoutFormattingEndDate: true,
        });

        props.onChange('formatedDate', rangeDate);
      },
    }),
  ),
)(RequestToRentScreenView);
