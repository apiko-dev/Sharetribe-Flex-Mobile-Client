import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TabView } from 'react-native-tab-view';
import T from 'prop-types';
import s from './styles';
import {
  SignInForm,
  SignUpForm,
  TextTouchable,
} from '../../components';
import logoWhite from '../../assets/logo_white.png';
import screens from '../../navigation/screens';

const AuthScreen = ({
  tabIndex,
  tabRoutes,
  onChangeTabIndex,
  emailSignIn,
  emailSignUp,
  passwordSignIn,
  passwordSignUp,
  firstName,
  lastName,
  onChange,
  activeField,
}) => (
  <SafeAreaView style={s.container}>
    <View style={s.circle} />
    <Image source={logoWhite} style={s.logo} />
    <View>
      <Text style={s.heading}>Mobile rent service</Text>
    </View>
    <View style={s.tabViewContainer}>
      <TabView
        swipeEnabled={false}
        navigationState={{
          index: tabIndex,
          routes: tabRoutes,
        }}
        renderScene={({ route, jumpTo }) => {
          if (route.key === screens.TabViews.Auth.SingIn) {
            return (
              <SignInForm
                jumpTo={() => jumpTo(screens.TabViews.Auth.SingUp)}
                emailSignIn={emailSignIn}
                passwordSignIn={passwordSignIn}
                onChange={onChange}
                activeField={activeField}
              />
            );
          }
          return (
            <SignUpForm
              jumpTo={() => jumpTo(screens.TabViews.Auth.SingIn)}
              onChange={onChange}
              emailSignUp={emailSignUp}
              passwordSignUp={passwordSignUp}
              firstName={firstName}
              lastName={lastName}
              activeField={activeField}
            />
          );
        }}
        onIndexChange={(index) => onChangeTabIndex(index)}
        renderTabBar={() => null}
        style={s.tabView}
      />
    </View>
    <View style={s.bottom}>
      <TextTouchable alignCenter>SKIP</TextTouchable>
    </View>
  </SafeAreaView>
);

AuthScreen.propTypes = {
  tabIndex: T.number.isRequired,
  onChangeTabIndex: T.func.isRequired,
  tabRoutes: T.func.isRequired,
  emailSignIn: T.string,
  emailSignUp: T.string,
  passwordSignIn: T.string,
  passwordSignUp: T.string,
  firstName: T.string,
  lastName: T.string,
  onChange: T.func,
  activeField: T.string,
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
