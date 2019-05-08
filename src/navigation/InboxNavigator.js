import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { InboxScreen, ChatScreen, ProductScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Inbox]: InboxScreen,
    [screens.Chat]: ChatScreen,
    [screens.Product]: ProductScreen,
  },
  {
    initialRouteKey: screens.Inbox,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
