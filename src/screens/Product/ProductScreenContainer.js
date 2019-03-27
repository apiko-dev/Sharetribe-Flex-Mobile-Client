import {
  compose,
  hoistStatics,
  withProps,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react/native';
import ProductScreenView from './ProductScreenView';

export default hoistStatics(
  compose(
    // inject((stores) => ({
    //   stores,
    // })),
    // withProps(console.log),

    withProps((props) => ({
      ...props,
      id: props.navigation.getParam('productId'),
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
