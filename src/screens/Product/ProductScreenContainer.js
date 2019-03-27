import {
  compose,
  hoistStatics,
  withProps,
  withStateHandlers,
} from 'recompose';
import R from 'ramda';
import { inject } from 'mobx-react/native';
import ProductScreenView from './ProductScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    inject((stores, { product }) => ({
      product,
      images: R.path(['relationships', 'getImages'], product).map(
        R.path(['variants', 'default', 'url']),
      ),
      // images: R.path(['relationships', 'getImages'], product),
    })),
    withStateHandlers(
      {
        currentIndex: 0,
      },
      {
        onChangeIndex: () => (index) => ({
          currentIndex: index,
        }),
      },
    ),
  ),
)(ProductScreenView);
