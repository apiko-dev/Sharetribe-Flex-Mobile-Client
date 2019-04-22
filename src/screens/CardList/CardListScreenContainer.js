import {
  hoistStatics,
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import CardListScreenView from './CardListScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('selectCard'),
    withStateHandlers(
      {
        selectedCard: '',
      },
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
