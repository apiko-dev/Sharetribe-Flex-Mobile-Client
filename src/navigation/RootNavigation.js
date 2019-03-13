import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { compose } from 'recompose';
import { NavigationService } from '../services';
import screens from './screens';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import EmptyScreen from '../screens/Empty/EmptyScreen';

const Navigator = createSwitchNavigator(
  {
    [screens.Init]: EmptyScreen,
    [screens.Auth]: AuthNavigator,
    [screens.App]: AppNavigator,
  },
  {
    initialRouteName: screens.Init,
  },
);

const RootNavigator = createAppContainer(Navigator);

const RootNavigatorContainer = () => (
  <RootNavigator ref={(ref) => NavigationService.init(ref)} />
);

const enhance = compose();

export default enhance(RootNavigatorContainer);
