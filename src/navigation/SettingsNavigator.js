import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { SettingsScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Settings]: SettingsScreen,
  },
  {
    initialRouteKey: screens.Settings,
    defaultNavigationOptions,
  },
);
