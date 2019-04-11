import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { AuthScreen } from '../screens';

export default createStackNavigator(
  {
    [screens.Auth]: AuthScreen,
  },
  {
    initialRouteKey: screens.Auth,
    headerMode: 'screen',
  },
);
