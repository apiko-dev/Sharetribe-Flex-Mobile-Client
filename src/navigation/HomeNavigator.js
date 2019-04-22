import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  HomeScreen,
  UpdatePasswordScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
  VerifyEmailScreen,
  GalleryScreen,
  RequestToRentScreen,
  CalendarScreen,
  HelpScreen,
  RequestToRentPaymentScreen,
  PayoutPreferencesScreen,
  CardListScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.CardList]: CardListScreen,
    [screens.PayoutPreferences]: PayoutPreferencesScreen,
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.VerifyEmail]: VerifyEmailScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.RequestToRent]: RequestToRentScreen,
    [screens.RequestToRentPayment]: RequestToRentPaymentScreen,
    [screens.Calendar]: CalendarScreen,
    [screens.Help]: HelpScreen,
  },
  {
    initialRouteKey: screens.Home,
    defaultNavigationOptions,
  },
);
