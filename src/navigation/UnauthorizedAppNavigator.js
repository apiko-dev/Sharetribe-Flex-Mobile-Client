import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import AuthScreen from '../screens/Auth/AuthScreenContainer';

export default createStackNavigator(
  {
    [screens.Auth]: AuthScreen,
  },
  {
    initialRouteKey: screens.Auth,
  },
);
