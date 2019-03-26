import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  HomeScreen,
  UpdatePasswordScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
  MyListingsScreen,
} from '../screens';
import { colors } from '../styles';
import { HeaderBackButton } from '../components';

export default createStackNavigator(
  {
    [screens.MyListings]: MyListingsScreen,

    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
  },
  {
    initialRouteKey: screens.MyListings,
    defaultNavigationOptions: {
      headerTintColor: colors.header.tintColor,
      headerStyle: {
        backgroundColor: colors.header.backgroundColor,
        elevation: 0,
      },
      headerLeft: HeaderBackButton,
    },
  },
);
