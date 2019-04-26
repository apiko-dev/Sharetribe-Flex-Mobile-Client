import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import { InboxScreen, ChatScreen } from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Inbox]: InboxScreen,
    [screens.Chat]: ChatScreen,
  },
  {
    initialRouteKey: screens.Inbox,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
