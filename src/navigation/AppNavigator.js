import { createDrawerNavigator } from 'react-navigation';
import screens from './screens';
import { Drawer } from '../components';
import HomeNavigator from './HomeNavigator';
import MyListingsNavigator from './MyListingsNavigator';
import SettingsNavigator from './SettingsNavigator';
import ProfileNavigator from './ProfileNavigator';
import InboxNavigator from './InboxNavigator';
import RentalsNavigator from './RentalsNavigator';

export default createDrawerNavigator(
  {
    [screens.HomeStack]: HomeNavigator,
    [screens.MyListingsStack]: MyListingsNavigator,
    [screens.ProfileStack]: ProfileNavigator,
    [screens.SettingsStack]: SettingsNavigator,
    [screens.InboxStack]: InboxNavigator,
    [screens.RentalsStack]: RentalsNavigator,
  },
  {
    initialRouteName: screens.HomeStack,
    contentComponent: Drawer,
    drawerWidth: 300,
    headerMode: 'screen',
  },
);
