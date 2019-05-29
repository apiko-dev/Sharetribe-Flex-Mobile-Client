import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { RentalsScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Rentals]: RentalsScreen,
  },
  {
    initialRouteKey: screens.RentalsStack,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
