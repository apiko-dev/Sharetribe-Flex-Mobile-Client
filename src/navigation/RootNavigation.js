import { createSwitchNavigator } from 'react-navigation';
import screens from './screens';
import InitScreen from '../screens/Init/InitScreen';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

export default createSwitchNavigator({
  [screens.Init]: InitScreen,
  [screens.AuthorizedApp]: HomeNavigator,
  [screens.UnauthorizedApp]: AuthNavigator,
}, {
  initialRouteName: screens.Init,
});