import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { HomeScreen } from '../screens';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
  },
  {
    initialRouteKey: screens.Home,
  },
);
