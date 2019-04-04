import {
  compose,
  hoistStatics,
  withHandlers,
  defaultProps,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { inject } from 'mobx-react';
import {
  PermissionService,
  NavigationService,
  AlertService,
} from '../../services';
import SettingsScreenView from './SettingsScreenView';
import { regExp } from '../../utils';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
      changeAvatar: viewer.changeAvatar,
      updateProfile: viewer.updateProfile,
      changeEmail: viewer.changeEmail,
      changePassword: viewer.changePassword,
      verifyEmail: viewer.verifyEmail,
      isUpdatingProfile: viewer.updateProfile.inProgress,
      isChangingEmail: viewer.changeEmail.inProgress,
      isChangingPassword: viewer.changePassword.inProgress,
    })),

    defaultProps({
      profileValidationSchema: Yup.object().shape({
        /* firstName: Yup.string()
          .trim()
          .min(1),
        lastName: Yup.string()
          .trim()
          .min(1),
        bio: Yup.string()
          .trim()
          .min(0),
        email: Yup.string()
          .trim()
          .matches(regExp.emailRegexp),
        phone: Yup.string()
          .trim()
          .min(10),
        newPassword: Yup.string()
          .trim()
          .min(9),
        replyPassword: Yup.string()
          .trim()
          .min(0)
          .oneOf([Yup.ref('newPassword'), null]), */
      }),
    }),

    withStateHandlers(
      {
        photo: {},
        activeField: '',
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

      resendVerificationEmail: ({ verifyEmail }) => () => {
        verifyEmail.run();
      },

      onSave: ({
        user,
        updateProfile,
        changeEmail,
        changePassword,
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
          } catch (error) {
            AlertService.showSomethingWentWrong();
          }
        }

        if (
          data.email !== user.email &&
          data.currentPasswordForEmail
        ) {
          try {
            await changeEmail.run({ ...data });
          } catch (error) {
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
            console.log('photo: ', props.photo);
            props.changeAvatar.run(props.photo);
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
            console.log('photo: ', props.photo);

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
  ),
)(SettingsScreenView);
