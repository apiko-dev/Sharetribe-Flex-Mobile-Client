/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import DevMenu from '@terrysahaidak/react-native-devmenu';
import App from './src/App';
import { name as appName } from './app.json';

const Root = () => (
  <DevMenu numberOfTouches={4}>
    <App />
  </DevMenu>
);

AppRegistry.registerComponent(appName, () => Root);
