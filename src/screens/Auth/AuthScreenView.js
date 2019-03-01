import React from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import T from 'prop-types';
import s from './styles';
import { SignInForm, SignUpForm } from '../../components';

const AuthScreen = ({ tabIndex, tabRoutes, onChangeTabIndex }) => (
  <TabView
    navigationState={{
      index: tabIndex,
      routes: tabRoutes,
    }}
    renderScene={SceneMap({
      signIn: SignInForm,
      signUp: SignUpForm,
    })}
    onIndexChange={(index) => onChangeTabIndex(index)}
  />
);

AuthScreen.propTypes = {
  tabIndex: T.number.isRequired,
  onChangeTabIndex: T.func.isRequired,
  tabRoutes: T.func.isRequired,
};

AuthScreen.navigationOptions = () => ({
  title: 'Auth',
});

export default AuthScreen;
