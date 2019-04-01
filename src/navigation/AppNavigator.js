import { createDrawerNavigator } from 'react-navigation';
import screens from './screens';
// import AppNavigator from './MainNavigator';
import { Drawer } from '../components';
import HomeNavigator from './HomeNavigator';
import MyListingsNavigator from './MyListingsNavigator';
import SettingsNavigator from './SettingsNavigator';

export default createDrawerNavigator(
  {
    // [screens.Main]: AppNavigator,
    [screens.Home]: HomeNavigator,
    [screens.MyListings]: MyListingsNavigator,
    [screens.Settings]: SettingsNavigator,
  },
  {
    initialRouteName: screens.Settings,
    contentComponent: Drawer,
    drawerWidth: 300,
  },
);
