import {
  compose,
  hoistStatics,
  withProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import XDate from 'xdate';
import { inject } from 'mobx-react/native';
import call from 'react-native-phone-call';
import R from 'ramda';
import CalendarScreenView from './CalendarScreenView';
import { withParamsToProps } from '../../utils/enhancers';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    withParamsToProps('product'),

    inject((stores, { product }) => ({
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

    withHandlers({
      navigationToRequestToRent: (props) => () => {
        props.navigation.navigate(screens.RequestToRent, {
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

    withProps(() => {
      const today = new XDate();

      return {
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear(),
        day: today.getDay(),
      };
    }),

    withPropsOnChange('product', (props) => ({
      isOwner: props.product.canEdit,
    })),
  ),
)(CalendarScreenView);
