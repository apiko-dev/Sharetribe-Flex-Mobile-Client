import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import HomeNavigator from './HomeNavigator';

export default createStackNavigator({
  [screens.Home]: HomeNavigator,
}, {
  initialRouteKey: screens.Home,
});