import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  ProductScreen,
  ProfileScreen,
  GalleryScreen,
  CalendarScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Profile]: ProfileScreen,
    [screens.Product]: ProductScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.Calendar]: CalendarScreen,
  },
  {
    initialRouteKey: screens.Profile,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
