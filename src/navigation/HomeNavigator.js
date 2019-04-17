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
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
    [screens.Calendar]: CalendarScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.VerifyEmail]: VerifyEmailScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.RequestToRent]: RequestToRentScreen,
  },
  {
    initialRouteKey: screens.Home,
    defaultNavigationOptions,
  },
);
