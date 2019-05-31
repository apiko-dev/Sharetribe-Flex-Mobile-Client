import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { RentalsScreen, ProductScreen, ChatScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Rentals]: RentalsScreen,
    [screens.Product]: ProductScreen,
    [screens.Chat]: ChatScreen,
  },
  {
    initialRouteKey: screens.Rentals,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
