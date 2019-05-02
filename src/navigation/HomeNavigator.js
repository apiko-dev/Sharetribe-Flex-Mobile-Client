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
  ProfileScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.VerifyEmail]: VerifyEmailScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Profile]: ProfileScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.RequestToRent]: RequestToRentScreen,
    [screens.Calendar]: CalendarScreen,
    [screens.RequestToRentPayment]: RequestToRentPaymentScreen,
    [screens.CardList]: CardListScreen,
    [screens.Help]: HelpScreen,
    [screens.PayoutPreferences]: PayoutPreferencesScreen,
  },
  {
    initialRouteKey: screens.Home,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
