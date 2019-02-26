import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import HomeScreenContainer from '../screens/Home/HomeScreenContainer';

export default createStackNavigator({
  [screens.Home]: HomeScreenContainer,
}, {
  initialRouteKey: screens.Home,
});