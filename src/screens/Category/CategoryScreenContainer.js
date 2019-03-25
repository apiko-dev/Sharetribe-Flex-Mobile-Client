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
      showAllCategoriesButton: props.navigation.getParam(
        'showAllCategoriesButton',
      ),
      showCategoriesAsButton: props.navigation.getParam(
        'showAllCategoriesButton',
      ),
    })),

    withHandlers({
      chooseCategory: (props) =>
        props.navigation.getParam('chooseCategory'),
    }),
  ),
)(CategoryScreenView);
