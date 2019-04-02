import {
  compose,
  hoistStatics,
  withHandlers,
  defaultProps,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionService } from '../../services';
import SettingsScreenView from './SettingsScreenView';
import { regExp } from '../../utils';

export default hoistStatics(
  compose(
    defaultProps({
      profileValidationSchema: Yup.object().shape({
        firstName: Yup.string()
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
          .oneOf([Yup.ref('newPassword'), null]),
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
      goToMyProfile: () => () => {
        // Navigate to my profile screen
      },
      resendVerificationEmail: () => () => {
        // Resend verification email
      },
      onSave: () => (data) => {
        console.log(data);
      },

      addPhotoByCamera: (props) => async () => {
        try {
          if (await PermissionService.getCameraPermission()) {
            const image = await ImagePicker.openCamera({
              cropping: true,
            });

            props.addPhoto(image);
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
