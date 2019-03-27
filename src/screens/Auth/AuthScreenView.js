/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import s from './styles';
import {
  TextTouchable,
  Logo,
  Text,
  TabContainer,
} from '../../components';
import { SignInForm, SignUpForm } from './components';
import { isSmallDevice, isLargeDevice } from '../../utils';
import i18n from '../../i18n';

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();

const AuthScreen = ({
  onChangeTabIndex,
  selectedTabIndex,
  onSkip,
}) => (
  <SafeAreaView style={s.containerSafeAreaView}>
    <View style={s.circle} />
    <ScrollView contentContainerStyle={s.container}>
      <Logo
        size={
          (smallDevice && 'small') ||
          (largeDevice && 'large') ||
          'medium'
        }
      />
      <View>
        <Text
          style={[
            s.heading,
            smallDevice && s.headingSmall,
            largeDevice && s.headingLarge,
          ]}
          xlargeSize={!smallDevice}
          mediumSize={smallDevice}
          white
        >
          {i18n.t('auth.heading')}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior="height"
        style={s.tabViewContainer}
        contentContainerStyle={s.tabViewWrapper}
        enabled
        keyboardVerticalOffset={30}
      >
        <TabContainer
          tabIndex={0}
          selectedTabIndex={selectedTabIndex}
        >
          <SignInForm onChangeTabIndex={onChangeTabIndex} />
        </TabContainer>
        <TabContainer
          tabIndex={1}
          selectedTabIndex={selectedTabIndex}
          lazy
        >
          <SignUpForm onChangeTabIndex={onChangeTabIndex} />
        </TabContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>
);

AuthScreen.propTypes = {
  onChangeTabIndex: T.func.isRequired,
  selectedTabIndex: T.number,
  onSkip: T.func,
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
