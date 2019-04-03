import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Tab, TabView } from 'react-native-easy-tabs';
import T from 'prop-types';
import s from './styles';
import { TextTouchable, Logo, Text } from '../../components';
import { SignInForm, SignUpForm } from './components';
import { isSmallDevice, isLargeDevice, isAndroid } from '../../utils';
import i18n from '../../i18n';
import { dimensions } from '../../styles';

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();
const isAndroidDevice = isAndroid();

const AuthScreen = ({
  onChangeTabIndex,
  selectedTabIndex,
  onSkip,
}) => (
  <SafeAreaView style={s.containerSafeAreaView}>
    <View style={s.circle} />
    <ScrollView
      contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
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

      {// On Android when the keyboard is showing, this component rise up.
      // To fix it we put on Android this component here and give for it position: "absolute".
      // And instead of this component, we put empty component at the bottom.
      // We put empty component at the bottom of the screen to make space for this component.

      // "Skip" button
      isAndroidDevice && (
        <View style={s.bottomButtonAndroid}>
          <TextTouchable
            alignCenter
            textStyle={s.toUpperCase}
            onPress={onSkip}
          >
            {i18n.t('auth.skip')}
          </TextTouchable>
        </View>
      )}
      <KeyboardAvoidingView
        behavior="position"
        style={s.keyboardAvoidingView}
        contentContainerStyle={s.keyboardAvoidingViewContentContainer}
        keyboardVerticalOffset={isAndroidDevice ? -30 : -50}
      >
        <TabView
          selectedTabIndex={selectedTabIndex}
          layoutWidth={dimensions.width}
        >
          <Tab>
            <View style={s.tabViewContainer}>
              <View style={s.tabViewWrapper}>
                <SignInForm onChangeTabIndex={onChangeTabIndex} />
              </View>
            </View>
          </Tab>
          <Tab lazy>
            <View style={s.tabViewContainer}>
              <View style={s.tabViewWrapper}>
                <SignUpForm onChangeTabIndex={onChangeTabIndex} />
              </View>
            </View>
          </Tab>
        </TabView>
      </KeyboardAvoidingView>
      {isAndroidDevice ? (
        // Empty component for "Skip" button.
        <View style={s.bottom} />
      ) : (
        // On IOS everything stay without changes.
        <View style={s.bottom}>
          <TextTouchable
            alignCenter
            textStyle={s.toUpperCase}
            onPress={onSkip}
          >
            {i18n.t('auth.skip')}
          </TextTouchable>
        </View>
      )}
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
