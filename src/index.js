import React from 'react';
import { Provider } from 'mobx-react/native';
import RootNavigation from './navigation/RootNavigation';
import store from './stores';

const InitApp = () => (
  <Provider store={store}>
    <RootNavigation />
  </Provider>
);

export default InitApp;