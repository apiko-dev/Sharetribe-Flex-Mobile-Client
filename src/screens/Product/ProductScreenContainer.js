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
import call from 'react-native-phone-call';
import ProductScreenView from './ProductScreenView';
import { withParamsToProps } from '../../utils/enhancers';

import { NavigationService, AlertService } from '../../services';

import { dates } from '../../utils';
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
          availableDates: props.availableDates,
        });
      },

      navigationToCalendar: (props) => () => {
        props.navigation.navigate(screens.Calendar, {
          product: props.product,
          availableDates: props.availableDates,
        });
      },

      onCall: (props) => () => {
        const args = {
          number: props.phoneNumber,
          prompt: false,
        };

        call(args).catch(console.error);
      },
      // onSend: ({ product }) => async () => {
      //   NavigationService.navigateToChat({ product });
      //   // NavigationService.navigateToChat();
      //   // try {
      //   //   await props.product.messageTransaction.run(
      //   //     props.product.id,
      //   //   );
      //   //   debugger;
      //   //   const g = props.product.transactionId;
      //   // } catch (err) {
      //   //   debugger;
      //   // }
      // },
      // fakeMessage: (props) => async () => {
      //   const data = {
      //     transactionId: '5cb885d1-734b-44c7-ad5e-ae9f4f5eefa1',
      //     content: 'this is a TEST message ',
      //   };

      //   try {
      //     await props.product.sendMessage.run(
      //       // data.transactionId,
      //       props.product.transactionId,
      //       data.content,
      //     );
      //     debugger;
      //   } catch (err) {
      //     debugger;
      //   }
      //   // //////
      //   // const data = {
      //   //   transactionId: '5cb885d1-734b-44c7-ad5e-ae9f4f5eefa1',
      //   // };
      //   // try {
      //   //   await props.product.fetchMessage.run(data.transactionId);
      //   //   debugger;
      //   // } catch (err) {
      //   //   debugger;
      //   // }
      // },
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
