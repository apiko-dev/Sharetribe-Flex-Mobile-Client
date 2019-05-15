import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  InboxScreen,
  ChatScreen,
  ProductScreen,
  RequestToRentPaymentScreen,
  PayoutPreferencesScreen,
  RequestToRentScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Inbox]: InboxScreen,
    [screens.Chat]: ChatScreen,
    [screens.Product]: ProductScreen,
    [screens.RequestToRent]: RequestToRentScreen,
    [screens.RequestToRentPayment]: RequestToRentPaymentScreen,
    [screens.PayoutPreferences]: PayoutPreferencesScreen,
  },
  {
    initialRouteKey: screens.Inbox,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
