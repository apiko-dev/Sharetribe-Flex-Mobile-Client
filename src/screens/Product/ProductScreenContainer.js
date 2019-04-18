import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';

import R from 'ramda';

import { inject } from 'mobx-react/native';
import call from 'react-native-phone-call';
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
      gallery: R.path(['relationships', 'getImages'], product).map(
        R.path(['variants', 'default']),
      ),
      author: R.pathOr(false, ['relationships', 'author'], product),

      phoneNumber: R.path(
        [
          'relationships',
          'author',
          'profile',
          'publicData',
          'phoneNumber',
        ],
        product,
      ),
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
      onCall: (props) => () => {
        const args = {
          number: props.phoneNumber,
          prompt: false,
        };

        call(args).catch(console.error);
      },
      onSend: (props) => async () => {
        try {
          await props.product.messageTransaction.run(
            props.product.id,
          );
          debugger;
        } catch (err) {
          debugger;
        }
      },
      fakeMessage: (props) => async () => {
        // const data = {
        //   transactionId: '5cb885d1-734b-44c7-ad5e-ae9f4f5eefa1',
        //   content: 'this is a TEST message ',
        // };
        // try {
        //   await props.product.sendMessage.run(
        //     data.transactionId,
        //     data.content,
        //   );
        //   debugger;
        // } catch (err) {
        //   debugger;
        // }
        // //////
        const data = {
          transactionId: '5cb885d1-734b-44c7-ad5e-ae9f4f5eefa1',
        };
        try {
          await props.product.fetchMessage.run(data.transactionId);
          debugger;
        } catch (err) {
          debugger;
        }
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
