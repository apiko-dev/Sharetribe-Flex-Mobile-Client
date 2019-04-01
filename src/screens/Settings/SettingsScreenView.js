import React from 'react';
import { View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import { Formik } from 'formik';
import s from './styles';
import {
  DrawerButton,
  Text,
  FormContainer,
  InputForm,
  Button,
} from '../../components';
import {
  EmailVerifiedMessage,
  ChangeAvatarButton,
} from './components';
import i18n from '../../i18n';
import IconAppLogo from '../../assets/png/icon-app-logo.png';

const SettingsScreen = ({
  goToMyProfile,
  resendVerificationEmail,
  emailVerified = false,
}) => (
  <SafeAreaView>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
    >
      <View style={s.container}>
        <Formik>
          {({ values, handleChange }) => (
            <React.Fragment>
              <FormContainer
                headerTitle={i18n.t('settings.profileSettings')}
                headerTitleTextTouchable={i18n.t(
                  'settings.myProfile',
                )}
                headerOnPressTextTouchable={goToMyProfile}
              >
                <View style={s.avatarContainer}>
                  {/* TODO: Use avatar component */}
                  <View style={s.avatar}>
                    <ImageBackground
                      source={IconAppLogo}
                      style={s.logoImageBackground}
                      imageStyle={s.logoBackground}
                    >
                      <ChangeAvatarButton />
                    </ImageBackground>
                  </View>
                  <View style={s.tipContainer}>
                    <Text style={s.tip} gray>
                      {i18n.t('settings.tip')}
                    </Text>
                    <Text gray>
                      {i18n.t('settings.formatSuggestion')}
                    </Text>
                  </View>
                </View>

                <View style={s.inputContainerFirstAndLastNames}>
                  <InputForm
                    placeholder={i18n.t('settings.firstName')}
                    containerStyle={s.inputLeft}
                    value={values.firstName || ''}
                    // active={activeField === 'firstName'}
                    // onFocus={() => onChange('activeField', 'firstName')}
                    // onBlur={() => onChange('activeField', '')}
                    onChangeText={handleChange('firstName')}
                  />
                  <InputForm
                    placeholder={i18n.t('settings.lastName')}
                    containerStyle={s.inputRight}
                    value={values.lastName || ''}
                    // active={activeField === 'lastName'}
                    // onFocus={() => onChange('activeField', 'lastName')}
                    // onBlur={() => onChange('activeField', '')}
                    onChangeText={handleChange('lastName')}
                  />
                </View>
                <InputForm
                  containerStyle={s.bioInputContainer}
                  labelStyle={s.bioLabel}
                  inputStyle={s.bioInput}
                  placeholder={i18n.t('settings.bio')}
                  value={values.bio || ''}
                  // active={activeField === 'description'}
                  // onFocus={() => onChange('activeField', 'description')}
                  // onBlur={() => onChange('activeField', '')}
                  onChangeText={handleChange('bio')}
                  multiline
                />
              </FormContainer>

              <FormContainer
                headerTitle={i18n.t('settings.contactDetails')}
              >
                <View style={s.inputContainer}>
                  <InputForm
                    placeholder={i18n.t('settings.email')}
                    value={values.email || ''}
                    // active={activeField === 'email'}
                    // onFocus={() => onChange('activeField', 'email')}
                    // onBlur={() => onChange('activeField', '')}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {!emailVerified && (
                    <EmailVerifiedMessage
                      resendVerificationEmail={
                        resendVerificationEmail
                      }
                    />
                  )}
                </View>

                <InputForm
                  placeholder={i18n.t('settings.phoneNumber')}
                  value={values.phone || ''}
                  // active={activeField === 'password'}
                  // onFocus={() => onChange('activeField', 'password')}
                  // onBlur={() => onChange('activeField', '')}
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </FormContainer>

              <FormContainer
                headerTitle={i18n.t('settings.passwordSettings')}
              >
                <InputForm
                  placeholder={i18n.t('settings.newPassword')}
                  containerStyle={s.inputContainer}
                  value={values.newPassword || ''}
                  // onFocus={() => onChange('activeField', 'newPassword')}
                  // onBlur={() => onChange('activeField', '')}
                  onChangeText={handleChange('newPassword')}
                  // active={activeField === 'newPassword'}
                  secureTextEntry
                  autoCapitalize="none"
                />
                <InputForm
                  placeholder={i18n.t('settings.retypeNewPassword')}
                  value={values.replyPassword || ''}
                  // onFocus={() => onChange('activeField', 'replyPassword')}
                  // onBlur={() => onChange('activeField', '')}
                  onChangeText={handleChange('replyPassword')}
                  // active={activeField === 'replyPassword'}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </FormContainer>

              <View style={s.footer}>
                <Button
                  containerStyle={s.buttonContainer}
                  title={i18n.t('common.cancel')}
                />
                <Button
                  containerStyle={s.buttonContainer}
                  title={i18n.t('common.save')}
                  primary
                />
              </View>
            </React.Fragment>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

SettingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('settings.settings'),
});

SettingsScreen.propTypes = {
  goToMyProfile: T.func,
  resendVerificationEmail: T.func,
  emailVerified: T.bool,
};

export default SettingsScreen;
