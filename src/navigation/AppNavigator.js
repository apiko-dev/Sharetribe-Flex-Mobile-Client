import { createDrawerNavigator } from 'react-navigation';
import screens from './screens';
// import AppNavigator from './MainNavigator';
import { Drawer } from '../components';
import HomeNavigator from './HomeNavigator';
import MyListingsNavigator from './MyListingsNavigator';

export default createDrawerNavigator(
  {
    // [screens.Main]: AppNavigator,
    [screens.Home]: HomeNavigator,
    [screens.MyListings]: MyListingsNavigator,
  },
  {
    initialRouteName: screens.Home,
    contentComponent: Drawer,
    drawerWidth: 300,
  },
);
