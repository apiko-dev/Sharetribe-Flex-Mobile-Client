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
import screens from '../../navigation/screens';
import { AlertService } from '../../services';

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
      getAvailableDays: stores.listings.getAvailableDays,
      isLoadingDates: stores.listings.getAvailableDays.inProgress,
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

      navigationToCalendar: (props) => () => {
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
