import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { HomeScreen, UpdatePasswordScreen, AddNewItemScreen, CategoryScreen } from '../screens'; // eslint-disable-line
import { colors } from '../styles';
import { HeaderBackButton } from '../components';

export default createStackNavigator(
  {
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.Category]: CategoryScreen,
  },
  {
    initialRouteKey: screens.AddNewItemScreen,
    defaultNavigationOptions: {
      headerTintColor: colors.header.tintColor,
      headerStyle: {
        backgroundColor: colors.header.backgroundColor,
      },
      headerLeft: HeaderBackButton,
    },
  },
);
