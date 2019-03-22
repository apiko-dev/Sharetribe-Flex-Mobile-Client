import {
  hoistStatics,
  compose,
  withHandlers,
  withProps,
} from 'recompose';
import CategoryScreenView from './CategoryScreenView';

export default hoistStatics(
  compose(
    withProps((props) => ({
      ...props,
      onlyCategory: props.navigation.getParam('onlyCategory'),
    })),

    withHandlers({
      chooseCategory: (props) =>
        props.navigation.getParam('chooseCategory'),
    }),
  ),
)(CategoryScreenView);
