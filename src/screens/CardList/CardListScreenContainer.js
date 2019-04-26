import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
  withProps,
} from 'recompose';
import CardListScreenView from './CardListScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('selectCard'),
    withParamsToProps('cardNumber'),
    withStateHandlers(
      (props) => ({
        selectedCard: props.cardNumber || '',
      }),
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      onContinue: (props) => () =>
        props.selectCard(props.selectedCard),
    }),
  ),
)(CardListScreenView);
