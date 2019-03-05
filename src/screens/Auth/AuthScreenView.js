import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TabView, SceneMap } from 'react-native-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import s from './styles';
import { TextTouchable, Logo } from '../../components';
import { SignInForm, SignUpForm } from './components';
import { isSmallDevice, isLargeDevice } from '../../utils';

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();

const AuthScreen = ({ tabIndex, tabRoutes, onChangeTabIndex }) => (
  <SafeAreaView style={s.containerSafeAreaView}>
    <KeyboardAwareScrollView
      contentContainerStyle={s.container}
      extraHeight={200}
      scrollEnabled={false}
      enableOnAndroid
    >
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
            !smallDevice && !largeDevice && s.headingMedium,
          ]}
        >
          Mobile rent service
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
        <TextTouchable alignCenter>SKIP</TextTouchable>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

AuthScreen.propTypes = {
  tabIndex: T.number.isRequired,
  onChangeTabIndex: T.func.isRequired,
  tabRoutes: T.array.isRequired,
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
