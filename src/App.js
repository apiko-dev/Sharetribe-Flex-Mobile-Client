/* global __DEV__ */
import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react/native';
import { lifecycle } from 'recompose';
import { Sentry, SentryLog } from 'react-native-sentry';
import RootNavigation from './navigation/RootNavigation';
import createStore from './stores/stores';
import {
  SharetribeFlexService,
  NavigationService,
  SentryIoService,
} from './services';
import { colors } from './styles';

if (__DEV__) {
  SplashScreen.hide();
  SentryIoService.setOptions({
    environment: 'development',
    deactivateStacktraceMerging: false,
    logLevel: SentryLog.Verbose,
    disableNativeIntegration: false,
    handlePromiseRejection: true,
  });
  console.log('dev');
} else {
  SentryIoService.setOptions({ environment: 'production' });
}

const store = createStore();

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
    await store.bootstrap();
    SplashScreen.hide();
    SentryIoService.init();

    Sentry.captureException(new Error('Oops! Fake error'), {
      logger: 'my.module',
    });
  },
});

export default enhancer(InitApp);
