import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import AuthNavigator from './AuthNavigator';

export default createStackNavigator({
  [screens.Auth]: AuthNavigator,
}, {
  initialRouteKey: screens.Auth,
});