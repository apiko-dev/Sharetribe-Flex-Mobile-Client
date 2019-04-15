import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';
import R from 'ramda';

import { inject } from 'mobx-react/native';
import ProductScreenView from './ProductScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('product'),
    inject((stores, { product }) => ({
      product,
      images: R.path(['relationships', 'getImages'], product).map(
        R.path(['variants', 'default', 'url']),
      ),
      gallery: R.path(['relationships', 'getImages'], product).map(
        R.path(['variants', 'default']),
      ),
      author: R.path(['relationships', 'author'], product),
    })),
    withStateHandlers(
      {
        currentIndex: 0,
        tabIndex: 0,
      },
      {
        onChangeIndex: () => (index) => ({
          currentIndex: index,
        }),
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
      },
    ),
    withHandlers({
      navigateToImageScreen: (props) => (images, currentIndex) => {
        props.navigation.navigate('Gallery', {
          images,
          currentIndex,
        });
      },
      navigationToEditProduct: (props) => () => {
        props.navigation.navigate('AddNewItem', {
          product: props.product,
          isEditing: true,
        });
      },
      navigationToRequestToRent: (props) => () => {
        props.navigation.navigate(screens.RequestToRent, {
          product: props.product,
        });
      },
    }),
    lifecycle({
      componentDidMount() {
        if (this.props.product.canEdit) {
          this.props.navigation.setParams({
            navigateToProductEdit: () =>
              this.props.navigationToEditProduct(),
          });
        }
      },
    }),
  ),
)(ProductScreenView);
