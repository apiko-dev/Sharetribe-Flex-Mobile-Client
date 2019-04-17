import {
  compose,
  hoistStatics,
  withStateHandlers,
  withHandlers,
  lifecycle,
  withProps,
} from 'recompose';
import R from 'ramda';
import { inject } from 'mobx-react/native';
import XDate from 'xdate';
import ProductScreenView from './ProductScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import { dates } from '../../utils';
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
      author: R.path(['relationships', 'author'], product),
      getAvailableDays: stores.listings.getAvailableDays,
      isLoadingDates: stores.listings.getAvailableDays.inProgress,
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
          availableDates: props.availableDates,
        });
      },
      navigationToCalendar: (props) => () => {
        props.navigation.navigate(screens.Calendar, {
          availableDates: props.availableDates,
        });
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
          const availableDates = await this.props.getAvailableDays.run(
            this.props.product.id,
          );

          this.props.onChange('availableDates', availableDates);
        } catch (error) {
          AlertService.showSomethingWentWrong();
        }
      },
    }),

    withProps((props) => {
      const employedDates = R.pathOr(
        [],
        ['availableDates', 'employedDates'],
        props,
      );

      const availableDates = R.pathOr(
        [],
        ['availableDates', 'availableDates'],
        props,
      );

      const today = new XDate().toString('yyyy-MM-dd');
      const isOnLease = employedDates.includes(today);

      let nearestAvailableDate;

      if (isOnLease) {
        [nearestAvailableDate] = availableDates;
      } else {
        nearestAvailableDate =
          employedDates[0] ||
          availableDates[availableDates.length - 1];
      }

      if (nearestAvailableDate) {
        const { start } = dates.formatedDate({
          start: nearestAvailableDate,
        });
        nearestAvailableDate = start;
      }

      return {
        isOnLease,
        nearestAvailableDate,
      };
    }),
  ),
)(ProductScreenView);
