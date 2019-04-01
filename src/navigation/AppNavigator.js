import { createDrawerNavigator } from 'react-navigation';
import screens from './screens';
import { Drawer } from '../components';
import HomeNavigator from './HomeNavigator';
import MyListingsNavigator from './MyListingsNavigator';
import ProfileNavigator from './ProfileNavigator';

export default createDrawerNavigator(
  {
    [screens.HomeStack]: HomeNavigator,
    [screens.MyListingsStack]: MyListingsNavigator,
    [screens.ProfileStack]: ProfileNavigator,
  },
  {
    initialRouteName: screens.HomeStack,
    contentComponent: Drawer,
    drawerWidth: 300,
  },
);
