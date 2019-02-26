import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/RootNavigation';

const AppContainer = createAppContainer(AppNavigator);

const InitApp = () => (
  <AppContainer />
);

export default InitApp;