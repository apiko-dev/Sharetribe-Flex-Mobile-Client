import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { HomeScreen, UpdatePasswordScreen } from '../screens'; // eslint-disable-line
import { colors } from '../styles';
import { HeaderBackButton } from '../components';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
  },
  {
    initialRouteKey: screens.Home,
    defaultNavigationOptions: {
      headerTintColor: colors.header.tintColor,
      headerStyle: {
        backgroundColor: colors.header.backgroundColor,
      },
      headerLeft: HeaderBackButton,
    },
    // ...HeaderOptions,
  },
);
