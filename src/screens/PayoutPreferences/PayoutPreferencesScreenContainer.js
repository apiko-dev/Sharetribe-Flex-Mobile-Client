import React from 'react';
import {
  compose,
  hoistStatics,
  withHandlers,
  defaultProps,
  withProps,
} from 'recompose';
import { inject } from 'mobx-react';
import { NavigationService, AlertService } from '../../services';
import PayoutPreferencesScreenView from './PayoutPreferencesScreenView';
import i18n from '../../i18n';
import screens from '../../navigation/screens';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
    })),

    defaultProps({
      formRef: React.createRef(),
    }),

    withHandlers({
      goToCreditCardList: () => () =>
        NavigationService.navigateTo(screens.CardList),

      resendVerificationEmail: ({ sendVerifyEmail }) => async () => {
        try {
          await sendVerifyEmail.run();

          AlertService.showAlert(
            i18n.t('settings.verifyEmail'),
            i18n.t('settings.verifyEmailSent'),
          );
        } catch (error) {
          AlertService.showSomethingWentWrong();
        }
      },

      updateProfile: ({ updateProfile, formRef }) => async (data) => {
        try {
          await updateProfile.run({ ...data });
        } catch (err) {
          if (err.fields && err.fields.includes('phone')) {
            formRef.current.form.setFieldError(
              'phone',
              i18n.t('errors.incorrectPhone'),
            );
          }
        }
      },

      changeEmail: ({ changeEmail, formRef }) => async (data) => {
        try {
          await changeEmail.run({ ...data });
        } catch (err) {
          if (err.fields && err.fields.includes('email')) {
            formRef.current.form.setFieldError(
              'email',
              i18n.t('errors.incorrectEmail'),
            );
          }

          if (err.status === 403) {
            formRef.current.form.setFieldError(
              'currentPasswordForEmail',
              i18n.t('errors.incorrectPassword'),
            );
          } else {
            AlertService.showSomethingWentWrong();
          }
        }
      },

      changePassword: ({ changePassword, formRef }) => async (
        data,
      ) => {
        try {
          await changePassword.run({ ...data });
        } catch (err) {
          if (err.status === 403) {
            formRef.current.form.setFieldError(
              'currentPassword',
              i18n.t('errors.incorrectPassword'),
            );
          } else {
            AlertService.showSomethingWentWrong();
          }
        }
      },
    }),

    withHandlers({
      filter: () => (arr = [], value) => {
        return arr.filter((item) =>
          value
            ? item.toLowerCase().includes(value.toLowerCase())
            : true,
        );
      },

      onSave: ({
        user,
        updateProfile,
        changeEmail,
        changePassword,
      }) => async (data) => {
        if (
          data.firstName !== user.profile.firstName ||
          data.lastName !== user.profile.lastName ||
          data.bio !== user.profile.bio ||
          data.phone !== user.profile.publicData.phoneNumber
        ) {
          updateProfile(data);
        }

        if (data.email !== user.email) {
          changeEmail(data);
        }

        if (
          data.currentPassword &&
          data.newPassword &&
          data.replyPassword &&
          data.newPassword === data.replyPassword
        ) {
          changePassword(data);
        }
      },
    }),

    withProps(
      ({
        user,
        isUpdatingProfile,
        isChangingEmail,
        isChangingPassword,
        ...props
      }) => {
        const initialValues = {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
        };

        console.log('props: ', props);

        const isLoading =
          isUpdatingProfile || isChangingEmail || isChangingPassword;

        return {
          initialValues,
          isLoading,
        };
      },
    ),
  ),
)(PayoutPreferencesScreenView);
