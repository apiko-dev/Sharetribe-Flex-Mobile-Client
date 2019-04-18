import {
  compose,
  hoistStatics,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose';
import {} from '../../services';
import R from 'ramda';
import RequestToRentScreenView from './RequestToRentScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { dates } from '../../utils';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    withParamsToProps('availableDates'),

    withProps((props) => ({
      price: R.path(['product', 'price', 'amount'], props),
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
        });

        props.onChange('formatedDate', rangeDate);
      },
    }),
  ),
)(RequestToRentScreenView);
