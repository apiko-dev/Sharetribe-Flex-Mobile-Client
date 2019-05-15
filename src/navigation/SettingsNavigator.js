import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  SettingsScreen,
  ProfileScreen,
  ProductScreen,
  GalleryScreen,
  CalendarScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Settings]: SettingsScreen,
    [screens.Product]: ProductScreen,
    [screens.Profile]: ProfileScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.Calendar]: CalendarScreen,
  },
  {
    initialRouteKey: screens.Settings,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
 