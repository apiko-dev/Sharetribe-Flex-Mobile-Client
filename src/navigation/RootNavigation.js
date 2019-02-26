import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { compose } from 'recompose';
import { NavigationService } from '../services';
import screens from './screens';
import AuthorizedAppNavigator from './AuthorizedAppNavigator';
import UnauthorizedAppNavigator from './UnauthorizedAppNavigator';

const AppNavigator = createSwitchNavigator({
  [screens.AuthorizedApp]: AuthorizedAppNavigator,
  [screens.UnauthorizedApp]: UnauthorizedAppNavigator,
}, {
  initialRouteName: screens.UnauthorizedApp,
});

const RootNavigator = createAppContainer(AppNavigator);

const RootNavigatorContainer = () => <RootNavigator ref={ref => NavigationService.init(ref)} />;

const enhance = compose();

export default enhance(RootNavigatorContainer);