import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  MyListingsScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.MyListings]: MyListingsScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
  },
  {
    initialRouteKey: screens.MyListings,
    defaultNavigationOptions,
  },
);
