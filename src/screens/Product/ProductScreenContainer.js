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
import { NavigationService, AlertService } from '../../services';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('product'),

    inject((stores, { product }) => ({
      product,
      images: R.pathOr(
        [],
        ['relationships', 'getImages'],
        product,
      ).map(R.path(['variants', 'default', 'url'])),
      gallery: R.pathOr(
        [],
        ['relationships', 'getImages'],
        product,
      ).map(R.path(['variants', 'default'])),
      getAvailableDays: product.getAvailableDays,
      isLoadingDates: product.getAvailableDays.inProgress,
      isSending:
        stores.transaction.initiateMessageTransaction.inProgress,
      author: R.pathOr(false, ['relationships', 'author'], product),
      transaction: stores.transaction.list.asArray,
      transactionStore: stores.transaction,
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
        availableDates: {},
      },
      {
        onChangeIndex: () => (index) => ({
          currentIndex: index,
        }),
        onChangeTabIndex: () => (index) => ({
          tabIndex: index,
        }),
        onChange: () => (field, value) => ({
          [field]: value,
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

      navigationToCalendar: (props) => async () => {
        try {
          await props.getAvailableDays.run(props.product.id);
        } catch (error) {
          AlertService.showSomethingWentWrong();
        }
        props.navigation.navigate(screens.Calendar, {
          product: props.product,
        });
      },

      onCall: (props) => () => {
        const args = {
          number: props.phoneNumber,
          prompt: false,
        };

        call(args).catch(console.log);
      },

      onSend: ({ product, transactionStore }) => async () => {
        try {
          await transactionStore.initiateMessageTransaction.run(
            product.id,
          );
          const transaction = transactionStore.list.latest;
          NavigationService.navigateToChat({
            transaction,
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),

    lifecycle({
      async componentDidMount() {
        if (this.props.product.canEdit) {
          this.props.navigation.setParams({
            navigateToProductEdit: () =>
              this.props.navigationToEditProduct(),
          });
        }

        try {
          await this.props.getAvailableDays.run(
            this.props.product.id,
          );
        } catch (error) {
          AlertService.showSomethingWentWrong();
        }
      },
    }),
  ),
)(ProductScreenView);
