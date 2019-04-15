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

export default hoistStatics(
  compose(
    withParamsToProps('product'),

    withProps((props) => ({
      price: R.path(['product', 'price', 'amount'], props),
    })),

    withStateHandlers(
      {
        startRent: '',
        endRent: '',
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      onDayPress: (props) => (value) => {
        if (props.startRent) {
          props.onChange('endRent', value.dateString);
        } else {
          props.onChange('startRent', value.dateString);
        }
      },
    }),
  ),
)(RequestToRentScreenView);
