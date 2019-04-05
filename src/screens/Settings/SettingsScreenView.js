/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import T from 'prop-types';
import s from './styles';
import {
  DrawerButton,
  Text,
  FormContainer,
  Button,
  Avatar,
  FormInput,
  Form,
} from '../../components';
import { EmailVerifiedMessage } from './components';
import i18n from '../../i18n';
import { colors } from '../../styles';
import { ProfileSchema } from '../../validators/schemes';

const SettingsScreen = ({
  goToMyProfile,
  resendVerificationEmail,
  onSave,
  addPhoto,
  user,
  isUpdatingProfile,
  isChangingEmail,
  isChangingPassword,
  formRef,
}) => (
  <SafeAreaView>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
    >
      <View style={s.container}>
        <Form
          validationSchema={ProfileSchema}
          ref={formRef}
          initialValues={{
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            bio: user.profile.bio,
            email: user.email,
            phone:
              user.profile.protectedData &&
              user.profile.protectedData.phoneNumber,
          }}
          onSubmit={onSave}
        >
          {({ handleSubmit, handleReset }) => (
            <React.Fragment>
              <FormContainer
                headerTitle={i18n.t('settings.profileSettings')}
                headerTitleTextTouchable={i18n.t(
                  'settings.myProfile',
                )}
                headerOnPressTextTouchable={goToMyProfile}
              >
                <View style={s.avatarContainer}>
                  <View style={s.avatar}>
                    <Avatar
                      user={user}
                      large
                      canChange
                      onPressChange={() => {
                        this.actionSheetRefAvatar.show();
                      }}
                    />
                  </View>
                  <View style={s.tipContainer}>
                    <Text style={s.tip} gray xxsmallSize>
                      {i18n.t('settings.tip')}
                    </Text>
                    <Text gray xxsmallSize>
                      {i18n.t('settings.formatSuggestion')}
                    </Text>
                  </View>
                </View>

                <View style={s.inputContainerFirstAndLastNames}>
                  <FormInput.Field
                    placeholder={i18n.t('settings.firstName')}
                    containerStyle={s.inputLeft}
                    name="firstName"
                  />
                  <FormInput.Field
                    placeholder={i18n.t('settings.lastName')}
                    containerStyle={s.inputRight}
                    name="lastName"
                  />
                </View>
                <FormInput.Field
                  containerStyle={s.bioInputContainer}
                  inputContainerStyle={s.bioInputContainer}
                  labelStyle={s.bioLabel}
                  inputStyle={s.bioInput}
                  placeholder={i18n.t('settings.bio')}
                  name="bio"
                  multiline
                  maxLength={1200}
                />
              </FormContainer>

              <FormContainer
                headerTitle={i18n.t('settings.contactDetails')}
              >
                <FormInput.Field
                  placeholder={i18n.t('settings.currentPassword')}
                  containerStyle={s.inputContainer}
                  name="currentPasswordForEmail"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <View style={s.inputContainer}>
                  <FormInput.Field
                    placeholder={i18n.t('settings.email')}
                    name="email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {!user.emailVerified && (
                    <EmailVerifiedMessage
                      resendVerificationEmail={
                        resendVerificationEmail
                      }
                    />
                  )}
                </View>

                <FormInput.Field
                  placeholder={i18n.t('settings.phoneNumber')}
                  name="phone"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </FormContainer>

              <FormContainer
                headerTitle={i18n.t('settings.passwordSettings')}
              >
                <FormInput.Field
                  placeholder={i18n.t('settings.currentPassword')}
                  containerStyle={s.inputContainer}
                  name="currentPassword"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <FormInput.Field
                  placeholder={i18n.t('settings.newPassword')}
                  containerStyle={s.inputContainer}
                  name="newPassword"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <FormInput.Field
                  placeholder={i18n.t('settings.retypeNewPassword')}
                  name="replyPassword"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </FormContainer>

              <View style={s.footer}>
                <Button
                  containerStyle={s.buttonContainer}
                  title={i18n.t('common.cancel')}
                  onPress={handleReset}
                />
                <Button
                  containerStyle={s.buttonContainer}
                  title={i18n.t('common.save')}
                  primary
                  onPress={handleSubmit}
                  isLoading={
                    isUpdatingProfile ||
                    isChangingEmail ||
                    isChangingPassword
                  }
                  disabled={
                    isUpdatingProfile ||
                    isChangingEmail ||
                    isChangingPassword
                  }
                />
              </View>
            </React.Fragment>
          )}
        </Form>
      </View>
    </KeyboardAwareScrollView>
    <ActionSheet
      ref={(ref) => {
        this.actionSheetRefAvatar = ref;
      }}
      title={i18n.t('common.select')}
      message={i18n.t(
        'settings.choosePhotosFromLibraryOrMakeNewPhoto',
      )}
      tintColor={colors.settingsScreen.actionSheetTintColor}
      options={[
        i18n.t('settings.choosePhotosFromLibrary'),
        i18n.t('settings.makeNewPhoto'),
        i18n.t('common.cancel'),
      ]}
      onPress={(index) => {
        setTimeout(() => addPhoto(index), 500);
      }}
      cancelButtonIndex={2}
    />
  </SafeAreaView>
);

SettingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('settings.settings'),
});

SettingsScreen.propTypes = {
  goToMyProfile: T.func,
  resendVerificationEmail: T.func,
  onSave: T.func,
  addPhoto: T.func,
  user: T.object,
  isUpdatingProfile: T.bool,
  isChangingEmail: T.bool,
  isChangingPassword: T.bool,
  formRef: T.any,
};

export default SettingsScreen;
