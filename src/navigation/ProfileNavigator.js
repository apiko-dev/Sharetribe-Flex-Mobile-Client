import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { ProductScreen, ProfileScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Profile]: ProfileScreen,
    [screens.Product]: ProductScreen,
  },
  {
    initialRouteKey: screens.Profile,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
