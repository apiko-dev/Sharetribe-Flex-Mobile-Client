import { hoistStatics, compose, withHandlers } from 'recompose';
import CategoryScreenView from './CategoryScreenView';

export default hoistStatics(
  compose(
    withHandlers({
      chooseCategory: (props) =>
        props.navigation.getParam('chooseCategory'),
    }),
  ),
)(CategoryScreenView);
