import React from 'react';
import {
  compose,
  hoistStatics,
  withHandlers,
  withStateHandlers,
  defaultProps,
  withProps,
} from 'recompose';
import ImagePicker from 'react-native-image-crop-picker';
import { inject } from 'mobx-react';
import {
  PermissionService,
  NavigationService,
  AlertService,
} from '../../services';
import SettingsScreenView from './SettingsScreenView';
import i18n from '../../i18n';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
      changeAvatar: viewer.changeAvatar,
      updateProfile: viewer.updateProfile,
      changeEmail: viewer.changeEmail,
      changePassword: viewer.changePassword,
      sendVerifyEmail: viewer.sendVerifyEmail,
      isUpdatingProfile: viewer.updateProfile.inProgress,
      isChangingEmail: viewer.changeEmail.inProgress,
      isChangingPassword: viewer.changePassword.inProgress,
    })),

    defaultProps({
      formRef: React.createRef(),
    }),

    withStateHandlers(
      {
        photo: {},
        activeField: '',
        errors: {},
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        addPhoto: () => (image) => ({
          photo: {
            id: Math.random(),
            uri: image.path,
            name: `image_${Math.floor(Math.random() * 100)}.jpg`,
            type: image.mime,
          },
        }),
      },
    ),

    withHandlers({
      goToMyProfile: ({ user }) => () =>
        NavigationService.navigateToProfile({
          user,
        }),

      resendVerificationEmail: ({ sendVerifyEmail }) => () => {
        sendVerifyEmail.run();
      },

      onSave: ({
        user,
        updateProfile,
        changeEmail,
        changePassword,
        ...props
      }) => async (data) => {
        console.log(data);
        if (
          data.firstName !== user.profile.firstName ||
          data.lastName !== user.profile.lastName ||
          data.bio !== user.profile.bio ||
          data.phone !== user.profile.protectedData.phoneNumber
        ) {
          try {
            await updateProfile.run({ ...data });
          } catch (err) {
            console.log('error in settings screen container, ', err);
            if (err.fields.includes('phone')) {
              props.formRef.current.form.setFieldError(
                'phone',
                i18n.t('errors.incorrectPhone'),
              );
            }

            AlertService.showSomethingWentWrong();
          }
        }

        if (
          data.email !== user.email &&
          data.currentPasswordForEmail
        ) {
          try {
            await changeEmail.run({ ...data });
          } catch (err) {
            console.log(err);
            if (err.fields.includes('email')) {
              props.formRef.current.form.setFieldError(
                'email',
                i18n.t('errors.incorrectEmail'),
              );
            }

            if (err.fields.includes('currentPassword')) {
              props.formRef.current.form.setFieldError(
                'currentPasswordForEmail',
                i18n.t('errors.incorrectPassword'),
              );
            }

            AlertService.showSomethingWentWrong();
          }
        }

        if (
          data.currentPassword &&
          data.newPassword &&
          data.replyPassword &&
          data.newPassword === data.replyPassword
        ) {
          try {
            await changePassword.run({ ...data });
          } catch (error) {
            AlertService.showSomethingWentWrong();
          }
        }
      },

      changeAvatar: (props) => () => {
        props.changeAvatar.run(props.photo);
      },

      addPhotoByCamera: (props) => async () => {
        try {
          if (await PermissionService.getCameraPermission()) {
            const image = await ImagePicker.openCamera({
              cropping: true,
            });

            props.addPhoto(image);

            props.changeAvatar.run({
              id: Math.random(),
              uri: image.path,
              name: `image_${Math.floor(Math.random() * 100)}.jpg`,
              type: image.mime,
            });
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },

      addPhotoFormLibrary: (props) => async () => {
        try {
          if (await PermissionService.getCameraRollPermission()) {
            const image = await ImagePicker.openPicker({
              cropping: true,
            });

            props.addPhoto(image);

            props.changeAvatar.run({
              id: Math.random(),
              uri: image.path,
              name: `image_${Math.floor(Math.random() * 100)}.jpg`,
              type: image.mime,
            });
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },
    }),

    withHandlers({
      addPhoto: (props) => (index) => {
        if (index === 0) {
          props.addPhotoFormLibrary();
        } else if (index === 1) {
          props.addPhotoByCamera();
        }
      },
    }),

    withProps(console.log),
  ),
)(SettingsScreenView);
