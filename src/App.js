/* global __DEV__ */
import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react/native';
import { lifecycle } from 'recompose';
import RootNavigation from './navigation/RootNavigation';
import createStore from './stores/stores';
import {
  SharetribeFlexService,
  NavigationService,
  SentryIoService,
  StripeService,
} from './services';
import { colors } from './styles';

const store = createStore();

if (__DEV__) {
  SplashScreen.hide();
  // eslint-disable-next-line global-require
  const Reactotron = require('./ReactotronConfig').default;
  Reactotron.trackMstNode(store);
  /*   SentryIoService.setOptions({
    environment: 'development',
  }); */
} else {
  SentryIoService.setOptions({
    environment: 'production',
  });
  SentryIoService.init();
}

const InitApp = () => (
  <Provider {...store}>
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusBar.backgroundColor}
      />
      <RootNavigation />
    </React.Fragment>
  </Provider>
);

const enhancer = lifecycle({
  async componentDidMount() {
    NavigationService.initDeepLinking();
    SharetribeFlexService.init();
    StripeService.init();
    await store.bootstrap();
    SplashScreen.hide();
  },
});

export default enhancer(InitApp);
