import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react/native';
import { lifecycle } from 'recompose';
import RootNavigation from './navigation/RootNavigation';
import createStore from './stores';
import { SharetribeFlexService, NavigationService } from './services';
import { colors } from './styles';

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
  },
});

export default enhancer(InitApp);
