import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  HomeScreen,
  UpdatePasswordScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
  GalleryScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Gallery]: GalleryScreen,
  },
  {
    initialRouteKey: screens.Home,
    defaultNavigationOptions,
  },
);
