import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import HomeScreen from '../screens/Home/HomeScreenContainer';

export default createStackNavigator({
  [screens.Home]: HomeScreen,
}, {
  initialRouteKey: screens.Home,
});