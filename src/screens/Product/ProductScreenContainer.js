import { compose, hoistStatics, withProps } from 'recompose';
import ProductScreenView from './ProductScreenView';

export default hoistStatics(
  compose(
    withProps((props) => ({
      ...props,
      id: props.navigation.getParam('productId'),
    })),
  ),
)(ProductScreenView);
