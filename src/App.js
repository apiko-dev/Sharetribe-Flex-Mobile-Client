import React from 'react';
import { Provider } from 'mobx-react/native';
import { lifecycle } from 'recompose';
import RootNavigation from './navigation/RootNavigation';
import createStore from './stores';

const store = createStore();

const InitApp = () => (
  <Provider {...store}>
    <RootNavigation />
  </Provider>
);

const enhancer = lifecycle({
  async componentDidMount() {
    await store.bootstrap();
  },
});

export default enhancer(InitApp);
