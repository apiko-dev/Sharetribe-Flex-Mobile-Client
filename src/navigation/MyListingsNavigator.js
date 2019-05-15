import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  MyListingsScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
  CalendarScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.MyListings]: MyListingsScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Calendar]: CalendarScreen,
  },
  {
    initialRouteKey: screens.MyListings,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
