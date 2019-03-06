import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TabView, SceneMap } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import s from './styles';
import { TextTouchable, Logo, Text } from '../../components';
import { SignInForm, SignUpForm } from './components';
import { isSmallDevice, isLargeDevice } from '../../utils';
import i18n from '../../i18n';

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();

const AuthScreen = ({
  tabIndex,
  tabRoutes,
  onChangeTabIndex,
  onSkip,
}) => (
  <KeyboardAwareScrollView
    contentContainerStyle={s.container}
    extraHeight={200}
    enableOnAndroid
    bounces={false}
  >
    <SafeAreaView style={s.containerSafeAreaView}>
      <View style={s.circle} />
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
          white
        >
          {i18n.t('auth.heading')}
        </Text>
      </View>
      <View style={s.tabViewContainer}>
        <TabView
          swipeEnabled={false}
          navigationState={{
            index: tabIndex,
            routes: tabRoutes,
          }}
          renderScene={SceneMap({
            signIn: SignInForm,
            signUp: SignUpForm,
          })}
          onIndexChange={(index) => onChangeTabIndex(index)}
          renderTabBar={() => null}
          style={s.tabView}
        />
      </View>
      <View style={s.bottom}>
        <TextTouchable
          alignCenter
          textStyle={s.toUpperCase}
          onPress={onSkip}
        >
          {i18n.t('auth.skip')}
        </TextTouchable>
      </View>
    </SafeAreaView>
  </KeyboardAwareScrollView>
);

AuthScreen.propTypes = {
  tabIndex: T.number.isRequired,
  onChangeTabIndex: T.func.isRequired,
  tabRoutes: T.array.isRequired,
  onSkip: T.func,
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
